import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/products"
import { unsplash } from "@/lib/format"

/** Category nav styled after Instagram story highlights — familiar to their 130K followers. */
export function Highlights() {
  return (
    <section aria-label="Shop by category" className="border-y border-border/60 bg-card/50">
      <div className="scrollbar-none mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-8 sm:gap-8 sm:px-6 lg:justify-between">
        {categories.map((c) => (
          <Link key={c.id} href={`/shop?category=${c.id}`} className="group flex w-[5.5rem] shrink-0 flex-col items-center gap-2.5 text-center">
            <span className="rounded-full bg-[conic-gradient(from_200deg,var(--gold),var(--rose),var(--maroon),var(--gold))] p-[2.5px] transition-transform duration-300 group-hover:scale-105">
              <span className="block rounded-full bg-paper p-[3px]">
                <span className="relative block size-[4.6rem] overflow-hidden rounded-full">
                  <Image src={unsplash(c.image, 200)} alt="" fill sizes="80px" className="object-cover" />
                </span>
              </span>
            </span>
            <span className="text-[0.78rem] font-medium leading-tight text-ink/85 group-hover:text-maroon">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
