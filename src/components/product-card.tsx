"use client"

import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { toast } from "sonner"
import { ProductVisual } from "./product-visual"
import { useWishlist } from "@/store/wishlist"
import { useMounted } from "@/hooks/use-mounted"
import { formatINR } from "@/lib/format"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

export function ProductCard({ product: p, priority, className }: { product: Product; priority?: boolean; className?: string }) {
  const mounted = useMounted()
  const wished = useWishlist((s) => s.slugs.includes(p.slug))
  const toggle = useWishlist((s) => s.toggle)

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/shop/${p.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-muted shadow-[0_1px_0_rgb(0_0_0/0.04)]">
          <ProductVisual
            images={p.images}
            visual={p.visual}
            alt={p.name}
            priority={priority}
            className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {p.badge && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider shadow-sm",
                p.badge === "Viral" && "bg-maroon text-white",
                p.badge === "Diwali 2026" && "bg-gold text-wine",
                p.badge !== "Viral" && p.badge !== "Diwali 2026" && "bg-paper text-wine"
              )}
            >
              {p.badge === "Viral" ? "🔥 Viral" : p.badge}
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-paper/95 py-2.5 text-center text-sm font-medium text-wine opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Personalise this gift →
          </div>
        </div>
        <div className="mt-3.5 space-y-1 px-0.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-gold text-gold" />
            <span className="font-medium text-ink">{p.rating.toFixed(1)}</span>
            <span>({p.reviews})</span>
          </div>
          <h3 className="font-display text-[1.08rem] leading-snug text-wine">{p.name}</h3>
          <p className="flex items-baseline gap-2">
            <span className="font-medium">{formatINR(p.price)}</span>
            {p.compareAt && <span className="text-sm text-muted-foreground line-through">{formatINR(p.compareAt)}</span>}
            {p.minQty && p.minQty > 1 && <span className="text-xs text-muted-foreground">/ unit · min {p.minQty}</span>}
          </p>
        </div>
      </Link>
      <button
        onClick={() => {
          const added = toggle(p.slug)
          toast(added ? "Saved to wishlist ♡" : "Removed from wishlist")
        }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={mounted && wished}
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-paper/90 text-wine shadow-sm backdrop-blur transition hover:scale-110"
      >
        <Heart className={cn("size-4 transition", mounted && wished && "fill-maroon text-maroon")} />
      </button>
    </div>
  )
}
