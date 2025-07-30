import React from "react";
import { Link } from "react-router-dom";
import HeroNasa from '../../assets/Images/Hero/HeroNasa.jpg';
import HeroTokio from '../../assets/Images/Hero/HeroTokio.jpg';
import HeroCanada from '../../assets/Images/Hero/HeroCanada.jpg';
import HeroTitle from '../Principal/HeroTitle';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';



const Carousel = () => {
    const { t } = useTranslation();
    const destinos = [
        { nombre: "NASA", texto: t('destinations.nasa.CardText'), ruta: "/programas/nasa", imagen: HeroNasa },
        { nombre: "TOKYO", texto: t('destinations.tokyo.CardText'), ruta: "/programas/tokio", imagen: HeroTokio },
        { nombre: "CANADA", texto: t('destinations.canada.CardText'), ruta: "/programas/canada", imagen: HeroCanada },
      //   { nombre: "ITALIA", ruta: "/programas/italia", imagen: cardItaly },
      ];
  return (
    <section className="w-full px-6 pt-10 pb-24 ">
        <HeroTitle title={t('destinations.programs.title')} />

      <div className="flex gap-6 overflow-x-auto scrollbar-hide items-center flex-row justify-center items-center ">
        {destinos.map((destino, index) => (
          <Link
            key={index}
            to={destino.ruta}
            className="group flex-shrink-0 w-[400px] h-[500px] bg-cover bg-center rounded-2xl shadow-md relative scale-90 hover:scale-100 transition-all duration-300"
          ><motion.img
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
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Carousel;
