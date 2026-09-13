export interface Capability {
  ref: string; slug: string; title: string; short: string; desc: string;
  tags: string[]; intro: string; includes: string[]; deliverables: string[]; fit: string;
}

export const capabilities: Capability[] = [
  {
    ref: "C.01", slug: "turnkey-residential", title: "Turnkey residential",
    short: "Plot to keys on one agreement",
    desc: "Individual houses, duplexes and small apartment blocks taken from empty plot to key handover on a single agreement and a single point of contact.",
    tags: ["G to G+4", "RCC framed", "Per sq.ft or item rate"],
    intro: "Turnkey means you sign once and hold one party responsible for everything that follows. Drawings, approvals, structure, services, finishes and handover all sit with us, priced against a specification agreed before the first load of sand arrives.",
    includes: [
      "Architectural and structural drawings, revised until you sign off",
      "Building permission drawings and follow-up with the local authority",
      "Excavation, foundation, RCC frame, masonry and plaster",
      "Electrical, plumbing and sanitary, concealed and tested",
      "Flooring, joinery, painting and all fixtures in the specification",
      "Site cleaning, snag clearance and handover",
    ],
    deliverables: [
      "Signed agreement with a stage-wise payment schedule",
      "Approved drawing set and bill of quantities",
      "Weekly dated photographs through the whole build",
      "Cube test reports at seven and twenty-eight days",
      "As-built drawings, material warranties and a twelve-month defect liability period",
    ],
    fit: "Owners building one house who want a single point of responsibility rather than coordinating a contractor, an engineer and six sub-trades themselves.",
  },
  {
    ref: "C.02", slug: "structural-design", title: "Structural design & detailing",
    short: "Foundations, framing and bar bending schedules",
    desc: "Foundation design from soil bearing capacity, framing layouts, beam and slab schedules, and bar bending schedules issued as a stamped drawing set.",
    tags: ["IS 456:2000", "IS 875", "BBS"],
    intro: "The structural set is where a building is either safe and economical or neither. We design to the Indian standards, size members against the actual soil report rather than a rule of thumb, and issue drawings a bar bender can work from without ringing anyone.",
    includes: [
      "Review of the soil investigation and selection of foundation type",
      "Isolated, combined, strip, raft or pile foundation design",
      "Column, beam and slab framing layouts floor by floor",
      "Reinforcement detailing with laps, anchorage and cover specified",
      "Bar bending schedules with cutting lengths and weights",
      "Staircase, water tank, retaining wall and lintel details",
    ],
    deliverables: [
      "Stamped structural drawing set in PDF and printable sizes",
      "Bar bending schedule as a spreadsheet, with steel weights totalled",
      "Design basis note recording loads, grades and assumptions",
      "Site queries answered through construction at no extra charge",
    ],
    fit: "Owners and contractors who have architectural drawings and need the structure designed properly, including those building with a contractor other than us.",
  },
  {
    ref: "C.03", slug: "commercial-shell-core", title: "Commercial shell & core",
    short: "Retail, clinic, office and warehouse shells",
    desc: "Retail blocks, clinics, offices and warehouse shells. Structure, envelope and services rough-in, handed over ready for a tenant fit-out.",
    tags: ["Shell & core", "Services rough-in", "Clear spans"],
    intro: "A commercial shell is judged on how quickly it can be let and how little a tenant has to undo. That means clear floor plates, honest floor-to-floor heights, and services brought to a point where a fit-out contractor can simply connect.",
    includes: [
      "Wide-span RCC frame designed to keep columns out of usable floor area",
      "External envelope, glazing grid and weatherproofing",
      "Common stairs, lift shaft, toilet cores and terrace",
      "Electrical supply to a floor distribution board per tenancy",
      "Plumbing and drainage stacks with capped connections",
      "Fire escape provisions coordinated with the approval drawings",
    ],
    deliverables: [
      "Shell handed over with services rough-in and capped points",
      "Tenancy-wise service drawings so fit-out contractors can plan",
      "Occupancy documentation support",
    ],
    fit: "Owners developing a building to let, where the tenant is not yet known and the shell has to suit more than one kind of occupier.",
  },
  {
    ref: "C.04", slug: "interiors-fit-out", title: "Interiors & fit-out",
    short: "Partitions, ceilings, joinery, services and finishes",
    desc: "Full interior packages including partitions, false ceiling, joinery, electrical and finishes, coordinated against the base build so nothing gets cut open twice.",
    tags: ["Joinery", "MEP", "Finishes"],
    intro: "Most fit-out overruns come from services being planned after the ceiling is closed. We set out the services first, against the base build drawings, so the ceiling goes up once and stays up.",
    includes: [
      "Layout planning and detailed interior drawings",
      "Partitions in blockwork, gypsum or glazed systems",
      "False ceiling with the lighting and air conditioning grid set out on it",
      "Electrical, data and air conditioning modifications",
      "Site and factory joinery, wardrobes, counters and storage",
      "Flooring, painting, and final cleaning",
    ],
    deliverables: [
      "Interior drawing set with a services coordination layout",
      "Programme broken into rooms so you can occupy in phases",
      "Snag list cleared jointly before final payment",
    ],
    fit: "Clinics, offices, retail units and homes being fitted out inside an existing building, including occupied buildings where working hours are restricted.",
  },
  {
    ref: "C.05", slug: "renovation-retrofit", title: "Renovation & retrofit",
    short: "Additional floors, strengthening and waterproofing",
    desc: "Additional floors, structural strengthening, waterproofing and rehabilitation of older buildings, preceded by a condition survey and a load check.",
    tags: ["Load check", "Jacketing", "Waterproofing"],
    intro: "Nothing gets added to an existing building until we know what the existing building can carry. A condition survey and a load check come first, always, and sometimes the honest answer is that the extra floor is not worth what strengthening it would cost.",
    includes: [
      "Condition survey with photographs of visible distress",
      "Check of existing foundations and columns against the proposed load",
      "Column and beam jacketing, or steel strengthening where it suits better",
      "Crack repair, grouting and plaster rehabilitation",
      "Terrace, sunk slab, bathroom and basement waterproofing",
      "Additional floor construction tied into the existing frame",
    ],
    deliverables: [
      "Condition survey report with a clear recommendation",
      "Strengthening drawings where the structure needs work",
      "Waterproofing warranty in writing",
    ],
    fit: "Owners of buildings ten years old or more, and anyone told by another contractor that an extra floor is fine without a load check having been done.",
  },
  {
    ref: "C.06", slug: "site-development", title: "Site development",
    short: "Levelling, compound walls, roads and drainage",
    desc: "Compound walls, levelling and cut-and-fill, internal roads, storm drainage, septic and rainwater harvesting pits, and boundary demarcation.",
    tags: ["Levelling", "Drainage", "Compound wall"],
    intro: "On an open plot, site development is what makes everything afterwards possible. A boundary that is actually on your line, an access road that survives a monsoon, and water that leaves the site somewhere other than your neighbour's land.",
    includes: [
      "Boundary demarcation against the survey record",
      "Levelling and cut-and-fill, balanced on site where possible",
      "Compound wall in random rubble, solid block or precast",
      "Gates, gate piers and approach road",
      "Internal roads, kerbs and storm water drains",
      "Septic tank, soak pit and rainwater harvesting pit",
    ],
    deliverables: [
      "Levels drawing showing cut and fill quantities",
      "Compound wall and gate drawings",
      "Measured bill for every item, with quantities you can check on site",
    ],
    fit: "Farm land, open plots and layouts being prepared before a building starts, and owners who want a boundary secured before they build.",
  },
  {
    ref: "C.07", slug: "estimation-quantity-surveying", title: "Estimation & quantity surveying",
    short: "BOQ, rate analysis and independent bill checking",
    desc: "Detailed BOQ, rate analysis and tender comparison for owners building with their own contractor who want the numbers checked independently.",
    tags: ["BOQ", "Rate analysis", "Bill checking"],
    intro: "A bill of quantities turns a drawing into a number anyone can verify. If you are already building with someone else, this is the cheapest way to find out whether what you are being charged matches what has been built.",
    includes: [
      "Quantity take-off from your drawings, item by item",
      "Rate analysis against current material and labour rates",
      "Tender document preparation and comparison of contractor quotes",
      "Running bill checking with joint site measurement",
      "Variation and extra-item pricing",
      "Final account settlement",
    ],
    deliverables: [
      "Bill of quantities as a spreadsheet you keep and reuse",
      "Written comparison of quotes on a like-for-like basis",
      "Measurement book entries for every bill certified",
    ],
    fit: "Owners who already have a contractor, and anyone who has received quotes that differ wildly and cannot tell why.",
  },
  {
    ref: "C.08", slug: "project-management", title: "Project management",
    short: "Supervision only, you hold the contracts",
    desc: "Supervision-only engagement. We run the programme, inspect each stage and certify the contractor's bills, while you hold the contracts directly.",
    tags: ["PMC", "Stage inspection", "Bill certification"],
    intro: "Some owners want to appoint trades directly and keep the margin. That works, provided somebody competent is checking the work and the bills. That is what this engagement is.",
    includes: [
      "Programme preparation and weekly tracking against it",
      "Stage inspections at foundation, plinth, each slab and finishes",
      "Reinforcement checks before every pour, with photographs",
      "Material checks against the agreed specification and test certificates",
      "Certification of contractor running bills after joint measurement",
      "Snag list preparation and clearance tracking",
    ],
    deliverables: [
      "Weekly progress report with photographs",
      "Inspection records at each stage",
      "Certified bills, with deductions explained in writing",
    ],
    fit: "Owners appointing their own contractor or trades, and families abroad who need someone accountable standing on the site.",
  },
  {
    ref: "C.09", slug: "approvals-liaison", title: "Approvals & liaison",
    short: "Permission drawings and occupancy documentation",
    desc: "Building permission drawings, layout approvals and occupancy documentation prepared and followed up with the local authority.",
    tags: ["Permission set", "Occupancy"],
    intro: "Approvals are slow, but most of the delay is avoidable. Drawings that match the setback and height rules before they are submitted come back far faster than drawings that have to be redrawn twice.",
    includes: [
      "Permission drawing set prepared to the local authority format",
      "Setback, height, coverage and parking checked before submission",
      "Submission, follow-up and response to queries raised",
      "Layout and sub-division approvals where applicable",
      "Occupancy certificate documentation at completion",
    ],
    deliverables: [
      "Submitted drawing set and acknowledgement",
      "Sanctioned plan handed to you on approval",
      "Occupancy documentation at the end of the project",
    ],
    fit: "Owners starting a new build who need the permission set, and anyone whose file has been stuck with the authority.",
  },
];

