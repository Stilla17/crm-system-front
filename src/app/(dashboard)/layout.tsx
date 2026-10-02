import { CompanyOverview } from "src/components/companies/company-overview";
import { DashboardToolbar } from "src/components/dashboard-toolbar/dashboard-toolbar";
import { AppHeader } from "src/components/header/app-header";
import { AppSidebar } from "src/components/sidebar/app-sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex min-h-svh border-t-2 border-[#42282e] bg-[#f1f2f4]">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <AppHeader />
        <DashboardToolbar />
        <CompanyOverview />
        {children}
      </div>
    </main>
  );
}
