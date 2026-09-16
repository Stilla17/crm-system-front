import { cn } from "src/lib/utils";
import type { CompanyFilterProps } from "src/types/dashboard-toolbar";

export function CompanyFilter({
  companies,
  value,
  onChange,
}: CompanyFilterProps) {
  return (
    <div className="flex min-w-max flex-1 items-center gap-1">
      {companies.map((company) => {
        const isActive = company.id === value;

        return (
          <button
            key={company.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(company.id)}
            className={cn(
              "flex h-8 cursor-pointer items-center gap-2 rounded-[9px] px-3 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]",
              isActive
                ? "bg-[#151a22] font-semibold text-white"
                : "text-[#4e596b] hover:bg-[#f4f5f7] hover:text-[#171b22]",
            )}
          >
            {company.color ? (
              <span
                aria-hidden="true"
                className="size-2 rounded-[3px]"
                style={{ backgroundColor: company.color }}
              />
            ) : null}
            {company.label}
          </button>
        );
      })}
    </div>
  );
}
