import { DateFieldProps } from "src/types/dashboard-toolbar";

export function DateField({ ariaLabel, label, className }: DateFieldProps) {
  return (
    <label className={`flex items-center gap-2 ${className ?? ""}`}>
      <span className="text-[13px] text-[#526074]">{label}</span>
      <span className="block">
        <input
          type="date"
          aria-label={ariaLabel}
          className="h-9 w-[148px] rounded-[9px] border border-[#d7dce4] bg-white px-3 text-[13px] text-[#242a33] outline-none transition focus:border-[#8aa9dc] focus:ring-2 focus:ring-[#2467d1]/15"
        />
      </span>
    </label>
  );
}
