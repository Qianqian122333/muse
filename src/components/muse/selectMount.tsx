"use client";

import { createRoot, type Root } from "react-dom/client";
import { MuseBrowseSwitch } from "./MuseBrowseSwitch";
import { MuseSelect, type MuseSelectOption } from "./MuseSelect";

export type MountSelectProps = {
  value: string;
  options: MuseSelectOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

const roots = new WeakMap<HTMLElement, Root>();

function ensureRoot(host: HTMLElement) {
  let root = roots.get(host);
  if (!root) {
    root = createRoot(host);
    roots.set(host, root);
  }
  return root;
}

export function mountMuseSelect(host: HTMLElement | null, props: MountSelectProps) {
  if (!host) return;
  ensureRoot(host).render(
    <MuseSelect
      value={props.value}
      options={props.options}
      onValueChange={props.onChange}
      ariaLabel={props.ariaLabel}
      placeholder={props.placeholder}
      className={props.className}
      triggerClassName={props.triggerClassName}
    />,
  );
}

export function mountBrowseSwitch(
  host: HTMLElement | null,
  props: { checked: boolean; onCheckedChange: (checked: boolean) => void },
) {
  if (!host) return;
  ensureRoot(host).render(
    <MuseBrowseSwitch
      checked={props.checked}
      onCheckedChange={props.onCheckedChange}
    />,
  );
}

export function unmountMuseSelect(host: HTMLElement | null) {
  if (!host) return;
  const root = roots.get(host);
  if (!root) return;
  root.unmount();
  roots.delete(host);
}
