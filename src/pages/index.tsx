import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Experiments from "@/components/Experiments";
import Contact from "@/components/Contact";
import DeckStage, { DeckCardItem } from "@/components/motion/DeckStage";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const cards: DeckCardItem[] = [
    {
      id: "hero",
      tag: "Overview",
      title: "Profile & Engineering Focus",
      label: "Overview",
      num: "01",
      component: <HeroSection />,
    },
    {
      id: "about",
      tag: "Philosophy",
      title: "Architecture & Methodology",
      label: "Philosophy",
      num: "02",
      component: <About />,
    },
    {
      id: "skills",
      tag: "Capabilities",
      title: "Production Tech Stack",
      label: "Capabilities",
      num: "03",
      component: <Skills />,
    },
    {
      id: "experience",
      tag: "Experience",
      title: "Production Career Timeline",
      label: "Experience",
      num: "04",
      component: <Experience />,
    },
    {
      id: "certifications",
      tag: "Honors",
      title: "Competition Awards & Credentials",
      label: "Honors",
      num: "05",
      component: <Certifications />,
    },
    {
      id: "experiments",
      tag: "Lab",
      title: "Open-Source Prototypes & Systems",
      label: "Lab",
      num: "06",
      component: <Experiments />,
    },
    {
      id: "contact",
      tag: "Contact",
      title: "Direct Channels & Discussion",
      label: "Contact",
      num: "07",
      component: <Contact onSelectCard={setActiveIndex} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Faris Rizqilail · Software Engineer & Founder @LailDev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta
          name="description"
          content="Faris Rizqilail (farisqlail) — Software Engineer & Founder of LailDev. 7+ years shipping production web, mobile, and cloud software."
        />
        <meta
          name="keywords"
          content="Faris Rizqilail, farisqlail, LailDev, Software Engineer, Full Stack, Product Lead, Next.js, React, TypeScript, Laravel"
        />
        <meta name="author" content="Faris Rizqilail" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/assets/icons/logo.png" type="image/png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Faris Rizqilail" />
        <meta property="og:title" content="Faris Rizqilail · Software Engineer & Founder @LailDev" />
        <meta
          property="og:description"
          content="7+ years shipping production web, mobile, and cloud software across enterprise, government, and startup ventures."
        />
        <meta property="og:image" content={`${SITE_URL}/assets/images/faris-hero-2.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Faris Rizqilail · Software Engineer & Founder @LailDev" />
        <meta
          name="twitter:description"
          content="7+ years shipping production web, mobile, and cloud software."
        />
        <meta name="twitter:image" content={`${SITE_URL}/assets/images/faris-hero-2.png`} />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} fixed inset-0 h-screen w-screen overflow-hidden bg-black text-foreground font-sans selection:bg-white selection:text-black`}>
        {/* Fixed Header Bar */}
        <Navbar activeIndex={activeIndex} onSelectCard={setActiveIndex} />

        {/* Fixed-Viewport Virtual Scroll Card Engine with Integrated Background */}
        <DeckStage
          cards={cards}
          activeIndex={activeIndex}
          onCardChange={setActiveIndex}
        />
      </div>
    </>
  );
}
