"use client";

import { useState } from "react";
import { Locale, locales, localeNativeNames } from "@/lib/i18n";

export default function MobileNav({
  locale,
  nav,
}: {
  locale: Locale;
  nav: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex flex-col gap-1.5 p-1 text-ivory"
      >
        <span className="block h-px w-6 bg-current" />
        <span className="block h-px w-6 bg-current" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-noir text-ivory">
          <div className="flex items-center justify-end px-6 py-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-2xl leading-none"
            >
              &times;
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-ivory/10 px-6 py-8 text-xs uppercase tracking-[0.1em] text-ivory/60">
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}`}
                className={l === locale ? "text-brass-soft" : "hover:text-ivory"}
              >
                {localeNativeNames[l]}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
