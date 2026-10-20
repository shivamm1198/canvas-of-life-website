import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="paper-grain flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-hand text-3xl text-rose">oops — this page got lost in the mail</p>
      <h1 className="mt-2 font-display text-8xl text-wine">404</h1>
      <p className="mt-4 max-w-md text-muted-foreground">The page you’re looking for doesn’t exist, but plenty of handmade gifts do.</p>
      <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 rounded-full px-7")}>
        Back to the shop
      </Link>
    </div>
  )
}
