import {
  formatDate,
  formatKg,
  formatMeters,
  notAvailableString,
  titleToId,
} from "@/lib/utils";
import { AdditionalData, InspectionData } from "../types";
import ConfiguratieTable from "./ConfiguratieTable";

export default function ConfiguratieAandrijving({
  data,
  additionalData,
}: {
  data: InspectionData;
  additionalData: AdditionalData;
}) {
  const tableData = new Map([
    ["Fabrikant", data.MaterialManufacturer],
    ["Model/type", data.MaterialTypeCode],
    ["Fabrieksnummer", data.MaterialSerialNumber],
    ["Bouwjaar", data.MaterialYear],
    ["Inzet tot", formatDate(additionalData.endDate)],
    ["Max. werklast", formatKg(additionalData.maxWeight)],
    [
      "Max. vloerhoogte in deze opstelling",
      formatMeters(additionalData.maxFloorHeight),
    ],
    ["Aantal stopplaatsen", additionalData.stoppingPlaces],
    ["Aantal verankeringen", additionalData.anchorage],
    ["Bijzondere uitvoering", additionalData.specialVersion],
    ["Mast / toren uitvoering", additionalData.mastVersion],
    [
      "Omschrijving van de opstelling",
      additionalData.setupDescription || notAvailableString,
    ],
    ["Locatie van de opstelling", additionalData.setupLocation],
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
