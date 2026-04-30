"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  MapPin,
  Layers,
  FlaskConical,
  Wheat,
  Sprout,
  Leaf,
  Sun,
  Coffee,
  Package,
  Droplets,
  Fish,
  Recycle,
  type LucideIcon,
} from "lucide-react";

interface Commodity {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  varieties: string[];
  origins: string[];
  specs: string;
  photo: string;
  Icon: LucideIcon;
}

const CATEGORIES = ["All", "Grains", "Oilseeds", "Soft Commodities", "Oils", "Proteins & Feed", "Fertilizers"];

const COMMODITIES: Commodity[] = [
  // ── GRAINS ──
  {
    id: "rice",
    category: "Grains",
    name: "Rice",
    tagline: "Jasmine · Basmati · Parboiled · Long Grain",
    description:
      "Orventis is a premium rice trader with direct sourcing across Southeast Asia, South Asia, and East Africa. We handle 25kg, 50kg, and bulk vessel shipments with full SGS certification and phytosanitary documentation.",
    varieties: [
      "Thai Jasmine (HFGTQ 100% Grade A)",
      "Indian Basmati (1121 XXXL Extra Long)",
      "Vietnamese Long Grain (5% Broken)",
      "Egyptian Short Grain (Calrose)",
      "Parboiled Sella (Non-Sticky)",
    ],
    origins: ["Thailand", "India", "Vietnam", "Pakistan", "Egypt", "Myanmar"],
    specs: "Moisture ≤14% | Broken 0–25% | Purity ≥97% | Whiteness ≥40",
    photo: "photo-1536304929831-ee1ca9d44906",
    Icon: Wheat,
  },
  {
    id: "wheat",
    category: "Grains",
    name: "Wheat",
    tagline: "Hard Red · Soft White · Durum · Semolina",
    description:
      "We source premium milling and feed wheat from major producing regions, offering spot trading and long-term supply contracts with full phytosanitary compliance and moisture certification.",
    varieties: [
      "Hard Red Winter (HRW)",
      "Hard Red Spring (HRS)",
      "Soft Red Winter (SRW)",
      "Durum Wheat (For Pasta/Semolina)",
      "White Wheat",
    ],
    origins: ["USA", "Canada", "Australia", "Ukraine", "Russia", "France"],
    specs: "Protein 10.5–13% | Moisture ≤12.5% | Gluten ≥28% | Test Weight ≥60 kg/hl",
    photo: "photo-1574323347407-f5e1ad6d020b",
    Icon: Wheat,
  },
  {
    id: "corn",
    category: "Grains",
    name: "Corn / Maize",
    tagline: "Yellow #2 · White Corn · Feed & Food Grade",
    description:
      "Yellow and white corn for feed, food processing, and industrial use. We operate in major growing regions with competitive FOB and CIF pricing, and full aflatoxin testing documentation.",
    varieties: [
      "Yellow Corn US #2 (Feed Grade)",
      "White Corn (Food Grade)",
      "Waxy Corn (High Amylopectin)",
      "High-Amylose Corn",
    ],
    origins: ["USA", "Brazil", "Argentina", "Ukraine", "South Africa"],
    specs: "Moisture ≤14% | Aflatoxin ≤10 ppb | Test Weight ≥56 lb/bu | Broken ≤3%",
    photo: "photo-1551754655-cd27e38d2076",
    Icon: Sprout,
  },
  {
    id: "barley",
    category: "Grains",
    name: "Barley",
    tagline: "Malting · Feed · Food Grade",
    description:
      "Premium two-row and six-row barley for malting and animal feed. Competitive pricing on spot and forward contracts with full germination certification for malting specifications.",
    varieties: [
      "Two-Row Malting Barley (Spring)",
      "Six-Row Feed Barley",
      "Hulless Barley (Food Grade)",
      "Winter Barley (Feed)",
    ],
    origins: ["Australia", "France", "Germany", "Canada", "Ukraine", "Argentina"],
    specs: "Germination ≥95% | Moisture ≤12% | Protein 9–12% | Screenings ≤2%",
    photo: "photo-1574323347407-f5e1ad6d020b",
    Icon: Wheat,
  },
  {
    id: "sorghum",
    category: "Grains",
    name: "Sorghum",
    tagline: "Feed · Food · Industrial",
    description:
      "White and red sorghum for animal feed, ethanol production, and food manufacturing. A drought-resistant, non-GMO alternative to corn with strong demand in Africa and Asia.",
    varieties: [
      "White Grain Sorghum",
      "Red Grain Sorghum (Feed)",
      "Waxy Sorghum",
      "Tannin Sorghum",
    ],
    origins: ["USA", "Australia", "Argentina", "Sudan", "Ethiopia", "Mexico"],
    specs: "Moisture ≤13.5% | Tannin Low | Broken ≤2% | Test Weight ≥57 lb/bu",
    photo: "photo-1625246333195-78d9c38ad449",
    Icon: Sprout,
  },
  // ── OILSEEDS ──
  {
    id: "soybeans",
    category: "Oilseeds",
    name: "Soybeans",
    tagline: "GMO · Non-GMO · Identity Preserved",
    description:
      "Full-fat and dehulled soybeans for crushing, animal feed, and food processing. We offer both GMO and certified Non-GMO IP supply chains from the Americas with complete traceability.",
    varieties: [
      "Yellow Soybeans US #2 (Standard)",
      "Non-GMO Identity Preserved (IP)",
      "High-Oleic Soybeans",
      "Food-Grade Soybeans (Tofu/Natto)",
    ],
    origins: ["USA", "Brazil", "Argentina", "Uruguay", "Canada"],
    specs: "Protein ≥35% (dry) | Oil ≥18% | Moisture ≤13% | Foreign Matter ≤2%",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Leaf,
  },
  {
    id: "sunflower-seeds",
    category: "Oilseeds",
    name: "Sunflower Seeds",
    tagline: "Oilseed · Confectionery · Kernel",
    description:
      "High-oleic and linoleic sunflower seeds from Eastern Europe. Available as whole seeds, dehulled, or kernel. Strong supply positions in Ukraine and Argentina.",
    varieties: [
      "High-Oleic (HOLL) — ≥75% Oleic",
      "Linoleic Oilseed (Standard)",
      "Confectionery Striped",
      "Dehulled Sunflower Kernels",
    ],
    origins: ["Ukraine", "Russia", "Argentina", "Hungary", "Romania"],
    specs: "Oil Content ≥44% | Moisture ≤8% | Impurities ≤2% | Acid Value ≤2 mg KOH/g",
    photo: "photo-1543954616-be267d9a1d07",
    Icon: Sun,
  },
  {
    id: "canola",
    category: "Oilseeds",
    name: "Canola / Rapeseed",
    tagline: "00 Double Zero · High Erucic · Biofuel",
    description:
      "Canadian canola and European rapeseed for crushing and biofuel production. Full phytosanitary documentation and quality analysis provided for all shipments.",
    varieties: [
      "Canola 00 (Double Low)",
      "Rapeseed Low Erucic",
      "High Erucic Rapeseed (HEAR)",
      "GM Canola (Herbicide Tolerant)",
    ],
    origins: ["Canada", "Australia", "France", "Germany", "Ukraine", "Poland"],
    specs: "Oil ≥42% | Erucic Acid <2% | Glucosinolates <25 μmol/g | Moisture ≤9%",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Leaf,
  },
  // ── SOFT COMMODITIES ──
  {
    id: "sugar",
    category: "Soft Commodities",
    name: "Sugar",
    tagline: "VHP Raw · ICUMSA 45 · ICUMSA 150",
    description:
      "Brazilian VHP raw sugar and white refined sugar (ICUMSA 45) for food manufacturing and retail distribution. Large bulk and container shipments with full quality documentation.",
    varieties: [
      "VHP Raw Sugar (ICUMSA 600–1200)",
      "White Refined ICUMSA 45",
      "ICUMSA 150 Plantation White",
      "Brown Cane Sugar",
      "Molasses (Feed Grade)",
    ],
    origins: ["Brazil", "Thailand", "India", "Colombia", "Guatemala", "South Africa"],
    specs: "ICUMSA ±5 RBU | Polarization ≥99.8°S | Moisture ≤0.04% | Ash ≤0.04%",
    photo: "photo-1563710804793-44d4d0945b8a",
    Icon: Layers,
  },
  {
    id: "coffee",
    category: "Soft Commodities",
    name: "Coffee",
    tagline: "Arabica · Robusta · Specialty Single Origin",
    description:
      "Green coffee beans sourced from premium estates and cooperatives across Latin America, East Africa, and Southeast Asia. Cupping score documentation and SCA certification available on request.",
    varieties: [
      "Arabica Brazil Natural (Santos NY2)",
      "Arabica Colombian Supremo (Washed)",
      "Robusta Vietnam Grade 1",
      "Ethiopia Yirgacheffe (Specialty)",
      "Honduras SHG (Washed)",
    ],
    origins: ["Brazil", "Colombia", "Ethiopia", "Vietnam", "Honduras", "Guatemala"],
    specs: "Screen 15/16+ | Defects 0 cat.1 / ≤8 cat.2 | Moisture 10.5–12% | Cup ≥80 SCA",
    photo: "photo-1447933601403-0c6688de566e",
    Icon: Coffee,
  },
  {
    id: "cocoa",
    category: "Soft Commodities",
    name: "Cocoa",
    tagline: "Beans · Butter · Powder · Liquor",
    description:
      "Fermented and dried cocoa beans from West Africa and Southeast Asia. We also trade cocoa by-products including butter, powder, and mass/liquor for industrial chocolate manufacturers.",
    varieties: [
      "Forastero Beans (Côte d'Ivoire Main Crop)",
      "Trinitario (Ecuador Arriba Nacional)",
      "Cocoa Butter Grade A (Deodorized)",
      "Natural Cocoa Powder (10–12% Fat)",
      "Alkalized Cocoa Powder (Dutch Process)",
    ],
    origins: ["Côte d'Ivoire", "Ghana", "Ecuador", "Indonesia", "Cameroon"],
    specs: "Fermentation ≥75% | Moisture ≤7.5% | Mold ≤4% | Bean Count ≤100/100g",
    photo: "photo-1528360983277-13d401cdc186",
    Icon: Package,
  },
  {
    id: "cotton",
    category: "Soft Commodities",
    name: "Cotton",
    tagline: "Raw Lint · ELS · Yarn · Organic",
    description:
      "Premium upland cotton and extra-long staple varieties for textile mills. Full HVI (High Volume Instrument) testing documentation provided. Organic-certified supply available.",
    varieties: [
      "Upland Cotton SJV (Strict Low Middling)",
      "Pima Cotton ELS (Extra-Long Staple)",
      "Organic Cotton (GOTS Certified)",
      "Cotton Yarn Carded 20s–40s",
    ],
    origins: ["USA", "India", "Brazil", "Australia", "Egypt", "Uzbekistan"],
    specs: "Staple 1-1/16\" to 1-5/8\" | Strength ≥28 g/tex | Micronaire 3.5–5.0 | Trash ≤1.5%",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Layers,
  },
  // ── OILS ──
  {
    id: "palm-oil",
    category: "Oils",
    name: "Palm Oil (RBD)",
    tagline: "CPO · RBDPO · Olein · Stearin",
    description:
      "Refined, bleached, and deodorized palm oil for food manufacturing, cosmetics, and industrial applications. RSPO-certified and mass balance supply available from Indonesia and Malaysia.",
    varieties: [
      "CPO (Crude Palm Oil)",
      "RBDPO (Refined Bleached Deodorized)",
      "RBD Olein IV56 / IV58 (Frying)",
      "RBD Palm Stearin",
      "Palm Kernel Oil (PKO)",
    ],
    origins: ["Indonesia", "Malaysia", "Côte d'Ivoire", "Ecuador", "Colombia"],
    specs: "FFA ≤0.1% | IV 56–58 | Moisture ≤0.1% | Color ≤3R Lovibond | Iodine Value ≥56",
    photo: "photo-1543954616-be267d9a1d07",
    Icon: Droplets,
  },
  {
    id: "soybean-oil",
    category: "Oils",
    name: "Soybean Oil",
    tagline: "Crude · Refined · Biodiesel",
    description:
      "Crude and refined soybean oil for food, feed, and biodiesel markets. Competitive pricing on both spot and forward contracts from South American production centers.",
    varieties: [
      "Crude Soybean Oil (CSO)",
      "Refined Bleached Deodorized (RBD)",
      "High-Oleic Soybean Oil",
      "Hydrogenated Soybean Oil",
    ],
    origins: ["USA", "Brazil", "Argentina"],
    specs: "FFA ≤0.05% | Moisture ≤0.05% | Peroxide Value ≤2 meq/kg | Phosphorus ≤10 ppm",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Droplets,
  },
  {
    id: "sunflower-oil",
    category: "Oils",
    name: "Sunflower Oil",
    tagline: "Crude · Refined · High-Oleic",
    description:
      "Eastern European sunflower oil, available crude or refined. High-oleic variants for extended shelf-life applications in frying and food manufacturing.",
    varieties: [
      "Crude Sunflower Oil (CSFO)",
      "Refined Sunflower Oil",
      "High-Oleic (HOLL) ≥75% Oleic",
      "NuSun Mid-Oleic",
    ],
    origins: ["Ukraine", "Russia", "Argentina", "Hungary", "Turkey"],
    specs: "FFA ≤0.1% | Color ≤20Y/2R Lovibond | Moisture ≤0.05% | Peroxide ≤1 meq/kg",
    photo: "photo-1543954616-be267d9a1d07",
    Icon: Droplets,
  },
  // ── PROTEINS & FEED ──
  {
    id: "soymeal",
    category: "Proteins & Feed",
    name: "Soybean Meal",
    tagline: "44% · 48% · Full-Fat · Extruded",
    description:
      "Solvent-extracted soybean meal for poultry, swine, and aquaculture feed. The world's primary plant protein source for compound feed manufacturers.",
    varieties: [
      "Standard Meal (44% Protein)",
      "High-Pro Meal (48% Protein)",
      "Full-Fat Soy (Heat-Treated)",
      "Extruded Full-Fat SBM",
      "Toasted Soy Flour",
    ],
    origins: ["Brazil", "Argentina", "USA", "India", "China"],
    specs: "Protein ≥44% (dry) | Urease Activity ≤0.05 | Moisture ≤12% | Trypsin Inhibitor ≤3 TIU/mg",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Layers,
  },
  {
    id: "fish-meal",
    category: "Proteins & Feed",
    name: "Fish Meal",
    tagline: "65% · 72% · Super Prime",
    description:
      "Premium steam-dried fish meal for aquaculture and poultry feed. Peruvian anchovy, menhaden, and white fish available with full TVN and histamine analysis.",
    varieties: [
      "Standard FAQ (65% Protein)",
      "Super Prime (72% Protein)",
      "White Fish Meal (Pollock/Hake)",
      "Anchovy Meal (Steam Dried)",
    ],
    origins: ["Peru", "Chile", "USA", "Norway", "Iceland", "Morocco"],
    specs: "Protein 65–72% | Fat ≤10% | TVN ≤120 mg/100g | Moisture ≤10% | Ash ≤16%",
    photo: "photo-1536304929831-ee1ca9d44906",
    Icon: Fish,
  },
  {
    id: "ddgs",
    category: "Proteins & Feed",
    name: "DDGS",
    tagline: "Corn · Wheat · High-Pro",
    description:
      "Distillers Dried Grains with Solubles — ethanol co-product used as protein and energy source in ruminant, swine, and poultry rations. Competitive pricing from US and European ethanol plants.",
    varieties: [
      "Corn DDGS USA (≥27% Protein)",
      "Wheat DDGS EU",
      "High-Pro DDGS (≥30% Protein)",
      "WDGS Wet Distillers Grains",
    ],
    origins: ["USA", "Canada", "Germany", "Netherlands", "Belgium"],
    specs: "Protein ≥27% | Fat ≥10% | Moisture ≤13% | Sulfur ≤0.65% | NDF ≤45%",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: Recycle,
  },
  // ── FERTILIZERS ──
  {
    id: "urea",
    category: "Fertilizers",
    name: "Urea",
    tagline: "Granular · Prilled · 46% Nitrogen",
    description:
      "Granular and prilled urea (46-0-0) for crop fertilization. Sourced from major production centers in the Middle East, Russia, and China with competitive priced tenders.",
    varieties: [
      "Granular Urea (46-0-0)",
      "Prilled Urea (Standard)",
      "Low Biuret Urea (Foliar)",
      "Technical Grade Urea",
    ],
    origins: ["Russia", "Qatar", "Saudi Arabia", "China", "Egypt", "Algeria"],
    specs: "N ≥46% | Biuret ≤1% | Moisture ≤0.5% | Size 2–4mm (90%) | Free Flowing",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: FlaskConical,
  },
  {
    id: "dap",
    category: "Fertilizers",
    name: "DAP",
    tagline: "Diammonium Phosphate 18-46-0",
    description:
      "The world's most widely used phosphate fertilizer. Suitable for a wide range of soil types and crop systems. Available in standard and low-cadmium grades.",
    varieties: [
      "DAP Standard (18-46-0)",
      "DAP Low Cadmium (<20 mg/kg P₂O₅)",
      "Granular DAP",
    ],
    origins: ["Morocco", "USA", "China", "Russia", "Saudi Arabia", "Tunisia"],
    specs: "N ≥18% | P₂O₅ ≥46% | Moisture ≤2% | Granule 2–4mm | pH 7.5–8",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: FlaskConical,
  },
  {
    id: "mop",
    category: "Fertilizers",
    name: "Potassium Chloride (MOP)",
    tagline: "Standard · Granular · 60% K₂O",
    description:
      "Muriate of Potash (MOP) — the most cost-effective potassium fertilizer. Essential for root development, drought resistance, and crop quality improvement.",
    varieties: [
      "Standard MOP (60% K₂O)",
      "Granular MOP (62% K₂O)",
      "Coarse MOP",
      "Pink/Red MOP (Standard Grade)",
    ],
    origins: ["Canada (Saskatchewan)", "Russia", "Belarus", "Germany", "Israel"],
    specs: "K₂O ≥60% | NaCl ≤1.5% | Moisture ≤0.5% | Fe ≤150 ppm | Size 2–4mm",
    photo: "photo-1416879595882-3373a0480b5b",
    Icon: FlaskConical,
  },
];

