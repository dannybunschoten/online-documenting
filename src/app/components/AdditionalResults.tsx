import { cn, notAvailableString, titleToId } from "@/lib/utils";
import {
  CardHeader,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import ResultTable from "./ResultTable";
import { Badge } from "@/components/ui/badge";
import { CheckList } from "../types";

export const toExclude = new Set([
  "ea99e2fc-3672-4e47-8963-8e2e94336940", // Configuratie Aandrijving
  "11b27201-a54f-4f0b-a039-bb19a1f04895", // Configuratie Vanginrichting
  "164d9f4e-99e2-4808-87e5-3c249be48ea2", // Conclusie
]);

export default async function AdditionalResults({ data }: { data: CheckList }) {
  const checkListsToShow = data.checks.filter(
    (checkList) => !toExclude.has(checkList.checks[0].CheckGroup.Id),
  );
  return (
    <div>
      {checkListsToShow.map((checkgroup) => {
        const isCheckListSkipped =
          checkgroup.checks.length === 1 &&
          checkgroup.checks[0].Check.Id === "NA";
        return (
          <section
            className="mx-auto mb-12 max-w-[900px] px-4"
            id={titleToId(checkgroup.title)}
            key={checkgroup.title}
          >
            <Card className="gap-0 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 py-0 shadow-lg">
              <CardHeader
                className={cn(
                  "bg-gradient-to-r pt-6 text-white",
                  isCheckListSkipped
                    ? "from-gray-400 to-gray-500 pb-6"
                    : "from-aboma-blue to-aboma-blue/90",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg backdrop-blur-sm",
                      isCheckListSkipped ? "bg-white/30" : "bg-white/20",
                    )}
                  >
                    <FileText className="size-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                      {checkgroup.prefix ? checkgroup.prefix + " - " : ""}
                      {checkgroup.title || notAvailableString}
                      {isCheckListSkipped && (
                        <Badge className="ml-2 inline rounded-md bg-white/20 px-2 py-1 align-middle text-sm font-normal">
                          N.v.t.
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1 font-medium text-white/80">
                      {isCheckListSkipped
                        ? "Deze checklist is niet van toepassing"
                        : "Algemene resultaten van de inspectie"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isCheckListSkipped ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-gray-100">
                      <FileText className="size-8 text-gray-400" />
                    </div>
                    <p className="mb-2 text-lg font-medium text-gray-600">
                      Niet van toepassing
                    </p>
                    <p className="text-sm text-gray-500">
                      Deze checklist is gemarkeerd als niet relevant voor deze
                      inspectie
                    </p>
                  </div>
                ) : (
                  <ResultTable
                    tableData={checkgroup.checks}
                    className="min-w-full border-0 shadow-none"
                    showControleCount={true}
                  />
                )}
              </CardContent>
            </Card>
          </section>
        );
      })}
    </div>
  );
}
