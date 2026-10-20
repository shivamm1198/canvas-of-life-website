import type { Metadata } from "next"
import Image from "next/image"
import { BadgePercent, Building2, Palette, Truck, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { BulkCalculator } from "./bulk-calculator"
import { EnquiryForm } from "./enquiry-form"

export const metadata: Metadata = {
  title: "Corporate & Diwali bulk gifting",
  description: "Handmade corporate hampers for employees and clients — logo branding, pan-India delivery, bulk pricing from 25 units.",
}

const perks = [
  { icon: Palette, title: "Your brand, handcrafted", body: "Logo on the box, ribbon or card — plus individual name tags for every recipient." },
  { icon: BadgePercent, title: "Bulk pricing", body: "Tiered discounts from 25 units, with options for every budget." },
  { icon: Truck, title: "Pan-India dispatch", body: "Ship to one office or hundreds of home addresses across India." },
  { icon: Users, title: "One point of contact", body: "A dedicated coordinator on WhatsApp from sample to final delivery." },
]

export default function CorporatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-wine text-paper">
        <div className="pointer-events-none absolute -right-20 top-0 size-[36rem] rounded-full bg-[radial-gradient(circle,oklch(0.75_0.15_70/0.25),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3.5 py-1.5 text-sm text-gold-soft">
            <Building2 className="size-4" /> Diwali 2026 slots are filling fast
          </p>
          <h1 className="mt-6 max-w-3xl text-balance text-5xl font-medium leading-[1.02] sm:text-7xl">
            Corporate gifting that feels <em className="text-gold">personal</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Thoughtful, handmade hampers for employees, clients and partners — branded with your logo, packed by hand in Mumbai and
            delivered anywhere in India.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <span><b className="font-display text-3xl text-gold">25+</b> <br />minimum units</span>
            <span><b className="font-display text-3xl text-gold">20%</b> <br />max bulk discount</span>
            <span><b className="font-display text-3xl text-gold">Pan-India</b> <br />delivery</span>
          </div>
          </div>
          <div className="relative hidden aspect-[4/5] lg:block">
            <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden rounded-[2rem] ring-1 ring-gold/30">
              <Image src={unsplash(IMG.crate, 1000)} alt="Premium festive crate" fill priority sizes="35vw" className="object-cover" />
            </div>
            <div className="absolute bottom-10 left-0 w-[46%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-wine">
              <div className="relative aspect-square">
                <Image src={unsplash(IMG.giftBasket, 600)} alt="Corporate gourmet basket" fill sizes="20vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute left-[8%] top-10 rotate-[-6deg] rounded-xl bg-paper px-4 py-3 text-wine shadow-xl">
              <p className="font-hand text-xl leading-none">Your logo here ✦</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading kicker="why teams choose us" title="Handmade, at scale" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border/70 bg-card p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-blush text-maroon">
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl text-wine">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="calculator" className="kraft-texture scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHeading kicker="instant estimate" title="Bulk price calculator" sub="Pick a hamper, set your quantity and branding — see your per-unit price instantly." />
          <BulkCalculator />
        </div>
      </section>

      <section id="enquiry" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading kicker="let’s talk" title="Request a formal quote" sub="Share a few details and we’ll send curated options, samples and a quote within 24 hours." />
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
            <Image src={unsplash(IMG.handshake, 1000)} alt="" fill sizes="40vw" className="object-cover" />
          </div>
        </div>
        <EnquiryForm />
      </section>
    </>
  )
}
