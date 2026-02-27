"use client";

import React, { useEffect, useRef } from "react";
import { BookOpen, Target, Star, Heart } from "lucide-react";

export function ReflectionsSection() {
  const reflections = [
    {
      icon: <BookOpen className="w-6 h-6 text-gray-800" />,
      title: "Learning Journey",
      desc: "During my studies as a Informatics Engineering student, I explored various fields of technology such as web development, application development, databases, computer networks, and ui/ux design. I learned how to turn ideas into real digital products through practical projects and collaboration with others.",
    },
    {
      icon: <Target className="w-6 h-6 text-gray-800" />,
      title: "Challenges",
      desc: "At first, understanding complex programming logic and system architecture was quite challenging. However, by practicing regularly and working together with classmates, I gradually improved my problem-solving and coding skills.",
    },
    {
      icon: <Star className="w-6 h-6 text-gray-800" />,
      title: "Highlights",
      desc: "Through several projects, I discovered that I especially enjoy the creative side of technology — designing interfaces and improving user experiences. Working on web projects allowed me to combine logic with visual design, which became my favorite part of the process.",
    },
    {
      icon: <Heart className="w-6 h-6 text-gray-800" />,
      title: "Reflections",
      desc: "Overall, my university journey taught me many technical skills, but it also helped me realize my passion for UI/UX design and front-end development. I hope to keep growing in this area and create digital experiences that are both functional and enjoyable for users.",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>(".ref-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const idx = Number(el.dataset.index ?? 0);
            // staggered reveal
            setTimeout(() => {
              el.classList.add("is-visible");
            }, idx * 160);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="reflections" className="py-24 bg-gradient-to-b from-gray-50/60 to-transparent" data-reveal>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-gradient">
            <span>Reflections</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A brief reflection on my learning journey, challenges, and highlights throughout university.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {reflections.map((item, i) => (
            <article
              key={i}
              data-index={i}
              className="ref-card rounded-2xl p-6 flex flex-col items-center text-center bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
            >
              <div className="ref-deco w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-gray-100">
                {item.icon}
              </div>

              <div className="w-10 h-1 mb-4 rounded-full bg-gradient-to-r from-indigo-400" />

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* CSS for reveal + subtle decorations */}
      <style jsx>{`
        .ref-card {
          opacity: 0;
          transform: translateY(22px) scale(0.995);
          transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 320ms;
        }

        .ref-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* small responsive tweak for better spacing on narrow screens */
        @media (max-width: 640px) {
          .ref-card {
            padding: 1rem;
          }
        }

        /* decorative subtle hover for icon */
        .ref-card:hover .ref-deco {
          background: rgba(243, 244, 246, 1);
          transform: translateY(-4px);
          transition: transform 300ms, background 300ms;
        }
      `}</style>
    </section>
  );
}
