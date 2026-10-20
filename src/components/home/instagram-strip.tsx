import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { InstagramIcon } from "@/components/icons"
import { IMG } from "@/lib/images"
import { unsplash } from "@/lib/format"
import { site } from "@/lib/site"

const tiles = [IMG.pinkRibbonBox, IMG.heartHands, IMG.diya, IMG.frameWall, IMG.ringsRoses, IMG.crate]

export function InstagramStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <p className="font-hand text-2xl text-rose">join {site.stats.followers} gift-lovers</p>
        <a href={site.instagram} target="_blank" rel="noreferrer" className="group mt-1 inline-flex items-center gap-3 font-display text-4xl text-wine sm:text-5xl">
          <InstagramIcon className="size-9" />
          {site.instagramHandle}
          <ArrowUpRight className="size-7 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {tiles.map((id) => (
          <a key={id} href={site.instagram} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-xl">
            <Image src={unsplash(id, 500)} alt="" fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover transition duration-500 group-hover:scale-110" />
            <span className="absolute inset-0 grid place-items-center bg-wine/0 text-paper opacity-0 transition group-hover:bg-wine/50 group-hover:opacity-100">
              <InstagramIcon className="size-7" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
