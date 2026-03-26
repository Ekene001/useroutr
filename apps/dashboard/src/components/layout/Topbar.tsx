"use client";

import { Bell, MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/providers/ThemeProvider";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div>
        {title && (
          <h1 className="font-display text-lg font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <MagnifyingGlass size={20} />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell size={20} />
        </button>

        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          T
        </div>
      </div>
    </header>
  );
}
