import { CheckList } from "../types";
import AdditionalResults from "./AdditionalResults";

export default function Resultaten({ data }: { data: CheckList }) {
  return (
    <article className="mx-auto max-w-[900px] py-8 lg:px-4">
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-aboma-yellow h-10 w-1.5 rounded-full shadow-sm" />
        <div>
          <h2 className="text-aboma-blue text-3xl font-bold tracking-tight">
            Resultaten
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Technische specificaties en kenmerken
          </p>
        </div>
      </div>
      <AdditionalResults data={data} />
    </article>
  );
}
