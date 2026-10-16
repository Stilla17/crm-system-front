import React from "react";
import { getState } from "src/data/company-summaries";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";

const StateBlocks = () => {
  const { data } = useGetCompanies();
  const countAdmin =
    data?.filter((company) => company.admin != null).length ?? 0;
  const state = getState(data?.length ?? 0, countAdmin);

  return (
    <section
      aria-label="Rahbarlar bo‘yicha qisqa ma’lumot"
      className="grid gap-3.5 md:grid-cols-3"
    >
      {state?.map((company, index) => (
        <div
          key={index}
          className="rounded-[17px] border border-[#e0e3e9] bg-white p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#687385]">{company.desc}</p>
              <p className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-[#15191f]">
                {company.count}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#f1f3f6] text-[#596679]">
              {company.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StateBlocks;
