"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, locales, localeNativeNames } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Choose language"
        className="flex items-center gap-1.5 text-ivory/90 transition hover:text-brass-soft"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9Z" />
        </svg>
        <span className="text-xs uppercase tracking-[0.12em]">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-3 w-48 border border-ivory/15 bg-noir py-2 shadow-xl">
          {locales.map((l) => (
            <a
              key={l}
              href={`/${l}`}
              className={`block px-4 py-2 text-sm transition ${
                l === locale ? "text-brass-soft" : "text-ivory/80 hover:bg-ivory/5 hover:text-ivory"
              }`}
            >
              {localeNativeNames[l]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