export const method = [
  { no: "01", title: "Site visit & soil", out: "Site report + soil test",
    desc: "We walk the plot, check access, levels, the water table and neighbouring structures, and order a bearing capacity test where the foundation calls for one." },
  { no: "02", title: "Drawings", out: "Approved drawing set",
    desc: "Plans, elevations and the structural set, coordinated with Vaastu requirements where the family follows them, and revised until you sign off." },
  { no: "03", title: "Estimate & agreement", out: "BOQ + signed agreement",
    desc: "A line-by-line bill of quantities against the approved drawings, a fixed specification, a payment schedule tied to stages, and a written agreement." },
  { no: "04", title: "Foundation to plinth", out: "Plinth level certified",
    desc: "Excavation, footing, column starters, plinth beam and backfill. Concrete cubes cast and sent for seven and twenty-eight day testing." },
  { no: "05", title: "Superstructure", out: "Structure complete",
    desc: "Columns, beams and slabs floor by floor, then masonry and plaster. Photographs of reinforcement go to you before every pour, not after." },
  { no: "06", title: "Finishes & handover", out: "Keys + as-built set",
    desc: "Electrical, plumbing, flooring, joinery and painting, then a joint snag list, clearance of every item on it, and handover with the as-built set and warranties." },
] as const;

export const spec = {
  caption: "Standard specification — residential turnkey, Package A. Upgrades priced on request.",
  rows: [
    ["Foundation", "Isolated / raft footing to soil report", "IS 1904"],
    ["Concrete", "M20 footing · M25 columns, beams, slabs", "IS 456:2000"],
    ["Reinforcement", "Fe 500D TMT, ISI marked", "IS 1786"],
    ["Cement", "OPC 53 grade structure · PPC masonry", "IS 269 / IS 1489"],
    ["Masonry", "AAC blocks 200 mm external · 100 mm internal", "IS 2185"],
    ["Plaster", "External 15 mm double coat · internal 12 mm", "1:5 / 1:6 CM"],
    ["Waterproofing", "Crystalline to sunk slabs, terrace & basement", "10 yr warranty"],
    ["Electrical", "FR copper wiring in concealed PVC conduit", "IS 694"],
    ["Plumbing", "CPVC supply · PVC drainage, concealed", "IS 15778"],
    ["Doors", "Teak frame, main door teak, internals flush", "—"],
    ["Windows", "UPVC sliding with mosquito mesh & grill", "—"],
    ["Flooring", "800×800 vitrified · anti-skid in wet areas", "—"],
    ["Painting", "Interior emulsion · exterior weather coat", "2 coats + primer"],
    ["Testing", "Concrete cubes at 7 and 28 days, third party", "IS 516"],
  ],
} as const;

