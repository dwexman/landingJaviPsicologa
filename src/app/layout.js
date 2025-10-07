// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: {
    default: "Psicóloga | Terapia Individual y de Pareja",
    template: "%s | Psicóloga en Santiago",
  },
  description:
    "Espacio seguro y empático para tu bienestar emocional. Terapia individual, de pareja y online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans bg-rose-50 text-slate-800">{children}</body>
    </html>
  );
}
