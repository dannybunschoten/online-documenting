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

export interface FormMainData {
  Checks: string | null;
  SectionBeproevingstabel: string | null;
  KraanopstellingMKALKVRKGVM: string | null;
  Stempels: string | null;
  Rupsen: string | null;
  GieklengteHoofdgiek: string | null;
  GieklengteHulpgiek: string | null;
  MechSectieInUit: string | null;
  LengteCodeConfiguratie: string | null;
  GiekhoekHoofdgiek: string | null;
  GiekhoekHulpgiek: string | null;
  AantalHijsparten: string | null;
  Zwenkhoek: string | null;
  SoortBeproeving: string | null;
  LmbCode: string | null;
  MassaContraballast: string | null;
  ToelaatbareBedrijfslastBijVlucht: string | null;
  Afwijking: string | null;
  Akkoord: string | null;
  ButtonDelete: string | null;
  ButtonAdd: string | null;
  ToelaatbareBedrijfslastBijLb: string | null;
  HtmlBeproevingsTabel: string | null;
  GangSnelheid: string | null;
  LbTreedtInWerkingBij: string | null;
  GieklengteTotaal: string | null;
  Giekhoek: string | null;
  Gieklengte: string | null;
  Haakhoogte: string | null;
  EigenMassaCentraalBallast: string | null;
  Proeflast: string | null;
  LmbTreedtInWerkingBijVlucht: string | null;
  LmbTreedtInWerkingBijHoek: string | null;
  LMBTreedtInWerkingBijKattenUit: string | null;
  BeproevingstabelVersion: string | null;
  LMBTreedtInWerkingBijHijsen: string | null;
  KraanopstellingTKMTK: string | null;
  ToelaatbareVlucht: string | null;
  ToelaatbareHoek: string | null;
  LiftOrMaterial: string | null;
  SectionWorkorderInfoMaterial: string | null;
  MaterialStartDate: string | null;
  MaterialEmployeeName: string | null;
  MaterialEmployeeCode: string | null;
  MaterialActivityDescription: {
    "@DisplayValue": string;
    "@Value": string;
    "@TranslationCode": string | null;
    DatasetItemId: string;
    Code: string;
  } | null;
  MaterialActivityCode: string | null;
  MaterialOwner1: string | null;
  MaterialOwnerNumber: string | null;
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
  MaterialMachineKind: {
    "@DisplayValue": string;
    "@Value": string;
    "@TranslationCode": string | null;
    DatasetItemId: string;
    Code: string;
  } | null;
  MaterialManufacturer: string | null;
  MaterialTypeCode: string | null;
  MaterialSerialNumber: string | null;
  MaterialMaterialSerialnumber: string | null;
  MaterialYear: string | null;
  MaterialMaterialNumberOwner: string | null;
  SectionWorkorderInfoLift: string | null;
  LiftStartDate: string | null;
  LiftEmployeeName: string | null;
  LiftEmployeeCode: string | null;
  LiftActivityDescription: {
    "@DisplayValue": string;
    "@Value": string;
    "@TranslationCode": string | null;
    DatasetItemId: string;
    Code: string;
  } | null;
  LiftActivityCode: string | null;
  LiftOwnerAddress: string | null;
  LiftOwnerZipcode: string | null;
  LiftOwnerCity: string | null;
  LiftOwnerContactPhonenumber: string | null;
  LiftOwnerContactperson: string | null;
  LiftCustomerCode: string | null;
  LiftCustomerName: string | null;
  LiftCustomerAddress: string | null;
  LiftCustomerZipCode: string | null;
  LiftCustomerCity: string | null;
  LiftCustomerCountry: string | null;
  LiftCustomerPhonenumber: string | null;
  LiftCustomerMail: string | null;
  LiftLocationName1: string | null;
  LiftLocationContactPerson: string | null;
  LiftLocationAddress: string | null;
  LiftLocationZipcode: string | null;
  LiftLocationCity: string | null;
  LiftLocationCountry: string | null;
  LiftLocationPhoneNumber: string | null;
  LiftOrderNumber: string | null;
  LiftRemarks1: string | null;
  LiftEstimateDuration: string | null;
  LiftMachineKind: {
    "@DisplayValue": string;
    "@Value": string;
    "@TranslationCode": string | null;
    DatasetItemId: string;
    Code: string;
  } | null;
  LiftManufacturer: string | null;
  LiftSerialNumber: string | null;
  LiftMaterialSerialnumber: string | null;
  LiftYear: string | null;
  LiftMaintenanceCompany: string | null;
  LiftLocationDriveDescription: string | null;
  LiftNumberOfCarEntrances: string | null;
  LiftNumberPeopleWinch: string | null;
  LiftNumberOfShaftEntrances: string | null;
  LiftNameOfAdvisor: string | null;
  LiftServiceNumberPeople: string | null;
  LiftNumberOfStops: string | null;
  LiftCodeOfAdvisor: string | null;
  LiftAKNumber: string | null;
  LiftControlDescription: string | null;
  LiftYearWinch: string | null;
  LiftYearServiceLift: string | null;
  LiftLiftingHeight: string | null;
  LiftLiftingHeightWinch: string | null;
  LiftLiftingHeightService: string | null;
  LiftFirefighters: string | null;
  LiftCarClosure: string | null;
  LiftMechanicalShaftDoor: string | null;
  LiftSafetyGear: string | null;
  LiftWinchMaxWeight: string | null;
  LiftServiceMaxWeight: string | null;
  LiftMaxOverrun: string | null;
  LiftBrand: string | null;
  LiftMaintenanceCompanyName: string | null;
  LiftMaintenanceCompanyCode: string | null;
  LiftSerialNumberWinch: string | null;
  LiftSerialNumberServiceLift: string | null;
  LiftSpeedControlKind: string | null;
  LiftSpeed: string | null;
  LiftBuildingKindDescription: string | null;
  MaterialEstimateDuration: string | null;
  MaterialOrderNumber: string | null;
  MaterialMaterialCode: string | null;
  LiftThrowAccordingToStandard: string | null;
  HTMLCONTROL: string | null;
  HTMLCONTROL1: string | null;
  HTMLCONTROL2: string | null;
  HTMLCONTROL3: string | null;
  HTMLCONTROL4: string | null;
  Liftgegevens: string | null;
}

