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
import { Checklist } from "../types";

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
  tableData: Checklist[];
  showControleCount?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Table className="w-full">
        <TableCaption className="text-sm text-gray-600 mb-3">
          {showControleCount && (
            <div className="flex flex-wrap items-center justify-center gap-6 px-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                <span className="font-medium">
                  {tableData.filter((item) => item.status === "In orde").length}{" "}
                  geslaagd
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full shadow-sm"></div>
                <span className="font-medium">
                  {tableData.filter((item) => item.status === "N.v.t.").length}{" "}
                  overgeslagen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="font-medium">
                  {tableData.reduce((sum, item) => sum + item.findings, 0)}{" "}
                  bevindingen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-500" />
                <span className="font-medium">
                  {tableData.reduce((sum, item) => sum + item.pictures, 0)}{" "}
                  foto&apos;s
                </span>
              </div>
            </div>
          )}
        </TableCaption>
        <TableHeader className="bg-gradient-to-r from-aboma-blue to-aboma-blue/90 text-white py-6">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-semibold text-white py-4 px-6 text-sm w-[50%]">
              Specificatie
            </TableHead>
            <TableHead className="font-semibold text-white py-4 px-6 text-sm text-center w-[20%]">
              Status
            </TableHead>
            <TableHead className="font-semibold text-white py-4 px-6 text-sm text-center w-[15%]">
              Bevindingen
            </TableHead>
            <TableHead className="font-semibold text-white py-4 px-6 text-sm text-center w-[15%]">
              Foto&apos;s
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map(
            ({ prefix, question, status, findings, pictures }, index) => {
              const statusConfig = statusToConfig.get(status);
              return (
                <TableRow
                  key={`${prefix}-${question}`}
                  className={cn(
                    "border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200",
                    index === tableData.length - 1 && "border-b-0",
                  )}
                >
                  <TableCell className="py-3 px-3 sm:px-6 whitespace-normal">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <Badge
                        variant="default"
                        className="bg-aboma-blue hover:bg-aboma-blue/90 text-white min-w-[3rem] justify-center font-medium shadow-sm transition-colors duration-200 self-start sm:self-auto text-xs"
                      >
                        {prefix}
                      </Badge>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 leading-relaxed break-words">
                        {question}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-3 sm:px-6 whitespace-normal">
                    <div
                      className={cn(
                        "flex mx-auto w-fit items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-all duration-200",
                        statusConfig?.bgColor,
                        statusConfig?.borderColor,
                      )}
                    >
                      {statusConfig?.icon}
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-medium hidden sm:inline",
                          statusConfig?.textColor,
                        )}
                      >
                        {status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-3 sm:px-6 whitespace-normal">
                    <div
                      className={cn(
                        "flex size-8 sm:w-fit mx-auto items-center justify-center gap-1 sm:gap-2 sm:px-3 py-1 sm:py-2 rounded-lg border",
                        findings > 0
                          ? "bg-amber-50 border-amber-200"
                          : "bg-gray-50 justify-center size-8 border-gray-200",
                      )}
                    >
                      {findings > 0 && (
                        <AlertTriangle className="size-4 text-amber-500 hidden sm:inline" />
                      )}
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-medium",
                          findings > 0 ? "text-amber-700" : "text-gray-600",
                        )}
                      >
                        {findings}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-3 sm:px-6 whitespace-normal">
                    <div
                      className={cn(
                        "flex size-8 sm:w-fit mx-auto items-center justify-center gap-1 sm:gap-2 sm:px-3 py-1 sm:py-2 rounded-lg border",
                        pictures > 0
                          ? "bg-blue-50 border-blue-200"
                          : "size-8 justify-center bg-gray-50 border-gray-200",
                      )}
                    >
                      {pictures > 0 && (
                        <Camera className="size-4 text-blue-500 hidden sm:inline" />
                      )}
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-medium",
                          pictures > 0 ? "text-blue-700" : "text-gray-600",
                        )}
                      >
                        {pictures}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </div>
  );
}
