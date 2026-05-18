import { motion } from "framer-motion";
import { Award, FileBadge, Trophy, ExternalLink, Calendar } from "lucide-react";
import AnimatedSection, { itemVariants, staggerContainer } from "./motion/AnimatedSection";
import SplitHeading from "./motion/SplitHeading";

const certifications = [
  {
    title: "How to Manage a Remote Team",
    issuer: "Coursera",
    date: "Feb 2022",
    credentialId: "2M5CBLYRL4JR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/2M5CBLYRL4JR",
    type: "certificate",
  },
];

const achievements = [
  {
    title: "3rd Place – World Computer Hacker League (WCHL)",
    description: "Qualification Round (Indonesia) & Regional Round (Asia)",
    date: "Oct 2025",
    type: "competition",
  },
  {
    title: "Juara 2 Hackathon 6.0 ICP Competition",
    issuer: "Codefest.id",
    date: "Sep 2024",
    type: "competition",
  },
  {
    title: "Juara 1 Pengembangan Aplikasi Android Tingkat Nasional",
    issuer: "ITCC 2020 Universitas Udayana Bali",
    date: "Nov 2020",
    type: "competition",
  },
  {
    title: "Juara 2 Web Design LKS Surabaya",
    issuer: "Lomba Web Design, LKS SMK Tingkat Surabaya",
    date: "Jan 2018",
    type: "competition",
  },
];

export default function Certifications() {
  return (
    <AnimatedSection id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Credentials
          </h2>
          <SplitHeading
            as="h3"
            text="Licenses & Certifications"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Professional certifications and competition achievements that validate my expertise.
          </p>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mt-12"
          variants={itemVariants}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <FileBadge size={20} className="text-accent" />
            </div>
            <h4 className="text-xl font-semibold">Certifications</h4>
          </div>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={staggerContainer}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(30, 58, 95, 0.12)",
                  borderColor: "var(--accent-light)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h5 className="font-semibold">{cert.title}</h5>
                    <p className="mt-1 text-sm text-accent-light">{cert.issuer}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} />
                        Issued {cert.date}
                      </span>
                      {cert.credentialId && (
                        <span className="rounded-full bg-surface-light px-2 py-0.5">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                  {cert.credentialUrl && (
                    <motion.a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="View certificate"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Trophy size={20} className="text-accent" />
            </div>
            <h4 className="text-xl font-semibold">Achievements & Awards</h4>
          </div>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={staggerContainer}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(30, 58, 95, 0.12)",
                  borderColor: "var(--accent-light)",
                }}
              >
                {/* Rank badge for top 3 */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rotate-45 bg-gradient-to-br from-accent/20 to-accent-light/10" />
                <div className="absolute right-3 top-3">
                  <Award
                    size={20}
                    className={`${
                      index === 2 // Juara 1
                        ? "text-yellow-400"
                        : index === 1 || index === 3 // Juara 2
                        ? "text-gray-300"
                        : "text-orange-400" // Juara 3
                    }`}
                    fill="currentColor"
                    fillOpacity={0.2}
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold">{achievement.title}</h5>
                  </div>
                  {achievement.description && (
                    <p className="mt-1 text-sm text-muted">{achievement.description}</p>
                  )}
                  {achievement.issuer && (
                    <p className="mt-1 text-sm text-accent-light">{achievement.issuer}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted">
                    <Calendar size={11} />
                    {achievement.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
