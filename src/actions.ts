"use server";

import { AdditionalData, CheckResult, OrderData } from "./app/types";
import data from "./data.json";
import additionalData from "./additionalData.json";
import orderData from "./order.json";
import checkData from "./checkData.json";
import { notAvailableString } from "./lib/utils";
import {
  getAlgemeenChecklist,
  getMastChecklist,
  getBasisstationChecklist,
} from "./lib/checklistUtils";

// temporarily static, will be from database
export async function getData() {
  return data;
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
