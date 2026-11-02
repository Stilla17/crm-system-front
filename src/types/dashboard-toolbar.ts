export type PeriodOption = {
  id: string;
  label: string;
  disabled?: boolean;
};

export type PeriodFilterProps = {
  periods: PeriodOption[];
  value: string;
  onChange: (periodId: string) => void;
};

export type DateFieldProps = {
  ariaLabel: string;
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
};
