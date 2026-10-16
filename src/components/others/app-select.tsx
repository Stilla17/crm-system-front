import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import React from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface AppSelectProps<T extends string = string> {
  id?: string;
  value?: T | null;
  onChange?: (value: T) => void;
  options: readonly SelectOption<T>[] | SelectOption<T>[];
  placeholder?: string;
  hasError?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AppSelect<T extends string = string>({
  id,
  value,
  onChange,
  options,
  placeholder = "Tanlang",
  hasError = false,
  ref,
  onBlur,
  className = "",
  disabled = false,
}: AppSelectProps<T>) {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <Select.Root
      value={value || null}
      onValueChange={(val) => {
        if (val !== null && onChange) {
          onChange(val as T);
        }
      }}
    >
      <Select.Trigger
        id={id}
        ref={ref}
        onBlur={onBlur}
        disabled={disabled}
        className={`flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border bg-[#f9fafb] px-3.5 text-sm text-[#30272a] outline-none transition-all duration-150 hover:border-[#cbd0d7] focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-[#e1e4e9] focus:border-[#e8622a] focus:ring-[#e8622a]/10"
        } ${className}`}
      >
        <Select.Value placeholder={placeholder}>
          {selectedOption?.label}
        </Select.Value>

        <Select.Icon>
          <ChevronDown className="size-4 text-[#748093]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner sideOffset={6} align="start" className="z-60">
          <Select.Popup className="w-(--anchor-width) rounded-xl border border-[#e1e4e9] bg-white p-1.5 shadow-lg outline-none">
            <Select.List>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="flex h-10 cursor-pointer items-center justify-between rounded-lg px-3 text-sm text-[#30272a] outline-none data-[highlighted]:bg-[#f4f5f7]"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>

                  <Select.ItemIndicator>
                    <Check className="size-4 text-[#e8622a]" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
