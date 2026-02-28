"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { PlayCircle, Linkedin } from "lucide-react"

export function AboutSection() {
  const images = [
    { src: "/assets/foto6.jpg", alt: "Portfolio preview card" },
    { src: "/assets/foto5.jpg", alt: "Portfolio preview card" },
    { src: "/assets/foto1.jpg", alt: "Creative portfolio screenshot" },
    { src: "/assets/foto3.jpg", alt: "Mobile & web design preview" },
    { src: "/assets/foto4.jpg", alt: "Mobile & web design preview" },
    { src: "/assets/foto2.jpg", alt: "Mobile & web design preview" },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const startXRef = useRef<number | null>(null)
  const isPointerDownRef = useRef(false)

  const next = () => setActiveIndex((i) => (i + 1) % images.length)
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true
    startXRef.current = e.clientX
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || startXRef.current == null) return
    const deltaX = e.clientX - startXRef.current
    const threshold = 40
    if (deltaX > threshold) prev()
    else if (deltaX < -threshold) next()
    isPointerDownRef.current = false
    startXRef.current = null
  }

  const order = [0, 1, 2].map((offset) => (activeIndex + offset) % images.length)
  const presets = [
    { y: 0, rotate: -3, scale: 1, z: 50 },
    { y: 14, rotate: 2, scale: 0.97, z: 40 },
    { y: 28, rotate: -4, scale: 0.94, z: 30 },
  ]

  // Typing effect
  const fullText =
    "Hi, I’m Faza Ulul Ilma, an Informatics Engineering student at Airlangga University. I’m interested in building digital solutions through a combination of design thinking, web development, and system understanding. I enjoy turning ideas into structured, functional, and user-friendly experiences that create real impact."
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    let i = 0
    const speed = 41
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="about"
      className="relative mt-24 py-20 scroll-mt-40 flex justify-center"
      data-reveal
    >
      <div className="border-[1.5px] border-black rounded-xl max-w-6xl w-full mx-4 md:mx-8 px-8 md:px-16 py-20 flex flex-col justify-center bg-background/70 backdrop-blur-sm">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* FOTO */}
          <div
            className="relative mx-auto w-full max-w-sm h-[min(55vh,280px)] select-none touch-pan-x cursor-pointer group"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            role="region"
            aria-label="Photo stack"
            onClick={() => next()}
          >
            {/* Overlay teks hover — dibuat transparan agar foto tetap kelihatan */}
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <span className="text-white text-sm md:text-base font-medium drop-shadow">
                Click to see next photo →
              </span>
            </div>

            {order.map((idx, i) => {
              const p = presets[i]
              const img = images[idx]
              return (
                <div
                  key={img.src}
                  className="absolute inset-0 rounded-xl overflow-hidden ring-1 ring-gray-200 transition-transform duration-300 ease-out shadow-md"
                  style={{
                    transform: `translateY(${p.y}px) rotate(${p.rotate}deg) scale(${p.scale})`,
                    zIndex: p.z,
                  }}
                >
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    className="h-full w-full object-cover brightness-105 saturate-110 transition-all duration-500"
                    draggable={false}
                  />
                </div>
              )
            })}
          </div>

          {/* TEKS */}
          <div className="max-w-lg mx-auto text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight heading-gradient mb-4">
              <span>About</span> <span>Me</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {typedText}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-6">
              <Button
                asChild
                className="flex items-center gap-2 bg-foreground text-background hover:bg-black hover:text-white rounded-full px-6 py-3 transition-colors duration-300"
              >
                <a
                  href="https://youtu.be/Iaw9pknFYDM?si=KFMCeyrjMiJ5xEnE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayCircle className="w-4 h-4" />
                  Introduction Video
                </a>
              </Button>

              <Button
                asChild
                className="flex items-center gap-2 border border-foreground text-foreground bg-background hover:bg-foreground hover:text-background rounded-full px-6 py-3 transition-colors duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/faza-ulul-ilma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
