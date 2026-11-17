import { HomeMetrics } from "src/components/home/home-metrics";
import { UzbekistanMap } from "src/components/regions/uzbekistan-map";
import { SalesPlanTable } from "src/components/sales/sales-plan-table";

export default function Home() {
  return (
    <div className="px-6 pb-6">
      <HomeMetrics />
      <div className="mt-6 ">
        <UzbekistanMap />
        <SalesPlanTable />
      </div>
    </div>
  );
}
