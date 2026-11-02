import Link from "next/link";
import { useCurrentCompany } from "src/hooks/companies/useCurrentCompany";

export function SidebarBrand() {
  const { companyName } = useCurrentCompany();

  return (
    <Link
      href="/"
      aria-label="Book.uz bosh sahifasi"
      className="inline-flex w-fit items-center text-[16px] font-bold tracking-[-0.02em] text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
    >
      <span className="text-white">{companyName ?? ""}</span>
    </Link>
  );
}
