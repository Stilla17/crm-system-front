"use client";

import { homeMetrics } from "src/data/home-metrics";
import { MetricCard } from "./metric-card";
import { getDefaultDates } from "src/lib/employee-profile-formatters";
import { useSearchParams } from "next/navigation";
import { useSalesSummary } from "src/hooks/moysklad/useSalesSummary";

export function HomeMetrics() {
  const searchParams = useSearchParams();
  const defaultDates = getDefaultDates();
  const from = searchParams.get("from") ?? defaultDates.from;
  const to = searchParams.get("to") ?? defaultDates.to;
  const { data, isLoading, isError } = useSalesSummary(from, to);
  const salesValue = isLoading
    ? "Yuklanmoqda..."
    : isError
      ? "—"
      : new Intl.NumberFormat("uz-UZ", {
          maximumFractionDigits: 2,
        }).format(data?.summary.netSales ?? 0);

  const metrics = homeMetrics.map((metric) =>
    metric.id === "sales"
      ? {
          ...metric,
          value: salesValue,
          unit: "so‘m",
          description: `${from} — ${to}`,
        }
      : metric,
  );

  return (
    <section aria-label="Asosiy ko‘rsatkichlar">
      <div className="grid grid-cols-1 items-start gap-3.5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}
