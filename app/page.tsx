"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import BlurText from "@/components/ui/blur-text"
import { CursorTrail } from "@/components/ui/cursor-trail"
import Footer from "@/components/Footer"
import AboutSection from "@/components/AboutSection"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"
import LogoLoop from "@/components/ui/logo-loop"
import ServicesSection from "@/components/ServicesSection"
import CurtainIntro from "@/components/CurtainIntro"
import { useMobileMenu } from "@/contexts/MobileMenuContext"
import { usePageView } from "@/hooks/useAnalytics"
import { fetchProjects } from "@/lib/projects"
import { useTranslation } from "react-i18next"

const clientLogos = [
  { src: "/logos/axelote.svg", alt: "Axelote", title: "Axelote" },
  { src: "/logos/szponthub.svg", alt: "SzpontHub", title: "SzpontHub" },
  { src: "/logos/sfd.png", alt: "SFD", title: "SFD" },
  { src: "/logos/mymidwife.png", alt: "MyMidwife", title: "MyMidwife" },
  { src: "/logos/rozm.png", alt: "Rozm", title: "Rozm" },
  { src: "/logos/winogrona-art.svg", alt: "Winogrona Art", title: "Winogrona Art", scale: 1.5 },
  { src: "/logos/interstalar.png", alt: "Interstalar", title: "Interstalar", scale: 0.5 },
  { src: "/logos/logo_light.png", alt: "Logo Light", title: "Logo Light", scale: 0.7 },
  { src: "/logos/tia.svg", alt: "TIA", title: "TIA" },
  { src: "/logos/sander.png", alt: "Sander", title: "Sander" },
]

export default function HeroSection() {
  const { isOpen: isMobileMenuOpen } = useMobileMenu()
  const [images, setImages] = useState<string[]>([])
  const [introComplete, setIntroComplete] = useState(false)
  const { t } = useTranslation()

  const handleIntroComplete = useCallback(() => setIntroComplete(true), [])

  usePageView("/")

  useEffect(() => {
    fetchProjects()
      .then((projects) => {
        const imgs: string[] = []
        projects.forEach((p) => {
          if (p.main_image) imgs.push(p.main_image)
          if (p.sub_images) imgs.push(...p.sub_images)
        })
        setImages(imgs.slice(0, 20))
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <CurtainIntro onComplete={handleIntroComplete} />
      <PageTransition>
      <div
        className="bg-black relative overflow-hidden font-['Space_Grotesk']"
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        }}
      >
        <CursorTrail images={images} containerId="hero-section" fadeOutDuration={800} />

        {/* Hero Section */}
        <div id="hero-section" className="min-h-screen relative md:cursor-none">
          {/* 3D Marquee Background */}
          {images.length > 0 && (
            <div className="absolute inset-0 opacity-15">
              <ThreeDMarquee images={images} className="h-full w-full rounded-none" />
            </div>
          )}

          {/* Vignette Effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          <div className="max-w-[1440px] mx-auto relative z-10">
            {" "}
            {/* reduced z-index from z-20 to z-10 to ensure hero content stays behind mobile menu */}
            <Navbar />
            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)] relative">
              {/* Left Text */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-sm tracking-wider hidden md:block">
                <div>{t("hero.role1")}</div>
                <div>{t("hero.role2")}</div>
              </div>

              {/* Center Text */}
              <div className="text-center w-full px-4">
                <div className="flex flex-col items-center">
                  <BlurText
                    text={t("hero.title1")}
                    className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold text-red-500 leading-none tracking-tight text-center"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    animationFrom={{ filter: "blur(3px)", opacity: 0, y: -10 }}
                    animationTo={[
                      { filter: "blur(1px)", opacity: 0.7, y: -2 },
                      { filter: "blur(0px)", opacity: 1, y: 0 },
                    ]}
                    stepDuration={0.6}
                  />

                  <BlurText
                    text={t("hero.title2")}
                    className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold text-red-500 leading-none tracking-tight text-center"
                    delay={300}
                    animateBy="words"
                    direction="top"
                    animationFrom={{ filter: "blur(3px)", opacity: 0, y: -10 }}
                    animationTo={[
                      { filter: "blur(1px)", opacity: 0.7, y: -2 },
                      { filter: "blur(0px)", opacity: 1, y: 0 },
                    ]}
                    stepDuration={0.6}
                  />
                </div>

                <p className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                <Button
                  href="/#about"
                  className={`mt-8 md:mt-12 relative z-10 transition-opacity duration-300 ${
                    isMobileMenuOpen
                      ? "md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto"
                      : "opacity-100 pointer-events-auto"
                  }`}
                >
                  {t("hero.cta")}
                </Button>
              </div>

              {/* Right Text */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm tracking-wider hidden md:block">
                <div>{t("hero.scroll1")}</div>
                <div>{t("hero.scroll2")}</div>
              </div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="relative z-20 border-t border-white/5">
            <p className="text-center text-white/30 text-xs uppercase tracking-[0.3em] pt-6 pb-2">{t("hero.trustedBy")}</p>
            <div className="h-[80px]">
              <LogoLoop
                logos={clientLogos}
                speed={60}
                direction="left"
                logoHeight={35}
                gap={120}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Trusted by"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="">
          <AboutSection />
        </div>

        {/* Services Section */}
        <ServicesSection />

        {/* Footer with Text Along Path */}
        <div className="-mt-32" id="footer">
          <Footer />
        </div>
      </div>
    </PageTransition>
    </>
  )
}
