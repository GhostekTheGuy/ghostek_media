import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navbar & Mobile Menu
        "nav.about": "ABOUT",
        "nav.works": "WORKS",
        "nav.contact": "CONTACT",

        // Hero
        "hero.title1": "CREATIVE.",
        "hero.title2": "TECHNICAL.",
        "hero.subtitle": "Combining design expertise with full-stack development to create visually appealing and user-friendly digital experiences.",
        "hero.cta": "ABOUT ME",
        "hero.role1": "PRODUCT DESIGNER",
        "hero.role2": "& DEVELOPER",
        "hero.scroll1": "SCROLL",
        "hero.scroll2": "DOWN",
        "hero.trustedBy": "Trusted by",

        // About
        "about.label": "about",
        "about.aside": "Design and development have always been more than skills - they're instinct.",
        "about.text1": "I'm Hubert Kolejko - I design and build digital products that people actually want to use.",
        "about.text2": " From pixel-perfect interfaces to full-stack applications, I bridge the gap between creative vision and technical execution.",
        "about.text3": " Let's turn your idea into something real.",
        "about.cta": "SEE MY WORKS",

        // Services
        "services.label": "services",
        "services.heading": "Design, code, brand, animate - end to end.",
        "services.aside": "One person. Full pipeline. No handoff friction.",
        "services.s1.title": "Web Development",
        "services.s1.label": "development",
        "services.s2.title": "Product Design",
        "services.s2.label": "design",
        "services.s3.title": "Brand Identity",
        "services.s3.label": "branding",
        "services.s4.title": "Motion and 3D",
        "services.s4.label": "motion",
        "services.panel.label": "Core Services",
        "services.panel.heading": "Everything from concept to production, under one roof",
        "services.panel.text": "I handle the full creative and technical stack - so your project stays cohesive from first sketch to final deploy.",
        "services.panel.footer": "Design, develop, brand, animate.",
        "services.explore": "Explore Services",

        // Footer
        "footer.title1": "DON'T THINK.",
        "footer.title2": "JUST MESSAGE ME.",
        "footer.subtitle": "Tell me about your idea, your vision, or just say hi.",
        "footer.cta": "SEND A MESSAGE",
        "footer.contact": "CONTACT",
        "footer.location": "LOCATION",
        "footer.social": "SOCIAL",
        "footer.locationValue": "LUBLIN, POLAND",
        "footer.copyright": "© 2026 HUBERT KOLEJKO. ALL RIGHTS RESERVED.",

        // Works page
        "works.title": "DIVE INTO MY WORKS",
        "works.error": "Failed to load projects. Please try again later.",
        "works.retry": "Retry",
        "works.empty": "No projects found.",
      },
    },
    pl: {
      translation: {
        // Navbar & Mobile Menu
        "nav.about": "O MNIE",
        "nav.works": "PRACE",
        "nav.contact": "KONTAKT",

        // Hero
        "hero.title1": "KREATYWNY.",
        "hero.title2": "TECHNICZNY.",
        "hero.subtitle": "Łączę wiedzę projektową z full-stack developmentem, tworząc atrakcyjne wizualnie i przyjazne cyfrowe doświadczenia.",
        "hero.cta": "O MNIE",
        "hero.role1": "PRODUCT DESIGNER",
        "hero.role2": "& DEVELOPER",
        "hero.scroll1": "PRZEWIŃ",
        "hero.scroll2": "W DÓŁ",
        "hero.trustedBy": "Zaufali mi",

        // About
        "about.label": "o mnie",
        "about.aside": "Design i programowanie to zawsze było coś więcej niż umiejętności - to instynkt.",
        "about.text1": "Jestem Hubert Kolejko - projektuję i buduję produkty cyfrowe, z których ludzie naprawdę chcą korzystać.",
        "about.text2": " Od pixel-perfect interfejsów po full-stack aplikacje, łączę kreatywną wizję z techniczną realizacją.",
        "about.text3": " Zamieńmy Twój pomysł w rzeczywistość.",
        "about.cta": "ZOBACZ MOJE PRACE",

        // Services
        "services.label": "usługi",
        "services.heading": "Projektuję, koduję, buduję markę, animuję - od A do Z.",
        "services.aside": "Jedna osoba. Pełny pipeline. Zero tarcia.",
        "services.s1.title": "Web Development",
        "services.s1.label": "development",
        "services.s2.title": "Product Design",
        "services.s2.label": "design",
        "services.s3.title": "Identyfikacja Wizualna",
        "services.s3.label": "branding",
        "services.s4.title": "Motion i 3D",
        "services.s4.label": "motion",
        "services.panel.label": "Główne Usługi",
        "services.panel.heading": "Wszystko od konceptu po produkcję, pod jednym dachem",
        "services.panel.text": "Obsługuję pełen stack kreatywny i techniczny - Twój projekt pozostaje spójny od pierwszego szkicu po finalne wdrożenie.",
        "services.panel.footer": "Projektuję, koduję, buduję markę, animuję.",
        "services.explore": "Poznaj Usługi",

        // Footer
        "footer.title1": "NIE MYŚL.",
        "footer.title2": "PO PROSTU NAPISZ.",
        "footer.subtitle": "Opowiedz mi o swoim pomyśle, wizji, albo po prostu się przywitaj.",
        "footer.cta": "WYŚLIJ WIADOMOŚĆ",
        "footer.contact": "KONTAKT",
        "footer.location": "LOKALIZACJA",
        "footer.social": "SOCIAL",
        "footer.locationValue": "LUBLIN, POLSKA",
        "footer.copyright": "© 2026 HUBERT KOLEJKO. WSZELKIE PRAWA ZASTRZEŻONE.",

        // Works page
        "works.title": "ZANURZ SIĘ W MOICH PRACACH",
        "works.error": "Nie udało się załadować projektów. Spróbuj ponownie później.",
        "works.retry": "Ponów",
        "works.empty": "Nie znaleziono projektów.",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
