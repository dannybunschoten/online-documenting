import { titleToId } from "@/lib/utils";
import ResultTable from "../ResultTable";
import { Checklist } from "@/app/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function Mast({
  mastChecklist,
}: {
  mastChecklist: Checklist[];
}) {
  return (
    <section
      className="max-w-[900px] mx-auto px-4 mb-12"
      id={titleToId("0200 - Mast")}
    >
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden py-0 gap-0">
        <CardHeader className="bg-gradient-to-r from-aboma-blue to-aboma-blue/90 text-white pt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                0200 - Mast
              </CardTitle>
              <CardDescription className="text-white/80 mt-1 font-medium">
                Resultaten van de mast inspectie
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ResultTable
            tableData={mastChecklist}
            className="border-0 shadow-none min-w-full"
            showControleCount={true}
          />
        </CardContent>
      </Card>
    </section>
  );
}
