import React, { useRef, useState } from "react";
import Facebook from "../../assets/Icons/FacebookWhite.svg";
import Instagram from "../../assets/Icons/InstagramWhite.svg";
import Whatsapp from "../../assets/Icons/WhatsappWhite.svg";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";


// Puedes reemplazar estos íconos SVG por tus propios componentes o de lucide-react, etc.
const ICON_EMAIL = (
  <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);
const ICON_PHONE = (
  <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92V19a2 2 0 01-2 2A17.91 17.91 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13 1.05.37 2.07.71 3.04a2 2 0 01-.45 2.11L7.09 11.1a16 16 0 006.41 6.41l1.22-1.22a2 2 0 012.11-.45c.97.34 1.99.58 3.04.71A2 2 0 0122 16.92z" />
  </svg>
);
const ICON_MAP = (
  <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ICON_TIME = (
  <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ICON_FACEBOOK = (
  <img src={Facebook} alt="Facebook" className="w-7 h-7" />
);
const ICON_INSTAGRAM = (
  <img src={Instagram} alt="Instagram" className="w-7 h-7" />
);
const ICON_WHATSAPP = (
  <img src={Whatsapp} alt="Whatsapp" className="w-7 h-7" />
);

const BLUE = "#2966cd";

const ContactoAvanzado = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'ok' | 'error' | null

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("ok");
      formRef.current?.reset();
    } catch (error) {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      className="w-full pt-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className="bg-white  shadow-xl max-w-6xl mx-auto my-10 overflow-hidden">
        <div className="flex flex-col md:flex-row w-full min-h-[700px]">
          {/* Formulario */}
          <div className="flex-1 pr-0 md:px-8 pt-8 pb-6 flex flex-col">
            <h2 className="text-5xl font-bold mb-3">Contáctanos</h2>
            <p className="text-base mb-7">
              Estamos ansiosos por conocerte, te responderemos lo antes posible.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div>
                <label className="block font-semibold text-sm mb-1">Nombre</label>
                <input name="first_name" required className="border-b border-gray-400 focus:outline-none py-2 w-full" type="text" />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Apellido</label>
                <input name="last_name" required className="border-b border-gray-400 focus:outline-none py-2 w-full" type="text" />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Correo</label>
                <input name="email" required className="border-b border-gray-400 focus:outline-none py-2 w-full" type="email" />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Teléfono</label>
                <input name="phone" className="border-b border-gray-400 focus:outline-none py-2 w-full" type="tel" />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Mensaje</label>
                <textarea name="message" required className="border-b border-gray-400 focus:outline-none py-2 w-full min-h-[100px]" />
              </div>
              {/* Rol */}
              <div className="flex items-center gap-4 mt-2 mb-4">
                <span className="font-semibold text-sm mr-2">Rol:</span>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Estudiante" className="accent-[#2966cd] w-4 h-4" defaultChecked />
                  Estudiante
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Maestro" className="accent-[#2966cd] w-4 h-4" />
                  Maestro
                </label>
              </div>
              {status === "ok" && (
              <div className="mb-4 rounded bg-green-50 text-green-700 px-3 py-2 text-sm">
                ¡Gracias! Tu mensaje ha sido enviado correctamente.
              </div>
              )}
              {status === "error" && (
                <div className="mb-4 rounded bg-red-50 text-red-700 px-3 py-2 text-sm">
                  Ocurrió un error al enviar. Intenta nuevamente.
                </div>
              )}
              <button
                className="bg-black text-white text-3xl font-semibold py-2 mt-2 rounded-none w-full hover:bg-[#2966cd] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          {/* Info contacto (side) */}
          <div className="flex-1  relative flex flex-col ">
            <div className="bg-[#2966cd] w-1/2 h-full flex flex-col self-end">
              <div className="w-[90%] h-[70%] bg-black absolute right-0 top-[15%]">
                <div className="absolute w-[40px] h-[40px] bg-[#2966cd] top-[-20px] left-[-20px]"></div>
                <div className="flex flex-col h-full p-10 gap-3">
                  <h3 className="text-white text-4xl font-bold mb-7">Info</h3>
                  <div className="flex items-center mb-6">
                    {ICON_EMAIL}
                    <a href="mailto:ventas@weglon.com" className="ml-4 underline text-white text-base">ventas@weglon.com</a>
                  </div>
                  <div className="flex items-center mb-6">
                    {ICON_PHONE}
                    <span className="ml-4 text-white text-base">+52 777 323 3890</span>
                  </div>
                  <div className="flex items-center mb-6">
                    {ICON_MAP}
                    <div className="ml-4 text-white text-base">
                      San Gaspar 20B<br />
                      Fraccionamiento Pedregal de las Fuentes<br />
                      Jiutepec Morelos<br />
                      C.P. 62554, México
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {ICON_TIME}
                    <span className="ml-4 text-white text-base">07:00 AM - 15:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-[15%] absolute right-0 top-[85%] flex justify-center items-center gap-4">
                <a href="https://www.facebook.com/share/1HuH7hsfrr/" target="_blank" rel="noopener noreferrer" className="bg-[#2966cd] rounded-md p-2">
                  {ICON_FACEBOOK}
                </a>
                <a href="https://www.instagram.com/weglon.experience?igsh=MWJyN3E3Y3pubWd6eg==" target="_blank" rel="noopener noreferrer" className="bg-[#2966cd] rounded-md p-2">
                  {ICON_INSTAGRAM}
                </a>
                <a href="https://wa.me/5217773701746" target="_blank" rel="noopener noreferrer" className="bg-[#2966cd] rounded-md p-2">
                  {ICON_WHATSAPP}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default ContactoAvanzado;