export const assurance = [
  { title: "A written agreement, always", desc: "Scope, specification, rate, timeline and payment stages on paper before a single load of material reaches the site." },
  { title: "Stage-wise billing only", desc: "You pay against work that is finished and measured, never against a calendar date or an advance that outruns the progress." },
  { title: "Weekly photo record", desc: "Dated site photographs and a short progress note every week, so an owner living abroad sees exactly what an owner standing on site would." },
  { title: "Third-party cube testing", desc: "Concrete samples from every major pour go to an independent lab. Reports are handed to you, pass or fail." },
  { title: "Rates that do not move", desc: "The quoted rate holds for the agreed scope. Changes are priced and approved in writing before the work is done, never billed as a surprise." },
  { title: "Twelve-month defect liability", desc: "Any workmanship defect reported within a year of handover is rectified at our cost, in writing as part of the agreement." },
] as const;

/* These feed both the page and FAQ structured data, which is what Google
   expands under a search result. Answer plainly and never with a number you
   are not willing to honour. */
export const faqs = [
  {
    q: "What does construction cost per square foot in Hyderabad?",
    a: "It depends almost entirely on specification, not on the builder. A standard residential turnkey package using M25 concrete, Fe 500D steel, AAC blocks and vitrified flooring generally falls in a band we will quote you in writing after seeing the plot and your drawings. Our published rates and a stage-by-stage breakdown are on the cost page, so you can do the sum yourself before calling anyone. We also publish the full material specification, so you can compare any two quotes line by line instead of comparing headline rates.",
  },
  {
    q: "How long does a G+1 house take to build?",
    a: "For a typical 3,000 to 4,000 sq.ft duplex on a clear plot with approvals in hand, ten to twelve months from foundation to handover is realistic. Monsoon, approval delays and changes made after the drawings are signed are the three things that usually extend it.",
  },
  {
    q: "Do you work on a per square foot rate or item rate?",
    a: "Both. A per square foot rate is simpler for a straightforward house with a fixed specification. Item rate suits projects where the scope is likely to move, because every change is measured and priced against a rate that was agreed at the start. We will tell you which one fits your project.",
  },
  {
    q: "Will you follow Vaastu requirements?",
    a: "Yes. Vaastu inputs are taken at the drawing stage, before the structural design is fixed, because moving an entrance or a kitchen after the framing layout is settled is expensive. Bring your consultant's notes to the first meeting.",
  },
  {
    q: "Can you handle building permission and approvals?",
    a: "Yes. We prepare the permission drawing set, submit it and follow it up with the local authority, and prepare occupancy documentation at the end. Statutory fees are paid by the owner at cost.",
  },
  {
    q: "What happens if something is defective after handover?",
    a: "Any workmanship defect reported within twelve months of handover is rectified at our cost. That defect liability period is written into the agreement rather than being a verbal assurance.",
  },
] as const;
