import { notAvailableString, titleToId } from "@/lib/utils";
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
          return (
            <section
              className="max-w-[900px] mx-auto px-4 mb-12"
              id={titleToId(title)}
              key={title}
            >
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden py-0 gap-0">
                <CardHeader className="bg-gradient-to-r from-aboma-blue to-aboma-blue/90 text-white pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        {idToOrder[title]?.CheckGroupPrefix
                          ? idToOrder[title]?.CheckGroupPrefix + " - "
                          : ""}
                        {idToOrder[title]?.Name || notAvailableString}
                      </CardTitle>
                      <CardDescription className="text-white/80 mt-1 font-medium">
                        Algemene resultaten van de inspectie
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ResultTable
                    tableData={tableData}
                    className="border-0 shadow-none min-w-full"
                    showControleCount={true}
                  />
                </CardContent>
              </Card>
            </section>
          );
        })}
    </div>
  );
}
