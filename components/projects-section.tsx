"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Figma } from "lucide-react"

export function ProjectsSection() {
  const [filter, setFilter] = useState("all")

  const projects = [
    {
      title: "Bomboskuy - Bomboloni Ordering Website",
      category: "web",
      description:
        "A self-service web app for ordering Bomboloni with various flavors. Customers can browse the menu, place orders online, and receive an order receipt for payment and pickup at the store, making the process fast and convenient.",
      image: "/assets/foto7.jpg",
      tags: ["php", "laravel", "css", "javascript"],
      link: "https://bomboskuy.vercel.app/",
      github: "https://github.com/bomboskuy/bomboskuy",
    },
    {
      title: "Ameza - Online Clothing Store",
      category: "web",
      description:
        "An online platform for buying tops and bottoms, featuring a unique mix-and-match tool that lets customers virtually combine outfits from product photos. Users can explore styles, create combinations, and shop seamlessly.",
      image: "/assets/foto8.jpg",
      tags: ["html", "css", "javascript"],
      github: "https://github.com/fazailma/Ameza-Website",
      link: "https://fazailma.github.io/Ameza-Website/",
    },
    {
      title: "Memora - Online Notes & Calendar App",
      category: "mobile",
      description:
        "An application for taking notes and managing tasks with an integrated calendar. Users can create notes, set reminders for deadlines, and organize their schedules efficiently.",
      image: "/assets/foto9.jpg",
      tags: ["html", "css", "javascript", "react"],
      link: "https://github.com/fazailma/Notes-apk",
      github: "https://github.com/fazailma/Notes-apk",
    },
    {
      title: "Stuby - Online Study & Notes App",
      category: "ui/ux",
      description:
        "A learning platform app where users can take online notes, share them, and chat with friends for collaborative studying.",
      image: "/assets/foto10.jpg",
      tags: ["Figma", "UI Design", "UX Design", "Prototyping"],
      link: "https://www.figma.com/proto/RbWYKBmkRbFVjV0Xomu1tJ/ui-ux?node-id=2008-2&starting-point-node-id=2008%3A2",
      figma: "https://www.figma.com/design/RbWYKBmkRbFVjV0Xomu1tJ/ui-ux?node-id=2006-70&t=VDwbyVC3HIyhurW2-0",
    },
    {
      title: "Restore - Recycled Products E-Commerce",
      category: "ui/ux",
      description:
        "A platform for selling upcycled and recycled products, such as wall decorations made from straws, promoting sustainable shopping.",
      image: "/assets/foto11.jpg",
      tags: ["Figma", "UI Design", "UX Design", "Prototyping"],
      link: "https://www.figma.com/proto/6q7v8WKRZuIQmwqwVcEC1Z/Untitled--Copy-?node-id=4-4&starting-point-node-id=4%3A4",
      figma: "https://www.figma.com/design/RbWYKBmkRbFVjV0Xomu1tJ/ui-ux?node-id=2006-70&t=VDwbyVC3HIyhurW2-0",
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "ui/ux", label: "UI/UX" },
  ]

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="py-24 bg-muted/30" data-reveal>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
              <span>Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work showcasing various skills and
              technologies.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={`rounded-2xl px-5 py-2 transition-all ${
                  filter === category.id
                    ? "bg-black text-white border-black"
                    : "border border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                data-reveal
              >
                {/* Image + Hover Overlay */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center gap-3 pb-4">
                    {/* View Button */}
                    {project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-black hover:text-white transition-all rounded-2xl flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </Button>
                      </a>
                    ) : (
                      <Button
                        size="sm"
                        disabled
                        className="bg-gray-300 text-gray-500 rounded-2xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Button>
                    )}

                    {/* Code or Figma Button */}
                    {project.category === "ui/ux" ? (
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-[#F24E1E] hover:text-white transition-all rounded-2xl flex items-center gap-2"
                        >
                          <Figma className="w-4 h-4" />
                          Figma
                        </Button>
                      </a>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-black hover:text-white transition-all rounded-2xl flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* Deskripsi Konten */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-muted text-foreground/80 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
