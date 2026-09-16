import Link from "next/link";
import type { CompanySummary } from "src/types/company";

type CompanyCardProps = {
  company: CompanySummary;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const progress = Math.min(100, Math.max(0, company.progress ?? 0));

  return (
    <Link
      href={{ pathname: "/sales", query: { company: company.id } }}
      aria-label={`${company.name} — Sotuv bo‘limini ochish`}
      className="relative flex min-h-[143px] flex-col justify-center overflow-hidden rounded-[15px] border border-[#e0e3e9] bg-white px-4 py-4 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: company.color }} />
      <h3 className="text-[15px] font-semibold leading-5 text-[#202226]">{company.name}</h3>
      <p className="text-[12px] leading-[18px] text-[#969daa]">{company.description}</p>
      <p className="mt-3 text-[25px] font-semibold leading-7 tracking-[-0.035em]" style={{ color: company.color }}>
        {company.sales ?? "kiritilmagan"}
      </p>
      <p className="mt-1 text-[12px] leading-4 text-[#747c89]">
        {company.plan ? `reja ${company.plan} · ${progress}%` : "reja yo‘q"}
      </p>
      {company.plan ? (
        <div
          role="progressbar"
          aria-label={`${company.name} reja bajarilishi`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#f1f2f4]"
        >
          <div className="h-full rounded-full bg-[#db4536]" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
    </Link>
  );
}
