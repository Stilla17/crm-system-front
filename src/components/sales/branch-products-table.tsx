"use client";

import { ArrowLeft, LoaderCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type FormEvent } from "react";
import { AppSelect, type SelectOption } from "src/components/others/app-select";
import { useBranchProducts } from "src/hooks/moysklad/useBranchProducts";
import { useMoyskladBranches } from "src/hooks/moysklad/useMoyskladBranches";
import { getDefaultDates } from "src/lib/employee-profile-formatters";
import { getBranchSlug } from "src/lib/branch-slug";
import { getMoyskladSalesType } from "src/lib/moysklad";
import { ProductBranchAnalysisPopover } from "src/components/sales/product-branch-analysis-popover";
import type {
  BranchProductFilter,
  BranchProductSort,
} from "src/types/moysklad.type";

const SORT_OPTIONS: readonly SelectOption<BranchProductSort>[] = [
  { value: "stock_desc", label: "Omborda eng ko‘p" },
  { value: "sales_desc", label: "Eng ko‘p sotilgan" },
  { value: "last_sold_asc", label: "Eng eski sotuv" },
  { value: "stock_asc", label: "Omborda eng kam" },
  { value: "name_asc", label: "Nomi bo‘yicha" },
];

const FILTER_OPTIONS: readonly SelectOption<BranchProductFilter>[] = [
  { value: "all", label: "Barcha mahsulotlar" },
  { value: "stale", label: "Anchadan beri sotilmagan" },
  { value: "never_sold", label: "90 kunda sotilmagan" },
];

const STALE_DAY_OPTIONS: readonly SelectOption<"30" | "60" | "90">[] = [
  { value: "30", label: "30 kun" },
  { value: "60", label: "60 kun" },
  { value: "90", label: "90 kun" },
];

const numberFormatter = new Intl.NumberFormat("uz-UZ", {
  maximumFractionDigits: 2,
});

