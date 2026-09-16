import { Locale } from "./i18n";

export interface Person {
  name: string;
  role: string;
  phone: string;
  languages: string[];
  photo: string;
}

export interface Dictionary {
  nav: {
    home: string;
    properties: string;
    developments: string;
    destinations: string;
    invest: string;
    services: string;
    about: string;
    contact: string;
  };
  hero: {
    kicker: string;
    by: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    searchDestination: string;
    searchType: string;
    searchBudget: string;
    searchBeds: string;
    searchSubmit: string;
  };
  featured: { kicker: string; title: string; empty: string };
  developments: {
    kicker: string;
    title: string;
    empty: string;
    status: {
      available: string;
      limited: string;
      comingSoon: string;
      reserved: string;
      soldOut: string;
    };
    disclaimer: string;
  };
  destinations: {
    kicker: string;
    title: string;
    comingSoon: string;
    items: { slug: string; name: string; tag: string }[];
  };
  invest: { kicker: string; title: string; body: string; cta: string };
  why: {
    kicker: string;
    title: string;
    points: { title: string; body: string }[];
  };
  founders: {
    kicker: string;
    title: string;
    tagline: string;
    motto: string;
    people: Person[];
  };
  services: { kicker: string; title: string; items: string[] };
  network: { kicker: string; title: string; body: string };
  consultation: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
    whatsapp: string;
  };
  footer: { tagline: string; license: string; rights: string; email: string };
  pages: {
    properties: { intro: string };
    developments: { intro: string };
    destinations: { intro: string; placeTemplate: string };
    services: { intro: string };
    about: { intro: string };
    contact: { intro: string };
  };
  legal: { privacyTitle: string; noticeTitle: string; placeholder: string };
  property: {
    reference: string;
    statusLabel: string;
    condition: string;
    bedrooms: string;
    bathrooms: string;
    surface: string;
    land: string;
    priceOnRequest: string;
    priceNote: string;
    status: { available: string; sold: string; rented: string; reserved: string };
    requestInfo: string;
    backToProperties: string;
  };
  filters: {
    allCountries: string;
    allTypes: string;
    anyBedrooms: string;
    min: string;
    max: string;
    reset: string;
    resultsCountOne: string;
    resultsCountOther: string;
    noResults: string;
    budgetAll: string;
    budgetUpTo: string;
    budgetOver: string;
  };
}

// --- Founders content, sourced verbatim (roles / phones / languages) from
// Letisia's own team-presentation graphics, one set per locale. ---
const foundersFor = (
  tagline: string,
  motto: string,
  kicker: string,
  title: string,
  letisiaRole: string,
  yanaRole: string
): Dictionary["founders"] => ({
  kicker,
  title,
  tagline,
  motto,
  people: [
    {
      name: "Letisia",
      role: letisiaRole,
      phone: "+34 612 272 438",
      languages: ["French", "Dutch", "English", "Spanish"],
      photo: "/images/letisia.jpg",
    },
    {
      name: "Yana",
      role: yanaRole,
      phone: "+34 620 812 775",
      languages: ["French", "German", "Serbian", "Croatian", "Italian"],
      photo: "/images/yana.jpg",
    },
  ],
});

