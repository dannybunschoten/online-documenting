import {
  formatDate,
  formatKg,
  formatMeters,
  notAvailableString,
  titleToId,
} from "@/lib/utils";
import ConfiguratieTable from "./ConfiguratieTable";
import { CheckList } from "@/actions";
import { CheckResultValue, CheckGroup, ExtendedCheckResult } from "../types";

function findCheckInGroup(
  checkGroup: CheckGroup | undefined,
  checkId: string,
): CheckResultValue | null {
  const check = checkGroup?.checks.find(
    (check: ExtendedCheckResult) => check.Check.Id === checkId,
  );
  return check?.ResultValues[0] ?? null;
}

export default function ConfiguratieVangInrichting({
  data,
}: {
  data: CheckList;
}) {
  const checkGroupId = "11b27201-a54f-4f0b-a039-bb19a1f04895";
  const checkGroup = data.checks.find((group) => group.id === checkGroupId);

  const tableData = new Map([
    [
      "Fabrikant",
      findCheckInGroup(checkGroup, "57e13bbc-002c-43a1-8f14-83fa95f18a0c")
        ?.Value || notAvailableString,
    ],
    [
      "Model / type",
      findCheckInGroup(checkGroup, "e807f0c8-6eb5-4bfb-90b4-2d8d15645533")
        ?.Value || notAvailableString,
    ],
    [
      "Fabrieksnummer",
      findCheckInGroup(checkGroup, "cc4bb282-601c-47fa-8c26-c041f90c3707")
        ?.Value || notAvailableString,
    ],
    [
      "Bouwjaar",
      findCheckInGroup(checkGroup, "b6f4483d-a3e0-4ff3-9039-5c3d38ac433e")
        ?.Value || notAvailableString,
    ],
    [
      "Inzet tot",
      formatDate(
        findCheckInGroup(checkGroup, "aae5439a-c3be-4669-b223-4e04c9f3331e")
          ?.Value || notAvailableString,
      ),
    ],
    [
      "Max. werklast",
      formatKg(
        findCheckInGroup(checkGroup, "8524f05b-455f-43be-9321-6848d748181a")
          ?.Value || notAvailableString,
      ),
    ],
    [
      "Max. vloerhoogte in deze opstelling",
      formatMeters(
        findCheckInGroup(checkGroup, "e2aa7776-0971-4d02-b260-536f92e25767")
          ?.Value || notAvailableString,
      ),
    ],
    [
      "Aantal stopplaatsen",
      findCheckInGroup(checkGroup, "55bae574-edf4-45af-8448-642d8992afd1")
        ?.Value || notAvailableString,
    ],
    [
      "Omschrijving van de opstelling",
      findCheckInGroup(checkGroup, "78909d39-c85e-43aa-b2b0-d19f50a7d94f")
        ?.DisplayText || notAvailableString,
    ],
  ]);

  return (
    <article
      id={titleToId("Configuratie Vanginrichting")}
      className="max-w-[900px] mx-auto md:px-4 py-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 bg-aboma-yellow rounded-full h-10 shadow-sm" />
        <div>
          <h2 className="text-3xl text-aboma-blue font-bold tracking-tight">
            Configuratie Vang Inrichting
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
