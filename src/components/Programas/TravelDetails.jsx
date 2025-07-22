import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caracteristicas = [
  {
    titulo: "Seguridad 24 hrs",
    descripcion: "Seguridad las 24 horas por nuestro personal capacitado, para hacer de tu viaje una experiencia maravillosa.",
    imagen: "/images/seguridad.jpg",
  },
  {
    titulo: "Hospedaje",
    descripcion: "Hospedaje de alta calidad y comodidad garantizada para todos nuestros viajeros.",
    imagen: "/images/hospedaje.jpg",
  },
  {
    titulo: "Vuelo redondo",
    descripcion: "Incluye vuelo redondo con aerolíneas de prestigio internacional.",
    imagen: "/images/vuelo.jpg",
  },
  {
    titulo: "Todos los traslados",
    descripcion: "Servicio completo de traslado desde y hacia todas las actividades del viaje.",
    imagen: "/images/traslados.jpg",
  },
  {
    titulo: "Seguro de viajero",
    descripcion: "Seguro integral de viajero para cubrir todas tus necesidades.",
    imagen: "/images/seguro.jpg",
  },
];

const CaracteristicasViaje = () => {
  const [activo, setActivo] = useState(0);

  return (
    <section className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <div>
          {caracteristicas.map((item, index) => {
            const esActivo = activo === index;
            return (
              <div key={index} className="border-b border-gray-300 py-3">
                <button
                  className="flex justify-between items-center w-full"
                  onClick={() => setActivo(esActivo ? null : index)}
                >
                  <span className="text-lg font-semibold">{item.titulo}</span>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: esActivo ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {esActivo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-600 text-sm overflow-hidden"
                    >
                      {item.descripcion}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-md bg-gray-300">
          <AnimatePresence mode="wait">
            {activo !== null && (
              <motion.img
                key={caracteristicas[activo].imagen}
                src={caracteristicas[activo].imagen}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaracteristicasViaje;
