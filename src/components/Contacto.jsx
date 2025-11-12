"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ParticlesBackdrop = dynamic(() => import("@/components/ParticlesBackdrop"), { ssr: false });

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyeDHdmlnPTpd3ThZ_-VbXW1lm9KySwN6C96qVP-4EV5AUCcl6XcFVO81jeP9zG-UHuiQ/exec";


export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const maxChars = 800;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    // Honeypot para bots
    if (form.website) return;

    // Validaciones
    if (form.nombre.trim().length < 2) {
      return setError("Por favor, escribe tu nombre.");
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      return setError("Ingresa un correo válido.");
    }

    const phoneDigits = form.telefono.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      return setError("Ingresa un teléfono válido.");
    }

    if (form.mensaje.trim().length < 10) {
      return setError("Cuéntame un poco más en tu mensaje (mín. 10 caracteres).");
    }

    if (form.mensaje.length > maxChars) {
      return setError(`Tu mensaje supera los ${maxChars} caracteres.`);
    }

    setLoading(true);

    try {
      // 👇 Enviamos los datos a Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // importante para evitar problemas de CORS
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          mensaje: form.mensaje,
        }),
      });

      // Si no hubo error en el fetch, asumimos que se envió bien
      setOk(true);
      setForm({ nombre: "", email: "", telefono: "", mensaje: "", website: "" });
    } catch (e) {
      console.error(e);
      setError("Ocurrió un problema al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="contacto" className="relative py-20 md:py-28 overflow-hidden" aria-label="Contacto">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-sand/70 via-white to-brand-blush/60" />
        <ParticlesBackdrop
          className="absolute inset-0 z-10"
          color="#3A1320"
          opacity={0.12}
          rings={4}
          pointsPerRing={90}
          innerRadius={1.0}
          ringGap={0.7}
          baseSpeed={0.06}
          size={0.05}
          centerX={0}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-3xl px-6">
        <div className="relative mx-auto mb-10 md:mb-14">
          <div className="relative rounded-[1.5rem] p-[1px] bg-gradient-to-br from-white/70 via-white/20 to-white/60">
            <div className="relative rounded-[calc(1.5rem-1px)] border border-white/60 bg-white/60 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_60px_rgba(60,64,67,0.20)]">
              <div className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] ring-1 ring-white/40" />
              <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2F4F]">
                Contacto
              </h2>
              <p className="mt-3 text-center text-[#0A2F4F]/80">
                ¿Tienes dudas o quieres agendar? Déjame tu mensaje y te respondo a la brevedad.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-[1.25rem] p-[1px] bg-gradient-to-br from-brand-primary/30 via-brand-dark/20 to-brand-primary/30">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-[calc(1.25rem-1px)] border border-white/60 bg-white/60 backdrop-blur-xl p-6 md:p-8 shadow-[0_12px_26px_rgba(10,47,79,0.12)]"
            noValidate
          >
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-[#0A2F4F]">
                    Nombre <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={onChange}
                    placeholder="Tu nombre"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0A2F4F]">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-[#0A2F4F]">
                  Teléfono <span className="text-red-600">*</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  value={form.telefono}
                  onChange={onChange}
                  placeholder="+56 9 1234 5678"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-[#0A2F4F]">
                  Mensaje <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={6}
                    maxLength={maxChars}
                    value={form.mensaje}
                    onChange={onChange}
                    placeholder="Cuéntame brevemente en qué te puedo ayudar…"
                    className="mt-2 w-full resize-none rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 shadow-inner placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30"
                    required
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-slate-500">
                    {form.mensaje.length}/{maxChars}
                  </span>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100" role="alert">
                  {error}
                </div>
              )}
              {ok && (
                <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 border border-emerald-100" aria-live="polite">
                  ¡Gracias! Tu mensaje fue enviado. Te contactaré pronto.
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-3 text-white text-sm shadow hover:opacity-95 active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Enviando…" : "Enviar mensaje"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          También me puedes escribir al correo o WhatsApp.
        </div>
      </div>
    </section>
  );
}
