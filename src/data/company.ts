import {
  Zap, Factory, Anchor, Snowflake, Building2, Landmark, Mountain,
  Wheat, Milk, Home, Gem, Cpu, Globe, Award, Shield, FlaskConical,
  type LucideIcon,
} from "lucide-react";

/* ========================================================================== */
/*  LEADERSHIP                                                                 */
/* ========================================================================== */

export interface Leader {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  education: string[];
  experience: string;
  bio: string;
  quote: string;
  roles?: string[];
  spotlight?: boolean;
}

export const leaders: Leader[] = [
  {
    id: "kamal-kishore",
    name: "Kamal Kishore Sarda",
    title: "Chairman & Managing Director",
    company: "SEML & SMAL",
    image: "/images/leadership/kamal-kishore-sarda.jpg",
    education: [
      "B.E. Mechanical Engineering, NIT Nagpur",
      "Strategic Management, IIM Ahmedabad",
      "Human Resources, XLRI Jamshedpur",
    ],
    experience: "Nearly five decades in the iron and steel industry",
    bio: "The visionary founder who transformed a small steel trading firm in 1930s Rajnandgaon into a \u20B918,000 Crore industrial conglomerate spanning 15 companies across mining, power, steel, ferro alloys, and construction materials. Under his leadership, the Sarda Group became India\u2019s largest manganese alloy producer and exporter, with operations across 60+ countries.",
    quote: "We don\u2019t just build industries \u2014 we build the foundations that elevate nations. Rhino is the next chapter in that legacy.",
    roles: [
      "Former member, IDBI Advisory Board",
      "Ex-President, Friends of Tribal Society (Raipur)",
      "Former Chairman, CII Chhattisgarh Chapter",
    ],
  },
  {
    id: "neeraj",
    name: "Neeraj Sarda",
    title: "Deputy Managing Director",
    company: "Sarda Metals & Alloys Ltd.",
    image: "/images/leadership/neeraj-sarda.png",
    education: [
      "B.E. Industrial Engineering, Nagpur University",
      "MBA (Finance & Marketing), University of Pittsburgh, USA",
    ],
    experience: "18+ years in project execution, corporate affairs, and plant operations",
    bio: "The driving force behind Rhino Rock Mineral Wool. Over 7 years, Neeraj oversaw the research, development, and global technology partnerships that led to India\u2019s first electric-smelted rock mineral wool \u2014 eliminating fossil fuels from insulation manufacturing entirely. He manages day-to-day operations at SMAL\u2019s 281-acre Vizianagaram facility and champions the vision of making India a global leader in sustainable insulation.",
    quote: "Seven years ago, we asked a simple question: can you make world-class insulation without burning a single gram of fossil fuel? Rhino is that answer \u2014 zero coke, zero coal, zero compromise.",
    roles: [
      "Vice Chairman, CII Andhra Pradesh",
      "Past Chairman, CII Vizag Zone (2015\u201316)",
    ],
    spotlight: true,
  },
];

/* ========================================================================== */
/*  SARDA GROUP                                                                */
/* ========================================================================== */

export const sardaGroupStats = [
  { value: "6,000", prefix: "\u20B9", suffix: " Cr", label: "Annual Revenue" },
  { value: "18,000", prefix: "\u20B9", suffix: " Cr", label: "Market Cap" },
  { value: "8,000", suffix: "+", label: "Workforce" },
  { value: "60", suffix: "+", label: "Countries" },
  { value: "15", label: "Companies" },
  { value: "465", suffix: "+ MW", label: "Power Generation" },
];

export const sardaTimeline = [
  { year: "1930s", event: "Steel trading firm founded in Rajnandgaon, Chhattisgarh" },
  { year: "1973", event: "Sarda Energy & Minerals Ltd. (SEML) incorporated" },
  { year: "1987", event: "Ferro alloy manufacturing begins; exports to 60+ countries" },
  { year: "2013", event: "SMAL greenfield facility at Vizianagaram, Andhra Pradesh" },
  { year: "2018", event: "Rhino R&D begins \u2014 7-year journey to zero fossil fuel insulation" },
  { year: "2025", event: "Rhino launched at IGBC 2025, Jio World Convention Centre, Mumbai" },
];

