"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [active, setActive] = useState<string>("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (!mounted) return
    
    const sections = ["hero", "about", "projects", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
    )

    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [mounted])

  useLayoutEffect(() => {
    if (!mounted) return
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${scrolled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-95"}`}
      suppressHydrationWarning
    >
      {/* === NAVBAR UTAMA === */}
      <div
        className={`flex items-center justify-between rounded-full px-8 py-3 border transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${
                      scrolled
                        ? "bg-white/60 backdrop-blur-xl border-white/40 shadow-lg"
                        : "bg-transparent backdrop-blur-0 border-transparent shadow-none"
                    }`}
        suppressHydrationWarning
      >
        {/* === LOGO === */}
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-semibold tracking-wide flex items-center gap-2 transition-all duration-500 hover:opacity-90"
          suppressHydrationWarning
        >
          <span className="font-light">My</span>
          <span className="font-bold">Portfolio</span>
        </button>

        {/* === RUANG KOSONG DI TENGAH === */}
        <div className="flex-1"></div>

        {/* === DESKTOP MENU === */}
        <div className="hidden md:flex items-center gap-5">
          {[
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === id
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:text-black hover:bg-black/5"
              }`}
              suppressHydrationWarning
            >
              {label}
            </button>
          ))}
        </div>

        {/* === MENU MOBILE TOGGLE === */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full ml-3"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* === MOBILE MENU === */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-lg shadow-md flex flex-col gap-3 transition-all duration-500">
          {[
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`text-sm font-medium text-left transition-all ${
                active === id
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
              suppressHydrationWarning
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
