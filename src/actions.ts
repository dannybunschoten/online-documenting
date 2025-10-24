"use server";

import {
  DataSnapshot,
  DataModel,
  CheckDataOrdered,
  CheckList,
} from "./app/types";
import getMongoClient from "@/lib/mongodb";
import { notAvailableString, requiredEnv } from "./lib/utils";
import {
  DataSnapshotSchema,
  DataModel as DataModelSchema,
} from "./lib/schemas";

async function getDataSnapshot(id: string): Promise<DataSnapshot | null> {
  try {
    const client = await getMongoClient();
    if (!client) {
      console.warn(
        `[getDataSnapshot] MongoDB client unavailable, returning null`,
      );
      return null;
    }
    const db = client.db(requiredEnv("MONGODB_DATABASE"));
    const rawData = await db
      .collection<{
        _id: string;
      }>(requiredEnv("MONGODB_COLLECTION_DATA_SNAPSHOT"))
      .findOne({
        _id: id,
      });

    if (!rawData) {
      console.log(`[getDataSnapshot] No data found for id: ${id}`);
      return null;
    }

    const validation = DataSnapshotSchema.safeParse(rawData);
    if (!validation.success) {
      console.error(`[getDataSnapshot] Validation failed for id: ${id}`);
      console.error(
        `[getDataSnapshot] Validation errors:`,
        JSON.stringify(validation.error.issues, null, 2),
      );
      return null;
    }

    return validation.data;
  } catch (error) {
    console.error(`[getDataSnapshot] Database operation failed for id: ${id}`);
    console.error(
      `[getDataSnapshot] Error:`,
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      `[getDataSnapshot] Stack trace:`,
      error instanceof Error ? error.stack : "No stack trace available",
    );
    return null;
  }
}

async function getDataModel(
  dataSnapshot: DataSnapshot | null,
): Promise<DataModel | null> {
  if (dataSnapshot == null) {
    console.log(`[getDataModel] No data snapshot provided`);
    return null;
  }
  try {
    const client = await getMongoClient();
    if (!client) {
      console.warn(`[getDataModel] MongoDB client unavailable, returning null`);
      return null;
    }
    const db = client.db(requiredEnv("MONGODB_DATABASE"));
    const modelId = dataSnapshot.Models[0]._id.toString();
    const rawData = await db
      .collection<{ _id: string }>(requiredEnv("MONGODB_COLLECTION_DATA_MODEL"))
      .findOne({ _id: modelId });

    if (!rawData) {
      console.log(`[getDataModel] No data model found for id: ${modelId}`);
      return null;
    }

    const validation = DataModelSchema.safeParse(rawData);
    if (!validation.success) {
      console.error(
        `[getDataModel] Validation failed for model id: ${modelId}`,
      );
      console.error(
        `[getDataModel] Validation errors:`,
        JSON.stringify(validation.error.issues, null, 2),
      );
      return null;
    }

    return validation.data;
  } catch (error) {
    console.error(
      `[getDataModel] Database operation failed for snapshot id: ${dataSnapshot._id}`,
    );
    console.error(
      `[getDataModel] Error:`,
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      `[getDataModel] Stack trace:`,
      error instanceof Error ? error.stack : "No stack trace available",
    );
    return null;
  }
}

export async function getCheckList(formId: string): Promise<CheckList | null> {
  const dataSnapshot = await getDataSnapshot(formId);
  const dataModel = await getDataModel(dataSnapshot);

  if (dataSnapshot == null || dataModel == null) {
    return null;
  }

  const extendedCheckGroups = dataModel.CHECK_GROUPS.map((group) => {
    const groupChecks = group.Checks.map((modelCheck) => {
      const snapshotCheck = dataSnapshot.Data.checks
        .filter((x) => x !== null)
        .filter(
          (x): x is typeof x & { Check: NonNullable<typeof x.Check> } =>
            x.Check !== null,
        )
        .find(
          (x) =>
            x.Check.Id === modelCheck.CheckId &&
            x.CheckGroup.Id === group.CheckGroupId,
        );

      if (!snapshotCheck) {
        return null;
      }

      const enhancedCheck: CheckDataOrdered = {
        ...snapshotCheck,
        Check: {
          ...snapshotCheck.Check,
          Prefix: modelCheck.Prefix || notAvailableString,
          Order: modelCheck.Order || "999",
        },
      };

      return enhancedCheck;
    })
      .filter((check): check is CheckDataOrdered => check !== null)
      .sort((a, b) => a.Check.Order.localeCompare(b.Check.Order));

    // Only include groups that have at least one check
    if (groupChecks.length === 0) {
      return null;
    }

    return {
      prefix: group.CheckGroupPrefix,
      sortOrder: group.Order || "999",
      title: group.Name || notAvailableString,
      checks: groupChecks,
    };
  })
    .filter((group) => group !== null)
    .sort((a, b) => a!.sortOrder.localeCompare(b!.sortOrder));

  return {
    title: findTitle(
      dataModel,
      dataSnapshot.Data.tasks[0].ChecklistId,
      findProperty(dataSnapshot, "SfTaskTypeCode"),
    ),
    checkCode: findProperty(dataSnapshot, "ACTIVITYCODE"),
    startDate: findProperty(dataSnapshot, "STARTDATE"),
    employeeName: findProperty(dataSnapshot, "EMPLOYEENAME"),
    machineKind: findProperty(dataSnapshot, "MACHINEKIND"),
    owner: findProperty(dataSnapshot, "OWNER1"),
    customerOrderNumber: findProperty(dataSnapshot, "CUSTOMERORDERNUMBER"),
    manufacturer: findProperty(dataSnapshot, "MANUFACTURER"),
    modelType: findProperty(dataSnapshot, "TYPECODE"),
    serialNumber: findProperty(dataSnapshot, "MATERIALSERIALNUMBER"),
    buildYear: findProperty(dataSnapshot, "YEAR"),
    checks: extendedCheckGroups,
  };
}

function findProperty(dataSnapshot: DataSnapshot, propertyId: string): string {
  const result = dataSnapshot.Data.tasks[0].Properties.find(
    (data) => data.PropertyId === propertyId,
  )?.Value;
  return result || notAvailableString;
}

function findTitle(
  dataModel: DataModel,
  checkListId: string,
  taskTypeId: string,
): string {
  const checkList = dataModel.CHECKLIST.find(
    (checklist) => checklist.ChecklistId === checkListId,
  );
  const title = checkList?.TaskTypes.find(
    (tasktype) => tasktype.TaskTypeId === taskTypeId,
  )?.Name;

  return title ?? notAvailableString;
}

export async function getChecklists(): Promise<string[]> {
  try {
    const client = await getMongoClient();
    if (!client) {
      console.warn(
        `[getChecklists] MongoDB client unavailable, returning empty list`,
      );
      return [];
    }
    const db = client.db(requiredEnv("MONGODB_DATABASE"));
    const cursor = db
      .collection<DataSnapshot>(requiredEnv("MONGODB_COLLECTION_DATA_SNAPSHOT"))
      .find({}, { projection: { _id: 1 } });

    const ids = await cursor.toArray();
    return ids.map((id) => id._id);
  } catch (error) {
    console.error(`[getChecklists] Database operation failed`);
    console.error(
      `[getChecklists] Error:`,
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      `[getChecklists] Stack trace:`,
      error instanceof Error ? error.stack : "No stack trace available",
    );
    return [];
  }
}
