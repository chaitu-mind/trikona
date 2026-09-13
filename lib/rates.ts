/* ============================================================
   Cost model for the estimator.

   ⚠ REPLACE EVERY RATE BELOW WITH YOUR OWN BEFORE PUBLISHING.
   These are indicative Hyderabad bands and you will be held to
   whatever this page prints. The structure is what matters; the
   numbers are yours to set.
   ============================================================ */

export interface Package {
  id: "essential" | "standard" | "premium";
  name: string;
  blurb: string;
  low: number;   // ₹ per sq.ft of built-up area
  high: number;
  marks: string[];
}

export const packages: Package[] = [
  {
    id: "essential", name: "Essential", low: 1750, high: 1950,
    blurb: "A sound structure with honest, hard-wearing finishes. Nothing cut from what holds the building up.",
    marks: ["M25 concrete", "Fe 500D TMT", "Vitrified flooring 600×600", "Flush internal doors", "Modular switches"],
  },
  {
    id: "standard", name: "Standard", low: 2000, high: 2300,
    blurb: "What most owners choose. Better fittings and joinery on the same structural specification.",
    marks: ["M25 concrete", "Fe 500D TMT", "Vitrified flooring 800×800", "Teak main door", "UPVC windows", "Branded CP fittings"],
  },
  {
    id: "premium", name: "Premium", low: 2400, high: 2900,
    blurb: "Imported and designer finishes, deeper joinery, and a longer finishing programme.",
    marks: ["M25 concrete", "Fe 500D TMT", "Large-format or natural stone", "Teak joinery throughout", "Concealed fittings", "False ceiling across"],
  },
];

/** Where the money actually goes on a residential RCC build.
 *  Percentages are of the construction cost, not of the project cost. */
export const costSplit: { stage: string; pct: number; note: string }[] = [
  { stage: "Excavation & foundation", pct: 11, note: "Earthwork, footings, plinth beam, backfill" },
  { stage: "RCC structure", pct: 27, note: "Columns, beams, slabs, staircase. Steel and concrete" },
  { stage: "Masonry & plaster", pct: 11, note: "Block work, internal and external plaster" },
  { stage: "Flooring & tiling", pct: 9, note: "Living areas, bedrooms, wet areas, skirting" },
  { stage: "Doors & windows", pct: 9, note: "Frames, shutters, glazing, grills, hardware" },
  { stage: "Electrical", pct: 7, note: "Conduits, wiring, boards, points, fixtures" },
  { stage: "Plumbing & sanitary", pct: 7, note: "Supply, drainage, fittings, overhead and sump tanks" },
  { stage: "Painting", pct: 5, note: "Putty, primer, interior emulsion, exterior weather coat" },
  { stage: "Waterproofing & misc", pct: 8, note: "Terrace, sunk slabs, railings, site clearance" },
  { stage: "Supervision & overheads", pct: 6, note: "Site engineer, scaffolding, machinery, testing" },
];

/** Stage-wise billing. You pay against work measured, not a calendar. */
export const paymentSchedule: { at: string; pct: number }[] = [
  { at: "On signing the agreement", pct: 10 },
  { at: "Foundation and plinth complete", pct: 15 },
  { at: "Ground floor slab cast", pct: 15 },
  { at: "Upper slabs cast", pct: 15 },
  { at: "Masonry and plaster complete", pct: 15 },
  { at: "Flooring, doors and windows complete", pct: 15 },
  { at: "Electrical, plumbing and painting complete", pct: 10 },
  { at: "Handover after snag clearance", pct: 5 },
];

/** Stated plainly, because this is where quotes mislead people. */
export const exclusions = [
  "Land cost, registration and stamp duty",
  "Government approval fees, development charges and deposits",
  "Compound wall, gate, landscaping and external paving",
  "Borewell, sump beyond standard capacity, and water connection",
  "Lift, solar, air conditioning and home automation",
  "Modular kitchen, wardrobes and loose furniture",
  "GST, charged at the applicable rate on the contract value",
];

/** Typical ground coverage after setbacks, as a share of plot area.
 *  Plot-size dependent because setbacks do not scale with the plot. */
export const coverageFor = (plotSqYd: number) =>
  plotSqYd <= 150 ? 0.72 : plotSqYd <= 300 ? 0.66 : plotSqYd <= 600 ? 0.6 : 0.55;

/** Rough programme, in months, from foundation to handover. */
export const durationMonths = (builtUp: number, floors: number) =>
  Math.max(6, Math.round(5 + builtUp / 1100 + floors * 1.1));
