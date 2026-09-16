"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";
import { categoryLabelFor, countryLabelFor } from "@/lib/properties";

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

// Budget is a single "up to" tier here to keep the compact 4-field hero bar
// usable — the Properties page itself offers precise min/max inputs for
// refining further. Amounts are EUR-indicative (see lib/properties.ts).
const BUDGET_TIERS = [300000, 500000, 1000000, 2000000];

export default function HeroSearch({
  locale,
  dict,
  countries,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  countries: string[];
  categories: string[];
}) {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const fieldClass =
    "w-full bg-transparent text-sm text-ivory outline-none [&>option]:text-noir placeholder:text-ivory/40";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (type) params.set("type", type);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (budget) {
      if (budget === "over") params.set("priceMin", String(BUDGET_TIERS[BUDGET_TIERS.length - 1]));
      else params.set("priceMax", budget);
    }
    const qs = params.toString();
    router.push(`/${locale}/properties${qs ? `?${qs}` : ""}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-ivory/20 bg-ivory/10 backdrop-blur sm:grid-cols-4"
    >
      <div className="bg-noir/40 px-4 py-3">
        <div className="text-[0.6rem] uppercase tracking-[0.14em] text-sable/80">{dict.hero.searchDestination}</div>
        <select className={`${fieldClass} mt-1`} value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">{dict.filters.allCountries}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {countryLabelFor(c, locale, dict)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-noir/40 px-4 py-3">
        <div className="text-[0.6rem] uppercase tracking-[0.14em] text-sable/80">{dict.hero.searchType}</div>
        <select className={`${fieldClass} mt-1`} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">{dict.filters.allTypes}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabelFor(c, locale)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-noir/40 px-4 py-3">
        <div className="text-[0.6rem] uppercase tracking-[0.14em] text-sable/80">{dict.hero.searchBudget}</div>
        <select className={`${fieldClass} mt-1`} value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="">{dict.filters.budgetAll}</option>
          {BUDGET_TIERS.map((amount) => (
            <option key={amount} value={amount}>
              {dict.filters.budgetUpTo.replace("{amount}", `${(amount / 1000).toLocaleString(locale)}k €`)}
            </option>
          ))}
          <option value="over">
            {dict.filters.budgetOver.replace(
              "{amount}",
              `${(BUDGET_TIERS[BUDGET_TIERS.length - 1] / 1000).toLocaleString(locale)}k €`
            )}
          </option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-2 bg-noir/40 px-4 py-3">
        <div className="flex-1">
          <div className="text-[0.6rem] uppercase tracking-[0.14em] text-sable/80">{dict.hero.searchBeds}</div>
          <select className={`${fieldClass} mt-1`} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">{dict.filters.anyBedrooms}</option>
            {BEDROOM_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          aria-label={dict.hero.searchSubmit}
          className="shrink-0 bg-ivory px-3 py-2 text-[0.65rem] uppercase tracking-[0.1em] text-noir transition hover:bg-brass-soft"
        >
          {dict.hero.searchSubmit}
        </button>
      </div>
    </form>
  );
}
