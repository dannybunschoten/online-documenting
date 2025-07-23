import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
      <Icon className="size-5 text-aboma-blue shrink-0" />
      <div>
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
