import { getCheckList } from "@/actions";
import InspectionReport from "./components/InspectionReport";

export default async function Home() {
  const data = await getCheckList("CE7D28A8-520C-45E8-A13A-BF7B6794FA0F");

  return <InspectionReport data={data} />;
}
