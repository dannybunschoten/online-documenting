import { getData } from "@/actions";
import InspectionReport from "./components/InspectionReport";

export default async function Home() {
  const data = await getData();
  return <InspectionReport data={data.value[0]?.Data?.Main} />;
}
