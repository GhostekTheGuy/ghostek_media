"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const leftImageY = useTransform(scrollYProgress, [0, 1], [120, -120])
  const rightImageY = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const bottomImageY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rightBottomImageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const textY = useTransform(scrollYProgress, [0.2, 0.6], [20, 0])

  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headerY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])

  const textPart1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  const textPart2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const textPart3Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])

  const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0.4, 0.48], [20, 0])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black py-20 relative overflow-hidden" id="about">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full bg-gradient-radial from-red-500/10 to-transparent h-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-start mb-16">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <h1 className="text-white text-lg font-light tracking-wider">[ABOUT]</h1>
          </motion.div>

          <motion.div style={{ opacity: headerOpacity, y: headerY }} className="max-w-xs text-right">
            <p className="text-white text-sm font-light leading-relaxed">
              Design and development have always been more than skills — they're instinct.
            </p>
          </motion.div>
        </div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: leftImageY }}
            className="absolute left-0 top-0 w-80 h-96"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rLPCcRRyohHLNDEAJzlNZLWEqAUjgk.png"
              alt="Portrait with dramatic lighting"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: bottomImageY }}
            className="absolute left-4 bottom-0 w-48 h-64"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0WxaYxD4DRrqfjAkSf5JXljQMrznyg.png"
              alt="Portrait in casual setting"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: rightImageY }}
            className="absolute right-0 top-8 w-64 h-80"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2MDKu22jTS5sxRkfUc4dUJYRP0JFUD.png"
              alt="Portrait with sunglasses"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: rightBottomImageY }}
            className="absolute right-16 bottom-4 w-56 h-72"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QggPtCkMr563w3DTSE8isHOpAbDM8X.png"
              alt="Artistic moody portrait"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div style={{ y: textY }} className="text-center max-w-2xl mx-auto px-8">
            <h2 className="text-white text-3xl font-light leading-tight mb-12 md:text-4xl">
              <motion.span style={{ opacity: textPart1Opacity }}>
                {
                  "I'm Hubert Kolejko, a Product Designer & Full Stack Developer. In addition to my graphic design background, I also develop fullstack applications,"
                }
              </motion.span>
              <motion.span style={{ opacity: textPart2Opacity }}>
                {
                  " combining my eye for detail with technical skills in frontend and backend development. This blend of creativity and coding allows me to"
                }
              </motion.span>
              <motion.span style={{ opacity: textPart3Opacity }}>
                {" build visually appealing and user-friendly digital experiences that truly connect with users."}
              </motion.span>
            </h2>

            <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
              <Button href="/works">SEE MY WORKS</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