export const sardaVerticals: { icon: LucideIcon; name: string }[] = [
  { icon: Zap, name: "Power & Energy" },
  { icon: Mountain, name: "Mining" },
  { icon: Factory, name: "Steel" },
  { icon: Gem, name: "Ferro Alloys" },
  { icon: Wheat, name: "Hybrid Seeds" },
  { icon: Milk, name: "Dairy Products" },
  { icon: Home, name: "Real Estate" },
  { icon: Building2, name: "Construction Materials" },
];

export const technologyPartners = [
  "Tenova Pyromet",
  "Siemens",
  "SGL Carbon",
  "Doosan Babcock",
  "RHI Magnesita",
  "Tamini",
  "ABB",
];

export const globalOffices = [
  { city: "Dubai", country: "UAE" },
  { city: "Hong Kong", country: "China" },
  { city: "Singapore", country: "Singapore" },
  { city: "Indonesia", country: "Indonesia" },
  { city: "Malaysia", country: "Malaysia" },
];

/* ========================================================================== */
/*  CERTIFICATIONS (DEEP-DIVE)                                                 */
/* ========================================================================== */

export interface Certification {
  name: string;
  fullName: string;
  issuingBody: string;
  number?: string;
  category: "quality" | "environment" | "safety" | "energy" | "lab" | "standard" | "trade" | "workplace";
  description: string;
  relevance: string;
  image: string;
}

export const certificationsDetailed: Certification[] = [
  {
    name: "ISO 9001",
    fullName: "ISO 9001:2015 Quality Management System",
    issuingBody: "International Organization for Standardization",
    category: "quality",
    description: "Certifies that Rhino\u2019s manufacturing processes follow internationally recognized quality management principles, ensuring consistent product quality, customer satisfaction, and continuous improvement.",
    relevance: "Specifiers can trust that every batch of Rhino insulation meets the same exacting standards \u2014 density, thermal conductivity, and fire performance are verified and traceable.",
    image: "/images/certifications/iso-9001.png",
  },
  {
    name: "ISO 14001",
    fullName: "ISO 14001:2015 Environmental Management System",
    issuingBody: "International Organization for Standardization",
    category: "environment",
    description: "Certifies that Rhino\u2019s manufacturing facility operates under a systematic environmental management framework, minimizing waste, emissions, and resource consumption.",
    relevance: "Supports IGBC, GRIHA, and LEED green building credit applications. Demonstrates that the zero-fossil-fuel claim is backed by an audited environmental management system.",
    image: "/images/certifications/iso-14001.png",
  },
  {
    name: "ISO 45001",
    fullName: "ISO 45001:2018 Occupational Health & Safety",
    issuingBody: "International Organization for Standardization",
    category: "safety",
    description: "Certifies that the manufacturing facility maintains rigorous occupational health and safety standards, protecting workers and ensuring safe handling of raw materials and finished products.",
    relevance: "Important for industrial and marine applications where insulation is installed in hazardous environments. Confirms Rhino\u2019s IARC Group 3 classification (not carcinogenic) is backed by systematic safety management.",
    image: "/images/certifications/iso-45001.png",
  },
  {
    name: "ISO 50001",
    fullName: "ISO 50001:2018 Energy Management System",
    issuingBody: "International Organization for Standardization",
    category: "energy",
    description: "Certifies that Rhino\u2019s facility systematically manages energy consumption, with the 80 MW captive power plant and electric arc furnaces optimized for minimal energy waste.",
    relevance: "Unique among Indian insulation manufacturers. Directly supports the \u201czero fossil fuel\u201d manufacturing claim and contributes to EPD (Environmental Product Declaration) calculations.",
    image: "/images/certifications/iso-50001.png",
  },
  {
    name: "NaBL",
    fullName: "NaBL Accredited Testing Laboratory (TC-12249)",
    issuingBody: "National Accreditation Board for Testing and Calibration Laboratories",
    number: "TC-12249",
    category: "lab",
    description: "Rhino operates India\u2019s first NaBL-accredited insulation testing laboratory on-site. Every production batch is tested for thermal conductivity, density, fire resistance, acoustic absorption, water absorption, shot content, and chemical composition.",
    relevance: "Architects and engineers can request test certificates traceable to a nationally accredited lab \u2014 not third-party estimates. This is a level of quality assurance no other Indian insulation manufacturer offers in-house.",
    image: "/images/certifications/nabl.avif",
  },
  {
    name: "BIS IS 8183",
    fullName: "BIS IS 8183:2024 \u2014 Bonded Mineral Wool",
    issuingBody: "Bureau of Indian Standards",
    category: "standard",
    description: "The primary Indian standard for bonded mineral wool insulation products. Covers thermal, physical, and mechanical properties for slabs, rolls, and pipe sections.",
    relevance: "Mandatory for government and public sector projects in India. All Rhino RSL, RWM, RBR, and RRA products are manufactured and tested to this standard.",
    image: "/images/certifications/is-8183.avif",
  },
  {
    name: "BIS IS 1470",
    fullName: "BIS IS 1470 \u2014 Silico Manganese Specification",
    issuingBody: "Bureau of Indian Standards",
    category: "standard",
    description: "Standard for the parent company\u2019s core ferro alloy products, demonstrating the group\u2019s deep expertise in high-temperature metallurgy and materials science.",
    relevance: "Validates that Rhino\u2019s electric arc furnace technology is built on decades of proven metallurgical expertise \u2014 not experimental. The same furnaces that produce world-class ferro alloys now produce insulation.",
    image: "/images/certifications/is-1470.avif",
  },
  {
    name: "Three-Star Export House",
    fullName: "Three-Star Export House Certification",
    issuingBody: "Ministry of Commerce & Industry, Government of India",
    category: "trade",
    description: "Recognizes Sarda Group\u2019s excellence in international trade with exports to 60+ countries. This status provides preferential access to trade finance and customs benefits.",
    relevance: "For international buyers: confirms Rhino\u2019s parent company is a trusted, established exporter with government-recognized trade credentials.",
    image: "/images/certifications/export-house.avif",
  },
  {
    name: "Great Place to Work",
    fullName: "Great Place to Work\u00AE Certified",
    issuingBody: "Great Place to Work\u00AE Institute",
    category: "workplace",
    description: "Independent certification recognizing SMAL as an employer that values trust, pride, and camaraderie. Based on anonymous employee surveys covering credibility, respect, fairness, pride, and belonging.",
    relevance: "A company that treats its people well produces better products. GPTW certification is a signal of operational maturity and management quality that extends to product quality.",
    image: "/images/certifications/gptw.png",
  },
];

