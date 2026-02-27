"use client"
import { useEffect, useRef, useState } from "react"

export function BackgroundDecor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const spacing = 28 // jarak antar titik
    const dotSize = 1.3 // ukuran titik lebih kecil
    const baseColor = "rgba(0,0,0,0.08)" // titik abu sangat lembut
    const hoverColor = "rgba(100,150,255,0.9)" // warna biru lembut saat dekat kursor

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          const intensity = Math.max(0, 1 - distance / maxDistance)

          const r = 100
          const g = 150
          const b = 255
          const a = 0.15 + intensity * 0.7

          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fillStyle = distance < maxDistance ? `rgba(${r},${g},${b},${a})` : baseColor
          ctx.fill()
        }
      }
    }

    const animate = () => {
      drawDots()
      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
    }
  }, [mouse])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-white"
      style={{ display: "block" }}
    />
  )
}
