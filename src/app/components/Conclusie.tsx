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
      className="max-w-4xl mx-auto px-4 pb-12 space-y-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 bg-aboma-yellow rounded-full h-10 shadow-sm" />
        <div>
          <h2 className="text-3xl text-aboma-blue font-bold tracking-tight">
            Conclusie
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Concluderende gegevens
          </p>
        </div>
      </div>

      <div className="mx-4 space-y-2">
        <Shortages conclusionData={conclusionData} />

        <Separator className="border-slate-200/80 mt-4" />

        {inspectionDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 px-6 overflow-hidden rounded-xl transition-all duration-300 hover:bg-slate-50"
          >
            <div className="flex items-center gap-5">
              <div className="size-12 bg-slate-100 flex items-center justify-center rounded-2xl">
                <detail.icon className="size-6 text-aboma-blue" />
              </div>
              <div className="space-y-1">
                <span className="text-slate-700 font-semibold text-lg block">
                  {detail.label}
                </span>
                <div className="w-12 h-0.5 bg-aboma-yellow rounded-full opacity-60" />
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-aboma-blue text-xl tracking-tight block">
                {detail.value}
              </span>
            </div>
          </div>
        ))}

        <Separator className="border-slate-200/80" />

        <div className="flex items-center justify-between py-6 px-6 overflow-hidden rounded-xl transition-all duration-300 hover:bg-slate-50">
          <div className="flex items-center gap-5">
            <div className="size-12 bg-emerald-100 flex items-center justify-center rounded-2xl">
              <PenTool className="size-6 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <span className="text-slate-700 font-semibold text-lg block">
                Handtekening
              </span>
              <div className="w-12 h-0.5 bg-emerald-600 rounded-full opacity-60" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-200/60 shadow-lg">
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
