"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SECTIONS = ["sobre-mi", "servicios", "consulta", "contacto"];

function NavItem({ id, label, active, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={`
        group relative rounded-full px-3 py-2 text-sm transition-all
        ${active ? "text-brand-primary" : "text-slate-700 hover:text-brand-primary"}
        hover:bg-white/60
      `}
    >
      <span>{label}</span>
      <span
        className={`
          pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full
          bg-brand-primary transition-transform origin-left
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("sobre-mi");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const opts = { root: null, rootMargin: "-35% 0px -55% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, opts);
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Menú visible (sin testimonios)
  const desktop = useMemo(
    () => [
      { id: "sobre-mi", label: "Sobre mí" },
      { id: "servicios", label: "Servicios" },
      { id: "consulta", label: "La consulta" },
      // { id: "testimonios", label: "Testimonios" }, // oculto por ahora
    ],
    []
  );

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="h-0.5 bg-gradient-to-r from-brand-primary to-brand-dark transition-[width]"
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 mt-2">
        <div
          className={`
            relative flex h-14 items-center justify-between rounded-xl2 border
            ${scrolled ? "shadow-[0_10px_30px_rgba(126,46,59,0.12)]" : "shadow-soft"}
            border-white/30 bg-white/55 backdrop-blur-md ring-1 ring-black/5
            pl-3 pr-6 sm:pl-4 sm:pr-8 lg:pl-5 lg:pr-12 xl:pr-16
          `}
        >
          <div className="pointer-events-none absolute -z-10 -inset-x-4 -top-6 h-16 bg-gradient-to-r from-brand-light/40 via-transparent to-brand-light/40 blur-2xl" />

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-2 py-1.5"
            aria-label="Ir al inicio"
          >
            <Image
              src="/assets/logo222.png"
              alt="Logo Javi Psicóloga"
              width={36}
              height={36}
              priority
              className="h-8 w-auto sm:h-9"
            />

            <span className="hidden sm:block font-serif text-lg tracking-tight text-slate-900">
              Psicología
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {desktop.map((l) => (
              <NavItem
                key={l.id}
                id={l.id}
                label={l.label}
                active={active === l.id}
              />
            ))}
            <a
              href="#contacto"
              className="
                ml-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm text-white
                bg-gradient-to-r from-brand-primary to-brand-dark shadow-soft
                hover:opacity-95 active:translate-y-[1px] transition
              "
            >
              Contacto
            </a>
          </nav>

          {/* Botón mobile */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex size-10 items-center justify-center rounded-lg border border-slate-300/60 bg-white/70"
          >
            <span className="sr-only">Menú</span>
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 right-0 top-1 block h-0.5 bg-slate-800 transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-2.5 block h-0.5 bg-slate-800 transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-4 block h-0.5 bg-slate-800 transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`md:hidden transition-all ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="fixed inset-0 top-16 bg-white/70 backdrop-blur-md border-t border-white/30">
          <div className="section py-6 flex flex-col gap-2">
            {desktop.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={`
                  rounded-xl2 px-4 py-3 text-base shadow-soft border
                  ${
                    active === id
                      ? "bg-brand-blush/90 text-brand-primary border-brand-light/60"
                      : "bg-white border-white/60"
                  }
                `}
              >
                {label}
              </a>
            ))}

            <a
              href="#contacto"
              onClick={closeMenu}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl2 px-4 py-3 text-base text-white bg-gradient-to-r from-brand-primary to-brand-dark shadow-soft"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
