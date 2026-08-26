import { FileBadge, Trophy, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "How to Manage a Remote Team",
    issuer: "Coursera",
    date: "Feb 2022",
    credentialId: "2M5CBLYRL4JR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/2M5CBLYRL4JR",
    type: "CERTIFICATE",
  },
];

const achievements = [
  {
    rank: "3RD PLACE",
    rankColor: "#FF5500",
    title: "World Computer Hacker League (WCHL)",
    description: "Qualification Round (Indonesia) & Regional Round (Asia)",
    issuer: "WCHL International",
    date: "Oct 2025",
  },
  {
    rank: "2ND PLACE",
    rankColor: "#A3E635",
    title: "Hackathon 6.0 ICP Competition",
    description: "National Blockchain & Web3 Application Hackathon",
    issuer: "Codefest.id",
    date: "Sep 2024",
  },
  {
    rank: "1ST PLACE",
    rankColor: "#FF5500",
    title: "Pengembangan Aplikasi Android Nasional",
    description: "National Mobile Application Championship",
    issuer: "ITCC 2020 Univ Udayana Bali",
    date: "Nov 2020",
  },
  {
    rank: "2ND PLACE",
    rankColor: "#C7B8F5",
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
      <div className="border-b border-dashed border-white/15 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Awards &amp;{" "}
          <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
            credentials.
          </span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
          National hackathon awards, regional web competitions, and verified engineering certifications.
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1">
        {/* Left: Hackathons (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-dashed border-white/20 bg-black/60 p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={15} className="text-[#FF5500]" />
                <h3 className="font-bold font-sans text-white text-xs sm:text-sm">Hackathon &amp; Competition Honors</h3>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-400">[ 4 HONORS ]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-dashed border-white/15 bg-zinc-950/80 p-3 sm:p-4 transition-colors hover:border-[#FF5500]/50"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                    <span
                      className="rounded border border-dashed px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${item.rankColor}15`,
                        color: item.rankColor,
                        borderColor: `${item.rankColor}50`,
                      }}
                    >
                      [ {item.rank} ]
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500">{item.date}</span>
                  </div>

                  <h4 className="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 font-sans">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <p className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] text-zinc-500 pt-1.5 border-t border-dashed border-white/10">
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
        <div className="lg:col-span-4 rounded-xl border border-dashed border-white/20 bg-black/60 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <FileBadge size={15} className="text-[#A3E635]" />
                <h3 className="font-bold font-sans text-white text-xs sm:text-sm">Certificate</h3>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-400">[ COURSERA ]</span>
            </div>

            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="rounded-lg border border-dashed border-white/15 bg-zinc-950/80 p-3.5 sm:p-4"
              >
                <span className="rounded border border-dashed border-[#A3E635]/40 bg-[#A3E635]/10 px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold text-[#A3E635] uppercase">
                  [ {cert.type} ]
                </span>

                <h4 className="mt-2 font-bold text-white text-xs sm:text-sm leading-snug font-sans">
                  {cert.title}
                </h4>

                <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                  {cert.issuer} · {cert.date}
                </p>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-dashed border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500">
                    ID: {cert.credentialId}
                  </span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-[#FF5500] hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-dashed border-white/10 font-mono text-[10px] text-zinc-500">
            [ VERIFIED CREDENTIALS ]
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="rounded-lg border border-dashed border-white/15 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs text-[#FF5500] font-bold">[ VERIFIED HONORS ]</span>
        <span className="text-[#A3E635] text-[10px] sm:text-xs">STATUS: INDEXED</span>
      </div>
    </div>
  );
}
