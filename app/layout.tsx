import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BackgroundDecor } from "@/components/background-decor"
import { ScrollRevealProvider } from "@/components/scroll-reveal-provider"
import { Suspense } from "react"
import { Poppins } from "next/font/google"

export const metadata: Metadata = {
  title: "Modern Portfolio - Creative Developer & Designer",
  description: "A modern and creative portfolio showcasing innovative projects and skills",
  generator: "fazailma",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${poppins.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div />}>
          <BackgroundDecor />
          <ScrollRevealProvider />
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
