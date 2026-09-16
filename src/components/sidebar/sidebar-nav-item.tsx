import Link from "next/link"

import { cn } from "src/lib/utils"
import { SidebarNavItemProps } from "src/types/sidebar"

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group flex min-h-9 items-center gap-2.5 rounded-[9px] px-3 text-[14px] leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
          isActive
            ? "bg-[#f6f7f8] font-medium text-[#11151b]"
            : "text-[#c8cdd4] hover:bg-white/[0.06] hover:text-white",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-[7px] shrink-0 rounded-[2px] transition-colors",
            isActive ? "bg-[#ef5a29]" : "bg-[#767d87] group-hover:bg-[#aab0b8]",
          )}
        />
        <span>{item.label}</span>
      </Link>
    </li>
  )
}
