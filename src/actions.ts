"use server";

import {
  DataSnapshot,
  DataModel,
  CheckDataOrdered,
  CheckList,
} from "./app/types";
import clientPromise from "@/lib/mongodb";
import { notAvailableString } from "./lib/utils";

function required(key: string) {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

async function getDataSnapshot(id: string): Promise<DataSnapshot | null> {
  try {
    const client = await clientPromise;
    const db = client.db(required("MONGODB_DATABASE"));
    const dataSnapshot = await db
      .collection<DataSnapshot>(required("MONGODB_COLLECTION_DATA_SNAPSHOT"))
      .findOne({
        _id: id,
      });

    return dataSnapshot;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getDataModel(version: number): Promise<DataModel | null> {
  try {
    const client = await clientPromise;
    const db = client.db(required("MONGODB_DATABASE"));
    const dataModel = await db
      .collection<DataModel>(required("MONGODB_COLLECTION_DATA_MODEL"))
      .findOne({ VERSION: version });

    return dataModel;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCheckList(formId: string): Promise<CheckList | null> {
  const dataSnapshot = await getDataSnapshot(formId);
  const dataModel = await getDataModel(1);

  if (dataSnapshot == null || dataModel == null) {
    return null;
  }

  const extendedCheckGroups = dataModel.CHECK_GROUPS.map((group) => {
    const groupChecks = group.Checks.map((modelCheck) => {
      const snapshotCheck = dataSnapshot.checks
        .filter((x) => x && x.Check && x.CheckGroup)
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
      dataSnapshot.ChecklistId,
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
  const result = dataSnapshot.Properties.find(
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
    const client = await clientPromise;
    const db = client.db(required("MONGODB_DATABASE"));
    const cursor = db
      .collection<DataSnapshot>(required("MONGODB_COLLECTION_DATA_SNAPSHOT"))
      .find({}, { projection: { _id: 1 } });

    const ids = await cursor.toArray();
    return ids.map((id) => id._id);
  } catch (error) {
    console.error(error);
    return [];
  }
}