/* ========================================================================== */
/*  DEALERS                                                                    */
/* ========================================================================== */

export interface RegionalHead {
  zone: string;
  color: string;
  name: string;
  phone: string;
  email: string;
  cities: string[];
}

export interface Dealer {
  company: string;
  contact: string;
  city: string;
  state: string;
  phone: string;
}

export const regionalHeads: RegionalHead[] = [
  {
    zone: "North",
    color: "#FF6600",
    name: "Rohit Bhatia",
    phone: "+91 82877 68787",
    email: "rohit.bhatia@rhinoinsulation.in",
    cities: ["Delhi", "NCR", "Punjab", "Haryana", "UP", "Rajasthan"],
  },
  {
    zone: "East",
    color: "#2DB86E",
    name: "Sanjib Ghosh",
    phone: "+91 99030 76013",
    email: "sanjib.ghosh@rhinoinsulation.in",
    cities: ["Kolkata", "Bhubaneswar", "Odisha", "West Bengal", "Bihar", "Jharkhand"],
  },
  {
    zone: "West",
    color: "#FF8800",
    name: "Manish Vaghela",
    phone: "+91 89777 66563",
    email: "manish.vaghela@rhinoinsulation.in",
    cities: ["Vadodara", "Pune", "Gujarat", "Maharashtra", "Goa"],
  },
  {
    zone: "South",
    color: "#1D6FA4",
    name: "Deepak K. Shidlingappa",
    phone: "+91 733 111 3029",
    email: "deepak.ks@rhinoinsulation.in",
    cities: ["Bengaluru", "Chennai", "Hyderabad", "Karnataka", "Tamil Nadu", "Telangana", "Kerala", "AP"],
  },
];

export const dealers: Dealer[] = [
  {
    company: "Yashash Building Solutions Pvt Ltd",
    contact: "Ajay Parida",
    city: "Bhubaneswar",
    state: "Odisha",
    phone: "",
  },
  {
    company: "Fibers India",
    contact: "Kiran Naithani",
    city: "Ludhiana",
    state: "Punjab",
    phone: "",
  },
];

