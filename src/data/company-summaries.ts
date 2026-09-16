import type { CompanySummary } from "src/types/company";

export const companySummaries: CompanySummary[] = [
  {
    id: "bookuz",
    name: "Book.uz (Elpress)",
    description: "B2C tarmoq + optom",
    color: "#f15f2a",
    sales: "654,7 mln",
    plan: "1,58 mlrd",
    progress: 41,
  },
  {
    id: "yangi-asr",
    name: "Yangi asr avlodi",
    description: "Faqat B2B",
    color: "#354595",
    sales: null,
  },
  {
    id: "yoshlar",
    name: "Yoshlar matbuoti",
    description: "Faqat B2B",
    color: "#19915d",
    sales: null,
  },
  {
    id: "mitti-olam",
    name: "Mitti olam",
    description: "Faqat B2B",
    color: "#904ac5",
    sales: null,
  },
];

export const companySummaryExcludedRoutes = [
  "/data-entry",
  "/tasks",
  "/dictionary",
  "/regions",
];
