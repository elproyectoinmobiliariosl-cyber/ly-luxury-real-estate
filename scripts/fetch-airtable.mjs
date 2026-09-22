#!/usr/bin/env node
// Pulls property records from Airtable ("Ly Luxury - International" base,
// table "Biens") and writes them to data/properties.json in the exact shape
// lib/properties.ts expects, downloading each property's photos to
// public/images/properties/{slug}/ so the static export never depends on
// Airtable's temporary signed attachment URLs.
//
// Runs automatically on every Netlify build (see netlify.toml) — Netlify's
// build servers can reach Airtable directly, so no manual photo download /
// upload step is needed anymore. Letisia just fills in the record in
// Airtable (including the Photos attachment field) and pushes/redeploys.
//
// Requires the AIRTABLE_TOKEN environment variable (a fine-grained Airtable
// PAT scoped read-only to this base) to be set in Netlify's Environment
// variables — NEVER commit a token to this file, this repo is public.
//
// If AIRTABLE_TOKEN is missing or the Airtable API call fails, the script
// leaves the existing data/properties.json untouched and exits successfully
// so a build never breaks because of an Airtable hiccup.

import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "data", "properties.json");
const IMAGES_ROOT = path.join(ROOT, "public", "images", "properties");

const BASE_ID = "appperQPFAvwzKO7C";
const TABLE_ID = "tblqc0jxAhptlcKLB";
const TOKEN = process.env.AIRTABLE_TOKEN;

const LANGS = ["fr", "es", "en", "nl", "de", "sr", "hr", "ru", "bg"];

// Field IDs from the "Biens" table schema — stable even if Letisia renames
// a field's display name in Airtable.
const F = {
  reference: "fldAfrHeg5q2ZUR1z",
  type: "fldnCblo1jaEVVxpC",
  condition: "fldegum0ezTTvA7hW",
  categorie: "fldjqkmqidRqhBQFP",
  statut: "flduaW0OmlpxvGmgU",
  ville: "fldwdUwQPCSBKzryZ",
  prix: "fldXPC2kuE6qE1JGN",
  chambres: "fldUx0nsZ9GovpJx3",
  sallesDeBain: "fldYzceqoVP173avz",
  surface: "fldUXNsV3IlOHsczt",
  terrain: "fldJejFjBStVZchwZ",
  photos: "fldztXKOIriQl23tX",
  secteur: "fldZiaCDX4vMq07ge",
  pays: "fldqab8H9ai0PGd4V",
  zone: "fldFXz0SGjlgzeyre",
  devise: "fldbrqXgbnQ7nGhVz",
  slug: "fld2QKlg1TUgbBl2m",
  nomProjet: "fldPXdgfY0uyUmOa1",
  promoteur: "fldVXorgpGQoS5V1m",
  datePublication: "fldSTFBiWtD25rlGt",
  titre: {
    fr: "fld2autQQZfH5HGR0", es: "fldAHviirCc0Nxc8G", en: "fldEGpbO9v1EHtNEQ",
    nl: "fldOFwhVNlI1gm4I5", de: "fldgzKk3NF2D0GJQy", sr: "fldXLXo46NnBJY1U6",
    hr: "fldKhojaUUFd1fUXa", ru: "fldfTv8A2LLXsppWu", bg: "fldCCodyjnw9hfVKD",
  },
  description: {
    fr: "fldOvYi62wTTEaoAF", es: "fldMNpp1oYaTqrOOj", en: "fld91pc3j5Krsktcw",
    nl: "fldDk7gGK27eJkFv6", de: "fldCRBNVXDTV8b2TD", sr: "fldv7VZZmXxudA9DJ",
    hr: "fld1fIPpPcgEcgieP", ru: "fldaJSCP5T9lXqaxj", bg: "fldJwQCyXyCElLeen",
  },
  caracteristiques: {
    fr: "fldl5SgNSvJi0Z1gl", es: "fldRU60Ti1SKHNsaU", en: "flda7tLv0dFYdVrn9",
    nl: "fldtZyeaz4xC1eWcC", de: "fldhJc98Az5KztmQw", sr: "fldwLP9zqmpTNcTsO",
    hr: "fldE51U7sJhMSNDiU", ru: "fldnzFGw9lQkPZZux", bg: "fldFVKpwFjIjSCZlO",
  },
};

function log(...args) {
  console.log("[fetch-airtable]", ...args);
}

