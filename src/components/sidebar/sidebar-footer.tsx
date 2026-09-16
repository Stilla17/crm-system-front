import { SidebarFooterProps } from "src/types/sidebar";

export function SidebarFooter({ info }: SidebarFooterProps) {
  return (
    <footer className="border-t border-white/10 px-3 pt-3.5 text-[11px] leading-[18px] text-[#748093]">
      <p>Ma’lumot {info.date} holatiga</p>
      <p>{info.sources.join(" · ")}</p>
    </footer>
  );
}
