import { User, Calendar, Building2, Users, Hash } from "lucide-react";
import { formatDate, notAvailableString } from "@/lib/utils";
import { InfoCard } from "./InfoCard";
import { Shortages } from "./Shortages";
import TableOfContents from "./TableOfContents";
import ConfiguratieAandrijving from "./ConfiguratieAandrijving";
import ConfiguratieVangInrichting from "./ConfiguratieVangInrichting";
import Resultaten from "./Resultaten";
import Conclusie from "./Conclusie";
import { CheckList } from "../types";

export async function Overview({ data }: { data: CheckList }) {
  return (
    <div className="bg-white lg:rounded-2xl shadow-lg lg:border border-slate-200 lg:p-8 px-4 py-6 space-y-3">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-8 bg-aboma-yellow rounded-full"></div>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Aboma Inspectie Rapport
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-aboma-blue leading-tight">
            {data.title ?? notAvailableString}
          </h1>
        </div>
        {data.checkCode && (
          <div className="text-right">
            <div className="text-4xl md:text-6xl font-bold text-aboma-yellow mb-2">
              {data.checkCode}
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
          value={formatDate(data.startDate)}
        />
        <InfoCard
          icon={User}
          label="Inspecteur"
          value={data.employeeName || notAvailableString}
        />
        <InfoCard
          icon={Building2}
          label="Object Type"
          value={data.machineKind || notAvailableString}
        />
        <InfoCard
          icon={Users}
          label="Klant"
          value={data.owner || notAvailableString}
        />
        <InfoCard
          icon={Hash}
          label="Order Nummer"
          value={data.customerOrderNumber || notAvailableString}
        />
        <Shortages
          conclusionData={data.checks.find(
            (checkGroup) => checkGroup.title === "Conclusie",
          )}
          className="col-span-full"
        />
      </div>

      <TableOfContents data={data} />

      <ConfiguratieAandrijving data={data} />

      <ConfiguratieVangInrichting data={data} />

      <Resultaten data={data} />

      <Conclusie data={data} />
    </div>
  );
}
