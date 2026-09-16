export type HomeMetric = {
  id: string;
  title: string;
  value: string;
  unit?: string;
  description: string;
  variant?: "default" | "orange" | "dark" | "peach";
  compact?: boolean;
  trend?: {
    value: string;
    direction: "up" | "down";
    tone: "positive" | "negative";
  };
};
