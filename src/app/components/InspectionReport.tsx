import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InspectionData {
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

interface InspectionReportProps {
  data?: InspectionData;
}

export default function InspectionReport({ data }: InspectionReportProps) {
  if (!data) {
    return (
      <div className="container mx-auto px-4 max-w-[1400px] py-8">
        <div className="text-center text-muted-foreground">
          No inspection data available
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-[1400px] py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-aboma-blue mb-2">
            Inspection Report
          </h1>
          <p className="text-muted-foreground">
            Detailed inspection information and equipment data
          </p>
        </div>

        <div className="grid gap-6">
          {/* Inspection Details */}
          <Card className="border-l-4 border-l-aboma-yellow">
            <CardHeader>
              <CardTitle className="text-aboma-blue">
                Inspection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Start Date
                  </label>
                  <p className="font-medium">
                    {formatDate(data.MaterialStartDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Name Inspector
                  </label>
                  <p className="font-medium">
                    {data.MaterialEmployeeName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Order Number
                  </label>
                  <p className="font-medium">
                    {data.MaterialOrderNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Object Type
                  </label>
                  <p className="font-medium">
                    {data.MaterialMachineKind?.["@DisplayValue"] || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Activity
                </label>
                <p className="font-medium">
                  {data.MaterialActivityDescription?.["@DisplayValue"] || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-aboma-blue">
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Owner
                  </label>
                  <p className="font-medium">{data.MaterialOwner1 || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Number Owner
                  </label>
                  <p className="font-medium">
                    {data.MaterialOwnerNumber || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Material Number Owner
                  </label>
                  <p className="font-medium">
                    {data.MaterialMaterialNumberOwner || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-aboma-blue">
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Contact Person Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerContactPerson || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Order Number Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerOrderNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Number Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerCode || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Name Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerName || "N/A"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Address Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerAddress || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    ZIP Code Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerZipCode || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    City Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerCity || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Country Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerCountry || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone Number Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerPhonenumber || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    E-mail Customer
                  </label>
                  <p className="font-medium">
                    {data.MaterialCustomerMail || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-aboma-blue">
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Name Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationName1 || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Contact Person Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationContactPerson || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Address Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationAddress || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    ZIP Code Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationZipcode || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    City Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationCity || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Country Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationCountry || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone Number Location
                  </label>
                  <p className="font-medium">
                    {data.MaterialLocationPhoneNumber || "N/A"}
                  </p>
                </div>
              </div>

              {data.MaterialRemarks1 && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Working Hours
                    </label>
                    <p className="font-medium">N/A</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Special Remarks
                    </label>
                    <p className="font-medium">{data.MaterialRemarks1}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Equipment Information */}
          <Card className="border-l-4 border-l-aboma-blue">
            <CardHeader>
              <CardTitle className="text-aboma-blue">
                Equipment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Manufacturer
                  </label>
                  <p className="font-medium">
                    {data.MaterialManufacturer || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Type
                  </label>
                  <p className="font-medium">
                    {data.MaterialTypeCode || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Serial Number
                  </label>
                  <p className="font-medium">
                    {data.MaterialSerialNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Material Registration Number
                  </label>
                  <p className="font-medium">
                    {data.MaterialMaterialSerialnumber || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Year of Construction
                  </label>
                  <p className="font-medium">{data.MaterialYear || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
