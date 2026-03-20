"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

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

  const ctaColor = useTransform(scrollYProgress, [0.42, 0.55], ["#ffffff", "#ef4444"])

  const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0.4, 0.48], [20, 0])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black py-32 relative overflow-hidden" id="about">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full bg-gradient-radial from-red-500/10 to-transparent h-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-start mb-16">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <div className="text-white/30 text-sm tracking-wider">
              <p>001</p>
              <p>about</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: headerOpacity, y: headerY }} className="max-w-xs text-right">
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Design and development have always been more than skills - they're instinct.
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
            className="absolute left-0 top-0 w-80 h-96 hidden md:block"
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
            className="absolute left-4 bottom-0 w-48 h-64 hidden md:block"
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
            className="absolute right-0 top-8 w-64 h-80 hidden md:block"
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
            className="absolute right-16 bottom-4 w-56 h-72 hidden md:block"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QggPtCkMr563w3DTSE8isHOpAbDM8X.png"
              alt="Artistic moody portrait"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <div className="md:hidden flex flex-col items-center space-y-8 px-4">
            <div className="relative flex items-center justify-center">
              {/* Orbiting Circles - behind image */}
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <OrbitingCircles iconSize={16} radius={120} speed={1.2} path>
                  <img src="/icons/figma.svg" alt="Figma" className="w-full h-full" />
                  <img src="/icons/claude.svg" alt="Claude" className="w-full h-full" />
                  <img src="/icons/photoshop.png" alt="Photoshop" className="w-full h-full rounded-md" />
                  <img src="/icons/spline.webp" alt="Spline" className="w-full h-full rounded-md" />
                  <img src="/icons/react.png" alt="React" className="w-full h-full" />
                </OrbitingCircles>
                <OrbitingCircles iconSize={14} radius={170} reverse speed={0.8} path>
                  <img src="/icons/Adobe_Illustrator_CC_icon.svg.png" alt="Illustrator" className="w-full h-full rounded-md" />
                  <img src="/icons/DaVinci-Resolve-Studio.png" alt="DaVinci Resolve" className="w-full h-full rounded-md" />
                  <img src="/icons/supabase.webp" alt="Supabase" className="w-full h-full rounded-md" />
                  <img src="/icons/Warstwa 1.png" alt="Warstwa" className="w-full h-full" />

                  <img src="/icons/blender.png" alt="Blender" className="w-full h-full" />
                </OrbitingCircles>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-64 h-80 relative z-[1]"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rLPCcRRyohHLNDEAJzlNZLWEqAUjgk.png"
                  alt="Portrait with dramatic lighting"
                  className="w-full h-full object-cover shadow-2xl rounded-lg"
                />
              </motion.div>
            </div>

            <div className="text-justify max-w-sm">
              <h2 className="text-white text-lg font-light leading-relaxed mb-6">
                <motion.span style={{ opacity: textPart1Opacity }}>
                  {"I'm Hubert Kolejko - I design and build digital products that people actually want to use."}
                </motion.span>
                <motion.span style={{ opacity: textPart2Opacity }}>
                  {" From pixel-perfect interfaces to full-stack applications, I bridge the gap between creative vision and technical execution."}
                </motion.span>
                <motion.span style={{ opacity: textPart3Opacity, color: ctaColor }}>
                  {" Let's turn your idea into something real."}
                </motion.span>
              </h2>

              <motion.div style={{ opacity: buttonOpacity, y: buttonY }} className="flex justify-center">
                <Button href="/works">SEE MY WORKS</Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            style={{ y: textY }}
            className="text-justify max-w-2xl mx-auto px-4 md:px-8 relative hidden md:block"
          >
            {/* Orbiting Circles - behind text, shifted up */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none" style={{ transform: "translateY(-164px)" }}>
              <OrbitingCircles iconSize={20} radius={120} speed={1.2} path>
                <img src="/icons/figma.svg" alt="Figma" className="w-full h-full" />
                <img src="/icons/claude.svg" alt="Claude" className="w-full h-full" />
                <img src="/icons/photoshop.png" alt="Photoshop" className="w-full h-full rounded-md" />
                <img src="/icons/spline.webp" alt="Spline" className="w-full h-full rounded-md" />
                <img src="/icons/react.png" alt="React" className="w-full h-full" />
              </OrbitingCircles>
              <OrbitingCircles iconSize={17} radius={220} reverse speed={0.8} path>
                <img src="/icons/Adobe_Illustrator_CC_icon.svg.png" alt="Illustrator" className="w-full h-full rounded-md" />
                <img src="/icons/DaVinci-Resolve-Studio.png" alt="DaVinci Resolve" className="w-full h-full rounded-md" />
                <img src="/icons/supabase.webp" alt="Supabase" className="w-full h-full rounded-md" />
                <img src="/icons/Warstwa 1.png" alt="Warstwa" className="w-full h-full" />
                <img src="/icons/aws.png" alt="AWS" className="w-full h-full rounded-md" />
                <img src="/icons/blender.png" alt="Blender" className="w-full h-full" />
              </OrbitingCircles>
            </div>

            {/* Gradient overlay - covers orbits but not text */}
            <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black via-black/80 to-transparent" />

            <div className="relative z-10 py-8 md:py-0">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-8 md:mb-12">
                <motion.span style={{ opacity: textPart1Opacity }}>
                  {"I'm Hubert Kolejko - I design and build digital products that people actually want to use."}
                </motion.span>
                <motion.span style={{ opacity: textPart2Opacity }}>
                  {" From pixel-perfect interfaces to full-stack applications, I bridge the gap between creative vision and technical execution."}
                </motion.span>
                <motion.span style={{ opacity: textPart3Opacity, color: ctaColor }}>
                  {" Let's turn your idea into something real."}
                </motion.span>
              </h2>

              <motion.div style={{ opacity: buttonOpacity, y: buttonY }} className="flex justify-center">
                <Button href="/works">SEE MY WORKS</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

