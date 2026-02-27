"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "fazaululilma@gmail.com", link: "fazaululilma@gmail.com" },
    { icon: Phone, label: "Phone", value: "087816328168", link: "087816328168" },
    { icon: MapPin, label: "Location", value: "Surabaya", link: "#" },
  ]

  const socialLinks = [
    { icon: Github, link: "https://github.com/fazailma", label: "GitHub" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/faza-ulul-ilma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { icon: Instagram, link: "https://www.instagram.com/fzlmzaa?igsh=ZHdjaXh6ZDIwaG9p", label: "Instagram" },
  ]

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-gray-50 text-gray-900"
      data-reveal
    >
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Get In Touch</h2>
        <p className="text-gray-500 mb-12 max-w-xl mx-auto">
          Have a project in mind or just want to say hello? Let’s create something meaningful together.
        </p>

        <Card className="p-8 md:p-10 rounded-2xl shadow-md border border-gray-200 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="name"
                placeholder="Your name"
                className="rounded-xl border-gray-300 focus:border-black focus:ring-black"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              /> 
              <Input
                id="email"
                type="email"
                placeholder="email"
                className="rounded-xl border-gray-300 focus:border-black focus:ring-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Textarea
              id="message"
              placeholder="Write your message..."
              rows={5}
              className="rounded-xl border-gray-300 focus:border-black focus:ring-black"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            {/* Button dengan gaya elegan hitam-putih */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Send Message
            </Button>
          </form>
        </Card>

        <div className="mt-16 flex flex-col md:flex-row justify-center gap-10 text-center">
          {contactInfo.map((info, i) => (
            <a
              key={i}
              href={info.link}
              className="flex items-center justify-center gap-3 text-gray-600 hover:text-black transition-colors"
            >
              <info.icon className="w-5 h-5" />
              <span className="text-sm md:text-base">{info.value}</span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-5">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.link}
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12">
          © 2025 Portfolio — Created by fazailma.
        </p>
      </div>
    </section>
  )
}
