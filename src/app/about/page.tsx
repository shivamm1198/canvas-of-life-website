import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HandHeart, Heart, Leaf, PenLine } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Our story",
  description: `${site.name} is a Mumbai studio by ${site.founder}, turning photos and stories into handmade gifts.`,
}

const values = [
  { icon: HandHeart, title: "Made by hand", body: "No templates on a conveyor belt. Every page is cut, layered and lettered by hand in our studio." },
  { icon: PenLine, title: "Built around your story", body: "We ask about the inside jokes, the first trip, the song — and design around them." },
  { icon: Heart, title: "Obsessed with details", body: "Pearls placed one by one, tiny badges recreated in miniature, ribbons tied just so." },
  { icon: Leaf, title: "Thoughtful packaging", body: "Kraft, cotton ribbon and reusable crates wherever we can." },
]

export default function AboutPage() {
  return (
    <>
      <section className="paper-grain">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <p className="font-hand text-3xl text-rose">hello, from our little studio in {site.city}</p>
            <h1 className="mt-2 text-balance text-5xl font-medium leading-[1.02] text-wine sm:text-6xl">
              We turn your memories into something you can hold.
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                {site.name} is the handmade gifting studio of <b className="text-ink">{site.founder}</b>. What began as a love for scrapbooks
                and paper craft has grown into a community of {site.stats.followers} people on Instagram and{" "}
                {site.stats.orders} gifts sent to homes across India.
              </p>
              <p>
                From viral LED pearl frames and miniature retirement shadow boxes to Diwali hampers for entire companies — every piece
                still starts the same way: with your story, and a pair of hands.
              </p>
            </div>
            <p className="mt-8 font-hand text-3xl text-wine">— Afreen</p>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={unsplash(IMG.craftDesk, 1200)} alt="Craft table in the studio" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 w-44 rotate-[-6deg] bg-white p-2.5 pb-8 shadow-xl sm:w-56">
              <div className="relative aspect-square">
                <Image src={unsplash(IMG.craftSupplies, 500)} alt="" fill sizes="220px" className="object-cover" />
              </div>
              <p className="absolute bottom-1.5 left-0 right-0 text-center font-hand text-lg">where the magic happens</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-wine py-16 text-paper">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:px-6 md:grid-cols-4">
          {[
            [site.stats.followers, "Instagram family"],
            [site.stats.orders, "Happy orders"],
            [site.stats.posts, "Creations shared"],
            ["Pan-India", "Delivery"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl text-gold sm:text-5xl">{n}</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-paper/60">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading kicker="what we believe" title="The Canvas Of Life way" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-card p-6 ring-1 ring-border/60">
                <v.icon className="size-7 text-maroon" />
                <h3 className="mt-4 text-xl text-wine">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-8 text-base")}>
            Find the perfect gift
          </Link>
        </div>
      </section>
    </>
  )
}
