import { useState } from "react";
import { periods } from "src/data/dashboard-toolbar";
import { PeriodFilter } from "./period-filter";

const FilterDate = () => {
  const [periodId, setPeriodId] = useState("2026-09");

  return (
    <section
      aria-label="Sana filtri"
      className="overflow-x-auto rounded-[14px] border border-[#dfe2e7] bg-white px-3.5 py-2.5"
    >
      <PeriodFilter periods={periods} value={periodId} onChange={setPeriodId} />
    </section>
  );
};

export default FilterDate;
