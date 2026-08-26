import React from "react";

interface BeamDef {
  id: string;
  width: number;
  direction: "ltr" | "rtl";
  duration: number;
  delay: number;
  gradient: string;
  height: number;
}

interface LaneDef {
  id: number;
  beams: BeamDef[];
}

export default function AmbientGridBeams() {
  // Gradients matching user's reference image:
  // Top: Violet & Magenta palette
  // Bottom: Warm Amber & Coral palette
  const violetPink = "linear-gradient(90deg, rgba(124,58,237,0.95) 0%, rgba(217,70,239,0.95) 60%, rgba(244,63,94,0.9) 100%)";
  const darkViolet = "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(30,27,75,0.85) 40%, rgba(124,58,237,0.95) 100%)";
  const violetDarkPink = "linear-gradient(90deg, rgba(124,58,237,0.95) 0%, rgba(15,10,30,0.9) 50%, rgba(244,63,94,0.95) 100%)";
  const softLavender = "linear-gradient(90deg, rgba(167,139,250,0.9) 0%, rgba(232,121,249,0.9) 100%)";

  const orangeCoral = "linear-gradient(90deg, rgba(249,115,22,0.95) 0%, rgba(251,146,60,0.95) 50%, rgba(244,63,94,0.95) 100%)";
  const darkOrange = "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(67,20,7,0.85) 40%, rgba(249,115,22,0.95) 100%)";
  const amberDarkCoral = "linear-gradient(90deg, rgba(245,158,11,0.95) 0%, rgba(20,10,10,0.9) 50%, rgba(239,68,68,0.95) 100%)";
  const brightAmber = "linear-gradient(90deg, rgba(251,191,36,0.95) 0%, rgba(249,115,22,0.95) 100%)";

  const lanes: LaneDef[] = [
    // Lane 0: Violet / Pink
    {
      id: 0,
      beams: [
        {
          id: "0-1",
          width: 260,
          direction: "ltr",
          duration: 16,
          delay: 0,
          gradient: violetDarkPink,
          height: 32,
        },
      ],
    },
    // Lane 1: Dark to Violet & Violet/Pink
    {
      id: 1,
      beams: [
        {
          id: "1-1",
          width: 220,
          direction: "rtl",
          duration: 20,
          delay: 2,
          gradient: darkViolet,
          height: 32,
        },
        {
          id: "1-2",
          width: 440,
          direction: "rtl",
          duration: 20,
          delay: 10,
          gradient: violetPink,
          height: 32,
        },
      ],
    },
    // Lane 2: Violet/Pink small bars
    {
      id: 2,
      beams: [
        {
          id: "2-1",
          width: 180,
          direction: "ltr",
          duration: 22,
          delay: 3,
          gradient: violetDarkPink,
          height: 30,
        },
        {
          id: "2-2",
          width: 240,
          direction: "ltr",
          duration: 22,
          delay: 13,
          gradient: softLavender,
          height: 30,
        },
      ],
    },
    // Lane 3: Violet Dark Pink wide
    {
      id: 3,
      beams: [
        {
          id: "3-1",
          width: 420,
          direction: "rtl",
          duration: 24,
          delay: 1,
          gradient: violetPink,
          height: 32,
        },
      ],
    },
    // Lane 4: Transition to Amber/Orange
    {
      id: 4,
      beams: [
        {
          id: "4-1",
          width: 200,
          direction: "ltr",
          duration: 18,
          delay: 2,
          gradient: darkOrange,
          height: 32,
        },
        {
          id: "4-2",
          width: 380,
          direction: "ltr",
          duration: 18,
          delay: 11,
          gradient: amberDarkCoral,
          height: 32,
        },
      ],
    },
    // Lane 5: Amber & Coral blocks
    {
      id: 5,
      beams: [
        {
          id: "5-1",
          width: 190,
          direction: "rtl",
          duration: 22,
          delay: 4,
          gradient: amberDarkCoral,
          height: 30,
        },
        {
          id: "5-2",
          width: 260,
          direction: "rtl",
          duration: 22,
          delay: 14,
          gradient: brightAmber,
          height: 30,
        },
      ],
    },
    // Lane 6: Wide orange/coral band
    {
      id: 6,
      beams: [
        {
          id: "6-1",
          width: 180,
          direction: "ltr",
          duration: 25,
          delay: 1,
          gradient: darkOrange,
          height: 34,
        },
        {
          id: "6-2",
          width: 520,
          direction: "ltr",
          duration: 25,
          delay: 12,
          gradient: orangeCoral,
          height: 34,
        },
      ],
    },
    // Lane 7: Long amber bar
    {
      id: 7,
      beams: [
        {
          id: "7-1",
          width: 220,
          direction: "rtl",
          duration: 19,
          delay: 3,
          gradient: darkOrange,
          height: 32,
        },
        {
          id: "7-2",
          width: 480,
          direction: "rtl",
          duration: 19,
          delay: 12,
          gradient: orangeCoral,
          height: 32,
        },
      ],
    },
    // Lane 8: Bottom amber/coral accent
    {
      id: 8,
      beams: [
        {
          id: "8-1",
          width: 280,
          direction: "ltr",
          duration: 23,
          delay: 5,
          gradient: amberDarkCoral,
          height: 32,
        },
      ],
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508] select-none">
      {/* Blueprint Micro Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Dashed vertical grid guides */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 divide-x divide-dashed divide-white/[0.07] opacity-80" />

      {/* Dashed horizontal lane tracks */}
      <div className="absolute inset-0 flex flex-col justify-between divide-y divide-dashed divide-white/[0.07]">
        {lanes.map((lane) => (
          <div
            key={lane.id}
            className="relative flex-1 w-full overflow-hidden flex items-center"
          >
            {lane.beams.map((beam) => {
              const animClass =
                beam.direction === "ltr"
                  ? "animate-beam-ltr"
                  : "animate-beam-rtl";

              return (
                <div
                  key={beam.id}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-md shadow-2xl ${animClass}`}
                  style={
                    {
                      width: `${beam.width}px`,
                      height: `${beam.height}px`,
                      background: beam.gradient,
                      boxShadow: "0 0 25px rgba(255,85,0,0.25)",
                      "--beam-dur": `${beam.duration}s`,
                      "--beam-del": `${beam.delay}s`,
                    } as React.CSSProperties
                  }
                >
                  {/* Grain/noise texture highlight */}
                  <div className="absolute inset-0 bg-white/10 opacity-30 rounded-md mix-blend-overlay" />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/85 pointer-events-none z-10" />
    </div>
  );
}
