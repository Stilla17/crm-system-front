import ModalAvatar from "../header/modal-avatar";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useLogout } from "src/hooks/useAuth";

export function SidebarFooter() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <footer className="border-t border-white/10 px-3 pt-3.5 text-[11px] leading-[18px] text-[#748093] flex  items-center justify-between">
      <div className="size-10 overflow-hidden rounded-full bg-[#d6dbe3]">
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="size-full object-cover"
        />
      </div>

      <ModalAvatar title="Profil" description="Hisobingizni boshqarish">
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#f5f6f8] p-3">
          <div className="size-11 overflow-hidden rounded-full bg-[#d6dbe3]">
            <Image
              src="/avatar.png"
              alt="User Avatar"
              width={44}
              height={44}
              className="size-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#20252d]">
              Foydalanuvchi
            </p>
            <p className="mt-0.5 text-xs text-[#778294]">CRM hisobi</p>
          </div>
        </div>

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
