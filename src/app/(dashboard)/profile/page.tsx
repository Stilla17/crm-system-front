import { CheckCircle2, Fingerprint } from "lucide-react";
import AsideInfoEmployee from "src/components/profile/AsideInfoEmployee";

import InfoEmployee from "src/components/profile/InfoEmployee";
import PayMonth from "src/components/profile/PayMonth";
import ProfileHeader from "src/components/profile/ProfileHeader";
import WorkDay from "src/components/profile/WorkDay";

export const profile = {
  name: "Sardor Ismoilov",
  initials: "SI",
  role: "Savdo menejeri",
  department: "Sotuv bo‘limi",
  company: "Book.uz (Elpress)",
  phone: "+998 90 123 45 67",
  email: "sardor.ismoilov@book.uz",
  birthDate: "22-oktabr, 1998",
  login: "sardor.i",
  location: "Toshkent, Chilonzor filiali",
  hiredAt: "12-fevral, 2024",
  schedule: "09:00–18:00",
  verifixId: "VF-804291",
};

export default function MyProfilePage() {
  return (
    <div className="px-4 pb-8 sm:px-6">
      <ProfileHeader
        employee={{
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ").slice(1).join(" "),
          middleName: "",
          companyId: "",
        }}
        roleName={profile.role}
        companyName={profile.company}
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <WorkDay />

          <PayMonth />

          <InfoEmployee />
        </div>

        <aside className="space-y-4">
          <AsideInfoEmployee />
          <section className="rounded-[17px] border border-[#dce8e2] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#e9f7ef] text-[#297353]">
                  <Fingerprint aria-hidden="true" className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#20252c]">
                    Verifix
                  </h3>
                  <p className="text-[10px] text-[#8a94a2]">Davomat tizimi</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f7ef] px-2 py-1 text-[10px] font-semibold text-[#24704e]">
                <CheckCircle2 className="size-3" />
                Ulangan
              </span>
            </div>

            <div className="mt-4 rounded-[11px] bg-[#f7faf8] px-3.5 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#7c8795]">Verifix ID</span>
                <span className="font-mono text-[11px] font-semibold text-[#323944]">
                  {profile.verifixId}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#7c8795]">
                  Oxirgi yangilanish
                </span>
                <span className="text-[11px] font-medium text-[#323944]">
                  Bugun, 10:42
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
