import { homeMetrics } from "src/data/home-metrics";
import { MetricCard } from "./metric-card";

export function HomeMetrics() {
  return (
    <section aria-label="Asosiy ko‘rsatkichlar">
      <div className="grid grid-cols-1 items-start gap-3.5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
        {homeMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}
