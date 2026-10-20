"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { CircleCheck, Package, PenLine, Truck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useCart } from "@/store/cart"
import { useMounted } from "@/hooks/use-mounted"
import { formatINR } from "@/lib/format"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

export default function SuccessPage() {
  const mounted = useMounted()
  const order = useCart((s) => s.lastOrder)
  if (!mounted) return <div className="min-h-[70vh]" />

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-4xl text-wine">No recent order</h1>
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}>Browse gifts</Link>
      </div>
    )
  }

  const wa = [
    `Hi! I just placed order ${order.id} 🎁`,
    ...order.lines.map((l) => `• ${l.name} × ${l.qty}`),
    `Total: ${formatINR(order.total)}`,
    `I'll share my photos & details here.`,
  ].join("\n")

  const steps = [
    { icon: CircleCheck, label: "Order placed", on: true },
    { icon: PenLine, label: "Design preview", on: false },
    { icon: Package, label: "Handcrafting", on: false },
    { icon: Truck, label: "On its way", on: false },
  ]

  return (
    <div className="paper-grain">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto grid size-20 place-items-center rounded-full bg-maroon text-white">
          <CircleCheck className="size-10" />
        </motion.div>
        <p className="mt-6 font-hand text-3xl text-rose">thank you, {order.customer.name.split(" ")[0]}!</p>
        <h1 className="text-5xl font-medium text-wine">Your gift is in good hands</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Order <b className="text-ink">{order.id}</b> is confirmed. We’ll send a design preview on WhatsApp to{" "}
          <b className="text-ink">+91 {order.customer.phone}</b> before we start crafting.
        </p>

        <ol className="mt-10 grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <li key={s.label} className="flex flex-col items-center gap-2 text-xs">
              <span className={cn("grid size-11 place-items-center rounded-full", s.on ? "bg-maroon text-white" : "bg-muted text-muted-foreground")}>
                <s.icon className="size-5" />
              </span>
              <span className={cn(s.on ? "font-medium text-wine" : "text-muted-foreground")}>{s.label}</span>
              {i < steps.length - 1 && <span className="sr-only">then</span>}
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-3xl border border-border/70 bg-card p-6 text-left">
          <ul className="space-y-3">
            {order.lines.map((l) => (
              <li key={l.lineId} className="flex justify-between gap-4 text-sm">
                <span>{l.name} <span className="text-muted-foreground">× {l.qty}</span></span>
                <span className="tabular-nums">{formatINR(l.unitPrice * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t pt-4">
            <span>Total paid{order.payment === "cod" && " on delivery"}</span>
            <span className="font-display text-2xl text-wine">{formatINR(order.total)}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Shipping to {order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.pincode}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(wa)} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full bg-whatsapp px-7 font-medium text-white">
            Send photos on WhatsApp
          </a>
          <Link href="/shop" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full px-7")}>
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