function formatDate(value: string | null) {
  if (!value) return "90 kunda sotilmagan";

  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatReceiptDate(value: string | null) {
  if (!value) return "Kirim topilmadi";

  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function BranchProductsTable({ branchSlug }: { branchSlug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultDates = getDefaultDates();
  const from = searchParams.get("from") ?? defaultDates.from;
  const to = searchParams.get("to") ?? defaultDates.to;
  const salesType = getMoyskladSalesType(searchParams.get("type"));
  const companyId = searchParams.get("companyId") ?? undefined;
  const branchesQuery = useMoyskladBranches(from, to, salesType, companyId);
  const branch = branchesQuery.data?.find(
    (item) =>
      item.hasProductDetails &&
      (getBranchSlug(item.name) === branchSlug || item.id === branchSlug),
  );
  const branchId = branch?.id ?? "";
  const canonicalBranchSlug = branch ? getBranchSlug(branch.name) : null;
  const currentQuery = searchParams.toString();

  useEffect(() => {
    if (!canonicalBranchSlug || canonicalBranchSlug === branchSlug) return;

    const canonicalPath = `/sales/branches/${canonicalBranchSlug}`;
    router.replace(
      currentQuery ? `${canonicalPath}?${currentQuery}` : canonicalPath,
      { scroll: false },
    );
  }, [branchSlug, canonicalBranchSlug, currentQuery, router]);
  const search = searchParams.get("search") ?? "";
  const sort = (searchParams.get("sort") ?? "stock_desc") as BranchProductSort;
  const filter = (searchParams.get("filter") ?? "all") as BranchProductFilter;
  const staleDaysValue = searchParams.get("staleDays") ?? "90";
  const staleDays = (
    ["30", "60", "90"].includes(staleDaysValue) ? Number(staleDaysValue) : 90
  ) as 30 | 60 | 90;
  const page = Math.max(Number(searchParams.get("page") ?? 1) || 1, 1);

  const { data, isLoading, isFetching, isError } = useBranchProducts(
    {
      branchId,
      search: search || undefined,
      sort,
      filter,
      staleDays,
      page,
      limit: 20,
    },
    Boolean(branchId),
  );

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("search") ?? "").trim();

    updateParams({ search: value || null, page: null });
  };

  const backParams = new URLSearchParams(searchParams.toString());
  for (const key of ["search", "sort", "filter", "staleDays", "page"]) {
    backParams.delete(key);
  }
  const backQuery = backParams.toString();

  if (branchesQuery.isLoading || (branch && isLoading)) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-[18px] border border-[#dfe2e7] bg-white text-sm text-[#747d89]">
        <LoaderCircle className="mr-2 size-4 animate-spin" />
        Mahsulotlar yuklanmoqda...
      </div>
    );
  }

  if (branchesQuery.isError || (!branchesQuery.isLoading && !branch)) {
    return (
      <div className="rounded-[18px] border border-red-200 bg-white p-6 text-sm text-red-600">
        Bunday filial topilmadi.
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-[18px] border border-red-200 bg-white p-6 text-sm text-red-600">
        Mahsulotlarni olib bo‘lmadi. Avval filial mahsulotlari sync’ini ishga
        tushiring.
      </div>
    );
  }

  const summaryCards = [
    { label: "Mahsulotlar", value: data.summary.productCount },
    { label: "Jami mavjud qoldiq", value: data.summary.totalAvailable },
    { label: "90 kunda sotilmagan", value: data.summary.noSales90DaysCount },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href={backQuery ? `/sales?${backQuery}` : "/sales"}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#607086] hover:text-[#e8622a]"
          >
            <ArrowLeft className="size-4" />
            Filiallarga qaytish
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-[#20242a]">
            {data.branch.name}
          </h1>
          <p className="mt-1 text-sm text-[#747d89]">
            Ombordagi mahsulotlar va oxirgi 90 kunlik sotuv holati
          </p>
        </div>

        <span className="rounded-lg bg-[#e4f2ed] px-3 py-2 text-xs text-[#3f7c69]">
          {isFetching
            ? "Yangilanmoqda..."
            : data.syncedAt
              ? `Sync: ${formatDate(data.syncedAt)}`
              : "Hali sync qilinmagan"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[16px] border border-[#dfe2e7] bg-white p-4"
          >
            <p className="text-xs text-[#747d89]">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[#20242a]">
              {numberFormatter.format(card.value)}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-[18px] border border-[#dfe2e7] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#e5e7eb] p-4 lg:flex-row lg:items-center">
          <form onSubmit={handleSearch} className="flex min-w-0 flex-1 gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa2ae]" />
              <input
                key={search}
                name="search"
                defaultValue={search}
                placeholder="Mahsulot nomi, kodi yoki artikuli"
                className="h-10 w-full rounded-[10px] border border-[#d9dee7] pl-9 pr-3 text-sm outline-none focus:border-[#e8622a] focus:ring-4 focus:ring-[#e8622a]/10"
              />
            </div>
            <button
              type="submit"
              className="h-10 cursor-pointer rounded-[10px] bg-[#e8622a] px-4 text-sm font-semibold text-white hover:bg-[#cf5422]"
            >
              Qidirish
            </button>
          </form>

          <div className="grid gap-2 sm:grid-cols-3 lg:w-[620px]">
            <AppSelect<BranchProductFilter>
              value={filter}
              onChange={(value) => updateParams({ filter: value, page: null })}
              options={FILTER_OPTIONS}
              className="h-10!"
            />
            <AppSelect<BranchProductSort>
              value={sort}
              onChange={(value) => updateParams({ sort: value, page: null })}
              options={SORT_OPTIONS}
              className="h-10!"
            />
            <AppSelect<"30" | "60" | "90">
              value={String(staleDays) as "30" | "60" | "90"}
              onChange={(value) =>
                updateParams({ staleDays: value, page: null })
              }
              options={STALE_DAY_OPTIONS}
              disabled={filter !== "stale"}
              className="h-10!"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-sm">
            <thead className="bg-[#fafafa] text-left text-xs text-[#8b94a2]">
              <tr>
                <th className="px-4 py-3">Mahsulot</th>
                <th className="px-4 py-3 text-right">Mavjud</th>
                <th className="px-4 py-3 text-right">30 kun sotuv</th>
                <th className="px-4 py-3 text-right">90 kun sotuv</th>
                <th className="px-4 py-3 text-right">Do‘konga kelgan</th>
                <th className="px-4 py-3 text-right">Oxirgi sotuv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef1]">
              {data.items.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-[#747d89]"
                  >
                    Tanlangan filter bo‘yicha mahsulot topilmadi.
                  </td>
                </tr>
              )}
              {data.items.map((product) => (
                <tr key={product.id} className="hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 font-medium text-[#2a2e34]">
                    <ProductBranchAnalysisPopover
                      branchId={branchId}
                      productId={product.id}
                      productName={product.name}
                    />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">
                    {numberFormatter.format(product.available)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {numberFormatter.format(product.soldQuantity30Days)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {numberFormatter.format(product.soldQuantity90Days)}
                  </td>
                  <td className="px-4 py-3 text-right text-[#747d89]">
                    {formatReceiptDate(product.lastReceivedAt)}
                  </td>
                  <td className="px-4 py-3 text-right text-[#747d89]">
                    {formatDate(product.lastSoldAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#e5e7eb] px-4 py-3 text-sm">
          <span className="text-[#747d89]">
            Jami: {numberFormatter.format(data.pagination.total)} ta
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => updateParams({ page: String(page - 1) })}
              className="h-9 cursor-pointer rounded-lg border px-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Oldingi
            </button>
            <span className="min-w-20 text-center text-[#5f6875]">
              {page} / {Math.max(data.pagination.totalPages, 1)}
            </span>
            <button
              type="button"
              disabled={page >= data.pagination.totalPages}
              onClick={() => updateParams({ page: String(page + 1) })}
              className="h-9 cursor-pointer rounded-lg border px-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Keyingi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
