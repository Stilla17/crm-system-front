import { Menu } from "@base-ui/react/menu";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";

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
        const hasActions = isActive && company.id !== "all";

        return (
          <div
            key={company.id}
            className={cn(
              "flex h-8 items-center rounded-[9px] transition-colors",
              isActive
                ? "bg-[#151a22] font-semibold text-white"
                : "text-[#4e596b] hover:bg-[#f4f5f7] hover:text-[#171b22]",
            )}
          >
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(company.id)}
              className={cn(
                "flex h-full cursor-pointer items-center gap-2 rounded-[9px] px-3 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]",
                hasActions && "pr-1.5",
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

            {hasActions ? (
              <Menu.Root>
                <Menu.Trigger
                  aria-label={`${company.label} amallari`}
                  className="mr-1 flex size-7 cursor-pointer items-center justify-center rounded-[7px] text-white/70 transition-colors hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#75a7f7] data-[popup-open]:bg-white/12 data-[popup-open]:text-white"
                >
                  <Ellipsis aria-hidden="true" className="size-[17px]" />
                </Menu.Trigger>

                <Menu.Portal>
                  <Menu.Positioner sideOffset={7} align="end" className="z-50">
                    <Menu.Popup className="w-[142px] origin-[var(--transform-origin)] rounded-[11px] border border-[#e2e5ea] bg-white p-1.5 text-[13px] text-[#252b35] shadow-[0_10px_30px_rgba(24,32,45,0.14)] outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                      <Menu.Item className="flex h-9 cursor-pointer items-center gap-2.5 rounded-[7px] px-2.5 outline-none transition-colors data-[highlighted]:bg-[#f2f5f9]">
                        <PencilLine
                          aria-hidden="true"
                          className="size-4 text-[#637083]"
                        />
                        Edit
                      </Menu.Item>
                      <Menu.Item className="flex h-9 cursor-pointer items-center gap-2.5 rounded-[7px] px-2.5 text-[#d33b3b] outline-none transition-colors data-[highlighted]:bg-[#fff1f1]">
                        <Trash2 aria-hidden="true" className="size-4" />
                        Delete
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
