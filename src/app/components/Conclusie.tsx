import { notAvailableString, titleToId } from "@/lib/utils";
import { Shortages } from "./Shortages";
import signature from "@/../public/signature.png";
import Image from "next/image";
import { Calendar, Hash, PenTool, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CheckList } from "../types";

export default function Conclusie({ data }: { data: CheckList }) {
  const conclusionData = data.checks.find(
    (checkGroup) => checkGroup.title === "Conclusie",
  );
  const stickerNumber = conclusionData?.checks.find(
    (check) => check.Check.Id === "a17140b6-761c-4504-8836-0bd5a1c756c5",
  )?.ResultValues[0].Value;

  const inspectionDetails = [
    {
      icon: Hash,
      label: "Stickernummer",
      value: stickerNumber,
    },
    {
      icon: Calendar,
      label: "Inspectie Datum",
      value: data.startDate || notAvailableString,
    },
    {
      icon: User,
      label: "Inspecteur",
      value: data.employeeName || notAvailableString,
    },
  ];

  return (
    <article
      id={titleToId("Conclusie")}
      className="mx-auto max-w-4xl space-y-8 px-4 pb-12"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-aboma-yellow h-10 w-1.5 rounded-full shadow-sm" />
        <div>
          <h2 className="text-aboma-blue text-3xl font-bold tracking-tight">
            Conclusie
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Concluderende gegevens
          </p>
        </div>
      </div>

      <div className="mx-4 space-y-2">
        <Shortages conclusionData={conclusionData} />

        <Separator className="mt-4 border-slate-200/80" />

        {inspectionDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between overflow-hidden rounded-xl px-6 py-6 transition-all duration-300 hover:bg-slate-50"
          >
            <div className="flex items-center gap-5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100">
                <detail.icon className="text-aboma-blue size-6" />
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-semibold text-slate-700">
                  {detail.label}
                </span>
                <div className="bg-aboma-yellow h-0.5 w-12 rounded-full opacity-60" />
              </div>
            </div>
            <div className="text-right">
              <span className="text-aboma-blue block text-xl font-bold tracking-tight">
                {detail.value}
              </span>
            </div>
          </div>
        ))}

        <Separator className="border-slate-200/80" />

        <div className="flex items-center justify-between overflow-hidden rounded-xl px-6 py-6 transition-all duration-300 hover:bg-slate-50">
          <div className="flex items-center gap-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100">
              <PenTool className="size-6 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <span className="block text-lg font-semibold text-slate-700">
                Handtekening
              </span>
              <div className="h-0.5 w-12 rounded-full bg-emerald-600 opacity-60" />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
            <div className="relative">
              <Image
                src={signature}
                alt="Inspecteur handtekening"
                className="max-h-20 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
