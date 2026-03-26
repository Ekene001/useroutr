"use client";

import { useCallback, useRef, useState } from "react";
import { UploadSimple, File, X } from "@phosphor-icons/react";
import { cn } from "../utils";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  label?: string;
  helperText?: string;
  error?: string;
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

function FileUpload({
  accept,
  multiple,
  maxSize,
  label,
  helperText,
  error,
  files = [],
  onFilesChange,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const arr = Array.from(newFiles);
      const filtered = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
      onFilesChange?.(multiple ? [...files, ...filtered] : filtered.slice(0, 1));
    },
    [files, maxSize, multiple, onFilesChange]
  );

  const removeFile = (index: number) => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragActive
            ? "border-[var(--primary)] bg-[var(--primary)]/5"
            : "border-[var(--border)] hover:border-[var(--muted-foreground)]",
          error && "border-[var(--destructive)]"
        )}
      >
        <UploadSimple size={32} className="text-[var(--muted-foreground)]" />
        <div>
          <p className="text-sm font-medium text-[var(--foreground)]">
            Click or drag files here
          </p>
          {helperText && (
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{helperText}</p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-2"
            >
              <File size={16} className="shrink-0 text-[var(--muted-foreground)]" />
              <span className="flex-1 truncate text-sm text-[var(--foreground)]">{file.name}</span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {(file.size / 1024).toFixed(0)}KB
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-[var(--destructive)]">{error}</p>}
    </div>
  );
}

export { FileUpload };
