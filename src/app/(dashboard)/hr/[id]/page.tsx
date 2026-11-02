import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Fingerprint,
  HandCoins,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import AsideInfoEmployee from "src/components/profile/AsideInfoEmployee";
import InfoEmployee from "src/components/profile/InfoEmployee";
import ProfileHeader from "src/components/profile/ProfileHeader";
import { EmployeeProfile } from "src/components/hr/employee-profile";

export const employee = {
  name: "Sardor Ismoilov",
  initials: "SI",
  role: "Savdo menejeri",
  department: "Sotuv bo‘limi",
  company: "Book.uz (Elpress)",
  phone: "+998 90 123 45 67",
  email: "sardor.ismoilov@book.uz",
  birthDate: "22-oktabr, 1998",
  login: "sardor.i",
  hiredAt: "12-fevral, 2024",
  location: "Toshkent, Chilonzor filiali",
  schedule: "Du–Ju, 09:00–18:00",
  verifixId: "VF-804291",
  lastSync: "Bugun, 10:42",
  salary: {
    base: "8 500 000 so‘m",
    accrued: "8 120 000 so‘m",
    bonus: "+650 000 so‘m",
    deduction: "−180 000 so‘m",
    net: "8 590 000 so‘m",
    period: "Oktabr 2026",
  },
};