function CommodityCard({
  commodity,
  isSelected,
  onClick,
}: {
  commodity: Commodity;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { Icon } = commodity;
  return (
    <motion.button
      onClick={onClick}
      className="text-left w-full rounded-xl p-5 card-hover"
      style={{
        background: isSelected ? "#EEF3FB" : "#FFFFFF",
        border: isSelected ? "1.5px solid #3B6FD4" : "1.5px solid rgba(15,23,42,0.08)",
        boxShadow: isSelected
          ? "0 4px 24px rgba(59,111,212,0.12)"
          : "0 2px 12px rgba(15,23,42,0.04)",
      }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-expanded={isSelected}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: isSelected ? "rgba(59,111,212,0.15)" : "#F1F5F9" }}
        >
          <Icon size={17} style={{ color: isSelected ? "#3B6FD4" : "#64748B" }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: "#3B6FD4" }}>
              {commodity.category}
            </span>
            <motion.div animate={{ rotate: isSelected ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} style={{ color: "#94A3B8" }} />
            </motion.div>
          </div>
          <h3
            className="font-black text-gray-900 mb-0.5"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.9rem", letterSpacing: "-0.02em" }}
          >
            {commodity.name}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed truncate">{commodity.tagline}</p>
        </div>
      </div>
    </motion.button>
  );
}

