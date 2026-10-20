import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { getCategory, getProduct, products, related } from "@/lib/products"
import { unsplash } from "@/lib/format"
import { site } from "@/lib/site"
import { ProductGallery } from "./product-gallery"
import { ProductConfigurator } from "./product-configurator"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug)
  if (!p) return {}
  return {
    title: p.name,
    description: `${p.tagline}. ${p.description}`,
    openGraph: { title: p.name, description: p.tagline, images: [unsplash(p.images[0], 1200)] },
  }
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug)
  if (!p) notFound()
  const cat = getCategory(p.category)!

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map((i) => unsplash(i, 1200)),
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="py-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-maroon">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/shop?category=${cat.id}`} className="hover:text-maroon">{cat.name}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery product={p} />
        <ProductConfigurator product={p} />
      </div>

      <section className="mt-28">
        <p className="font-hand text-2xl text-rose">you might also love</p>
        <h2 className="text-4xl font-medium text-wine">More handmade gifts</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related(p).map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </section>
    </div>
  )
}
