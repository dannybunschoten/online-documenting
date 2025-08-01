import { Overview } from "./Overview";
import { CheckList } from "@/actions";

interface InspectionReportProps {
  data: CheckList;
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto lg:px-6 max-w-[1400px] lg:py-8">
        <Overview data={data} shortages={false} />
      </div>
    </div>
  );
}
