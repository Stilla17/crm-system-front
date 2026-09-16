import type { PageHeaderMap } from "src/types/page-header"

export const pageHeaders = {
  "/": {
    title: "Umumiy",
    description: "Kompaniyaning bugungi holati. Raqamlar MoySklad, kassa va filial hisobotlaridan.",
  },
  "/sales": {
    title: "Sotuv",
    description: "Savdo natijalari, buyurtmalar va reja bajarilishi.",
  },
  "/marketing": {
    title: "Marketing",
    description: "Marketing kanallari, xarajatlar va ularning samaradorligi.",
  },
  "/finance": {
    title: "Moliya",
    description: "Kirim-chiqim, foyda va kompaniyaning moliyaviy holati.",
  },
  "/supply": {
    title: "Ta’minot",
    description: "Ombor qoldiqlari, xaridlar va yetkazib berish holati.",
  },
  "/staff": {
    title: "Kadrlar",
    description: "Kim qayerda ishlaydi, nima qiladi va rejasi qancha.",
  },
  "/it": {
    title: "IT",
    description: "Tizimlar, texnik vazifalar va xizmatlar holati.",
  },
  "/regions": {
    title: "Hududlar",
    description: "Filiallar va hududlar kesimidagi asosiy ko‘rsatkichlar.",
  },
} satisfies PageHeaderMap

export function getPageHeader(pathname: string) {
  const route = Object.keys(pageHeaders)
    .filter((item) => item !== "/")
    .find((item) => pathname === item || pathname.startsWith(`${item}/`))

  return pageHeaders[route as keyof typeof pageHeaders] ?? pageHeaders["/"]
}
