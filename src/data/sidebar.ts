import type { SidebarFooterInfo, SidebarSection } from "src/types/sidebar";

export const sidebarSections: SidebarSection[] = [
  {
    items: [{ label: "Umumiy", href: "/" }],
  },
  {
    label: "Bo‘limlar",
    items: [
      { label: "Sotuv", href: "/sales" },
      { label: "Marketing", href: "/marketing" },
      { label: "Moliya", href: "/finance" },
      { label: "Ta’minot", href: "/supply" },
      { label: "Kadrlar", href: "/staff" },
      { label: "IT", href: "/it" },
      { label: "Hududlar", href: "/regions" },
    ],
  },
  {
    label: "Ish",
    items: [
      { label: "Ma’lumot kiritish", href: "/data-entry" },
      { label: "Topshiriq", href: "/tasks" },
      { label: "Lug‘at", href: "/dictionary" },
    ],
  },
];

export const sidebarFooterInfo: SidebarFooterInfo = {
  date: "05.09.2026",
  sources: ["MoySklad", "CRM", "filial hisobotlari"],
};
