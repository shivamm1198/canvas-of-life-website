import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { cn } from "@/lib/utils"

const tiles = [
  { id: "anniversary", label: "Anniversary", note: "for your forever person", img: IMG.ringsRoses, span: "lg:col-span-2 lg:row-span-2" },
  { id: "birthday", label: "Birthday", note: "make their day", img: IMG.cake, span: "" },
  { id: "retirement", label: "Retirement", note: "honour their service", img: IMG.handshake, span: "" },
  { id: "baby", label: "New baby", note: "tiny toes, big love", img: IMG.babyFeet, span: "" },
  { id: "friendship", label: "Friendship", note: "for your ride-or-die", img: IMG.friends, span: "" },
  { id: "proposal", label: "Proposal", note: "the big question", img: IMG.bouquet, span: "lg:col-span-2" },
  { id: "wedding", label: "Wedding", note: "keep the day forever", img: IMG.weddingHands, span: "" },
  { id: "diwali", label: "Diwali", note: "festive & corporate", img: IMG.diya, span: "" },
]

export function Occasions() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading kicker="what are we celebrating?" title="Shop by occasion" align="center" />
      <div className="mt-12 grid auto-rows-[13rem] grid-cols-2 gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
        {tiles.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.06} className={cn(t.span)}>
            <Link href={`/shop?occasion=${t.id}`} className="group relative block h-full overflow-hidden rounded-2xl">
              <Image src={unsplash(t.img, 900)} alt="" fill sizes="(min-width:1024px) 40vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-wine/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-paper">
                <p className="font-hand text-xl text-gold-soft">{t.note}</p>
                <p className="font-display text-2xl sm:text-3xl">{t.label}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
