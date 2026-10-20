import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { buttonVariants } from "@/components/ui/button"
import { products } from "@/lib/products"
import { formatINR, unsplash } from "@/lib/format"
import { cn } from "@/lib/utils"

export function DiwaliBand() {
  const diwali = products.filter((p) => p.category === "diwali-2026")
  return (
    <section className="relative overflow-hidden bg-wine text-paper">
      {/* soft diya glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 size-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.15_70/0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(var(--gold)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="font-hand text-3xl text-gold">Halki halki Diwali ki raunak…</p>
          <h2 className="mt-2 text-balance text-5xl font-medium leading-[1.02] sm:text-6xl">
            Diwali <span className="italic text-gold">2026</span> collection is live
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/70">
            Premium, elegant and budget friendly hampers for family, friends, employees and clients. Hand-packed in Mumbai, delivered
            pan-India — with logo branding for bulk orders.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop?category=diwali-2026" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-gold px-7 text-base text-wine hover:bg-gold-soft")}>
              Shop Diwali gifts <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/corporate"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-paper/25 bg-transparent px-7 text-base text-paper hover:bg-paper/10 hover:text-paper")}
            >
              <Building2 className="size-4" /> Corporate bulk orders
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {diwali.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12} className={cn(i === 1 && "translate-y-10")}>
              <Link href={`/shop/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-gold/30">
                  <Image src={unsplash(p.images[0], 700)} alt={p.name} fill sizes="(min-width:1024px) 18vw, 32vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/90 via-wine/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <p className="font-display text-sm leading-tight sm:text-lg">{p.name}</p>
                    <p className="mt-1 text-xs text-gold sm:text-sm">from {formatINR(p.price)}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm text-paper/60 sm:px-6">
          <span>🪔 Bulk orders from 25 units</span>
          <span>🏷️ Logo & name personalisation</span>
          <span>🚚 Pan-India dispatch</span>
          <span>💰 Options for every budget</span>
        </div>
      </div>
    </section>
  )
}
