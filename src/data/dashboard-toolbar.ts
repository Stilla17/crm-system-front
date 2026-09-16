import type { CompanyOption, PeriodOption } from "src/types/dashboard-toolbar";

export const companies: CompanyOption[] = [
  { id: "all", label: "Hammasi" },
  { id: "bookuz", label: "Book.uz (Elpress)", color: "#ef6334" },
  { id: "yangi-asr", label: "Yangi asr avlodi", color: "#354995" },
  { id: "yoshlar", label: "Yoshlar matbuoti", color: "#238b5e" },
  { id: "mitti-olam", label: "Mitti olam", color: "#8d45bd" },
];

export const periods: PeriodOption[] = [
  { id: "2026-06", label: "Yan " },
  { id: "2026-07", label: "Fev" },
  { id: "2026-08", label: "Mart" },
  { id: "2026-09", label: "Apr" },
  { id: "2026-10", label: "Mart" },
  { id: "2026-11", label: "Iyun" },
  { id: "2026-12", label: "Iyul" },
  { id: "2027-08", label: "Avg " },
  { id: "2027-01", label: "Sen" },
  { id: "2027-02", label: "Fev", disabled: true },
  { id: "2027-03", label: "Okt", disabled: true },
  { id: "2027-04", label: "Noy", disabled: true },
  { id: "2027-05", label: "Dek", disabled: true },
];

export const toolbarExcludedRoutes = ["/data-entry", "/tasks", "/dictionary"];