export default async function EmployeeProfilePage({
  params,
}: PageProps<"/hr/[id]">) {
  const { id } = await params;

  if (id) {
    return <EmployeeProfile employeeId={id} />;
  }

  return (
    <div className="px-4 pb-8 sm:px-6">
      <Link
        href="/hr"
        className="mb-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#687487] transition-colors hover:text-[#252b34]"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Xodimlar ro‘yxatiga qaytish
      </Link>

      <ProfileHeader
        employee={{
          firstName: employee.name.split(" ")[0],
          lastName: employee.name.split(" ").slice(1).join(" "),
          middleName: "",
          companyId: "",
        }}
        roleName={employee.role}
        companyName={employee.company}
      />

      <section
        aria-label="Xodim ko‘rsatkichlari"
        className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          {
            label: "Ish kunlari",
            value: "22 kun",
            note: "Joriy oy",
            icon: <CalendarDays className="size-4" />,
            color: "bg-[#eef2ff] text-[#5267ad]",
          },
          {
            label: "Ishlangan vaqt",
            value: "171 soat",
            note: "Reja: 176 soat",
            icon: <Clock3 className="size-4" />,
            color: "bg-[#edf7f2] text-[#2e7a59]",
          },
          {
            label: "Kechikish",
            value: "2 marta",
            note: "Jami 18 daqiqa",
            icon: <Clock3 className="size-4" />,
            color: "bg-[#fff3e9] text-[#c16228]",
          },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-[16px] border border-[#e0e3e9] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#778293]">
                {stat.label}
              </p>
              <span
                className={`flex size-8 items-center justify-center rounded-[9px] ${stat.color}`}
              >
                {stat.icon}
              </span>
            </div>
            <p className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#20252c]">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-[#939ba7]">{stat.note}</p>
          </article>
        ))}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <InfoEmployee />

          <section
            id="salary"
            className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
          >
            <div className="flex flex-col gap-3 border-b border-[#e9ecf0] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#edf7f2] text-[#2d7757]">
                  <Banknote aria-hidden="true" className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#20252c]">
                    Ish haqi
                  </h3>
                  <p className="text-[11px] text-[#8a94a2]">
                    {employee.salary.period} hisob-kitobi
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border border-[#dce1e7] px-3 text-[11px] font-semibold text-[#586476] transition-colors hover:bg-[#f6f7f9]"
              >
                Hisob varaqasi
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid overflow-hidden rounded-[14px] bg-[#242b34] text-white md:grid-cols-[1.15fr_0.85fr]">
                <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">
                    Qo‘lga tegadigan summa
                  </p>
                  <p className="mt-2 text-[28px] font-bold tracking-[-0.04em] sm:text-[32px]">
                    {employee.salary.net}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-white/60">
                    <CheckCircle2 className="size-3.5 text-[#72d39e]" />
                    Hisob-kitob yakunlangan
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-[#242b34] p-4">
                    <p className="text-[10px] uppercase tracking-[0.07em] text-white/45">
                      Oylik stavka
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold">
                      {employee.salary.base}
                    </p>
                  </div>
                  <div className="bg-[#242b34] p-4">
                    <p className="text-[10px] uppercase tracking-[0.07em] text-white/45">
                      Hisoblangan
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold">
                      {employee.salary.accrued}
                    </p>
                  </div>
                  <div className="bg-[#242b34] p-4">
                    <p className="text-[10px] uppercase tracking-[0.07em] text-white/45">
                      Bonus
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold text-[#7fe0aa]">
                      {employee.salary.bonus}
                    </p>
                  </div>
                  <div className="bg-[#242b34] p-4">
                    <p className="text-[10px] uppercase tracking-[0.07em] text-white/45">
                      Ushlanmalar
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold text-[#ffac91]">
                      {employee.salary.deduction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#303640]">
                    Oxirgi to‘lovlar
                  </h4>
                  <p className="mt-0.5 text-[11px] text-[#929aa6]">
                    So‘nggi uch oylik tarix
                  </p>
                </div>
                <WalletCards
                  aria-hidden="true"
                  className="size-5 text-[#8a94a2]"
                />
              </div>

              <div className="mt-3 overflow-x-auto rounded-[12px] border border-[#e8ebef]">
                <table className="w-full min-w-125 border-collapse">
                  <thead className="bg-[#f8f9fb] text-left text-[10px] font-semibold uppercase tracking-[0.06em] text-[#808b9b]">
                    <tr>
                      <th className="px-3.5 py-2.5">Oy</th>
                      <th className="px-3.5 py-2.5">Hisoblangan</th>
                      <th className="px-3.5 py-2.5">To‘langan</th>
                      <th className="px-3.5 py-2.5 text-right">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf0f3] text-[12px]">
                    {[
                      ["Oktabr 2026", "8 590 000", "8 590 000", "To‘landi"],
                      ["Sentabr 2026", "8 340 000", "8 340 000", "To‘landi"],
                      ["Avgust 2026", "8 500 000", "8 500 000", "To‘landi"],
                    ].map(([month, accrued, paid, status]) => (
                      <tr key={month}>
                        <td className="px-3.5 py-3 font-medium text-[#313842]">
                          {month}
                        </td>
                        <td className="px-3.5 py-3 text-[#626e7e]">
                          {accrued} so‘m
                        </td>
                        <td className="px-3.5 py-3 text-[#626e7e]">
                          {paid} so‘m
                        </td>
                        <td className="px-3.5 py-3 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f7ef] px-2 py-1 text-[10px] font-semibold text-[#24704e]">
                            <CheckCircle2 className="size-3" />
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[#fff8f2] px-3 py-2.5 text-[11px] text-[#8d633f]">
                <HandCoins aria-hidden="true" className="size-4 shrink-0" />
                Ish haqi ma’lumotlari faqat tegishli ruxsati bor
                foydalanuvchilarga ko‘rsatiladi.
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <AsideInfoEmployee />
          <section className="rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
            <h3 className="text-[14px] font-semibold text-[#20252c]">
              So‘nggi faollik
            </h3>
            <div className="mt-4 space-y-4">
              {[
                ["Tizimga kirdi", "Bugun, 09:02"],
                ["Verifix ma’lumoti yangilandi", "Bugun, 08:45"],
                ["Profil tahrirlandi", "20-oktabr, 16:18"],
              ].map(([title, date]) => (
                <div key={`${title}-${date}`} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#e8622a] ring-4 ring-[#fff0e9]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#343b45]">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#929aa6]">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
                  <p className="text-[11px] text-[#8a94a2]">
                    Integratsiya holati
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f7ef] px-2 py-1 text-[10px] font-semibold text-[#24704e]">
                <CheckCircle2 aria-hidden="true" className="size-3" />
                Sinxron
              </span>
            </div>

            <dl className="mt-4 space-y-3 border-t border-[#edf1ef] pt-4">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[12px] text-[#7c8795]">Verifix ID</dt>
                <dd className="font-mono text-[12px] font-semibold text-[#323944]">
                  {employee.verifixId}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[12px] text-[#7c8795]">Oxirgi sinxron</dt>
                <dd className="text-[12px] font-medium text-[#323944]">
                  {employee.lastSync}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[12px] text-[#7c8795]">CRM ID</dt>
                <dd className="max-w-37 truncate font-mono text-[12px] font-medium text-[#323944]">
                  {id}
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
