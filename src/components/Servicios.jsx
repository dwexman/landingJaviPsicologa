"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticlesBackdrop = dynamic(
  () => import("@/components/ParticlesBackdrop"),
  { ssr: false }
);

// =======================
// CONTENIDO BASE TARJETAS
// (fallback si Google falla)
// =======================
const SERVICIOS = [
  {
    key: "individual",
    titulo: "Terapia individual",
    emoji: "🌿",
    desc: "Explora emociones, hábitos y fortalece tus recursos personales con un acompañamiento cercano.",
    bullets: ["Ansiedad y estrés", "Duelo y cambios vitales", "Autocuidado y límites"],
    chip: "Presencial / online",
  },
  {
    key: "pareja",
    titulo: "Terapia de pareja",
    emoji: "💞",
    desc: "Comunicación, reparación del vínculo y acuerdos sostenibles para su proyecto en común.",
    bullets: ["Conflictos y desencuentros", "Reparto de tareas", "Decisiones compartidas"],
    chip: "80–90 min",
  },
  {
    key: "familiar",
    titulo: "Terapia familiar",
    emoji: "👨‍👩‍👧‍👦",
    desc: "Comprensión de las problemáticas y conflictos.",
    bullets: ["Roles y límites", "Crianza respetuosa", "Comunicación efectiva"],
    chip: "En consulta",
  },
  {
    key: "online",
    titulo: "Terapia online",
    emoji: "💻",
    desc: "Flexibilidad y cercanía desde donde estés, con la misma calidad clínica.",
    bullets: ["Formato híbrido", "Horarios adaptables", "Seguimiento"],
    chip: "Zoom/Meet",
  },
];

// =======================
// GOOGLE SHEETS CONFIG
// =======================
const SHEET_ID = "1YbNnkDsgNmGFBSytFJ97BtgpelbCvtvwIDVGalw8ZhU";

// Header de la sección (pestaña "Servicios")
const SERVICIOS_SHEET_NAME = "Servicios";
const SERVICIOS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SERVICIOS_SHEET_NAME
)}`;

const serviciosHeaderDefaults = {
  badge: "¿Cómo puedo ayudarte?",
  title: "Servicios de terapia",
  paragraph:
    'Solo realizo <strong>procesos psicológicos de larga data</strong> (mediana y alta complejidad). No realizo <strong>evaluaciones psicológicas</strong> ni <strong>talleres</strong>.',
};

// Primera tarjeta (pestaña "serv1")
const SERV1_SHEET_NAME = "serv1";
const SERV1_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SERV1_SHEET_NAME
)}`;

const serv1Defaults = {
  titulo: "Terapia individual",
  desc: "Explora emociones, hábitos y fortalece tus recursos personales con un acompañamiento cercano.",
  bullets: ["Ansiedad y estrés", "Duelo y cambios vitales", "Autocuidado y límites"],
  chip: "Presencial / online",
};

// Segunda tarjeta (pestaña "Serv2")
const SERV2_SHEET_NAME = "Serv2";
const SERV2_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SERV2_SHEET_NAME
)}`;

const serv2Defaults = {
  titulo: "Terapia de pareja",
  desc: "Comunicación, reparación del vínculo y acuerdos sostenibles para su proyecto en común.",
  bullets: ["Conflictos y desencuentros", "Reparto de tareas", "Decisiones compartidas"],
  chip: "80–90 min",
};

// Tercera tarjeta (pestaña "Serv3")
const SERV3_SHEET_NAME = "Serv3";
const SERV3_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SERV3_SHEET_NAME
)}`;

const serv3Defaults = {
  titulo: "Terapia familiar",
  desc: "Comprensión de las problemáticas y conflictos.",
  bullets: ["Roles y límites", "Crianza respetuosa", "Comunicación efectiva"],
  chip: "En consulta",
};

