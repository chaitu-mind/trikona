/* ============================================================
   Trikona Infra — firm identity.
   EDIT THIS FILE FIRST. Every value marked TODO is a placeholder.
   ============================================================ */

export const site = {
  name: "Trikona Infra",
  legal: "Trikona Infra LLP",
  short: "Trikona",
  tagline: "Civil engineering & construction",

  /** Used for canonical URLs, sitemap and structured data. */
  url: "https://trikonainfra.com",

  founded: "2026",

  /* TODO replace all five */
  phone: "+91 90000 00000",
  whatsapp: "919000000000", // digits only, country code first
  email: "hello@trikonainfra.com",
  street: "Plot 00, Road No. 0, Jubilee Hills",
  gst: "GSTIN — to be issued",

  city: "Hyderabad",
  state: "Telangana",
  postal: "500033",
  country: "IN",

  /* Approximate co-ordinates of the office. Google uses these for local
     search, so replace them with the real ones from Google Maps. */
  geo: { lat: 17.4239, lng: 78.4738 },

  region: "Telangana & Andhra Pradesh",
  areaServed: [
    "Hyderabad",
    "Secunderabad",
    "Ranga Reddy district",
    "Medchal–Malkajgiri",
    "Tirupati",
    "Kurnool",
    "Vijayawada",
  ],

  hours: "Mo-Sa 09:00-19:00",

  revision: "A",
  revNote: "Draft for approval — contact details and project records pending",
} as const;

export const founders = [
  {
    no: "01",
    name: "Chaithanya Reddy",
    role: "Founder — Client & Design",
    vertex: "Client & design",
    bio: "Runs client relationships, design coordination and commercial terms. Every drawing set and every agreement is signed off here before work starts on site.",
  },
  {
    no: "02",
    name: "Tejeswar Reddy",
    role: "Founder — Projects & Execution",
    vertex: "Site & execution",
    bio: "Owns the site. Labour, materials, sequencing and quality checks at every stage from excavation through handover, with a weekly photo record for the client.",
  },
  {
    no: "03",
    name: "Janardhan Reddy",
    role: "Founder — Planning & Estimation",
    vertex: "Cost & schedule",
    bio: "Prepares the bill of quantities, rate analysis and programme. Tracks stage-wise billing against work actually completed, so the cost never drifts quietly.",
  },
] as const;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = () => `tel:${site.phone.replace(/[^+\d]/g, "")}`;
