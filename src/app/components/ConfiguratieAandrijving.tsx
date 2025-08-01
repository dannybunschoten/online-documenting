import {
  formatDate,
  formatKg,
  formatMeters,
  notAvailableString,
  titleToId,
} from "@/lib/utils";
import ConfiguratieTable from "./ConfiguratieTable";
import { CheckList } from "@/actions";
import { CheckResultValue } from "../types";

function findCheckResult(
  data: CheckList,
  checkGroupId: string,
  checkId: string,
): CheckResultValue | null {
  const checkGroup = data.checks.find(
    (checkGroup) => checkGroup.id === checkGroupId,
  );
  const check = checkGroup?.checks.find((check) => check.Check.Id === checkId);

  return check?.ResultValues[0] ?? null;
}

export default function ConfiguratieAandrijving({ data }: { data: CheckList }) {
  const tableData = new Map([
    ["Fabrikant", data.manufacturer],
    ["Model/type", data.modelType],
    ["Fabrieksnummer", data.serialNumber],
    ["Bouwjaar", data.buildYear],
    [
      "Inzet tot",
      formatDate(
        findCheckResult(
          data,
          "ea99e2fc-3672-4e47-8963-8e2e94336940",
          "aae5439a-c3be-4669-b223-4e04c9f3331e",
        )?.Value,
      ),
    ],
    [
      "Max. werklast",
      formatKg(
        findCheckResult(
          data,
          "ea99e2fc-3672-4e47-8963-8e2e94336940",
          "8524f05b-455f-43be-9321-6848d748181a",
        )?.Value,
      ),
    ],
    [
      "Max. vloerhoogte in deze opstelling",
      formatMeters(
        findCheckResult(
          data,
          "ea99e2fc-3672-4e47-8963-8e2e94336940",
          "e2aa7776-0971-4d02-b260-536f92e25767",
        )?.Value,
      ),
    ],
    [
      "Aantal stopplaatsen",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "55bae574-edf4-45af-8448-642d8992afd1",
      )?.Value,
    ],
    [
      "Aantal verankeringen",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "5972f323-379b-4b29-a448-5d719988a504",
      )?.Value,
    ],
    [
      "Bijzondere uitvoering",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "dd868167-7b6a-453e-ae86-cb3c78d4534b",
      )?.Value,
    ],
    [
      "Mast / toren uitvoering",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "e500d51a-4c9a-4e70-b1c1-9efc5848bca2",
      )?.Value,
    ],
    [
      "Omschrijving van de opstelling",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "78909d39-c85e-43aa-b2b0-d19f50a7d94f",
      )?.DisplayText || notAvailableString,
    ],
    [
      "Locatie van de opstelling",
      findCheckResult(
        data,
        "ea99e2fc-3672-4e47-8963-8e2e94336940",
        "a31c6fc2-6ee9-4c28-9b34-4216e59af97c",
      )?.Value,
    ],
  ]);

  return (
    <article
      id={titleToId("Configuratie Aandrijving")}
      className="max-w-[900px] mx-auto py-8 md:px-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 bg-aboma-yellow rounded-full h-10 shadow-sm" />
        <div>
          <h2 className="text-3xl text-aboma-blue font-bold tracking-tight">
            Configuratie Aandrijving
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Technische specificaties en kenmerken
          </p>
        </div>
      </div>
      <ConfiguratieTable tableData={tableData} />
    </article>
  );
}
