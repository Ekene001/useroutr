"use client";

import { useState, useCallback } from "react";
import {
  CaretUp,
  CaretDown,
  CaretUpDown,
} from "@phosphor-icons/react";
import { cn } from "../utils";

/* ── Types ── */

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string, direction: "asc" | "desc") => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  loadingRows = 5,
  emptyMessage = "No data found",
  emptyIcon,
  onRowClick,
  selectable,
  selectedRows,
  onSelectionChange,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ col: string; dir: "asc" | "desc" } | null>(null);

  const activeSort = sortColumn ?? internalSort?.col;
  const activeDir = sortDirection ?? internalSort?.dir;

  const handleSort = useCallback(
    (col: string) => {
      const newDir =
        activeSort === col && activeDir === "asc" ? "desc" : "asc";
      if (onSort) {
        onSort(col, newDir);
      } else {
        setInternalSort({ col, dir: newDir });
      }
    },
    [activeSort, activeDir, onSort]
  );

  const toggleRow = (index: number) => {
    if (!onSelectionChange || !selectedRows) return;
    const next = new Set(selectedRows);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    onSelectionChange(next);
  };

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (selectedRows?.size === data.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(data.map((_, i) => i)));
    }
  };

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]">
        <div className="border-b border-[var(--border)] px-4 py-3">
          <div className="flex gap-4">
            {columns.map((col) => (
              <div key={col.key} className="h-4 flex-1 skeleton rounded" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="px-4 py-3.5">
              <div className="h-5 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {selectable && (
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows?.size === data.length && data.length > 0}
                  onChange={toggleAll}
                  className="rounded border-[var(--border)]"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]",
                  col.sortable && "cursor-pointer select-none hover:text-[var(--foreground)]",
                  col.className
                )}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <>
                      {activeSort === col.key ? (
                        activeDir === "asc" ? (
                          <CaretUp size={14} weight="bold" />
                        ) : (
                          <CaretDown size={14} weight="bold" />
                        )
                      ) : (
                        <CaretUpDown size={14} className="opacity-40" />
                      )}
                    </>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-16 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  {emptyIcon}
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {emptyMessage}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={i}
                className={cn(
                  "transition-colors",
                  onRowClick && "cursor-pointer hover:bg-[var(--accent)]",
                  selectedRows?.has(i) && "bg-[var(--primary)]/5"
                )}
                onClick={() => onRowClick?.(item)}
              >
                {selectable && (
                  <td className="w-10 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedRows?.has(i) ?? false}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRow(i);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-[var(--border)]"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3.5 text-[var(--foreground)]", col.className)}
                  >
                    {col.render
                      ? col.render(item, i)
                      : String(item[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
