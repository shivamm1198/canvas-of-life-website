// Everything here was taken from the public Instagram profile @_canvas.of.life.
// Swap values in one place when the client shares real details.
export const site = {
  name: "Canvas Of Life",
  founder: "Afreen Perothian",
  tagline: "Memories, handmade into gifts.",
  description:
    "Handmade scrapbooks, albums, LED frames, miniature frames and curated hampers — crafted in Mumbai and delivered across India.",
  city: "Mumbai",
  instagram: "https://www.instagram.com/_canvas.of.life/",
  instagramHandle: "@_canvas.of.life",
  whatsappNumber: "919137408952",
  stats: {
    followers: "130K+",
    orders: "20,000+",
    posts: "1,249",
  },
  shipping: {
    freeAbove: 1999,
    standard: 99,
    express: 249,
  },
  // Shown as a small strip so the client knows this is a pitch build.
  demoNotice: "Concept preview built for Canvas Of Life — prices & reviews are placeholders.",
} as const

export const nav = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=diwali-2026", label: "Diwali 2026" },
  { href: "/build-a-hamper", label: "Build a hamper" },
  { href: "/corporate", label: "Corporate gifting" },
  { href: "/about", label: "Our story" },
] as const
