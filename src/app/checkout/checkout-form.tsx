"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Banknote, CreditCard, Loader2, Lock, Smartphone, Truck, Zap } from "lucide-react"
import { ProductVisual } from "@/components/product-visual"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cartSubtotal, shippingFor, useCart, type Order } from "@/store/cart"
import { useMounted } from "@/hooks/use-mounted"
import { zodResolver } from "@/lib/zod-resolver"
import { formatINR } from "@/lib/format"
import { indianStates } from "@/lib/states"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const COD_FEE = 49

const schema = z.object({
  name: z.string().min(2, "Enter the recipient’s full name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.email("Enter a valid email"),
  address: z.string().min(10, "Enter the full address"),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Select a state"),
  pincode: z.string().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode"),
  delivery: z.enum(["standard", "express"]),
  payment: z.enum(["upi", "card", "cod"]),
})
type Values = z.infer<typeof schema>

export function CheckoutForm() {
  const mounted = useMounted()
  const router = useRouter()
  const { lines, clear, setLastOrder } = useCart()
  const [placed, setPlaced] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { delivery: "standard", payment: "upi", state: "Maharashtra" },
  })

  const delivery = watch("delivery")
  const payment = watch("payment")
  const state = watch("state")

  if (!mounted) return <div className="min-h-[70vh]" />

  // The cart is cleared just before we navigate away — don't flash the empty state meanwhile.
  if (placed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-maroon" />
        Confirming your order…
      </div>
    )
  }

  if (!lines.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-4xl text-wine">Nothing to check out</h1>
        <p className="text-muted-foreground">Your gift bag is empty.</p>
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7")}>Browse gifts</Link>
      </div>
    )
  }

  const subtotal = cartSubtotal(lines)
  const shipping = shippingFor(subtotal, delivery)
  const codFee = payment === "cod" ? COD_FEE : 0
  const total = subtotal + shipping + codFee

  const onSubmit = async (v: Values) => {
    // Demo: in production this would create a Razorpay order via an API route and verify the payment signature.
    await new Promise((r) => setTimeout(r, 1400))
    const order: Order = {
      id: `COL${Date.now().toString().slice(-7)}`,
      placedAt: new Date().toISOString(),
      lines,
      subtotal,
      shipping,
      codFee,
      total,
      customer: { name: v.name, phone: v.phone, email: v.email, address: v.address, city: v.city, state: v.state, pincode: v.pincode },
      delivery: v.delivery,
      payment: v.payment,
    }
    setPlaced(true)
    setLastOrder(order)
    clear()
    router.push("/checkout/success")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-10">
        <div>
          <h1 className="text-5xl font-medium text-wine">Checkout</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><Lock className="size-3.5" /> Secure checkout · demo mode, no real payment is taken</p>
        </div>

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-2xl text-wine">Delivery details</legend>
          <F label="Full name" error={errors.name?.message}><Input {...register("name")} autoComplete="name" /></F>
          <F label="Mobile number" error={errors.phone?.message}>
            <div className="flex">
              <span className="grid place-items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+91</span>
              <Input {...register("phone")} inputMode="numeric" autoComplete="tel-national" className="rounded-l-none" />
            </div>
          </F>
          <F label="Email" error={errors.email?.message} className="sm:col-span-2"><Input {...register("email")} type="email" autoComplete="email" /></F>
          <F label="Address" error={errors.address?.message} className="sm:col-span-2">
            <Textarea {...register("address")} autoComplete="street-address" placeholder="Flat, building, street, area" className="min-h-20" />
          </F>
          <F label="City" error={errors.city?.message}><Input {...register("city")} autoComplete="address-level2" /></F>
          <F label="Pincode" error={errors.pincode?.message}><Input {...register("pincode")} inputMode="numeric" autoComplete="postal-code" /></F>
          <F label="State" error={errors.state?.message} className="sm:col-span-2">
            <Select value={state} onValueChange={(v) => setValue("state", (v as string) ?? "", { shouldValidate: true })}>
              <SelectTrigger className="h-11! w-full bg-card">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </F>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-display text-2xl text-wine">Shipping</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Choice
              active={delivery === "standard"}
              onClick={() => setValue("delivery", "standard")}
              icon={Truck}
              title="Standard · Pan-India"
              sub="3–5 days after crafting"
              price={subtotal >= site.shipping.freeAbove ? "Free" : formatINR(site.shipping.standard)}
            />
            <Choice
              active={delivery === "express"}
              onClick={() => setValue("delivery", "express")}
              icon={Zap}
              title="Express · Mumbai"
              sub="1–2 days after crafting"
              price={formatINR(site.shipping.express)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-display text-2xl text-wine">Payment</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            <Choice active={payment === "upi"} onClick={() => setValue("payment", "upi")} icon={Smartphone} title="UPI" sub="GPay, PhonePe, Paytm" />
            <Choice active={payment === "card"} onClick={() => setValue("payment", "card")} icon={CreditCard} title="Card / Netbanking" sub="via Razorpay" />
            <Choice active={payment === "cod"} onClick={() => setValue("payment", "cod")} icon={Banknote} title="Cash on delivery" sub={`+${formatINR(COD_FEE)} handling`} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            In the live store this opens a Razorpay checkout. For this demo, placing the order simulates a successful payment.
          </p>
        </fieldset>
      </div>

      <aside className="h-fit rounded-3xl border border-border/70 bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl text-wine">Order summary</h2>
        <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
          {lines.map((l) => (
            <li key={l.lineId} className="flex gap-3">
              <div className="relative">
                <ProductVisual images={[l.image]} visual={l.visual} alt={l.name} sizes="64px" className="aspect-[4/5] w-14 rounded-lg" />
                <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-wine text-[0.65rem] text-white">{l.qty}</span>
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate font-medium">{l.name}</p>
                <p className="truncate text-xs text-muted-foreground">{l.options.map((o) => o.value).join(" · ")}</p>
              </div>
              <span className="text-sm tabular-nums">{formatINR(l.unitPrice * l.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping ? formatINR(shipping) : "Free"}</dd></div>
          {codFee > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">COD handling</dt><dd>{formatINR(codFee)}</dd></div>}
          <div className="flex items-baseline justify-between border-t pt-3 text-base">
            <dt>Total</dt>
            <dd className="font-display text-3xl text-wine">{formatINR(total)}</dd>
          </div>
        </dl>
        <Button type="submit" disabled={isSubmitting} className="mt-6 h-12 w-full rounded-full text-base">
          {isSubmitting ? (<><Loader2 className="animate-spin" /> Processing…</>) : payment === "cod" ? "Place order" : `Pay ${formatINR(total)}`}
        </Button>
      </aside>
    </form>
  )
}

function F({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("grid gap-2 [&_input]:h-11 [&_input]:bg-card [&_textarea]:bg-card", className)}>
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  )
}

function Choice({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
  price,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Truck
  title: string
  sub: string
  price?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition", active ? "border-maroon bg-blush/40" : "border-border bg-card hover:border-rose/50")}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", active ? "text-maroon" : "text-muted-foreground")} />
      <span className="flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
      {price && <span className="text-sm font-medium">{price}</span>}
    </button>
  )
}
