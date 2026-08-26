import { Layout, Server, Database, Smartphone, GitBranch, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillModule {
  tag: string;
  title: string;
  icon: LucideIcon;
  color: string;
  skills: string[];
}

const skillModules: SkillModule[] = [
  {
    tag: "01 // FRONTEND",
    title: "Frontend Architecture",
    icon: Layout,
    color: "#FF5500",
    skills: [
      "React.js",
      "Next.js 16",
      "TypeScript",
      "Vue.js / Nuxt",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "HTML5 / CSS3",
      "PWAs & Responsive",
    ],
  },
  {
    tag: "02 // BACKEND",
    title: "Backend & Microservices",
    icon: Server,
    color: "#A3E635",
    skills: [
      "PHP",
      "Laravel Framework",
      "Node.js & Express",
      "CodeIgniter",
      "RESTful APIs",
      "GraphQL",
      "JWT & OAuth2",
      "Microservices",
    ],
  },
  {
    tag: "03 // DATA",
    title: "Data & Storage",
    icon: Database,
    color: "#C7B8F5",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Oracle DB",
      "Supabase",
      "Redis Caching",
      "Schema Design",
    ],
  },
  {
    tag: "04 // MOBILE",
    title: "Mobile Development",
    icon: Smartphone,
    color: "#FF5500",
    skills: [
      "React Native",
      "Flutter",
      "iOS Deployment",
      "Android SDK",
      "Offline-First",
      "Push Notifications",
    ],
  },
  {
    tag: "05 // DEVOPS",
    title: "DevOps & CI/CD",
    icon: GitBranch,
    color: "#A3E635",
    skills: [
      "Git & GitHub",
      "GitLab CI/CD",
      "Docker",
      "Linux Server Config",
      "Vercel Deployment",
      "Nginx",
    ],
  },
  {
    tag: "06 // LEADERSHIP",
    title: "Product & SDLC",
    icon: Brain,
    color: "#C7B8F5",
    skills: [
      "Agile & Scrum",
      "Product Management",
      "Technical Roadmapping",
      "Code Review",
      "Risk Mitigation",
      "System Architecture",
    ],
  },
];

export default function Skills() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="border-b border-dashed border-white/15 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Full-stack engineering &amp;{" "}
          <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
            cloud toolkit.
          </span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
          Production-tested technologies applied across high-scale applications, mobile clients, and distributed backends.
        </p>
      </div>

      {/* Modular Matrix Grid */}
      <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-white/15 flex-1">
        {skillModules.map((mod, index) => {
          const Icon = mod.icon;

          return (
            <div
              key={mod.title}
              className={`p-4 sm:p-5 lg:p-6 transition-all border-b border-dashed border-white/15 ${
                index >= 3 ? "lg:border-b-0" : ""
              } ${
                index % 2 === 1 ? "sm:border-r-0 lg:border-r" : ""
              } hover:bg-white/[0.02] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-zinc-400">
                    [{mod.tag}]
                  </span>
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded border border-dashed border-white/20 bg-zinc-950">
                    <Icon size={13} style={{ color: mod.color }} />
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white mb-2 sm:mb-2.5 tracking-tight font-sans">
                  {mod.title}
                </h3>

                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {mod.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-dashed border-white/15 bg-white/[0.03] px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-zinc-300 transition-colors hover:border-[#FF5500] hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info bar */}
      <div className="rounded-lg border border-dashed border-white/15 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs text-[#FF5500] font-bold">[ 6 DOMAINS · 40+ CORE SKILLS ]</span>
        <span className="text-[#A3E635] text-[10px] sm:text-xs">STATUS: PRODUCTION_READY</span>
      </div>
    </div>
  );
}
