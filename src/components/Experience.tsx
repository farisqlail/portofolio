import { Calendar } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  period: string;
  status: "ACTIVE" | "PRODUCTION" | "COMPLETED";
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Mobile Developer",
    company: "KirimFresh.id",
    type: "Part-time",
    period: "Sep 2025 - Present",
    status: "ACTIVE",
    description:
      "Building and maintaining mobile applications for the KirimFresh logistics platform with real-time tracking and offline-first state handling.",
    technologies: ["React Native", "iOS", "Android", "REST APIs"],
  },
  {
    role: "Product Lead",
    company: "InterActive Technologies Corp",
    type: "Full-time · On-site",
    period: "Apr 2025 - Present",
    status: "ACTIVE",
    description:
      "Leading product engineering across web and mobile teams, managing sprint cycles, architectural reviews, and production releases.",
    technologies: ["Product Leadership", "Agile/Scrum", "System Architecture"],
  },
  {
    role: "Frontend Web Developer",
    company: "InterActive Technologies Corp",
    type: "Full-time · On-site",
    period: "Nov 2023 - Sep 2025",
    status: "PRODUCTION",
    description:
      "Built responsive web applications in Next.js and TypeScript, integrating backend REST APIs and optimizing frontend load performance.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    role: "Junior Front End Web Developer",
    company: "GoCement",
    type: "Full-time",
    period: "Dec 2022 - Sep 2023",
    status: "COMPLETED",
    description:
      "Built responsive web interfaces for the GoCement industrial supply ordering platform using React and REST APIs.",
    technologies: ["React", "JavaScript", "CSS3", "REST APIs"],
  },
  {
    role: "Web Developer",
    company: "PT Sinergi Informatika Semen Indonesia (SISI)",
    type: "Freelance",
    period: "Sep 2022 - Nov 2022",
    status: "COMPLETED",
    description:
      "Delivered internal web application tools for operational workflows within the Semen Indonesia group using Laravel and MySQL.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
  },
  {
    role: "Backend Developer Intern",
    company: "Digital Amoeba by Telkom Indonesia",
    type: "Internship",
    period: "Feb 2022 - Jul 2022",
    status: "COMPLETED",
    description:
      "Built microservice backend endpoints for the Ideabox platform using CodeIgniter and MySQL.",
    technologies: ["CodeIgniter", "Microservices", "PHP", "MySQL"],
  },
  {
    role: "Chief Executive Officer",
    company: "Linux User Group Stikom Surabaya",
    type: "Community Leadership",
    period: "Feb 2021 - Jan 2022",
    status: "COMPLETED",
    description:
      "Organized regional tech events and hackathons while managing student engineering teams for open-source projects.",
    technologies: ["Leadership", "Laravel", "Linux SysAdmin"],
  },
  {
    role: "Backend Developer",
    company: "Ministry of Communication & Information Technology (Kominfo RI)",
    type: "Freelance / Public Sector",
    period: "Apr 2021 - Jul 2021",
    status: "COMPLETED",
    description:
      "Developed backend REST APIs in Laravel and PostgreSQL for national-level public service portals.",
    technologies: ["PHP", "Laravel", "REST APIs", "PostgreSQL"],
  },
  {
    role: "Frontend Developer",
    company: "Linux User Group Stikom Surabaya",
    type: "Internship",
    period: "Nov 2019 - Jan 2021",
    status: "COMPLETED",
    description:
      "Created frontend interfaces and landing pages for open-source student initiatives and community tools.",
    technologies: ["HTML/CSS", "JavaScript", "Bootstrap", "Git"],
  },
  {
    role: "Web Development Intern",
    company: "Dinas Komunikasi dan Informatika Surabaya",
    type: "Internship",
    period: "Feb 2018 - Apr 2018",
    status: "COMPLETED",
    description:
      "Built municipal communication portals and submission forms using PHP, AJAX, and Laravel for the Surabaya city government.",
    technologies: ["PHP", "Laravel", "AJAX", "MySQL"],
  },
];

export default function Experience() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="border-b border-dashed border-white/15 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Production experience &amp;{" "}
          <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
            impact.
          </span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
          From early public sector infrastructure projects to leading product strategy and mobile engineering at enterprise scale.
        </p>
      </div>

      {/* Pipeline Stream Container */}
      <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden divide-y divide-dashed divide-white/15 flex-1 overflow-y-auto custom-card-scroll max-h-[380px] sm:max-h-[460px]">
        {experiences.map((exp) => (
          <div
            key={exp.role + exp.company + exp.period}
            className="group p-4 sm:p-5 lg:p-6 transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-sans">
                    {exp.role}
                  </h3>
                  <span className="text-zinc-600 font-mono">/</span>
                  <span className="text-xs sm:text-sm font-medium text-zinc-300 font-sans">
                    {exp.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                  <span>[{exp.type}]</span>
                  <span className="text-zinc-600">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={10} />
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded border border-dashed px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                    exp.status === "ACTIVE"
                      ? "border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]"
                      : exp.status === "PRODUCTION"
                      ? "border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500]"
                      : "border-white/15 bg-zinc-950 text-zinc-400"
                  }`}
                >
                  {exp.status === "ACTIVE" && (
                    <span className="h-1.5 w-1.5 bg-[#A3E635] animate-pulse" />
                  )}
                  [ {exp.status} ]
                </span>
              </div>
            </div>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl font-sans">
              {exp.description}
            </p>

            <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1 sm:gap-1.5 pt-2 border-t border-dashed border-white/10">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-dashed border-white/15 bg-white/[0.03] px-2 py-0.5 font-mono text-[8px] sm:text-[9px] text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="rounded-lg border border-dashed border-white/15 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs text-[#FF5500] font-bold">[ 10 DEPLOYMENTS &amp; LEADERSHIP ]</span>
        <span className="text-[#A3E635] text-[10px] sm:text-xs">STATUS: 100%_VERIFIED</span>
      </div>
    </div>
  );
}
