"use client";

import { cn } from "@/lib/utils";

type MuseBrowseSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export function MuseBrowseSwitch({
  checked,
  onCheckedChange,
  className,
}: MuseBrowseSwitchProps) {
  return (
    <nav
      className={cn("browse-switch", className)}
      aria-label="View mode"
    >
      <button
        type="button"
        className={!checked ? "on" : undefined}
        aria-pressed={!checked}
        onClick={() => onCheckedChange(false)}
      >
        Manage inspiration
      </button>
      <button
        type="button"
        className={checked ? "on" : undefined}
        aria-pressed={checked}
        onClick={() => onCheckedChange(true)}
      >
        Browse inspiration
      </button>
    </nav>
  );
}
