import { IMG } from "./images"

export type CategoryId =
  | "led-frames"
  | "miniature-frames"
  | "scrapbooks"
  | "albums"
  | "hampers"
  | "handmade-gifts"
  | "diwali-2026"
  | "corporate"

export type Occasion =
  | "anniversary"
  | "birthday"
  | "valentines"
  | "retirement"
  | "baby"
  | "wedding"
  | "diwali"
  | "proposal"
  | "friendship"
  | "corporate"

/** How the product image is presented — CSS mockups that echo the real pieces. */
export type Visual = "plain" | "led" | "shadow" | "museum" | "polaroid"

export type Product = {
  slug: string
  name: string
  tagline: string
  category: CategoryId
  occasions: Occasion[]
  price: number
  compareAt?: number
  rating: number
  reviews: number
  images: string[]
  visual: Visual
  badge?: "Bestseller" | "Viral" | "New" | "Diwali 2026" | "Bulk friendly"
  description: string
  includes: string[]
  sizes?: { label: string; delta: number }[]
  personalise: { photos?: number; names?: boolean; date?: boolean; message?: boolean }
  leadTime: string
  minQty?: number
}

export const categories: { id: CategoryId; name: string; blurb: string; image: string }[] = [
  { id: "led-frames", name: "LED Frames", blurb: "Warm-lit keepsakes that glow", image: IMG.heartHands },
  { id: "miniature-frames", name: "Miniature Frames", blurb: "Tiny worlds, big feelings", image: IMG.frameWall },
  { id: "scrapbooks", name: "Scrapbooks", blurb: "Your story, page by page", image: IMG.writing },
  { id: "albums", name: "Albums", blurb: "Heirloom-quality memory books", image: IMG.ringsRoses },
  { id: "hampers", name: "Hampers", blurb: "Curated & customised boxes", image: IMG.pinkRibbonBox },
  { id: "handmade-gifts", name: "Handmade Gifts", blurb: "Little things, made by hand", image: IMG.craftDesk },
  { id: "diwali-2026", name: "Diwali 2026", blurb: "Premium, elegant & budget friendly", image: IMG.diya },
  { id: "corporate", name: "Corporate Hampers", blurb: "Bulk gifting for teams & clients", image: IMG.giftBasket },
]

export const occasions: { id: Occasion; label: string }[] = [
  { id: "anniversary", label: "Anniversary" },
  { id: "birthday", label: "Birthday" },
  { id: "valentines", label: "Valentine's" },
  { id: "proposal", label: "Proposal" },
  { id: "wedding", label: "Wedding" },
  { id: "baby", label: "New baby" },
  { id: "retirement", label: "Retirement" },
  { id: "friendship", label: "Friendship" },
  { id: "diwali", label: "Diwali" },
  { id: "corporate", label: "Corporate" },
]

const frameSizes = [
  { label: "8 × 10 in", delta: 0 },
  { label: "12 × 15 in", delta: 800 },
  { label: "16 × 20 in", delta: 1600 },
]

