import { SidebarNavSectionProps } from "src/types/sidebar";
import { SidebarNavItem } from "./sidebar-nav-item";

function isItemActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname.startsWith(`${href}/`) || pathname === href;
}

export function SidebarNavSection({
  section,
  pathname,
}: SidebarNavSectionProps) {
  return (
    <section aria-label={section.label ?? "Asosiy"}>
      {section.label ? (
        <h2 className="mb-2 px-3 text-[11px] font-normal leading-4 text-[#68717e]">
          {section.label}
        </h2>
      ) : null}

      <ul className="space-y-0.5">
        {section.items.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isActive={isItemActive(pathname, item.href)}
          />
        ))}
      </ul>
    </section>
  );
}
