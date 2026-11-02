import { ReactNode } from "react";

type DetailItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-[#edf0f3] py-3.5 last:border-b-0">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#f3f5f8] text-[#748093]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-[#929ba8]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[13px] font-medium text-[#313842]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default DetailItem;
