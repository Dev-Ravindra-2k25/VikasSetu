export const LANGUAGES = [
  { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🌐" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
];

export const CATEGORIES = [
  {
    name: "Roads & Transport",
    icon: "Truck",
    color: "amber",
    bg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description: "Potholes, unpaved roads, highway bottlenecks, bridge damage",
  },
  {
    name: "Water & Sanitation",
    icon: "Droplets",
    color: "cyan",
    bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description: "Piped water leaks, dry borewells, waterborne contamination, toilets",
  },
  {
    name: "Healthcare",
    icon: "HeartPulse",
    color: "rose",
    bg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    description: "PHC/CHC distance, doctor shortage, medicine deficit, trauma access",
  },
  {
    name: "Education",
    icon: "GraduationCap",
    color: "blue",
    bg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    description: "Dilapidated school roofs, teacher vacancies, smart classrooms",
  },
  {
    name: "Electricity",
    icon: "Zap",
    color: "yellow",
    bg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    description: "Burnt transformers, low voltage, tube well feeder blackouts",
  },
  {
    name: "Internet & Digital Connectivity",
    icon: "Wifi",
    color: "purple",
    bg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "Mobile tower blind spots, fiber broadband, CSC connectivity",
  },
  {
    name: "Drainage & Waste Management",
    icon: "Trash2",
    color: "emerald",
    bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Clogged storm drains, village waterlogging, solid waste disposal",
  },
];

export const DISTRICTS = [
  { name: "Basti", state: "Uttar Pradesh", lat: 26.7997, lng: 82.8021, population: "2,40,000" },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732, population: "4,44,000" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: "3,67,000" },
  { name: "Sambhal", state: "Uttar Pradesh", lat: 28.5847, lng: 78.5714, population: "2,19,000" },
  { name: "Sitapur", state: "Uttar Pradesh", lat: 27.5683, lng: 80.6829, population: "3,10,000" },
];

export const SAMPLE_PROMPTS = [
  {
    lang: "Hindi",
    text: "हमारे गांव में सड़क बहुत खराब है और बारिश में पूरा रास्ता बंद हो जाता है।",
    category: "Roads & Transport",
    district: "Basti",
  },
  {
    lang: "Hindi",
    text: "हमारे गांव में अस्पताल बहुत दूर है। मरीज को ले जाते समय रास्ते में ही हालत बिगड़ जाती है।",
    category: "Healthcare",
    district: "Basti",
  },
  {
    lang: "Hindi",
    text: "पीने के पानी का नल 3 महीने से सूखा पड़ा है, 4 किलोमीटर दूर से पानी लाना पड़ता है।",
    category: "Water & Sanitation",
    district: "Gorakhpur",
  },
  {
    lang: "English",
    text: "The main 250kVA agricultural feeder transformer burnt out 12 days ago. Over 60 tube wells are non-operational.",
    category: "Electricity",
    district: "Sitapur",
  },
];
