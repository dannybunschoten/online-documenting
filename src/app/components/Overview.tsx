import { formatDate, notAvailableString } from "@/lib/utils";
import { Shortages } from "./Shortages";
import TableOfContents from "./TableOfContents";
import ConfiguratieAandrijving from "./ConfiguratieAandrijving";
import ConfiguratieVangInrichting from "./ConfiguratieVangInrichting";
import Resultaten from "./Resultaten";
import Conclusie from "./Conclusie";
import { CheckList } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function Overview({ data }: { data: CheckList }) {
  const tableData = {
    "Inspectie Datum": formatDate(data.startDate),
    Inspecteur: data.employeeName || notAvailableString,
    "Object Type": data.machineKind || notAvailableString,
    Klant: data.owner || notAvailableString,
    "Order Nummer": data.customerOrderNumber || notAvailableString,
  } as const;

  return (
    <div className="space-y-3 border-slate-200 bg-white px-4 py-6 shadow-lg lg:rounded-2xl lg:border lg:p-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="bg-aboma-yellow h-8 w-3 rounded-full"></div>
            <span className="text-sm font-medium tracking-wider text-slate-600 uppercase">
              Inspectie rapport
            </span>
          </div>
          <h1 className="text-aboma-blue text-2xl leading-tight font-bold md:text-4xl">
            {data.title ?? notAvailableString}
          </h1>
        </div>
        {data.checkCode && (
          <div className="text-right">
            <div className="text-aboma-yellow mb-2 text-4xl font-bold md:text-6xl">
              {data.checkCode}
            </div>
            <div className="text-sm font-medium text-slate-500">
              Activiteits Code
            </div>
          </div>
        )}
      </div>

      <Shortages
        conclusionData={data.checks.find(
          (checkGroup) => checkGroup.title === "Conclusie",
        )}
        className="col-span-full"
      />
      <div className="mx-auto my-6 max-w-[900px] overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/30 shadow-xl backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-aboma-blue hover:bg-aboma-blue border-none">
              {["Specificatie", "Details"].map((heading) => (
                <TableHead
                  key={heading}
                  className="px-8 py-5 text-sm font-semibold tracking-wider text-white/95 uppercase"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(tableData).map(([key, value], idx) => (
              <TableRow
                key={key}
                className={` ${idx % 2 === 0 ? "bg-white/80" : "bg-slate-50/50"} hover:bg-aboma-yellow/5 group border-b border-slate-100/50 transition-all duration-300 ease-out last:border-0 hover:shadow-sm`}
              >
                <TableCell className="px-8 py-5 font-medium text-slate-600 transition-colors group-hover:text-slate-800">
                  <span className="inline-flex items-center gap-2">
                    <span className="bg-aboma-yellow/60 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {key}
                  </span>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <span
                    className={`text-aboma-blue font-semibold transition-all duration-300 ${value == null ? "italic opacity-50" : "group-hover:text-aboma-blue/90"} `}
                  >
                    {value || notAvailableString}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TableOfContents data={data} />

      <ConfiguratieAandrijving data={data} />

      <ConfiguratieVangInrichting data={data} />

      <Resultaten data={data} />

      <Conclusie data={data} />
    </div>
  );
}
