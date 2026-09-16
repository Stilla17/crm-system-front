import type { CompanyOverviewContent } from "src/types/company";

export const companyOverviewContent: Record<string, CompanyOverviewContent> = {
  "/": {
    title: "Kompaniyalar",
    description:
      "Har birining alohida hisob raqami bor. Kartochkani bosing — o‘sha kompaniyaning Sotuv bo‘limi ochiladi.",
  },
  "/sales": {
    title: "Pul tushumi tarmoqlari",
    description:
      "To‘rt kompaniya, har birining alohida hisob raqami. Kartochkani bosing.",
  },
  "/marketing": {
    title: "Kompaniyani tanlang",
    description:
      "Marketing ko‘rsatkichlari har bir kompaniya uchun alohida yuritiladi. Hozir Book.uz ko‘rsatilmoqda.",
  },
  "/finance": {
    title: "Kompaniyalar kesimida",
    description: "Har bir kompaniyaning savdosi va rejasi.",
  },
  "/supply": {
    title: "Kompaniyalar",
    description: "Ta‘minot har bir kompaniya uchun alohida yuritiladi.",
  },
  "/staff": {
    title: "Kompaniyalar",
    description: "Xodimlar har bir kompaniya bo‘yicha alohida.",
  },
  "/it": {
    title: "Kompaniyalar",
    description: "Tizimlar barcha kompaniyada umumiy, lekin dostuplar alohida.",
  },
};

export function getCompanyOverviewContent(
  pathname: string,
): CompanyOverviewContent {
  const route = pathname.split("/")[1];
  return companyOverviewContent[`/${route}`] ?? companyOverviewContent["/"];
}
