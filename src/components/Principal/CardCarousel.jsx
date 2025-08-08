import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CARDS } from "../../constants/constantsPrograms.js";
import Arrow from "../../assets/Icons/ArrowDown.svg";
import { useTranslation } from 'react-i18next';

const Carousel = () => {
  const scrollRef = useRef();
  const { t } = useTranslation();
  console.log(CARDS+t("travelVisits.nasa.cardImage"));
  const destinos = [
    { nombre: t("travelVisits.nasa.cardTitle"), ruta: t("travelVisits.nasa.link"), imagen: `${CARDS+t("travelVisits.nasa.cardImage")}` },
    { nombre: t("travelVisits.tokio.cardTitle"), ruta: t("travelVisits.tokio.link"), imagen: `${CARDS+t("travelVisits.tokio.cardImage")}`  },
    { nombre: t("travelVisits.canada.cardTitle"), ruta: t("travelVisits.canada.link"), imagen: `${CARDS+t("travelVisits.canada.cardImage")}` },
    // { nombre: "ITALIA", ruta: "/programas/italia", imagen: cardItaly },
  ];
  const scrollByCards = (dir = 1) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * (280 + 24), // ancho de card + gap (si usas gap-6)
        behavior: "smooth",
      });
    }
  };


  const navigate = useNavigate();

  const handleCardClick = (ruta) => {
    navigate(ruta);
    window.scrollTo(0, 0);
  };

  return (
    <section className="w-full px-6 pt-10 pb-24 bg-gray-100 max-sm:pb-10">
      <h2 className="text-center text-lg font-medium text-gray-700 mb-12 w-1/3 mx-auto max-sm:w-full max-sm:mb-4">
        {t('destinations.subtitle')}
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide flex-row justify-center max-md:justify-start" ref={scrollRef}>
        {destinos.map((destino, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(destino.ruta)}
            className="group flex-shrink-0 max-xl:w-[280px] max-xl:h-[380px] w-[350px] h-[520px] bg-cover bg-center rounded-2xl shadow-md relative cursor-pointer hover:shadow-lg transition-all duration-300"
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

      <div className="md:hidden flex-row flex justify-end gap-6 mt-6 ">
          <button
            className="w-12 h-12 rounded-full bg-white shadow hover:bg-blue-200 flex items-center justify-center"
            onClick={() => scrollByCards(-1)}
          >
            <img src={Arrow} alt="Arrow" className="w-7 h-7 rotate-90" />
          </button>
          <button
            className="w-12 h-12 rounded-full bg-white shadow hover:bg-blue-200 flex items-center justify-center"
            onClick={() => scrollByCards(1)}
          >
            <img src={Arrow} alt="Arrow" className="w-7 h-7 rotate-[270deg]" />
          </button>
        </div>

    </section>
  );
};

export default Carousel;