export const dealerBenefits = [
  {
    title: "Territory Protection",
    description: "Exclusive territory allocation to protect your market and maximize returns.",
  },
  {
    title: "Technical Training",
    description: "Comprehensive product and application training from Rhino\u2019s engineering team.",
  },
  {
    title: "Marketing Support",
    description: "Co-branded marketing materials, product samples, and display units provided.",
  },
  {
    title: "Technical Assistance",
    description: "Direct access to Rhino\u2019s NaBL-accredited lab for testing and specification support.",
  },
];

export const onboardingSteps = [
  { step: 1, title: "Application", description: "Submit your interest and business details through our online form." },
  { step: 2, title: "Review", description: "Our regional team evaluates your application and market potential." },
  { step: 3, title: "Territory Discussion", description: "We discuss territory allocation, targets, and commercial terms." },
  { step: 4, title: "Onboarding", description: "Product training, marketing kit, and initial inventory setup." },
  { step: 5, title: "Launch", description: "You\u2019re live \u2014 with ongoing support from Rhino\u2019s technical and sales teams." },
];

/* ========================================================================== */
/*  FAQ                                                                        */
/* ========================================================================== */

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "All",
  "Products",
  "Technical",
  "Sustainability",
  "ECBC & Compliance",
  "Ordering & Dealers",
  "Installation",
];

