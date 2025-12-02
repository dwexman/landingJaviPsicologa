// app/layout.jsx
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://javierasepulveda.cl"),
  title: {
    default: "Psicóloga Javiera Sepúlveda · Terapia individual y de pareja",
    template: "%s · Psicóloga Javiera Sepúlveda",
  },
  description:
    "Psicóloga clínica Javiera Sepúlveda Peragallo. Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
  keywords: [
    "psicóloga",
    "psicóloga Javiera Sepúlveda",
    "terapia de pareja",
    "terapia individual",
    "psicoterapia",
    "salud mental",
    "Santiago",
    "Chile",
  ],
  alternates: {
    canonical: "/", // con metadataBase se vuelve https://javierasepulveda.cl/
  },
  icons: {
    icon: "/logo222.png",
    shortcut: "/logo222.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://javierasepulveda.cl",
    siteName: "Psicóloga Javiera Sepúlveda",
    locale: "es_CL",
    title: "Psicóloga Javiera Sepúlveda · Terapia individual y de pareja",
    description:
      "Psicóloga clínica Javiera Sepúlveda Peragallo. Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
    images: [
      {
        url: "/og-image.jpg", // ideal 1200x630, en public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Consulta de psicología de Javiera Sepúlveda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicóloga Javiera Sepúlveda · Terapia individual y de pareja",
    description:
      "Psicóloga clínica Javiera Sepúlveda Peragallo. Terapia individual, de pareja y online.",
    images: ["/og-image.jpg"],
    // pon tu usuario real o borra esta línea si no quieres
    // creator: "@tu_usuario",
  },
  manifest: "/site.webmanifest",
  // Como verificaste por DNS, esto es opcional:
  // verification: { google: "TU_CODIGO_DE_META_TAG" },
};

export const viewport = {
  themeColor: "#FDE8E8",
};

export default function RootLayout({ children }) {
  // JSON-LD: mejor como persona (profesional independiente)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Javiera Sepúlveda Peragallo",
    jobTitle: "Psicóloga clínica",
    url: "https://javierasepulveda.cl",
    image: "https://javierasepulveda.cl/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressRegion: "RM",
      addressCountry: "CL",
    },
    description:
      "Psicóloga clínica en Santiago. Terapia psicológica individual y de pareja, también online, en un espacio seguro y empático.",
    sameAs: [
      // Reemplaza estos links por tus redes reales o elimina el que no uses
      "https://www.instagram.com/tu_instagram",
      "https://www.facebook.com/tu_facebook",
    ],
  };

  return (
    <html lang="es">
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-rose-50 text-slate-800">{children}</body>
    </html>
  );
}
