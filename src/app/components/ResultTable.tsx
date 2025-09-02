import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Minus, X, Camera, AlertTriangle } from "lucide-react";
import { CheckDataOrdered } from "../types";

const statusToConfig = new Map([
  [
    "In orde",
    {
      icon: <Check className="size-4 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
  ],
  [
    "Niet in orde",
    {
      icon: <X className="size-4 text-red-600" />,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
  ],
  [
    "N.v.t.",
    {
      icon: <Minus className="size-4 text-gray-500" />,
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      borderColor: "border-gray-200",
    },
  ],
]);

export default function ResultTable({
  className,
  tableData,
  showControleCount = false,
}: {
  className?: string;
  tableData: CheckDataOrdered[];
  showControleCount?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Table className="w-full">
        <TableCaption className="mb-3 text-sm text-gray-600">
          {showControleCount && (
            <div className="flex flex-wrap items-center justify-center gap-6 px-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-500 shadow-sm"></div>
                <span className="font-medium">
                  {
                    tableData.filter(
                      (item) => item.ResultValues[0]?.DisplayText === "In orde",
                    ).length
                  }{" "}
                  geslaagd
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-400 shadow-sm"></div>
                <span className="font-medium">
                  {
                    tableData.filter(
                      (item) => item.ResultValues[0]?.DisplayText === "N.v.t.",
                    ).length
                  }{" "}
                  overgeslagen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="font-medium">
                  {tableData.reduce(
                    (sum, check) => sum + check.Actions.length,
                    0,
                  )}{" "}
                  bevindingen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-500" />
                <span className="font-medium">
                  {tableData.reduce((sum, item) => sum + item.Photos.length, 0)}{" "}
                  foto&apos;s
                </span>
              </div>
            </div>
          )}
        </TableCaption>
        <TableHeader className="from-aboma-blue to-aboma-blue/90 bg-gradient-to-r py-6 text-white">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-[50%] px-6 py-4 text-sm font-semibold text-white">
              Specificatie
            </TableHead>
            <TableHead className="w-[20%] px-6 py-4 text-center text-sm font-semibold text-white">
              Status
            </TableHead>
            <TableHead className="w-[15%] px-6 py-4 text-center text-sm font-semibold text-white">
              Bevindingen
            </TableHead>
            <TableHead className="w-[15%] px-6 py-4 text-center text-sm font-semibold text-white">
              Foto&apos;s
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((check, index) => {
            const status = check.ResultValues[0]?.DisplayText || "N.v.t.";
            const statusConfig = statusToConfig.get(status);
            return (
              <TableRow
                key={`${check.Check.Prefix}-${check.Check.Text}`}
                className={cn(
                  "border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50/50",
                  index === tableData.length - 1 && "border-b-0",
                )}
              >
                <TableCell className="px-3 py-3 whitespace-normal sm:px-6">
                  <Badge
                    variant="default"
                    className="bg-aboma-blue hover:bg-aboma-blue/90 mr-2 min-w-[3rem] justify-center self-start text-xs font-medium text-white shadow-sm transition-colors duration-200 sm:self-auto"
                  >
                    {check.Check.Prefix}
                  </Badge>
                  <span className="text-xs leading-relaxed font-medium break-words text-gray-900 sm:text-sm">
                    {check.Check.Text}
                  </span>
                </TableCell>
                <TableCell className="px-3 py-3 sm:px-6">
                  <div
                    className={cn(
                      "mx-auto flex w-fit items-center gap-1 rounded-lg border px-2 py-1 transition-all duration-200 md:gap-2 md:px-3 md:py-2",
                      statusConfig?.bgColor,
                      statusConfig?.borderColor,
                    )}
                  >
                    {statusConfig?.icon}
                    <span
                      className={cn(
                        "hidden text-xs font-medium md:inline md:text-sm",
                        statusConfig?.textColor,
                      )}
                    >
                      {status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-3 whitespace-normal sm:px-6">
                  <div
                    className={cn(
                      "mx-auto flex size-8 items-center justify-center gap-1 rounded-lg border py-1 sm:w-fit sm:gap-2 sm:px-3 sm:py-2",
                      check.Actions.length > 0
                        ? "border-amber-200 bg-amber-50"
                        : "size-8 justify-center border-gray-200 bg-gray-50",
                    )}
                  >
                    {check.Actions.length > 0 && (
                      <AlertTriangle className="hidden size-4 text-amber-500 sm:inline" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium sm:text-sm",
                        check.Actions.length > 0
                          ? "text-amber-700"
                          : "text-gray-600",
                      )}
                    >
                      {check.Actions.length}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-3 whitespace-normal sm:px-6">
                  <div
                    className={cn(
                      "mx-auto flex size-8 items-center justify-center gap-1 rounded-lg border py-1 sm:w-fit sm:gap-2 sm:px-3 sm:py-2",
                      check.Photos.length > 0
                        ? "border-blue-200 bg-blue-50"
                        : "size-8 justify-center border-gray-200 bg-gray-50",
                    )}
                  >
                    {check.Photos.length > 0 && (
                      <Camera className="hidden size-4 text-blue-500 sm:inline" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium sm:text-sm",
                        check.Photos.length > 0
                          ? "text-blue-700"
                          : "text-gray-600",
                      )}
                    >
                      {check.Photos.length}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
