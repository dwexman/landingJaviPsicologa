import Image from "next/image";
import ThreeCalmNetwork from "@/components/ThreeCalmNetwork";
import fotoJavi from "@/assets/fotojavi.jpg";

export default function Hero() {
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
              Psicóloga clínica · Enfoque psicoanalítico
            </span>

            <h1 className="h1 mt-4 leading-tight">
              Ps. Javiera Sepulveda Peragallo
            </h1>

            <p className="mt-4 text-base/7 text-slate-700">
              Acompañamientos psicológicos de <strong>mediana y alta complejidad</strong>. Experiencia en
              <strong> trauma</strong>, <strong>abuso</strong>, <strong>depresión</strong>, <strong>dismorfia corporal</strong>,
              <strong> bipolaridad</strong>, <strong>TLP</strong> y <strong>toxicomanías</strong>.
              Trabajo en <strong>sesiones individuales</strong>, <strong>de pareja</strong> y <strong>familiares</strong>, respetando el
              ritmo subjetivo, la historia vital y el contexto de cada persona.
            </p>

            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                7+ años de práctica · 12 años de estudios
              </li>
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                Online y presencial
              </li>
              <li className="rounded-full bg-white/80 px-3 py-1 shadow-soft border border-white/70">
                Espacio seguro y confidencial
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
                  src={fotoJavi}
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
