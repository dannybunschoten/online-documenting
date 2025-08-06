"use server";

import {
  DataSnapshot,
  DataModel,
  CheckDataOrdered,
  CheckList,
} from "./app/types";
import clientPromise from "@/lib/mongodb";
import { notAvailableString } from "./lib/utils";

// TODO uncomment the filter logic
async function getDataSnapshot(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: string,
): Promise<DataSnapshot | null> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const dataSnapshot = await db
    .collection("data-snapshot")
    .findOne<DataSnapshot>();
  // const dataSnapshot = await db
  //   .collection("data-snapshot")
  //   .findOne<DataSnapshot>({
  //     _id: new ObjectId(id),
  //   });

  return dataSnapshot;
}

async function getDataModel(version: number): Promise<DataModel | null> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const dataModel = await db
    .collection("data-models")
    .findOne<DataModel>({ VERSION: version });

  return dataModel;
}

export async function getCheckList(formId: string): Promise<CheckList | null> {
  const dataSnapshot = await getDataSnapshot(formId);
  const dataModel = await getDataModel(1);

  if (dataSnapshot == null || dataModel == null) {
    return null;
  }

  const extendedCheckGroups = dataModel.CHECK_GROUPS.map((group) => {
    const groupChecks = group.Checks.map((modelCheck) => {
      const snapshotCheck = dataSnapshot.checks.find(
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
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const cursor = db
    .collection("data-snapshot")
    .find<{ _id: string }>({}, { projection: { _id: 1 } });

  const ids = await cursor.toArray();
  return ids.map((id) => id._id.toString());
}
