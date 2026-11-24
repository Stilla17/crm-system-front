"use client";

import { BarChart3, LoaderCircle, TrendingUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useProductBranchAnalysis } from "src/hooks/moysklad/useProductBranchAnalysis";
import { useState } from "react";

const numberFormatter = new Intl.NumberFormat("uz-UZ", {
  maximumFractionDigits: 2,
});

function getSalesBand(dailyVelocity: number, bestDailyVelocity: number) {
  const relativeVelocity =
    bestDailyVelocity > 0 ? dailyVelocity / bestDailyVelocity : 0;

  if (relativeVelocity >= 0.7) {
    return {
      label: "Qoldirish yaxshi",
      rowClass: "border-emerald-200 bg-emerald-50/80",
      badgeClass: "bg-emerald-100 text-emerald-800",
    };
  }

  if (relativeVelocity >= 0.35) {
    return {
      label: "O‘rtacha",
      rowClass: "border-amber-200 bg-amber-50/80",
      badgeClass: "bg-amber-100 text-amber-800",
    };
  }

  return {
    label: "Past sotuv",
    rowClass: "border-red-200 bg-red-50/80",
    badgeClass: "bg-red-100 text-red-800",
  };
}

export function ProductBranchAnalysisPopover({
  branchId,
  productId,
  productName,
}: {
  branchId: string;
  productId: string;
  productName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError } = useProductBranchAnalysis(
    branchId,
    productId,
    isOpen,
  );
  const bestDailyVelocity = data?.branchRanking[0]?.dailyVelocity ?? 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        openOnHover
        delay={350}
        closeDelay={150}
        className="inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-sm text-left font-medium text-[#2a2e34] hover:text-[#e8622a] focus-visible:outline-2 focus-visible:outline-[#e8622a] focus-visible:outline-offset-2"
        aria-label={`${productName}: filiallar bo‘yicha sotuv tahlilini ochish`}
      >
        <span className="truncate">{productName}</span>
        <BarChart3 className="size-3.5 shrink-0 text-[#9aa2ae]" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className="w-[min(24rem,calc(100vw-2rem))] gap-3 rounded-xl border border-[#dfe2e7] bg-white p-4 text-[#20242a] shadow-xl"
      >
        <div>
          <p className="text-sm font-semibold">{productName}</p>
          <p className="mt-1 text-xs text-[#747d89]">
            Filiallardagi oxirgi 30/90 kunlik sotuv tahlili
          </p>
        </div>

        {isPending && (
          <div className="flex items-center gap-2 py-4 text-sm text-[#747d89]">
            <LoaderCircle className="size-4 animate-spin" />
            Tahlil yuklanmoqda...
          </div>
        )}

        {isError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            Tahlilni olib bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.
          </p>
        )}

        {data && (
          <>
            {data.recommendation ? (
              <div className="rounded-lg border border-[#f4d8c8] bg-[#fff7f2] p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#bd4c1c]">
                  <TrendingUp className="size-4" />
                  {data.recommendation.branch.name} filialida yaxshiroq sotilgan
                </div>
                <p className="mt-1 text-xs leading-5 text-[#6d5144]">
                  {data.recommendation.reason}
                </p>
              </div>
            ) : data.bestSellingBranch ? (
              <p className="rounded-lg bg-[#eef7f3] p-3 text-sm text-[#3f7c69]">
                Mahsulot hozirning o‘zida {data.bestSellingBranch.name} filialida
                eng yaxshi sotilmoqda.
              </p>
            ) : (
              <p className="rounded-lg bg-[#f5f6f8] p-3 text-sm text-[#687385]">
                Yangi sync qilingan filiallarda mahsulot bo‘yicha sotuv
                aniqlanmadi.
              </p>
            )}

            <div className="max-h-56 space-y-1 overflow-y-auto">
              {data.branchRanking.map((branch) => {
                const salesBand = getSalesBand(
                  branch.dailyVelocity,
                  bestDailyVelocity,
                );

                return (
                  <div
                    key={branch.id}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-2 text-xs ${
                      salesBand.rowClass
                    } ${
                      branch.isCurrentBranch
                        ? "font-semibold ring-1 ring-[#e8622a]/50"
                        : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate">
                        {branch.rank}. {branch.name}
                        {branch.isCurrentBranch ? " · tanlangan filial" : ""}
                      </p>
                      <p className="mt-0.5 text-[#747d89]">
                        30 kun:{" "}
                        {numberFormatter.format(branch.soldQuantity30Days)}
                        {" · "}90 kun:{" "}
                        {numberFormatter.format(branch.soldQuantity90Days)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${salesBand.badgeClass}`}
                      >
                        {salesBand.label}
                      </span>
                      <span className="tabular-nums text-[#5f6875]">
                        {numberFormatter.format(branch.available)} dona
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-[#eceef1] pt-2 text-[10px] text-[#747d89]">
              <span className="text-emerald-700">Yashil: eng yaxshi ≥70%</span>
              <span className="text-amber-700">To‘q sariq: o‘rtacha ≥35%</span>
              <span className="text-red-700">Qizil: past &lt;35%</span>
            </div>

            {data.excludedBranches.length > 0 && (
              <p className="border-t border-[#eceef1] pt-2 text-xs leading-5 text-[#8b6470]">
                {data.excludedBranches.length} filial tahlilga kiritilmadi
                (ma’lumot yo‘q yoki eskirgan).
              </p>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
