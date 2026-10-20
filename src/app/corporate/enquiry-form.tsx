"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "motion/react"
import { CircleCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@/lib/zod-resolver"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const schema = z.object({
  company: z.string().min(2, "Company name is required"),
  name: z.string().min(2, "Your name is required"),
  email: z.email("Enter a valid work email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  quantity: z.coerce.number().min(25, "Minimum order is 25 units"),
  budget: z.string().min(1, "Pick a budget range"),
  date: z.string().optional(),
  notes: z.string().max(500).optional(),
})
type Values = z.infer<typeof schema>

const budgets = ["Under ₹1,000", "₹1,000 – ₹2,000", "₹2,000 – ₹3,500", "₹3,500+"]

export function EnquiryForm() {
  const [done, setDone] = useState<{ ref: string; values: Values } | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { budget: "" } })
  const budget = watch("budget")

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 900)) // demo: would POST to an API route / CRM
    setDone({ ref: `COL-B${Math.floor(10000 + Math.random() * 89999)}`, values })
  }

  if (done) {
    const v = done.values
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center rounded-3xl bg-blush/50 p-10 text-center">
        <CircleCheck className="size-14 text-maroon" />
        <h3 className="mt-5 font-display text-3xl text-wine">Thank you, {v.name.split(" ")[0]}!</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          We’ve received your enquiry for <b>{v.quantity} hampers</b> for {v.company}. Expect curated options within 24 hours.
        </p>
        <p className="mt-4 rounded-full bg-paper px-4 py-1.5 text-sm">Reference: <b>{done.ref}</b></p>
        <a
          href={whatsappLink(`Hi! Following up on corporate enquiry ${done.ref} — ${v.quantity} units for ${v.company}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-whatsapp px-6 text-sm font-medium text-white"
        >
          Fast-track on WhatsApp
        </a>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-3xl border border-border/70 bg-card p-6 sm:grid-cols-2 sm:p-8">
      <F label="Company" error={errors.company?.message}>
        <Input {...register("company")} placeholder="Acme Technologies" />
      </F>
      <F label="Your name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Priya Shah" autoComplete="name" />
      </F>
      <F label="Work email" error={errors.email?.message}>
        <Input {...register("email")} type="email" placeholder="priya@acme.com" autoComplete="email" />
      </F>
      <F label="Mobile" error={errors.phone?.message}>
        <Input {...register("phone")} inputMode="numeric" placeholder="98XXXXXXXX" autoComplete="tel-national" />
      </F>
      <F label="Quantity" error={errors.quantity?.message}>
        <Input {...register("quantity")} type="number" min={25} placeholder="100" />
      </F>
      <F label="Needed by" error={errors.date?.message}>
        <Input {...register("date")} type="date" />
      </F>
      <div role="group" aria-label="Budget per hamper" className="grid gap-2 sm:col-span-2">
        <span className="text-sm font-medium">Budget per hamper</span>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setValue("budget", b, { shouldValidate: true })}
              className={cn("rounded-full border px-4 py-2 text-sm transition", budget === b ? "border-maroon bg-maroon text-white" : "border-border hover:border-rose")}
            >
              {b}
            </button>
          ))}
        </div>
        {errors.budget && <span className="text-xs text-destructive">{errors.budget.message}</span>}
      </div>
      <F label="Anything else?" error={errors.notes?.message} className="sm:col-span-2">
        <Textarea {...register("notes")} placeholder="Occasion, branding ideas, delivery cities…" className="min-h-28" />
      </F>
      <Button type="submit" disabled={isSubmitting} className="h-12 rounded-full text-base sm:col-span-2">
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Send enquiry"}
      </Button>
    </form>
  )
}

function F({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("grid gap-2 [&_input]:h-11 [&_input]:bg-paper [&_textarea]:bg-paper", className)}>
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  )
}
