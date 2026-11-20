"use client";

import { useEffect, useRef } from "react";
import { museMarkup } from "./markup";
import { initMuseDemo, resetMuseInit } from "./engine";

export default function MuseApp() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.innerHTML = museMarkup;
    initMuseDemo();
    return () => {
      resetMuseInit();
      delete root.dataset.museReady;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="muse-app"
      dangerouslySetInnerHTML={{ __html: museMarkup }}
    />
  );
}
