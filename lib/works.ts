/* ============================================================
   The works record.
   Each entry becomes a card on the home page AND its own indexable
   page at /works/<slug>/ — which is what actually wins local search.
   Set `sample: false` once an entry is real; the red stamp disappears.
   ============================================================ */

export type Category = "Residential" | "Commercial" | "Interiors" | "Site works";
export type DrawingType = "villa" | "apartment" | "retail" | "interior" | "site";

export interface Work {
  slug: string;
  ref: string;
  sample: boolean;
  name: string;
  location: string;
  locality: string;
  category: Category;
  type: DrawingType;
  floors: number;
  bays: number;
  status: "Completed" | "Ongoing";
  year: string;
  area: string;
  config: string;
  scope: string;
  duration: string;
  structure: string;
  note: string;
  detail: string[];
  photo: string | null;
}

export const works: Work[] = [
  {
    slug: "kondapur-duplex-residence",
    ref: "W01",
    sample: true,
    name: "Kondapur duplex residence",
    location: "Kondapur, Hyderabad",
    locality: "Kondapur",
    category: "Residential",
    type: "villa",
    floors: 2,
    bays: 4,
    status: "Completed",
    year: "2025",
    area: "3,850 sq.ft",
    config: "G+1",
    scope: "Turnkey — design to handover",
    duration: "11 months",
    structure: "RCC framed, M25, isolated footings",
    note: "Four-bedroom duplex on a 300 sq.yd plot with a double-height stair well, a car porch cantilevered 2.1 m, and a rainwater harvesting pit to the rear setback.",
    detail: [
      "The plot fell about 900 mm from the road to the rear boundary, so the plinth was set high at the entrance and the level taken up in three steps rather than filling the whole footprint.",
      "The car porch cantilevers 2.1 m off the front columns. That span drove a 450 mm deep edge beam and an additional layer of top reinforcement carried well back into the slab.",
      "Handed over with the as-built drawing set, all material warranties, and a twelve-month defect liability period.",
    ],
    photo: null,
  },
  {
    slug: "padmavathi-nagar-apartments",
    ref: "W02",
    sample: true,
    name: "Padmavathi Nagar apartments",
    location: "Tirupati, Andhra Pradesh",
    locality: "Tirupati",
    category: "Residential",
    type: "apartment",
    floors: 4,
    bays: 5,
    status: "Ongoing",
    year: "2026",
    area: "11,200 sq.ft",
    config: "G+3, 8 units",
    scope: "Structure + finishes",
    duration: "18 months (in progress)",
    structure: "RCC framed, M25, raft foundation",
    note: "Eight two-bedroom units over stilt parking. A raft foundation was adopted after the soil report returned a safe bearing capacity below 120 kN/m² at the founding level.",
    detail: [
      "Isolated footings were designed first, but the soil investigation returned a safe bearing capacity under 120 kN/m² at 1.8 m depth. The footings would have covered most of the plan area anyway, so the design changed to a raft.",
      "Stilt parking sets the ground floor at 3.6 m clear, with the eight units stacked on three floors above it.",
      "Currently at second floor slab. Progress photographs go to the owners every Saturday.",
    ],
    photo: null,
  },
  {
    slug: "anantha-retail-block",
    ref: "W03",
    sample: true,
    name: "Anantha retail block",
    location: "Kurnool, Andhra Pradesh",
    locality: "Kurnool",
    category: "Commercial",
    type: "retail",
    floors: 3,
    bays: 4,
    status: "Completed",
    year: "2025",
    area: "7,400 sq.ft",
    config: "G+2",
    scope: "Shell & core",
    duration: "9 months",
    structure: "RCC framed, M25, 6.0 m clear spans",
    note: "Column-free retail floors at 6.0 m spans with a glazed street elevation, handed over with services rough-in and a shell ready for three independent tenants.",
    detail: [
      "Retail tenants need clear floor plates, so the grid was set at 6.0 m and the beams deepened to 600 mm rather than dropping intermediate columns into the shop floor.",
      "The street elevation is fully glazed between structural bays, with the mullion grid set out to align with the column centres.",
      "Electrical and plumbing were taken to a rough-in stage at each floor, with capped points left for the tenants' own fit-out contractors.",
    ],
    photo: null,
  },
  {
    slug: "shamirpet-farmhouse",
    ref: "W04",
    sample: true,
    name: "Shamirpet farmhouse",
    location: "Shamirpet, Hyderabad",
    locality: "Shamirpet",
    category: "Residential",
    type: "villa",
    floors: 1,
    bays: 5,
    status: "Ongoing",
    year: "2026",
    area: "2,600 sq.ft",
    config: "G",
    scope: "Design & build",
    duration: "8 months (in progress)",
    structure: "RCC framed, M25, strip footings",
    note: "Single-storey weekend house on a two-acre holding, with a 420 m compound wall, a bore well, and an approach road laid to the main gate.",
    detail: [
      "The site had no road access at the start. The approach road and the bore well were done first so material could reach the plot at all.",
      "Single storey across a wide footprint, which let the roof carry a generous overhang on the west face instead of relying on shading devices.",
      "Structure is complete. Currently in finishes.",
    ],
    photo: null,
  },
  {
    slug: "gachibowli-clinic-fit-out",
    ref: "W05",
    sample: true,
    name: "Gachibowli clinic fit-out",
    location: "Gachibowli, Hyderabad",
    locality: "Gachibowli",
    category: "Interiors",
    type: "interior",
    floors: 1,
    bays: 4,
    status: "Completed",
    year: "2025",
    area: "1,900 sq.ft",
    config: "First floor tenancy",
    scope: "Interior fit-out",
    duration: "14 weeks",
    structure: "Partitions, ceiling, MEP, joinery",
    note: "Consulting rooms, a procedure room and reception completed inside a live building, with all noisy work restricted to hours agreed with the other tenants.",
    detail: [
      "The building was occupied throughout. Core cutting and chasing were confined to a two-hour window agreed in writing with the association.",
      "The procedure room needed a washable ceiling and a separate electrical circuit, so those services were taken off a dedicated distribution board rather than the general one.",
      "Completed in fourteen weeks against a sixteen-week programme.",
    ],
    photo: null,
  },
  {
    slug: "chevella-site-development",
    ref: "W06",
    sample: true,
    name: "Chevella site development",
    location: "Chevella, Ranga Reddy district",
    locality: "Chevella",
    category: "Site works",
    type: "site",
    floors: 1,
    bays: 6,
    status: "Completed",
    year: "2025",
    area: "2.4 acres",
    config: "Boundary & roads",
    scope: "Site development",
    duration: "5 months",
    structure: "420 m compound wall, 640 m internal road",
    note: "Levelling and cut-and-fill across a sloping holding, a random rubble compound wall on the boundary, internal roads and storm drainage to the low corner.",
    detail: [
      "The holding fell roughly 4 m corner to corner. Cut-and-fill was balanced on site so no soil had to be carried in or taken away.",
      "Random rubble masonry was used for the compound wall because the stone came off the site itself during levelling.",
      "Storm drainage runs to a soak pit at the low corner rather than discharging onto the neighbouring land.",
    ],
    photo: null,
  },
];

export const categories: (Category | "All")[] = [
  "All",
  "Residential",
  "Commercial",
  "Interiors",
  "Site works",
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
