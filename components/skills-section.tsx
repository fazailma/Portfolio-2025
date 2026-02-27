"use client"

import { Card } from "@/components/ui/card"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 82 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
      ],
    },
    {
      title: "Design",
      skills: [
        { name: "UI/UX Design", level: 90 },
        { name: "Figma", level: 92 },
        { name: "Adobe XD", level: 85 },
        { name: "Prototyping", level: 88 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git / GitHub", level: 93 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 82 },
        { name: "Agile", level: 88 },
      ],
    },
  ]

  const titleColors = ["text-word-purple", "text-word-blue", "text-word-orange", "text-word-green"]

  return (
    <section id="skills" className="py-24" data-reveal>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
              <span>Skills</span> <span>&amp;</span> <span>Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow reveal"
                data-reveal
                data-reveal-delay={(index % 2 ? 200 : 100).toString()}
              >
                <h3 className={`text-2xl font-bold mb-6 ${titleColors[index]}`}>{category.title}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="bar-soft transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
