"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"
import { ProductVisual } from "@/components/product-visual"
import { buttonVariants } from "@/components/ui/button"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-blush/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-gold-soft/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-card/70 px-3.5 py-1.5 text-[0.8rem] text-maroon backdrop-blur"
          >
            <Sparkles className="size-3.5" /> Handmade in {site.city} · {site.stats.orders} happy orders
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-6 text-balance text-[2.9rem] font-medium leading-[0.98] text-wine sm:text-6xl lg:text-[4.6rem]"
          >
            Memories, <em className="pr-1 font-normal text-maroon">handmade</em> into gifts that
            <span className="relative ml-3 inline-block">
              glow
              <svg viewBox="0 0 120 14" className="absolute -bottom-2 left-0 w-full text-gold" aria-hidden>
                <path d="M2 9c25-6 60-8 116-3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Scrapbooks, LED frames, miniature shadow boxes and curated hampers — each one crafted by hand around <i>your</i> photos
            and <i>your</i> story, then shipped anywhere in India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
              Shop bestsellers <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/build-a-hamper"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-wine/20 bg-transparent px-7 text-base text-wine")}
            >
              Build your own hamper
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-wine/10 pt-6"
          >
            {[
              [site.stats.followers, "Instagram family"],
              [site.stats.orders, "Gifts delivered"],
              ["Pan-India", "Delivery"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="whitespace-nowrap font-display text-2xl text-wine sm:text-3xl">{n}</dd>
                <dd className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Collage */}
        <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[34rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="absolute left-[12%] top-[4%] w-[66%] overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgb(58_26_32/0.7)]"
          >
            <ProductVisual images={[IMG.heartHands]} visual="led" alt="LED pearl couple frame" priority sizes="(min-width:1024px) 30vw, 70vw" className="aspect-[4/5]" />
          </motion.div>

          <Polaroid id={IMG.pinkRibbonBox} caption="her birthday box 🎀" className="left-0 top-[58%] w-[38%] [--r:-8deg]" delay={0.35} />
          <Polaroid id={IMG.diya} caption="Diwali 2026 ✨" className="right-0 top-[8%] w-[34%] [--r:7deg]" delay={0.5} />
          <Polaroid id={IMG.ringsRoses} caption="forever starts here" className="bottom-0 right-[4%] w-[40%] [--r:4deg]" delay={0.65} />

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
            className="absolute left-[52%] top-[-2%] grid size-24 rotate-12 place-items-center rounded-full bg-gold text-center font-display text-[0.72rem] font-semibold uppercase leading-tight tracking-wider text-wine shadow-lg sm:size-28"
          >
            <span>
              Celebrity
              <br />
              gifted
              <br />
              <span className="font-hand text-lg normal-case tracking-normal">✦ ✦ ✦</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Polaroid({ id, caption, className, delay }: { id: string; caption: string; className: string; delay: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      className={cn("absolute", className)}
    >
      <div className="animate-float bg-white p-[6%] pb-[4%] shadow-[0_20px_40px_-18px_rgb(58_26_32/0.55)]" style={{ animationDelay: `${delay}s` }}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image src={unsplash(id, 600)} alt={caption} fill sizes="(min-width:1024px) 14vw, 35vw" className="object-cover" />
        </div>
        <figcaption className="mt-1.5 truncate text-center font-hand text-lg text-ink/80">{caption}</figcaption>
      </div>
    </motion.figure>
  )
}