const en: Dictionary = {
  nav: {
    home: "Home",
    properties: "Properties",
    developments: "Developments",
    destinations: "Destinations",
    invest: "Invest",
    services: "Services",
    about: "About",
    contact: "Contact",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Exceptional Properties. Extraordinary Destinations.",
    sub: "A curated international portfolio of luxury villas, residences and off-plan developments — Spain, Dubai and Bali, with new destinations added as our network grows.",
    ctaPrimary: "Explore Properties",
    ctaSecondary: "Discover Our Destinations",
    searchDestination: "Destination",
    searchType: "Property Type",
    searchBudget: "Budget",
    searchBeds: "Bedrooms",
    searchSubmit: "Search",
  },
  featured: {
    kicker: "Selected For You",
    title: "Featured Properties",
    empty: "Featured properties will appear here as soon as the first listings are published in Airtable.",
  },
  developments: {
    kicker: "New & Off-Plan",
    title: "Exclusive Developments",
    empty: "Exclusive developments will appear here as soon as the first projects are published.",
    status: {
      available: "Available",
      limited: "Limited Availability",
      comingSoon: "Coming Soon",
      reserved: "Reserved",
      soldOut: "Sold Out",
    },
    disclaimer: "Prices and availability subject to change.",
  },
  destinations: {
    kicker: "Where We Operate",
    title: "Explore Our Destinations",
    comingSoon: "This destination is joining our network soon. Contact us to be the first to know.",
    items: [
      { slug: "spain", name: "Spain", tag: "Costa Blanca & Costa Cálida, Mediterranean Lifestyle" },
      { slug: "uae", name: "United Arab Emirates", tag: "Dubai & Abu Dhabi — Iconic Living & Investment" },
      { slug: "bali", name: "Bali", tag: "Tropical Luxury & Exceptional Properties" },
    ],
  },
  invest: {
    kicker: "Invest Internationally",
    title: "A Single Advisor Across Every Market",
    body: "Off-plan opportunities, new developments and rental potential, presented honestly — every figure distinguished as guaranteed, developer-advertised, or estimated. We never present a projection as a certainty.",
    cta: "Discuss Your Investment Goals",
  },
  why: {
    kicker: "Why LY Luxury",
    title: "An Interlocutor, Not a Portal",
    points: [
      { title: "Selection over volume", body: "We present the properties that genuinely fit your budget, timeline and strategy — not every listing we can access." },
      { title: "Multilingual, end to end", body: "French, Dutch, English, German, Serbian, Croatian, Italian and Spanish — across the whole buying journey." },
      { title: "Grounded in El Proyecto Inmobiliario", body: "A licensed Spanish agency (RAICV 3999 · API 488) with over a decade of experience serving international clients." },
    ],
  },
  founders: foundersFor(
    "International Real Estate. Exceptional Living.",
    "Invest · Live · Enjoy · Belong",
    "Meet The Founders",
    "Two Advisors, One International Standard",
    "Co-Founder — Founder of El Proyecto Inmobiliario, International Real Estate Expert",
    "Co-Founder — International Real Estate Consultant"
  ),
  pages: {
    properties: {
      intro: "Every property currently available through LY Luxury Real Estate — updated as new listings are confirmed.",
    },
    developments: {
      intro: "Off-plan and new-build developments we have personally selected across our destinations.",
    },
    destinations: {
      intro: "The countries and destinations where LY Luxury Real Estate is present or building its network — Spain, the UAE and Bali today, with new markets added as we grow.",
      placeTemplate: "Explore luxury real estate opportunities in {place} with LY Luxury Real Estate — villas, residences and investment properties, presented in your language.",
    },
    services: {
      intro: "End-to-end, multilingual support before, during and after your property acquisition, wherever in the world you buy with LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate is the international, luxury division of El Proyecto Inmobiliario — founded to give buyers a single, multilingual point of contact across every market we operate in.",
    },
    contact: {
      intro: "Tell us your budget, destination and objective — we typically reply within one business day.",
    },
  },
  legal: {
    privacyTitle: "Privacy Policy",
    noticeTitle: "Legal Notice",
    placeholder: "This page is being finalized. In the meantime, please contact us directly with any question.",
  },
  property: {
    reference: "Reference",
    statusLabel: "Status",
    condition: "Condition",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    surface: "Living area",
    land: "Plot size",
    priceOnRequest: "Price on request",
    priceNote: "Price shown in the property's original currency. Converted amounts are indicative only.",
    status: { available: "Available", sold: "Sold", rented: "Rented", reserved: "Reserved" },
    requestInfo: "Request more information",
    backToProperties: "Back to all properties",
  },
  filters: {
    allCountries: "All destinations",
    allTypes: "All types",
    anyBedrooms: "Any",
    min: "Min",
    max: "Max",
    reset: "Reset filters",
    resultsCountOne: "{count} property available",
    resultsCountOther: "{count} properties available",
    noResults: "No property currently matches these criteria. Try widening your search.",
    budgetAll: "Any budget",
    budgetUpTo: "Up to {amount}",
    budgetOver: "Over {amount}",
  },
  services: {
    kicker: "Our Services",
    title: "Before, During and After Your Acquisition",
    items: [
      "Property Search",
      "New Developments & Off-Plan",
      "International Investment Advisory",
      "Property Acquisition",
      "Legal & Administrative Assistance",
      "After-Sales Service",
      "Property & Rental Management",
      "Concierge & Relocation Assistance",
    ],
  },
  network: {
    kicker: "International Network",
    title: "Developers & Partners We Work With",
    body: "Our network of promoters, agencies and local brokers grows with every new destination we open.",
  },
  consultation: {
    kicker: "Private Consultation",
    title: "Let's Talk About Your Next Property",
    body: "Tell us your budget, destination and objective — we'll come back with a short, genuinely relevant selection.",
    cta: "Request a Private Consultation",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "The international, luxury division of El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "All rights reserved.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    properties: "Propriétés",
    developments: "Développements",
    destinations: "Destinations",
    invest: "Investir",
    services: "Services",
    about: "À propos",
    contact: "Contact",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Des propriétés d'exception. Des destinations extraordinaires.",
    sub: "Un portefeuille international sélectionné de villas de luxe, résidences et projets off-plan — Espagne, Dubaï et Bali, avec de nouvelles destinations à mesure que notre réseau grandit.",
    ctaPrimary: "Explorer les propriétés",
    ctaSecondary: "Découvrir nos destinations",
    searchDestination: "Destination",
    searchType: "Type de bien",
    searchBudget: "Budget",
    searchBeds: "Chambres",
    searchSubmit: "Rechercher",
  },
  featured: {
    kicker: "Sélectionnés pour vous",
    title: "Propriétés en vedette",
    empty: "Les propriétés en vedette apparaîtront ici dès que les premières fiches seront publiées dans Airtable.",
  },
  developments: {
    kicker: "Nouveautés & Off-Plan",
    title: "Développements exclusifs",
    empty: "Les développements exclusifs apparaîtront ici dès que les premiers projets seront publiés.",
    status: {
      available: "Disponible",
      limited: "Disponibilité limitée",
      comingSoon: "Bientôt disponible",
      reserved: "Réservé",
      soldOut: "Vendu",
    },
    disclaimer: "Prix et disponibilité sous réserve de confirmation.",
  },
  destinations: {
    kicker: "Nos destinations",
    title: "Découvrir nos destinations",
    comingSoon: "Cette destination rejoindra bientôt notre réseau. Contactez-nous pour être informé en priorité.",
    items: [
      { slug: "spain", name: "Espagne", tag: "Costa Blanca & Costa Cálida, art de vivre méditerranéen" },
      { slug: "uae", name: "Émirats Arabes Unis", tag: "Dubaï & Abu Dhabi — cadre de vie iconique & investissement" },
      { slug: "bali", name: "Bali", tag: "Luxe tropical & propriétés d'exception" },
    ],
  },
  invest: {
    kicker: "Investir à l'international",
    title: "Un seul interlocuteur, tous les marchés",
    body: "Opportunités off-plan, nouveaux développements et potentiel locatif, présentés honnêtement — chaque chiffre distingué comme garanti, annoncé par le promoteur, ou estimé. Nous ne présentons jamais une projection comme une certitude.",
    cta: "Discuter de vos objectifs d'investissement",
  },
  why: {
    kicker: "Pourquoi LY Luxury",
    title: "Un interlocuteur, pas un portail",
    points: [
      { title: "La sélection plutôt que le volume", body: "Nous présentons les biens réellement adaptés à votre budget, votre calendrier et votre stratégie — pas l'ensemble du catalogue." },
      { title: "Multilingue, de bout en bout", body: "Français, néerlandais, anglais, allemand, serbe, croate, italien et espagnol — sur tout le parcours d'achat." },
      { title: "Adossé à El Proyecto Inmobiliario", body: "Une agence espagnole agréée (RAICV 3999 · API 488) avec plus de dix ans d'expérience auprès d'une clientèle internationale." },
    ],
  },
  founders: foundersFor(
    "L'immobilier d'exception à l'international",
    "Investir · Vivre · Profiter · Appartenir",
    "Rencontrer les fondatrices",
    "Deux conseillères, une seule exigence internationale",
    "Co-fondatrice — Fondatrice de El Proyecto Inmobiliario, experte immobilière internationale",
    "Co-fondatrice — Conseillère immobilière internationale"
  ),
  pages: {
    properties: {
      intro: "L'ensemble des biens actuellement disponibles via LY Luxury Real Estate — mis à jour au fur et à mesure des nouvelles publications.",
    },
    developments: {
      intro: "Les programmes neufs et projets off-plan que nous avons personnellement sélectionnés dans chacune de nos destinations.",
    },
    destinations: {
      intro: "Les pays et destinations où LY Luxury Real Estate est présent ou développe son réseau — l'Espagne, les Émirats Arabes Unis et Bali aujourd'hui, avec de nouveaux marchés à mesure que nous grandissons.",
      placeTemplate: "Découvrez les opportunités immobilières de luxe à {place} avec LY Luxury Real Estate — villas, résidences et biens d'investissement, présentés dans votre langue.",
    },
    services: {
      intro: "Un accompagnement complet et multilingue avant, pendant et après votre acquisition immobilière, où que vous achetiez avec LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate est la division internationale et luxury d'El Proyecto Inmobiliario — créée pour offrir à nos clients un interlocuteur unique et multilingue, sur chacun de nos marchés.",
    },
    contact: {
      intro: "Indiquez-nous votre budget, votre destination et votre objectif — nous revenons généralement vers vous sous un jour ouvré.",
    },
  },
  legal: {
    privacyTitle: "Politique de confidentialité",
    noticeTitle: "Mentions légales",
    placeholder: "Cette page est en cours de finalisation. Pour toute question dans l'intervalle, contactez-nous directement.",
  },
  property: {
    reference: "Référence",
    statusLabel: "Statut",
    condition: "État du bien",
    bedrooms: "Chambres",
    bathrooms: "Salles de bain",
    surface: "Surface habitable",
    land: "Terrain",
    priceOnRequest: "Prix sur demande",
    priceNote: "Prix affiché dans la devise d'origine du bien. Les montants convertis sont indicatifs.",
    status: { available: "Disponible", sold: "Vendu", rented: "Loué", reserved: "Réservé" },
    requestInfo: "Demander plus d'informations",
    backToProperties: "Retour à tous les biens",
  },
  filters: {
    allCountries: "Toutes les destinations",
    allTypes: "Tous les types",
    anyBedrooms: "Indifférent",
    min: "Min",
    max: "Max",
    reset: "Réinitialiser les filtres",
    resultsCountOne: "{count} bien disponible",
    resultsCountOther: "{count} biens disponibles",
    noResults: "Aucun bien ne correspond à ces critères pour le moment. Essayez d'élargir votre recherche.",
    budgetAll: "Tous budgets",
    budgetUpTo: "Jusqu'à {amount}",
    budgetOver: "Plus de {amount}",
  },
  services: {
    kicker: "Nos services",
    title: "Avant, pendant et après votre acquisition",
    items: [
      "Recherche de biens",
      "Nouveaux développements & Off-Plan",
      "Conseil en investissement international",
      "Acquisition immobilière",
      "Assistance juridique & administrative",
      "Service après-vente",
      "Gestion locative & de propriété",
      "Conciergerie & aide à la relocalisation",
    ],
  },
  network: {
    kicker: "Réseau international",
    title: "Promoteurs & partenaires",
    body: "Notre réseau de promoteurs, agences et brokers locaux s'élargit à chaque nouvelle destination.",
  },
  consultation: {
    kicker: "Consultation privée",
    title: "Parlons de votre prochaine propriété",
    body: "Indiquez-nous votre budget, votre destination et votre objectif — nous revenons vers vous avec une sélection courte et réellement pertinente.",
    cta: "Demander une consultation privée",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "La division internationale et luxury d'El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Tous droits réservés.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const es: Dictionary = {
  nav: {
    home: "Inicio",
    properties: "Propiedades",
    developments: "Desarrollos",
    destinations: "Destinos",
    invest: "Invertir",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Propiedades excepcionales. Destinos extraordinarios.",
    sub: "Un portafolio internacional y seleccionado de villas de lujo, residencias y proyectos off-plan — España, Dubái y Bali, con nuevos destinos a medida que crece nuestra red.",
    ctaPrimary: "Explorar propiedades",
    ctaSecondary: "Descubrir nuestros destinos",
    searchDestination: "Destino",
    searchType: "Tipo de propiedad",
    searchBudget: "Presupuesto",
    searchBeds: "Dormitorios",
    searchSubmit: "Buscar",
  },
  featured: {
    kicker: "Seleccionadas para usted",
    title: "Propiedades destacadas",
    empty: "Las propiedades destacadas aparecerán aquí en cuanto se publiquen las primeras fichas en Airtable.",
  },
  developments: {
    kicker: "Novedades y Off-Plan",
    title: "Desarrollos exclusivos",
    empty: "Los desarrollos exclusivos aparecerán aquí en cuanto se publiquen los primeros proyectos.",
    status: {
      available: "Disponible",
      limited: "Disponibilidad limitada",
      comingSoon: "Próximamente",
      reserved: "Reservado",
      soldOut: "Vendido",
    },
    disclaimer: "Precios y disponibilidad sujetos a confirmación.",
  },
  destinations: {
    kicker: "Dónde operamos",
    title: "Descubra nuestros destinos",
    comingSoon: "Este destino se unirá pronto a nuestra red. Contáctenos para ser el primero en saberlo.",
    items: [
      { slug: "spain", name: "España", tag: "Costa Blanca y Costa Cálida, estilo de vida mediterráneo" },
      { slug: "uae", name: "Emiratos Árabes Unidos", tag: "Dubái y Abu Dabi — vida icónica e inversión" },
      { slug: "bali", name: "Bali", tag: "Lujo tropical y propiedades excepcionales" },
    ],
  },
  invest: {
    kicker: "Invertir a nivel internacional",
    title: "Un único interlocutor para cada mercado",
    body: "Oportunidades off-plan, nuevos desarrollos y potencial de alquiler, presentados con honestidad — cada cifra distinguida como garantizada, anunciada por el promotor o estimada. Nunca presentamos una proyección como una certeza.",
    cta: "Hablar de sus objetivos de inversión",
  },
  why: {
    kicker: "Por qué LY Luxury",
    title: "Un interlocutor, no un portal",
    points: [
      { title: "Selección antes que volumen", body: "Presentamos las propiedades realmente adecuadas a su presupuesto, calendario y estrategia — no todo el catálogo disponible." },
      { title: "Multilingüe, de principio a fin", body: "Francés, neerlandés, inglés, alemán, serbio, croata, italiano y español — durante todo el proceso de compra." },
      { title: "Respaldado por El Proyecto Inmobiliario", body: "Una agencia española colegiada (RAICV 3999 · API 488) con más de diez años de experiencia con clientes internacionales." },
    ],
  },
  founders: foundersFor(
    "Inmobiliaria de excepción a nivel internacional",
    "Invertir · Vivir · Disfrutar · Pertenecer",
    "Conozca a las fundadoras",
    "Dos asesoras, un mismo estándar internacional",
    "Co-fundadora — Fundadora de El Proyecto Inmobiliario, experta en inmobiliaria internacional",
    "Co-fundadora — Asesora inmobiliaria internacional"
  ),
  pages: {
    properties: {
      intro: "Todas las propiedades actualmente disponibles a través de LY Luxury Real Estate, actualizadas a medida que se publican nuevas fichas.",
    },
    developments: {
      intro: "Promociones nuevas y proyectos off-plan seleccionados personalmente en cada uno de nuestros destinos.",
    },
    destinations: {
      intro: "Los países y destinos donde LY Luxury Real Estate está presente o desarrollando su red — España, los Emiratos Árabes Unidos y Bali hoy, con nuevos mercados a medida que crecemos.",
      placeTemplate: "Descubra oportunidades inmobiliarias de lujo en {place} con LY Luxury Real Estate — villas, residencias y propiedades de inversión, presentadas en su idioma.",
    },
    services: {
      intro: "Acompañamiento integral y multilingüe antes, durante y después de su adquisición inmobiliaria, dondequiera que compre con LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate es la división internacional y de lujo de El Proyecto Inmobiliario, creada para ofrecer a nuestros clientes un único interlocutor multilingüe en cada mercado en el que operamos.",
    },
    contact: {
      intro: "Cuéntenos su presupuesto, destino y objetivo — normalmente respondemos en un día laborable.",
    },
  },
  legal: {
    privacyTitle: "Política de privacidad",
    noticeTitle: "Aviso legal",
    placeholder: "Esta página está en proceso de finalización. Mientras tanto, contáctenos directamente con cualquier pregunta.",
  },
  property: {
    reference: "Referencia",
    statusLabel: "Estado",
    condition: "Estado del inmueble",
    bedrooms: "Dormitorios",
    bathrooms: "Baños",
    surface: "Superficie habitable",
    land: "Parcela",
    priceOnRequest: "Precio a consultar",
    priceNote: "Precio mostrado en la divisa original del inmueble. Los importes convertidos son solo indicativos.",
    status: { available: "Disponible", sold: "Vendido", rented: "Alquilado", reserved: "Reservado" },
    requestInfo: "Solicitar más información",
    backToProperties: "Volver a todas las propiedades",
  },
  filters: {
    allCountries: "Todos los destinos",
    allTypes: "Todos los tipos",
    anyBedrooms: "Indiferente",
    min: "Mín",
    max: "Máx",
    reset: "Restablecer filtros",
    resultsCountOne: "{count} propiedad disponible",
    resultsCountOther: "{count} propiedades disponibles",
    noResults: "Ninguna propiedad coincide actualmente con estos criterios. Intente ampliar su búsqueda.",
    budgetAll: "Cualquier presupuesto",
    budgetUpTo: "Hasta {amount}",
    budgetOver: "Más de {amount}",
  },
  services: {
    kicker: "Nuestros servicios",
    title: "Antes, durante y después de su adquisición",
    items: [
      "Búsqueda de propiedades",
      "Nuevos desarrollos y Off-Plan",
      "Asesoría en inversión internacional",
      "Adquisición inmobiliaria",
      "Asistencia legal y administrativa",
      "Servicio postventa",
      "Gestión de propiedades y alquiler",
      "Conserjería y ayuda a la reubicación",
    ],
  },
  network: {
    kicker: "Red internacional",
    title: "Promotores y socios con los que trabajamos",
    body: "Nuestra red de promotores, agencias y brokers locales crece con cada nuevo destino que abrimos.",
  },
  consultation: {
    kicker: "Consulta privada",
    title: "Hablemos de su próxima propiedad",
    body: "Cuéntenos su presupuesto, destino y objetivo — le responderemos con una selección breve y realmente relevante.",
    cta: "Solicitar una consulta privada",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "La división internacional y de lujo de El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Todos los derechos reservados.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const nl: Dictionary = {
  nav: {
    home: "Home",
    properties: "Woningen",
    developments: "Projecten",
    destinations: "Bestemmingen",
    invest: "Investeren",
    services: "Diensten",
    about: "Over ons",
    contact: "Contact",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Exceptionele eigendommen. Buitengewone bestemmingen.",
    sub: "Een zorgvuldig samengesteld internationaal portfolio van luxevilla's, residenties en off-plan projecten — Spanje, Dubai en Bali, met nieuwe bestemmingen naarmate ons netwerk groeit.",
    ctaPrimary: "Bekijk woningen",
    ctaSecondary: "Ontdek onze bestemmingen",
    searchDestination: "Bestemming",
    searchType: "Type woning",
    searchBudget: "Budget",
    searchBeds: "Slaapkamers",
    searchSubmit: "Zoeken",
  },
  featured: {
    kicker: "Voor u geselecteerd",
    title: "Uitgelichte woningen",
    empty: "Uitgelichte woningen verschijnen hier zodra de eerste advertenties in Airtable gepubliceerd zijn.",
  },
  developments: {
    kicker: "Nieuw & Off-Plan",
    title: "Exclusieve projecten",
    empty: "Exclusieve projecten verschijnen hier zodra de eerste projecten gepubliceerd zijn.",
    status: {
      available: "Beschikbaar",
      limited: "Beperkt beschikbaar",
      comingSoon: "Binnenkort",
      reserved: "Gereserveerd",
      soldOut: "Uitverkocht",
    },
    disclaimer: "Prijzen en beschikbaarheid onder voorbehoud van bevestiging.",
  },
  destinations: {
    kicker: "Waar wij actief zijn",
    title: "Ontdek onze bestemmingen",
    comingSoon: "Deze bestemming sluit binnenkort aan bij ons netwerk. Neem contact op om als eerste op de hoogte te zijn.",
    items: [
      { slug: "spain", name: "Spanje", tag: "Costa Blanca & Costa Cálida, mediterrane levensstijl" },
      { slug: "uae", name: "Verenigde Arabische Emiraten", tag: "Dubai & Abu Dhabi — iconisch wonen & investeren" },
      { slug: "bali", name: "Bali", tag: "Tropische luxe & bijzondere woningen" },
    ],
  },
  invest: {
    kicker: "Internationaal investeren",
    title: "Eén aanspreekpunt voor elke markt",
    body: "Off-plan kansen, nieuwe projecten en verhuurpotentieel, eerlijk gepresenteerd — elk cijfer duidelijk aangeduid als gegarandeerd, door de ontwikkelaar aangekondigd, of geschat. Wij presenteren een projectie nooit als een zekerheid.",
    cta: "Bespreek uw investeringsdoelen",
  },
  why: {
    kicker: "Waarom LY Luxury",
    title: "Een aanspreekpunt, geen portaal",
    points: [
      { title: "Selectie boven volume", body: "Wij tonen de woningen die écht passen bij uw budget, tijdlijn en strategie — niet ons volledige aanbod." },
      { title: "Meertalig, van begin tot eind", body: "Frans, Nederlands, Engels, Duits, Servisch, Kroatisch, Italiaans en Spaans — gedurende het hele aankoopproces." },
      { title: "Gedragen door El Proyecto Inmobiliario", body: "Een erkend Spaans kantoor (RAICV 3999 · API 488) met meer dan tien jaar ervaring met internationale klanten." },
    ],
  },
  founders: foundersFor(
    "Vastgoed van exceptionele klasse, wereldwijd",
    "Investeren · Wonen · Genieten · Erbij horen",
    "Maak kennis met de oprichters",
    "Twee adviseurs, één internationale standaard",
    "Co-oprichter — Oprichter van El Proyecto Inmobiliario, expert in internationaal vastgoed",
    "Co-oprichter — Internationaal vastgoedadviseur"
  ),
  pages: {
    properties: {
      intro: "Alle woningen die momenteel beschikbaar zijn via LY Luxury Real Estate, bijgewerkt zodra nieuwe advertenties gepubliceerd worden.",
    },
    developments: {
      intro: "Nieuwbouwprojecten en off-plan ontwikkelingen die wij persoonlijk selecteerden in elk van onze bestemmingen.",
    },
    destinations: {
      intro: "De landen en bestemmingen waar LY Luxury Real Estate actief is of haar netwerk uitbouwt — vandaag Spanje, de VAE en Bali, met nieuwe markten naarmate wij groeien.",
      placeTemplate: "Ontdek luxe vastgoedkansen in {place} met LY Luxury Real Estate — villa's, residenties en investeringspanden, gepresenteerd in uw taal.",
    },
    services: {
      intro: "Volledige, meertalige begeleiding vóór, tijdens en na uw vastgoedaankoop, waar u ook koopt met LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate is de internationale luxetak van El Proyecto Inmobiliario, opgericht om klanten één meertalig aanspreekpunt te bieden in elke markt waarin wij actief zijn.",
    },
    contact: {
      intro: "Vertel ons uw budget, bestemming en doel — wij reageren doorgaans binnen één werkdag.",
    },
  },
  legal: {
    privacyTitle: "Privacybeleid",
    noticeTitle: "Wettelijke vermeldingen",
    placeholder: "Deze pagina wordt momenteel afgewerkt. Neem intussen gerust rechtstreeks contact met ons op met uw vraag.",
  },
  property: {
    reference: "Referentie",
    statusLabel: "Status",
    condition: "Staat van het pand",
    bedrooms: "Slaapkamers",
    bathrooms: "Badkamers",
    surface: "Woonoppervlakte",
    land: "Perceeloppervlakte",
    priceOnRequest: "Prijs op aanvraag",
    priceNote: "Prijs weergegeven in de oorspronkelijke valuta van het pand. Omgerekende bedragen zijn indicatief.",
    status: { available: "Beschikbaar", sold: "Verkocht", rented: "Verhuurd", reserved: "Gereserveerd" },
    requestInfo: "Meer informatie aanvragen",
    backToProperties: "Terug naar alle panden",
  },
  filters: {
    allCountries: "Alle bestemmingen",
    allTypes: "Alle types",
    anyBedrooms: "Geen voorkeur",
    min: "Min",
    max: "Max",
    reset: "Filters wissen",
    resultsCountOne: "{count} pand beschikbaar",
    resultsCountOther: "{count} panden beschikbaar",
    noResults: "Momenteel voldoet geen enkel pand aan deze criteria. Probeer uw zoekopdracht te verruimen.",
    budgetAll: "Elk budget",
    budgetUpTo: "Tot {amount}",
    budgetOver: "Meer dan {amount}",
  },
  services: {
    kicker: "Onze diensten",
    title: "Voor, tijdens en na uw aankoop",
    items: [
      "Woningzoektocht",
      "Nieuwe projecten & Off-Plan",
      "Internationaal investeringsadvies",
      "Aankoopbegeleiding",
      "Juridische & administratieve bijstand",
      "Naverkoopservice",
      "Vastgoed- & verhuurbeheer",
      "Conciërgeservice & relocatie",
    ],
  },
  network: {
    kicker: "Internationaal netwerk",
    title: "Ontwikkelaars & partners",
    body: "Ons netwerk van projectontwikkelaars, kantoren en lokale makelaars groeit met elke nieuwe bestemming.",
  },
  consultation: {
    kicker: "Privéconsult",
    title: "Laten we praten over uw volgende woning",
    body: "Vertel ons uw budget, bestemming en doel — wij komen terug met een korte, écht relevante selectie.",
    cta: "Vraag een privéconsult aan",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "De internationale luxetak van El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Alle rechten voorbehouden.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const de: Dictionary = {
  nav: {
    home: "Start",
    properties: "Immobilien",
    developments: "Projekte",
    destinations: "Destinationen",
    invest: "Investieren",
    services: "Leistungen",
    about: "Über uns",
    contact: "Kontakt",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Außergewöhnliche Immobilien. Außergewöhnliche Destinationen.",
    sub: "Ein sorgfältig kuratiertes internationales Portfolio aus Luxusvillen, Residenzen und Off-Plan-Projekten — Spanien, Dubai und Bali, mit neuen Destinationen, sobald unser Netzwerk wächst.",
    ctaPrimary: "Immobilien entdecken",
    ctaSecondary: "Unsere Destinationen entdecken",
    searchDestination: "Destination",
    searchType: "Immobilientyp",
    searchBudget: "Budget",
    searchBeds: "Schlafzimmer",
    searchSubmit: "Suchen",
  },
  featured: {
    kicker: "Für Sie ausgewählt",
    title: "Ausgewählte Immobilien",
    empty: "Ausgewählte Immobilien erscheinen hier, sobald die ersten Inserate in Airtable veröffentlicht sind.",
  },
  developments: {
    kicker: "Neu & Off-Plan",
    title: "Exklusive Projekte",
    empty: "Exklusive Projekte erscheinen hier, sobald die ersten Projekte veröffentlicht sind.",
    status: {
      available: "Verfügbar",
      limited: "Begrenzt verfügbar",
      comingSoon: "In Kürze",
      reserved: "Reserviert",
      soldOut: "Verkauft",
    },
    disclaimer: "Preise und Verfügbarkeit vorbehaltlich Bestätigung.",
  },
  destinations: {
    kicker: "Unsere Standorte",
    title: "Unsere Destinationen entdecken",
    comingSoon: "Diese Destination wird bald Teil unseres Netzwerks. Kontaktieren Sie uns, um es als Erste zu erfahren.",
    items: [
      { slug: "spain", name: "Spanien", tag: "Costa Blanca & Costa Cálida, mediterraner Lebensstil" },
      { slug: "uae", name: "Vereinigte Arabische Emirate", tag: "Dubai & Abu Dhabi — ikonisches Wohnen & Investition" },
      { slug: "bali", name: "Bali", tag: "Tropischer Luxus & außergewöhnliche Immobilien" },
    ],
  },
  invest: {
    kicker: "International investieren",
    title: "Ein einziger Ansprechpartner für jeden Markt",
    body: "Off-Plan-Chancen, neue Projekte und Mietpotenzial, ehrlich dargestellt — jede Zahl klar gekennzeichnet als garantiert, vom Bauträger beworben oder geschätzt. Wir stellen eine Prognose nie als Gewissheit dar.",
    cta: "Über Ihre Investitionsziele sprechen",
  },
  why: {
    kicker: "Warum LY Luxury",
    title: "Ein Ansprechpartner, kein Portal",
    points: [
      { title: "Auswahl statt Menge", body: "Wir zeigen die Immobilien, die wirklich zu Ihrem Budget, Zeitplan und Ihrer Strategie passen — nicht unser gesamtes Angebot." },
      { title: "Mehrsprachig, von Anfang bis Ende", body: "Französisch, Niederländisch, Englisch, Deutsch, Serbisch, Kroatisch, Italienisch und Spanisch — über den gesamten Kaufprozess hinweg." },
      { title: "Getragen von El Proyecto Inmobiliario", body: "Eine zugelassene spanische Agentur (RAICV 3999 · API 488) mit über zehn Jahren Erfahrung mit internationalen Kunden." },
    ],
  },
  founders: foundersFor(
    "Exklusive Immobilien international",
    "Investieren · Leben · Genießen · Dazugehören",
    "Die Gründerinnen",
    "Zwei Beraterinnen, ein internationaler Anspruch",
    "Co-Gründerin — Gründerin von El Proyecto Inmobiliario, Expertin für internationale Immobilien",
    "Co-Gründerin — Internationale Immobilienberaterin"
  ),
  pages: {
    properties: {
      intro: "Alle Immobilien, die derzeit über LY Luxury Real Estate verfügbar sind — aktualisiert, sobald neue Inserate veröffentlicht werden.",
    },
    developments: {
      intro: "Neubauprojekte und Off-Plan-Entwicklungen, die wir persönlich in jeder unserer Destinationen ausgewählt haben.",
    },
    destinations: {
      intro: "Die Länder und Destinationen, in denen LY Luxury Real Estate präsent ist oder sein Netzwerk aufbaut — heute Spanien, die VAE und Bali, mit neuen Märkten, während wir wachsen.",
      placeTemplate: "Entdecken Sie Luxusimmobilien-Möglichkeiten in {place} mit LY Luxury Real Estate — Villen, Residenzen und Anlageimmobilien, präsentiert in Ihrer Sprache.",
    },
    services: {
      intro: "Umfassende, mehrsprachige Begleitung vor, während und nach Ihrem Immobilienerwerb, wo auch immer Sie mit LY Luxury Real Estate kaufen.",
    },
    about: {
      intro: "LY Luxury Real Estate ist die internationale Luxussparte von El Proyecto Inmobiliario — gegründet, um Kunden einen einzigen, mehrsprachigen Ansprechpartner in jedem Markt zu bieten, in dem wir tätig sind.",
    },
    contact: {
      intro: "Teilen Sie uns Ihr Budget, Ihre Destination und Ihr Ziel mit — wir antworten in der Regel innerhalb eines Werktages.",
    },
  },
  legal: {
    privacyTitle: "Datenschutzerklärung",
    noticeTitle: "Impressum",
    placeholder: "Diese Seite wird derzeit fertiggestellt. Bei Fragen kontaktieren Sie uns in der Zwischenzeit gerne direkt.",
  },
  property: {
    reference: "Referenz",
    statusLabel: "Status",
    condition: "Objektzustand",
    bedrooms: "Schlafzimmer",
    bathrooms: "Badezimmer",
    surface: "Wohnfläche",
    land: "Grundstücksgröße",
    priceOnRequest: "Preis auf Anfrage",
    priceNote: "Preis in der Originalwährung der Immobilie angezeigt. Umgerechnete Beträge sind unverbindlich.",
    status: { available: "Verfügbar", sold: "Verkauft", rented: "Vermietet", reserved: "Reserviert" },
    requestInfo: "Weitere Informationen anfordern",
    backToProperties: "Zurück zu allen Immobilien",
  },
  filters: {
    allCountries: "Alle Destinationen",
    allTypes: "Alle Typen",
    anyBedrooms: "Egal",
    min: "Min",
    max: "Max",
    reset: "Filter zurücksetzen",
    resultsCountOne: "{count} Immobilie verfügbar",
    resultsCountOther: "{count} Immobilien verfügbar",
    noResults: "Derzeit entspricht keine Immobilie diesen Kriterien. Erweitern Sie bitte Ihre Suche.",
    budgetAll: "Jedes Budget",
    budgetUpTo: "Bis zu {amount}",
    budgetOver: "Über {amount}",
  },
  services: {
    kicker: "Unsere Leistungen",
    title: "Vor, während und nach Ihrem Erwerb",
    items: [
      "Immobiliensuche",
      "Neue Projekte & Off-Plan",
      "Internationale Investitionsberatung",
      "Immobilienerwerb",
      "Rechtliche & administrative Unterstützung",
      "After-Sales-Service",
      "Immobilien- & Mietverwaltung",
      "Concierge & Umzugsbegleitung",
    ],
  },
  network: {
    kicker: "Internationales Netzwerk",
    title: "Bauträger & Partner",
    body: "Unser Netzwerk aus Bauträgern, Agenturen und lokalen Maklern wächst mit jeder neuen Destination.",
  },
  consultation: {
    kicker: "Private Beratung",
    title: "Sprechen wir über Ihre nächste Immobilie",
    body: "Teilen Sie uns Budget, Destination und Ziel mit — wir melden uns mit einer kurzen, wirklich relevanten Auswahl.",
    cta: "Private Beratung anfragen",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "Die internationale Luxussparte von El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Alle Rechte vorbehalten.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const sr: Dictionary = {
  nav: {
    home: "Početna",
    properties: "Nekretnine",
    developments: "Projekti",
    destinations: "Destinacije",
    invest: "Investirajte",
    services: "Usluge",
    about: "O nama",
    contact: "Kontakt",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Izuzetne nekretnine. Izvanredne destinacije.",
    sub: "Pažljivo odabran međunarodni portfolio luksuznih vila, rezidencija i off-plan projekata — Španija, Dubai i Bali, uz nove destinacije kako naša mreža raste.",
    ctaPrimary: "Istražite nekretnine",
    ctaSecondary: "Otkrijte naše destinacije",
    searchDestination: "Destinacija",
    searchType: "Tip nekretnine",
    searchBudget: "Budžet",
    searchBeds: "Spavaće sobe",
    searchSubmit: "Pretraži",
  },
  featured: {
    kicker: "Izabrano za vas",
    title: "Izdvojene nekretnine",
    empty: "Izdvojene nekretnine pojaviće se ovde čim prve ponude budu objavljene u Airtable-u.",
  },
  developments: {
    kicker: "Novo i Off-Plan",
    title: "Ekskluzivni projekti",
    empty: "Ekskluzivni projekti pojaviće se ovde čim prvi projekti budu objavljeni.",
    status: {
      available: "Dostupno",
      limited: "Ograničena dostupnost",
      comingSoon: "Uskoro",
      reserved: "Rezervisano",
      soldOut: "Prodato",
    },
    disclaimer: "Cene i dostupnost podležu potvrdi.",
  },
  destinations: {
    kicker: "Gde poslujemo",
    title: "Istražite naše destinacije",
    comingSoon: "Ova destinacija uskoro postaje deo naše mreže. Kontaktirajte nas da budete prvi obavešteni.",
    items: [
      { slug: "spain", name: "Španija", tag: "Costa Blanca i Costa Cálida, mediteranski način života" },
      { slug: "uae", name: "Ujedinjeni Arapski Emirati", tag: "Dubai i Abu Dabi — ikonično stanovanje i investicije" },
      { slug: "bali", name: "Bali", tag: "Tropski luksuz i izuzetne nekretnine" },
    ],
  },
  invest: {
    kicker: "Investirajte međunarodno",
    title: "Jedan sagovornik za svako tržište",
    body: "Off-plan prilike, novi projekti i potencijal izdavanja, predstavljeni iskreno — svaka cifra jasno označena kao garantovana, oglašena od strane investitora ili procenjena. Nikada ne predstavljamo projekciju kao izvesnost.",
    cta: "Razgovarajmo o vašim investicionim ciljevima",
  },
  why: {
    kicker: "Zašto LY Luxury",
    title: "Sagovornik, ne portal",
    points: [
      { title: "Selekcija umesto obima", body: "Predstavljamo nekretnine koje zaista odgovaraju vašem budžetu, rokovima i strategiji — ne ceo katalog." },
      { title: "Višejezično, od početka do kraja", body: "Francuski, holandski, engleski, nemački, srpski, hrvatski, italijanski i španski — tokom celog procesa kupovine." },
      { title: "Oslonjeno na El Proyecto Inmobiliario", body: "Licencirana španska agencija (RAICV 3999 · API 488) sa više od deset godina iskustva sa međunarodnim klijentima." },
    ],
  },
  founders: foundersFor(
    "Ekskluzivne nekretnine na međunarodnom nivou",
    "Investirajte · Živite · Uživajte · Pripadajte",
    "Upoznajte suosnivačice",
    "Dve savetnice, jedan međunarodni standard",
    "Suosnivačica — Osnivačica agencije El Proyecto Inmobiliario, stručnjak za međunarodne nekretnine",
    "Suosnivačica — Međunarodni agent za nekretnine"
  ),
  pages: {
    properties: {
      intro: "Sve nekretnine trenutno dostupne preko LY Luxury Real Estate — ažurirano čim se objave nove ponude.",
    },
    developments: {
      intro: "Novi projekti i off-plan razvoji koje smo lično odabrali u svakoj od naših destinacija.",
    },
    destinations: {
      intro: "Zemlje i destinacije u kojima je LY Luxury Real Estate prisutan ili gradi svoju mrežu — danas Španija, UAE i Bali, uz nova tržišta kako rastemo.",
      placeTemplate: "Otkrijte luksuzne nekretninske prilike u {place} sa LY Luxury Real Estate — vile, rezidencije i investicione nekretnine, predstavljene na vašem jeziku.",
    },
    services: {
      intro: "Potpuna, višejezična podrška pre, tokom i posle kupovine nekretnine, gde god kupujete sa LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate je međunarodna, luksuzna divizija agencije El Proyecto Inmobiliario — osnovana kako bi klijenti imali jednog, višejezičnog sagovornika na svakom tržištu na kojem poslujemo.",
    },
    contact: {
      intro: "Recite nam vaš budžet, destinaciju i cilj — obično odgovaramo u roku od jednog radnog dana.",
    },
  },
  legal: {
    privacyTitle: "Politika privatnosti",
    noticeTitle: "Pravna napomena",
    placeholder: "Ova stranica je u završnoj fazi izrade. U međuvremenu nas slobodno kontaktirajte direktno za sva pitanja.",
  },
  property: {
    reference: "Referenca",
    statusLabel: "Status",
    condition: "Stanje nekretnine",
    bedrooms: "Spavaće sobe",
    bathrooms: "Kupatila",
    surface: "Stambena površina",
    land: "Površina parcele",
    priceOnRequest: "Cena na upit",
    priceNote: "Cena je prikazana u originalnoj valuti nekretnine. Preračunati iznosi su informativni.",
    status: { available: "Dostupno", sold: "Prodato", rented: "Izdato", reserved: "Rezervisano" },
    requestInfo: "Zatražite više informacija",
    backToProperties: "Nazad na sve nekretnine",
  },
  filters: {
    allCountries: "Sve destinacije",
    allTypes: "Svi tipovi",
    anyBedrooms: "Svejedno",
    min: "Min",
    max: "Maks",
    reset: "Resetuj filtere",
    resultsCountOne: "{count} nekretnina dostupna",
    resultsCountOther: "{count} nekretnina dostupno",
    noResults: "Trenutno nijedna nekretnina ne odgovara ovim kriterijumima. Pokušajte da proširite pretragu.",
    budgetAll: "Svaki budžet",
    budgetUpTo: "Do {amount}",
    budgetOver: "Preko {amount}",
  },
  services: {
    kicker: "Naše usluge",
    title: "Pre, tokom i posle vaše kupovine",
    items: [
      "Pretraga nekretnina",
      "Novi projekti i Off-Plan",
      "Savetovanje za međunarodne investicije",
      "Kupovina nekretnina",
      "Pravna i administrativna pomoć",
      "Postprodajna usluga",
      "Upravljanje nekretninama i izdavanjem",
      "Konsijerž usluge i pomoć pri preseljenju",
    ],
  },
  network: {
    kicker: "Međunarodna mreža",
    title: "Investitori i partneri sa kojima sarađujemo",
    body: "Naša mreža investitora, agencija i lokalnih brokera raste sa svakom novom destinacijom.",
  },
  consultation: {
    kicker: "Privatna konsultacija",
    title: "Razgovarajmo o vašoj sledećoj nekretnini",
    body: "Recite nam vaš budžet, destinaciju i cilj — vraćamo se sa kratkom, zaista relevantnom selekcijom.",
    cta: "Zatražite privatnu konsultaciju",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "Međunarodna, luksuzna divizija agencije El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Sva prava zadržana.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const hr: Dictionary = {
  nav: {
    home: "Početna",
    properties: "Nekretnine",
    developments: "Projekti",
    destinations: "Destinacije",
    invest: "Investirajte",
    services: "Usluge",
    about: "O nama",
    contact: "Kontakt",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Iznimne nekretnine. Izvanredne destinacije.",
    sub: "Pažljivo odabran međunarodni portfelj luksuznih vila, rezidencija i off-plan projekata — Španjolska, Dubai i Bali, uz nove destinacije kako naša mreža raste.",
    ctaPrimary: "Istražite nekretnine",
    ctaSecondary: "Otkrijte naše destinacije",
    searchDestination: "Destinacija",
    searchType: "Vrsta nekretnine",
    searchBudget: "Proračun",
    searchBeds: "Spavaće sobe",
    searchSubmit: "Pretraži",
  },
  featured: {
    kicker: "Odabrano za vas",
    title: "Izdvojene nekretnine",
    empty: "Izdvojene nekretnine pojavit će se ovdje čim prve ponude budu objavljene u Airtableu.",
  },
  developments: {
    kicker: "Novo i Off-Plan",
    title: "Ekskluzivni projekti",
    empty: "Ekskluzivni projekti pojavit će se ovdje čim prvi projekti budu objavljeni.",
    status: {
      available: "Dostupno",
      limited: "Ograničena dostupnost",
      comingSoon: "Uskoro",
      reserved: "Rezervirano",
      soldOut: "Prodano",
    },
    disclaimer: "Cijene i dostupnost podliježu potvrdi.",
  },
  destinations: {
    kicker: "Gdje poslujemo",
    title: "Istražite naše destinacije",
    comingSoon: "Ova destinacija uskoro postaje dio naše mreže. Kontaktirajte nas da budete prvi obaviješteni.",
    items: [
      { slug: "spain", name: "Španjolska", tag: "Costa Blanca i Costa Cálida, mediteranski način života" },
      { slug: "uae", name: "Ujedinjeni Arapski Emirati", tag: "Dubai i Abu Dhabi — ikonično stanovanje i investicije" },
      { slug: "bali", name: "Bali", tag: "Tropski luksuz i iznimne nekretnine" },
    ],
  },
  invest: {
    kicker: "Investirajte međunarodno",
    title: "Jedan sugovornik za svako tržište",
    body: "Off-plan prilike, novi projekti i potencijal najma, predstavljeni iskreno — svaka brojka jasno označena kao zajamčena, oglašena od investitora ili procijenjena. Nikada ne predstavljamo projekciju kao sigurnost.",
    cta: "Razgovarajmo o vašim investicijskim ciljevima",
  },
  why: {
    kicker: "Zašto LY Luxury",
    title: "Sugovornik, ne portal",
    points: [
      { title: "Selekcija umjesto opsega", body: "Predstavljamo nekretnine koje zaista odgovaraju vašem proračunu, rokovima i strategiji — ne cijeli katalog." },
      { title: "Višejezično, od početka do kraja", body: "Francuski, nizozemski, engleski, njemački, srpski, hrvatski, talijanski i španjolski — tijekom cijelog procesa kupnje." },
      { title: "Oslonjeno na El Proyecto Inmobiliario", body: "Licencirana španjolska agencija (RAICV 3999 · API 488) s više od deset godina iskustva s međunarodnim klijentima." },
    ],
  },
  founders: foundersFor(
    "Ekskluzivne nekretnine na globalnoj razini",
    "Investirajte · Živite · Uživajte · Pripadate",
    "Upoznajte suosnivačice",
    "Dvije savjetnice, jedan međunarodni standard",
    "Suosnivačica — Osnivačica agencije El Proyecto Inmobiliario, stručnjak za međunarodne nekretnine",
    "Suosnivačica — Međunarodna savjetnica za nekretnine"
  ),
  pages: {
    properties: {
      intro: "Sve nekretnine trenutno dostupne putem LY Luxury Real Estate — ažurirano čim se objave nove ponude.",
    },
    developments: {
      intro: "Novi projekti i off-plan razvoji koje smo osobno odabrali u svakoj od naših destinacija.",
    },
    destinations: {
      intro: "Zemlje i destinacije u kojima je LY Luxury Real Estate prisutan ili gradi svoju mrežu — danas Španjolska, UAE i Bali, uz nova tržišta kako rastemo.",
      placeTemplate: "Otkrijte luksuzne nekretninske prilike u {place} s LY Luxury Real Estate — vile, rezidencije i investicijske nekretnine, predstavljene na vašem jeziku.",
    },
    services: {
      intro: "Potpuna, višejezična podrška prije, tijekom i nakon kupnje nekretnine, gdje god kupujete s LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate je međunarodna, luksuzna divizija agencije El Proyecto Inmobiliario — osnovana kako bi klijenti imali jednog, višejezičnog sugovornika na svakom tržištu na kojem poslujemo.",
    },
    contact: {
      intro: "Recite nam vaš proračun, destinaciju i cilj — obično odgovaramo u roku od jednog radnog dana.",
    },
  },
  legal: {
    privacyTitle: "Politika privatnosti",
    noticeTitle: "Pravna napomena",
    placeholder: "Ova stranica je u završnoj fazi izrade. U međuvremenu nas slobodno kontaktirajte izravno za sva pitanja.",
  },
  property: {
    reference: "Referenca",
    statusLabel: "Status",
    condition: "Stanje nekretnine",
    bedrooms: "Spavaće sobe",
    bathrooms: "Kupaonice",
    surface: "Stambena površina",
    land: "Površina parcele",
    priceOnRequest: "Cijena na upit",
    priceNote: "Cijena je prikazana u izvornoj valuti nekretnine. Preračunati iznosi su informativni.",
    status: { available: "Dostupno", sold: "Prodano", rented: "Iznajmljeno", reserved: "Rezervirano" },
    requestInfo: "Zatražite više informacija",
    backToProperties: "Natrag na sve nekretnine",
  },
  filters: {
    allCountries: "Sva odredišta",
    allTypes: "Svi tipovi",
    anyBedrooms: "Svejedno",
    min: "Min",
    max: "Maks",
    reset: "Poništi filtre",
    resultsCountOne: "{count} nekretnina dostupna",
    resultsCountOther: "{count} nekretnina dostupno",
    noResults: "Trenutno nijedna nekretnina ne odgovara ovim kriterijima. Pokušajte proširiti pretragu.",
    budgetAll: "Svaki proračun",
    budgetUpTo: "Do {amount}",
    budgetOver: "Preko {amount}",
  },
  services: {
    kicker: "Naše usluge",
    title: "Prije, tijekom i nakon vaše kupnje",
    items: [
      "Pretraga nekretnina",
      "Novi projekti i Off-Plan",
      "Savjetovanje za međunarodne investicije",
      "Kupnja nekretnina",
      "Pravna i administrativna pomoć",
      "Poslijeprodajna usluga",
      "Upravljanje nekretninama i najmom",
      "Concierge usluge i pomoć pri preseljenju",
    ],
  },
  network: {
    kicker: "Međunarodna mreža",
    title: "Investitori i partneri s kojima surađujemo",
    body: "Naša mreža investitora, agencija i lokalnih brokera raste sa svakom novom destinacijom.",
  },
  consultation: {
    kicker: "Privatna konzultacija",
    title: "Razgovarajmo o vašoj sljedećoj nekretnini",
    body: "Recite nam vaš proračun, destinaciju i cilj — vraćamo se s kratkom, zaista relevantnom selekcijom.",
    cta: "Zatražite privatnu konzultaciju",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "Međunarodna, luksuzna divizija agencije El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Sva prava pridržana.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const ru: Dictionary = {
  nav: {
    home: "Главная",
    properties: "Недвижимость",
    developments: "Проекты",
    destinations: "Направления",
    invest: "Инвестировать",
    services: "Услуги",
    about: "О нас",
    contact: "Контакты",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Исключительная недвижимость. Незабываемые направления.",
    sub: "Тщательно подобранный международный портфель элитных вилл, резиденций и проектов off-plan — Испания, Дубай и Бали, с новыми направлениями по мере роста нашей сети.",
    ctaPrimary: "Смотреть недвижимость",
    ctaSecondary: "Узнать о направлениях",
    searchDestination: "Направление",
    searchType: "Тип недвижимости",
    searchBudget: "Бюджет",
    searchBeds: "Спальни",
    searchSubmit: "Поиск",
  },
  featured: {
    kicker: "Отобрано для вас",
    title: "Рекомендуемая недвижимость",
    empty: "Рекомендуемые объекты появятся здесь, как только первые предложения будут опубликованы в Airtable.",
  },
  developments: {
    kicker: "Новинки и Off-Plan",
    title: "Эксклюзивные проекты",
    empty: "Эксклюзивные проекты появятся здесь, как только будут опубликованы первые проекты.",
    status: {
      available: "Доступно",
      limited: "Ограниченная доступность",
      comingSoon: "Скоро",
      reserved: "Забронировано",
      soldOut: "Продано",
    },
    disclaimer: "Цены и наличие подлежат подтверждению.",
  },
  destinations: {
    kicker: "Где мы работаем",
    title: "Изучите наши направления",
    comingSoon: "Это направление скоро присоединится к нашей сети. Свяжитесь с нами, чтобы узнать первыми.",
    items: [
      { slug: "spain", name: "Испания", tag: "Коста-Бланка и Коста-Кальида, средиземноморский образ жизни" },
      { slug: "uae", name: "ОАЭ", tag: "Дубай и Абу-Даби — знаковая жизнь и инвестиции" },
      { slug: "bali", name: "Бали", tag: "Тропическая роскошь и исключительная недвижимость" },
    ],
  },
  invest: {
    kicker: "Инвестируйте на международном уровне",
    title: "Один консультант для любого рынка",
    body: "Возможности off-plan, новые проекты и потенциал аренды, представленные честно — каждая цифра четко обозначена как гарантированная, заявленная застройщиком или оценочная. Мы никогда не выдаём прогноз за гарантию.",
    cta: "Обсудить ваши инвестиционные цели",
  },
  why: {
    kicker: "Почему LY Luxury",
    title: "Консультант, а не портал",
    points: [
      { title: "Отбор важнее объёма", body: "Мы показываем объекты, которые действительно подходят вашему бюджету, срокам и стратегии — а не весь каталог." },
      { title: "Многоязычно, от начала до конца", body: "Французский, нидерландский, английский, немецкий, сербский, хорватский, итальянский и испанский — на всех этапах покупки." },
      { title: "Опора на El Proyecto Inmobiliario", body: "Лицензированное испанское агентство (RAICV 3999 · API 488) с более чем десятилетним опытом работы с международными клиентами." },
    ],
  },
  founders: foundersFor(
    "Эксклюзивная недвижимость на международном уровне",
    "Инвестируйте · Живите · Наслаждайтесь · Принадлежите",
    "Знакомьтесь с основательницами",
    "Два консультанта, один международный стандарт",
    "Соучредитель — основатель агентства El Proyecto Inmobiliario, международный эксперт по недвижимости",
    "Соучредитель — международный консультант по недвижимости"
  ),
  pages: {
    properties: {
      intro: "Вся недвижимость, доступная в настоящее время через LY Luxury Real Estate — обновляется по мере публикации новых предложений.",
    },
    developments: {
      intro: "Новостройки и проекты off-plan, лично отобранные нами в каждом из наших направлений.",
    },
    destinations: {
      intro: "Страны и направления, где присутствует LY Luxury Real Estate или где мы развиваем нашу сеть — сегодня Испания, ОАЭ и Бали, с новыми рынками по мере роста.",
      placeTemplate: "Откройте для себя возможности элитной недвижимости в {place} с LY Luxury Real Estate — виллы, резиденции и инвестиционные объекты, представленные на вашем языке.",
    },
    services: {
      intro: "Полное многоязычное сопровождение до, во время и после приобретения недвижимости, где бы вы ни покупали с LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate — международное, люксовое подразделение El Proyecto Inmobiliario, созданное для того, чтобы у клиентов был единый, многоязычный консультант на каждом рынке, где мы работаем.",
    },
    contact: {
      intro: "Сообщите нам ваш бюджет, направление и цель — обычно мы отвечаем в течение одного рабочего дня.",
    },
  },
  legal: {
    privacyTitle: "Политика конфиденциальности",
    noticeTitle: "Юридическая информация",
    placeholder: "Эта страница сейчас дорабатывается. А пока вы можете обратиться к нам напрямую с любым вопросом.",
  },
  property: {
    reference: "Референс",
    statusLabel: "Статус",
    condition: "Состояние объекта",
    bedrooms: "Спальни",
    bathrooms: "Ванные комнаты",
    surface: "Жилая площадь",
    land: "Площадь участка",
    priceOnRequest: "Цена по запросу",
    priceNote: "Цена указана в исходной валюте объекта. Пересчитанные суммы носят ориентировочный характер.",
    status: { available: "Доступно", sold: "Продано", rented: "Сдано", reserved: "Забронировано" },
    requestInfo: "Запросить дополнительную информацию",
    backToProperties: "Назад ко всем объектам",
  },
  filters: {
    allCountries: "Все направления",
    allTypes: "Все типы",
    anyBedrooms: "Неважно",
    min: "Мин",
    max: "Макс",
    reset: "Сбросить фильтры",
    resultsCountOne: "{count} объект доступен",
    resultsCountOther: "{count} объектов доступно",
    noResults: "На данный момент нет объектов, соответствующих этим критериям. Попробуйте расширить поиск.",
    budgetAll: "Любой бюджет",
    budgetUpTo: "До {amount}",
    budgetOver: "Более {amount}",
  },
  services: {
    kicker: "Наши услуги",
    title: "До, во время и после приобретения",
    items: [
      "Подбор недвижимости",
      "Новые проекты и Off-Plan",
      "Консультации по международным инвестициям",
      "Приобретение недвижимости",
      "Юридическая и административная поддержка",
      "Послепродажное обслуживание",
      "Управление недвижимостью и арендой",
      "Консьерж-сервис и помощь с переездом",
    ],
  },
  network: {
    kicker: "Международная сеть",
    title: "Застройщики и партнёры",
    body: "Наша сеть застройщиков, агентств и местных брокеров растёт с каждым новым направлением.",
  },
  consultation: {
    kicker: "Частная консультация",
    title: "Поговорим о вашей следующей недвижимости",
    body: "Сообщите нам ваш бюджет, направление и цель — мы вернёмся с коротким и действительно релевантным подбором.",
    cta: "Запросить частную консультацию",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "Международное, люксовое подразделение El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Все права защищены.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const bg: Dictionary = {
  nav: {
    home: "Начало",
    properties: "Имоти",
    developments: "Проекти",
    destinations: "Дестинации",
    invest: "Инвестирайте",
    services: "Услуги",
    about: "За нас",
    contact: "Контакт",
  },
  hero: {
    kicker: "LY Luxury Real Estate",
    by: "by El Proyecto Inmobiliario",
    headline: "Изключителни имоти. Незабравими дестинации.",
    sub: "Внимателно подбрано международно портфолио от луксозни вили, резиденции и off-plan проекти — Испания, Дубай и Бали, с нови дестинации с разрастването на нашата мрежа.",
    ctaPrimary: "Разгледайте имотите",
    ctaSecondary: "Открийте нашите дестинации",
    searchDestination: "Дестинация",
    searchType: "Тип имот",
    searchBudget: "Бюджет",
    searchBeds: "Спални",
    searchSubmit: "Търсене",
  },
  featured: {
    kicker: "Подбрано за вас",
    title: "Препоръчани имоти",
    empty: "Препоръчаните имоти ще се появят тук веднага щом бъдат публикувани първите обяви в Airtable.",
  },
  developments: {
    kicker: "Новости и Off-Plan",
    title: "Ексклузивни проекти",
    empty: "Ексклузивните проекти ще се появят тук веднага щом бъдат публикувани първите проекти.",
    status: {
      available: "Наличен",
      limited: "Ограничена наличност",
      comingSoon: "Очаквайте скоро",
      reserved: "Резервиран",
      soldOut: "Продаден",
    },
    disclaimer: "Цените и наличността подлежат на потвърждение.",
  },
  destinations: {
    kicker: "Къде работим",
    title: "Открийте нашите дестинации",
    comingSoon: "Тази дестинация скоро ще се присъедини към нашата мрежа. Свържете се с нас, за да научите първи.",
    items: [
      { slug: "spain", name: "Испания", tag: "Коста Бланка и Коста Калида, средиземноморски начин на живот" },
      { slug: "uae", name: "ОАЕ", tag: "Дубай и Абу Даби — емблематичен начин на живот и инвестиции" },
      { slug: "bali", name: "Бали", tag: "Тропически лукс и изключителни имоти" },
    ],
  },
  invest: {
    kicker: "Инвестирайте на международно ниво",
    title: "Един консултант за всеки пазар",
    body: "Off-plan възможности, нови проекти и потенциал за отдаване под наем, представени честно — всяка цифра ясно обозначена като гарантирана, обявена от строителя или прогнозна. Никога не представяме прогноза като сигурност.",
    cta: "Обсъдете вашите инвестиционни цели",
  },
  why: {
    kicker: "Защо LY Luxury",
    title: "Консултант, а не портал",
    points: [
      { title: "Подбор вместо обем", body: "Представяме имотите, които наистина отговарят на вашия бюджет, срокове и стратегия — не целия каталог." },
      { title: "Многоезично, от начало до край", body: "Френски, нидерландски, английски, немски, сръбски, хърватски, италиански и испански — през целия процес на покупка." },
      { title: "Подкрепено от El Proyecto Inmobiliario", body: "Лицензирана испанска агенция (RAICV 3999 · API 488) с над десет години опит с международни клиенти." },
    ],
  },
  founders: foundersFor(
    "Ексклузивни имоти на международно ниво",
    "Инвестирайте · Живейте · Наслаждавайте се · Принадлежете",
    "Запознайте се с основателките",
    "Две консултантки, един международен стандарт",
    "Съосновател — основател на El Proyecto Inmobiliario, международен експерт по недвижими имоти",
    "Съосновател — международен консултант по недвижими имоти"
  ),
  pages: {
    properties: {
      intro: "Всички имоти, налични в момента чрез LY Luxury Real Estate — актуализирани веднага щом бъдат публикувани нови обяви.",
    },
    developments: {
      intro: "Нови проекти и off-plan разработки, лично подбрани от нас във всяка от нашите дестинации.",
    },
    destinations: {
      intro: "Държавите и дестинациите, в които LY Luxury Real Estate присъства или изгражда мрежата си — днес Испания, ОАЕ и Бали, с нови пазари с нашия растеж.",
      placeTemplate: "Открийте възможности за луксозни имоти в {place} с LY Luxury Real Estate — вили, резиденции и инвестиционни имоти, представени на вашия език.",
    },
    services: {
      intro: "Пълна, многоезична подкрепа преди, по време и след придобиването на имот, където и да купувате с LY Luxury Real Estate.",
    },
    about: {
      intro: "LY Luxury Real Estate е международното, луксозно подразделение на El Proyecto Inmobiliario — създадено, за да предостави на клиентите един-единствен, многоезичен консултант на всеки пазар, на който работим.",
    },
    contact: {
      intro: "Споделете бюджета, дестинацията и целта си — обикновено отговаряме в рамките на един работен ден.",
    },
  },
  legal: {
    privacyTitle: "Политика за поверителност",
    noticeTitle: "Правна информация",
    placeholder: "Тази страница все още се финализира. Междувременно, моля, свържете се директно с нас за всякакви въпроси.",
  },
  property: {
    reference: "Референтен номер",
    statusLabel: "Статус",
    condition: "Състояние на имота",
    bedrooms: "Спални",
    bathrooms: "Бани",
    surface: "Жилищна площ",
    land: "Площ на парцела",
    priceOnRequest: "Цена при запитване",
    priceNote: "Преизчислените суми са ориентировъчни. Цената е показана в оригиналната валута на имота.",
    status: { available: "Налично", sold: "Продадено", rented: "Отдадено под наем", reserved: "Резервирано" },
    requestInfo: "Заявете повече информация",
    backToProperties: "Обратно към всички имоти",
  },
  filters: {
    allCountries: "Всички дестинации",
    allTypes: "Всички типове",
    anyBedrooms: "Без значение",
    min: "Мин",
    max: "Макс",
    reset: "Изчисти филтрите",
    resultsCountOne: "{count} имот наличен",
    resultsCountOther: "{count} имота налични",
    noResults: "В момента няма имот, отговарящ на тези критерии. Опитайте да разширите търсенето.",
    budgetAll: "Всякакъв бюджет",
    budgetUpTo: "До {amount}",
    budgetOver: "Над {amount}",
  },
  services: {
    kicker: "Нашите услуги",
    title: "Преди, по време и след придобиването",
    items: [
      "Търсене на имоти",
      "Нови проекти и Off-Plan",
      "Консултации за международни инвестиции",
      "Придобиване на имот",
      "Правна и административна помощ",
      "Следпродажбено обслужване",
      "Управление на имоти и отдаване под наем",
      "Консиерж услуги и помощ при преместване",
    ],
  },
  network: {
    kicker: "Международна мрежа",
    title: "Строители и партньори",
    body: "Нашата мрежа от строители, агенции и местни брокери расте с всяка нова дестинация.",
  },
  consultation: {
    kicker: "Частна консултация",
    title: "Нека поговорим за следващия ви имот",
    body: "Споделете бюджета, дестинацията и целта си — ще се свържем с вас с кратка и наистина релевантна селекция.",
    cta: "Заявете частна консултация",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline: "Международното луксозно подразделение на El Proyecto Inmobiliario.",
    license: "RAICV 3999 · API 488",
    rights: "Всички права запазени.",
    email: "lyluxuryrealestate@gmail.com",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr, es, nl, de, sr, hr, ru, bg };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
