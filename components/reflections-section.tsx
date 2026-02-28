"use client";

import React, { useEffect, useRef, useState } from "react";
import { Users, Award, Briefcase, Star, ChevronLeft, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({});

  const experiences = [
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Media & Information Staff - BEM Universitas Airlangga",
      period: "2025",
      description: "Contributed to the Media & Information division by designing digital visual content to support organizational branding and event publications.",
      images: ["/assets/bem1.jpg", "/assets/bem1b.jpg", "/assets/bem1c.jpg"],
      achievements: [
        "Designed Instagram feeds for campus programs and events",
        "Created digital certificates for participants and committees",
        "Maintained visual consistency across published content"
      ],
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Media Creative Staff - BEM Vokasi Universitas Airlangga",
      period: "2024",
      description: "Handled visual content production for organizational publications and digital campaigns.",
      images: ["/assets/vokasi1.jpg", "/assets/vokasi2.jpg"],
      achievements: [
        "Designed Instagram feed content for organizational programs",
        "Created YouTube cover designs for official publications",
        "Supported branding through consistent visual layouts"
      ],
    }
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>(".exp-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const idx = Number(el.dataset.index ?? 0);
            setTimeout(() => {
              el.classList.add("is-visible");
            }, idx * 150);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  const nextImage = (index: number) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: ((prev[index] || 0) + 1) % experiences[index].images.length,
    }));
  };

  const prevImage = (index: number) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: ((prev[index] || 0) - 1 + experiences[index].images.length) % experiences[index].images.length,
    }));
  };

  return (
    <section id="experience" className="py-20 bg-white" data-reveal>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 heading-gradient">
            <span>Experience & Involvement</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            My journey in organizational leadership and community building.
          </p>
        </div>

        {/* Grid 2 kolom */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {experiences.map((item, i) => {
            const currentImageIndex = currentImageIndices[i] || 0;
            const currentImage = item.images[currentImageIndex];

            return (
              <article
                key={i}
                data-index={i}
                className="exp-card rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image Carousel */}
                <div className="relative w-full h-48 bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden group">
                  <img
                    src={currentImage || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Buttons */}
                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(i)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => nextImage(i)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {currentImageIndex + 1} / {item.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-xs text-indigo-600 font-medium">{item.period}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                    {item.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* CSS untuk reveal animation */}
      <style jsx>{`
        .exp-card {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .exp-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </section>
  );
}
