import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book.uz CRM",
  description: "Book.uz boshqaruv paneli",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
