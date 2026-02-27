"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function CVSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center py-16 bg-gradient-to-b from-gray-50/50 to-transparent overflow-visible"
    >
      {/* Tulisan vertikal kiri */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2 text-gray-500 tracking-widest uppercase text-sm font-semibold select-none">
        {Array.from("My Portfolio").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>

      {/* Garis kanan */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3">
        <div className="w-[2px] h-20 bg-gradient-to-b from-gray-300 to-gray-100 rounded-full" />
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-200 rounded-full" />
      </div>

      {/* Tali gantung */}
      <div className="relative w-full flex justify-center z-30">
        <img
          src="/assets/tali.png"
          alt="Tali gantung"
          className={`absolute top-[-180px] w-[180px] md:w-[220px] object-contain ${
            isVisible ? "animate-rope-drop" : "opacity-0 translate-y-[-120px]"
          }`}
          draggable={false}
        />
      </div>

      {/* Kertas CV */}
      <div
        className={`relative -mt-3 z-20 origin-top shadow-lg shadow-gray-300/50 rounded-md transition-all duration-700 ${
          isVisible
            ? "animate-paper-drop"
            : "opacity-0 translate-y-[-100px] scale-[0.95]"
        }`}
      >
        <img
          src="/assets/cv.jpg"
          alt="CV Faza"
          className="w-[900px] md:w-[400px] border border-gray-300 bg-white rounded-md"
          draggable={false}
        />
      </div>

      {/* Tombol Download */}
      <div
        className={`mt-6 z-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Button
          asChild
          className="flex items-center gap-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 rounded-2xl"
        >
          <a href="/assets/CV ATS.pdf" download="CV_Faza_Ulul_Ilma.pdf">
            <Download className="w-4 h-4" />
            Download CV (PDF)
          </a>
        </Button>
      </div>

      {/* Animasi tali & kertas */}
      <style jsx>{`
        @keyframes ropeDrop {
          0% {
            opacity: 0;
            transform: translateY(-120px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes paperDropSmooth {
          0% {
            opacity: 0;
            transform: translateY(-150px) rotate(-1deg);
          }
          60% {
            opacity: 1;
            transform: translateY(10px) rotate(1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes paperSwing {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        .animate-rope-drop {
          animation: ropeDrop 1.2s ease-out forwards;
        }

        .animate-paper-drop {
          animation: paperDropSmooth 1.3s ease-out 0.9s forwards,
            paperSwing 5s ease-in-out 2.3s infinite;
        }
      `}</style>
    </section>
  )
}
