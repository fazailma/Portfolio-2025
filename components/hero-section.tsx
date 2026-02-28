"use client"

import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamic import untuk komponen 3D Lanyard
const Lanyard = dynamic(() => import("@/app/components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Loading 3D...</div>
    </div>
  ),
})

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToprojects = () => {
    const element = document.getElementById("projects")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-visible pt-0 md:pt-8 -mt-26"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* === KIRI: TEKS === */}
          <div className="max-w-2xl mt-0">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance heading-gradient"
              data-reveal
            >
              <span className="block">Hi there!</span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-1">
                Thanks for visiting
              </span>
            </h2>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-6 italic"
              data-reveal
              data-reveal-delay="100"
            >
              "The best way to predict the future is to create it."
            </p>

            <p
              className="text-base md:text-lg text-muted-foreground/90 mb-8"
              data-reveal
              data-reveal-delay="200"
            >
              I’m an Informatics Engineering student interested in design, 
              development, and system analysis. I enjoy turning ideas into practical 
              digital solutions that are both intuitive and functional.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
              data-reveal
              data-reveal-delay="300"
            >
              <Button
               size="lg"
                variant="outline"
                onClick={scrollToprojects}
                className="text-lg px-8 py-3 rounded-full border border-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                View Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="text-lg px-8 py-3 rounded-full border border-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* === KANAN: LANYARD (3D) === */}
          <div className="hidden lg:block relative lg:h-auto flex justify-center items-center overflow-visible">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              }
            >
              <Lanyard position={[0, 1.2, 20]} fov={14} transparent />
            </Suspense>
          </div>
        </div>

        {/* Scroll Cue (Desktop) */}
        <div
          className="hidden lg:flex mt-8 absolute bottom-8 left-1/2 -translate-x-1/2"
          data-reveal
          data-reveal-delay="400"
          data-reveal-repeat
        >
          <button
            onClick={scrollToAbout} // sekarang benar mengarah ke about
            aria-label="Scroll to about section"
            className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full glass-soft hover:shadow-lg transition-all"
          >
            <span className="relative block h-6 w-4 rounded-[1rem] border border-border/60 bg-background/60">
              <span className="absolute left-1/2 top-1 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-muted-foreground/80 scroll-dot" />
            </span>
            <span className="text-sm text-muted-foreground">Scroll</span>
          </button>
        </div>
      </div>
    </section>
  )
}
