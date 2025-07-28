import { cn, notAvailableString, titleToId } from "@/lib/utils";
import {
  CardHeader,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getAdditionalDataTmp, getCheckPrefixTmp, getOrder } from "@/actions";
import { FileText } from "lucide-react";
import ResultTable from "./ResultTable";
import { CheckResult, OrderData } from "../types";
import { Badge } from "@/components/ui/badge";

export const toExclude = new Set([
  "ea99e2fc-3672-4e47-8963-8e2e94336940", // Configuratie Aandrijving
  "11b27201-a54f-4f0b-a039-bb19a1f04895", // Configuratie Vanginrichting
  "164d9f4e-99e2-4808-87e5-3c249be48ea2", // Conclusie
]);

export default async function AdditionalResults() {
  const additionalData = await getAdditionalDataTmp();
  const order = await getOrder();
  const checkData = await getCheckPrefixTmp();
  const checkLists: Record<string, CheckResult[]> = additionalData.reduce(
    (acc: Record<string, CheckResult[]>, check: CheckResult) => {
      const key = check.CheckGroup.Id;
      return {
        ...acc,
        [key]: [...(acc[key] || []), check],
      };
    },
    {},
  );
  const idToOrder = Object.keys(checkLists).reduce(
    (acc: Record<string, OrderData>, checkListId) => {
      const orderItem = order.find((elem) => elem.Code === checkListId);
      if (orderItem) {
        acc[checkListId] = orderItem;
      }
      return acc;
    },
    {} as Record<string, OrderData>,
  );

  return (
    <div>
      {Object.entries(checkLists)
        .sort(([checkListIdA], [checkListIdB]) => {
          const orderA = idToOrder[checkListIdA]?.SortOrder || "999";
          const orderB = idToOrder[checkListIdB]?.SortOrder || "999";
          return orderA.localeCompare(orderB);
        })
        .filter(([checklistId]) => !toExclude.has(checklistId))
        .map(([title, checkList]: [string, CheckResult[]]) => {
          const tableData = checkList
            .map((check: CheckResult) => ({
              prefix:
                checkData.Data.find(
                  (elem) =>
                    elem.CheckCode === check.Check.Id &&
                    elem.CheckGroupCode === check.CheckGroup.Id,
                )?.Prefix || "0000",
              question: check.Check.Text,
              status: check.ResultValues[0].DisplayText || "N.v.t.",
              findings: check.Actions.length,
              pictures: check.Photos.length,
              sortOrder:
                checkData.Data.find(
                  (elem) =>
                    elem.CheckCode === check.Check.Id &&
                    elem.CheckGroupCode === check.CheckGroup.Id,
                )?.SortOrder || "9999",
            }))
            .toSorted((checkA, checkB) =>
              checkA.sortOrder.localeCompare(checkB.sortOrder),
            );

          const isCheckListSkipped =
            checkList.length === 1 && checkList[0].Check.Id === "NA";
          return (
            <section
              className="max-w-[900px] mx-auto px-4 mb-12"
              id={titleToId(idToOrder[title]?.Name)}
              key={title}
            >
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden py-0 gap-0">
                <CardHeader
                  className={cn(
                    "bg-gradient-to-r text-white pt-6",
                    isCheckListSkipped
                      ? "pb-6 from-gray-400 to-gray-500"
                      : "from-aboma-blue to-aboma-blue/90",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center size-10 shrink-0 rounded-lg backdrop-blur-sm",
                        isCheckListSkipped ? "bg-white/30" : "bg-white/20",
                      )}
                    >
                      <FileText className="size-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        {idToOrder[title]?.CheckGroupPrefix
                          ? idToOrder[title]?.CheckGroupPrefix + " - "
                          : ""}
                        {idToOrder[title]?.Name || notAvailableString}
                        {isCheckListSkipped && (
                          <Badge className="ml-2 px-2 py-1 text-sm bg-white/20 rounded-md font-normal inline align-middle">
                            N.v.t.
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-white/80 mt-1 font-medium">
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
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        Niet van toepassing
                      </p>
                      <p className="text-sm text-gray-500">
                        Deze checklist is gemarkeerd als niet relevant voor deze
                        inspectie
                      </p>
                    </div>
                  ) : (
                    <ResultTable
                      tableData={tableData}
                      className="border-0 shadow-none min-w-full"
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
