import { LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import type { PageHeaderProps } from "src/types/page-header";


export function PageHeader({
  title,
  description,
  onCsvClick,
  onSaveClick,
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-6 bg-[#f1f2f4] px-6 py-5">
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold leading-8 tracking-[-0.03em] text-[#101318]">
          {title}
        </h1>
        <p className="mt-1 text-[14px] leading-5 text-[#586273]">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCsvClick}
          className="h-9 rounded-[10px] border-[#d6dbe3] bg-white px-3.5 text-[13px] font-normal text-[#536074] shadow-none hover:bg-[#f8f9fb]"
        >
          CSV
        </Button>
        <Button
          type="button"
          onClick={onSaveClick}
          className="h-9 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white shadow-none cursor-pointer"
        >
          Hisobotni saqlash
        </Button>
      </div>
    </header>
  );
}
