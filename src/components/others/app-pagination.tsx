"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type AppPaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

const AppPagination = ({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: AppPaginationProps) => {
  const previousDisabled = disabled || page <= 1;
  const nextDisabled = disabled || page >= totalPages;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 || number === totalPages || Math.abs(number - page) <= 1,
  );

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Oldingi"
            aria-label="Oldingi sahifa"
            aria-disabled={previousDisabled}
            tabIndex={previousDisabled ? -1 : 0}
            className={previousDisabled ? "opacity-50" : undefined}
            onClick={(event) => {
              event.preventDefault();
              if (!previousDisabled) {
                onPageChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        {pages.map((number, index) => (
          <PaginationItem key={index} className="flex items-center gap-2">
            {index > 0 && number - pages[index - 1] > 1 && (
              <PaginationEllipsis />
            )}
            <PaginationLink
              href="#"
              isActive={page === number}
              aria-label={`${number}-sahifaga o‘tish`}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={(event) => {
                event.preventDefault();

                if (!disabled && number !== page) {
                  onPageChange(number);
                }
              }}
              className={`size-9 rounded-full border text-[13px] transition ${
                page === number
                  ? "border-[#e8622a] bg-[#e8622a] text-white hover:bg-[#d85620] hover:text-white"
                  : "border-[#e0e3e9] bg-white text-[#626d7e] hover:bg-[#fff0e9]"
              } ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            text="Keyingi"
            aria-label="Keyingi sahifa"
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : 0}
            onClick={(event) => {
              event.preventDefault();

              if (!nextDisabled) {
                onPageChange(page + 1);
              }
            }}
            className={nextDisabled ? "opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
