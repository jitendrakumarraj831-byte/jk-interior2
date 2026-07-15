export const SITE_URL = "https://www.jkinterior.online";
export const SITE_NAME = "JK Interior";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
/** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Leave empty to disable analytics. */
export const GA_MEASUREMENT_ID = "";

export const BUSINESS = {
  name: "JK Interior",
  nameHi: "जेके इंटीरियर",
  tagline: "Bihar's Most Trusted False Ceiling & Interior Contractor",
  taglineHi: "बिहार का सबसे भरोसेमंद फॉल्स सीलिंग और इंटीरियर कॉन्ट्रैक्टर",
  legalName: "JK Interior",
  phone1: "+91-8541849118",
  phone2: "+91-8651070831",
  whatsapp: "918651070831",
  email: "jkinteriorofficial@gmail.com",
  address: {
    street: "Dumariya",
    city: "Forbesganj",
    district: "Araria",
    state: "Bihar",
    postalCode: "854318",
    country: "IN",
  },
  geo: { lat: 26.3001, lng: 87.2533 },
  hours: "Mon–Sat 8:00 AM – 8:00 PM",
  hoursSun: "Sun 9:00 AM – 6:00 PM",
  priceRange: "₹₹",
  founded: "2016",
  googleRating: 4.9,
  googleReviewCount: 120,
} as const;

export const MATERIAL_BRANDS = [
  "Saint-Gobain Gyproc",
  "Everest Boards",
  "Armstrong Ceilings",
  "Century Ply",
  "Greenlam Laminates",
  "Astral Pipes",
] as const;
