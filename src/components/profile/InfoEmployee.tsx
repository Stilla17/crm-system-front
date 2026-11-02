import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { profile } from "src/app/(dashboard)/profile/page";
import DetailItem from "./DetailItem";

const InfoEmployee = () => {
  return (
    <section className="rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#eef1f8] text-[#435782]">
          <BriefcaseBusiness aria-hidden="true" className="size-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold text-[#20252c]">
            Ish ma’lumotlarim
          </h3>
          <p className="text-[11px] text-[#8a94a2]">
            Lavozim, filial va ish jadvali
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
        <DetailItem
          icon={<BadgeCheck className="size-4" />}
          label="Lavozim"
          value={profile.role}
        />
        <DetailItem
          icon={<BriefcaseBusiness className="size-4" />}
          label="Kompaniya"
          value={profile.company}
        />
        <DetailItem
          icon={<MapPin className="size-4" />}
          label="Filial"
          value={profile.location}
        />
        <DetailItem
          icon={<Clock3 className="size-4" />}
          label="Ish grafigi"
          value={profile.schedule}
        />
        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Ishga qabul qilingan"
          value={profile.hiredAt}
        />
        <DetailItem
          icon={<ShieldCheck className="size-4" />}
          label="Rol"
          value={profile.department}
        />
      </div>
    </section>
  );
};

export default InfoEmployee;
