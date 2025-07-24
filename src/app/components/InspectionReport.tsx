import { AdditionalData, InspectionData } from "@/app/types";
import { Overview } from "./Overview";

interface InspectionReportProps {
  data: InspectionData;
  additionalData: AdditionalData;
}

export default function InspectionReport({
  data,
  additionalData,
}: InspectionReportProps) {
  if (!data) {
    return (
      <div className="container mx-auto px-4 max-w-[1400px] py-8">
        <div className="text-center text-muted-foreground">
          No inspection data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-6 max-w-[1400px] py-8">
        <Overview
          data={data}
          shortages={false}
          additionalData={additionalData}
        />
      </div>
    </div>
  );
}
