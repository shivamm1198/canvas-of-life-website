import Image from "next/image"
import { cn } from "@/lib/utils"
import { unsplash } from "@/lib/format"
import type { Visual } from "@/lib/products"

type Props = {
  images: string[]
  visual: Visual
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Renders a product photo inside a CSS mockup of the actual craft piece
 * (LED pearl frame, shadow box, mini museum, polaroids), so stock photos
 * still read as Canvas Of Life products.
 */
export function ProductVisual({ images, visual, alt, className, sizes = "(min-width:1024px) 25vw, 50vw", priority }: Props) {
  const [a, b = a, c = a] = images
  const img = (id: string, extra?: string, s = sizes) => (
    <Image src={unsplash(id)} alt={alt} fill sizes={s} priority={priority} className={cn("object-cover", extra)} />
  )

  if (visual === "led") {
    return (
      <div className={cn("relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.38_0.07_40),var(--wine)_70%)] p-[9%]", className)}>
        <div className="relative h-full rounded-[3px] bg-[oklch(0.98_0.008_80)] p-[5%] shadow-[0_20px_50px_-10px_rgb(0_0_0/0.7),inset_0_0_0_1px_rgb(0_0_0/0.06)]">
          <div className="pearl-mat relative h-full p-[9%] shadow-[inset_0_4px_14px_rgb(0_0_0/0.18)]">
            <FairyLights />
            <div className="relative h-full overflow-hidden rounded-[2px] shadow-[0_0_0_3px_white,0_0_28px_6px_oklch(0.86_0.12_80/0.65)]">
              {img(a)}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.75_0.12_70/0.25)] to-transparent mix-blend-soft-light" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (visual === "shadow") {
    return (
      <div className={cn("relative overflow-hidden bg-[oklch(0.93_0.02_70)] p-[8%]", className)}>
        <div className="relative h-full rounded-[2px] bg-[linear-gradient(135deg,oklch(0.42_0.06_50),oklch(0.28_0.05_40))] p-[5.5%] shadow-[0_24px_40px_-14px_rgb(0_0_0/0.55)]">
          <div className="paper-grain relative h-full bg-[oklch(0.95_0.015_80)] p-[9%] shadow-[inset_0_10px_24px_rgb(0_0_0/0.45),inset_0_-2px_8px_rgb(0_0_0/0.15)]">
            <div className="relative h-[82%] overflow-hidden rounded-[2px] shadow-[0_10px_18px_-6px_rgb(0_0_0/0.45)] -rotate-1">{img(a)}</div>
            <div className="mx-auto mt-[6%] h-[7%] w-1/2 rounded-[2px] bg-[linear-gradient(90deg,oklch(0.7_0.1_80),oklch(0.85_0.08_85),oklch(0.68_0.1_78))] shadow-sm" />
          </div>
        </div>
      </div>
    )
  }

  if (visual === "museum") {
    return (
      <div className={cn("relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.99_0.02_85),oklch(0.9_0.025_70)_70%)]", className)}>
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(oklch(0.62_0.05_50),oklch(0.5_0.05_45))]" />
        <div className="absolute left-1/2 top-[14%] h-[46%] w-[40%] -translate-x-1/2 border-[5px] border-[oklch(0.3_0.03_40)] bg-white p-[2.5%] shadow-[0_14px_22px_-10px_rgb(0_0_0/0.6)]">
          <div className="relative h-full w-full">{img(a)}</div>
        </div>
        <div className="absolute left-[8%] top-[22%] h-[28%] w-[22%] border-4 border-[oklch(0.72_0.1_78)] bg-white p-[2%] shadow-[0_10px_16px_-8px_rgb(0_0_0/0.55)]">
          <div className="relative h-full w-full">{img(b)}</div>
        </div>
        <div className="absolute right-[8%] top-[22%] h-[28%] w-[22%] border-4 border-[oklch(0.72_0.1_78)] bg-white p-[2%] shadow-[0_10px_16px_-8px_rgb(0_0_0/0.55)]">
          <div className="relative h-full w-full">{img(c)}</div>
        </div>
        <div className="absolute left-1/2 top-[63%] h-[3%] w-[16%] -translate-x-1/2 rounded-[1px] bg-[oklch(0.97_0.01_80)] shadow" />
        {/* tiny bench */}
        <div className="absolute bottom-[12%] left-1/2 h-[4%] w-[26%] -translate-x-1/2 rounded-sm bg-[oklch(0.32_0.04_40)]" />
        <div className="absolute bottom-[7%] left-[39%] h-[5%] w-[1.5%] bg-[oklch(0.32_0.04_40)]" />
        <div className="absolute bottom-[7%] right-[39%] h-[5%] w-[1.5%] bg-[oklch(0.32_0.04_40)]" />
        {/* spotlights */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_50%_30%,oklch(1_0.05_85/0.55),transparent)]" />
      </div>
    )
  }

  if (visual === "polaroid") {
    const pol = (id: string, cls: string) => (
      <div className={cn("absolute w-[52%] bg-white p-[3.5%] pb-[13%] shadow-[0_12px_24px_-10px_rgb(0_0_0/0.5)]", cls)}>
        <div className="relative aspect-square">{img(id, undefined, "(min-width:1024px) 15vw, 30vw")}</div>
        <div className="absolute -top-[5%] left-1/2 h-[9%] w-[34%] -translate-x-1/2 rotate-[-3deg] bg-[oklch(0.93_0.04_20/0.85)]" />
      </div>
    )
    return (
      <div className={cn("kraft-texture relative overflow-hidden", className)}>
        {pol(b, "left-[6%] top-[10%] -rotate-[9deg]")}
        {pol(c, "right-[5%] top-[18%] rotate-[7deg]")}
        {pol(a, "left-1/2 top-[30%] -translate-x-1/2 -rotate-[2deg]")}
      </div>
    )
  }

  return <div className={cn("relative overflow-hidden bg-muted", className)}>{img(a)}</div>
}

const LIGHTS = Array.from({ length: 18 }, (_, i) => {
  // walk the inner perimeter of the mat
  const t = i / 18
  const side = Math.floor(t * 4)
  const f = (t * 4) % 1
  const pos = [
    { left: `${4 + f * 92}%`, top: "3%" },
    { left: "96%", top: `${4 + f * 92}%` },
    { left: `${96 - f * 92}%`, top: "96.5%" },
    { left: "3%", top: `${96 - f * 92}%` },
  ][side]
  return { ...pos, delay: `${(i * 0.37) % 2.4}s` }
})

function FairyLights() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {LIGHTS.map((l, i) => (
        <span
          key={i}
          className="absolute size-[5px] -translate-x-1/2 -translate-y-1/2 animate-twinkle rounded-full bg-[oklch(0.97_0.08_90)] shadow-[0_0_6px_2px_oklch(0.88_0.14_80/0.9)]"
          style={{ left: l.left, top: l.top, animationDelay: l.delay }}
        />
      ))}
    </div>
  )
}
