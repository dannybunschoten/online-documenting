import { AdditionalData } from "../types";
import Algemeen from "./Resultaten/Algemeen";
import Mast from "./Resultaten/Mast";
import Basisstation from "./Resultaten/Basisstation";

export default function Resultaten({
  additionalData,
}: {
  additionalData: AdditionalData;
}) {
  return (
    <article className="max-w-[900px] mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 bg-aboma-yellow rounded-full h-10 shadow-sm" />
        <div>
          <h2 className="text-3xl text-aboma-blue font-bold tracking-tight">
            Resultaten
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Technische specificaties en kenmerken
          </p>
        </div>
      </div>
      <Algemeen algemeenChecklist={additionalData.algemeenChecklist} />
      <Mast mastChecklist={additionalData.mastChecklist} />
      <Basisstation
        basisstationChecklist={additionalData.basisstationChecklist}
      />
    </article>
  );
}
