import type { LucideIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

const metricTones = {
  blue: "bg-[#eef2ff] text-[#5267ad]",
  green: "bg-[#e9f7ef] text-[#24704e]",
  orange: "bg-[#fff3e9] text-[#b65b25]",
  slate: "bg-[#f1f3f6] text-[#5f6b7b]",
} as const;

export type ProfileMetric = {
  label: string;
  value: ReactNode;
  note: string;
  icon: LucideIcon;
  tone: keyof typeof metricTones;
};

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

export function ProfileSectionHeader({
  icon: Icon,
  title,
  description,
  children,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-[#e0e3e9] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-[#d75b27]">
          <Icon aria-hidden="true" className="size-4.5" />
        </span>
        <div>
          <h2 className="text-[15px] font-semibold text-[#20252c]">{title}</h2>
          <p className="mt-0.5 text-[11px] text-[#8a94a2]">{description}</p>
        </div>
      </div>
      {children}
    </header>
  );
}

type MonthPickerProps = {
  value: string;
  onChange: (value: string) => void;
  isFetching?: boolean;
};

export function MonthPicker({ value, onChange, isFetching }: MonthPickerProps) {
  return (
    <div className="flex items-center gap-3">
      {isFetching && (
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[#7a8595]">
          <RefreshCw aria-hidden="true" className="size-3.5 animate-spin" />
          Yangilanmoqda
        </span>
      )}
      <label className="flex items-center gap-2 text-[12px] font-medium text-[#596576]">
        Oy
        <input
          type="month"
          value={value}
          onChange={(event) => event.target.value && onChange(event.target.value)}
          className="h-9 rounded-[9px] border border-[#dce1e7] bg-white px-3 text-[13px] outline-none transition-colors focus:border-[#e8622a]"
        />
      </label>
    </div>
  );
}

export function ProfileMetricGrid({ metrics }: { metrics: ProfileMetric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ icon: Icon, ...metric }) => (
        <article
          key={metric.label}
          className="rounded-2xl border border-[#e0e3e9] bg-white p-4 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-medium text-[#778293]">{metric.label}</p>
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-[9px] ${metricTones[metric.tone]}`}
            >
              <Icon aria-hidden="true" className="size-4" />
            </span>
          </div>
          <p className="mt-2 text-[20px] font-bold tracking-[-0.03em] text-[#20252c]">
            {metric.value}
          </p>
          <p className="mt-1 text-[11px] text-[#939ba7]">{metric.note}</p>
        </article>
      ))}
    </div>
  );
}

type PanelStateProps = {
  message: string;
  description?: string;
  error?: boolean;
  loading?: boolean;
  onRetry?: () => void;
};

export function ProfilePanelState({
  message,
  description,
  error,
  loading,
  onRetry,
}: PanelStateProps) {
  return (
    <div className="rounded-2xl border border-[#e0e3e9] bg-white p-10 text-center">
      {loading && (
        <RefreshCw
          aria-hidden="true"
          className="mx-auto mb-3 size-5 animate-spin text-[#e8622a]"
        />
      )}
      <p className={`text-sm font-medium ${error ? "text-red-600" : "text-[#596576]"}`}>
        {message}
      </p>
      {description && <p className="mt-1 text-[12px] text-[#8a94a2]">{description}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 cursor-pointer text-sm font-semibold text-[#c05225] underline"
        >
          Qayta yuklash
        </button>
      )}
    </div>
  );
}
