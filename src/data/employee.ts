import { EmployeeSyncStatus } from "src/types/employee.type";

export const syncMeta: Record<
  EmployeeSyncStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Kutilmoqda",
    className: "bg-[#fff6e6] text-[#9a681d]",
  },
  syncing: {
    label: "Yuborilmoqda",
    className: "bg-[#edf3ff] text-[#3d61a8]",
  },
  synced: {
    label: "Sinxron",
    className: "bg-[#e9f7ef] text-[#24704e]",
  },
  failed: {
    label: "Xatolik",
    className: "bg-[#fff0ee] text-[#b33d32]",
  },
};

export const profileTabs = [
  { id: "general", label: "Umumiy ma’lumot" },
  { id: "attendance", label: "Davomat" },
  { id: "salary", label: "Ish haqi" },
] as const;
