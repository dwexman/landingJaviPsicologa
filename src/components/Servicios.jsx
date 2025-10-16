"use client";

import dynamic from "next/dynamic";

const ParticlesBackdrop = dynamic(() => import("@/components/ParticlesBackdrop"), { ssr: false });

const SERVICIOS = [
    {
        key: "individual", titulo: "Terapia individual", emoji: "🌿",
        desc: "Explora emociones, hábitos y fortalece tus recursos personales con un acompañamiento cercano.",
        bullets: ["Ansiedad y estrés", "Duelo y cambios vitales", "Autocuidado y límites"],
        chip: "Presencial / online"
    },
    {
        key: "pareja", titulo: "Terapia de pareja", emoji: "💞",
        desc: "Comunicación, reparación del vínculo y acuerdos sostenibles para su proyecto en común.",
        bullets: ["Conflictos y desencuentros", "Reparto de tareas", "Decisiones compartidas"],
        chip: "80–90 min"
    },
    {
        key: "familiar", titulo: "Terapia familiar", emoji: "👨‍👩‍👧‍👦",
        desc: "Comprensión de las problemáticas y conflictos.",
        bullets: ["Roles y límites", "Crianza respetuosa", "Comunicación efectiva"],
        chip: "En consulta"
    },
    {
        key: "online", titulo: "Terapia online", emoji: "💻",
        desc: "Flexibilidad y cercanía desde donde estés, con la misma calidad clínica.",
        bullets: ["Formato híbrido", "Horarios adaptables", "Seguimiento"],
        chip: "Zoom/Meet"
    }
];

export default function Servicios() {
    return (
        <section id="servicios" className="relative py-20 md:py-28 overflow-hidden" aria-label="Servicios">
            <div aria-hidden className="absolute inset-0">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-sand/70 via-white to-brand-blush/60" />
                <ParticlesBackdrop
                    className="absolute inset-0 z-10"
                    color="#3A1320"
                    opacity={0.24}
                    rings={4}
                    pointsPerRing={95}
                    innerRadius={0.9}
                    ringGap={0.68}
                    baseSpeed={0.07}
                    size={0.05}
                    centerX={0}
                />
            </div>

            <div className="relative z-20 mx-auto max-w-7xl px-6">
                <div className="relative mx-auto mb-14 md:mb-20 max-w-3xl">
                    <div className="relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-white/70 via-white/20 to-white/60">
                        <div className="relative rounded-[1.65rem] border border-white/60 bg-white/50 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_60px_rgba(60,64,67,0.20)]">
                            <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] ring-1 ring-white/40" />
                            <div className="pointer-events-none absolute -top-10 -left-14 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-12 -right-16 h-44 w-44 rounded-full bg-brand-primary/10 blur-3xl" />

                            <span className="mx-auto block w-max rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs tracking-wide text-slate-700 shadow-sm">
                                ¿Cómo puedo ayudarte?
                            </span>

                            <h2 className="mt-4 text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2F4F]">
                                Servicios de terapia
                            </h2>
                            <p className="mt-4 text-center text-[#0A2F4F]/80 text-base md:text-lg">
                                Solo realizo <strong>procesos psicológicos de larga data</strong> (mediana y alta complejidad).
                                No realizo <strong>evaluaciones psicológicas</strong> ni <strong>talleres</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-stretch">
                    {SERVICIOS.map((s) => (
                        <article key={s.key} className="group relative h-full">
                            <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-brand-primary/30 via-brand-dark/20 to-brand-primary/30 overflow-hidden">
                                <div className="relative flex h-full flex-col rounded-[calc(1rem-1px)] border border-white/50 bg-white/60 backdrop-blur-md shadow-[0_12px_26px_rgba(60,64,67,0.16)] transition-all duration-300 group-hover:shadow-[0_22px_50px_rgba(60,64,67,0.22)] group-hover:-translate-y-1">
                                    <div className="p-6 flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-dark/20 text-lg"
                                                style={{ animation: "float 5s ease-in-out infinite" }}
                                            >
                                                <span aria-hidden>{s.emoji}</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-extrabold text-[#0A2F4F]">{s.titulo}</h3>
                                        </div>

                                        <p className="text-slate-700/90 text-sm md:text-base">{s.desc}</p>

                                        <ul className="mt-1 space-y-2 text-slate-700">
                                            {s.bullets.map((b, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-dark/60" />
                                                    <span className="text-sm md:text-[15px]">{b}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto flex items-center justify-between pt-4">
                                            <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                                                {s.chip}
                                            </span>
                                            <a
                                                href="#contacto"
                                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-dark px-4 py-2 text-white text-sm shadow hover:opacity-95 active:translate-y-[1px] transition"
                                            >
                                                Agendar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
        </section>
    );
}

export { SERVICIOS };
