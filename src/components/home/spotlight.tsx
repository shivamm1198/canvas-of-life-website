import Link from "next/link"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { ProductVisual } from "@/components/product-visual"
import { Reveal } from "@/components/reveal"
import { buttonVariants } from "@/components/ui/button"
import { IMG } from "@/lib/images"
import { getProduct } from "@/lib/products"
import { formatINR } from "@/lib/format"
import { cn } from "@/lib/utils"

export function Spotlight() {
  const p = getProduct("led-pearl-eye-frame")!
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-blush/60 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
        <Reveal className="relative">
          <ProductVisual images={[IMG.holdingHands]} visual="led" alt={p.name} sizes="(min-width:1024px) 40vw, 90vw" className="aspect-square rounded-2xl" />
          <div className="absolute -bottom-4 left-4 flex items-center gap-4 rounded-full bg-paper px-5 py-3 text-sm shadow-xl sm:left-8">
            <span className="flex items-center gap-1.5"><Heart className="size-4 fill-maroon text-maroon" /> 7,757</span>
            <span className="flex items-center gap-1.5"><MessageCircle className="size-4" /> 827</span>
            <span className="text-muted-foreground">on Instagram</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-maroon px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            <Sparkles className="size-3.5" /> Our most viral piece
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] text-wine sm:text-5xl">The LED Pearl Couple Frame</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {p.includes.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href={`/shop/${p.slug}`} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
              Make yours — {formatINR(p.price)}
            </Link>
            <p className="font-hand text-2xl text-rose">“Have you made one yet?”</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
