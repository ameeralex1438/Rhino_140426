export const productVariants = [
  {
    id: "elite",
    name: "Rhino Elite",
    carbonReduction: 25,
    status: "available" as const,
    color: "#FF6600",
    description:
      "Delivers top-tier thermal and acoustic insulation with a significantly smaller carbon footprint.",
    tagline: "Performance Excellence. Sustainability Leadership.",
  },
  {
    id: "enduro",
    name: "Rhino Enduro",
    carbonReduction: 45,
    status: "available" as const,
    color: "#4A4A4A",
    description:
      "Strikes the perfect balance between long-term sustainability and robust performance.",
    tagline: "Resilient Composition. Minimized Impact.",
  },
  {
    id: "eco-green",
    name: "Rhino Eco-Green",
    carbonReduction: 65,
    status: "available" as const,
    color: "#00B894",
    description:
      "Sets a new global benchmark. The definitive choice for industry leaders in sustainability.",
    tagline: "65% Less Carbon. 100% Future Ready.",
  },
];

export const products = [
  {
    id: "rsl",
    slug: "rhino-slabs",
    code: "RSL",
    name: "Rhino Slabs",
    tagline: "Precision-Cut. Powerfully Efficient.",
    shortDescription:
      "Premium-grade, resin-bonded mineral wool insulation boards for flat and large curved surfaces.",
    description:
      "Manufactured using India's most advanced electric smelting technology, these slabs offer exceptional fire resistance, thermal performance, and acoustic insulation in one robust product. With non-combustibility, high dimensional stability, and water-repellent properties, Rhino Slabs are engineered to deliver decades of maintenance-free performance.",
    specs: {
      density: "40 – 180 kg/m\u00B3",
      thickness: "25 – 200 mm",
      length: "1000 / 1200 mm",
      width: "600 mm",
      thermalConductivity: "\u22640.037 W/m\u00B7K at 25\u00B0C",
      fireRating: "Euro Class A1, >1000\u00B0C",
      maxServiceTemp: "750\u00B0C",
      compressiveStrength: "Up to 80 kPa",
      acoustic: "NRC up to 1.0",
      waterAbsorption: "\u22641% by volume",
      standards: ["IS 8183:2024", "ASTM C612"],
      facings: ["Unfaced", "Aluminum Foil", "Alu-Glass", "BGT"],
    },
    benefits: [
      "Fire-safe up to 1000\u00B0C",
      "Low thermal conductivity",
      "Superior sound absorption",
      "High dimensional stability",
      "Excellent for vertical & fa\u00E7ade applications",
    ],
    applications: [
      "Roof Insulation (Flat & Pitched)",
      "External Wall Insulation (EWI)",
      "Internal Wall Partitions",
      "Floor & Ceiling Insulation",
      "Pre-Engineered Metal Buildings",
      "Sandwich Panels & Prefab Walls",
      "Fire Barrier Assemblies",
    ],
    icon: "layers",
    heroImage: "/images/products/rsl-slab-with-packaging.jpg",
    gallery: [
      "/images/products/rsl-slab-with-packaging.jpg",
      "/images/products/rsl-slab-facings.jpg",
      "/images/products/rsl-slabs-stacked-white.jpg",
      "/images/products/product-photo-3.jpg",
    ],
    comparison: {
      fire: "High",
      acoustic: "High",
      thermal: "High",
      flexibility: "Medium",
    },
    tdsUrl:
      "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27983e5007ebcdfb924f9_RHINO.SLAB.RSL.TDS%20JUN%20V1.01.pdf",
  },
  {
    id: "rwm",
    slug: "rhino-wired-matts",
    code: "RWM",
    name: "Rhino Wired Matts",
    tagline: "Flexible Strength. Maximum Protection.",
    shortDescription:
      "Mechanically stitched stone wool to galvanized or stainless steel wire mesh for extreme-duty industrial use.",
    description:
      "Engineered for extreme-duty thermal insulation in high-temperature and high-vibration industrial environments. These mats provide both flexibility and mechanical integrity for curved or irregular surfaces, ensuring form and insulation performance under thermal shock, vibration, and mechanical load.",
    specs: {
      density: "70 – 150 kg/m\u00B3",
      thickness: "25 – 120 mm",
      length: "1520 – 5000 mm",
      width: "1200 / 1220 mm",
      thermalConductivity: "\u22640.037 W/m\u00B7K at 25\u00B0C",
      fireRating: "Euro Class A1, >1000\u00B0C",
      maxServiceTemp: "750\u00B0C",
      flexibility: "High: conforms to curved/irregular surfaces",
      standards: ["IS 8183:2024", "ASTM C592"],
      facings: ["SS / GI Wire mesh"],
    },
    benefits: [
      "Vibration and thermal shock resistant",
      "Up to 780\u00B0C thermal stability",
      "Flexible for irregular or large surfaces",
      "Easy mechanical fixing",
    ],
    applications: [
      "Boilers, Furnaces & ESP",
      "Process Vessels & Storage Tanks",
      "Refineries & Petrochemical Plants",
      "Acoustic Machinery Enclosures",
      "Ductwork & Flanged Assemblies",
      "OEM Applications",
    ],
    icon: "shield",
    heroImage: "/images/products/sample-boxes-lineup.jpg",
    gallery: [
      "/images/products/product-photo-6.jpg",
      "/images/products/product-photo-8.jpg",
      "/images/products/sample-boxes-lineup.jpg",
    ],
    comparison: {
      fire: "High",
      acoustic: "Med-High",
      thermal: "High",
      flexibility: "Very High",
    },
    tdsUrl:
      "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27973d91ae4a78ddf4e09_RHINO.WIRED.MATTS.RWM.TDS%20JUN%20V1.01.pdf",
  },
  {
    id: "rbr",
    slug: "rhino-building-rolls",
    code: "RBR",
    name: "Rhino Building Rolls",
    tagline: "Seamless Coverage. Supreme Comfort.",
    shortDescription:
      "Flexible, pre-formed rock mineral wool mats for large-surface coverage with minimal waste.",
    description:
      "Lightweight yet high-performing, they combine thermal, acoustic, and fire protection in a single layer. Their roll format reduces installation time and material wastage, while maintaining high structural integrity and flexibility. The preferred solution for HVAC contractors and builders.",
    specs: {
      density: "40 – 96 kg/m\u00B3",
      thickness: "50 – 100 mm",
      length: "5000 – 10000 mm",
      width: "1000 / 1200 mm",
      thermalConductivity: "\u22640.037 W/m\u00B7K at 25\u00B0C",
      fireRating: "Euro Class A1, >1000\u00B0C",
      acoustic: "NRC up to 0.90",
      standards: ["IS 8183:2024", "ASTM C612"],
      facings: ["Aluminum Foil", "Alu-Glass"],
    },
    benefits: [
      "Quick installation",
      "High coverage with minimal waste",
      "Excellent fire resistance",
      "Flexible for ceilings, roofs & ducts",
    ],
    applications: [
      "Pitched Roofs & Metal Roofing",
      "Ceiling Insulation (Flat & Suspended)",
      "Wall Partitions & Cavities",
      "HVAC Duct Lining",
      "Prefab Cabins & Temporary Structures",
    ],
    icon: "scroll",
    heroImage: "/images/products/rbr-roll-packed.jpg",
    gallery: [
      "/images/products/rbr-roll-packed.jpg",
      "/images/products/product-photo-16.jpg",
      "/images/products/full-range-display.jpg",
    ],
    comparison: {
      fire: "High",
      acoustic: "Medium",
      thermal: "High",
      flexibility: "Very High",
    },
    tdsUrl: "",
  },
  {
    id: "rra",
    slug: "rhino-rockarmor",
    code: "RRA",
    name: "Rhino RockArmor",
    tagline: "Compact Core. Unmatched Rigidity.",
    shortDescription:
      "Vertically oriented fibers via crimping for 5-10x tensile strength. Built for facades and fire barriers.",
    description:
      "Lamella boards and strips feature vertically oriented fibers for exceptional compressive strength and dimensional stability. Unlike traditional slabs, RockArmor undergoes a crimping process that changes fiber orientation from horizontal to vertical, increasing tensile strength 5-10x \u2014 perfect for exterior insulation, ventilated facades, and structural fire barriers.",
    specs: {
      density: "80 – 160 kg/m\u00B3",
      thickness: "40 – 100 mm (Lamella) / 50 – 150 mm (Board)",
      length: "Up to 2400 mm (Lamella) / 600-1200 mm (Board)",
      width: "100 mm (Lamella) / 300-600 mm (Board)",
      thermalConductivity: "\u22640.037 W/m\u00B7K at 25\u00B0C",
      fireRating: "Euro Class A1, >1000\u00B0C",
      maxServiceTemp: "750\u00B0C",
      compressiveStrength: "50 – 150 kPa",
      standards: ["IS 8183:2024", "ASTM C612", "ASTM E84", "ASTM E136"],
      facings: ["Custom"],
    },
    benefits: [
      "Dimensionally stable",
      "Fire-safe and non-combustible",
      "Durable under pressure and impact",
      "Excellent for vertical & fa\u00E7ade applications",
    ],
    applications: [
      "Curtain Wall Insulation",
      "EIFS / ETICS Systems",
      "Fire Stop & Compartmentation",
      "Mechanical Cladding Support",
      "Cold / Clean Rooms",
    ],
    icon: "brick-wall",
    heroImage: "/images/products/product-photo-4.jpg",
    gallery: [
      "/images/products/product-photo-4.jpg",
      "/images/products/product-photo-11.jpg",
      "/images/products/product-photo-13.jpg",
    ],
    comparison: {
      fire: "High",
      acoustic: "High",
      thermal: "High",
      flexibility: "Very Rigid",
    },
    tdsUrl:
      "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b2799194b819313f204399_RHINO.ROCKARMOR.RRA.TDS%20JUN%20V1.01.pdf",
  },
  {
    id: "rlw",
    slug: "rhino-loose-wool",
    code: "RLW",
    name: "Rhino Loose Wool",
    tagline: "Flow-Anywhere. Fill-Everywhere.",
    shortDescription:
      "Unbonded, fluffy mineral wool for irregular or hard-to-reach spaces. Manual or pneumatic installation.",
    description:
      "Adapts to any cavity, ensuring tight packing and maximum insulation even in complex geometries. Offers the same fire, thermal, and acoustic benefits of rigid boards but can be manually packed or pneumatically blown into complex shapes. Non-settling, mold-resistant, and high-fill for thermal and fire containment.",
    specs: {
      packaging: "25 kg & 40 kg bags",
      thermalConductivity: "0.037 – 0.040 W/m\u00B7K",
      fireRating: "Euro Class A1",
      maxServiceTemp: "750\u00B0C",
      standards: ["IS 3677:1985", "ASTM C764"],
      facings: [],
    },
    benefits: [
      "Versatile fill material",
      "Easy to apply in hard-to-reach spaces",
      "Thermal and acoustic insulation",
      "Fire-safe and mold-resistant",
    ],
    applications: [
      "Furnace & Kiln Cavities",
      "Masonry Gap Filling",
      "Valve Boxes, Silencers, Mufflers",
      "Cold Storage & Refrigeration",
      "Fire-stop & Expansion Relief",
      "Cryogenic Tanks & Oxygen Plants",
    ],
    icon: "wind",
    heroImage: "/images/products/rlw-loose-wool-box.jpg",
    gallery: [
      "/images/products/rlw-loose-wool-box.jpg",
      "/images/products/product-photo-9.jpg",
    ],
    comparison: {
      fire: "High",
      acoustic: "High",
      thermal: "Medium",
      flexibility: "Free Form",
    },
    tdsUrl:
      "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b279c0eeb9659891c1100b_RHINO.LOOSEWOOL.RLW.TDS%20JUN%20V1.01.pdf",
  },
];

