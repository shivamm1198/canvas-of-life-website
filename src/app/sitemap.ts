import type { MetadataRoute } from "next"
import { products } from "@/lib/products"

const base = "https://canvasoflife.in"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/build-a-hamper", "/corporate", "/about"].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const }))
  return [...pages, ...products.map((p) => ({ url: `${base}/shop/${p.slug}`, changeFrequency: "weekly" as const }))]
}
