"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGetPublicCompanies } from "src/hooks/companies/useGetCompanies";

const chartColors = [
  { height: 118, color: "#b64e3e" },
  { height: 96, color: "#285f68" },
  { height: 110, color: "#bd8627" },
  { height: 86, color: "#3d7d58" },
  { height: 122, color: "#963b68" },
  { height: 102, color: "#3d568e" },
  { height: 90, color: "#ad5c32" },
  { height: 114, color: "#4a7543" },
  { height: 100, color: "#815184" },
  { height: 108, color: "#25686b" },
];

export default function CompanySelectionPage() {
  const { data: companies = [] } = useGetPublicCompanies();
  console.log(companies);

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#171a20] px-5 py-12 text-white sm:px-8">
      <section className="w-full max-w-[860px]">
        <div className="relative flex h-[230px] items-end justify-center gap-[5px] overflow-hidden bg-[#181b21] pb-[3px]">
          <div className="absolute inset-x-4 bottom-0 h-[4px] bg-[#101318]" />

          {chartColors.map((bar, index) => (
            <span
              key={index}
              className="relative z-10 w-5 origin-bottom rounded-t-[2px]"
              style={{
                height: `${bar.height}px`,
                backgroundColor: bar.color,
                animation: "barWave 2.8s ease-in-out infinite",
                animationDelay: `${index * 0.22}s`,
              }}
            />
          ))}
        </div>

        <header className="mb-7 mt-8 text-center">
          <h1 className="text-[34px] font-bold leading-tight tracking-[-0.05em]">
            Book<span className="text-[#f06a35]">.uz</span>
          </h1>
          <p className="mt-2 text-sm text-[#9da2ac]">
            Qaysi kompaniya bilan ishlaysiz?
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => {
            const accentColor =
              company.brandColor === "—" ? "#f06a35" : company.brandColor;

            return (
              <Link
                key={company.id}
                href={`/auth?companyId=${company.id}`}
                prefetch={false}
                aria-label={`${company.companyName} kompaniyasini tanlash va tizimga kirish`}
                className="group relative flex min-h-[142px] overflow-hidden rounded-[18px] border bg-[#20242c] p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#252a33] hover:shadow-[0_24px_50px_-25px_rgba(0,0,0,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: `color-mix(in srgb, ${accentColor} 35%, #30343d)`,
                  outlineColor: accentColor,
                  backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 16%, #20242c) 0%, #20242c 58%)`,
                }}
              >
                {/* Orqa fondagi bezak */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full opacity-15 blur-2xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-25"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Chap rangli chiziq */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-5 left-0 w-1 rounded-r-full transition-all duration-300 group-hover:inset-y-3"
                  style={{ backgroundColor: accentColor }}
                />

                <span className="relative flex w-full flex-col">
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 10px 24px -12px ${accentColor}`,
                        }}
                      >
                        {company.companyName.charAt(0).toUpperCase()}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-semibold leading-5 tracking-[-0.02em] text-[#f3f4f6]">
                          {company.companyName}
                        </span>
                        <span className="mt-1 block text-[11px] text-[#9098a5]">
                          Kompaniyani tanlash
                        </span>
                      </span>
                    </span>

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-[#8b929e] transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-white">
                      <ArrowUpRight
                        aria-hidden="true"
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>

                  <span className="text-[11px] font-medium text-[#747c88] transition-colors group-hover:text-[#b7bdc7]">
                    Kirish →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
