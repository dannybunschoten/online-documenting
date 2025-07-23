"use server";

import { AdditionalData } from "./app/types";
import data from "./data.json";
import { notAvailableString } from "./lib/utils";

// temporarily static, will be from database
export async function getData() {
  return {
    value: [
      {
        FormId: "CE7D28A8-520C-45E8-A13A-BF7B6794FA0F",
        FormStatusId: "E0DE683B-ADC5-4037-AA1F-C03BAF148CC3",
        Status: "Completed",
        SystemStatus: "COMP",
        FormTemplateId: "7FBAADEA-077C-469F-987B-A0FFCABAD617",
        TemplateName: "Checklist",
        FormGroupId: "F9D9E601-BB39-40F4-8C66-220FFD26B27E",
        FormGroup: "Algemeen",
        ParentFormGUID: null,
        AssignedUserId: "00BF5AD6-06CD-4E89-91A6-BDC9A26B6C35",
        AssignedUser: "Aidin Yavari",
        CreationUserId: "00BF5AD6-06CD-4E89-91A6-BDC9A26B6C35",
        CreationUser: "Aidin Yavari",
        ModifiedUserId: "00BF5AD6-06CD-4E89-91A6-BDC9A26B6C35",
        ModifiedUser: "Aidin Yavari",
        DeletionUserId: null,
        DeletionUser: null,
        Latitude: "",
        Longitude: "",
        RuntimeReference: null,
        RefExternal: null,
        Code: "undefined",
        ShowInHeader: "",
        DateCreated: "2025-06-25T10:28:51Z",
        DateModified: "2025-06-25T10:52:35.597Z",
        DateDeleted: null,
        CompletedDate: "2025-06-25T10:52:35.597Z",
        Data: {
          Main: {
            Checks: null,
            SectionBeproevingstabel: null,
            KraanopstellingMKALKVRKGVM: null,
            Stempels: null,
            Rupsen: null,
            GieklengteHoofdgiek: null,
            GieklengteHulpgiek: null,
            MechSectieInUit: null,
            LengteCodeConfiguratie: null,
            GiekhoekHoofdgiek: null,
            GiekhoekHulpgiek: null,
            AantalHijsparten: null,
            Zwenkhoek: null,
            SoortBeproeving: null,
            LmbCode: null,
            MassaContraballast: null,
            ToelaatbareBedrijfslastBijVlucht: null,
            Afwijking: null,
            Akkoord: null,
            ButtonDelete: null,
            ButtonAdd: null,
            ToelaatbareBedrijfslastBijLb: null,
            HtmlBeproevingsTabel: null,
            GangSnelheid: null,
            LbTreedtInWerkingBij: null,
            GieklengteTotaal: null,
            Giekhoek: null,
            Gieklengte: null,
            Haakhoogte: null,
            EigenMassaCentraalBallast: null,
            Proeflast: null,
            LmbTreedtInWerkingBijVlucht: null,
            LmbTreedtInWerkingBijHoek: null,
            LMBTreedtInWerkingBijKattenUit: null,
            BeproevingstabelVersion: null,
            LMBTreedtInWerkingBijHijsen: null,
            KraanopstellingTKMTK: null,
            ToelaatbareVlucht: null,
            ToelaatbareHoek: null,
            LiftOrMaterial: "Material",
            SectionWorkorderInfoMaterial: null,
            MaterialStartDate: "2025-06-25",
            MaterialEmployeeName: "Danny Bunschoten",
            MaterialEmployeeCode: "123",
            MaterialActivityDescription: {
              "@DisplayValue":
                "810 - Periodieke keuring (TCVT) en opstellingsinspectie",
              "@Value": "0027",
              "@TranslationCode": null,
              DatasetItemId: "54971B85-F800-4C37-AD40-6FD199218653",
              Code: "0027",
            },
            MaterialActivityCode: "810",
            MaterialOwner1: "Reco montage techniek B.V.",
            MaterialOwnerNumber: null,
            MaterialCustomerContactPerson: "J. Abramse",
            MaterialCustomerOrderNumber: "3543552",
            MaterialCustomerCode: null,
            MaterialCustomerName: "Reco montage techniek B.V.",
            MaterialCustomerAddress: "Hoogewaard 187",
            MaterialCustomerZipCode: "2396 A",
            MaterialCustomerCity: "Koudekerk a/d Rijn",
            MaterialCustomerCountry: "Nederland",
            MaterialCustomerPhonenumber: null,
            MaterialCustomerMail: null,
            MaterialLocationName1: null,
            MaterialLocationContactPerson: null,
            MaterialLocationAddress: null,
            MaterialLocationZipcode: null,
            MaterialLocationCity: null,
            MaterialLocationCountry: null,
            MaterialLocationPhoneNumber: null,
            MaterialRemarks1: null,
            MaterialMachineKind: {
              "@DisplayValue": "Bouwlift voor personen en/of goederen (120)",
              "@Value": "0120",
              "@TranslationCode": null,
              DatasetItemId: "F90B27FA-4D84-473E-A149-3C2BE076C0DF",
              Code: "0120",
            },
            MaterialManufacturer: "Scanclimber",
            MaterialTypeCode: "SC1432FL",
            MaterialSerialNumber: "466",
            MaterialMaterialSerialnumber: "1601006",
            MaterialYear: "2009",
            MaterialMaterialNumberOwner: "1601006",
            SectionWorkorderInfoLift: null,
            LiftStartDate: null,
            LiftEmployeeName: null,
            LiftEmployeeCode: null,
            LiftActivityDescription: null,
            LiftActivityCode: null,
            LiftOwnerAddress: null,
            LiftOwnerZipcode: null,
            LiftOwnerCity: null,
            LiftOwnerContactPhonenumber: null,
            LiftOwnerContactperson: null,
            LiftCustomerCode: null,
            LiftCustomerName: null,
            LiftCustomerAddress: null,
            LiftCustomerZipCode: null,
            LiftCustomerCity: null,
            LiftCustomerCountry: null,
            LiftCustomerPhonenumber: null,
            LiftCustomerMail: null,
            LiftLocationName1: null,
            LiftLocationContactPerson: null,
            LiftLocationAddress: null,
            LiftLocationZipcode: null,
            LiftLocationCity: null,
            LiftLocationCountry: null,
            LiftLocationPhoneNumber: null,
            LiftOrderNumber: null,
            LiftRemarks1: null,
            LiftEstimateDuration: null,
            LiftMachineKind: null,
            LiftManufacturer: null,
            LiftSerialNumber: null,
            LiftMaterialSerialnumber: null,
            LiftYear: null,
            LiftMaintenanceCompany: null,
            LiftLocationDriveDescription: null,
            LiftNumberOfCarEntrances: null,
            LiftNumberPeopleWinch: null,
            LiftNumberOfShaftEntrances: null,
            LiftNameOfAdvisor: null,
            LiftServiceNumberPeople: null,
            LiftNumberOfStops: null,
            LiftCodeOfAdvisor: null,
            LiftAKNumber: null,
            LiftControlDescription: null,
            LiftYearWinch: null,
            LiftYearServiceLift: null,
            LiftLiftingHeight: null,
            LiftLiftingHeightWinch: null,
            LiftLiftingHeightService: null,
            LiftFirefighters: null,
            LiftCarClosure: null,
            LiftMechanicalShaftDoor: null,
            LiftSafetyGear: null,
            LiftWinchMaxWeight: null,
            LiftServiceMaxWeight: null,
            LiftMaxOverrun: null,
            LiftBrand: null,
            LiftMaintenanceCompanyName: null,
            LiftMaintenanceCompanyCode: null,
            LiftSerialNumberWinch: null,
            LiftSerialNumberServiceLift: null,
            LiftSpeedControlKind: null,
            LiftSpeed: null,
            LiftBuildingKindDescription: null,
            MaterialEstimateDuration: null,
            MaterialOrderNumber: null,
            MaterialMaterialCode: "1601006",
            LiftThrowAccordingToStandard: null,
            HTMLCONTROL: null,
            HTMLCONTROL1: null,
            HTMLCONTROL2: null,
            HTMLCONTROL3: null,
            HTMLCONTROL4: null,
            Liftgegevens: null,
          },
          GROUP: [],
        },
        Files: [],
      },
    ],
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
  };
}

