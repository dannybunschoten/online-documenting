import {
  formatDate,
  formatKg,
  formatMeters,
  notAvailableString,
  titleToId,
} from "@/lib/utils";
import { AdditionalData } from "../types";
import ConfiguratieTable from "./ConfiguratieTable";

export default function ConfiguratieVangInrichting({
  additionalData,
}: {
  additionalData: AdditionalData;
}) {
  const tableData = new Map([
    ["Fabrikant", additionalData.catchingDeviceManufacturer],
    ["Model / type", additionalData.catchingDeviceModel],
    ["Fabrieksnummer", additionalData.catchingDeviceFactoryNumber],
    ["Bouwjaar", additionalData.catchingDeviceYearOfConstruction],
    ["Inzet tot", formatDate(additionalData.catchingDeviceEndDate)],
    ["Max. werklast", formatKg(additionalData.catchingDeviceMaxWeight)],
    [
      "Max. vloerhoogte in deze opstelling",
      formatMeters(additionalData.catchingDeviceMaxFloorHeight),
    ],
    ["Aantal stopplaatsen", additionalData.catchingDeviceStoppingPlaces],
    [
      "Omschrijving van de opstelling",
      additionalData.catchingDeviceSetupDescription || notAvailableString,
    ],
  ]);

  return (
    <article
      id={titleToId("Configuratie Vanginrichting")}
      className="max-w-[900px] mx-auto px-4 py-8"
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
