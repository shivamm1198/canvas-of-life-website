"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { SectionHeading } from "@/components/section-heading"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

const tabs = {
  Bestsellers: products.filter((p) => p.badge === "Bestseller" || p.badge === "Viral").slice(0, 8),
  "For couples": products.filter((p) => p.occasions.includes("anniversary") || p.occasions.includes("valentines")).slice(0, 8),
  "Miniature frames": products.filter((p) => p.category === "miniature-frames" || p.category === "led-frames").slice(0, 8),
  Hampers: products.filter((p) => p.category === "hampers").slice(0, 8),
}
type Tab = keyof typeof tabs

export function Bestsellers() {
  const [tab, setTab] = useState<Tab>("Bestsellers")
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading kicker="loved by thousands" title="The gifts everyone’s talking about" />
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon hover:gap-2.5 transition-all">
          View all gifts <ArrowRight className="size-4" />
        </Link>
      </div>

      <div role="tablist" className="scrollbar-none mt-10 flex gap-2 overflow-x-auto">
        {(Object.keys(tabs) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "relative shrink-0 rounded-full px-5 py-2 text-sm transition-colors",
              tab === t ? "text-white" : "bg-card text-ink/80 hover:text-maroon border border-border"
            )}
          >
            {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
        >
          {tabs[tab].map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
