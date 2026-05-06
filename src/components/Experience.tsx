import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Mobile Developer",
    company: "KirimFresh.id",
    type: "Part-time",
    period: "Sep 2025 - Present",
    description:
      "Developing and maintaining mobile applications for KirimFresh.id platform, focusing on user experience and performance optimization.",
    technologies: ["React Native", "Mobile Development", "iOS", "Android"],
  },
  {
    role: "Product Lead",
    company: "InterActive Technologies Corp",
    type: "Full-time · On-site",
    period: "Apr 2025 - Present",
    description:
      "Leading product development strategy, managing cross-functional teams, and driving agile development processes to deliver scalable software solutions.",
    technologies: ["Software Development", "Agile", "Product Management", "Leadership"],
  },
  {
    role: "Frontend Web Developer",
    company: "InterActive Technologies Corp",
    type: "Full-time · On-site",
    period: "Nov 2023 - Sep 2025",
    description:
      "Developing and maintaining frontend web applications, implementing modern UI/UX designs, and collaborating with backend teams to deliver seamless user experiences.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    role: "Junior Front End Web Developer",
    company: "GoCement",
    type: "Full-time",
    period: "Dec 2022 - Sep 2023",
    description:
      "Built and maintained responsive web interfaces for the GoCement platform, contributing to the company's digital transformation in the construction industry.",
    technologies: ["React", "JavaScript", "CSS", "REST APIs"],
  },
  {
    role: "Web Developer",
    company: "PT Sinergi Informatika Semen Indonesia (SISI)",
    type: "Freelance",
    period: "Sep 2022 - Nov 2022",
    description:
      "Delivered web development solutions for enterprise-level applications within the Semen Indonesia group.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
  },
  {
    role: "Backend Developer Intern",
    company: "Digital Amoeba by Telkom Indonesia",
    type: "Internship",
    period: "Feb 2022 - Jul 2022",
    description:
      "Developing ideabox applications with microservices architecture and the CodeIgniter framework at Telkom Indonesia's innovation hub.",
    technologies: ["CodeIgniter", "Microservices", "PHP", "MySQL"],
  },
  {
    role: "Chief Executive Officer",
    company: "Linux User Group Stikom Surabaya",
    type: "Organization",
    period: "Feb 2021 - Jan 2022",
    description:
      "Led the Linux User Group community, organizing tech events, workshops, and managing team operations for web development and open-source initiatives.",
    technologies: ["Leadership", "Laravel", "Responsive Web Design", "Linux"],
  },
  {
    role: "Backend Developer",
    company: "Ministry of Communication and Information Technology (Kominfo RI)",
    type: "Freelance",
    period: "Apr 2021 - Jul 2021",
    description:
      "Contributed to government digital infrastructure projects, developing backend systems for national-level applications.",
    technologies: ["PHP", "Laravel", "REST APIs", "PostgreSQL"],
  },
  {
    role: "Frontend Developer",
    company: "Linux User Group Stikom Surabaya",
    type: "Internship",
    period: "Nov 2019 - Jan 2021",
    description:
      "Developed frontend interfaces for community projects, learning modern web development practices and contributing to open-source initiatives.",
    technologies: ["HTML/CSS", "JavaScript", "Bootstrap", "Git"],
  },
  {
    role: "Web Development Intern",
    company: "Dinas Komunikasi dan Informatika Surabaya",
    type: "Internship",
    period: "Feb 2018 - Apr 2018",
    description:
      "Created websites using PHP, AJAX, and Laravel framework for government communication and information services.",
    technologies: ["PHP", "Laravel", "AJAX", "MySQL"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Career
          </h2>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Work Experience
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            My professional journey from intern to product lead — building digital solutions across industries.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent-light/50 to-transparent md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company + exp.period}
                className="relative flex gap-8"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="relative z-10 hidden md:block"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <Building2 size={18} className="text-accent-light" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="flex-1 rounded-2xl border border-border bg-surface p-6 transition-all"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 16px 32px rgba(30, 58, 95, 0.12)",
                    borderColor: "var(--accent-light)",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.role}</h4>
                      <p className="text-sm text-accent-light">{exp.company}</p>
                      <p className="mt-0.5 text-xs text-muted">{exp.type}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted">
                      <Calendar size={11} />
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-light"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
