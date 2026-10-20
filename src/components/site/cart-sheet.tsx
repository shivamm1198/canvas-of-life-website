"use client"

import Link from "next/link"
import { Gift, ShoppingBag, Trash2, Truck } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { buttonVariants } from "@/components/ui/button"
import { ProductVisual } from "@/components/product-visual"
import { QtyStepper } from "@/components/qty-stepper"
import { cartSubtotal, lineHref, useCart } from "@/store/cart"
import { formatINR } from "@/lib/format"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function CartSheet() {
  const { lines, open, setOpen, setQty, remove } = useCart()
  const subtotal = cartSubtotal(lines)
  const toFree = Math.max(0, site.shipping.freeAbove - subtotal)
  const progress = Math.min(100, (subtotal / site.shipping.freeAbove) * 100)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 bg-paper p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-display text-2xl text-wine">Your gift bag</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-blush">
              <ShoppingBag className="size-8 text-maroon" />
            </div>
            <p className="font-display text-xl text-wine">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Every gift here is made by hand, just for the person you love.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b bg-blush/40 px-6 py-3 text-sm">
              <div className="flex items-center gap-2 text-wine">
                <Truck className="size-4" />
                {toFree > 0 ? (
                  <span>
                    Add <b>{formatINR(toFree)}</b> more for free shipping
                  </span>
                ) : (
                  <span>You’ve unlocked <b>free shipping</b> 🎉</span>
                )}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/70">
                <div className="h-full rounded-full bg-maroon transition-[width] duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-4 py-5">
                  <Link href={lineHref(l)} onClick={() => setOpen(false)} className="shrink-0">
                    <ProductVisual images={[l.image]} visual={l.visual} alt={l.name} sizes="96px" className="aspect-[4/5] w-20 rounded-lg" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-snug">{l.name}</p>
                      <button onClick={() => remove(l.lineId)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${l.name}`}>
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {l.options.length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                        {l.options.slice(0, 4).map((o) => (
                          <li key={o.label} className="truncate">
                            {o.label}: {o.value}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper size="sm" value={l.qty} min={l.minQty ?? 1} onChange={(q) => setQty(l.lineId, q)} />
                      <span className="font-medium tabular-nums">{formatINR(l.unitPrice * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="gap-3 border-t bg-card px-6 py-5">
              <div className="flex items-center justify-between text-base">
                <span>Subtotal</span>
                <span className="font-display text-xl font-semibold tabular-nums">{formatINR(subtotal)}</span>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Gift className="size-3.5" /> Gift wrapping & handwritten note included free
              </p>
              <Link href="/checkout" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full text-base")}>
                Checkout
              </Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="text-center text-sm text-maroon underline-offset-4 hover:underline">
                View full bag
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
