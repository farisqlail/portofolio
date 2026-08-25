import { FileBadge, Trophy, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "How to Manage a Remote Team",
    issuer: "Coursera",
    date: "Feb 2022",
    credentialId: "2M5CBLYRL4JR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/2M5CBLYRL4JR",
    type: "Certificate",
  },
];

const achievements = [
  {
    rank: "3rd Place",
    rankColor: "#F6D1AC",
    title: "World Computer Hacker League (WCHL)",
    description: "Qualification Round (Indonesia) & Regional Round (Asia)",
    issuer: "WCHL International",
    date: "Oct 2025",
  },
  {
    rank: "2nd Place",
    rankColor: "#C7B8F5",
    title: "Hackathon 6.0 ICP Competition",
    description: "National Blockchain & Web3 Application Hackathon",
    issuer: "Codefest.id",
    date: "Sep 2024",
  },
  {
    rank: "1st Place",
    rankColor: "#A7EADC",
    title: "Pengembangan Aplikasi Android Nasional",
    description: "National Mobile Application Championship",
    issuer: "ITCC 2020 Univ Udayana Bali",
    date: "Nov 2020",
  },
  {
    rank: "2nd Place",
    rankColor: "#F3B5D2",
    title: "Web Design LKS Surabaya",
    description: "Regional Web Design Competition",
    issuer: "LKS SMK Surabaya",
    date: "Jan 2018",
  },
];

export default function Certifications() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Verified credentials &amp; <span className="gradient-pastel-text">hackathon honors.</span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Competitive programming, regional hackathons, and certified remote engineering management proficiencies.
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1">
        {/* Left: Hackathons (8 cols) */}
        <div className="lg:col-span-8 rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={15} className="text-[#F6D1AC]" />
                <h3 className="font-bold text-white text-xs sm:text-sm">Hackathon &amp; Competition Honors</h3>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-500">[ 4 Awards ]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg sm:rounded-xl border border-white/10 bg-zinc-950 p-3 sm:p-4 transition-colors hover:border-white/30"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                    <span
                      className="rounded px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${item.rankColor}15`,
                        color: item.rankColor,
                        border: `1px solid ${item.rankColor}40`,
                      }}
                    >
                      {item.rank}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500">{item.date}</span>
                  </div>

                  <h4 className="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
                    {item.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 font-mono text-[10px] sm:text-[11px] text-zinc-500">
            <span>[ International &amp; National Competitions ]</span>
          </div>
        </div>

        {/* Right: Certificate (4 cols) */}
        <div className="lg:col-span-4 rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <FileBadge size={15} className="text-[#C7B8F5]" />
                <h3 className="font-bold text-white text-xs sm:text-sm">Certificate</h3>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-500">[ Coursera ]</span>
            </div>

            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="rounded-lg sm:rounded-xl border border-white/10 bg-zinc-950 p-3.5 sm:p-4"
              >
                <span className="rounded border border-[#C7B8F5]/30 bg-[#C7B8F5]/10 px-2 py-0.5 font-mono text-[8px] sm:text-[9px] text-[#C7B8F5] uppercase">
                  {cert.type}
                </span>

                <h4 className="mt-2 font-bold text-white text-xs sm:text-sm leading-snug">
                  {cert.title}
                </h4>

                <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                  {cert.issuer} · {cert.date}
                </p>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500">
                    ID: {cert.credentialId}
                  </span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-white hover:text-[#C7B8F5] transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 font-mono text-[10px] text-zinc-500">
            [ Verified Credentials ]
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="rounded-lg sm:rounded-xl border border-white/10 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs">[ Verified Records ]</span>
        <span className="text-white font-medium text-[10px] sm:text-xs">100% Authentic</span>
      </div>
    </div>
  );
}
