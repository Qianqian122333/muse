"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type MuseSelectOption = {
  value: string;
  label: string;
};

type MuseSelectProps = {
  value: string;
  options: MuseSelectOption[];
  onValueChange: (value: string) => void;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

export function MuseSelect({
  value,
  options,
  onValueChange,
  ariaLabel,
  placeholder = "Select…",
  className,
  triggerClassName,
}: MuseSelectProps) {
  const items = Object.fromEntries(options.map((o) => [o.value, o.label]));

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next == null) return;
        onValueChange(String(next));
      }}
      items={items}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(
          "muse-select-trigger h-9 w-full min-w-0 rounded-[10px] border-[var(--line)] bg-[var(--chip)] px-2.5 text-[13px] text-[var(--ink)] shadow-none outline-none ring-0 hover:bg-[var(--bg)] focus:outline-none focus:ring-0 focus-visible:border-[var(--line)] focus-visible:outline-none focus-visible:ring-0 data-[popup-open]:border-[var(--line)] data-[popup-open]:ring-0",
          triggerClassName,
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        align="start"
        className="z-[120] rounded-[12px] border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] shadow-[var(--shadow-up)] ring-0"
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="rounded-[8px] text-[13px] focus:bg-[var(--chip)] focus:text-[var(--ink)] data-highlighted:bg-[var(--chip)] data-highlighted:text-[var(--ink)]"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
