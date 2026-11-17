"use client";

import { useSearchParams } from "next/navigation";
import { useMoyskladBranches } from "src/hooks/moysklad/useMoyskladBranches";
import { getDefaultDates } from "src/lib/employee-profile-formatters";

type SalesPlanItem = {
  id: string;
  department: string;
  type: string;
  monthlyPlan: number;
  result: number;
};

const numberFormatter = new Intl.NumberFormat("uz-UZ");

function getProgress(result: number, plan: number) {
  if (plan <= 0) return 0;

  return Math.min(Math.round((result / plan) * 100), 100);
}

function getProgressColor(progress: number) {
  if (progress >= 80) return "bg-[#dfa022]";
  if (progress >= 60) return "bg-[#e5a126]";

  return "bg-[#dd4939]";
}

export function SalesPlanTable() {
  const searchParams = useSearchParams();
  const defaultDates = getDefaultDates();
  const from = searchParams.get("from") ?? defaultDates.from;
  const to = searchParams.get("to") ?? defaultDates.to;
  const {
    data: branches = [],
    isLoading,
    isError,
  } = useMoyskladBranches(from, to);

  const salesPlanItems: SalesPlanItem[] = branches.map((branch) => ({
    id: branch.id,
    department: branch.name,
    type: "Filial",
    monthlyPlan: Number(branch.monthlyPlan ?? 0),
    result: Number(branch.result ?? 0),
  }));

  const totals = salesPlanItems.reduce(
    (total, item) => ({
      monthlyPlan: total.monthlyPlan + item.monthlyPlan,
      result: total.result + item.result,
    }),
    {
      monthlyPlan: 0,
      result: 0,
    },
  );

  const totalRemaining = Math.max(totals.monthlyPlan - totals.result, 0);

  const totalProgress = getProgress(totals.result, totals.monthlyPlan);

  if (isLoading) {
    return <div>Ma'muotlar yuklanmoqda......</div>;
  }

  if (isError) {
    return <p className="p-5 text-red-600">Ma'lumotlar olib bo‘lmadi</p>;
  }

  return (
    <section className="overflow-hidden rounded-[18px] border mt-4 border-[#dfe2e7] bg-white">
      <div className="flex flex-col gap-3 px-5 pb-3 pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#20242a]">
            Reja va bajarilish
          </h2>
          <p className="mt-1 max-w-[600px] text-[12px] leading-5 text-[#747d89]">
            Har bir bo‘limning rejasi, natijasi va rejagacha qolgan summasi.
          </p>
        </div>

        <span className="inline-flex h-6 min-w-[160px] items-center rounded-[7px] bg-[#e4f2ed] px-3 text-[11px] font-medium text-[#3f7c69] sm:min-w-[320px]">
          real
        </span>
      </div>

      <div className="overflow-x-auto px-5 pb-4">
        <table className="w-full min-w-[940px] border-collapse text-[13px]">
          <thead className="text-left text-[11px] font-medium text-[#9aa2ae]">
            <tr className="border-b border-[#e5e7eb]">
              <th className="px-2 py-3">Bo‘lim</th>
              <th className="px-2 py-3">Turi</th>
              <th className="px-2 py-3 text-right">Oylik reja</th>
              <th className="px-2 py-3 text-right">Natija</th>
              <th className="px-2 py-3 text-right">Bajarilmagan</th>
              <th className="w-[140px] px-2 py-3">Bajarilish</th>
              <th className="px-2 py-3 text-right">%</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eceef1]">
            {salesPlanItems.map((item) => {
              const remaining = Math.max(item.monthlyPlan - item.result, 0);
              const progress = getProgress(item.result, item.monthlyPlan);

              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#fafbfc]"
                >
                  <td className="px-2 py-4 font-semibold text-[#2a2e34]">
                    {item.department}
                  </td>
                  <td className="px-2 py-4">
                    <span className="rounded-[6px] bg-[#f0f1f3] px-2 py-1 text-[11px] text-[#747b85]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums text-[#30343a]">
                    {numberFormatter.format(item.monthlyPlan)}
                  </td>
                  <td className="px-2 py-4 text-right font-semibold tabular-nums text-[#282c31]">
                    {numberFormatter.format(item.result)}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums text-[#e44d3d]">
                    {numberFormatter.format(remaining)}
                  </td>
                  <td className="px-2 py-4">
                    <div className="h-2 overflow-hidden rounded-full bg-[#f0f1f3]">
                      <div
                        className={`h-full rounded-full ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-4 text-right">
                    <span className="inline-flex min-w-7 justify-center bg-[#dca426] px-1 py-0.5 text-[11px] font-medium text-white">
                      {progress}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className="border-t border-[#e2e4e8] bg-[#fafafa] font-semibold text-[#272b31]">
            <tr>
              <td className="px-2 py-4">Jami</td>

              <td className="px-2 py-4">{salesPlanItems.length} ta filial</td>

              <td className="px-2 py-4 text-right tabular-nums">
                {numberFormatter.format(totals.monthlyPlan)}
              </td>

              <td className="px-2 py-4 text-right tabular-nums">
                {numberFormatter.format(totals.result)}
              </td>

              <td className="px-2 py-4 text-right tabular-nums">
                {numberFormatter.format(totalRemaining)}
              </td>

              <td className="px-2 py-4">
                <div className="h-2 overflow-hidden rounded-full bg-[#eceef0]">
                  <div
                    className={`h-full rounded-full ${getProgressColor(totalProgress)}`}
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </td>

              <td className="px-2 py-4 text-right">{totalProgress}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
