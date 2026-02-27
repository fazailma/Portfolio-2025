import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { CVSection } from "@/components/cv-section"
import { ReflectionsSection } from "@/components/reflections-section"

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="mt-[72px]">
        <HeroSection />
        <AboutSection />
        <CVSection />
        <ProjectsSection />
        <ReflectionsSection />
        <ContactSection />
      </main>
    </>
  )
}
