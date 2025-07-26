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

export interface DataType {
  DataTypeId: string;
  Name: string;
  Description: string;
}

export interface OrderField {
  DatasetFieldDefinitionId: string;
  Name: string;
  Description: string;
  DataType: DataType;
  IsHidden: string;
  IsMandatory: string;
  RefDatasetId: string | null;
  SortOrder: string;
  DateCreated: string;
  DateModified: string;
  IsPrivacySensitiveData: string;
}

export interface CheckResultValue {
  Id: string;
  CheckResponseId: string;
  CheckResponseName: string;
  DataType: string | null;
  Value: string;
  Unit: string | null;
  DisplayText: string | null;
  Style: string | null;
}

export interface CheckResult {
  CheckResultId: string;
  Check: {
    Id: string;
    Prefix: string | null;
    Text: string;
  };
  Task: {
    Id: string;
    Name: string;
    Type: string | null;
    Status: string;
  };
  ProcessId: string;
  IsApplicable: boolean;
  IsInspected: boolean;
  IsFlagged: boolean;
  Object: unknown;
  ObjectType: unknown;
  CheckGroup: {
    Id: string;
    Name: string;
  };
  Notes: string;
  DateCreated: string;
  CreationUser: string | null;
  DateModified: string | null;
  Order: string | null;
  ModifiedUser: string | null;
  Properties: unknown;
  ResultValues: CheckResultValue[];
  Actions: unknown[];
  Photos: unknown[];
}

export interface OrderData {
  DatasetItemId: string;
  Code: string;
  Name: string;
  Description: string | null;
  CheckGroupPrefix: string | null;
  SortOrder: string | null;
  EndDate: string | null;
  RefExternal: string | null;
  TranslationCode: string | null;
  TranslationText: string | null;
}

export interface Order {
  DatasetId: string;
  Name: string;
  DisplayFieldName: string;
  KeyFieldName: string;
  Distribution: string | null;
  SyncToTablet: string;
  Configuration: string;
  Type: string;
  SourceType: string;
  Priority: string;
  TranslationCode: string | null;
  RefExternal: string;
  DateCreated: string;
  DateModified: string;
  TranslationText: string | null;
  RuntimeReference: string;
  InheritanceMode: string | null;
  DeleteExpiredItems: string | null;
  PackageId: string;
  PackageName: string;
  AccessLabelId: string | null;
  IsStatic: string | null;
  "Data@odata.count": string;
  Fields: OrderField[];
  Data: OrderData[];
}