function getStickerNumber() {
  return data.filter((check) => check?.Check?.Text === "Stickernummer")[0]
    ?.ResultValues[0].Value;
}

function getEndDate() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Inzet tot" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMaxWeight() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Max. werklast" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMaxFloorHeight() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Max. vloerhoogte in deze opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getStoppingPlaces() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Aantal stopplaatsen (incl. basisstation)" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getAnchorage() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Aantal verankeringen" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getSpecialVersion() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Bijzondere uitvoering" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getMastVersion() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Mast \/ toren uitvoering" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getSetupDescription() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Omschrijving van de opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].DisplayText;
}

function getSetupLocation() {
  return data.filter(
    (check) =>
      check?.Check?.Text === "Locatie van de opstelling" &&
      check?.CheckGroup?.Name === "Configuratie aandrijving",
  )[0].ResultValues[0].Value;
}

function getCatchingDeviceManufacturer() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Fabrikant" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceModel() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Model / type" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceFactoryNumber() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Fabrieksnummer" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceYearOfConstruction() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Bouwjaar" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceEndDate() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Inzet tot" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceMaxWeight() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Max. werklast" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceMaxFloorHeight() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Max. vloerhoogte in deze opstelling" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceStoppingPlaces() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Aantal stopplaatsen (incl. basisstation)" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].Value || notAvailableString
  );
}

function getCatchingDeviceSetupDescription() {
  return (
    data.find(
      (check) =>
        check.Check.Text === "Omschrijving van de opstelling" &&
        check.CheckGroup.Name === "Configuratie vanginrichting",
    )?.ResultValues[0].DisplayText || null
  );
}
