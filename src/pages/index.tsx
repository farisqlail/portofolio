import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Faris Rizqilail | Software Engineer & Founder of LailDev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Faris Rizqilail (farisqlail) — Software Engineer & Founder of LailDev. Building robust, scalable software solutions and crafting elegant digital experiences."
        />
        <meta
          name="keywords"
          content="Faris Rizqilail, farisqlail, LailDev, Software Engineer, Web Developer, Full Stack, Portfolio, Indonesia"
        />
        <meta name="author" content="Faris Rizqilail" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/assets/icons/logo.png" type="image/png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Faris Rizqilail" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:title"
          content="Faris Rizqilail | Software Engineer & Founder of LailDev"
        />
        <meta
          property="og:description"
          content="Faris Rizqilail (farisqlail) — Software Engineer & Founder of LailDev. Building robust, scalable software solutions and crafting elegant digital experiences."
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/assets/images/faris-hero-2.png`}
        />
        <meta
          property="og:image:alt"
          content="Faris Rizqilail — Software Engineer"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Faris Rizqilail | Software Engineer & Founder of LailDev"
        />
        <meta
          name="twitter:description"
          content="Faris Rizqilail (farisqlail) — Software Engineer & Founder of LailDev."
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/assets/images/faris-hero-2.png`}
        />

        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Faris Rizqilail",
              alternateName: ["farisqlail", "LailDev"],
              url: SITE_URL,
              image: `${SITE_URL}/assets/images/faris-hero-2.png`,
              jobTitle: "Software Engineer",
              description:
                "Software Engineer & Founder of LailDev, building robust software solutions and elegant digital experiences.",
              worksFor: {
                "@type": "Organization",
                name: "LailDev",
              },
              sameAs: ["https://github.com/farisqlail"],
            }),
          }}
        />
      </Head>

      <ScrollProgressBar />
      <CustomCursor />
      <div className="glow-line-top" />

      <motion.div
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <HeroSection />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          {/* <Experiments /> */}
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