export const faqs: FAQ[] = [
  // Products
  {
    category: "Products",
    question: "What is rock mineral wool insulation?",
    answer: "Rock mineral wool is a high-performance insulation material made from volcanic basalt rock, heated to 1,600\u20131,800\u00B0C and spun into ultra-fine fibers (diameter < 7 microns). The resulting product provides exceptional thermal insulation, fire resistance (Euro A1, non-combustible up to 1,000\u00B0C+), and acoustic absorption (NRC up to 1.0) in a single material. Rhino Rock Mineral Wool is unique because it is manufactured using India\u2019s first electric arc furnace \u2014 zero fossil fuels, zero SO\u2082, zero NO\u2093.",
  },
  {
    category: "Products",
    question: "How is rock mineral wool different from glass wool?",
    answer: "Rock mineral wool (basalt-based) offers higher fire resistance (Euro A1 vs A2), higher service temperatures (750\u00B0C vs 230\u00B0C), superior acoustic performance at low frequencies due to higher density, and better dimensional stability over time. Glass wool is lighter and can be less expensive for low-temperature building applications. For projects requiring fire safety, high-temperature resistance, or IGBC/GRIHA compliance, rock mineral wool is the preferred choice.",
  },
  {
    category: "Products",
    question: "Which Rhino product is right for my application?",
    answer: "Rhino offers 5 products: RSL Slabs for walls, roofs, and general insulation (40\u2013200 kg/m\u00B3); RWM Wired Matts for pipes, vessels, and high-vibration environments; RBR Building Rolls for large-area coverage like pitched roofs and HVAC ducts; RRA RockArmor for facades, fire barriers, and cladding systems; and RLW Loose Wool for filling irregular cavities. Use our Product Selector tool at /tools/product-selector for a guided recommendation.",
  },
  {
    category: "Products",
    question: "What are the three Rhino variants (Elite, Enduro, Eco-Green)?",
    answer: "All three variants are manufactured in the same electric arc furnace facility. They differ in carbon reduction levels: Elite (25% less CO\u2082, available now) for maximum thermal performance; Enduro (45% less CO\u2082, launching 2026) for balanced performance and sustainability; and Eco-Green (65% less CO\u2082, launching 2026) for net-zero buildings and IGBC/GRIHA projects. The product type (RSL, RWM, etc.) and variant (Elite, Enduro, Eco-Green) are independent choices.",
  },
  // Technical
  {
    category: "Technical",
    question: "What is the maximum service temperature for Rhino products?",
    answer: "All Rhino products can withstand a maximum continuous service temperature of 750\u00B0C. The melting point exceeds 1,000\u00B0C. This makes Rhino suitable for boilers, furnaces, steam pipes, exhaust systems, and other high-temperature industrial applications. The Flame Spread Index is 0 and Smoke Developed Index is 35 per ASTM E84.",
  },
  {
    category: "Technical",
    question: "What fire rating do Rhino products achieve?",
    answer: "All Rhino products achieve Euro Class A1 non-combustible fire classification with a melting point exceeding 1,000\u00B0C. Per ASTM E84 testing: Flame Spread Index (FSI) = 0, Smoke Developed Index (SDI) = 35. The products generate no toxic smoke when exposed to fire. This makes them suitable for fire barrier assemblies, A-60 bulkhead ratings in marine applications, and all fire safety-critical construction.",
  },
  {
    category: "Technical",
    question: "What certifications does Rhino hold?",
    answer: "Rhino holds ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Safety), ISO 50001 (Energy), NaBL laboratory accreditation (TC-12249), BIS IS 8183:2024 (Bonded Mineral Wool), Three-Star Export House status, and Great Place to Work certification. Products are tested to IS 8183, ASTM C612, ASTM C592, ASTM E84, and ASTM E136 standards.",
  },
  {
    category: "Technical",
    question: "What is the thermal conductivity of Rhino insulation?",
    answer: "All Rhino bonded products (RSL, RWM, RBR, RRA) achieve thermal conductivity of \u22640.037 W/m\u00B7K at 25\u00B0C. Loose Wool (RLW) achieves 0.037\u20130.040 W/m\u00B7K. These values meet and exceed ECBC 2023 requirements for all climate zones and assembly types in India.",
  },
  // Sustainability
  {
    category: "Sustainability",
    question: "How does Rhino achieve 65% less CO\u2082?",
    answer: "Conventional rock mineral wool is manufactured using cupola furnaces that burn coke and coal. Rhino uses India\u2019s first and largest electric arc furnace for insulation production \u2014 three 36 MVA furnaces powered by an 80 MW captive power plant. By eliminating fossil fuels from smelting entirely, Rhino Eco-Green achieves 65% lower CO\u2082, zero SO\u2082, and zero NO\u2093 emissions compared to conventional manufacturing.",
  },
  {
    category: "Sustainability",
    question: "What is an Environmental Product Declaration (EPD)?",
    answer: "An EPD is a standardized, third-party verified document that reports the environmental impact of a product across its lifecycle. For insulation, the manufacturing stage (A1\u2013A3) typically accounts for 80\u201390% of total impact. Rhino\u2019s EAF manufacturing process significantly reduces the A1\u2013A3 Global Warming Potential, making Rhino products competitive with or better than glass wool on embodied carbon while retaining all rock mineral wool performance advantages.",
  },
  {
    category: "Sustainability",
    question: "Does Rhino support IGBC and GRIHA certification?",
    answer: "Yes. Rhino products contribute to green building credits across multiple categories: Energy & Water (thermal performance), Indoor Environment Quality (acoustic absorption NRC up to 1.0), Materials (low embodied carbon, ISO 14001 manufacturing), and Innovation (zero fossil fuel manufacturing). Rhino Eco-Green\u2019s 65% carbon reduction directly supports IGBC Platinum and GRIHA 5-star targets.",
  },
  // ECBC
  {
    category: "ECBC & Compliance",
    question: "Does Rhino meet ECBC 2023 requirements?",
    answer: "Yes. With thermal conductivity of \u22640.037 W/m\u00B7K, Rhino products meet and exceed ECBC 2023 U-value requirements for all assembly types (roof, wall, floor) across all 5 climate zones (Hot-Dry, Warm-Humid, Composite, Temperate, Cold). Use our Thermal Calculator at /tools/thermal-calculator to calculate exact insulation thickness for your project.",
  },
  {
    category: "ECBC & Compliance",
    question: "What U-value can I achieve with Rhino insulation?",
    answer: "Achievable U-values depend on the assembly (substrate material, thickness) and insulation thickness. For example: a 200mm RCC wall with 75mm Rhino RSL Slabs achieves approximately 0.38 W/m\u00B2K, meeting ECBC requirements for most climate zones. Use our Thermal Calculator for precise calculations specific to your project assembly.",
  },
  {
    category: "ECBC & Compliance",
    question: "Is Rhino insulation safe to handle?",
    answer: "Yes. Rhino mineral wool fibers are classified IARC Group 3 \u2014 not classifiable as carcinogenic to humans. The products are asbestos-free, rot-free, and resistant to insects, mold, fungi, and vermin. Shot content is < 25%, sulphur < 0.2%, chloride < 20 ppm, pH 7\u201310. Standard PPE (gloves, dust mask) is recommended during installation as with any construction material.",
  },
  // Ordering
  {
    category: "Ordering & Dealers",
    question: "What is the minimum order quantity?",
    answer: "Minimum order quantities vary by product type and territory. Contact your regional sales manager or fill out the inquiry form on our Contact page for specific pricing and MOQ information. We serve both project-based orders and ongoing supply agreements.",
  },
  {
    category: "Ordering & Dealers",
    question: "How can I become a Rhino dealer?",
    answer: "Visit our Dealers page at /dealers and fill out the \u2018Become a Dealer\u2019 application form. Our regional team will review your application, discuss territory allocation and commercial terms, provide product training and marketing support, and help you launch. Rhino dealers benefit from territory protection, technical training, and direct access to our NaBL-accredited lab.",
  },
  {
    category: "Ordering & Dealers",
    question: "What is the lead time for orders?",
    answer: "Standard lead time is 2\u20134 weeks from order confirmation, depending on product type, quantity, and customization requirements (facings, dimensions). For urgent project requirements, contact your regional sales manager to discuss expedited fulfillment options.",
  },
  // Installation
  {
    category: "Installation",
    question: "Does Rhino provide installation support?",
    answer: "Rhino provides comprehensive technical assistance including specification support, thermal calculation services, on-site guidance for first installations, and training for contractor teams. Our NaBL-accredited laboratory can also perform custom testing for specific project requirements. Contact your regional sales manager for support.",
  },
  {
    category: "Installation",
    question: "What facings are available for Rhino products?",
    answer: "Available facings include: Aluminum Foil (up to 200\u00B0C, 95\u201397% reflectivity), Alu-Glass Composite (up to 500\u00B0C, high tensile), White Glass Tissue (up to 300\u00B0C), Black Glass Tissue (up to 250\u00B0C, aesthetic/acoustic), Kraft Paper (dry internal walls), Wire Mesh GI/SS (high-temp/vibration), and Reinforced Foil. Custom facings for marine and cleanroom applications are available on request.",
  },
];

