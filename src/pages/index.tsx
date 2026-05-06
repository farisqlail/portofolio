import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Experiments from "@/components/Experiments";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

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
        <meta
          name="description"
          content="Faris Rizqilail - Software Engineer & Founder of LailDev. Building robust, scalable software solutions and crafting elegant digital experiences."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icons/logo.png" type="image/png" />
      </Head>

      <CustomCursor />
      <div className="glow-line-top" />

      <motion.div
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main>
          <Hero />
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
