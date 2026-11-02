export const formatUzPhone = (value: string) => {
  // Faqat raqamlarni ajratib olamiz
  let digits = value.replace(/\D/g, "");

  // Agar 998 bilan boshlanmasa yoki bo'sh bo'lsa, 998 ni majburiy qilamiz
  if (!digits.startsWith("998")) {
    digits = "998" + digits;
  }

  // Maksimal 12 ta raqam (998 + 9 ta raqam)
  digits = digits.slice(0, 12);

  // Bo'laklarga ajratish
  const country = "+998";
  const code = digits.slice(3, 5);
  const part1 = digits.slice(5, 8);
  const part2 = digits.slice(8, 10);
  const part3 = digits.slice(10, 12);

  let formatted = country;
  if (code) formatted += ` ${code}`;
  if (part1) formatted += ` ${part1}`;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;

  return formatted;
};

export const formatDateTime = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("uz-UZ", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
};
