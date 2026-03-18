"use client"

import { motion } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiFramer,
  SiVercel,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiStripe,
  SiSupabase,
  SiBlender,
  SiNotion,
} from "react-icons/si"

const tools = [
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiFramer, name: "Framer", color: "#0055FF" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
  { icon: SiSupabase, name: "Supabase", color: "#3FCF8E" },
  { icon: SiStripe, name: "Stripe", color: "#635BFF" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiGithub, name: "GitHub", color: "#ffffff" },
  { icon: SiBlender, name: "Blender", color: "#F5792A" },
  { icon: SiNotion, name: "Notion", color: "#ffffff" },
]

export default function ToolsSection() {
  return (
    <section className="relative bg-black py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-red-500 text-sm uppercase tracking-[0.3em] mb-4"
          >
            Tools & Technologies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            My toolkit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/50 text-base md:text-lg"
          >
            The design and development tools I use daily to bring ideas to life.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 md:gap-4"
        >
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="group relative aspect-square rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] flex items-center justify-center shadow-md shadow-black/20 hover:bg-white/[0.07] hover:ring-white/[0.15] transition-all duration-300 cursor-default"
              >
                <Icon
                  className="transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  size={24}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as SVGElement).style.color = tool.color
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as SVGElement).style.color = "rgba(255,255,255,0.5)"
                  }}
                />
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <span className="text-[10px] text-white/70 whitespace-nowrap bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
                    {tool.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
