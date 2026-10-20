import { IMG } from "./images"

export type BoxId = "kraft" | "blush" | "crate"

export const boxes: { id: BoxId; name: string; blurb: string; capacity: number; price: number; image: string }[] = [
  { id: "kraft", name: "Kraft Classic", blurb: "Rustic, eco-friendly & charming", capacity: 4, price: 199, image: IMG.giftKraftHeld },
  { id: "blush", name: "Blush Window Box", blurb: "Our signature pink box with a clear lid", capacity: 6, price: 349, image: IMG.pinkRibbonBox },
  { id: "crate", name: "Wooden Crate", blurb: "Premium & reusable — for big hearts", capacity: 8, price: 599, image: IMG.crate },
]

export type HamperGroup = "Treats" | "Self-care" | "Keepsakes" | "Festive"

export const hamperItems: { id: string; name: string; price: number; emoji: string; group: HamperGroup }[] = [
  { id: "choc-bar", name: "Belgian chocolate bar", price: 249, emoji: "🍫", group: "Treats" },
  { id: "nuts", name: "Almond & cashew jar", price: 449, emoji: "🥜", group: "Treats" },
  { id: "honey", name: "Raw forest honey", price: 349, emoji: "🍯", group: "Treats" },
  { id: "cookies", name: "Butter cookies", price: 299, emoji: "🍪", group: "Treats" },
  { id: "truffles", name: "Truffles (box of 6)", price: 399, emoji: "🍬", group: "Treats" },
  { id: "candle", name: "Scented soy candle", price: 399, emoji: "🕯️", group: "Self-care" },
  { id: "mist", name: "Rose face mist", price: 349, emoji: "🌸", group: "Self-care" },
  { id: "salts", name: "Lavender bath salts", price: 299, emoji: "🛁", group: "Self-care" },
  { id: "scrunchies", name: "Silk scrunchie set", price: 249, emoji: "🎀", group: "Self-care" },
  { id: "polaroids", name: "Mini polaroid set (6)", price: 299, emoji: "📸", group: "Keepsakes" },
  { id: "letter", name: "Handwritten letter", price: 149, emoji: "💌", group: "Keepsakes" },
  { id: "led-frame", name: "Mini LED photo frame", price: 699, emoji: "🖼️", group: "Keepsakes" },
  { id: "keychain", name: "Custom name keychain", price: 199, emoji: "🔑", group: "Keepsakes" },
  { id: "diya", name: "Hand-painted brass diya", price: 249, emoji: "🪔", group: "Festive" },
  { id: "toran", name: "Marigold toran", price: 349, emoji: "🌼", group: "Festive" },
  { id: "rangoli", name: "Rangoli stencil kit", price: 149, emoji: "🎨", group: "Festive" },
]
