import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Consulta from "@/components/Consulta";
import Servicios from "@/components/Servicios";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Consulta />
      <Servicios />
      <Testimonios />
      <Contacto />
      <FloatingWhatsApp
        size={60}
        phone="56959327012"
        message="Hola, me gustaría agendar una sesión."
        label="Escríbeme"
      />

    </main>
  );
}
