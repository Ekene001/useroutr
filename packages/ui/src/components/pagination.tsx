"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "../utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
}: PaginationProps) {
  const start = totalItems ? (page - 1) * (pageSize ?? 10) + 1 : 0;
  const end = totalItems ? Math.min(page * (pageSize ?? 10), totalItems) : 0;

  return (
    <div className="flex items-center justify-between px-2 py-3">
      {/* Results summary */}
      <div className="text-sm text-[var(--muted-foreground)]">
        {totalItems ? (
          <>
            Showing {start}–{end} of {totalItems} results
          </>
        ) : (
          <>Page {page} of {totalPages}</>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Per-page selector */}
        {onPageSizeChange && pageSize && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">Per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded-[var(--radius-sm)] border border-[var(--border)] bg-transparent px-2 text-xs text-[var(--foreground)] outline-none"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
              page <= 1 && "pointer-events-none opacity-40"
            )}
          >
            <CaretLeft size={16} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-xs transition-colors",
                  pageNum === page
                    ? "bg-[var(--primary)] font-medium text-[var(--primary-foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
              page >= totalPages && "pointer-events-none opacity-40"
            )}
          >
            <CaretRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Pagination };
