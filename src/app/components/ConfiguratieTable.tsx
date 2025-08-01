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
    <div className="mx-4 bg-gradient-to-br from-white to-slate-50/30 rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
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
          {[...tableData].map(([key, value], idx) => (
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
  );
}
