import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
      <Icon className="text-aboma-blue size-5 shrink-0" />
      <div>
        <label className="text-muted-foreground text-sm font-medium">
          {label}
        </label>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
