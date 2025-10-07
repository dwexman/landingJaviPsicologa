"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ParticlesBackdrop = dynamic(() => import("@/components/ParticlesBackdrop"), { ssr: false });

import consulta1 from "../assets/consulta/consulta1.jpeg";
import consulta2 from "../assets/consulta/consulta2.jpeg";
import consulta3 from "../assets/consulta/consulta3.jpeg";
import consulta4 from "../assets/consulta/consulta4.jpeg";
import consulta5 from "../assets/consulta/consulta5.jpeg";
import consulta7 from "../assets/consulta/consulta7.jpeg";

export default function Consulta() {
  const images = useMemo(
    () => [consulta1, consulta2, consulta3, consulta4, consulta5, consulta7],
    []
  );

  const [idx, setIdx] = useState(-1);
  const open = (i) => setIdx(i);
  const close = () => setIdx(-1);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (idx === -1) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [idx, images.length]);

  return (
    <section id="consulta" className="relative py-20 md:py-28 overflow-hidden" aria-label="La consulta">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-sand/70 via-white to-brand-blush/60" />
        <ParticlesBackdrop
          className="absolute inset-0 z-10"
          color="#3A1320"
          opacity={0.22}
          rings={4}
          pointsPerRing={95}
          innerRadius={1.0}
          ringGap={0.72}
          baseSpeed={0.06}
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
                El espacio
              </span>

              <h2 className="mt-4 text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2F4F]">
                La consulta
              </h2>
              <p className="mt-4 text-center text-[#0A2F4F]/80 text-base md:text-lg">
                Un lugar tranquilo, moderno y acogedor pensado para tu terapia.
              </p>
            </div>
          </div>
        </div>

        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-10 items-stretch">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              className="card3d group relative h-full text-left focus:outline-none"
              aria-label={`Ampliar imagen ${i + 1}`}
            >
              <div className="border3d rounded-2xl p-[2px]">
                <div className="card3d-inner relative rounded-[calc(1rem-2px)] border border-white/60 bg-white/65 backdrop-blur-md overflow-hidden shadow-[0_12px_26px_rgba(10,47,79,0.12)]">
                  <span className="sheen" aria-hidden />

                  <div className="relative aspect-[4/3] cursor-zoom-in">
                    <Image
                      src={img}
                      alt={`Consulta ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      priority={i < 2}
                    />

                    <span className="pointer-events-none absolute inset-0 rounded-[calc(1rem-2px)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.55),inset_0_-2px_8px_rgba(10,47,79,0.10)]" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <span className="cta absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-[#0A2F4F] shadow-[0_6px_16px_rgba(10,47,79,0.18)] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M21 21l-4.2-4.2m1.7-5.3a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {idx !== -1 && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          role="dialog"
          aria-modal
          aria-label={`Imagen ${idx + 1} de ${images.length}`}
        >
          <button
            aria-label="Cerrar"
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
          >
            ✕
          </button>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute left-2 md:left-6 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white"
          >
            ‹
          </button>

          <img
            src={images[idx].src}
            alt={`Consulta ${idx + 1}`}
            className="max-h-[82vh] w-auto max-w-[92vw] rounded-xl shadow-2xl"
          />

          <button
            aria-label="Siguiente"
            onClick={next}
            className="absolute right-2 md:right-6 rounded-full p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white"
          >
            ›
          </button>
        </div>
      )}

      <style jsx>{`
        .card3d { transform-style: preserve-3d; perspective: 1200px; }
        .card3d-inner { transition: transform 300ms ease, box-shadow 300ms ease; will-change: transform, box-shadow; }
        .card3d:hover .card3d-inner,
        .card3d:focus-within .card3d-inner {
          transform: translateY(-6px) rotateX(2deg) rotateY(-2deg);
          box-shadow: 0 22px 50px rgba(10,47,79,0.20);
        }

        .border3d {
          background:
            conic-gradient(from 210deg at 50% 50%,
              rgba(255,255,255,0.85),
              rgba(255,255,255,0.35) 20%,
              rgba(10,47,79,0.18) 55%,
              rgba(255,255,255,0.65) 90%,
              rgba(255,255,255,0.85));
          filter: drop-shadow(0 8px 18px rgba(10,47,79,0.10));
          transition: filter 300ms ease, transform 300ms ease;
        }
        .card3d:hover .border3d,
        .card3d:focus-within .border3d {
          filter: drop-shadow(0 16px 36px rgba(10,47,79,0.18));
          transform: translateZ(0.001px); /* evita artefactos */
        }

        .sheen {
          position: absolute;
          inset: -2px;
          border-radius: calc(1rem - 1px);
          background: linear-gradient(120deg, rgba(255,255,255,0.7), rgba(255,255,255,0) 60%);
          transform: translateX(-120%) skewX(-15deg);
          transition: transform 700ms ease;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .card3d:hover .sheen,
        .card3d:focus-within .sheen {
          transform: translateX(120%) skewX(-15deg);
        }

        /* botón lupa: leve “pop” */
        .card3d:hover .cta,
        .card3d:focus-within .cta {
          transform: translateZ(1px) scale(1.02);
          transition: transform 200ms ease;
        }
      `}</style>
    </section>
  );
}
