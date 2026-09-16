import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "src/lib/utils";
import type { HomeMetric } from "src/types/home-metric";

const variants = {
  default: "border-[#e0e3e9] bg-white text-[#11151b]",
  orange: "border-transparent bg-[#ef6025] text-white",
  dark: "border-transparent bg-[#171b20] text-white",
  peach: "border-transparent bg-[#fcece6] text-[#171b20]",
};

export function MetricCard({ metric }: { metric: HomeMetric }) {
  const variant = metric.variant ?? "default";
  const TrendIcon = metric.trend?.direction === "up" ? ArrowUp : ArrowDown;

  return (
    <div className={cn(
      "flex flex-col justify-center rounded-[17px] border px-4 py-4",
      metric.compact ? "min-h-[106px]" : "min-h-[130px]",
      variants[variant],
    )}>
      <dt className={cn(
        "text-[13px] leading-[18px]",
        variant === "orange" ? "font-semibold text-white" : variant === "dark" ? "text-[#a8b6c7]" : "text-[#657186]",
      )}>{metric.title}</dt>
      <dd className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-[26px] font-semibold leading-8 tracking-[-0.035em]">{metric.value}</span>
        {metric.unit ? <span className="text-[12px] font-normal text-[#657186]">{metric.unit}</span> : null}
      </dd>
      <dd className={cn("mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-4", variant === "dark" && "flex-col items-start")}>
        {metric.trend ? (
          <span className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[11px] leading-4",
            metric.trend.tone === "positive" ? "bg-[#e2f5f0] text-[#057581]" : "bg-[#fde8e3] text-[#b92314]",
          )}>
            <TrendIcon aria-hidden="true" className="size-3" />
            <span className="sr-only">{metric.trend.direction === "up" ? "O‘sish" : "Pasayish"}: </span>
            {metric.trend.value}
          </span>
        ) : null}
        <span className={cn(variant === "orange" ? "text-white" : variant === "dark" ? "text-[#a8b6c7]" : "text-[#969eac]")}>{metric.description}</span>
      </dd>
    </div>
  );
}
