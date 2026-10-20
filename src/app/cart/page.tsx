"use client"

import Link from "next/link"
import { ArrowRight, Gift, ShoppingBag, Trash2 } from "lucide-react"
import { ProductVisual } from "@/components/product-visual"
import { QtyStepper } from "@/components/qty-stepper"
import { buttonVariants } from "@/components/ui/button"
import { cartSubtotal, lineHref, shippingFor, useCart } from "@/store/cart"
import { useMounted } from "@/hooks/use-mounted"
import { formatINR } from "@/lib/format"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const mounted = useMounted()
  const { lines, setQty, remove } = useCart()
  if (!mounted) return <div className="min-h-[60vh]" />

  const subtotal = cartSubtotal(lines)
  const shipping = shippingFor(subtotal)

  if (!lines.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-blush"><ShoppingBag className="size-8 text-maroon" /></span>
        <h1 className="text-4xl text-wine">Your bag is empty</h1>
        <p className="text-muted-foreground">Let’s find something they’ll keep forever.</p>
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7")}>Browse gifts</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-5xl font-medium text-wine">Your gift bag</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y rounded-3xl border border-border/70 bg-card px-5 sm:px-8">
          {lines.map((l) => (
            <li key={l.lineId} className="flex gap-5 py-6">
              <Link href={lineHref(l)} className="shrink-0">
                <ProductVisual images={[l.image]} visual={l.visual} alt={l.name} sizes="128px" className="aspect-[4/5] w-24 rounded-xl sm:w-28" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <Link href={lineHref(l)} className="font-display text-lg leading-snug text-wine hover:text-maroon">{l.name}</Link>
                  <span className="font-medium tabular-nums">{formatINR(l.unitPrice * l.qty)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{formatINR(l.unitPrice)} each</p>
                {l.options.length > 0 && (
                  <dl className="mt-2 grid gap-0.5 text-sm">
                    {l.options.map((o, i) => (
                      <div key={i} className="flex gap-1.5">
                        <dt className="text-muted-foreground">{o.label}:</dt>
                        <dd className="line-clamp-2">{o.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <QtyStepper size="sm" value={l.qty} min={l.minQty ?? 1} onChange={(q) => setQty(l.lineId, q)} />
                  <button onClick={() => remove(l.lineId)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-3xl bg-wine p-6 text-paper lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-paper/70">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-paper/70">Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
            <div className="flex justify-between"><span className="text-paper/70">Gift wrap & note</span><span>Free</span></div>
          </div>
          <div className="flex items-baseline justify-between border-t border-paper/15 pt-4">
            <span>Total</span>
            <span className="font-display text-3xl text-gold">{formatINR(subtotal + shipping)}</span>
          </div>
          <Link href="/checkout" className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-medium text-wine hover:bg-gold-soft">
            Checkout <ArrowRight className="size-4" />
          </Link>
          <p className="flex items-center gap-2 text-xs text-paper/60"><Gift className="size-3.5" /> Every order is hand-packed with a note.</p>
        </aside>
      </div>
    </div>
  )
}
