"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ProductVisual } from "@/components/product-visual"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

export function ProductGallery({ product: p }: { product: Product }) {
  // First slide is the crafted mockup; the rest show the raw photos.
  const slides =
    p.visual === "plain"
      ? p.images.map((id) => ({ key: id, images: [id], visual: "plain" as const }))
      : [{ key: "mockup", images: p.images, visual: p.visual }, ...p.images.map((id) => ({ key: id, images: [id], visual: "plain" as const }))]
  const [i, setI] = useState(0)

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-3xl bg-muted">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={slides[i].key} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <ProductVisual images={slides[i].images} visual={slides[i].visual} alt={p.name} priority sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full" />
          </motion.div>
        </AnimatePresence>
        {p.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-wider text-wine shadow">{p.badge}</span>
        )}
      </div>
      <div className="scrollbar-none mt-4 flex gap-3 overflow-x-auto">
        {slides.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setI(idx)}
            aria-label={`Show image ${idx + 1}`}
            className={cn("shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-paper transition", idx === i ? "ring-maroon" : "ring-transparent opacity-70 hover:opacity-100")}
          >
            <ProductVisual images={s.images} visual={s.visual} alt="" sizes="96px" className="aspect-[4/5] w-20 sm:w-24" />
          </button>
        ))}
      </div>
    </div>
  )
}
