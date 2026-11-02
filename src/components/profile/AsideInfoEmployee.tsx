import { CalendarDays, KeyRound, Mail, Phone, UserRound } from "lucide-react";
import DetailItem from "./DetailItem";
import { profile } from "src/app/(dashboard)/profile/page";

const AsideInfoEmployee = () => {
  return (
    <section className="rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-[#20252c]">
            Shaxsiy ma’lumotlar
          </h3>
          <p className="mt-0.5 text-[10px] text-[#929aa6]">
            Profil va aloqa ma’lumotlari
          </p>
        </div>
        <UserRound className="size-5 text-[#8a94a2]" />
      </div>

      <div className="mt-3">
        <DetailItem
          icon={<Phone className="size-4" />}
          label="Telefon"
          value={profile.phone}
        />
        <DetailItem
          icon={<Mail className="size-4" />}
          label="Elektron pochta"
          value={profile.email}
        />
        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Tug‘ilgan sana"
          value={profile.birthDate}
        />
        <DetailItem
          icon={<KeyRound className="size-4" />}
          label="Login"
          value={profile.login}
        />
      </div>
    </section>
  );
};

export default AsideInfoEmployee;