export interface FormData {
  Main: FormMainData;
  GROUP: string[] | null;
}

export interface FormValue {
  FormId: string | null;
  FormStatusId: string | null;
  Status: string | null;
  SystemStatus: string | null;
  FormTemplateId: string | null;
  TemplateName: string | null;
  FormGroupId: string | null;
  FormGroup: string | null;
  ParentFormGUID: string | null;
  AssignedUserId: string | null;
  AssignedUser: string | null;
  CreationUserId: string | null;
  CreationUser: string | null;
  ModifiedUserId: string | null;
  ModifiedUser: string | null;
  DeletionUserId: string | null;
  DeletionUser: string | null;
  Latitude: string | null;
  Longitude: string | null;
  RuntimeReference: string | null;
  RefExternal: string | null;
  Code: string | null;
  ShowInHeader: string | null;
  DateCreated: string | null;
  DateModified: string | null;
  DateDeleted: string | null;
  CompletedDate: string | null;
  Data: FormData;
  Files: string[] | null;
}

export interface FormEntry {
  _id: string | null;
  value: FormValue[];
}

export interface StaticCheckData {
  DatasetItemId: string;
  Code: string;
  CheckCode: string;
  CheckGroupCode: string;
  Prefix: string | null;
  SortOrder: string | null;
}

export interface StaticCheckGroupData {
  DatasetItemId: string;
  Code: string;
  Name: string | null;
  CheckGroupPrefix: string | null;
  SortOrder: string | null;
}

export interface ExtendedCheckResult extends CheckResult {
  prefix: string | null;
  sortOrder: string;
}

export interface CheckGroupData {
  id: string;
  prefix: string | null;
  sortOrder: string;
  title: string;
}

export interface CheckGroup {
  checks: ExtendedCheckResult[];
  id: string;
  prefix: string | null;
  sortOrder: string;
  title: string;
}
