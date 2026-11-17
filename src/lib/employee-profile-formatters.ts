const TASHKENT_TIME_ZONE = "Asia/Tashkent";

const UZBEK_MONTHS = [
  "Yan",
  "Fev",
  "Mart",
  "Apr",
  "May",
  "Iyun",
  "Iyul",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
] as const;

const UZBEK_WEEKDAYS = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
] as const;

export const getCurrentMonth = () => {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: TASHKENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find(({ type }) => type === "year")?.value;
  const month = parts.find(({ type }) => type === "month")?.value;

  return `${year}-${month}`;
};

export const getMonthRange = (year: number, monthIndex: number) => {
  const month = String(monthIndex + 1).padStart(2, "0");
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();

  return {
    from: `${year}-${month}-01`,
    to: `${year}-${month}-${String(lastDay).padStart(2, "0")}`,
  };
};

export const getRecentDayRange = () => {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: TASHKENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = Number(parts.find(({ type }) => type === "year")?.value);
  const month = Number(parts.find(({ type }) => type === "month")?.value);
  const day = Number(parts.find(({ type }) => type === "day")?.value);
  const today = new Date(Date.UTC(year, month - 1, day));
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  return {
    from: formatDate(yesterday),
    to: formatDate(today),
  };
};

export const formatTime = (value: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TASHKENT_TIME_ZONE,
  }).format(date);
};

export const formatDayDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const monthName = UZBEK_MONTHS[month - 1];

  if (!year || !monthName || !day) return value;

  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return `${day}-${monthName}, ${UZBEK_WEEKDAYS[weekdayIndex]}`;
};

export const formatMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  const monthName = UZBEK_MONTHS[month - 1];

  if (!year || !monthName) return value;

  return `${monthName[0].toUpperCase()}${monthName.slice(1)} ${year}`;
};

export const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("uz-UZ", {
    maximumFractionDigits: 2,
  }).format(value)} so‘m`;

export const formatDuration = (seconds: number) => {
  if (!seconds) return "0 soat";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (!hours) return `${minutes} daqiqa`;
  if (!minutes) return `${hours} soat`;
  return `${hours} soat ${minutes} daqiqa`;
};

// O'tgan oyning boshlanish va oxirgi sanalarini "YYYY-MM-DD" formatida qaytaradi
export const getDefaultDates = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // Joriy oy (0-11)

  // O'tgan oyning 1-sanasi
  const firstDay = new Date(year, month - 1, 1);
  // O'tgan oyning oxirgi sanasi
  const lastDay = new Date(year, month, 0);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return {
    from: formatDate(firstDay),
    to: formatDate(lastDay),
  };
};

export const getTabPanelProps = (name: string, embedded: boolean) =>
  embedded
    ? {}
    : {
        id: `employee-panel-${name}`,
        role: "tabpanel" as const,
        "aria-labelledby": `employee-tab-${name}`,
      };
