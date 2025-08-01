import { getIndividualCheckResults, getAdditionalData } from "@/actions";
import InspectionReport from "./components/InspectionReport";

export default async function Home() {
  const data = await getIndividualCheckResults();
  const additionalData = await getAdditionalData();
  return (
    <InspectionReport
      data={data.value[0]?.Data?.Main}
      additionalData={additionalData}
    />
  );
}
