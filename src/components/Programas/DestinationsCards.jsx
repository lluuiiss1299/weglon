import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroTitle from '../Principal/HeroTitle';
import { HERO } from "../../constants/constantsPrograms.js";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Arrow from "../../assets/Icons/ArrowDown.svg";




const Carousel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const handleCardClick = (ruta) => {
      navigate(ruta);
      window.scrollTo(0, 0);
    };
    const destinos = [
        { nombre: t('travelVisits.nasa.cardTitle'), texto: t('destinations.nasa.CardText'), ruta: t("travelVisits.nasa.link"), imagen: `${HERO+t("destinations.nasa.imageHero")}` },
        { nombre: t('travelVisits.tokio.cardTitle'), texto: t('destinations.tokio.CardText'), ruta: t("travelVisits.tokio.link"), imagen: `${HERO+t("destinations.tokio.imageHero")}` },
        { nombre: t('travelVisits.canada.cardTitle'), texto: t('destinations.canada.CardText'), ruta: t("travelVisits.canada.link"), imagen: `${HERO+t("destinations.canada.imageHero")}` },
      //   { nombre: "ITALIA", ruta: "/programas/italia", imagen: cardItaly },
      ];

    const scrollByCards = (dir = 1) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: dir * (400 + 24), // ancho de card + gap (si usas gap-6)
          behavior: "smooth",
        });
      }
    };

  return (
    <section className="w-full px-6 pt-10 pb-24 ">
        <HeroTitle title={t('destinations.programs.title')} />

      <div 
      className="flex gap-6 overflow-x-auto scrollbar-hide items-center flex-row justify-center items-center max-xl:justify-start"
      ref={scrollRef}
      >
        {destinos.map((destino, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(destino.ruta)}
            className="group flex-shrink-0 w-[400px] h-[500px] bg-cover bg-center rounded-2xl shadow-md relative scale-90 hover:scale-100 transition-all duration-300 cursor-pointer"
          >
            <motion.img
              src={destino.imagen}
              layoutId={`hero-image-${index}`}
              className="w-full h-full object-cover object-center rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl group-hover:opacity-0 group-hover:invisible transition-all duration-300">
              <div className="flex flex-col justify-start items-start p-4 text-white text-center">
                <h1 className="text-lg font-semibold">{destino.texto}</h1>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl flex flex-col justify-end items-end p-4 text-white text-center group-hover:opacity-0 group-hover:invisible transition-all duration-300">
              <span className="text-sm font-semibold tracking-widest">WE-EXPERIENCE</span>
              <span className="text-3xl font-bold">{destino.nombre}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="xl:hidden flex-row flex justify-end gap-6 ">
        <button
          className="w-10 h-10 rounded-full bg-gray-100 shadow hover:bg-blue-200 flex items-center justify-center"
          onClick={() => scrollByCards(-1)}
        >
          <img src={Arrow} alt="Arrow" className="w-5 h-5 rotate-90" />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 shadow hover:bg-blue-200 flex items-center justify-center"
          onClick={() => scrollByCards(1)}
        >
          <img src={Arrow} alt="Arrow" className="w-5 h-5 rotate-[270deg]" />
        </button>
      </div>

    </section>
  );
};

export default Carousel;
