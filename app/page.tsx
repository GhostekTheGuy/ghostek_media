"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import BlurText from "@/components/ui/blur-text"
import { CursorTrail } from "@/components/ui/cursor-trail"
import Footer from "@/components/Footer"
import AboutSection from "@/components/AboutSection"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"

export default function HeroSection() {
  const images = [
    "https://media.licdn.com/dms/image/v2/C4E16AQGQsDC9lE5J2Q/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1652007818718?e=1758153600&v=beta&t=p1ODboh1IEEaaboALO1M-4-oS8RpKU31aFqmxJdsIaA",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-DAfEKbMghTXdzlM9.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-KlAGBt5akn3L03Th.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-3dP7shP57SurXcbr.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-mYBS5lSI0UzcRMAB.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-inIAtYLhE85QNNV9.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-sjytiBjKsC74kjCx.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-a7TgiczuNg3tXFWk.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-EnoK7bi5ENxXh9rx.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-TSoV3WKWkeEOcsHZ.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-hB81TXyxpapF1bOX.png&w=2048&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-obcw9fwGJT0aKFD4.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-GENU1u4tkPkF1sFu.jpg&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-LDyKPWIcmHulDwCR.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-LCPKlqXUc45fOHeJ.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-1npbgNJIti3E0HHR.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-UydxLmpVJA4WuXyA.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-DAfEKbMghTXdzlM9.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-mI3uEZgnnLv73fo9.png&w=1080&q=75",
    "https://ghostek-portfolio.vercel.app/_next/image?url=https%3A%2F%2Fpcpeog9cojfqe29e.public.blob.vercel-storage.com%2Fphoto-UklXX9pFcd0NlDmd.png&w=1080&q=75",
  ]

  return (
    <PageTransition>
      <div
        className="bg-black relative overflow-hidden font-['Space_Grotesk']"
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        }}
      >
        <CursorTrail images={images} containerId="hero-section" fadeOutDuration={800} />

        {/* Hero Section */}
        <div id="hero-section" className="min-h-screen relative cursor-none">
          {/* 3D Marquee Background */}
          <div className="absolute inset-0 opacity-15">
            <ThreeDMarquee images={images} className="h-full w-full rounded-none" />
          </div>

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
                <div>PRODUCT DESIGNER</div>
                <div>& DEVELOPER</div>
              </div>

              {/* Center Text */}
              <div className="text-center w-full px-4">
                <div className="flex flex-col items-center">
                  <BlurText
                    text="CREATIVE."
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
                    text="TECHNICAL."
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
                  Combining design expertise with full-stack development to create visually appealing and user-friendly
                  digital experiences.
                </p>

                <Button href="/#about" className="mt-8 md:mt-12 relative z-10">
                  {"ABOUT ME"}
                </Button>
              </div>

              {/* Right Text */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm tracking-wider hidden md:block">
                <div>SCROLL</div>
                <div>DOWN</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="-mt-40">
          <AboutSection />
        </div>

        {/* Footer with Text Along Path */}
        <div className="-mt-32" id="footer">
          <Footer />
        </div>
      </div>
    </PageTransition>
  )
}
