import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  KeyRound,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  ShieldCheck,
  UserPlus,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { state } from "src/data/company-summaries";

const companyLeadership = [
  {
    id: "bookuz",
    company: "Book.uz (Elpress)",
    type: "Kitob do‘koni",
    color: "#e8622a",
    manager: {
      name: "Azizbek Karimov",
      role: "Bosh direktor",
      email: "azizbek@book.uz",
      initials: "AK",
    },
  },
  {
    id: "yangi-asr",
    company: "Yangi asr avlodi",
    type: "Nashriyot",
    color: "#354995",
    manager: {
      name: "Dilnoza Rasulova",
      role: "Ijrochi direktor",
      email: "d.rasulova@yaa.uz",
      initials: "DR",
    },
  },
  {
    id: "yoshlar",
    company: "Yoshlar matbuoti",
    type: "Nashriyot",
    color: "#238b5e",
    manager: null,
  },
  {
    id: "mitti-olam",
    company: "Mitti olam",
    type: "Kitob do‘koni",
    color: "#8d45bd",
    manager: {
      name: "Kamola Ergasheva",
      role: "Kompaniya rahbari",
      email: "kamola@mittiolam.uz",
      initials: "KE",
    },
  },
];

const candidates = [
  {
    name: "Sardor Ismoilov",
    position: "Operatsion menejer",
    initials: "SI",
    tone: "bg-[#e8efff] text-[#3159a5]",
  },
  {
    name: "Madina Aliyeva",
    position: "Savdo bo‘limi rahbari",
    initials: "MA",
    tone: "bg-[#fcece6] text-[#ad4b22]",
  },
  {
    name: "Javohir Umarov",
    position: "Hududiy menejer",
    initials: "JU",
    tone: "bg-[#e5f5ee] text-[#217355]",
  },
];

