import { cn } from "src/lib/utils";
import type { PeriodFilterProps } from "src/types/dashboard-toolbar";

import { DateField } from "./date-field";

const outlineButtonClass =
  "h-9 rounded-[9px] border cursor-pointer border-[#d7dce4] bg-white px-3 text-[13px] text-[#526074] transition-colors hover:bg-[#f7f8fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]";

export function PeriodFilter({ periods, value, onChange }: PeriodFilterProps) {
  return (
    <form className="min-w-max" onSubmit={(event) => event.preventDefault()}>
      <div className="flex items-center gap-2">
        <span className="mr-1 text-[13px] text-[#526074]">Oy:</span>
        <div className="flex gap-1.5">
          {periods.map((period) => {
            const isActive = period.id === value;

            return (
              <button
                key={period.id}
                type="button"
                disabled={period.disabled}
                aria-pressed={isActive}
                onClick={() => onChange(period.id)}
                className={cn(
                  "h-8 rounded-[7px] border cursor-pointer border-[#d8dee7] bg-white px-2.5 text-[12px] font-medium text-[#536176] transition-colors hover:border-[#f06432] hover:text-[#d94e1d] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#f06432] disabled:cursor-not-allowed disabled:border-[#e8ebef] disabled:bg-[#fafafa] disabled:text-[#c7ccd4]",
                  isActive &&
                    "border-[#f06432] bg-[#f06432] text-white hover:bg-[#dc5426] hover:text-white",
                )}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-[#edf0f3] pt-3">
        <span className="mr-1 text-[13px] font-medium text-[#374151]">
          Sana bo‘yicha:
        </span>
        <DateField ariaLabel="Boshlanish sanasi" label="Dan" />
        <DateField ariaLabel="Tugash sanasi" label="Gacha" />
        <button type="submit" className={outlineButtonClass}>
          Ko‘rish
        </button>
        <span className="mx-1 h-6 w-px bg-[#e1e5ea]" aria-hidden="true" />
        <button type="button" className={outlineButtonClass}>
          Kun hisoboti
        </button>
      </div>
    </form>
  );
}
