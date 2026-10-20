"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Visual } from "@/lib/products"
import { site } from "@/lib/site"

export type CartLine = {
  lineId: string
  slug: string
  name: string
  image: string
  visual: Visual
  unitPrice: number
  qty: number
  minQty?: number
  /** Custom builds link back to their builder instead of a product page. */
  href?: string
  options: { label: string; value: string }[]
}

export const lineHref = (l: CartLine) => l.href ?? `/shop/${l.slug}`

export type Order = {
  id: string
  placedAt: string
  lines: CartLine[]
  subtotal: number
  shipping: number
  codFee: number
  total: number
  customer: { name: string; phone: string; email: string; address: string; city: string; state: string; pincode: string }
  delivery: "standard" | "express"
  payment: "upi" | "card" | "cod"
}

type CartState = {
  lines: CartLine[]
  open: boolean
  lastOrder?: Order
  add: (line: Omit<CartLine, "lineId">) => void
  setQty: (lineId: string, qty: number) => void
  remove: (lineId: string) => void
  clear: () => void
  setOpen: (open: boolean) => void
  setLastOrder: (o: Order) => void
}

// Lines with identical product + options merge instead of duplicating.
const keyOf = (l: Pick<CartLine, "slug" | "options">) =>
  l.slug + "|" + l.options.map((o) => `${o.label}=${o.value}`).join("&")

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line) =>
        set((s) => {
          const key = keyOf(line)
          const existing = s.lines.find((l) => keyOf(l) === key)
          if (existing) {
            return {
              open: true,
              lines: s.lines.map((l) => (l === existing ? { ...l, qty: l.qty + line.qty } : l)),
            }
          }
          return { open: true, lines: [...s.lines, { ...line, lineId: crypto.randomUUID() }] }
        }),
      setQty: (lineId, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(l.minQty ?? 1, qty) } : l)),
        })),
      remove: (lineId) => set((s) => ({ lines: s.lines.filter((l) => l.lineId !== lineId) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
      setLastOrder: (lastOrder) => set({ lastOrder }),
    }),
    {
      name: "col-cart",
      partialize: (s) => ({ lines: s.lines, lastOrder: s.lastOrder }),
    }
  )
)

export const cartSubtotal = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0)
export const cartCount = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.qty, 0)
export const shippingFor = (subtotal: number, delivery: "standard" | "express" = "standard") =>
  delivery === "express" ? site.shipping.express : subtotal >= site.shipping.freeAbove ? 0 : site.shipping.standard
