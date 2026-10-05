"use client";

import { usePathname } from "next/navigation";

import { sidebarFooterInfo, sidebarSections } from "src/data/sidebar";

import { SidebarBrand } from "./sidebar-brand";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarNavSection } from "./sidebar-nav-section";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-[calc(100svh-2px)] w-[218px] shrink-0 flex-col overflow-y-auto bg-[#171a1f] px-3 pb-4 pt-[26px]">
      <div className="px-2.5">
        <SidebarBrand />
      </div>

      <nav
        aria-label="Asosiy navigatsiya"
        className="mt-[19px] flex flex-1 flex-col gap-3.5"
      >
        {sidebarSections.map((section, index) => (
          <SidebarNavSection
            key={section.label ?? `main-${index}`}
            section={section}
            pathname={pathname}
          />
        ))}
      </nav>

      <SidebarFooter />
    </aside>
  );
}
