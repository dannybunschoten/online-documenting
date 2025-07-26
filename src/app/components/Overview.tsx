import { User, Calendar, Building2, Users, Hash } from "lucide-react";
import { formatDate, notAvailableString } from "@/lib/utils";
import { InfoCard } from "./InfoCard";
import { Shortages } from "./Shortages";
import TableOfContents from "./TableOfContents";
import ConfiguratieAandrijving from "./ConfiguratieAandrijving";
import { AdditionalData, InspectionData } from "../types";
import ConfiguratieVangInrichting from "./ConfiguratieVangInrichting";
import Resultaten from "./Resultaten";
import AdditionalResults from "./AdditionalResults";

export async function Overview({
  data,
  shortages,
  additionalData,
}: {
  data: InspectionData;
  shortages: boolean;
  additionalData: AdditionalData;
}) {
  return (
    <div className="bg-white lg:rounded-2xl shadow-lg lg:border border-slate-200 p-8 space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-8 bg-aboma-yellow rounded-full"></div>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Aboma Inspectie Rapport
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-aboma-blue leading-tight">
            {data.MaterialActivityDescription?.["@DisplayValue"]
              .split("-")[1]
              .trim()}
          </h1>
        </div>
        {data.MaterialActivityCode && (
          <div className="text-right">
            <div className="text-4xl md:text-6xl font-bold text-aboma-yellow mb-2">
              {data.MaterialActivityCode}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Activiteits Code
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <InfoCard
          icon={Calendar}
          label="Inspectie Datum"
          value={formatDate(data.MaterialStartDate)}
        />
        <InfoCard
          icon={User}
          label="Inspecteur"
          value={data.MaterialEmployeeName || notAvailableString}
        />
        <InfoCard
          icon={Building2}
          label="Object Type"
          value={
            data.MaterialMachineKind?.["@DisplayValue"] || notAvailableString
          }
        />
        <InfoCard
          icon={Users}
          label="Klant"
          value={data.MaterialOwner1 || notAvailableString}
        />
        <InfoCard
          icon={Hash}
          label="Order Nummer"
          value={data.MaterialCustomerOrderNumber || notAvailableString}
        />
        <Shortages
          shortages={shortages}
          stickerNumber={additionalData.stickerNumber}
          className="col-span-full"
        />
      </div>

      <TableOfContents />

      <ConfiguratieAandrijving data={data} additionalData={additionalData} />

      <ConfiguratieVangInrichting additionalData={additionalData} />

      <Resultaten additionalData={additionalData} />

      <AdditionalResults />
    </div>
  );
}