/* ========================================================================== */
/*  EVENTS & AWARDS                                                            */
/* ========================================================================== */

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "expo" | "award" | "conference" | "launch";
  description: string;
  highlights: string[];
  color: string;
  images: string[];
}

export const events: Event[] = [
  {
    id: "igbc-launch-2025",
    title: "Rhino Launch at IGBC Green Building Congress 2025",
    date: "November 2025",
    location: "Jio World Convention Centre, Mumbai",
    type: "launch",
    description: "Rhino Rock Mineral Wool was unveiled at CII\u2019s 23rd Green Building Congress \u2014 Asia\u2019s largest congregation for green building products. Neeraj Sarda presented \u2018Sustainable Construction as a Pathway to Decarbonization\u2019 to an engaged audience of architects, engineers, and sustainability leaders.",
    highlights: [
      "Official product launch \u2014 India\u2019s first fossil-fuel-free rock mineral wool",
      "Neeraj Sarda keynote: \u2018Sustainable Construction as a Pathway to Decarbonization\u2019",
      "SMAL honored as IGBC founding member",
      "Three variants unveiled: Elite, Enduro, Eco-Green",
    ],
    color: "#2DB86E",
    images: [
      "/images/events/neeraj-igbc-keynote.jpg",
      "/images/events/igbc-event-2.jpg",
      "/images/events/igbc-2025-poster.jpg",
    ],
  },
  {
    id: "sandwich-panel-2025",
    title: "2nd Sandwich Panel Conference — Platinum Partner",
    date: "November 2025",
    location: "Mumbai, India",
    type: "conference",
    description:
      "Rhino participated as Platinum Partner at the 2nd Sandwich Panel Conference in Mumbai. Neeraj Sarda presented \u2018The Rock Solid Core in Sandwich Panel\u2019 to an audience of panel manufacturers, architects, and builders.",
    highlights: [
      "Platinum Partner alongside ArcelorMittal",
      "Neeraj Sarda presentation on RockArmor for sandwich panels",
      "Lamp lighting ceremony with industry leaders",
      "Product showcase featuring RockArmor lamella boards",
    ],
    color: "#FF6600",
    images: [
      "/images/events/sandwich-panel-conference.jpg",
      "/images/events/booth-team-photo.jpg",
      "/images/events/lamp-lighting-platinum-partner.jpg",
      "/images/events/neeraj-stage-platinum-partner.jpg",
    ],
  },
  {
    id: "dealer-meet-greet-2025",
    title: "Dealer Meet & Greet — Mumbai",
    date: "November 2025",
    location: "Mumbai, India",
    type: "conference",
    description:
      "Rhino hosted its first Dealer Meet & Greet in Mumbai, bringing together distribution partners, contractors, and industry professionals to introduce the Rhino product range and business opportunity.",
    highlights: [
      "First dealer engagement event for Rhino insulation",
      "Product training and technical presentation",
      "Partnership opportunities discussed with potential dealers",
    ],
    color: "#2DB86E",
    images: [
      "/images/events/dealer-presentation-1.jpg",
      "/images/events/meet-greet-mumbai-poster.jpg",
    ],
  },
  {
    id: "igbc-founding-member",
    title: "IGBC Founding Member Recognition",
    date: "December 2025",
    location: "IGBC Conference, India",
    type: "award",
    description: "Sarda Metals & Alloys Ltd. was honored at the IGBC Conference for being a founding member \u2014 celebrating a legacy that continues to shape India\u2019s green building movement.",
    highlights: [
      "Recognized for commitment to India\u2019s green building ecosystem",
      "Founding member status reaffirms Rhino\u2019s sustainability leadership",
    ],
    color: "#FF6600",
    images: [
      "/images/events/lamp-lighting-platinum-partner.jpg",
      "/images/events/neeraj-stage-platinum-partner.jpg",
    ],
  },
  {
    id: "chemtech-2026",
    title: "Chemtech World Expo 2026 \u2014 Gold Supporter",
    date: "February 2026",
    location: "Mumbai, India",
    type: "expo",
    description: "Rhino participated as Gold Supporter at the 52nd Chemtech World Expo, connecting with industry leaders, partners, and customers. Neeraj Sarda delivered a technical session at the Surface Engineering, Coatings & Corrosion Conference.",
    highlights: [
      "Gold Supporter \u2014 prominent booth presence",
      "Neeraj Sarda speaker at Surface Engineering & Corrosion Conference",
      "Engaged with partners: Marudhar Refractories, Shree Gayatri Insulation",
      "Strong audience participation and technical discussions",
    ],
    color: "#FF8800",
    images: [
      "/images/events/neeraj-chemtech-podium.jpg",
      "/images/events/chemtech-booth-team-1.jpg",
      "/images/events/chemtech-product-demo.jpg",
      "/images/events/chemtech-panel-wide.jpg",
    ],
  },
  {
    id: "jipm-tpm-2026",
    title: "JIPM TPM Excellence Award \u2014 Japan",
    date: "April 2026",
    location: "Japan",
    type: "award",
    description: "Sarda Metals & Alloys Ltd. received the prestigious JIPM TPM Excellence Award in Japan \u2014 a global recognition of Total Productive Maintenance, operational excellence, and continuous improvement in manufacturing.",
    highlights: [
      "Global recognition from Japan Institute of Plant Maintenance",
      "Validates world-class manufacturing processes at the Vizianagaram facility",
      "Reflects the operational culture behind Rhino\u2019s product quality",
    ],
    color: "#FF6600",
    images: [
      "/images/events/tpm-award-1.jpg",
      "/images/events/tpm-award-2.jpg",
      "/images/events/tpm-award-3.jpg",
    ],
  },
];

