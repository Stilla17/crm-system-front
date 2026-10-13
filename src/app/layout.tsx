import type { Metadata } from "next";
import "./globals.css";
import Providers from "src/providers/QueryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Book.uz CRM",
  description: "Book.uz boshqaruv paneli",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full">
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
