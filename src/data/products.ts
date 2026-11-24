import { FabricCategory, OrderRecord, Product } from '../types/store';

export const HERO_CAMPAIGN_IMAGE = '/src/assets/images/hero_khan_fabrics_1795529256746.jpg';

export const FABRIC_CATEGORIES: FabricCategory[] = [
  'All',
  'Swiss Voile Lawn',
  'Jacquard & Silk',
  'Winter Karandi',
  'Cambric',
];

export const FREE_DELIVERY_THRESHOLD = 10000;
export const STANDARD_DELIVERY_FEE = 250;

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Bahawalpur',
  'Hyderabad',
];

export const PRODUCTS: Product[] = [
  {
    id: 'zaffran-emerald-3pc',
    sku: 'KF-LN-01',
    name: 'Zaffran Emerald Lawn',
    category: 'Swiss Voile Lawn',
    pieceCount: '3-Piece Unstitched',
    season: 'Spring / Summer',
    price: 8950,
    colorway: 'Deep Emerald',
    inStock: true,
    tagline: 'Tonal resham embroidery on high-thread-count Swiss voile lawn.',
    description:
      'Cut from breathable long-staple cotton lawn, Zaffran pairs a finely embroidered neckline and front panel with an airy crinkle-chiffon dupatta finished with embroidered borders.',
    embroideryDetail: 'Tonal multi-head resham floral motifs across shirt front and sleeves',
    careInstructions: 'Gentle cold hand wash separately; dry in shade and steam iron inside out.',
    image: '/src/assets/images/product_zaffran_emerald_1795529257985.jpg',
    imageAlt:
      'Zaffran Emerald unstitched Pakistani 3-piece Swiss voile lawn suit with tonal embroidery and chiffon dupatta on travertine stone',
    specs: [
      { piece: 'Embroidered Shirt Front & Sleeves', fabric: 'Swiss Voile Lawn', measurement: '2.50 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Combed Cotton', measurement: '2.50 Meters' },
      { piece: 'Embroidered Dupatta', fabric: 'Pure Crinkle Chiffon', measurement: '2.50 Meters' },
    ],
  },
  {
    id: 'noor-ivory-jacquard',
    sku: 'KF-JQ-02',
    name: 'Noor Ivory Jacquard',
    category: 'Jacquard & Silk',
    pieceCount: '3-Piece Unstitched',
    season: 'All-Season Formal',
    price: 11450,
    colorway: 'Warm Ivory & Champagne',
    inStock: true,
    tagline: 'Self-woven botanical jacquard paired with a zari-bordered organza dupatta.',
    description:
      'Loomed with fine mercerized cotton-silk yarns, Noor offers subtle relief texture and structured drape ideal for daytime gatherings and understated formal tailoring.',
    embroideryDetail: 'Woven self-jacquard body with metallic champagne zari border weave',
    careInstructions: 'Dry clean recommended to preserve zari sheen and organza crispness.',
    image: '/src/assets/images/product_noor_ivory_1795529258193.jpg',
    imageAlt:
      'Noor Ivory unstitched Pakistani jacquard 3-piece suit with champagne zari border and organza dupatta',
    specs: [
      { piece: 'Woven Shirt Panel', fabric: 'Cotton-Silk Jacquard', measurement: '2.75 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Viscose Raw Silk', measurement: '2.50 Meters' },
      { piece: 'Woven Border Dupatta', fabric: 'Silk Organza', measurement: '2.50 Meters' },
    ],
  },
  {
    id: 'mehrun-karandi-shawl',
    sku: 'KF-KR-03',
    name: 'Mehrun Karandi Shawl',
    category: 'Winter Karandi',
    pieceCount: '3-Piece Unstitched',
    season: 'Autumn / Winter',
    price: 10800,
    colorway: 'Deep Maroon & Antique Bronze',
    inStock: true,
    tagline: 'Textured slub karandi matched with a woven wool-blend winter shawl.',
    description:
      'Designed for cooler months, Mehrun brings warmth without bulk through medium-weight slub karandi accented by an antique bronze embroidered neckline and a fringed woven shawl.',
    embroideryDetail: 'Dense antique bronze tilla and thread neckline embroidery',
    careInstructions: 'Cool gentle wash or dry clean; store folded away from moisture.',
    image: '/src/assets/images/product_mehrun_karandi_1795529258509.jpg',
    imageAlt:
      'Mehrun Karandi unstitched maroon Pakistani winter 3-piece suit with antique bronze embroidery and woven shawl',
    specs: [
      { piece: 'Embroidered Shirt & Sleeves', fabric: 'Slub Karandi', measurement: '2.75 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Plain Karandi', measurement: '2.50 Meters' },
      { piece: 'Woven Winter Shawl', fabric: 'Acrylic Wool Blend', measurement: '2.50 Meters' },
    ],
  },
  {
    id: 'firoza-chikankari-lawn',
    sku: 'KF-LN-04',
    name: 'Firoza Chikankari Lawn',
    category: 'Swiss Voile Lawn',
    pieceCount: '3-Piece Unstitched',
    season: 'Spring / Summer',
    price: 9250,
    colorway: 'Powder Slate & Ivory',
    inStock: true,
    tagline: 'All-over silver-white schiffli embroidery with a botanical silk dupatta.',
    description:
      'Crafted in calm powder slate, Firoza pairs airy schiffli-embroidered lawn with a fluid printed silk dupatta that transitions effortlessly from afternoon wear to evening dinners.',
    embroideryDetail: 'Schiffli chikankari front panel with scalloped embroidered hem border',
    careInstructions: 'Cold hand wash with mild detergent; medium steam press on reverse.',
    image: '/src/assets/images/product_firoza_lawn_1795529258718.jpg',
    imageAlt:
      'Firoza Chikankari powder slate-blue unstitched Pakistani cotton lawn 3-piece suit with printed silk dupatta',
    specs: [
      { piece: 'Chikankari Shirt & Plain Back', fabric: 'Fine Cotton Lawn', measurement: '2.75 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Cotton Cambric', measurement: '2.50 Meters' },
      { piece: 'Printed Dupatta', fabric: 'Medium Silk', measurement: '2.50 Meters' },
    ],
  },
  {
    id: 'shabnam-charcoal-festive',
    sku: 'KF-JQ-05',
    name: 'Shabnam Charcoal Festive',
    category: 'Jacquard & Silk',
    pieceCount: '3-Piece Unstitched',
    season: 'Evening & Festive',
    price: 13500,
    colorway: 'Charcoal & Muted Gold',
    inStock: true,
    tagline: 'Textured raw silk shirt with metallic threadwork and bordered chiffon dupatta.',
    description:
      'Shabnam balances quiet restraint and evening polish—deep charcoal raw silk illuminated by fine silver-gold floral embroidery and a heavily bordered sheer chiffon dupatta.',
    embroideryDetail: 'Fine zari and matte sequin botanical embroidery on neckline and pallu',
    careInstructions: 'Dry clean only; protect metallic embroidery during pressing.',
    image: '/src/assets/images/product_shabnam_charcoal_1795529259279.jpg',
    imageAlt:
      'Shabnam Charcoal unstitched Pakistani festive raw silk and chiffon 3-piece suit with antique gold-silver embroidery',
    specs: [
      { piece: 'Embroidered Shirt Fabric', fabric: 'Slub Raw Silk', measurement: '2.75 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Silk Grip / Raw Silk', measurement: '2.50 Meters' },
      { piece: 'Embroidered Border Dupatta', fabric: 'Bemberg Chiffon', measurement: '2.50 Meters' },
    ],
  },
  {
    id: 'gulab-cambric-floral',
    sku: 'KF-CM-06',
    name: 'Gulab Sage Cambric',
    category: 'Cambric',
    pieceCount: '3-Piece Unstitched',
    season: 'Mid-Season',
    price: 7850,
    colorway: 'Dusty Rose & Sage',
    inStock: true,
    tagline: 'Soft brushed cambric cotton paired with an embroidered cotton-net dupatta.',
    description:
      'Woven from tight-twist combed cotton for crisp tailoring and year-round comfort, Gulab features delicate sage vine embroidery over muted rose and a textured cotton-net dupatta.',
    embroideryDetail: 'Sage botanical vine embroidery on shirt front and dupatta border',
    careInstructions: 'Cold machine wash delicate cycle or hand wash; dry away from direct sun.',
    image: '/src/assets/images/product_gulab_rose_1795529260021.jpg',
    imageAlt:
      'Gulab Sage Cambric dusty rose unstitched Pakistani cotton 3-piece suit with sage embroidery and cotton-net dupatta',
    specs: [
      { piece: 'Embroidered Shirt Fabric', fabric: 'Combed Cotton Cambric', measurement: '2.75 Meters' },
      { piece: 'Dyed Trouser Fabric', fabric: 'Cotton Cambric', measurement: '2.50 Meters' },
      { piece: 'Embroidered Dupatta', fabric: 'Textured Cotton Net', measurement: '2.50 Meters' },
    ],
  },
];

export const SAMPLE_ORDER: OrderRecord = {
  orderId: 'KF-10420',
  createdAt: '2026-11-22T14:30:00.000Z',
  status: 'Confirmed — Preparing Dispatch',
  customer: {
    fullName: 'Ayesha Siddiqui',
    phone: '0300-5550192',
    city: 'Lahore',
    address: 'House 14-B, Gulberg III',
    postalCode: '54660',
    paymentMethod: 'COD',
  },
  items: [
    {
      id: 'zaffran-emerald-3pc',
      name: 'Zaffran Emerald Lawn',
      sku: 'KF-LN-01',
      price: 8950,
      quantity: 1,
    },
    {
      id: 'gulab-cambric-floral',
      name: 'Gulab Sage Cambric',
      sku: 'KF-CM-06',
      price: 7850,
      quantity: 1,
    },
  ],
  subtotal: 16800,
  deliveryFee: 0,
  total: 16800,
};

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