export const certifications = [
  { name: "ISO 9001", label: "Quality Management" },
  { name: "ISO 14001", label: "Environmental Management" },
  { name: "ISO 45001", label: "Occupational Health & Safety" },
  { name: "ISO 50001", label: "Energy Management" },
  { name: "NaBL", label: "TC-12249" },
  { name: "BIS", label: "IS 8183:2024" },
  { name: "Three Star", label: "Export House" },
  { name: "GPTW", label: "Great Place to Work" },
];

export const stats = [
  { value: "7", suffix: "+", label: "Years of R&D" },
  { value: "65", suffix: "%", label: "Less CO\u2082 Emissions" },
  { value: "1000", suffix: "\u00B0C+", label: "Fire Resistance" },
  { value: "60", suffix: "+", label: "Countries Served" },
  { value: "45", suffix: "%", label: "Energy Savings" },
  { value: "90", suffix: "+", label: "Years of Legacy" },
];

export const sardaStats = [
  { value: "6000", prefix: "\u20B9", suffix: " Cr", label: "Annual Revenue" },
  { value: "18000", prefix: "\u20B9", suffix: " Cr", label: "Market Cap" },
  { value: "8000", suffix: "+", label: "Workforce" },
  { value: "60", suffix: "+", label: "Countries" },
];

export const navigationLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Technology",
    href: "/technology",
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Rhino Slabs (RSL)", href: "/products/rhino-slabs" },
      { label: "Rhino Wired Matts (RWM)", href: "/products/rhino-wired-matts" },
      { label: "Rhino Building Rolls (RBR)", href: "/products/rhino-building-rolls" },
      { label: "Rhino RockArmor (RRA)", href: "/products/rhino-rockarmor" },
      { label: "Rhino Loose Wool (RLW)", href: "/products/rhino-loose-wool" },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
  },
  {
    label: "Tools",
    href: "/tools/product-selector",
    children: [
      { label: "Product Selector", href: "/tools/product-selector" },
      { label: "Thermal Calculator", href: "/tools/thermal-calculator" },
      { label: "Compare Products", href: "/tools/compare" },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
  },
  {
    label: "Dealers",
    href: "/dealers",
  },
  {
    label: "Insights",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
      { label: "Resources & Downloads", href: "/resources" },
    ],
  },
];
