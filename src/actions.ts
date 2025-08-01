"use server";

import {
  CheckGroup,
  CheckGroupData,
  CheckResult,
  ExtendedCheckResult,
  FormValue,
  StaticCheckData,
  StaticCheckGroupData,
} from "./app/types";
import { notAvailableString } from "./lib/utils";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getIndividualCheckResults(
  formId: string,
): Promise<CheckResult[] | null> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const checkData = await db
    .collection("checkData")
    .findOne({ _id: new ObjectId(formId) });
  if (checkData == null) {
    return null;
  }

  return checkData.value;
}

export async function getFormData(formId: string): Promise<FormValue | null> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const formData = await db
    .collection("documents")
    .findOne({ _id: new ObjectId(formId) });
  if (formData == null) {
    return null;
  }

  return formData.value[0];
}

export async function getStaticCheckData(): Promise<StaticCheckData[] | null> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const staticCheckData = await db
    .collection("staticCheckData")
    .findOne({ _id: new ObjectId("staticCheckInformation") });
  if (staticCheckData == null) {
    return null;
  }

  return staticCheckData.value.Data;
}

export async function getStaticCheckGroupData(): Promise<
  StaticCheckGroupData[] | null
> {
  const client = await clientPromise;
  const db = client.db("online-documenting");
  const staticCheckGroupData = await db
    .collection("staticCheckGroupData")
    .findOne({ _id: new ObjectId("staticCheckGroupInformation") });
  if (staticCheckGroupData == null) {
    return null;
  }

  return staticCheckGroupData.value.Data;
}

export interface CheckList {
  title?: string;
  checkCode?: string;
  startDate?: string;
  employeeName?: string;
  machineKind?: string;
  owner?: string;
  customerOrderNumber?: string;
  manufacturer?: string;
  modelType?: string;
  serialNumber?: string;
  buildYear?: string;
  checks: CheckGroup[];
}

export async function getCheckList(formId: string): Promise<CheckList | null> {
  const document = await getFormData(formId);
  const checks = await getIndividualCheckResults(formId);
  const staticCheckData = await getStaticCheckData();
  const staticCheckGroupData = await getStaticCheckGroupData();

  if (
    checks == null ||
    staticCheckData == null ||
    staticCheckGroupData == null
  ) {
    return null;
  }

  const checkGroupIdToData = new Map<string, CheckGroupData>();

  const checksByGroup = checks.reduce((acc, check) => {
    const checkGroupId = check.CheckGroup.Id;
    const entry = acc.get(checkGroupId);
    if (entry) {
      entry.push(extendCheckResult(staticCheckData, check));
    } else {
      acc.set(checkGroupId, [extendCheckResult(staticCheckData, check)]);
      checkGroupIdToData.set(
        checkGroupId,
        findCheckGroupData(staticCheckGroupData, checkGroupId),
      );
    }

    return acc;
  }, new Map<string, ExtendedCheckResult[]>());

  checksByGroup.forEach((checkGroup) =>
    checkGroup.sort((a, b) => a.sortOrder.localeCompare(b.sortOrder)),
  );

  const sortedCheckGroups = Array.from(checksByGroup).sort(([a], [b]) => {
    const aOrder = checkGroupIdToData.get(a)?.sortOrder || "999";
    const bOrder = checkGroupIdToData.get(b)?.sortOrder || "999";
    return aOrder.localeCompare(bOrder);
  });

  const extendedCheckGroups = sortedCheckGroups.map(
    ([checkGroupId, checkByGroup]) => {
      const checkGroupInformation = checkGroupIdToData.get(checkGroupId)!;
      return {
        ...checkGroupInformation,
        checks: checkByGroup,
      };
    },
  );

  return {
    title:
      document?.Data.Main.MaterialActivityDescription?.["@DisplayValue"]?.split(
        "-",
      )[0],
    checkCode: document?.Data.Main.MaterialActivityCode ?? undefined,
    startDate: document?.Data.Main.MaterialStartDate ?? undefined,
    employeeName: document?.Data.Main.MaterialEmployeeName ?? undefined,
    machineKind:
      document?.Data.Main.MaterialMachineKind?.["@DisplayValue"] ?? undefined,
    owner: document?.Data.Main.MaterialOwner1 ?? undefined,
    customerOrderNumber:
      document?.Data.Main.MaterialCustomerOrderNumber ?? undefined,
    manufacturer: document?.Data.Main.MaterialManufacturer ?? undefined,
    modelType: document?.Data.Main.MaterialTypeCode ?? undefined,
    serialNumber: document?.Data.Main.MaterialSerialNumber ?? undefined,
    buildYear: document?.Data.Main.MaterialYear ?? undefined,
    checks: extendedCheckGroups,
  };
}

function extendCheckResult(
  staticCheckData: StaticCheckData[],
  checkResult: CheckResult,
): ExtendedCheckResult {
  const staticData = staticCheckData.find(
    (staticCheck) =>
      staticCheck.CheckCode === checkResult.Check.Id &&
      staticCheck.CheckGroupCode === checkResult.CheckGroup.Id,
  );

  return {
    ...checkResult,
    prefix: staticData?.Prefix || null,
    sortOrder: staticData?.SortOrder || "999",
  };
}

function findCheckGroupData(
  staticCheckGroupData: StaticCheckGroupData[],
  checkGroupId: string,
): { id: string; prefix: string | null; sortOrder: string; title: string } {
  const checkGroupOrder = staticCheckGroupData.find(
    (staticCheckGroup) => staticCheckGroup.Code === checkGroupId,
  );

  if (checkGroupOrder == null) {
    return {
      id: checkGroupId,
      prefix: null,
      sortOrder: "999",
      title: notAvailableString,
    };
  }

  return {
    id: checkGroupId,
    prefix: checkGroupOrder.CheckGroupPrefix,
    sortOrder: checkGroupOrder.SortOrder || "999",
    title: checkGroupOrder.Name || notAvailableString,
  };
}
