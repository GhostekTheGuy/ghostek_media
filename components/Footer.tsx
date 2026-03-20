"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import BlurText from "@/components/ui/blur-text"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const container = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  })

  return (
    <div ref={container} className="relative" id="footer">
      {/* Main Footer Content */}
      <MainFooterContent scrollProgress={scrollYProgress} />
    </div>
  )
}

const MainFooterContent = ({ scrollProgress }: { scrollProgress: any }) => {
  const { t } = useTranslation()
  const contentY = useTransform(scrollProgress, [0.3, 1], [100, 0])
  const contentOpacity = useTransform(scrollProgress, [0.3, 0.7], [0, 1])

  return (
    <motion.div style={{ y: contentY, opacity: contentOpacity }} className="bg-black relative z-10 min-h-screen">
      {/* Main Contact Section */}
      <div className="max-w-[1440px] mx-auto px-3 py-10 md:px-6 md:py-20">
        {/* Hero Message */}
        <div className="text-center mb-10 md:mb-20">
          <BlurText
            text={t("footer.title1")}
            className="text-4xl md:text-8xl lg:text-9xl font-bold text-red-500 leading-none tracking-tight mb-4"
            delay={100}
            animateBy="words"
            direction="top"
          />
          <BlurText
            text={t("footer.title2")}
            className="text-4xl md:text-8xl lg:text-9xl font-bold text-red-500 leading-none tracking-tight mb-8"
            delay={150}
            animateBy="words"
            direction="top"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-300 mb-8 tracking-normal"
          >
            {t("footer.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button href="https://www.instagram.com/ohhuseenaghost/">{t("footer.cta")}</Button>
          </motion.div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 md:text-left text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider">{t("footer.contact")}</h3>
            <div className="space-y-2 text-gray-300">
              <p className="hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base block">
                +48 888-106-559
              </p>
              <p className="hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base block">
                GHOSTEK.KONTAKT@GMAIL.COM
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider text-center">{t("footer.location")}</h3>
            <div className="space-y-2 text-gray-300">
              <p className="hover:text-red-400 transition-colors text-center text-sm md:text-base">{t("footer.locationValue")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider text-center md:text-right">
              {t("footer.social")}
            </h3>
            <div className="space-y-2 text-gray-300">
              <a
                href="https://www.instagram.com/ohhuseenaghost/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <p className="hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base text-center md:text-right">
                  INSTAGRAM
                </p>
              </a>
              <a
                href="https://www.linkedin.com/in/hubert-kolejko-2b2345208/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <p className="hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base text-center md:text-right">
                  LINKEDIN
                </p>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Large Brand Name */}
        <div className="relative overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="sm:text-[3rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-none text-center select-none whitespace-nowrap font-black text-white opacity-80 md:opacity-30 text-5xl tracking-[-0.075em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            HUBERT KOLEJKO
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center pt-10 border-t border-red-500/20 mt-10 md:mt-20"
        >
          <p className="text-gray-500 text-sm tracking-wider">{t("footer.copyright")}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
