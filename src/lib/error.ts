import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  if (!isAxiosError(error)) return "Ma’lumotni yuklashda xatolik yuz berdi";

  const data = error.response?.data as
    | { message?: string | string[] }
    | undefined;
  const message = data?.message;
  return Array.isArray(message)
    ? message[0]
    : message || "Ma’lumotni yuklashda xatolik yuz berdi";
};
