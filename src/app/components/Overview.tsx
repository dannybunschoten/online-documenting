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
    <div className="bg-white lg:rounded-2xl shadow-lg lg:border border-slate-200 lg:p-8 px-4 py-6 space-y-3">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-8 bg-aboma-yellow rounded-full"></div>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Aboma Inspectie Rapport
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-aboma-blue leading-tight">
            {data.title ?? notAvailableString}
          </h1>
        </div>
        {data.checkCode && (
          <div className="text-right">
            <div className="text-4xl md:text-6xl font-bold text-aboma-yellow mb-2">
              {data.checkCode}
            </div>
            <div className="text-sm text-slate-500 font-medium">
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
      <div className="my-6 max-w-[900px] mx-auto bg-gradient-to-br from-white to-slate-50/30 rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-aboma-blue border-none hover:bg-aboma-blue">
              {["Specificatie", "Details"].map((heading) => (
                <TableHead
                  key={heading}
                  className="font-semibold text-white/95 py-5 px-8 text-sm uppercase tracking-wider"
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
                className={`
                        ${idx % 2 === 0 ? "bg-white/80" : "bg-slate-50/50"}
                        transition-all duration-300 ease-out
                        hover:bg-aboma-yellow/5 hover:shadow-sm
                        border-b border-slate-100/50 last:border-0
                        group
                      `}
              >
                <TableCell className="py-5 px-8 font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-aboma-yellow/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {key}
                  </span>
                </TableCell>
                <TableCell className="py-5 px-8">
                  <span
                    className={`
                          font-semibold text-aboma-blue transition-all duration-300
                          ${value == null ? "opacity-50 italic" : "group-hover:text-aboma-blue/90"}
                        `}
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
