import ModalAvatar from "../header/modal-avatar";
import { LogOut } from "lucide-react";
import { useLogout } from "src/hooks/useAuth";

export function SidebarFooter() {
  const { mutate: logout } = useLogout();
  return (
    <footer className="border-t border-white/10 px-3 pt-3.5 text-[11px] leading-[18px] text-[#748093] flex  items-center justify-between">
      <h2 className="font-bold text-[12px]">Tizimdan chiqish</h2>

      <ModalAvatar title="Profil" description="Hisobingizni boshqarish">
        <button
          type="button"
          className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#efc8bc] bg-[#fff7f4] px-4 text-sm font-semibold text-[#c8471d] transition hover:border-[#e8622a] hover:bg-[#fff0ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
          onClick={() => logout()}
        >
          <LogOut className="size-4" />
          Tizimdan chiqish
        </button>
      </ModalAvatar>
    </footer>
  );
}