async function loadExistingProperties() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function fetchAllRecords() {
  const records = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    url.searchParams.set("returnFieldsByFieldId", "true");
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error(`Airtable API ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

function selectName(value) {
  return value && typeof value === "object" ? value.name : value ?? "";
}

function multiSelectNames(value) {
  return Array.isArray(value) ? value.map((v) => v.name) : [];
}

async function downloadPhotos(slug, attachments) {
  const dir = path.join(IMAGES_ROOT, slug);
  await mkdir(dir, { recursive: true });
  const paths = [];
  let n = 1;
  for (const att of attachments) {
    try {
      const res = await fetch(att.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = (att.filename?.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const filename = `${slug}-${n}.${ext}`;
      await writeFile(path.join(dir, filename), buf);
      paths.push(`/images/properties/${slug}/${filename}`);
      n++;
    } catch (err) {
      log(`  ! photo ${n} for ${slug} failed to download:`, err.message);
    }
  }
  return paths;
}

async function main() {
  if (!TOKEN) {
    log("AIRTABLE_TOKEN not set — keeping existing data/properties.json unchanged.");
    return;
  }

  let records;
  try {
    records = await fetchAllRecords();
  } catch (err) {
    log("Airtable fetch failed, keeping existing data/properties.json unchanged:", err.message);
    return;
  }

  const existing = await loadExistingProperties();
  const existingBySlug = new Map(existing.map((p) => [p.slug, p]));

  const properties = [];
  for (const record of records) {
    const cf = record.fields;
    const slug = cf[F.slug];
    const hasTitle = LANGS.some((l) => cf[F.titre[l]]);
    if (!slug || !hasTitle) continue; // not ready to publish yet

    log(`Processing ${slug} (${record.id})...`);

    const attachments = Array.isArray(cf[F.photos]) ? cf[F.photos] : [];
    let photos;
    if (attachments.length > 0) {
      photos = await downloadPhotos(slug, attachments);
    } else {
      // No photos uploaded to Airtable yet for this record — keep whatever
      // is already in the current properties.json (e.g. photos previously
      // added by hand) instead of wiping them out.
      photos = existingBySlug.get(slug)?.photos ?? [];
      if (photos.length === 0) {
        log(`  ! no photos in Airtable and none on file for ${slug} — property will publish without photos.`);
      }
    }

    const titles = {};
    const descriptions = {};
    const features = {};
    for (const l of LANGS) {
      if (cf[F.titre[l]]) titles[l] = cf[F.titre[l]];
      if (cf[F.description[l]]) descriptions[l] = cf[F.description[l]];
      const feats = multiSelectNames(cf[F.caracteristiques[l]]);
      if (feats.length > 0) features[l] = feats;
    }

    properties.push({
      id: record.id,
      slug,
      reference: cf[F.reference] ?? "",
      condition: selectName(cf[F.condition]),
      category: selectName(cf[F.categorie]),
      listingType: selectName(cf[F.type]),
      status: selectName(cf[F.statut]),
      price: typeof cf[F.prix] === "number" ? cf[F.prix] : null,
      currency: selectName(cf[F.devise]) || "EUR",
      bedrooms: typeof cf[F.chambres] === "number" ? cf[F.chambres] : null,
      bathrooms: typeof cf[F.sallesDeBain] === "number" ? cf[F.sallesDeBain] : null,
      surface: typeof cf[F.surface] === "number" ? cf[F.surface] : null,
      land: typeof cf[F.terrain] === "number" ? cf[F.terrain] : null,
      country: selectName(cf[F.pays]),
      sector: selectName(cf[F.secteur]),
      city: selectName(cf[F.ville]),
      zone: cf[F.zone] ?? "",
      projectName: cf[F.nomProjet] ?? "",
      promoter: cf[F.promoteur] ?? "",
      datePublication: cf[F.datePublication] ?? "",
      photos,
      titles,
      descriptions,
      features,
    });
  }

  if (properties.length === 0) {
    log("No publishable records found (need at least a Slug + one Titre_*) — keeping existing data/properties.json unchanged.");
    return;
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(properties, null, 2) + "\n", "utf-8");
  log(`Wrote ${properties.length} propert${properties.length > 1 ? "ies" : "y"} to data/properties.json.`);
}

main().catch((err) => {
  log("Unexpected error, keeping existing data/properties.json unchanged:", err);
  process.exit(0);
});
