import type { MoyskladSalesType } from "src/types/moysklad.type";

export function getMoyskladSalesType(value: string | null): MoyskladSalesType {
  if (value === "shipment" || value === "retail") {
    return value;
  }

  return "all";
}
