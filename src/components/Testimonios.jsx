"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const ParticlesBackdrop = dynamic(() => import("@/components/ParticlesBackdrop"), { ssr: false });

const TESTIMONIOS_INICIALES = [
  {
    nombre: "Carolina R.",
    etiqueta: "Terapia individual",
    texto:
      "Me sentí escuchada desde la primera sesión. Aprendí herramientas simples que realmente uso día a día.",
    fecha: "2025-04",
  },
  {
    nombre: "Matías y Daniela",
    etiqueta: "Terapia de pareja",
    texto:
      "Nos ayudó a bajar la defensiva y mejorar la forma de hablar de temas difíciles. Se notó el cambio.",
    fecha: "2025-03",
  },
  {
    nombre: "Ignacio T.",
    etiqueta: "Terapia online",
    texto:
      "La modalidad online fue súper cómoda. Mantuvimos continuidad incluso viajando y eso me ayudó mucho.",
    fecha: "2025-01",
  },
];

function TestimonialCard({ t }) {
  const iniciales = useMemo(
    () => t.nombre.split(" ").map((n) => n[0]).slice(0, 2).join(""),
    [t.nombre]
  );

  return (
    <article className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-brand-primary/30 via-brand-dark/20 to-brand-primary/30">
      <div className="relative flex h-full flex-col rounded-[calc(1rem-1px)] border border-white/60 bg-white/60 backdrop-blur-md shadow-[0_12px_26px_rgba(10,47,79,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_rgba(10,47,79,0.18)]">
        <div className="pointer-events-none absolute -top-3 -left-1">
          <span className="text-[64px] leading-none text-brand-dark/10 select-none">“</span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <p className="text-[15px] md:text-base text-slate-800">{t.texto}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-dark/20 text-sm font-bold text-[#0A2F4F]">
                {iniciales}
              </div>
              <div>
                <div className="font-semibold text-[#0A2F4F] leading-tight">{t.nombre}</div>
                {t.etiqueta && <div className="text-xs text-slate-600">{t.etiqueta}</div>}
              </div>
            </div>
            {t.fecha && <span className="text-xs text-slate-500">{t.fecha}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonios() {
  const [items, setItems] = useState(TESTIMONIOS_INICIALES);
  const [form, setForm] = useState({ nombre: "", texto: "", website: "" }); 
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const maxChars = 400;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (form.website) return;

    if (form.nombre.trim().length < 2) {
      setError("Por favor, escribe tu nombre (mínimo 2 caracteres).");
      return;
    }
    if (form.texto.trim().length < 10) {
      setError("Tu testimonio es muy corto (mínimo 10 caracteres).");
      return;
    }
    if (form.texto.length > maxChars) {
      setError(`Tu testimonio supera los ${maxChars} caracteres.`);
      return;
    }


    const nuevo = {
      nombre: form.nombre.trim(),
      etiqueta: "",       
      texto: form.texto.trim(),
      fecha: new Date().toISOString().slice(0, 7), 
    };
    setItems((prev) => [nuevo, ...prev]);
    setForm({ nombre: "", texto: "", website: "" });
    setOk(true);
  };

  return (
    <section id="testimonios" className="relative py-20 md:py-28 overflow-hidden" aria-label="Testimonios">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-sand/70 via-white to-brand-blush/60" />
        <ParticlesBackdrop
          className="absolute inset-0 z-10"
          color="#3A1320"
          opacity={0.16}
          rings={4}
          pointsPerRing={95}
          innerRadius={1.0}
          ringGap={0.7}
          baseSpeed={0.06}
          size={0.05}
          centerX={0}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="relative mx-auto mb-14 md:mb-20 max-w-3xl">
          <div className="relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-white/70 via-white/20 to-white/60">
            <div className="relative rounded-[1.65rem] border border-white/60 bg-white/50 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_60px_rgba(60,64,67,0.20)]">
              <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] ring-1 r ing-white/40" />
              <div className="pointer-events-none absolute -top-10 -left-14 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -right-16 h-44 w-44 rounded-full bg-brand-primary/10 blur-3xl" />

              <span className="mx-auto block w-max rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs tracking-wide text-slate-700 shadow-sm">
                Lo que cuentan los pacientes
              </span>

              <h2 className="mt-4 text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2F4F]">
                Testimonios
              </h2>
              <p className="mt-4 text-center text-[#0A2F4F]/80 text-base md:text-lg">
                Comparte tu experiencia. Más adelante se guardará en Google Sheets y se mostrará aquí.
              </p>
            </div>
          </div>
        </div>

        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-10 mb-16">
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="relative rounded-[1.5rem] p-[1px] bg-gradient-to-br from-brand-primary/30 via-brand-dark/20 to-brand-primary/30">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[calc(1.5rem-1px)] border border-white/60 bg-white/60 backdrop-blur-xl p-6 md:p-8 shadow-[0_12px_26px_rgba(10,47,79,0.12)]"
              noValidate
            >
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-5">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-[#0A2F4F]">
                    Nombre <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                    placeholder="Escribe tu nombre"
                    className="mt-2 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="texto" className="block text-sm font-semibold text-[#0A2F4F]">
                    Tu testimonio <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="texto"
                      name="texto"
                      rows={5}
                      maxLength={maxChars}
                      value={form.texto}
                      onChange={(e) => setForm((f) => ({ ...f, texto: e.target.value }))}
                      placeholder="¿Cómo fue tu experiencia? (máx. 400 caracteres)"
                      className="mt-2 w-full resize-none rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                      required
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-slate-500">
                      {form.texto.length}/{maxChars}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100">
                    {error}
                  </div>
                )}
                {ok && (
                  <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 border border-emerald-100" aria-live="polite">
                    ¡Gracias! Tu testimonio fue enviado. (Por ahora se muestra de inmediato; luego se guardará en Google Sheets.)
                  </div>
                )}

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-3 text-white text-sm shadow hover:opacity-95 active:translate-y-[1px] transition"
                  >
                    Enviar testimonio
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
