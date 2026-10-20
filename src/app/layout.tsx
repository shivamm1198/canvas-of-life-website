import type { Metadata, Viewport } from "next"
import { Caveat, DM_Sans, Fraunces } from "next/font/google"
import "./globals.css"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { CartSheet } from "@/components/site/cart-sheet"
import { WhatsAppFab } from "@/components/site/whatsapp-fab"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { site } from "@/lib/site"

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["SOFT", "opsz"] })
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" })
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" })

export const metadata: Metadata = {
  metadataBase: new URL("https://canvasoflife.in"),
  title: {
    default: `${site.name} — Handmade Scrapbooks, LED Frames & Hampers | Mumbai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "handmade gifts Mumbai",
    "LED photo frame",
    "miniature frame",
    "scrapbook",
    "customised hamper",
    "Diwali corporate gifts",
    "retirement gift police officer",
  ],
  openGraph: {
    title: `${site.name} by ${site.founder}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
  },
}

export const viewport: Viewport = { themeColor: "#3a1a20" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body className="min-h-dvh">
        <TooltipProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSheet />
          <WhatsAppFab />
          <Toaster theme="light" position="top-center" richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}
