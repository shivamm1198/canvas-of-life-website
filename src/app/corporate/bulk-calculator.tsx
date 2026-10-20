"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "motion/react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { branding, tierFor, tiers } from "@/lib/bulk"
import { products } from "@/lib/products"
import { formatINR, unsplash } from "@/lib/format"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const options = products.filter((p) => p.occasions.includes("corporate"))

export function BulkCalculator() {
  const [slug, setSlug] = useState(options.find((o) => o.category === "diwali-2026")?.slug ?? options[0].slug)
  const [qty, setQty] = useState(100)
  const [brand, setBrand] = useState<string[]>(["logo"])

  const p = options.find((o) => o.slug === slug)!
  const tier = tierFor(qty)
  const brandingPerUnit = branding.filter((b) => brand.includes(b.id)).reduce((s, b) => s + b.price, 0)
  const unit = Math.round(p.price * (1 - tier.off)) + brandingPerUnit
  const total = unit * qty
  const savings = Math.round(p.price * tier.off) * qty

  const msg = `Hi! We're interested in corporate gifting:\n• Hamper: ${p.name}\n• Quantity: ${qty}\n• Branding: ${
    branding.filter((b) => brand.includes(b.id)).map((b) => b.label).join(", ") || "None"
  }\n• Estimate: ${formatINR(unit)}/unit (${formatINR(total)} total)`

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8 rounded-3xl bg-paper p-6 sm:p-8">
        <div>
          <p className="mb-3 text-sm font-medium">1. Choose a hamper</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((o) => (
              <button
                key={o.slug}
                onClick={() => setSlug(o.slug)}
                className={cn("flex items-center gap-3 rounded-xl border-2 p-2.5 text-left transition", slug === o.slug ? "border-maroon bg-blush/40" : "border-border hover:border-rose/50")}
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                  <Image src={unsplash(o.images[0], 160)} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{o.name}</span>
                  <span className="text-xs text-muted-foreground">{formatINR(o.price)} list price</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">2. How many?</p>
            <Input
              type="number"
              min={25}
              max={2500}
              value={qty}
              onChange={(e) => setQty(Math.min(2500, Math.max(25, Number(e.target.value) || 25)))}
              className="h-9 w-24 bg-card text-right"
              aria-label="Quantity"
            />
          </div>
          <Slider value={[Math.min(qty, 500)]} min={25} max={500} step={5} onValueChange={(v) => setQty(typeof v === "number" ? v : v[0])} />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {tiers.map((t) => (
              <div key={t.min} className={cn("rounded-lg border p-2 text-center text-xs transition", tier.min === t.min ? "border-maroon bg-maroon text-white" : "border-border text-muted-foreground")}>
                <div className="font-semibold">{Math.round(t.off * 100)}% off</div>
                <div>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">3. Branding</p>
          <div className="space-y-2">
            {branding.map((b) => {
              const on = brand.includes(b.id)
              return (
                <label key={b.id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm", on ? "border-maroon bg-blush/30" : "border-border")}>
                  <Checkbox checked={on} onCheckedChange={(c) => setBrand((x) => (c ? [...x, b.id] : x.filter((i) => i !== b.id)))} />
                  <span className="flex-1">{b.label}</span>
                  <span className="text-muted-foreground">+{formatINR(b.price)}/unit</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-3xl bg-wine p-6 text-paper sm:p-8 lg:sticky lg:top-24 lg:self-start">
        <p className="font-hand text-2xl text-gold">your estimate</p>
        <p className="mt-1 font-display text-2xl">{p.name}</p>
        <dl className="mt-6 space-y-3 text-sm">
          <Row k="List price" v={formatINR(p.price)} />
          <Row k={`Bulk discount (${Math.round(tier.off * 100)}%)`} v={`− ${formatINR(Math.round(p.price * tier.off))}`} />
          <Row k="Branding" v={brandingPerUnit ? `+ ${formatINR(brandingPerUnit)}` : "—"} />
          <div className="border-t border-paper/15 pt-3">
            <Row k="Per unit" v={formatINR(unit)} big />
          </div>
          <Row k={`× ${qty} units`} v="" />
        </dl>
        <div className="mt-6 rounded-2xl bg-paper/10 p-5">
          <p className="text-sm text-paper/70">Estimated total</p>
          <motion.p key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl text-gold">
            {formatINR(total)}
          </motion.p>
          <p className="mt-1 text-sm text-paper/70">You save {formatINR(savings)} with bulk pricing</p>
        </div>
        <div className="mt-6 grid gap-3">
          <a href="#enquiry" className="flex h-12 items-center justify-center rounded-full bg-gold font-medium text-wine transition hover:bg-gold-soft">
            Request formal quote
          </a>
          <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center rounded-full border border-paper/25 text-sm transition hover:bg-paper/10">
            Send this estimate on WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-paper/50">Indicative pricing for the demo. Final quote depends on contents & delivery addresses.</p>
      </div>
    </div>
  )
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-paper/70">{k}</dt>
      <dd className={cn("tabular-nums", big && "font-display text-2xl text-paper")}>{v}</dd>
    </div>
  )
}
