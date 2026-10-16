import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CreateFormEmployee from "src/components/owner/create-form-employee";

export default function CreateEmployeePage() {
  return (
    <div className="px-6 pb-8">
      <Link
        href="/hr"
        className="mb-4 inline-flex h-9 items-center gap-2 rounded-[10px] border border-[#dce0e6] bg-white px-3.5 text-[13px] font-medium text-[#596477] transition hover:bg-[#f6f7f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Xodimlar ro‘yxatiga qaytish
      </Link>

      <CreateFormEmployee mode="company" />
    </div>
  );
}
