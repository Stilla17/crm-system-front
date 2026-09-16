import type { HomeMetric } from "src/types/home-metric";

export const homeMetrics: HomeMetric[] = [
  {
    id: "sales", title: "Umumiy savdo", value: "0",
    description: "bo‘limlar yig‘indisi", variant: "orange",
    trend: { value: "6,1%", direction: "down", tone: "negative" },
  },
  {
    id: "profit", title: "Sof foyda", value: "229,3 mln",
    description: "33,8% marja",
    trend: { value: "2,5%", direction: "down", tone: "negative" },
  },
  {
    id: "customers", title: "Kirgan mijoz", value: "9 755", unit: "ta",
    description: "nuqtalar bo‘yicha",
  },
  {
    id: "conversion", title: "Konversiya", value: "47,6%",
    description: "100 tashrifdan 48 xarid",
  },
  {
    id: "average-check", title: "O‘rtacha chek", value: "128 615", unit: "so‘m",
    description: "bitta xarid",
  },
  {
    id: "debt", title: "Mijoz qarzi", value: "84,6 mln",
    description: "tovar olib to‘lamaganlar", variant: "dark",
    trend: { value: "156,3%", direction: "up", tone: "positive" },
  },
  {
    id: "expenses", title: "Yozilgan xarajat", value: "8,6 mln",
    description: "5 nuqtada nol", variant: "peach",
  },
  {
    id: "remaining-plan", title: "Bajarilmagan reja", value: "0",
    description: "rejagacha qolgan", compact: true,
  },
];
