"use client";

import { ChevronRight, Download, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useMoyskladBranches } from "src/hooks/moysklad/useMoyskladBranches";
import { useSaveBranchPlan } from "src/hooks/moysklad/useSaveBranchPlan";
import { getDefaultDates } from "src/lib/employee-profile-formatters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AppSelect, type SelectOption } from "src/components/others/app-select";

import { getMoyskladSalesType } from "src/lib/moysklad";
import { exportSalesPlanExcel } from "src/lib/export-sales-plan-excel";
import { getBranchSlug } from "src/lib/branch-slug";
import type { MoyskladSalesType } from "src/types/moysklad.type";

type SalesPlanItem = {
  id: string;
  department: string;
  type: string;
  hasProductDetails: boolean;
  monthlyPlan: number;
  result: number;
};

const SALES_TYPE_OPTIONS: readonly SelectOption<MoyskladSalesType>[] = [
  { value: "all", label: "Все" },
  { value: "shipment", label: "Отгрузка" },
  { value: "retail", label: "Продажа" },
];

const numberFormatter = new Intl.NumberFormat("uz-UZ");

function getProgress(result: number, plan: number) {
  if (plan <= 0) return 0;

  return Math.round((result / plan) * 100);
}

function getProgressColor(progress: number) {
  if (progress >= 80) return "bg-[#dfa022]";
  if (progress >= 60) return "bg-[#e5a126]";

  return "bg-[#dd4939]";
}

