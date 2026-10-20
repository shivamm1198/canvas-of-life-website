import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { buttonVariants } from "@/components/ui/button"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { cn } from "@/lib/utils"

export function HamperPromo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="font-hand text-2xl text-rose">new · interactive</p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] text-wine sm:text-5xl">Build-a-hamper, piece by piece</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Pick a box, fill it with treats, keepsakes and festive bits, add a handwritten note — and watch the price update live.
            It’s the hamper they’d have picked themselves.
          </p>
          <ul className="mt-7 space-y-3">
            {["3 box styles — kraft, blush window box or wooden crate", "16+ handpicked items to mix & match", "Free handwritten note & gift wrap"].map((x) => (
              <li key={x} className="flex items-center gap-3 text-sm">
                <span className="grid size-6 place-items-center rounded-full bg-maroon text-white"><Check className="size-3.5" /></span>
                {x}
              </li>
            ))}
          </ul>
          <Link href="/build-a-hamper" className={cn(buttonVariants({ size: "lg" }), "mt-9 h-12 rounded-full px-7 text-base")}>
            Start building <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4 aspect-square">
            {[
              [IMG.pinkRibbonBox, "col-span-4 row-span-4"],
              [IMG.candle, "col-span-2 row-span-3"],
              [IMG.chocolates, "col-span-2 row-span-3"],
              [IMG.honey, "col-span-2 row-span-2"],
              [IMG.almonds, "col-span-2 row-span-2"],
            ].map(([id, cls]) => (
              <div key={id} className={cn("relative overflow-hidden rounded-2xl", cls)}>
                <Image src={unsplash(id, 700)} alt="" fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
