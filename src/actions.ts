"use server";

import {
  AdditionalData,
  CheckGroupData,
  CheckResult,
  ExtentedCheckResult,
  FormValue,
  OrderData,
  StaticCheckData,
  StaticCheckGroupData,
} from "./app/types";
import { notAvailableString } from "./lib/utils";
import {
  getAlgemeenChecklist,
  getMastChecklist,
  getBasisstationChecklist,
} from "./lib/checklistUtils";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const checkGroupsToExclude = new Set([
  "ea99e2fc-3672-4e47-8963-8e2e94336940", // Configuratie Aandrijving
  "11b27201-a54f-4f0b-a039-bb19a1f04895", // Configuratie Vanginrichting
  "164d9f4e-99e2-4808-87e5-3c249be48ea2", // Conclusie
]);

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

export async function getCheckList(
  formId: string,
): Promise<{ checks: CheckResult[] } & CheckGroupData> {
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
  }, new Map<string, ExtentedCheckResult[]>());

  checksByGroup.forEach((checkGroup) =>
    checkGroup.sort((a, b) => a.sortOrder.localeCompare(b.sortOrder)),
  );

  const sortedCheckGroups = Array.from(checksByGroup).sort(([a], [b]) => {
    const aOrder = checkGroupIdToData.get(a)?.sortOrder || "999";
    const bOrder = checkGroupIdToData.get(b)?.sortOrder || "999";
    return aOrder.localeCompare(bOrder);
  });

  return sortedCheckGroups.map(([checkGroupId, checkByGroup]) => {
    const checkGroupInformation = checkGroupIdToData.get(checkGroupId)!;
    return {
      ...checkGroupInformation,
      checks: checkByGroup,
    };
  });
}

function extendCheckResult(
  staticCheckData: StaticCheckData[],
  checkResult: CheckResult,
): ExtentedCheckResult {
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
): { prefix: string | null; sortOrder: string; title: string } {
  const checkGroupOrder = staticCheckGroupData.find(
    (staticCheckGroup) => staticCheckGroup.Code === checkGroupId,
  );

  if (checkGroupOrder == null) {
    return { prefix: null, sortOrder: "999", title: notAvailableString };
  }

  return {
    prefix: checkGroupOrder.CheckGroupPrefix,
    sortOrder: checkGroupOrder.SortOrder || "999",
    title: checkGroupOrder.Name || notAvailableString,
  };
}

export async function getAdditionalData(): Promise<AdditionalData> {
  return {
    stickerNumber: getStickerNumber(),
    endDate: getEndDate(),
    maxWeight: getMaxWeight(),
    maxFloorHeight: getMaxFloorHeight(),
    stoppingPlaces: getStoppingPlaces(),
    anchorage: getAnchorage(),
    specialVersion: getSpecialVersion(),
    mastVersion: getMastVersion(),
    setupDescription: getSetupDescription(),
    setupLocation: getSetupLocation(),
    catchingDeviceManufacturer: getCatchingDeviceManufacturer(),
    catchingDeviceModel: getCatchingDeviceModel(),
    catchingDeviceFactoryNumber: getCatchingDeviceFactoryNumber(),
    catchingDeviceYearOfConstruction: getCatchingDeviceYearOfConstruction(),
    catchingDeviceEndDate: getCatchingDeviceEndDate(),
    catchingDeviceMaxWeight: getCatchingDeviceMaxWeight(),
    catchingDeviceMaxFloorHeight: getCatchingDeviceMaxFloorHeight(),
    catchingDeviceStoppingPlaces: getCatchingDeviceStoppingPlaces(),
    catchingDeviceSetupDescription: getCatchingDeviceSetupDescription(),
    algemeenChecklist: getAlgemeenChecklist(),
    mastChecklist: getMastChecklist(),
    basisstationChecklist: getBasisstationChecklist(),
  };
}

function getStickerNumber() {
  return additionalData.filter(
    (check) => check?.Check?.Text === "Stickernummer",
  )[0]?.ResultValues[0].Value;
}

function getEndDate() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Inzet tot" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMaxWeight() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Max. werklast" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMaxFloorHeight() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Max. vloerhoogte in deze opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getStoppingPlaces() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Aantal stopplaatsen (incl. basisstation)" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getAnchorage() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Aantal verankeringen" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getSpecialVersion() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Bijzondere uitvoering" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMastVersion() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Mast \/ toren uitvoering" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getSetupDescription() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Omschrijving van de opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].DisplayText;
}

function getSetupLocation() {
  return additionalData.filter(
    (check) =>
      check?.Check?.Text === "Locatie van de opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getCatchingDeviceManufacturer() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Fabrikant" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceModel() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Model / type" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceFactoryNumber() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Fabrieksnummer" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceYearOfConstruction() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Bouwjaar" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceEndDate() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Inzet tot" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceMaxWeight() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Max. werklast" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceMaxFloorHeight() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Max. vloerhoogte in deze opstelling" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceStoppingPlaces() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Aantal stopplaatsen (incl. basisstation)" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceSetupDescription() {
  return (
    additionalData.find(
      (check) =>
        check.Check.Text === "Omschrijving van de opstelling" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].DisplayText || notAvailableString
  );
}

export async function getOrder(): Promise<OrderData[]> {
  return orderData.Data;
}

export async function getAdditionalDataTmp(): Promise<CheckResult[]> {
  return additionalData;
}

export async function getCheckPrefixTmp() {
  return checkData;
}
