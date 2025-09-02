import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notAvailableString } from "@/lib/utils";

export default function ConfiguratieAandrijving({
  tableData,
}: {
  tableData: Map<string, string | null | undefined>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/30 shadow-xl backdrop-blur-sm lg:mx-4">
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
          {[...tableData].map(([key, value], idx) => (
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
  );
}
