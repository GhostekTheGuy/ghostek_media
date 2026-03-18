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

  const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0.4, 0.48], [20, 0])

  return (
    <section ref={sectionRef} className="min-h-screen bg-black py-20 relative overflow-hidden" id="about">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full bg-gradient-radial from-red-500/10 to-transparent h-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 py-[41px] pb-[109px]">
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
                  <Icons.figma />
                  <Icons.nextjs />
                  <Icons.typescript />
                  <Icons.react />
                </OrbitingCircles>
                <OrbitingCircles iconSize={14} radius={170} reverse speed={0.8} path>
                  <Icons.tailwind />
                  <Icons.vercel />
                  <Icons.photoshop />
                  <Icons.illustrator />
                  <Icons.afterEffects />
                  <Icons.premierePro />
                  <Icons.github />
                  <Icons.vscode />
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

            <div className="text-center max-w-sm">
              <h2 className="text-white text-lg font-light leading-relaxed mb-6">
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
            </div>
          </div>

          <motion.div
            style={{ y: textY }}
            className="text-center max-w-2xl mx-auto px-4 md:px-8 relative hidden md:block"
          >
            {/* Orbiting Circles - behind text, shifted up */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none" style={{ transform: "translateY(-264px)" }}>
              <OrbitingCircles iconSize={20} radius={120} speed={1.2} path>
                <Icons.figma />
                <Icons.nextjs />
                <Icons.typescript />
                <Icons.react />
              </OrbitingCircles>
              <OrbitingCircles iconSize={17} radius={220} reverse speed={0.8} path>
                <Icons.tailwind />
                <Icons.vercel />
                <Icons.photoshop />
                <Icons.illustrator />
                <Icons.afterEffects />
                <Icons.premierePro />
                <Icons.github />
                <Icons.vscode />
              </OrbitingCircles>
            </div>

            {/* Gradient overlay - covers orbits but not text */}
            <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black via-black/80 to-transparent" />

            <div className="relative z-10 py-8 md:py-0">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-8 md:mb-12">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Icons = {
  figma: () => (
    <svg width="100" height="100" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  ),
  nextjs: () => (
    <svg width="100" height="100" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" r="87" fill="black" stroke="white" strokeWidth="6" />
        <path d="M149.508 157.52L69.142 54H54v72.48h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325z" fill="url(#paint0)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1)" />
      </g>
      <defs>
        <linearGradient id="paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  typescript: () => (
    <svg width="100" height="100" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="10" fill="#3178c6" />
      <path d="M82.69 97.9c2.3 3.73 5.7 6.48 10.24 8.27s9.43 2.69 14.65 2.69c5.08 0 9.6-.76 13.56-2.29 3.96-1.52 7.06-3.73 9.3-6.64 2.24-2.9 3.36-6.36 3.36-10.36 0-2.95-.6-5.49-1.79-7.62s-2.87-3.95-5.03-5.49c-2.16-1.53-5.6-3.2-10.31-5.01-3.52-1.35-6.3-2.52-8.32-3.52s-3.47-2.05-4.36-3.15-1.34-2.41-1.34-3.91c0-1.6.54-3.03 1.62-4.29s2.59-2.24 4.54-2.93 4.17-1.04 6.66-1.04c2.67 0 5.15.44 7.44 1.33s4.28 2.28 5.96 4.16l8.04-7.04c-2.55-2.95-5.79-5.22-9.72-6.82-3.93-1.59-8.43-2.39-13.49-2.39-4.82 0-9.1.73-12.83 2.19-3.73 1.46-6.64 3.56-8.72 6.3-2.09 2.74-3.13 5.95-3.13 9.63 0 4.53 1.54 8.24 4.62 11.12s7.72 5.24 13.93 7.08c3.72 1.08 6.65 2.15 8.79 3.22s3.68 2.24 4.62 3.52c.93 1.28 1.4 2.82 1.4 4.62 0 2.5-1.07 4.49-3.22 5.97-2.14 1.48-5.06 2.22-8.74 2.22-3.46 0-6.65-.72-9.56-2.16-2.92-1.44-5.47-3.63-7.66-6.56l-8.72 6.8zM69.33 60.74h16.67V51H36v9.74h16.67v47.73h16.67V60.74z" fill="white" />
    </svg>
  ),
  react: () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="6.5" fill="#61DAFB" />
      <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="2.5" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="#61DAFB" strokeWidth="2.5" transform="rotate(120 50 50)" />
    </svg>
  ),
  tailwind: () => (
    <svg width="100" height="100" viewBox="0 0 54 33" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4" />
    </svg>
  ),
  vercel: () => (
    <svg width="100" height="100" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
    </svg>
  ),
  framer: () => (
    <svg width="100" height="100" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14V7h7l7 7H0zM0 21V14h7l-7 7zM0 7V0h14L7 7H0z" fill="white" />
    </svg>
  ),
  github: () => (
    <svg width="100" height="100" viewBox="0 0 438.549 438.549">
      <path fill="white" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
    </svg>
  ),
  photoshop: () => (
    <svg width="100" height="100" viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="234" rx="42.5" fill="#001E36" />
      <path d="M54 164.1V75.3c0-.6.3-.9.9-.9 2.1 0 4.1-.1 6.6-.1s5.2-.1 8.2-.1c3.1 0 6.4-.1 9.9-.1 3.5 0 6.8 0 9.8.1 8.4.4 15.7 2.3 21.8 5.7 5.3 2.9 9.6 7.1 12.6 12.2 2.8 5 4.2 10.7 4.2 17.2 0 6.8-1.6 12.9-4.7 18.1-3.2 5.4-7.8 9.7-13.4 12.5-5.9 3-12.8 4.5-20.6 4.5-2.5 0-4.3 0-5.5-.1s-2.8-.1-4.8-.2v20c.1.5-.3 1-.8 1.1h-23.4c-.5 0-.8-.3-.8-1.1zm24-68.4v27.9c1.5.2 2.9.3 4.1.3h5.3c3.5 0 6.9-.6 10-2 2.7-1.2 5-3.1 6.5-5.6 1.6-2.4 2.3-5.4 2.3-8.9 0-3.2-.7-6.1-2.2-8.4-1.5-2.4-3.7-4.3-6.4-5.5-3-1.3-6.5-2-10.6-2-2.4 0-4.3 0-5.6.1-1.5.1-2.6.1-3.4.1z" fill="#31A8FF" />
      <path d="M180 138.6c-3.5-1.8-7.3-3.1-11.2-3.8-4.2-.9-8.5-1.4-12.8-1.4-2.4-.1-4.8.2-7.1.7-1.6.3-3 1-4.1 2.1-.7.8-1.1 1.9-1.1 3 0 1.1.5 2.2 1.4 3 1.7 1.5 3.7 2.7 5.8 3.5 3.3 1.4 6.8 2.8 10.3 4.3 5.7 2.2 10.9 5.2 15.5 9.1 3.5 3.2 5.5 7.8 5.4 12.5.1 4.7-1.3 9.3-3.9 13.1-2.8 3.9-6.6 6.9-11 8.7-4.9 2.1-10.9 3.2-18.1 3.2-4.5 0-9-.4-13.4-1.2-3.4-.6-6.7-1.6-9.8-3-.5-.2-.8-.7-.8-1.3v-19.2c0-.3.1-.5.3-.6.2-.1.5 0 .7.1 4 2.3 8.3 3.9 12.8 4.9 3.8 1 7.7 1.5 11.6 1.5 4 0 6.8-.5 8.4-1.4 1.5-.8 2.4-2.3 2.4-3.9 0-1.4-.8-2.8-2.3-3.9-2.2-1.6-4.6-2.9-7.1-4-3.9-1.6-7.7-3.4-11.3-5.5-4.3-2.4-7.9-5.7-10.7-9.7-2.3-3.6-3.5-7.8-3.4-12.1-.1-4.5 1.2-8.9 3.7-12.7 2.7-3.9 6.5-7 10.8-8.9 4.8-2.2 10.6-3.4 17.5-3.4 4.3 0 8.5.3 12.6.9 2.9.4 5.7 1.2 8.4 2.2.3.1.6.4.7.7.1.3.2.6.2.9v18.2c0 .3-.2.6-.4.7-.4.2-.7.1-1-.1z" fill="#31A8FF" />
    </svg>
  ),
  illustrator: () => (
    <svg width="100" height="100" viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="234" rx="42.5" fill="#330000" />
      <path d="M116.4 164.2H85.6l-6.4 20.5c-.2.6-.6.9-1.2.9H57.2c-.7 0-.9-.4-.7-1.1l27.1-80.8c.2-.7.5-1.5.7-2.4.3-1.5.5-3 .5-4.6-.1-.3.2-.6.5-.7h27.4c.5 0 .8.2.9.6l30.8 87.9c.2.7 0 1.1-.7 1.1h-23.1c-.5.1-.9-.2-1.1-.7l-6.6-20.7zm-25.3-20.4h19.5c-.5-1.8-1.2-4-2-6.5s-1.6-5.2-2.5-8.1-1.7-5.7-2.5-8.5c-.8-2.8-1.6-5.4-2.2-7.7-.6-2.3-1.1-4.2-1.5-5.7h-.1c-.6 2.9-1.5 6.1-2.6 9.6s-2.2 7.2-3.4 10.9-2.2 7.1-3.2 10.2l.5 5.8z" fill="#FF9A00" />
      <path d="M169.7 89c-3.5.1-6.8-1.2-9.3-3.6-2.5-2.5-3.8-5.8-3.7-9.3-.1-3.5 1.3-6.8 3.8-9.2 2.5-2.4 5.8-3.7 9.3-3.5 4 0 7.2 1.2 9.6 3.5s3.6 5.5 3.6 9.2c.1 3.5-1.3 6.9-3.8 9.3-2.5 2.4-5.9 3.7-9.5 3.6zm-11.5 75.4V101.5c0-.6.3-.9.9-.9h21.3c.6 0 .9.3.9.9v62.9c0 .7-.3 1-1 1h-21.1c-.7 0-1-.4-1-1.1z" fill="#FF9A00" />
    </svg>
  ),
  afterEffects: () => (
    <svg width="100" height="100" viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="234" rx="42.5" fill="#00005B" />
      <path d="M115.4 164.2H84.6l-6.4 20.5c-.2.6-.6.9-1.2.9H56.2c-.7 0-.9-.4-.7-1.1l27.1-80.8c.2-.7.5-1.5.7-2.4.3-1.5.5-3 .5-4.6-.1-.3.2-.6.5-.7h27.4c.5 0 .8.2.9.6l30.8 87.9c.2.7 0 1.1-.7 1.1h-23.1c-.5.1-.9-.2-1.1-.7l-6.7-20.7zm-25.3-20.4h19.5c-.5-1.8-1.2-4-2-6.5s-1.6-5.2-2.5-8.1-1.7-5.7-2.5-8.5c-.8-2.8-1.6-5.4-2.2-7.7-.6-2.3-1.1-4.2-1.5-5.7h-.1c-.6 2.9-1.5 6.1-2.6 9.6s-2.2 7.2-3.4 10.9-2.2 7.1-3.2 10.2l.5 5.8z" fill="#9999FF" />
      <path d="M176.9 126.3c-1.8-1-3.9-1.6-6-1.8-2.2-.4-4.4-.6-6.5-.6-1.9 0-3.8.2-5.7.5-1.1.2-2.1.5-3.1.8v39.2c1.5.5 3.5.7 6 .7 3.6.1 7.2-.7 10.3-2.5 2.9-1.7 5.3-4.2 6.8-7.2 1.7-3.4 2.6-7.6 2.6-12.5 0-4-.6-7.5-1.9-10.5-1-2.4-2.3-4.4-3.5-6.1zm-2.5 39.4c-3.8 3.5-8.8 6-14.8 7.5-4.7 1.2-9.6 1.7-14.5 1.6-3.8 0-6.8-.1-9.1-.4-2.5-.2-5-.7-7.4-1.3-.4-.1-.7-.5-.7-1v-67.2c0-.6.3-1 .9-1.2 3.3-1.2 7-2.1 10.8-2.7 4.5-.8 9.1-1.1 13.7-1.1 5.5 0 10.3.9 14.4 2.6 3.9 1.6 7.3 4.1 10.1 7.1 2.6 3 4.6 6.5 5.8 10.4 1.3 3.9 1.9 8.2 1.9 12.8.1 12.3-3.6 22-11.1 32.9z" fill="#9999FF" />
    </svg>
  ),
  premierePro: () => (
    <svg width="100" height="100" viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="234" rx="42.5" fill="#00005B" />
      <path d="M63 164.1V75.3c0-.6.3-.9.9-.9 2.1 0 4.1-.1 6.6-.1s5.2-.1 8.2-.1c3.1 0 6.4-.1 9.9-.1 3.5 0 6.8 0 9.8.1 8.4.4 15.7 2.3 21.8 5.7 5.3 2.9 9.6 7.1 12.6 12.2 2.8 5 4.2 10.7 4.2 17.2 0 6.8-1.6 12.9-4.7 18.1-3.2 5.4-7.8 9.7-13.4 12.5-5.9 3-12.8 4.5-20.6 4.5-2.5 0-4.3 0-5.5-.1s-2.8-.1-4.8-.2v20c.1.5-.3 1-.8 1.1H63.8c-.5 0-.8-.3-.8-1.1zm24-68.4v27.9c1.5.2 2.9.3 4.1.3h5.3c3.5 0 6.9-.6 10-2 2.7-1.2 5-3.1 6.5-5.6 1.6-2.4 2.3-5.4 2.3-8.9 0-3.2-.7-6.1-2.2-8.4-1.5-2.4-3.7-4.3-6.4-5.5-3-1.3-6.5-2-10.6-2-2.4 0-4.3 0-5.6.1-1.5.1-2.6.1-3.4.1z" fill="#9999FF" />
      <path d="M165.3 99.4c-.1-.5.2-1 .7-1.1h.2c.5 0 1 .1 1.4.3l.1.1c.5.1 1 .3 1.5.5.3.1 11.7 1.7 11.7 1.7v66c0 .6-.3.9-.9.9h-21.3c-.6 0-.9-.3-.9-.9v-5.5c-2.5 3-5.6 5.3-9.1 6.9-3.2 1.4-6.7 2.2-10.2 2.1-5.1 0-9.7-1.3-13.8-3.9-4.1-2.7-7.4-6.5-9.5-10.9-2.4-5-3.6-10.9-3.6-17.7 0-6.1 1.1-11.7 3.3-16.8 2.1-4.8 5.4-8.9 9.6-11.9 4.1-3 8.9-4.5 14.4-4.5 3.1 0 6.2.6 9 1.7 2.6 1 4.9 2.6 6.9 4.5V99.4h10.5zm-13 53.9c1.8-1.4 3.2-3.2 3.2-5.4v-18.7c-1.2-1.6-2.7-2.8-4.5-3.7-1.8-.9-3.8-1.4-5.8-1.4-2.4 0-4.8.7-6.7 2.2-1.9 1.6-3.4 3.7-4.3 6.1-1 2.7-1.6 5.9-1.6 9.4 0 5.1 1 9.1 3.1 12.1 2 2.9 4.9 4.3 8.6 4.3 3.1 0 5.8-1.4 8-4.9z" fill="#9999FF" />
    </svg>
  ),
  vscode: () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="vsc" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path fillRule="evenodd" clipRule="evenodd" d="M70.912 99.317a6.85 6.85 0 004.96-.737l20.159-10.08A6.847 6.847 0 0099.68 82.5V17.5a6.847 6.847 0 00-3.65-6.063L75.873 1.42a6.85 6.85 0 00-7.822 1.084L29.24 38.07 12.15 25.59a4.567 4.567 0 00-5.835.377L1.192 30.57a4.568 4.568 0 00-.004 6.734L16.32 50 1.188 62.696a4.568 4.568 0 00.004 6.734l5.123 4.603a4.567 4.567 0 005.835.378l17.09-12.48 38.81 35.566a6.85 6.85 0 002.862 1.84zM75.013 27.2L45.513 50l29.5 22.8V27.2z" fill="white" />
      </mask>
      <g mask="url(#vsc)">
        <path d="M96.03 11.373L75.807 1.314a6.85 6.85 0 00-7.822 1.083l-62.53 56.8a4.568 4.568 0 00.005 6.734l5.122 4.603a4.567 4.567 0 005.835.378L96.77 11.953a.284.284 0 00-.74-.58z" fill="#0065A9" />
        <path d="M96.03 88.627L75.807 98.686a6.85 6.85 0 01-7.822-1.083l-62.53-56.8a4.568 4.568 0 01.005-6.734l5.122-4.603a4.567 4.567 0 015.835-.378L96.77 88.047a.284.284 0 01-.74.58z" fill="#007ACC" />
        <path d="M75.808 98.686a6.845 6.845 0 01-7.823-1.083 6.85 6.85 0 006.247-1.627c3.45-3.45 3.45-9.043 0-12.493L37.735 47.086a6.85 6.85 0 010-9.692L74.232 1.397A6.85 6.85 0 0075.808 1.42l20.222 10.016A6.848 6.848 0 0199.68 17.5v65a6.848 6.848 0 01-3.65 6.063L75.808 98.686z" fill="#1F9CF0" />
      </g>
    </svg>
  ),
}
