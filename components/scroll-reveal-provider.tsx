"use client"

import { useEffect } from "react"

export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Intersection Observer setup
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          const repeat = target.hasAttribute("data-reveal-repeat")

          if (entry.isIntersecting) {
            target.classList.add("is-visible")
            if (!repeat) io.unobserve(target)
          } else if (repeat) {
            target.classList.remove("is-visible")
          }
        })
      },
      {
        threshold: 0.15, // 15% visible baru animasi aktif
        rootMargin: "0px 0px -10% 0px", // sedikit offset biar lebih smooth
      },
    )

    // Fungsi untuk setup elemen baru
    const setup = (el: HTMLElement) => {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal")
      }
      const delay = el.getAttribute("data-reveal-delay")
      if (delay) el.style.transitionDelay = `${parseInt(delay)}ms`
      io.observe(el)
    }

    // Inisialisasi elemen awal
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    elements.forEach(setup)

    // Observe node baru yang ditambahkan ke DOM
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return

          if (node.matches?.("[data-reveal]")) setup(node)
          node.querySelectorAll?.("[data-reveal]")?.forEach((child) => setup(child as HTMLElement))
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
