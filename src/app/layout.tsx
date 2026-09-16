import type { Metadata } from "next";
import "./globals.css";
import { CompanyOverview } from "src/components/companies/company-overview";
import { DashboardToolbar } from "src/components/dashboard-toolbar/dashboard-toolbar";
import { AppHeader } from "src/components/header/app-header";
import { AppSidebar } from "src/components/sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "Book.uz CRM",
  description: "Book.uz boshqaruv paneli",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main className="flex min-h-svh border-t-2 border-[#42282e] bg-[#f1f2f4]">
          <AppSidebar />
          <div className="min-w-0 flex-1">
            <AppHeader />
            <DashboardToolbar />
            <CompanyOverview />
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
