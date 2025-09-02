import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { CheckDataOrdered } from "../types";

export function Shortages({
  conclusionData,
  className,
}: {
  conclusionData?: {
    checks: CheckDataOrdered[];
  };
  className?: string;
}) {
  const shortages =
    conclusionData?.checks.find(
      (check) => check.Check.Id === "58736c8f-95f9-447f-81e1-0e20b1a0f15a",
    )?.ResultValues[0].Value !== "07f560ea-eaa4-4e1c-bfed-8bd215e19b8a";
  const stickerNumber = conclusionData?.checks.find(
    (check) => check.Check.Id === "a17140b6-761c-4504-8836-0bd5a1c756c5",
  )?.ResultValues[0].Value;

  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br p-6 shadow-lg",
        shortages
          ? "from-rose-600 to-red-600"
          : "from-emerald-600 to-green-600",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden size-16 items-center justify-center rounded-full bg-white/20 md:flex">
            {shortages ? (
              <X className="size-12 text-white" />
            ) : (
              <Check className="size-12 text-white" />
            )}
          </div>
          <div>
            <div className="mb-1 text-sm font-medium tracking-wider text-emerald-100 uppercase">
              Eindoordeel
            </div>
            <div className="text-xl font-bold text-white">
              {shortages ? "T" : "Geen t"}ekortkomingen geconstateerd
            </div>
          </div>
        </div>
        {!shortages && stickerNumber && (
          <div className="text-right">
            <div className="mb-1 text-sm font-medium text-emerald-100">
              Certificaatnummer
            </div>
            <div className="rounded-lg bg-white/20 px-4 py-2 text-2xl font-bold text-white">
              {stickerNumber}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
