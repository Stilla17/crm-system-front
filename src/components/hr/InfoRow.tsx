import React, { ReactNode } from "react";
type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};
function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-[12px] border border-[#eceef2] bg-[#fafbfc] px-3.5 py-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#758092] shadow-[inset_0_0_0_1px_#e4e7eb]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a94a3]">
          {label}
        </p>
        <p className="mt-1 truncate text-[13px] font-medium text-[#2e3540]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default InfoRow;