function CommodityDetail({
  commodity,
  onClose,
}: {
  commodity: Commodity;
  onClose: () => void;
}) {
  const { Icon } = commodity;
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1.5px solid rgba(59,111,212,0.15)",
        boxShadow: "0 8px 48px rgba(15,23,42,0.1)",
      }}
    >
      <div className="grid lg:grid-cols-5">
        {/* Photo */}
        <div className="lg:col-span-2 relative" style={{ minHeight: "280px" }}>
          <Image
            src={`https://images.unsplash.com/${commodity.photo}?w=700&q=80`}
            alt={commodity.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.1) 100%)",
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: "rgba(26,43,94,0.75)", color: "#fff" }}
            >
              {commodity.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-7 lg:p-9">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EEF3FB" }}
                >
                  <Icon size={20} style={{ color: "#3B6FD4" }} />
                </div>
                <h3
                  className="display-black text-gray-900"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}
                >
                  {commodity.name}
                </h3>
              </div>
              <p className="text-sm font-medium text-blue-500">{commodity.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <X size={18} style={{ color: "#94A3B8" }} />
            </button>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm">{commodity.description}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Varieties */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers size={13} style={{ color: "#3B6FD4" }} />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-blue-500">
                  Varieties
                </span>
              </div>
              <ul className="space-y-1.5">
                {commodity.varieties.map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#3B6FD4" }} />
                    <span className="text-xs text-gray-600 leading-relaxed">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              {/* Origins */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={13} style={{ color: "#3B6FD4" }} />
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-blue-500">
                    Origins
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {commodity.origins.map((o) => (
                    <span
                      key={o}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "#EEF3FB", color: "#1A2B5E" }}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical size={13} style={{ color: "#3B6FD4" }} />
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-blue-500">
                    Key Specs
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-mono bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                  {commodity.specs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommodityAccordion() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? COMMODITIES
      : COMMODITIES.filter((c) => c.category === activeCategory);

  const selectedCommodity = COMMODITIES.find((c) => c.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedId(null);
  };

  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: "#FFFFFF" }}
      aria-label="Commodity Portfolio"
      id="commodities"
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-4">Our Portfolio</p>
          <h2
            className="display-black text-gray-900 mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", maxWidth: "40rem" }}
          >
            Every commodity. Every market.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Click any commodity to explore varieties, origins, and technical specifications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#1A2B5E" : "#F1F5F9",
                color: activeCategory === cat ? "#fff" : "#475569",
              }}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({COMMODITIES.filter((c) => c.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((commodity, i) => (
              <motion.div
                key={commodity.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.025 }}
              >
                <CommodityCard
                  commodity={commodity}
                  isSelected={selectedId === commodity.id}
                  onClick={() => handleSelect(commodity.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedCommodity && (
            <motion.div
              key={selectedCommodity.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-2">
                <CommodityDetail
                  commodity={selectedCommodity}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