export default function OwnerPage() {
  return (
    <div className="px-6 pb-8">
      <section
        aria-label="Rahbarlar bo‘yicha qisqa ma’lumot"
        className="grid gap-3.5 md:grid-cols-3"
      >
        <div className="rounded-[17px] border border-[#e0e3e9] bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#687385]">Jami kompaniya</p>
              <p className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-[#15191f]">
                {/* {company.count} */}4
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#f1f3f6] text-[#596679]">
              <Building2 aria-hidden="true" className="size-[18px]" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[#9099a7]">
            Barcha faol kompaniyalar
          </p>
        </div>

        <div className="rounded-[17px] border border-[#d7ebdf] bg-[#f3faf6] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#517060]">Rahbar tayinlangan</p>
              <p className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-[#185c3d]">
                3
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#dff2e7] text-[#25734f]">
              <ShieldCheck aria-hidden="true" className="size-[18px]" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[#6d8e7b]">
            Umumiy holatning 75 foizi
          </p>
        </div>

        <div className="rounded-[17px] border border-[#f2ddcf] bg-[#fff8f3] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#806555]">Rahbar tayinlanmagan</p>
              <p className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-[#a64f27]">
                1
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#fbe8dc] text-[#c05c2d]">
              <UserRoundPlus aria-hidden="true" className="size-[18px]" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[#a17c67]">
            Tayinlash talab qilinadi
          </p>
        </div>
      </section>

      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section
          aria-labelledby="company-leadership-title"
          className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
        >
          <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="company-leadership-title"
                className="text-[15px] font-semibold text-[#15191f]"
              >
                Kompaniyalar va rahbarlar
              </h2>
              <p className="mt-1 text-[13px] text-[#748093]">
                Har bir kompaniya uchun mas’ul rahbar holati
              </p>
            </div>

            <label className="flex h-9 w-full items-center gap-2 rounded-[10px] border border-[#dde1e7] bg-[#f9fafb] px-3 sm:w-[230px]">
              <Search aria-hidden="true" className="size-4 text-[#8c96a5]" />
              <span className="sr-only">Kompaniyani qidirish</span>
              <input
                type="search"
                placeholder="Kompaniyani qidirish"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#303742] outline-none placeholder:text-[#9aa2ae]"
              />
            </label>
          </div>

          <div className="divide-y divide-[#eceef2]">
            {companyLeadership.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 px-5 py-[18px] transition-colors hover:bg-[#fafbfc] lg:grid-cols-[minmax(190px,0.85fr)_minmax(240px,1.15fr)_auto] lg:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-10 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-[#20252d]">
                      {item.company}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#818b9a]">{item.type}</p>
                  </div>
                </div>

                {item.manager ? (
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef1f5] text-xs font-semibold text-[#465367]">
                      {item.manager.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-[13px] font-semibold text-[#252b34]">
                          {item.manager.name}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f6ee] px-2 py-0.5 text-[10px] font-semibold text-[#24704e]">
                          <CheckCircle2 aria-hidden="true" className="size-3" />
                          Faol
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-[#7b8695]">
                        {item.manager.role} · {item.manager.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-[11px] border border-dashed border-[#e4bda8] bg-[#fff8f3] px-3 py-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fbe7dc] text-[#bd5d31]">
                      <UserRoundPlus aria-hidden="true" className="size-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#7c4025]">
                        Rahbar tayinlanmagan
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#aa755d]">
                        Nomzod tanlash talab qilinadi
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="h-8 cursor-pointer rounded-[9px] border border-[#dce0e6] bg-white px-3 text-xs font-medium text-[#4e596a] transition hover:border-[#c6ccd5] hover:bg-[#f7f8fa]"
                  >
                    {item.manager ? "Almashtirish" : "Tayinlash"}
                  </button>
                  <button
                    type="button"
                    aria-label={`${item.company} uchun qo‘shimcha amallar`}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-[9px] text-[#7d8796] transition hover:bg-[#eef1f5] hover:text-[#303844]"
                  >
                    <MoreHorizontal aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-[17px] border border-[#e0e3e9] bg-white p-5 xl:sticky xl:top-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#fcece6] text-[#bd572b]">
              <UserRoundPlus aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#15191f]">
                Rahbar tayinlash
              </h2>
              <p className="mt-1 text-[12px] leading-[17px] text-[#7a8595]">
                Kompaniya va mos nomzodni tanlang
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Kompaniya
              </span>
              <span className="relative block">
                <select
                  defaultValue=""
                  className="h-11 w-full appearance-none rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 pr-10 text-[13px] text-[#303742] outline-none transition focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                >
                  <option value="" disabled>
                    Kompaniyani tanlang
                  </option>
                  {companyLeadership.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.company}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7d8795]"
                />
              </span>
            </label>

            <fieldset>
              <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Rahbar nomzodi
              </legend>
              <div className="space-y-2">
                {candidates.map((candidate, index) => (
                  <label
                    key={candidate.name}
                    className="flex cursor-pointer items-center gap-3 rounded-[11px] border border-[#e2e5ea] px-3 py-2.5 transition has-checked:border-[#e8622a] has-checked:bg-[#fff8f4]"
                  >
                    <input
                      type="radio"
                      name="manager-candidate"
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${candidate.tone}`}
                    >
                      {candidate.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-[#2c333d]">
                        {candidate.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-[#808a98]">
                        {candidate.position}
                      </span>
                    </span>
                    <span className="flex size-[18px] items-center justify-center rounded-full border border-[#cdd2da] bg-white after:size-2 after:rounded-full peer-checked:border-[#e8622a] peer-checked:after:bg-[#e8622a]" />
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="rounded-[12px] border border-[#e1e5eb] bg-[#f7f9fb] p-3">
              <div className="flex gap-2.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#52637a]"
                />
                <p className="text-[11px] leading-[17px] text-[#687486]">
                  Tayinlangan rahbar kompaniya hisobotlari, xodimlari va
                  operatsion ma’lumotlarini boshqarish huquqini oladi.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition hover:bg-[#d85620] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
            >
              <UsersRound aria-hidden="true" className="size-4" />
              Rahbarni tayinlash
            </button>
          </div>

          <div className="mt-5 border-t border-[#eceef1] pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7a8493]">
              Bog‘lanish
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#667285]">
              <Mail aria-hidden="true" className="size-3.5" />
              Taklif tanlangan rahbar emailiga yuboriladi
            </div>
          </div>
        </aside>
      </div>

      <section
        aria-labelledby="create-employee-title"
        className="mt-4 overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
      >
        <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eceef8] text-[#3d4c8c]">
              <UserPlus aria-hidden="true" className="size-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="create-employee-title"
                  className="text-[15px] font-semibold text-[#15191f]"
                >
                  Kompaniyaga xodim qo‘shish
                </h2>
                <span className="rounded-full border border-[#dce0ee] bg-[#f5f6fb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#58669d]">
                  Super Admin
                </span>
              </div>
              <p className="mt-1 text-[13px] text-[#748093]">
                Xodim akkaunti, lavozimi va boshlang‘ich ruxsatlarini belgilang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] border border-[#e1e5ea] bg-[#f8f9fb] px-3 py-2 text-xs text-[#657185]">
            <ShieldCheck aria-hidden="true" className="size-4 text-[#4b5d79]" />
            Akkaunt faqat tanlangan kompaniyaga biriktiriladi
          </div>
        </div>

        <div className="grid xl:grid-cols-[minmax(0,1fr)_330px]">
          <form className="p-5 xl:border-r xl:border-[#e9ebef]">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Kompaniya
                </span>
                <span className="relative block">
                  <select
                    name="companyId"
                    defaultValue=""
                    className="h-11 w-full appearance-none rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 pr-10 text-[13px] text-[#303742] outline-none transition focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                  >
                    <option value="" disabled>
                      Kompaniyani tanlang
                    </option>
                    {companyLeadership.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.company}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7d8795]"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Lavozim
                </span>
                <span className="relative block">
                  <select
                    name="position"
                    defaultValue=""
                    className="h-11 w-full appearance-none rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 pr-10 text-[13px] text-[#303742] outline-none transition focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                  >
                    <option value="" disabled>
                      Lavozimni tanlang
                    </option>
                    <option value="sales-manager">Sotuv menejeri</option>
                    <option value="accountant">Buxgalter</option>
                    <option value="hr-manager">HR menejer</option>
                    <option value="warehouse-manager">Ombor mudiri</option>
                    <option value="operator">Operator</option>
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7d8795]"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Ism
                </span>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Xodim ismi"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Familiya
                </span>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Xodim familiyasi"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Telefon raqam
                </span>
                <span className="relative block">
                  <Phone
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Email
                </span>
                <span className="relative block">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="xodim@company.uz"
                    className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Login
                </span>
                <input
                  name="login"
                  type="text"
                  autoComplete="off"
                  placeholder="Masalan: sardor.i"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                  Vaqtinchalik parol
                </span>
                <span className="relative block">
                  <KeyRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                  />
                  <input
                    name="temporaryPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Kamida 8 ta belgi"
                    className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                  />
                </span>
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Boshlang‘ich ruxsatlar
              </legend>
              <p className="mt-1 text-xs text-[#8992a0]">
                Xodim foydalanishi mumkin bo‘lgan bo‘limlarni belgilang
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {["Sotuv", "Moliya", "Ta’minot", "Hisobotlar"].map(
                  (permission, index) => (
                    <label
                      key={permission}
                      className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#e1e4e9] bg-[#fafbfc] px-3 py-2.5 text-[12px] font-medium text-[#4e596a] transition has-checked:border-[#e9a384] has-checked:bg-[#fff7f3] has-checked:text-[#9a4825]"
                    >
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission}
                        defaultChecked={index === 0}
                        className="size-4 accent-[#e8622a]"
                      />
                      {permission}
                    </label>
                  ),
                )}
              </div>
            </fieldset>

            <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#eceef2] pt-4 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="reset"
                className="h-10 cursor-pointer rounded-[10px] border border-[#dce0e6] bg-white px-4 text-[13px] font-medium text-[#596477] transition hover:bg-[#f6f7f9]"
              >
                Tozalash
              </button>
              <button
                type="button"
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#171a1f] px-5 text-[13px] font-semibold text-white transition hover:bg-[#282d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171a1f]"
              >
                <UserPlus aria-hidden="true" className="size-4" />
                Xodimni yaratish
              </button>
            </div>
          </form>

          <aside className="border-t border-[#e9ebef] bg-[#fafbfc] p-5 xl:border-t-0">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#e9edf5] text-sm font-semibold text-[#506078]">
                XY
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#2d343e]">
                  Yangi xodim
                </p>
                <p className="mt-0.5 text-xs text-[#818b99]">
                  Akkaunt ko‘rinishi
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[13px] border border-[#e0e4ea] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#717c8c]">
                Yaratilgandan keyin
              </p>
              <ol className="mt-3 space-y-3">
                {[
                  {
                    title: "Akkaunt faollashadi",
                    description: "Xodim tanlangan kompaniyaga biriktiriladi.",
                  },
                  {
                    title: "Kirish ma’lumoti yuboriladi",
                    description:
                      "Login va vaqtinchalik parol emailga yuboriladi.",
                  },
                  {
                    title: "Parol yangilanadi",
                    description: "Birinchi kirishda yangi parol o‘rnatiladi.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#edf0f5] text-[10px] font-semibold text-[#586679]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#414a57]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-[#838d9b]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-3 rounded-[13px] bg-[#171a1f] p-4 text-white">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="size-4 text-[#f39a72]"
                />
                <p className="text-xs font-semibold">Kompaniya chegarasi</p>
              </div>
              <p className="mt-2 text-[11px] leading-[17px] text-[#aeb7c5]">
                Xodim boshqa kompaniyalarning ma’lumotlarini ko‘rmaydi. Super
                Admin ruxsatlarni keyin ham o‘zgartira oladi.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
