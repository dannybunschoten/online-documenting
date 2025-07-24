export interface InspectionData {
  MaterialStartDate: string | null;
  MaterialEmployeeName: string | null;
  MaterialEmployeeCode: string | null;
  MaterialActivityDescription: {
    "@DisplayValue": string;
    "@Value": string;
    Code: string;
  } | null;
  MaterialActivityCode: string | null;
  MaterialMachineKind: {
    "@DisplayValue": string;
    "@Value": string;
    Code: string;
  } | null;
  MaterialOwner1: string | null;
  MaterialOwnerNumber: string | null;
  MaterialMaterialNumberOwner: string | null;
  MaterialCustomerContactPerson: string | null;
  MaterialCustomerOrderNumber: string | null;
  MaterialCustomerCode: string | null;
  MaterialCustomerName: string | null;
  MaterialCustomerAddress: string | null;
  MaterialCustomerZipCode: string | null;
  MaterialCustomerCity: string | null;
  MaterialCustomerCountry: string | null;
  MaterialCustomerPhonenumber: string | null;
  MaterialCustomerMail: string | null;
  MaterialLocationName1: string | null;
  MaterialLocationContactPerson: string | null;
  MaterialLocationAddress: string | null;
  MaterialLocationZipcode: string | null;
  MaterialLocationCity: string | null;
  MaterialLocationCountry: string | null;
  MaterialLocationPhoneNumber: string | null;
  MaterialRemarks1: string | null;
  MaterialManufacturer: string | null;
  MaterialTypeCode: string | null;
  MaterialSerialNumber: string | null;
  MaterialMaterialSerialnumber: string | null;
  MaterialYear: string | null;
  MaterialOrderNumber: string | null;
}

export interface AdditionalData {
  stickerNumber: string;
  endDate: string;
  maxWeight: string;
  maxFloorHeight: string;
  stoppingPlaces: string;
  anchorage: string;
  specialVersion: string;
  mastVersion: string;
  setupDescription: string | null;
  setupLocation: string;
  catchingDeviceManufacturer: string;
  catchingDeviceModel: string;
  catchingDeviceFactoryNumber: string;
  catchingDeviceYearOfConstruction: string;
  catchingDeviceEndDate: string;
  catchingDeviceMaxWeight: string;
  catchingDeviceMaxFloorHeight: string;
  catchingDeviceStoppingPlaces: string;
  catchingDeviceSetupDescription: string | null;
  algemeenChecklist: Checklist[];
  mastChecklist: Checklist[];
  basisstationChecklist: Checklist[];
}

export interface Checklist {
  prefix: string;
  question: string;
  status: string;
  findings: number;
  pictures: number;
}
