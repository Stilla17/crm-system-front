"use client";

import { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateFieldProps } from "src/types/dashboard-toolbar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

const parseStoredDate = (value?: string) => {
  if (!value) return undefined;

  const date = parse(value, "yyyy-MM-dd", new Date());

  return isValid(date) && format(date, "yyyy-MM-dd") === value
    ? date
    : undefined;
};

const parseInputDate = (value: string) => {
  const date = parse(value, "dd.MM.yyyy", new Date());

  return isValid(date) && format(date, "dd.MM.yyyy") === value
    ? date
    : undefined;
};

const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
};

export function DateField({
  ariaLabel,
  label,
  className,
  value,
  onChange,
  onBlur,
  hasError,
}: DateFieldProps) {
  const selectedDate = parseStoredDate(value);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    selectedDate ? format(selectedDate, "dd.MM.yyyy") : "",
  );

  useEffect(() => {
    const date = parseStoredDate(value);

    setInputValue(date ? format(date, "dd.MM.yyyy") : "");
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = formatDateInput(event.target.value);

    setInputValue(nextValue);

    if (!nextValue) {
      onChange?.("");
      return;
    }

    const date = parseInputDate(nextValue);

    if (date) {
      onChange?.(format(date, "yyyy-MM-dd"));
    }
  };

  const handleInputBlur = () => {
    if (inputValue && !parseInputDate(inputValue)) {
      onChange?.("");
    }

    onBlur?.();
  };

  const selectDate = (date?: Date) => {
    if (!date) {
      setInputValue("");
      onChange?.("");
      return;
    }

    setInputValue(format(date, "dd.MM.yyyy"));
    onChange?.(format(date, "yyyy-MM-dd"));
    setOpen(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {label && <span className="text-[13px] text-[#526074]">{label}</span>}

      <div className="relative min-w-0 flex-1">
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          aria-label={ariaLabel}
          aria-invalid={hasError}
          placeholder="dd.mm.yyyy"
          className={`h-11 w-full rounded-[11px] border bg-[#f9fafb] px-3 pr-12 text-[13px] outline-none transition focus:bg-white focus:ring-4 ${
            hasError
              ? "border-red-500 focus:ring-red-500/10"
              : "border-[#dde1e7] focus:border-[#e8622a] focus:ring-[#e8622a]/10"
          }`}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                aria-label={ariaLabel}
                className="absolute right-1 top-1 size-9 p-0 text-[#8793a5]"
              />
            }
          >
            <CalendarIcon className="size-4" />
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={6}
            className="w-auto gap-0 overflow-hidden p-0"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              timeZone="Asia/Tashkent"
              captionLayout="dropdown"
              reverseYears
              onSelect={selectDate}
              className="p-3"
            />

            <div className="flex items-center justify-between border-t px-3 py-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-orange-600"
                onClick={() => {
                  selectDate(undefined);
                  setOpen(false);
                }}
              >
                Tozalash
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-orange-600"
                onClick={() => selectDate(new Date())}
              >
                Bugun
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