export function SalesPlanTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const salesType = getMoyskladSalesType(searchParams.get("type"));
  const companyId = searchParams.get("companyId") ?? undefined;
  const defaultDates = getDefaultDates();
  const from = searchParams.get("from") ?? defaultDates.from;
  const to = searchParams.get("to") ?? defaultDates.to;
  const {
    data: branches = [],
    isLoading,
    isFetching,
    isError,
  } = useMoyskladBranches(from, to, salesType, companyId);

  const salesPlanItems: SalesPlanItem[] = branches.map((branch) => ({
    id: branch.id,
    department: branch.name,
    type: "Filial",
    hasProductDetails: branch.hasProductDetails,
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

  const month = from.slice(0, 7);
  const [draftPlans, setDraftPlans] = useState<Record<string, string>>({});
  const [savingBranchIds, setSavingBranchIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [isExporting, setIsExporting] = useState(false);
  const savePlan = useSaveBranchPlan(from, to, salesType, companyId);

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      await exportSalesPlanExcel({ from, to, items: salesPlanItems });
      toast.success("Excel hisoboti yuklab olindi");
    } catch {
      toast.error("Excel hisobotini yaratib bo‘lmadi");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSavePlan = (item: SalesPlanItem) => {
    const draftKey = `${month}:${item.id}`;
    const inputValue = draftPlans[draftKey] ?? String(item.monthlyPlan);

    if (inputValue.trim() === "") {
      toast.error("Reja summasini kiriting");
      return;
    }

    const amount = Number(inputValue);

    if (!Number.isFinite(amount) || amount < 0) {
      toast.error("Reja summasini to'g'ri kiriting");
      return;
    }

    setSavingBranchIds((current) => new Set(current).add(item.id));

    savePlan.mutate(
      {
        retailStoreId: item.id,
        month,
        amount,
      },
      {
        onSuccess: () => {
          setDraftPlans((current) => {
            const next = { ...current };
            delete next[draftKey];
            return next;
          });
          toast.success(`${item.department} rejasi saqlandi`);
        },

        onError: () => {
          toast.error("Oylik rejani saqlab bo'lmadi");
        },
        onSettled: () => {
          setSavingBranchIds((current) => {
            const next = new Set(current);
            next.delete(item.id);
            return next;
          });
        },
      },
    );
  };

  const handleSalesTypeChange = (value: MoyskladSalesType) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("type", value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-4 flex min-h-40 items-center justify-center rounded-[18px] border border-[#dfe2e7] bg-white text-sm text-[#747d89]">
        <LoaderCircle className="mr-2 size-4 animate-spin" />
        {"Ma'lumotlar yuklanmoqda..."}
      </div>
    );
  }

  if (isError) {
    return <p className="p-5 text-red-600">{"Ma'lumotlarni olib bo‘lmadi"}</p>;
  }

  return (
    <section className="overflow-hidden rounded-[18px] border mt-4 border-[#dfe2e7] bg-white">
      <div className="flex flex-col gap-3 px-5 pb-3 pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#20242a]">
            Reja va bajarilish
          </h2>
          <p className="mt-1 max-w-150 text-[12px] leading-5 text-[#747d89]">
            Har bir filialning rejasi, natijasi va rejagacha qolgan summasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportExcel}
            disabled={isExporting || salesPlanItems.length === 0}
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#167c4f] px-3 text-xs font-semibold text-white transition hover:bg-[#11643f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExporting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Excel yuklab olish
          </button>

          <div className="w-37.5">
            <AppSelect<MoyskladSalesType>
              value={salesType}
              onChange={handleSalesTypeChange}
              options={SALES_TYPE_OPTIONS}
              className="h-9! rounded-[9px] bg-white!"
            />
          </div>
        </div>

        <span className="inline-flex h-6 min-w-[160px] items-center rounded-[7px] bg-[#e4f2ed] px-3 text-[11px] font-medium text-[#3f7c69] sm:min-w-[320px]">
          {isFetching ? (
            <>
              <LoaderCircle className="mr-2 size-3 animate-spin" />
              {"Ma'lumot yangilanmoqda..."}
            </>
          ) : (
            "Ma'lumot yangilangan"
          )}
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
            {salesPlanItems.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-2 py-10 text-center text-[#747d89]"
                >
                  Tanlangan davr uchun filiallar natijasi topilmadi.
                </td>
              </tr>
            )}

            {salesPlanItems.map((item, index) => {
              const remaining = Math.max(item.monthlyPlan - item.result, 0);
              const progress = getProgress(item.result, item.monthlyPlan);
              const draftKey = `${month}:${item.id}`;
              const isSaving = savingBranchIds.has(item.id);

              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#fafbfc]"
                >
                  <td className="px-2 py-4 font-semibold text-[#2a2e34]">
                    {item.hasProductDetails ? (
                      <Link
                        href={`/sales/branches/${getBranchSlug(item.department)}?${searchParams.toString()}`}
                        className="inline-flex items-center gap-1.5 hover:text-[#e8622a]"
                      >
                        {index + 1}. {item.department}
                        <ChevronRight className="size-4" />
                      </Link>
                    ) : (
                      <span>
                        {index + 1}. {item.department}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-4">
                    <span className="rounded-[6px] bg-[#f0f1f3] px-2 py-1 text-[11px] text-[#747b85]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex min-w-[190px] items-center justify-end gap-2">
                      <input
                        type="number"
                        min={0}
                        step={1000}
                        value={
                          draftPlans[draftKey] ?? String(item.monthlyPlan || "")
                        }
                        onChange={(event) => {
                          setDraftPlans((current) => ({
                            ...current,
                            [draftKey]: event.target.value,
                          }));
                        }}
                        placeholder="Reja kiriting"
                        aria-label={`${item.department} oylik rejasi`}
                        className="h-9 w-[140px] rounded-[8px] border border-[#d9dee7] bg-white px-3 text-right text-[13px] tabular-nums outline-none transition focus:border-[#e8622a] focus:ring-4 focus:ring-[#e8622a]/10"
                      />

                      <button
                        type="button"
                        onClick={() => handleSavePlan(item)}
                        disabled={isSaving}
                        aria-label={`${item.department} rejasini saqlash`}
                        className="flex size-9 cursor-pointer items-center justify-center rounded-[8px] bg-[#e8622a] text-white transition hover:bg-[#cf5422] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSaving ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Save className="size-4" />
                        )}
                      </button>
                    </div>
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
                        style={{ width: `${Math.min(progress, 100)}%` }}
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
                    style={{ width: `${Math.min(totalProgress, 100)}%` }}
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
