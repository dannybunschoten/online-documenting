import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export function Shortages({
  shortages,
  stickerNumber,
  className,
}: {
  shortages: boolean;
  stickerNumber?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-lg p-6 bg-gradient-to-br",
        shortages
          ? "from-rose-600 to-red-600"
          : "from-emerald-600 to-green-600",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-16 bg-white/20 rounded-full items-center justify-center hidden md:flex">
            {shortages ? (
              <X className="size-12 text-white" />
            ) : (
              <Check className="size-12 text-white" />
            )}
          </div>
          <div>
            <div className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-1">
              Inspectie conclusie
            </div>
            <div className="text-white text-xl font-bold">
              {shortages ? "T" : "Geen t"}ekortkomingen geconstateerd
            </div>
          </div>
        </div>
        {!shortages && stickerNumber && (
          <div className="text-right">
            <div className="text-emerald-100 text-sm font-medium mb-1">
              Certifaat Nummer
            </div>
            <div className="text-white text-2xl font-bold bg-white/20 px-4 py-2 rounded-lg">
              {stickerNumber}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
