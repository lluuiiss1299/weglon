import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CenterTitle from "../../components/Principal/CenterTitle";
import Canada from "../../assets/Images/CanadaBenefits.jpg";
import Canada1 from "../../assets/Images/CardItaly.png";
import Canada2 from "../../assets/Images/CardTokio.png";
import Canada3 from "../../assets/Images/HeroCanada.webp";
import Canada4 from "../../assets/Images/HeroTokio.jpg";
import Canada5 from "../../assets/Images/HeroNasa.jpg";
import Canada6 from "../../assets/Images/CardCanada.png";



const TravelVisits = () => {
  const { t } = useTranslation();

  const viajes = [
    {
      nombre: t("travelVisits.canada.title"),
      destinos: t("travelVisits.canada.destinos", { returnObjects: true }),
      imagenes: [Canada, Canada1, Canada2, Canada3, Canada4, Canada5, Canada6],
      link: "/programas/canada"
    },
    {
      nombre: "Nasa",
      destinos: t("travelVisits.nasa.destinos", { returnObjects: true }),
      imagenes: ["/nasa1.jpg", "/nasa2.jpg", "/nasa3.jpg", "/nasa4.jpg", "/nasa5.jpg", "/nasa6.jpg", "/nasa7.jpg"],
      link: "/programas/nasa"
    },
    {
      nombre: "Tokio",
      destinos: t("travelVisits.tokyo.destinos", { returnObjects: true }),
      imagenes: ["/tokyo1.jpg", "/tokyo2.jpg", "/tokyo3.jpg", "/tokyo4.jpg", "/tokyo5.jpg", "/tokyo6.jpg", "/tokyo7.jpg"],
      link: "/programas/tokyo"
    }
  ];

    const [tabActivo, setTabActivo] = useState(0);
    const [destinoActivo, setDestinoActivo] = useState(0);
  
    useEffect(() => {
      setDestinoActivo(0);
    }, [tabActivo]);
  
    const moverCarrusel = (index) => setDestinoActivo(index);

  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <CenterTitle title={t("travelVisits.title")} subtitle={t("travelVisits.subtitle")} /> 
      <section className="w-full py-12 bg-gray-50 rounded-xl shadow-md max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-start  border-b px-10">
          {viajes.map((viaje, i) => (
            <button
              key={i}
              className={`py-2 text-lg font-semibold pl-6 ${tabActivo === i ? "text-black border-b-2 border-black" : "text-gray-500"}`}
              onClick={() => setTabActivo(i)}
            >
              {viaje.nombre} <span className="text-xs text-gray-200 ml-6">|</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 p-6">
          {/* Destinos */}
          <ul className="flex flex-col gap-2 text-sm">
            {viajes[tabActivo].destinos.map((destino, i) => (
              <li key={i}>
                <button
                  className={`px-3 py-2 rounded-full transition ${destinoActivo === i ? "bg-gray-300" : "hover:bg-gray-200"}`}
                  onClick={() => moverCarrusel(i)}
                >
                  {destino}
                </button>
              </li>
            ))}
          </ul>

          {/* Carrusel */}
          <div className="col-span-3 flex justify-center items-center overflow-hidden relative pt-10 bg-gray-200 rounded-xl ">
            <AnimatePresence initial={false}>
              {viajes[tabActivo].imagenes.map((img, i) => {
                const posicion = i - destinoActivo;
                const isActive = posicion === 0;
                return (
                  Math.abs(posicion) <= 1 && (
                    <motion.div
                      key={img}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.6, y: isActive ? -20 : 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute w-64 h-72 overflow-hidden rounded-xl shadow-lg  transition-all duration-300 ${
                        !isActive ? "brightness-50 cursor-pointer" : ""
                      }`}
                      style={{ x: `${posicion * 60}%`, zIndex: isActive ? 10 : 0 }}
                      onClick={() => !isActive && moverCarrusel(i)}
                    >
                      <img
                        src={img}
                        alt="destino"
                        className="object-cover w-full h-full"
                      />
                      {isActive && (
                        <a href={viajes[tabActivo].link} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 py-1 px-3 rounded-md text-sm font-semibold hover:bg-white">
                          Ver Más →
                        </a>
                      )}
                    </motion.div>
                  )
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default TravelVisits;
