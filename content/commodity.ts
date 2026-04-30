export const commodityContent = {
  hero: {
    headline: "Premium Commodity Trading",
    subheadline: "Global Sourcing. Verified Supply Chains. Trusted Delivery.",
    description:
      "Orventis operates as a serious, reliable commodity trader with real logistics capacity in global agricultural and commercial markets. Our flagship product is premium rice — sourced, transported, and delivered with precision.",
  },
  trustMessages: [
    "15+ years navigating global commodity markets",
    "End-to-end logistics: from origin to final delivery",
    "Verified supplier network across 4 continents",
    "Strict quality control protocols on every shipment",
    "Transparent transaction management from negotiation to payment",
  ],
  products: {
    featured: {
      id: "rice",
      title: "Premium Rice Supply Chain",
      badge: "Flagship Product",
      description:
        "Our core expertise lies in premium rice trading — sourcing from the world's leading rice-producing regions and delivering reliably to international buyers.",
      capabilities: [
        "Sourcing from SE Asia, India, Pakistan, and Thailand",
        "Long grain, parboiled, jasmine, basmati, and broken rice varieties",
        "High-volume capacities with flexible lot sizing",
        "Complete documentation: phytosanitary, fumigation, SGS inspection",
        "CIF, FOB, CFR Incoterms available",
      ],
      origins: ["Southeast Asia", "South Asia", "East Africa", "Americas"],
    },
    secondary: [
      {
        id: "grains",
        title: "Other Grains & Cereals",
        description: "Wheat, corn, soybeans, barley, and other cereal crops traded globally with verified supply chains.",
        icon: "grains",
      },
      {
        id: "agricultural",
        title: "Agricultural Raw Materials",
        description: "Broad portfolio of agricultural commodities including sugar, coffee, and specialty crops.",
        icon: "agricultural",
      },
      {
        id: "industrial",
        title: "Industrial & Chemical Commodities",
        description: "Selected industrial products and raw materials for B2B procurement across key sectors.",
        icon: "industrial",
      },
      {
        id: "consumer",
        title: "Consumer Goods Procurement",
        description: "Wholesale procurement of consumer products for international distribution channels.",
        icon: "consumer",
      },
    ],
  },
  mapHubs: [
    { id: "singapore", name: "Singapore", coords: [103.8198, 1.3521] as [number, number], markets: "SE Asia Hub" },
    { id: "rotterdam", name: "Rotterdam", coords: [4.4777, 51.9244] as [number, number], markets: "European Gateway" },
    { id: "dubai", name: "Dubai", coords: [55.2708, 25.2048] as [number, number], markets: "MENA Distribution" },
    { id: "lagos", name: "Lagos", coords: [3.3792, 6.5244] as [number, number], markets: "West Africa" },
    { id: "miami", name: "Miami", coords: [-80.1918, 25.7617] as [number, number], markets: "Americas Hub" },
    { id: "shanghai", name: "Shanghai", coords: [121.4737, 31.2304] as [number, number], markets: "East Asia" },
    { id: "mumbai", name: "Mumbai", coords: [72.8777, 19.076] as [number, number], markets: "South Asia" },
  ],
  process: [
    { step: "01", title: "Source Verification", desc: "Due diligence on suppliers, certifications, and product quality." },
    { step: "02", title: "Negotiation & Contracting", desc: "Transparent pricing, Incoterms selection, and contract execution." },
    { step: "03", title: "Logistics & Shipping", desc: "Full freight management, documentation, and customs clearance." },
    { step: "04", title: "Quality Inspection", desc: "Third-party SGS or equivalent inspection at origin and destination." },
    { step: "05", title: "Payment & Settlement", desc: "Secure payment channels: LC, TT, and trade finance solutions." },
  ],
  cta: {
    headline: "Looking for a reliable commodity partner?",
    subtext: "Contact our trading desk to discuss your sourcing requirements, volumes, and delivery timelines.",
    ctaLabel: "Contact Trading Desk",
    ctaHref: "/contact",
  },
};
