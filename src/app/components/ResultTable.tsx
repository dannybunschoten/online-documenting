import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Check, MinusSquare, X } from "lucide-react";

const statusToLogo = new Map([
  ["In orde", <Check key="in-orde" className="size-4 text-green-600" />],
  ["Niet in orde", <X key="niet-in-orde" className="size-4 text-red-600" />],
  ["N.v.t", <MinusSquare key="nvt" className="size-4 text-gray-500" />],
]);

export default function ResultTable({ className }: { className?: string }) {
  const tableData = [
    {
      question: "0101 - Liftboek / berekeningsdocumenten aanwezig",
      status: "In orde",
      findings: 2,
      pictures: 1,
    },
    {
      question: "0102 - Typegoedkeuring NoBo aanwezig (machines voor 1-1-2010)",
      status: "In orde",
      findings: 0,
      pictures: 0,
    },
  ];
  return (
    <div className={cn("overflow-hidden rounded-2xl", className)}>
      <Table>
        <TableCaption>Algemene Resultaten</TableCaption>
        <TableHeader className="bg-aboma-yellow hover:bg-aboma-yellow border-none">
          <TableRow>
            {["Specificatie", "Details", "Bevindingen", "Foto's"].map(
              (heading) => (
                <TableHead
                  key={heading}
                  className="font-semibold text-white/95 py-5 px-8 text-sm uppercase tracking-wider"
                >
                  {heading}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map(({ question, status, findings, pictures }) => (
            <TableRow key={question}>
              <TableCell className="py-5 px-8">{question}</TableCell>
              <TableCell className="py-5 px-8 flex items-center gap-2">
                {statusToLogo.get(status)} {status}
              </TableCell>
              <TableCell className="py-5 px-8">{findings}</TableCell>
              <TableCell className="py-5 px-8">{pictures}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
