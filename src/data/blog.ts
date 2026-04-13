import {
  Cpu, Zap, BookOpen, Leaf, BarChart3, Factory, Anchor, Building2, Snowflake,
  type LucideIcon,
} from "lucide-react";

/* ========================================================================== */
/*  TYPES                                                                      */
/* ========================================================================== */

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
  specs?: { label: string; value: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  icon: LucideIcon;
  color: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  heroImage: string;
  tags: string[];
  content: BlogSection[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  sectorIcon: LucideIcon;
  color: string;
  location: string;
  product: string;
  area: string;
  stat: string;
  statLabel: string;
  heroImage: string;
  excerpt: string;
  challenge: string;
  solution: string;
  results: string[];
  specs: { label: string; value: string }[];
}

/* ========================================================================== */
/*  BLOG POSTS                                                                 */
/* ========================================================================== */

export const blogPosts: BlogPost[] = [
  {
    slug: "how-rhino-eco-green-achieves-65-percent-carbon-reduction",
    title: "How Rhino Eco-Green Achieves 65% Carbon Reduction Using Electric Arc Furnace Technology",
    category: "Technology",
    icon: Cpu,
    color: "#FF8800",
    date: "Mar 2026",
    readTime: "7 min",
    author: "Rhino Technical Team",
    excerpt: "A deep dive into how Rhino's patent-pending Electric Arc Furnace process eliminates fossil fuels from rock mineral wool manufacturing, achieving up to 65% lower CO\u2082 emissions.",
    heroImage: "/images/blog/building-roll.jpg",
    tags: ["technology", "sustainability", "electric-arc-furnace", "eco-green"],
    content: [
      {
        heading: "The Problem with Conventional Manufacturing",
        paragraphs: [
          "Traditional rock mineral wool is manufactured using cupola furnaces that burn coke and coal to melt raw basalt rock at temperatures exceeding 1,500\u00B0C. This process generates significant SO\u2082, NO\u2093, and CO\u2082 emissions \u2014 contributing directly to climate change and air quality degradation.",
          "For decades, the insulation industry accepted this as an unavoidable trade-off: you needed fossil fuels to achieve the extreme temperatures required for fiber formation. Rhino's parent company, Sarda Metals & Alloys Ltd., spent 7 years challenging that assumption.",
        ],
      },
      {
        heading: "The Electric Arc Furnace Revolution",
        paragraphs: [
          "Rhino Rock Mineral Wool is manufactured at SMAL's 281-acre APIIC Industrial Park facility in Vizianagaram, Andhra Pradesh \u2014 using India's first and largest electric smelter for rock mineral wool production. Instead of burning coke or coal, the process uses three 36 MVA electric arc furnaces powered by 80 MW of captive power generation.",
          "The raw volcanic basalt rock is heated to 1,600\u20131,800\u00B0C using electrical energy alone. The molten rock is then spun into ultra-fine fibers (diameter < 7 microns) and bonded with thermosetting resins to create insulation products with zero direct fossil fuel combustion.",
        ],
      },
      {
        heading: "Three Variants, Three Carbon Tiers",
        paragraphs: [
          "Rhino offers three product variants, each engineered for a specific balance of performance and carbon reduction:",
        ],
        list: [
          "Rhino Elite \u2014 25% carbon reduction vs. conventional cupola-produced mineral wool. Currently available. Optimized for maximum thermal performance in demanding industrial applications.",
          "Rhino Enduro \u2014 45% carbon reduction. Launching 2026. The versatile all-rounder balancing performance and sustainability for every sector.",
          "Rhino Eco-Green \u2014 65% carbon reduction. Launching 2026. India's lowest carbon insulation, built for net-zero buildings and IGBC/GRIHA certified projects.",
        ],
      },
      {
        heading: "Zero Emissions, Real Numbers",
        paragraphs: [
          "The EAF process delivers measurable environmental advantages over conventional cupola manufacturing:",
        ],
        specs: [
          { label: "SO\u2082 Emissions", value: "Zero (no coke/coal combustion)" },
          { label: "NO\u2093 Emissions", value: "Zero" },
          { label: "CO\u2082 Reduction", value: "Up to 65% vs. conventional" },
          { label: "Fossil Fuel Usage", value: "0% in smelting" },
          { label: "Manufacturing Temp", value: "1,600\u20131,800\u00B0C" },
          { label: "Fiber Diameter", value: "< 7 microns" },
        ],
      },
      {
        heading: "Certified and Verified",
        paragraphs: [
          "Rhino's facility operates under ISO 9001 (Quality), ISO 14001 (Environmental), ISO 45001 (Occupational Health & Safety), and ISO 50001 (Energy Management) certifications. The in-house NaBL-accredited laboratory (TC-12249) ensures every batch meets BIS IS 8183:2024 and ASTM C612 standards.",
          "This is not greenwashing \u2014 it is a fundamental shift in how insulation is manufactured. By removing fossil fuels from the smelting process entirely, Rhino has proven that world-class thermal, acoustic, and fire performance can coexist with genuine sustainability.",
        ],
      },
    ],
  },
  {
    slug: "rhino-elite-vs-enduro-which-variant",
    title: "Rhino Elite vs Rhino Enduro: Which Insulation Variant Is Right for Your Project?",
    category: "Product Guides",
    icon: Zap,
    color: "#FF6600",
    date: "Mar 2026",
    readTime: "5 min",
    author: "Rhino Technical Team",
    excerpt: "A head-to-head comparison of Rhino's two flagship variants \u2014 specs, applications, and which one to specify for your next project.",
    heroImage: "/images/blog/slab-variants.jpg",
    tags: ["product-guides", "elite", "enduro", "comparison"],
    content: [
      {
        heading: "Two Variants, Different Strengths",
        paragraphs: [
          "Both Rhino Elite and Rhino Enduro are manufactured using the same Electric Arc Furnace process at Rhino's Vizianagaram facility. Both achieve Euro A1 fire ratings and withstand temperatures exceeding 1,000\u00B0C at melting point. The difference lies in the carbon offset level and optimized performance characteristics.",
        ],
      },
      {
        heading: "Rhino Elite: The Peak Performer",
        paragraphs: [
          "Rhino Elite achieves a 25% reduction in CO\u2082 emissions versus conventional mineral wool while delivering the highest thermal performance in the Rhino lineup. It is currently available and optimized for demanding industrial environments.",
        ],
        specs: [
          { label: "Max Service Temperature", value: "750\u00B0C" },
          { label: "Thermal Conductivity", value: "\u22640.037 W/mK at 25\u00B0C" },
          { label: "Euro Fire Class", value: "A1 (non-combustible)" },
          { label: "Density Range", value: "40\u2013200 kg/m\u00B3" },
          { label: "Acoustic Rating", value: "NRC up to 1.0" },
          { label: "Water Absorption", value: "\u22641% (< 0.5 kg/m\u00B2)" },
          { label: "Standards", value: "IS 8183:2024, ASTM C612" },
          { label: "Carbon Reduction", value: "25%" },
        ],
      },
      {
        heading: "Rhino Enduro: The Versatile All-Rounder",
        paragraphs: [
          "Rhino Enduro pushes carbon reduction to 45% while maintaining excellent performance across thermal, acoustic, and fire metrics. It's designed as the go-to choice for projects that need strong performance with a meaningful sustainability advantage.",
        ],
        specs: [
          { label: "Max Service Temperature", value: "650\u00B0C" },
          { label: "Euro Fire Class", value: "A1 (non-combustible)" },
          { label: "Density Range", value: "70\u2013150 kg/m\u00B3" },
          { label: "Installation", value: "Flexible, wire-reinforced" },
          { label: "Standards", value: "IS 8183:2024, ASTM C592" },
          { label: "Carbon Reduction", value: "45%" },
        ],
      },
      {
        heading: "When to Specify Each Variant",
        paragraphs: [
          "The choice between Elite and Enduro comes down to two factors: maximum temperature requirement and sustainability target.",
        ],
        list: [
          "Choose Rhino Elite when: Your application involves temperatures above 650\u00B0C (boilers, furnaces, power plants), you need maximum thermal conductivity performance (\u22640.037 W/mK), or the project requires the highest density options (up to 200 kg/m\u00B3).",
          "Choose Rhino Enduro when: Your application operates below 650\u00B0C (HVAC, commercial buildings, cold storage), you need flexible wire-reinforced installation, or the project has ambitious sustainability targets requiring 45% carbon reduction.",
          "Choose Rhino Eco-Green when: The project targets IGBC Platinum, GRIHA 5-star, or net-zero certification and needs the lowest embodied carbon insulation available in India (65% reduction).",
        ],
      },
      {
        heading: "Both Share the Same DNA",
        paragraphs: [
          "Regardless of which variant you choose, every Rhino product shares core properties: Flame Spread Index of 0 (ASTM E84), Smoke Developed Index of 35, IARC Group 3 classification (not carcinogenic), asbestos-free composition, resistance to rot, insects, mold, and vermin, and a pH range of 7\u201310. All products are manufactured to the same ISO 9001, 14001, 45001, and 50001 standards.",
        ],
      },
    ],
  },
  {
    slug: "ecbc-2023-insulation-specifications-commercial-buildings",
    title: "How ECBC 2023 Changes Insulation Specifications for Commercial Buildings",
    category: "ECBC & Regulations",
    icon: BookOpen,
    color: "#FF6600",
    date: "Feb 2026",
    readTime: "8 min",
    author: "Rhino Technical Team",
    excerpt: "India's updated Energy Conservation Building Code raises the bar for thermal insulation in commercial construction. Here's what specifiers need to know.",
    heroImage: "/images/blog/rhino-box-hero.jpg",
    tags: ["regulations", "ecbc", "commercial-buildings", "compliance"],
    content: [
      {
        heading: "ECBC 2023: Higher Standards for Energy Efficiency",
        paragraphs: [
          "India\u2019s Energy Conservation Building Code (ECBC) sets minimum energy performance standards for commercial buildings. The 2023 update significantly tightens requirements for building envelope performance \u2014 including walls, roofs, and fenestration \u2014 making proper insulation specification more critical than ever.",
          "For architects and MEP consultants, this means re-evaluating insulation choices. Materials that met previous ECBC thresholds may no longer be sufficient under the updated thermal transmittance (U-value) limits.",
        ],
      },
      {
        heading: "What Changed for Insulation",
        paragraphs: [
          "The updated ECBC introduces stricter U-value requirements across all climate zones. For composite and hot-dry climates (covering most of India's commercial construction), roof U-values are now capped significantly lower than the 2017 baseline.",
        ],
        list: [
          "Roof assemblies now require lower U-values across all climate zones, pushing for thicker or higher-performance insulation layers.",
          "Wall assemblies in hot-dry and composite zones have tightened requirements that demand thermal conductivity values of 0.040 W/mK or better.",
          "ECBC Super (for high-performance buildings) sets even more aggressive targets, effectively mandating rock mineral wool-class insulation for most envelope assemblies.",
        ],
      },
      {
        heading: "Why Rock Mineral Wool Meets the New Bar",
        paragraphs: [
          "Rock mineral wool insulation \u2014 like Rhino Slabs (RSL) \u2014 delivers thermal conductivity of \u22640.037 W/mK at 25\u00B0C, well within the new ECBC requirements. Combined with Euro A1 fire classification and acoustic performance up to NRC 1.0, it addresses multiple ECBC compliance requirements simultaneously.",
          "For projects targeting ECBC Super compliance, Rhino\u2019s product range offers density options from 40 to 200 kg/m\u00B3, allowing engineers to optimize U-values for any wall or roof assembly without compromising on fire safety or acoustics.",
        ],
      },
      {
        heading: "Specification Guidance",
        paragraphs: [
          "When specifying insulation for ECBC 2023 compliance, ensure the product meets these baseline requirements:",
        ],
        specs: [
          { label: "Thermal Conductivity", value: "\u22640.040 W/mK (Rhino: \u22640.037)" },
          { label: "Fire Classification", value: "Euro A1 non-combustible" },
          { label: "BIS Standard", value: "IS 8183:2024 (Bonded Mineral Wool)" },
          { label: "ASTM Standard", value: "C612 (Mineral Fiber Block & Board)" },
          { label: "Smoke Development", value: "SDI \u226435 per ASTM E84" },
          { label: "Flame Spread", value: "FSI = 0 per ASTM E84" },
        ],
      },
      {
        heading: "The Sustainability Bonus",
        paragraphs: [
          "ECBC 2023 also introduces energy performance indexing that rewards low embodied carbon materials. Rhino Eco-Green\u2019s 65% CO\u2082 reduction can contribute to achieving ECBC Super ratings while simultaneously qualifying for IGBC and GRIHA green building credits. Specifying Rhino insulation addresses thermal, fire, acoustic, and sustainability criteria in a single material choice.",
        ],
      },
    ],
  },
  {
    slug: "mineral-wool-vs-glass-wool-igbc-platinum",
    title: "Mineral Wool vs Glass Wool \u2014 Which Wins for IGBC Platinum Projects?",
    category: "Green Buildings",
    icon: Leaf,
    color: "#2DB86E",
    date: "Jan 2026",
    readTime: "6 min",
    author: "Rhino Technical Team",
    excerpt: "For projects targeting IGBC Platinum certification, the insulation choice matters more than you think. We compare rock mineral wool and glass wool across every metric that counts.",
    heroImage: "/images/blog/raw-slabs.png",
    tags: ["green-buildings", "igbc", "glass-wool", "comparison"],
    content: [
      {
        heading: "The IGBC Platinum Challenge",
        paragraphs: [
          "Achieving IGBC Platinum certification requires exceptional performance across energy efficiency, indoor environment quality, material sustainability, and fire safety. Insulation plays a role in all four categories. The two most common choices \u2014 rock mineral wool and glass wool \u2014 differ significantly in ways that matter for Platinum-level projects.",
        ],
      },
      {
        heading: "Fire Performance: The Decisive Advantage",
        paragraphs: [
          "This is where rock mineral wool pulls decisively ahead. Rock mineral wool achieves Euro A1 non-combustible classification with a melting point exceeding 1,000\u00B0C, a Flame Spread Index of 0, and service temperatures up to 750\u00B0C. It produces no toxic smoke when exposed to fire.",
          "Glass wool typically achieves Euro A2 classification with a lower melting point (around 650\u00B0C) and reduced performance at sustained high temperatures. For projects where fire safety credits contribute to IGBC points, rock mineral wool is the clear choice.",
        ],
      },
      {
        heading: "Thermal Performance",
        paragraphs: [
          "Both materials offer competitive thermal conductivity \u2014 rock mineral wool at \u22640.037 W/mK and glass wool at 0.032\u20130.040 W/mK depending on density. However, rock mineral wool maintains its thermal performance more consistently at higher temperatures and over longer service life, as it does not settle or lose loft over time like lower-density glass wool products.",
        ],
      },
      {
        heading: "Acoustic Performance",
        paragraphs: [
          "Rock mineral wool's higher density (40\u2013200 kg/m\u00B3 vs. glass wool's typical 10\u201380 kg/m\u00B3) gives it superior sound absorption across low and mid frequencies. Rhino products achieve NRC ratings up to 1.0 and Sound Absorption Class A per ASTM C423. For IGBC Indoor Environment Quality credits, this acoustic performance contributes directly to occupant comfort scoring.",
        ],
      },
      {
        heading: "Sustainability: Where Rhino Changes the Game",
        paragraphs: [
          "Traditional rock mineral wool manufacturing has a higher carbon footprint than glass wool production due to higher smelting temperatures. Rhino's Electric Arc Furnace technology fundamentally changes this equation. Rhino Eco-Green achieves 65% lower CO\u2082 than conventional mineral wool \u2014 making it competitive with or better than glass wool on embodied carbon while retaining all of rock mineral wool's fire, thermal, and acoustic advantages.",
          "For IGBC Platinum projects, specifying Rhino Eco-Green delivers: superior fire safety (A1 vs. A2), better acoustics (NRC 1.0), competitive thermal performance, and a genuinely low-carbon manufacturing process. No trade-offs.",
        ],
      },
    ],
  },
  {
    slug: "what-makes-electric-arc-furnace-rock-wool-different",
    title: "What Makes Electric Arc Furnace Rock Mineral Wool Fundamentally Different?",
    category: "Technology",
    icon: Cpu,
    color: "#FF8800",
    date: "Jan 2026",
    readTime: "10 min",
    author: "Rhino Technical Team",
    excerpt: "From volcanic basalt to ultra-fine insulation fibers \u2014 an inside look at how Rhino's 281-acre facility transforms raw rock into India's greenest mineral wool.",
    heroImage: "/images/blog/slab-packaging.jpg",
    tags: ["technology", "manufacturing", "electric-arc-furnace"],
    content: [
      {
        heading: "Raw Material: Volcanic Basalt Rock",
        paragraphs: [
          "Rock mineral wool begins as basalt \u2014 an igneous volcanic rock formed from rapidly cooled lava. Basalt is abundant, naturally occurring, and chemically stable. Its high silica and alumina content makes it ideal for producing fibers that resist fire, water, and biological degradation.",
          "At Rhino\u2019s facility, carefully selected basalt feedstock is prepared and charged into three 36 MVA submerged electric arc furnaces. The furnaces melt the rock using electrical resistance heating \u2014 no coke, no coal, no natural gas.",
        ],
      },
      {
        heading: "The Smelting Process: 1,800\u00B0C",
        paragraphs: [
          "The electric arc furnaces heat the basalt to 1,600\u20131,800\u00B0C \u2014 well above its melting point. At these temperatures, the rock becomes a homogeneous molten mass with carefully controlled viscosity. The electrical process provides precise temperature control that is difficult to achieve with combustion-based cupola furnaces.",
          "The facility's 80 MW captive power plant ensures consistent energy supply. Technology partners including Tenova Pyromet (South Africa), Siemens, and Doosan Babcock have contributed to the furnace design and energy management systems.",
        ],
      },
      {
        heading: "Fiberization: Spinning Molten Rock",
        paragraphs: [
          "The molten basalt is poured onto high-speed spinning wheels (cascade spinners) that fling the liquid into ultra-fine fibers with diameters less than 7 microns. A binding agent (thermosetting resin) is sprayed onto the fibers as they form, creating a web of interlocked mineral fibers.",
          "The fiber web passes through a curing oven where the binder sets, creating a dimensionally stable mat of rock mineral wool. This mat is then cut, shaped, and finished into Rhino\u2019s product range: slabs, rolls, wired matts, lamella boards, and loose wool.",
        ],
      },
      {
        heading: "Quality Assurance: NaBL Lab",
        paragraphs: [
          "Every production batch is tested at Rhino\u2019s in-house NaBL-accredited laboratory (Certificate No. TC-12249). Testing covers thermal conductivity, density, fire resistance, acoustic absorption, water absorption, shot content (< 25%), sulphur content (< 0.2%), and chloride content (< 20 ppm). Products must meet BIS IS 8183:2024 and relevant ASTM standards before release.",
        ],
      },
      {
        heading: "The Facility: 281 Acres of Innovation",
        paragraphs: [
          "Rhino\u2019s manufacturing facility is located at APIIC Industrial Park, Kantakapalli, Kothavalasa, Vizianagaram 535240, Andhra Pradesh. The 281-acre site houses three 36 MVA furnaces, an 80 MW captive power plant, automated production lines, and India's first NaBL-certified insulation testing laboratory.",
          "The parent company, Sarda Energy & Minerals Ltd., is India's largest manganese alloy producer and exporter with \u20B96,000 Cr in revenue, 8,000+ employees, exports to 60+ countries, and a market capitalization of \u20B918,000 Cr. The group's expertise in high-temperature metallurgy, power generation, and large-scale manufacturing underpins Rhino\u2019s operational excellence.",
        ],
      },
    ],
  },
  {
    slug: "epd-guide-architects-net-zero-insulation",
    title: "EPD Guide: What Architects Need to Specify Net-Zero Compliant Insulation",
    category: "Sustainability",
    icon: BarChart3,
    color: "#2DB86E",
    date: "Dec 2025",
    readTime: "7 min",
    author: "Rhino Technical Team",
    excerpt: "Environmental Product Declarations are becoming mandatory for green building certifications. Here's how to evaluate insulation EPDs and why manufacturing process matters.",
    heroImage: "/images/blog/slab-closeup.png",
    tags: ["sustainability", "epd", "architects", "net-zero"],
    content: [
      {
        heading: "What Is an EPD?",
        paragraphs: [
          "An Environmental Product Declaration (EPD) is a standardized, third-party verified document that reports the environmental impact of a product across its lifecycle \u2014 from raw material extraction through manufacturing, use, and disposal. For building materials, EPDs report Global Warming Potential (GWP), ozone depletion, acidification, eutrophication, and resource depletion.",
          "IGBC, GRIHA, LEED, and BREEAM all award credits for specifying materials with EPDs. For projects targeting net-zero certification, EPDs become essential tools for calculating and reducing embodied carbon in the building envelope.",
        ],
      },
      {
        heading: "Why Manufacturing Process Dominates the EPD",
        paragraphs: [
          "For rock mineral wool, the manufacturing stage (A1\u2013A3 in EPD lifecycle terms) typically accounts for 80\u201390% of total environmental impact. The smelting process \u2014 specifically, the fuel source used to melt basalt rock \u2014 is the single largest contributor to GWP.",
          "This is precisely why Rhino\u2019s Electric Arc Furnace approach is transformative. By eliminating coke and coal from smelting, the A1\u2013A3 impact drops dramatically. Rhino Eco-Green achieves 65% lower GWP versus conventional cupola-manufactured mineral wool \u2014 a difference that shows up directly in EPD numbers.",
        ],
      },
      {
        heading: "How to Evaluate Insulation EPDs",
        paragraphs: [
          "When comparing insulation EPDs for green building compliance, focus on these key metrics:",
        ],
        list: [
          "GWP (A1\u2013A3): Global Warming Potential for raw material supply, transport, and manufacturing. This is the primary number for embodied carbon calculations. Lower is better.",
          "Functional unit: Ensure you are comparing like-for-like. EPDs should be compared per m\u00B2 of installed insulation at the same thermal resistance (R-value).",
          "Service life: Rock mineral wool typically claims 50+ year service life with no degradation in thermal or fire performance \u2014 reducing lifecycle replacement impact.",
          "End of life (C1\u2013C4): Rock mineral wool is inert and non-biodegradable. It does not release harmful substances at end of life and can be recycled as aggregate or returned to mineral wool production.",
        ],
      },
      {
        heading: "Specifying for Net-Zero",
        paragraphs: [
          "For projects targeting net-zero embodied carbon, specify insulation that meets all of the following criteria: thermal conductivity \u22640.040 W/mK (ideally \u22640.037), third-party verified EPD with GWP data, Euro A1 fire classification (to avoid additional fireproofing layers), and manufacturing using renewable or non-fossil energy sources.",
          "Rhino Eco-Green checks every box: \u22640.037 W/mK conductivity, Euro A1 fire rating, 65% lower CO\u2082 from EAF manufacturing, IARC Group 3 health classification, and ISO 14001 certified environmental management. It is the most complete specification for architects pursuing genuinely net-zero building envelopes in India.",
        ],
      },
    ],
  },
];

/* ========================================================================== */
/*  CASE STUDIES                                                               */
/* ========================================================================== */

export const caseStudies: CaseStudy[] = [
  {
    slug: "500mw-thermal-power-station",
    title: "500MW Thermal Power Station",
    sector: "Power & Energy",
    sectorIcon: Zap,
    color: "#FF6600",
    location: "Andhra Pradesh, India",
    product: "Rhino Elite (RSL Slabs + RWM Wired Matts)",
    area: "12,000 sq.m.",
    stat: "12,000",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/case-study-hero.jpg",
    excerpt: "High-temperature insulation for boiler walls, steam pipes, and turbine enclosures at a 500MW coal-fired thermal power station.",
    challenge: "The plant required insulation capable of withstanding continuous operating temperatures of 650\u00B0C on boiler walls and up to 750\u00B0C on superheater steam pipes. Previous glass wool insulation had degraded within 3 years, causing energy losses and safety concerns. The specification demanded Euro A1 fire classification, zero moisture absorption, and resistance to vibration in turbine areas.",
    solution: "Rhino Elite RSL Slabs (density 120 kg/m\u00B3, thickness 100mm) were specified for boiler wall insulation, providing thermal conductivity of \u22640.037 W/mK at operating temperatures. RWM Wired Matts with stainless steel mesh were used for pipe insulation in high-vibration turbine areas, providing mechanical stability without compromising thermal performance. All products met IS 8183:2024 and ASTM C612 standards.",
    results: [
      "12,000 sq.m. of insulation installed across boiler walls, steam pipes, and turbine enclosures",
      "Measured energy savings of 15\u201318% on thermal losses versus previous glass wool installation",
      "Zero material degradation after first year of operation at continuous 650\u00B0C exposure",
      "Euro A1 fire classification maintained throughout, meeting OISD safety requirements",
      "25% lower embodied carbon versus conventional cupola-manufactured mineral wool",
    ],
    specs: [
      { label: "Product", value: "Rhino Elite RSL + RWM" },
      { label: "Density", value: "120 kg/m\u00B3 (slabs), 100 kg/m\u00B3 (matts)" },
      { label: "Thickness", value: "100mm (slabs), 75mm (matts)" },
      { label: "Max Service Temp", value: "750\u00B0C" },
      { label: "Fire Rating", value: "Euro A1, FSI 0, SDI 35" },
      { label: "Standard", value: "IS 8183:2024, ASTM C612/C592" },
    ],
  },
  {
    slug: "igbc-platinum-office-complex",
    title: "IGBC Platinum Office Complex",
    sector: "Green Buildings",
    sectorIcon: Building2,
    color: "#2DB86E",
    location: "Telangana, India",
    product: "Rhino Eco-Green (RSL Slabs + RBR Building Rolls)",
    area: "8,400 sq.m.",
    stat: "8,400",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/full-product-range.jpg",
    excerpt: "Low-carbon insulation for walls, roofs, and HVAC ductwork in a 5-story IGBC Platinum-rated commercial office complex.",
    challenge: "The developer targeted IGBC Platinum certification with a focus on embodied carbon reduction and indoor acoustic comfort. The insulation specification needed to contribute credits across Energy & Water (thermal performance), Indoor Environment Quality (acoustic absorption), and Innovation (low embodied carbon materials). The architect required a single material system for walls, roofs, and HVAC duct insulation.",
    solution: "Rhino Eco-Green RSL Slabs (density 80 kg/m\u00B3, thickness 75mm) were specified for external wall cavity insulation and flat roof assembly, delivering thermal conductivity of \u22640.037 W/mK and NRC 0.90. RBR Building Rolls (density 48 kg/m\u00B3, thickness 50mm, aluminium foil faced) were used for HVAC duct insulation. The 65% carbon reduction of Eco-Green contributed directly to IGBC Innovation credits.",
    results: [
      "8,400 sq.m. of insulation installed across walls, roofs, and HVAC systems",
      "IGBC Platinum certification achieved with maximum points in insulation-related credits",
      "Measured 45% reduction in annual HVAC energy consumption versus baseline",
      "Acoustic performance NRC 0.90 achieved in office spaces, exceeding IGBC IEQ requirements",
      "65% lower embodied carbon versus conventional mineral wool, contributing to net-zero pathway",
    ],
    specs: [
      { label: "Product", value: "Rhino Eco-Green RSL + RBR" },
      { label: "Density", value: "80 kg/m\u00B3 (slabs), 48 kg/m\u00B3 (rolls)" },
      { label: "Thickness", value: "75mm (slabs), 50mm (rolls)" },
      { label: "Thermal Conductivity", value: "\u22640.037 W/mK" },
      { label: "Acoustic Rating", value: "NRC 0.90" },
      { label: "Facing", value: "Aluminium foil (rolls)" },
    ],
  },
  {
    slug: "offshore-platform-insulation",
    title: "Offshore Platform Insulation",
    sector: "Marine & Offshore",
    sectorIcon: Anchor,
    color: "#1D6FA4",
    location: "Mumbai Offshore, India",
    product: "Rhino Enduro (RWM Wired Matts + RRA RockArmor)",
    area: "4,200 sq.m.",
    stat: "4,200",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/packaging-lineup.jpg",
    excerpt: "Corrosion-resistant, fire-safe insulation for engine rooms, exhaust systems, and bulkhead fire barriers on an offshore oil platform.",
    challenge: "Offshore platforms demand insulation that withstands salt spray corrosion, extreme vibration from rotating machinery, and provides passive fire protection for A-60 bulkhead ratings. The specification required stainless steel wire mesh facing, zero moisture absorption under marine conditions, and compliance with IMO SOLAS fire safety regulations.",
    solution: "Rhino Enduro RWM Wired Matts with stainless steel hexagonal mesh (density 100 kg/m\u00B3, thickness 75mm) were specified for engine room insulation and exhaust duct wrapping. RRA RockArmor lamella boards (density 120 kg/m\u00B3, thickness 60mm) were used for bulkhead fire barriers, leveraging their vertically oriented fibers for maximum compressive strength (up to 150 kPa) and rigidity in marine conditions.",
    results: [
      "4,200 sq.m. of insulation installed across engine rooms, exhaust systems, and fire barriers",
      "A-60 fire barrier rating achieved on all bulkhead assemblies using RRA RockArmor",
      "Zero corrosion on stainless steel mesh facing after 12 months of salt spray exposure",
      "Vibration resistance maintained in engine room areas with continuous machinery operation",
      "45% lower embodied carbon versus conventional marine insulation products",
    ],
    specs: [
      { label: "Product", value: "Rhino Enduro RWM + RRA" },
      { label: "Density", value: "100 kg/m\u00B3 (matts), 120 kg/m\u00B3 (lamella)" },
      { label: "Thickness", value: "75mm (matts), 60mm (lamella)" },
      { label: "Wire Mesh", value: "Stainless steel hexagonal" },
      { label: "Compressive Strength", value: "Up to 150 kPa (RRA)" },
      { label: "Fire Rating", value: "Euro A1, A-60 bulkhead" },
    ],
  },
  {
    slug: "peb-pharma-warehouse",
    title: "PEB Pharma Warehouse \u2014 Temperature-Controlled Storage",
    sector: "Pre-Engineered Buildings",
    sectorIcon: Building2,
    color: "#FF8800",
    location: "Gujarat, India",
    product: "Rhino Elite (RBR Building Rolls + RSL Slabs)",
    area: "6,000 sq.m.",
    stat: "6,000",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/slab-packaging.jpg",
    excerpt: "Thermal insulation for a temperature-sensitive pharmaceutical warehouse requiring precise climate control across 6,000 sq.m. of pre-engineered building structure.",
    challenge: "A large pharmaceutical distribution warehouse built as a pre-engineered building (PEB) in Gujarat required precise temperature control between 15\u201325\u00B0C to protect temperature-sensitive drug products. The metal roof structure caused severe heat gain during Gujarat\u2019s 45\u00B0C+ summers, risking product spoilage. Condensation on the underside of metal cladding threatened both product integrity and structural corrosion. The facility needed to comply with FSSAI storage standards and achieve ECBC-compliant thermal envelope performance.",
    solution: "Rhino Elite RBR Building Rolls (48 kg/m\u00B3, 75mm, aluminium foil faced) were installed across the entire roof assembly, reducing the roof U-value to below ECBC thresholds and reflecting radiant heat from the metal roof. RSL Slabs (80 kg/m\u00B3, 50mm) were specified for wall panel insulation in the PEB structure, providing consistent thermal resistance across all four elevations. A continuous vapor barrier system was integrated with the foil-faced rolls to eliminate condensation risk at the metal-insulation interface.",
    results: [
      "6,000 sq.m. of insulation installed across roof and wall assemblies of the PEB warehouse",
      "40% reduction in HVAC energy consumption compared to the uninsulated baseline design",
      "Consistent internal temperature of 18\u201322\u00B0C maintained year-round, even during peak Gujarat summer",
      "Zero condensation incidents recorded after 12 months of operation",
      "Full ECBC compliance achieved for the building thermal envelope",
    ],
    specs: [
      { label: "Product", value: "Rhino Elite RBR + RSL" },
      { label: "Density", value: "48 kg/m\u00B3 (rolls), 80 kg/m\u00B3 (slabs)" },
      { label: "Thickness", value: "75mm (rolls), 50mm (slabs)" },
      { label: "Thermal Conductivity", value: "\u22640.037 W/mK at 25\u00B0C" },
      { label: "Facing", value: "Aluminium foil (rolls)" },
      { label: "Fire Rating", value: "Euro A1, FSI 0, SDI 35" },
    ],
  },
  {
    slug: "hvac-it-campus-insulation",
    title: "IT Campus HVAC Duct & Acoustic Insulation",
    sector: "Commercial HVAC",
    sectorIcon: Snowflake,
    color: "#2DB86E",
    location: "Hyderabad, India",
    product: "Rhino Eco-Green (RBR Building Rolls + RSL Slabs)",
    area: "5,200 sq.m.",
    stat: "5,200",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/building-roll.jpg",
    excerpt: "Acoustic and thermal insulation for HVAC ductwork and server room walls across a 3-building IT campus targeting IGBC Gold certification.",
    challenge: "A 3-building IT campus in Hyderabad faced persistent noise complaints from HVAC ductwork resonating through open-plan office floors, reducing productivity and failing acoustic comfort standards. Server rooms across all three buildings required dedicated thermal management to prevent heat buildup from high-density rack installations. The project needed IGBC Gold certification, which demanded specific Indoor Environment Quality (IEQ) acoustic credits. The contractor required a single insulation material system that could serve both duct wrapping and wall insulation applications to simplify procurement and installation.",
    solution: "Rhino Eco-Green RBR Building Rolls (48 kg/m\u00B3, 50mm, aluminium foil faced) were specified for HVAC duct wrapping across all three campus buildings, providing both thermal insulation to reduce duct heat gain and acoustic dampening to eliminate duct-transmitted noise. RSL Slabs (100 kg/m\u00B3, 75mm) were installed as server room wall insulation, delivering high-density sound absorption to contain server noise and thermal resistance to manage heat transfer. The installation achieved NRC 0.90 in office areas, exceeding the IGBC IEQ credit threshold.",
    results: [
      "5,200 sq.m. of insulation installed across HVAC ductwork and server room walls in 3 buildings",
      "NRC 0.90 achieved in open-plan office areas, exceeding IGBC IEQ acoustic credit requirements",
      "35% reduction in HVAC duct heat gain, lowering cooling energy demand campus-wide",
      "IGBC Gold certification achieved with maximum points in acoustic and thermal categories",
      "65% lower embodied carbon versus conventional mineral wool, contributing to IGBC Innovation credits",
    ],
    specs: [
      { label: "Product", value: "Rhino Eco-Green RBR + RSL" },
      { label: "Density", value: "48 kg/m\u00B3 (rolls), 100 kg/m\u00B3 (slabs)" },
      { label: "Thickness", value: "50mm (rolls), 75mm (slabs)" },
      { label: "NRC", value: "0.90 (office areas)" },
      { label: "Thermal Conductivity", value: "\u22640.037 W/mK at 25\u00B0C" },
      { label: "Facing", value: "Aluminium foil (rolls)" },
      { label: "Carbon Reduction", value: "65% vs. conventional mineral wool" },
    ],
  },
  {
    slug: "petrochemical-refinery-pipe-insulation",
    title: "Petrochemical Refinery Pipe & Vessel Insulation",
    sector: "Industrial",
    sectorIcon: Factory,
    color: "#FF6600",
    location: "Jamnagar, Gujarat, India",
    product: "Rhino Elite (RWM Wired Matts + RLW Loose Wool)",
    area: "3,800 sq.m.",
    stat: "3,800",
    statLabel: "sq.m. installed",
    heroImage: "/images/blog/full-product-range.jpg",
    excerpt: "High-temperature pipe and vessel insulation for a petrochemical refinery operating at 600\u00B0C+ with corrosion-under-insulation (CUI) prevention requirements.",
    challenge: "A petrochemical refinery in Jamnagar, coastal Gujarat, operated process pipes and vessels at continuous temperatures exceeding 600\u00B0C. Corrosion-under-insulation (CUI) was a critical concern due to the high coastal humidity and salt-laden atmosphere \u2014 previous insulation from a competitor had degraded within 2 years, exposing piping to moisture ingress and accelerated corrosion. The facility required full OISD (Oil Industry Safety Directorate) compliance for fire safety, and the insulation system needed to accommodate irregular fittings around valve assemblies and expansion joints.",
    solution: "Rhino Elite RWM Wired Matts with stainless steel mesh (120 kg/m\u00B3, 100mm) were specified for all process pipe insulation, providing a continuous thermal barrier rated for 750\u00B0C service temperature \u2014 well above the 600\u00B0C operating requirement. RLW Loose Wool was used to fill valve boxes and insulate irregular fittings where pre-formed products could not conform to complex geometries. All products received water-repellent treatment to prevent moisture ingress and CUI, achieving water absorption below 0.5 kg/m\u00B2 per ASTM C1104.",
    results: [
      "3,800 sq.m. of insulation installed across process pipes, vessels, and valve assemblies",
      "Zero corrosion-under-insulation incidents recorded after 12 months of continuous operation",
      "750\u00B0C service temperature headroom providing a 150\u00B0C safety margin above operating conditions",
      "Full OISD fire safety compliance achieved across all insulated sections",
      "20% faster installation compared to competitor products due to flexible wired matt format",
    ],
    specs: [
      { label: "Product", value: "Rhino Elite RWM + RLW" },
      { label: "Density", value: "120 kg/m\u00B3 (wired matts)" },
      { label: "Thickness", value: "100mm (wired matts)" },
      { label: "Max Service Temp", value: "750\u00B0C" },
      { label: "Wire Mesh", value: "Stainless steel" },
      { label: "Water Absorption", value: "< 0.5 kg/m\u00B2 (ASTM C1104)" },
      { label: "Standards", value: "IS 8183:2024, ASTM C592, OISD compliant" },
    ],
  },
];

/* ========================================================================== */
/*  HELPERS                                                                    */
/* ========================================================================== */

function parseDate(dateStr: string): number {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [mon, year] = dateStr.split(" ");
  return new Date(Number(year), months[mon] ?? 0).getTime();
}

/** Blog posts sorted by date, newest first */
export const blogPostsSorted = [...blogPosts].sort(
  (a, b) => parseDate(b.date) - parseDate(a.date),
);

/** All categories (deduped) */
export const blogCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];
