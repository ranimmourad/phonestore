export type Product = {
  id: string;
  name: string;
  price: number; // TND
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  featured?: boolean;
  badge?: string;
};

export const categories = [
  { id: "chargers", name: "Chargeurs", icon: "Zap" },
  { id: "cables", name: "Câbles USB", icon: "Cable" },
  { id: "adapters", name: "Adaptateurs", icon: "Plug" },
  { id: "cases", name: "Coques", icon: "Smartphone" },
  { id: "protection", name: "Anti-casse / Protection écran", icon: "Shield" },
  { id: "headphones", name: "Casques", icon: "Headphones" },
  { id: "earpods", name: "EarPods", icon: "Ear" },
  { id: "smartwatches", name: "Smartwatches", icon: "Watch" },
  { id: "ringlights", name: "Ring Lights", icon: "Sun" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
  { id: "computer", name: "Accessoires PC", icon: "Laptop" },
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  // Chargers
  { id: "ch-001", name: "Chargeur Rapide 25W USB-C", price: 49, oldPrice: 65, category: "chargers", image: img("photo-1583863788434-e58a36330cf0"), description: "Chargeur ultra-rapide 25W compatible Samsung, iPhone et tous les téléphones USB-C.", stock: 28, rating: 4.8, featured: true, badge: "PROMO" },
  { id: "ch-002", name: "Chargeur GaN 65W 3 Ports", price: 129, category: "chargers", image: img("photo-1606813907291-d86efa9b94db"), description: "Chargeur GaN compact, 3 ports USB-C/USB-A. Idéal voyage et bureau.", stock: 14, rating: 4.9, featured: true },
  { id: "ch-003", name: "Chargeur sans fil 15W", price: 75, category: "chargers", image: img("photo-1591290619762-6c1c1c1f0a7c"), description: "Station de charge sans fil rapide pour smartphones compatibles Qi.", stock: 20, rating: 4.6 },

  // Cables
  { id: "cb-001", name: "Câble USB-C vers USB-C 1m", price: 19, category: "cables", image: img("photo-1583394838336-acd977736f90"), description: "Câble tressé nylon haute durabilité, charge 60W et transfert de données.", stock: 60, rating: 4.7 },
  { id: "cb-002", name: "Câble Lightning iPhone 2m", price: 25, category: "cables", image: img("photo-1580910051074-3eb694886505"), description: "Câble certifié pour iPhone, 2 mètres, charge rapide.", stock: 45, rating: 4.7, featured: true },
  { id: "cb-003", name: "Câble Micro USB tressé", price: 12, category: "cables", image: img("photo-1601524909162-ae8725290836"), description: "Câble Micro USB robuste pour appareils Android classiques.", stock: 50, rating: 4.4 },

  // Adapters
  { id: "ad-001", name: "Adaptateur USB-C vers Jack 3.5", price: 15, category: "adapters", image: img("photo-1606229365485-93a3b8ee0385"), description: "Adaptateur audio pour téléphones sans prise jack.", stock: 30, rating: 4.5 },
  { id: "ad-002", name: "Hub USB-C 6 en 1", price: 89, category: "adapters", image: img("photo-1625948515291-69613efd103f"), description: "Hub multifonction : HDMI 4K, USB-A x3, lecteur SD, USB-C PD.", stock: 12, rating: 4.8, featured: true },

  // Cases
  { id: "cs-001", name: "Coque Silicone iPhone 15 Pro", price: 35, category: "cases", image: img("photo-1592286927505-1def25115558"), description: "Coque silicone premium, intérieur microfibre, protection caméra.", stock: 25, rating: 4.7 },
  { id: "cs-002", name: "Coque Antichoc Samsung S24", price: 39, category: "cases", image: img("photo-1601593346740-925612772716"), description: "Coque renforcée Military-Grade, protection 360°.", stock: 18, rating: 4.6, featured: true },
  { id: "cs-003", name: "Coque Transparente Magnétique", price: 29, category: "cases", image: img("photo-1574944985070-8f3ebc6b79d2"), description: "Compatible MagSafe, ultra-fine et transparente.", stock: 22, rating: 4.5 },

  // Protection
  { id: "pr-001", name: "Verre Trempé 9H iPhone", price: 18, category: "protection", image: img("photo-1567581935884-3349723552ca"), description: "Protection écran verre trempé 9H, ultra-clair, installation facile.", stock: 80, rating: 4.8, badge: "BEST" },
  { id: "pr-002", name: "Anti-casse Hydrogel 3D", price: 22, category: "protection", image: img("photo-1565849904461-04a58ad377e0"), description: "Film hydrogel anti-casse, auto-réparant, couvre toute la surface.", stock: 70, rating: 4.7, featured: true },

  // Headphones
  { id: "hp-001", name: "Casque Bluetooth ANC Pro", price: 219, oldPrice: 269, category: "headphones", image: img("photo-1583394838336-acd977736f90"), description: "Casque sans fil avec réduction active de bruit, autonomie 40h.", stock: 9, rating: 4.9, featured: true, badge: "TOP" },
  { id: "hp-002", name: "Casque Gaming RGB 7.1", price: 159, category: "headphones", image: img("photo-1599669454699-248893623440"), description: "Casque gaming surround 7.1, micro détachable, éclairage RGB.", stock: 11, rating: 4.7 },

  // EarPods
  { id: "ep-001", name: "EarPods Pro Sans Fil", price: 99, category: "earpods", image: img("photo-1606220945770-b5b6c2c55bf1"), description: "Écouteurs sans fil ANC, autonomie 30h avec boîtier.", stock: 25, rating: 4.8, featured: true },
  { id: "ep-002", name: "EarPods Filaire Lightning", price: 35, category: "earpods", image: img("photo-1590658268037-6bf12165a8df"), description: "Écouteurs filaires avec connecteur Lightning, son cristallin.", stock: 40, rating: 4.5 },

  // Smartwatches
  { id: "sw-001", name: "Smartwatch Series 9 Sport", price: 249, oldPrice: 299, category: "smartwatches", image: img("photo-1546868871-7041f2a55e12"), description: "Montre connectée AMOLED, GPS, étanche, suivi santé complet.", stock: 8, rating: 4.8, featured: true, badge: "NEW" },
  { id: "sw-002", name: "Smartwatch Ultra Titanium", price: 389, category: "smartwatches", image: img("photo-1523275335684-37898b6baf30"), description: "Boîtier titane, écran saphir, autonomie 7 jours.", stock: 5, rating: 4.9 },

  // Ringlights
  { id: "rl-001", name: "Ring Light 10\" + Trépied", price: 79, category: "ringlights", image: img("photo-1606981432324-c9c8b5e0d9f6"), description: "Anneau lumineux 10 pouces, 3 modes d'éclairage, trépied 1.6m.", stock: 14, rating: 4.6 },
  { id: "rl-002", name: "Ring Light 18\" Pro Studio", price: 189, category: "ringlights", image: img("photo-1586717791821-3f44a563fa4c"), description: "Ring light pro 18\", température réglable, idéal streaming.", stock: 6, rating: 4.8, featured: true },

  // Gaming
  { id: "gm-001", name: "Manette Gaming Pro Wireless", price: 129, category: "gaming", image: img("photo-1612801799426-30c1d2dcedef"), description: "Manette sans fil ergonomique, gâchettes hall-effect, RGB.", stock: 13, rating: 4.7, featured: true },
  { id: "gm-002", name: "Souris Gaming 16000 DPI", price: 89, category: "gaming", image: img("photo-1527814050087-3793815479db"), description: "Souris gaming RGB, 8 boutons programmables, capteur 16K DPI.", stock: 16, rating: 4.7 },
  { id: "gm-003", name: "Clavier Mécanique RGB", price: 179, category: "gaming", image: img("photo-1587829741301-dc798b83add3"), description: "Clavier mécanique switches bleus, rétro-éclairage RGB.", stock: 10, rating: 4.8 },

  // Computer
  { id: "pc-001", name: "Souris Sans Fil Silencieuse", price: 39, category: "computer", image: img("photo-1527814050087-3793815479db"), description: "Souris ergonomique sans fil, clics silencieux, batterie 18 mois.", stock: 30, rating: 4.6 },
  { id: "pc-002", name: "Disque SSD Externe 1TB", price: 269, category: "computer", image: img("photo-1597872200969-2b65d56bd16b"), description: "SSD portable USB-C, vitesses jusqu'à 1050 Mo/s.", stock: 7, rating: 4.9, featured: true },
  { id: "pc-003", name: "Support PC portable Aluminium", price: 59, category: "computer", image: img("photo-1517336714731-489689fd1ca8"), description: "Support ergonomique en aluminium, hauteur ajustable.", stock: 18, rating: 4.7 },
];

export const getById = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (c: string) => products.filter((p) => p.category === c);
