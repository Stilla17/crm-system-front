import ModalAvatar from "../header/custom-modal";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useLogout } from "src/hooks/useAuth";
import { useAuthProfile } from "src/hooks/users/useAuthProfile";

export function SidebarFooter() {
  const { mutate: logout } = useLogout();
  const { data: profile } = useAuthProfile();
  const isSuperAdmin =
    profile?.roleScope === "system" && profile.companyId === null;
  return (
    <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-1 pt-3.5 text-[11px] leading-[18px] text-[#748093]">
      {profile && !isSuperAdmin ? (
      <Link
        href="/profile"
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-[9px] px-2 py-2 text-[#c8cdd4] transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.07]">
          <UserRound className="size-4" />
        </span>
        <span className="truncate text-[12px] font-semibold">Mening profilim</span>
      </Link>
      ) : (
        <span className="min-w-0 flex-1 truncate px-2 py-2 text-[12px] font-semibold text-[#c8cdd4]">
          {isSuperAdmin ? "Super Admin" : "Hisob"}
        </span>
      )}

      <ModalAvatar
        title="Hisob"
        description="Hisobingizni boshqarish"
        trigger={
          <button
            type="button"
            aria-label="Tizimdan chiqish oynasini ochish"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="size-4" />
          </button>
        }
      >
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
