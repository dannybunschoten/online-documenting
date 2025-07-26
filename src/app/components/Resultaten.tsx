import AdditionalResults from "./AdditionalResults";

export default function Resultaten() {
  return (
    <article className="max-w-[900px] mx-auto md:px-4 py-8">
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
      <AdditionalResults />
    </article>
  );
}
