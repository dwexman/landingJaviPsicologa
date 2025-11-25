import Image from "next/image";
import ThreeCalmNetwork from "@/components/ThreeCalmNetwork";

const SHEET_ID = "1YbNnkDsgNmGFBSytFJ97BtgpelbCvtvwIDVGalw8ZhU";
const SHEET_GID = "514359790";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

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
    const res = await fetch(SHEET_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return defaults;
    }

    const text = await res.text();

  
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) {
      return defaults;
    }

    const json = JSON.parse(match[1]);
    const table = json.table;

    if (!table || !table.rows || !table.rows.length) {
      return defaults;
    }

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

  
    const dataRow = rows[1] || rows[0]; 
    const row = dataRow.c || [];

    const getCell = (index) => (row[index] && row[index].v) || "";

    return {
      badge: getCell(0) || defaults.badge,
      title: getCell(1) || defaults.title,
      paragraph: getCell(2) || defaults.paragraph,
      chip1: getCell(3) || defaults.chip1,
      chip2: getCell(4) || defaults.chip2,
      chip3: getCell(5) || defaults.chip3,
    };
  } catch (err) {
    console.error("Error leyendo Google Sheet del Hero:", err);
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
