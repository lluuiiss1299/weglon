import React from "react";
import { motion } from "framer-motion";
import { EQUIPOWEGLON } from "../../constants/constantsPrograms"; 

const AgendaCita = () => (
    <motion.section
      className="w-full py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    > 
  <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 text-center">
    {/* Texto */}
    <div className="flex-1 max-w-md text-center md:text-center px-4 justify-items-center">
      <h2 className="text-2xl font-bold mb-6">Agenda tu cita con nosotros</h2>
      <p className="mb-6 text-base font-normal leading-snug w-3/4 ">
        Sabemos que la idea de viajar a otro país es emocionante, y queremos que esa emoción esté respaldada por la máxima confianza. Nuestro equipo de profesionales ha guiado a cientos de estudiantes y entienden que la seguridad es la base de cualquier gran experiencia.
      </p>
      <div className="font-semibold mb-6">
        ¿Listo para dar el siguiente paso?
      </div>
      <a
        href="/contacto"
        className="px-6 py-2 rounded-full border-2 border-blue-700 font-semibold text-blue-700 transition bg-white hover:bg-black hover:text-white hover:border-black"
      >
        Contáctanos
      </a>
    </div>
    {/* Imagen */}
    <div className="flex-1 max-w-xl mt-8 md:mt-0 md:ml-8">
      <div className="rounded-2xl overflow-hidden">
        <img src={EQUIPOWEGLON+"STAFFCOMPLETO.webp"} alt="Equipo" className="object-cover w-full h-[290px]" />
      </div>
    </div>
  </section>
  </motion.section>
);

export default AgendaCita;
