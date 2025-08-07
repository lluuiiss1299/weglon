import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CenterTitle from "../../components/Principal/CenterTitle";
import { LUGARESNASA, LUGARESTOKIO, LUGARESCANADA } from "../../constants/constantsPrograms.js";


const TravelVisits = () => {
  const { t } = useTranslation();
  const nasaDestinos = t("travelVisits.nasa.destinos", { returnObjects: true }).map((destino) => ({
    ...destino,
    img: LUGARESNASA + destino.img[0]
  }));
  const canadaDestinos = t("travelVisits.canada.destinos", { returnObjects: true }).map((destino) => ({
    ...destino,
    img: LUGARESCANADA + destino.img[0]
  }));
  const tokioDestinos = t("travelVisits.tokio.destinos", { returnObjects: true }).map((destino) => ({
    ...destino,
    img: LUGARESTOKIO + destino.img[0]
  }));
  // console.log(canadaDestinos.map((destino) => destino.img));

  const viajes = [
    {
      nombre: t("travelVisits.nasa.title"),
      destinos: nasaDestinos,
      imagenes: nasaDestinos.map((destino) => destino.img),
      link: t("travelVisits.nasa.link")
    },
    {
      nombre: t("travelVisits.canada.title"),
      destinos: canadaDestinos,
      imagenes: canadaDestinos.map((destino) => destino.img),
      link: t("travelVisits.canada.link")
    },
    {
      nombre: t("travelVisits.tokio.title"),
      destinos: tokioDestinos,
      imagenes: tokioDestinos.map((destino) => destino.img),
      link: t("travelVisits.tokio.link")
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
                  {destino.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Carrusel */}
          <div className="col-span-3 flex justify-center items-center overflow-hidden relative pt-10 bg-gray-200 rounded-xl min-h-[340px]">
            <AnimatePresence initial={false}>
              {viajes[tabActivo].imagenes.map((img, i) => {
                const posicion = i - destinoActivo;
                const isActive = posicion === 0;
                console.log(img);
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
