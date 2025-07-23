import { titleToId } from "@/lib/utils";
import ResultTable from "../ResultTable";

export default function Algemeen() {
  return (
    <div
      className="max-w-[900px] mx-auto px-4"
      id={titleToId("0100 - Algemeen")}
    >
      <h2 className="text-xl text-aboma-yellow font-bold tracking-tight">
        0100 - Algemeen
      </h2>
      <p className="text-muted-foreground mt-1 text-sm mb-2">
        Algemene resultaten
      </p>
      <ResultTable />
    </div>
  );
}
