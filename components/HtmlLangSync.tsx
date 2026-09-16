"use client";

import { useEffect } from "react";
import { Locale } from "@/lib/i18n";

// The root layout (app/layout.tsx) must own <html>/<body> per Next.js, and
// it sits above the [locale] segment so it can't know the locale at render
// time — it hardcodes lang="en". This corrects `document.documentElement`
// after hydration so screen readers and any JS-executing crawler see the
// right language. It does NOT fix the raw server-rendered HTML (a curl of
// the page still shows lang="en") — a full fix needs an edge rewrite or a
// non-static-export deploy, tracked as a known limitation.
export default function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
