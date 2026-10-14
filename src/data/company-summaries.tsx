import { Building2, ShieldCheck } from "lucide-react";

export const companySummaryExcludedRoutes = [
  "/data-entry",
  "/tasks",
  "/dictionary",
  "/regions",
];

export const getState = (company: number, countAdmin: number) => [
  {
    desc: "Kompaniyalar soni",
    count: company,
    icon: <Building2 aria-hidden="true" className="size-4.5" />,
  },
  {
    desc: "Rahbar tayinlangan",
    count: countAdmin,
    icon: <ShieldCheck aria-hidden="true" className="size-4.5" />,
  },
];
