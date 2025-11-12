// app/layout.jsx
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://psicologa.example"), // <-- cámbialo cuando tengas dominio
  title: {
    default: "Psicóloga | Terapia Individual y de Pareja",
    template: "%s | Psicóloga en Santiago",
  },
  description:
    "Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
  keywords: [
    "psicóloga",
    "terapia de pareja",
    "terapia individual",
    "psicoterapia",
    "salud mental",
    "Santiago",
    "Chile",
  ],
  alternates: {
    canonical: "/",
  },
  // Favicon & Apple
  icons: {
    icon: "/logo222.png",                 // tu favicon
    shortcut: "/logo222.png",
    apple: "/apple-touch-icon.png",       // ideal 180x180 (opcional)
  },
  // SEO para Google
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
  // Open Graph (Facebook/WhatsApp/Instagram DMs)
  openGraph: {
    type: "website",
    url: "https://psicologa.example", // <-- ajusta
    siteName: "Psicóloga en Santiago",
    locale: "es_CL",
    title: "Psicóloga | Terapia Individual y de Pareja",
    description:
      "Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
    images: [
      {
        url: "/og-image.jpg",      // 1200x630
        width: 1200,
        height: 630,
        alt: "Consultorio de psicología - terapia individual y de pareja",
      },
    ],
  },
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Psicóloga | Terapia Individual y de Pareja",
    description:
      "Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
    images: ["/og-image.jpg"],
    creator: "@tu_usuario", // opcional
  },
  // PWA (opcional si vas a usarlo)
  manifest: "/site.webmanifest",
  // (Opcional) verificación de Search Console
  // verification: { google: "TU_CODIGO_DE_VERIFICACION" },
};

export const viewport = {
  themeColor: "#FDE8E8", 
};

export default function RootLayout({ children }) {
  // JSON-LD para negocio local (muy útil para SEO de servicios)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Psicóloga en Santiago",
    url: "https://psicologa.example",
    image: "https://psicologa.example/og-image.jpg",
    telephone: "+56 9 1234 5678",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressRegion: "RM",
      addressCountry: "CL",
    },
    areaServed: "Santiago, Chile",
    description:
      "Terapia psicológica individual y de pareja, también online. Espacio seguro y empático.",
    sameAs: [
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
