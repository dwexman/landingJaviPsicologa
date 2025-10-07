"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp({
  phone = "56912345678",               
  message = "Hola, me gustaría agendar una sesión 😊",
  size = 56,                       
  className = "",
  onClick,
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      onClick={(e) => {
        onClick?.(e);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "click", { event_category: "cta", event_label: "whatsapp_floating" });
        }
      }}
      className={[
        "fixed bottom-5 right-5 z-[60] group",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-full",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="absolute -inset-3 rounded-full bg-[#25D366]/25 blur-xl opacity-80 group-hover:opacity-100 transition"
      />
      <span
        className="relative grid place-items-center rounded-full text-white
                   shadow-[0_12px_26px_rgba(37,211,102,0.45)]
                   hover:shadow-[0_18px_44px_rgba(37,211,102,0.6)]
                   active:translate-y-[1px] transition"
        style={{ width: size, height: size, backgroundColor: "#25D366" }}
      >
        <FaWhatsapp
          aria-hidden
          size={Math.round(size * 0.58)}
          className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
        />
        <span className="sr-only">WhatsApp</span>
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/80" />
      </span>
    </a>
  );
}
