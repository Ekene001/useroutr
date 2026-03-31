"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  KeyRound,
  Webhook,
  Users,
  Paintbrush,
} from "lucide-react";

const tabs = [
  { name: "General", href: "/settings", icon: Settings },
  { name: "API Keys", href: "/settings/api-keys", icon: KeyRound },
  { name: "Webhooks", href: "/settings/webhooks", icon: Webhook },
  { name: "Team", href: "/settings/team", icon: Users },
  { name: "Branding", href: "/settings/branding", icon: Paintbrush },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, integrations, and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar navigation */}
        <nav className="w-full shrink-0 lg:w-56">
          <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => {
              const isActive =
                tab.href === "/settings"
                  ? pathname === "/settings"
                  : pathname.startsWith(tab.href);

              const Icon = tab.icon;

              return (
                <li key={tab.name}>
                  <Link
                    href={tab.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.5 : 1.75}
                      className="shrink-0"
                    />
                    <span className="whitespace-nowrap">{tab.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content area */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