// Cuarta tarjeta (pestaña "Serv4")
const SERV4_SHEET_NAME = "Serv4";
const SERV4_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SERV4_SHEET_NAME
)}`;

const serv4Defaults = {
  titulo: "Terapia online",
  desc: "Flexibilidad y cercanía desde donde estés, con la misma calidad clínica.",
  bullets: ["Formato híbrido", "Horarios adaptables", "Seguimiento"],
  chip: "Zoom/Meet",
};

// =======================
// HELPERS FETCH GOOGLE SHEETS
// =======================
async function fetchServiciosHeader() {
  try {
    const res = await fetch(SERVICIOS_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return serviciosHeaderDefaults;

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) return serviciosHeaderDefaults;

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || !table.rows.length) return serviciosHeaderDefaults;

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

    const dataRow = rows[1] || rows[0];
    const row = dataRow.c || [];
    const getCell = (index) => (row[index] && row[index].v) || "";

    return {
      badge: getCell(0) || serviciosHeaderDefaults.badge,
      title: getCell(1) || serviciosHeaderDefaults.title,
      paragraph: getCell(2) || serviciosHeaderDefaults.paragraph,
    };
  } catch (e) {
    console.error("Error leyendo Google Sheet de Servicios (header):", e);
    return serviciosHeaderDefaults;
  }
}

async function fetchServ1Card() {
  try {
    const res = await fetch(SERV1_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return serv1Defaults;

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) return serv1Defaults;

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || !table.rows.length) return serv1Defaults;

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

    const dataRow = rows[1] || rows[0];
    const row = dataRow.c || [];
    const getCell = (index) => (row[index] && row[index].v) || "";

    const bullets = [getCell(2), getCell(3), getCell(4)].filter(Boolean);

    return {
      titulo: getCell(0) || serv1Defaults.titulo,
      desc: getCell(1) || serv1Defaults.desc,
      bullets: bullets.length ? bullets : serv1Defaults.bullets,
      chip: getCell(5) || serv1Defaults.chip,
    };
  } catch (e) {
    console.error("Error leyendo Google Sheet de serv1:", e);
    return serv1Defaults;
  }
}

async function fetchServ2Card() {
  try {
    const res = await fetch(SERV2_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return serv2Defaults;

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) return serv2Defaults;

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || !table.rows.length) return serv2Defaults;

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

    const dataRow = rows[1] || rows[0];
    const row = dataRow.c || [];
    const getCell = (index) => (row[index] && row[index].v) || "";

    const bullets = [getCell(2), getCell(3), getCell(4)].filter(Boolean);

    return {
      titulo: getCell(0) || serv2Defaults.titulo,
      desc: getCell(1) || serv2Defaults.desc,
      bullets: bullets.length ? bullets : serv2Defaults.bullets,
      chip: getCell(5) || serv2Defaults.chip,
    };
  } catch (e) {
    console.error("Error leyendo Google Sheet de Serv2:", e);
    return serv2Defaults;
  }
}

async function fetchServ3Card() {
  try {
    const res = await fetch(SERV3_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return serv3Defaults;

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) return serv3Defaults;

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || !table.rows.length) return serv3Defaults;

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

    const dataRow = rows[1] || rows[0];
    const row = dataRow.c || [];
    const getCell = (index) => (row[index] && row[index].v) || "";

    const bullets = [getCell(2), getCell(3), getCell(4)].filter(Boolean);

    return {
      titulo: getCell(0) || serv3Defaults.titulo,
      desc: getCell(1) || serv3Defaults.desc,
      bullets: bullets.length ? bullets : serv3Defaults.bullets,
      chip: getCell(5) || serv3Defaults.chip,
    };
  } catch (e) {
    console.error("Error leyendo Google Sheet de Serv3:", e);
    return serv3Defaults;
  }
}

async function fetchServ4Card() {
  try {
    const res = await fetch(SERV4_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return serv4Defaults;

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\);/);
    if (!match || !match[1]) return serv4Defaults;

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || !table.rows.length) return serv4Defaults;

    const rows = table.rows.filter(
      (r) => r.c && r.c.some((cell) => cell && cell.v != null && cell.v !== "")
    );

    // Fila 0 = headers (titulo, desc, bullet1, bullet2, bullet3, chip)
    // Fila 1 = contenido real
    const dataRow = rows[1] || rows[0];
    const row = dataRow.c || [];
    const getCell = (index) => (row[index] && row[index].v) || "";

    const bullets = [getCell(2), getCell(3), getCell(4)].filter(Boolean);

    return {
      titulo: getCell(0) || serv4Defaults.titulo,
      desc: getCell(1) || serv4Defaults.desc,
      bullets: bullets.length ? bullets : serv4Defaults.bullets,
      chip: getCell(5) || serv4Defaults.chip,
    };
  } catch (e) {
    console.error("Error leyendo Google Sheet de Serv4:", e);
    return serv4Defaults;
  }
}

// =======================
// COMPONENTE
// =======================
export default function Servicios() {
  const [header, setHeader] = useState(serviciosHeaderDefaults);
  const [serv1, setServ1] = useState(serv1Defaults);
  const [serv2, setServ2] = useState(serv2Defaults);
  const [serv3, setServ3] = useState(serv3Defaults);
  const [serv4, setServ4] = useState(serv4Defaults);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [headerData, serv1Data, serv2Data, serv3Data, serv4Data] =
        await Promise.all([
          fetchServiciosHeader(),
          fetchServ1Card(),
          fetchServ2Card(),
          fetchServ3Card(),
          fetchServ4Card(),
        ]);
      if (!cancelled) {
        setHeader(headerData);
        setServ1(serv1Data);
        setServ2(serv2Data);
        setServ3(serv3Data);
        setServ4(serv4Data);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="servicios"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Servicios"
    >
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
        {/* HEADER editable */}
        <div className="relative mx-auto mb-14 md:mb-20 max-w-3xl">
          <div className="relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-white/70 via-white/20 to-white/60">
            <div className="relative rounded-[1.65rem] border border-white/60 bg-white/50 backdrop-blur-xl px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_60px_rgba(60,64,67,0.20)]">
              <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] ring-1 ring-white/40" />
              <div className="pointer-events-none absolute -top-10 -left-14 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -right-16 h-44 w-44 rounded-full bg-brand-primary/10 blur-3xl" />

              <span className="mx-auto block w-max rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs tracking-wide text-slate-700 shadow-sm">
                {header.badge}
              </span>

              <h2 className="mt-4 text-center text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2F4F]">
                {header.title}
              </h2>

              <p
                className="mt-4 text-center text-[#0A2F4F]/80 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: header.paragraph }}
              />
            </div>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-stretch">
          {SERVICIOS.map((s) => {
            let card = s;

            if (s.key === "individual") {
              card = {
                ...s,
                titulo: serv1.titulo,
                desc: serv1.desc,
                bullets: serv1.bullets,
                chip: serv1.chip,
              };
            } else if (s.key === "pareja") {
              card = {
                ...s,
                titulo: serv2.titulo,
                desc: serv2.desc,
                bullets: serv2.bullets,
                chip: serv2.chip,
              };
            } else if (s.key === "familiar") {
              card = {
                ...s,
                titulo: serv3.titulo,
                desc: serv3.desc,
                bullets: serv3.bullets,
                chip: serv3.chip,
              };
            } else if (s.key === "online") {
              card = {
                ...s,
                titulo: serv4.titulo,
                desc: serv4.desc,
                bullets: serv4.bullets,
                chip: serv4.chip,
              };
            }

            return (
              <article key={card.key} className="group relative h-full">
                <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-brand-primary/30 via-brand-dark/20 to-brand-primary/30 overflow-hidden">
                  <div className="relative flex h-full flex-col rounded-[calc(1rem-1px)] border border-white/50 bg-white/60 backdrop-blur-md shadow-[0_12px_26px_rgba(60,64,67,0.16)] transition-all duration-300 group-hover:shadow-[0_22px_50px_rgba(60,64,67,0.22)] group-hover:-translate-y-1">
                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-dark/20 text-lg"
                          style={{ animation: "float 5s ease-in-out infinite" }}
                        >
                          <span aria-hidden>{card.emoji}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-[#0A2F4F]">
                          {card.titulo}
                        </h3>
                      </div>

                      <p className="text-slate-700/90 text-sm md:text-base">
                        {card.desc}
                      </p>

                      <ul className="mt-1 space-y-2 text-slate-700">
                        {card.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-dark/60" />
                            <span className="text-sm md:text-[15px]">{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-center justify_between pt-4">
                        <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                          {card.chip}
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
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}

export { SERVICIOS };
