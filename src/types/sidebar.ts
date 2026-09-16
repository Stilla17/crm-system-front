export type SidebarItem = {
  label: string;
  href: string;
};

export type SidebarSection = {
  label?: string;
  items: SidebarItem[];
};

export type SidebarFooterInfo = {
  date: string;
  sources: string[];
};

export type SidebarFooterProps = {
  info: SidebarFooterInfo;
};

export type SidebarNavItemProps = {
  item: SidebarItem;
  isActive: boolean;
};

export type SidebarNavSectionProps = {
  section: SidebarSection;
  pathname: string;
};