export const products: Product[] = [
  {
    slug: "led-pearl-eye-frame",
    name: "LED Pearl Couple Frame",
    tagline: "The most viral couple frame right now",
    category: "led-frames",
    occasions: ["anniversary", "valentines", "proposal", "birthday"],
    price: 2499,
    compareAt: 2999,
    rating: 4.9,
    reviews: 827,
    images: [IMG.heartHands, IMG.holdingHands, IMG.cycling],
    visual: "led",
    badge: "Viral",
    description:
      "Our statement LED pearl frame — a hand-beaded pearl mat, warm fairy lights and your favourite photos (or that eye-to-eye collage everyone is making). Switch it on and watch your story glow.",
    includes: ["Hand-beaded pearl mat", "Warm-white LED string (USB)", "Up to 4 photos, printed matte", "Gift-ready packaging"],
    sizes: frameSizes,
    personalise: { photos: 4, names: true, date: true, message: true },
    leadTime: "Ships in 4–6 days",
  },
  {
    slug: "mini-museum-frame",
    name: "Mini Museum Frame",
    tagline: "A tiny art gallery, just for the two of you",
    category: "miniature-frames",
    occasions: ["anniversary", "valentines", "birthday", "friendship"],
    price: 1899,
    rating: 4.8,
    reviews: 312,
    images: [IMG.friends, IMG.heartHands, IMG.holdingHands],
    visual: "museum",
    badge: "New",
    description:
      "A miniature museum wall with hand-cut gallery frames, a spotlight glow and a tiny bench — every 'artwork' is one of your photos. The cutest thing on any shelf.",
    includes: ["3 miniature gallery frames", "Warm spotlight LED", "Handwritten museum plaque", "Shadow-box enclosure"],
    personalise: { photos: 3, names: true, date: true },
    leadTime: "Ships in 5–7 days",
  },
  {
    slug: "retirement-shadow-box",
    name: "Retirement Miniature Shadow Box",
    tagline: "Honour a lifetime of service",
    category: "miniature-frames",
    occasions: ["retirement"],
    price: 4999,
    rating: 5,
    reviews: 96,
    images: [IMG.stationery, IMG.handshake, IMG.frameWall],
    visual: "shadow",
    badge: "Bestseller",
    description:
      "A fully custom miniature shadow box for police officers, armed forces, doctors, teachers and every hard-working hero. We recreate their uniform, badges, workplace and milestones in miniature.",
    includes: ["Custom miniature uniform & insignia", "Service timeline plaque", "Deep wooden shadow box", "Personal message card"],
    sizes: [
      { label: "12 × 12 in", delta: 0 },
      { label: "16 × 16 in", delta: 1500 },
    ],
    personalise: { photos: 3, names: true, date: true, message: true },
    leadTime: "Ships in 8–10 days",
  },
  {
    slug: "miniature-birthday-frame",
    name: "Miniature Birthday Frame",
    tagline: "Imagine their reaction to this",
    category: "miniature-frames",
    occasions: ["birthday"],
    price: 1499,
    rating: 4.8,
    reviews: 204,
    images: [IMG.cake, IMG.balloons, IMG.friends],
    visual: "shadow",
    description:
      "A miniature birthday scene — tiny cake, balloons, gifts and their photo — built inside a shadow box with optional LED lights.",
    includes: ["Handmade miniature props", "1 photo cut-out", "Name & age plaque", "Optional LED glow"],
    personalise: { photos: 1, names: true, date: true, message: true },
    leadTime: "Ships in 4–6 days",
  },
  {
    slug: "miniature-boards",
    name: "Miniature Memory Boards",
    tagline: "Pin-board aesthetics, in miniature",
    category: "miniature-frames",
    occasions: ["friendship", "birthday", "anniversary"],
    price: 999,
    rating: 4.7,
    reviews: 141,
    images: [IMG.frameWall, IMG.polaroidCam, IMG.friends],
    visual: "polaroid",
    description:
      "A white-frame miniature board with tiny polaroids, notes and trinkets — Pinterest-worthy and personal.",
    includes: ["White wooden frame", "6 mini polaroids", "Tiny clips & notes"],
    personalise: { photos: 6, names: true },
    leadTime: "Ships in 3–5 days",
  },
  {
    slug: "couple-scrapbook",
    name: "Our Story Couple Scrapbook",
    tagline: "40 handcrafted pages of you two",
    category: "scrapbooks",
    occasions: ["anniversary", "valentines", "proposal"],
    price: 2199,
    compareAt: 2599,
    rating: 4.9,
    reviews: 538,
    images: [IMG.writing, IMG.heartHands, IMG.cycling],
    visual: "polaroid",
    badge: "Bestseller",
    description:
      "A fully handmade scrapbook with pop-ups, envelopes, pull-tabs and handwritten captions. Send us your photos and the story — we design every spread.",
    includes: ["40 handcrafted pages", "Up to 30 photos", "Pop-ups, pockets & pull-tabs", "Handwritten lettering"],
    sizes: [
      { label: "20 pages", delta: -700 },
      { label: "40 pages", delta: 0 },
      { label: "60 pages", delta: 900 },
    ],
    personalise: { photos: 30, names: true, date: true, message: true },
    leadTime: "Ships in 6–8 days",
  },
  {
    slug: "best-friend-scrapbook",
    name: "Best Friends Scrapbook",
    tagline: "Inside jokes, preserved forever",
    category: "scrapbooks",
    occasions: ["friendship", "birthday"],
    price: 1799,
    rating: 4.8,
    reviews: 189,
    images: [IMG.friends, IMG.craftSupplies, IMG.polaroidCam],
    visual: "plain",
    description:
      "Colourful, chaotic and completely you — a friendship scrapbook with doodles, stickers and all your best photos.",
    includes: ["30 handcrafted pages", "Up to 24 photos", "Stickers & doodles"],
    personalise: { photos: 24, names: true, message: true },
    leadTime: "Ships in 5–7 days",
  },
  {
    slug: "anniversary-memory-album",
    name: "Anniversary Memory Album",
    tagline: "An heirloom for every year together",
    category: "albums",
    occasions: ["anniversary", "wedding"],
    price: 2999,
    rating: 4.9,
    reviews: 274,
    images: [IMG.ringsRoses, IMG.weddingHands, IMG.holdingHands],
    visual: "plain",
    description:
      "A linen-bound album with hand-pressed florals, gold foil names and archival pages. Built to be opened on every anniversary.",
    includes: ["Linen hard cover", "Gold-foil names", "50 photo slots", "Archival paper"],
    personalise: { photos: 50, names: true, date: true, message: true },
    leadTime: "Ships in 6–8 days",
  },
  {
    slug: "baby-first-year-album",
    name: "Baby's First Year Album",
    tagline: "Tiny toes, big milestones",
    category: "albums",
    occasions: ["baby"],
    price: 2799,
    rating: 4.9,
    reviews: 118,
    images: [IMG.babyFeet, IMG.writing, IMG.giftPink],
    visual: "plain",
    description:
      "Month-by-month milestone pages, a footprint card and space for every first — designed to grow with your little one.",
    includes: ["12 milestone spreads", "Footprint keepsake card", "Name embossed cover"],
    personalise: { photos: 36, names: true, date: true },
    leadTime: "Ships in 6–8 days",
  },
  {
    slug: "wedding-ring-shadow-box",
    name: "Wedding Keepsake Shadow Box",
    tagline: "Preserve the day you said yes",
    category: "albums",
    occasions: ["wedding", "anniversary"],
    price: 3299,
    rating: 4.8,
    reviews: 87,
    images: [IMG.weddingHands, IMG.ringsGold, IMG.rose],
    visual: "shadow",
    description:
      "A deep shadow box to preserve your invite, dried varmala flowers, a photo and small keepsakes — arranged by hand.",
    includes: ["Deep shadow box", "Flower preservation", "Invite & photo mount", "Name & date plate"],
    personalise: { photos: 2, names: true, date: true },
    leadTime: "Ships in 7–9 days",
  },
  {
    slug: "explosion-box",
    name: "Surprise Explosion Box",
    tagline: "Lift the lid. Watch it unfold.",
    category: "handmade-gifts",
    occasions: ["birthday", "anniversary", "valentines", "friendship"],
    price: 1299,
    rating: 4.8,
    reviews: 402,
    images: [IMG.pinkRibbonBox, IMG.giftPink, IMG.heartsBokeh],
    visual: "plain",
    badge: "Bestseller",
    description:
      "Open the box and the walls fold out into layers of photos, notes and a mini cake in the centre. Pure joy in a 6-inch box.",
    includes: ["3-layer fold-out walls", "Up to 12 photos", "Mini cake topper", "Handwritten notes"],
    personalise: { photos: 12, names: true, message: true },
    leadTime: "Ships in 3–5 days",
  },
  {
    slug: "love-letter-jar",
    name: "Open When Love Letter Jar",
    tagline: "52 notes for 52 weeks",
    category: "handmade-gifts",
    occasions: ["valentines", "anniversary", "friendship"],
    price: 899,
    rating: 4.7,
    reviews: 166,
    images: [IMG.heartsBokeh, IMG.writing, IMG.rose],
    visual: "plain",
    description: "A glass jar filled with rolled, ribbon-tied notes — you write them, or tell us and we'll hand-letter them.",
    includes: ["Glass jar with fairy lights", "52 rolled notes", "Ribbon & wax seal"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 2–4 days",
  },
  {
    slug: "polaroid-string-lights",
    name: "Polaroid Fairy Light Garland",
    tagline: "Turn any wall into a memory lane",
    category: "handmade-gifts",
    occasions: ["friendship", "birthday", "anniversary"],
    price: 799,
    rating: 4.6,
    reviews: 233,
    images: [IMG.dinnerLights, IMG.polaroidCam, IMG.frameWall],
    visual: "polaroid",
    description: "20 polaroid prints of your photos with wooden pegs on a 3-metre warm-white LED string.",
    includes: ["20 polaroid prints", "3 m LED string", "20 wooden pegs"],
    personalise: { photos: 20 },
    leadTime: "Ships in 2–3 days",
  },
  {
    slug: "birthday-hamper-for-her",
    name: "Customised Birthday Hamper — For Her",
    tagline: "He puts in efforts. Be like him.",
    category: "hampers",
    occasions: ["birthday", "anniversary", "valentines"],
    price: 2499,
    rating: 4.8,
    reviews: 351,
    images: [IMG.perfumeRose, IMG.pinkRibbonBox, IMG.bouquet],
    visual: "plain",
    badge: "Bestseller",
    description:
      "A blush window box with a mini photo frame, scented candle, chocolates, a dried flower bunch and a handwritten card — every element personalised.",
    includes: ["Mini photo frame", "Scented soy candle", "Belgian chocolates", "Dried flower bunch", "Handwritten card"],
    personalise: { photos: 1, names: true, message: true },
    leadTime: "Ships in 3–5 days",
  },
  {
    slug: "accessories-hamper",
    name: "Aesthetic Accessories Hamper",
    tagline: "Eyewear, scrunchies & all things cute",
    category: "hampers",
    occasions: ["birthday", "friendship"],
    price: 2299,
    rating: 4.7,
    reviews: 128,
    images: [IMG.sunglasses, IMG.giftPink, IMG.perfumeRose],
    visual: "plain",
    description: "Trendy sunglasses, silk scrunchies, a custom name keychain, a mini mirror and treats — packed in a pastel box.",
    includes: ["Designer-style sunglasses", "Silk scrunchie set", "Name keychain", "Mini mirror", "Treats"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 3–5 days",
  },
  {
    slug: "self-care-hamper",
    name: "Self-Care Sunday Hamper",
    tagline: "A spa day, boxed with love",
    category: "hampers",
    occasions: ["birthday", "friendship"],
    price: 1999,
    rating: 4.7,
    reviews: 97,
    images: [IMG.serum, IMG.candle, IMG.honey],
    visual: "plain",
    description: "Face mist, bath salts, a scented candle, honey and a cosy note — for someone who deserves a slow day.",
    includes: ["Rose face mist", "Bath salts", "Soy candle", "Raw honey jar", "Note card"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 2–4 days",
  },
  {
    slug: "chocolate-lovers-hamper",
    name: "Chocolate Lovers Hamper",
    tagline: "Sweet, simple, always right",
    category: "hampers",
    occasions: ["birthday", "friendship", "valentines", "corporate"],
    price: 1599,
    rating: 4.6,
    reviews: 142,
    images: [IMG.chocoBox, IMG.chocolates, IMG.chocoBasket],
    visual: "plain",
    description: "Handpicked truffles, bars and cookies in a keepsake box with a personalised tag.",
    includes: ["Truffle box (6)", "2 chocolate bars", "Cookies", "Personalised tag"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 2–3 days",
  },
  {
    slug: "diwali-roshni-hamper",
    name: "Roshni Diwali Hamper",
    tagline: "Halki halki Diwali ki raunak",
    category: "diwali-2026",
    occasions: ["diwali", "corporate"],
    price: 1499,
    rating: 4.8,
    reviews: 212,
    images: [IMG.diya, IMG.candleGlow, IMG.pinkRibbonBox],
    visual: "plain",
    badge: "Diwali 2026",
    description:
      "Our signature pink window box with a hand-painted diya, dry-fruit tray, fudge, a 'Happy Diwali' topper and a festive card.",
    includes: ["Hand-painted diya", "Dry-fruit tray", "Chocolate fudge", "Festive topper & card"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 2–4 days",
    minQty: 1,
  },
  {
    slug: "diwali-utsav-dry-fruit-box",
    name: "Utsav Dry Fruit Box",
    tagline: "Premium, elegant & budget friendly",
    category: "diwali-2026",
    occasions: ["diwali", "corporate"],
    price: 2199,
    rating: 4.7,
    reviews: 164,
    images: [IMG.almonds, IMG.diya, IMG.goldBows],
    visual: "plain",
    badge: "Bulk friendly",
    description: "Four-compartment box of almonds, cashews, pistachios and dates with a brass diya and gold-foil greeting.",
    includes: ["4 premium dry fruits (400 g)", "Brass diya", "Gold-foil greeting card"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 2–4 days",
  },
  {
    slug: "diwali-premium-crate",
    name: "Premium Festive Crate",
    tagline: "We're serving elegance this season",
    category: "diwali-2026",
    occasions: ["diwali", "corporate"],
    price: 3999,
    compareAt: 4499,
    rating: 4.9,
    reviews: 73,
    images: [IMG.crate, IMG.candleGlow, IMG.almonds],
    visual: "plain",
    badge: "Diwali 2026",
    description: "A reusable wooden crate with artisanal sweets, dry fruits, a scented candle, florals and a brass puja set.",
    includes: ["Reusable wooden crate", "Artisanal sweets", "Dry fruit jar", "Scented candle", "Brass puja set"],
    personalise: { names: true, message: true },
    leadTime: "Ships in 3–5 days",
  },
  {
    slug: "corporate-gourmet-basket",
    name: "Corporate Gourmet Basket",
    tagline: "Client gifting that gets remembered",
    category: "corporate",
    occasions: ["corporate", "diwali"],
    price: 2499,
    rating: 4.8,
    reviews: 58,
    images: [IMG.giftBasket, IMG.chocoBasket, IMG.handshake],
    visual: "plain",
    badge: "Bulk friendly",
    description: "A woven basket of gourmet treats, a branded card and your logo on the ribbon. Minimum 25 units, pan-India dispatch.",
    includes: ["Woven basket", "Gourmet treats", "Branded ribbon & card"],
    personalise: { names: true, message: true },
    leadTime: "Dispatch in 7–10 days",
    minQty: 25,
  },
  {
    slug: "corporate-desk-hamper",
    name: "Employee Desk Hamper",
    tagline: "Welcome kits & festive thank-yous",
    category: "corporate",
    occasions: ["corporate"],
    price: 1199,
    rating: 4.7,
    reviews: 41,
    images: [IMG.stationery, IMG.honey, IMG.team],
    visual: "plain",
    badge: "Bulk friendly",
    description: "A kraft box with a notebook, pen, honey, cookies and a personalised name tag — perfect for teams of 25 to 2,500.",
    includes: ["Branded notebook & pen", "Honey jar", "Cookies", "Name tag"],
    personalise: { names: true, message: true },
    leadTime: "Dispatch in 7–10 days",
    minQty: 25,
  },
  {
    slug: "proposal-bouquet-frame-combo",
    name: "Proposal Bouquet + Frame Combo",
    tagline: "For the moment you'll remember forever",
    category: "led-frames",
    occasions: ["proposal", "valentines", "anniversary"],
    price: 3499,
    rating: 4.9,
    reviews: 64,
    images: [IMG.bouquet, IMG.ringsGold, IMG.holdingHands],
    visual: "led",
    description: "A forever-rose bouquet paired with an LED frame of your story — hand-delivered in Mumbai, couriered elsewhere.",
    includes: ["Forever-rose bouquet", "LED photo frame", "Ring box nook", "Handwritten card"],
    personalise: { photos: 4, names: true, date: true, message: true },
    leadTime: "Ships in 4–6 days",
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const getCategory = (id: string) => categories.find((c) => c.id === id)

export const related = (p: Product, n = 4) =>
  products
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({
      x,
      score: (x.category === p.category ? 3 : 0) + x.occasions.filter((o) => p.occasions.includes(o)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ x }) => x)
