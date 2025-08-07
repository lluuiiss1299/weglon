import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CARDS } from "../../constants/constantsPrograms.js";
import { useTranslation } from 'react-i18next';

const Carousel = () => {
  const { t } = useTranslation();
  console.log(CARDS+t("travelVisits.nasa.cardImage"));
  const destinos = [
    { nombre: t("travelVisits.nasa.cardTitle"), ruta: t("travelVisits.nasa.link"), imagen: `${CARDS+t("travelVisits.nasa.cardImage")}` },
    { nombre: t("travelVisits.tokio.cardTitle"), ruta: t("travelVisits.tokio.link"), imagen: `${CARDS+t("travelVisits.tokio.cardImage")}`  },
    { nombre: t("travelVisits.canada.cardTitle"), ruta: t("travelVisits.canada.link"), imagen: `${CARDS+t("travelVisits.canada.cardImage")}` },
    // { nombre: "ITALIA", ruta: "/programas/italia", imagen: cardItaly },
  ];
  


  const navigate = useNavigate();

  const handleCardClick = (ruta) => {
    navigate(ruta);
    window.scrollTo(0, 0);
  };

  return (
    <section className="w-full px-6 pt-10 pb-24 bg-gray-100">
      <h2 className="text-center text-lg font-medium text-gray-700 mb-12 w-1/3 mx-auto">
        {t('destinations.subtitle')}
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide flex-row justify-center">
        {destinos.map((destino, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(destino.ruta)}
            className="group flex-shrink-0 w-[350px] h-[520px] bg-cover bg-center rounded-2xl shadow-md relative cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{
              backgroundImage: `url(${destino.imagen})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-2xl group-hover:opacity-0 group-hover:invisible transition-all duration-300">
              <div className="flex flex-col justify-start items-center p-4 text-white text-center">
              <span className="text-sm font-semibold tracking-widest">WE-EXPERIENCE</span>
                <h1 className="text-5xl font-bold">{destino.nombre}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Carousel;
