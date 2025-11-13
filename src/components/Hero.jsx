import Image from "next/image";
import ThreeCalmNetwork from "@/components/ThreeCalmNetwork";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyeDHdmlnPTpd3ThZ_-VbXW1lm9KySwN6C96qVP-4EV5AUCcl6XcFVO81jeP9zG-UHuiQ/exec";

async function getHeroContent() {
  const defaults = {
    badge: "Psicóloga clínica · Enfoque psicoanalítico",
    title: "Ps. Javiera Sepulveda Peragallo",
    paragraph:
      "Acompañamientos psicológicos de mediana y alta complejidad. Experiencia en trauma, abuso, depresión, dismorfia corporal, bipolaridad, TLP y toxicomanías. Trabajo en sesiones individuales, de pareja y familiares, respetando el ritmo subjetivo, la historia vital y el contexto de cada persona.",
    chip1: "7+ años de práctica · 12 años de estudios",
    chip2: "Online y presencial",
    chip3: "Espacio seguro y confidencial",
  };

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      // Si algo raro pasa con el servidor, usamos defaults
      return defaults;
    }

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // La respuesta no era JSON (por ejemplo, HTML de error o login)
      // → volvemos a los defaults
      return defaults;
    }

    return {
      badge: data.badge || defaults.badge,
      title: data.title || defaults.title,
      paragraph: data.paragraph || defaults.paragraph,
      chip1: data.chip1 || defaults.chip1,
      chip2: data.chip2 || defaults.chip2,
      chip3: data.chip3 || defaults.chip3,
    };
  } catch {
    // Error de red, etc. → defaults
    return defaults;
  }
}

export default async function Hero() {
  const hero = await getHeroContent();

  return (
    <section
      id="sobre-mi"
      className="relative overflow-hidden pt-28 pb-16 min-h-[520px]"
      aria-label="Sobre mí"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blush/80 via-white to-brand-sand/90" />
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[55%]">
          <ThreeCalmNetwork
            className="absolute inset-0"
            color="#6C2938"
            lineColor="#3A1320"
            lineOpacity={0.32}
            pointSizePx={2.4}
            pointOpacity={0.8}
            speed={0.05}
            offsetX={0.45}
            count={64}
            neighbors={2}
            radius={2.2}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/18 via-black/10 to-transparent" />
        </div>
      </div>

      <div className="section relative z-30">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Texto */}
          <div className="max-w-xl rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-soft p-6 md:p-8">
            <span className="inline-block rounded-full border border-brand-light bg-white/70 px-3 py-1 text-xs tracking-wide text-slate-700">
              {hero.badge}
            </span>

            <h1 className="h1 mt-4 leading-tight">
              {hero.title}
            </h1>

            <p className="mt-4 text-base/7 text-slate-700">
              {hero.paragraph}
            </p>

            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                {hero.chip1}
              </li>
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                {hero.chip2}
              </li>
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                {hero.chip3}
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-3 text-white shadow-soft hover:opacity-95 active:translate-y-[1px] transition"
              >
                Contacto
              </a>
              <a
                href="#servicios"
                className="text-sm text-brand-primary underline underline-offset-4 hover:opacity-80"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Foto */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-light/60 to-white blur-xl" />
            <div className="card overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80">
              <div className="relative w-full h-[380px] md:h-[440px] lg:h-[500px]">
                <Image
                  src="/assets/fotojavi.jpg"
                  alt="Psicóloga - retrato de Javi"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width:1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