export const pressLinks = [
  { title: "Rhino by Sarda Group Sets a New Benchmark in Green Insulation", source: "ACE Update Magazine", url: "https://aceupdate.com/rhino-by-sarda-group-sets-a-new-benchmark-in-green-insulation/" },
  { title: "Rhino Rock Solid Insulation Sets New Paradigm for Sustainability", source: "Thermal Control Magazine", url: "https://www.thermalcontrolmagazine.com/insulation/rhino-rock-solid-insulation-sets-new-paradigm-for-sustainability-and-innovation/" },
  { title: "Rhino Launches as India\u2019s Greenest Rock Mineral Wool at IGBC 2025", source: "B2B Purchase", url: "https://b2bpurchase.com/rhino-launches-as-indias-greenest-rock-mineral-wool-insulation-at-igbc-2025/" },
  { title: "Sarda Metals Unveils Eco-Friendly Insulation Solution", source: "News on Projects", url: "https://www.newsonprojects.com/news/sarda-metals-alloys-unveils-eco-friendly-insulation-solution" },
  { title: "Sarda Group Launches India\u2019s First Fossil Fuel-Free Insulation", source: "UNI India", url: "https://www.uniindia.com/sarda-group-launches-india-s-first-fossil-fuel-free-insulation-product/west/news/3656136.html" },
];
