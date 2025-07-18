import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Activities from "../../assets/Icons/Benefits/Actividades.svg";
import Secure from "../../assets/Icons/Benefits/SeguroViaje.svg";
import Security from "../../assets/Icons/Benefits/Seguridad.svg";
import Hotel from "../../assets/Icons/Benefits/Hospedaje.svg";
import Bus from "../../assets/Icons/Benefits/Traslados.svg";
import Flight from "../../assets/Icons/Benefits/VueloRedondo.svg";
import CanadaBenefits from "../../assets/Images/CanadaBenefits.jpg";
import NasaBenefits from "../../assets/Images/HeroNasa.jpg";
import TokioBenefits from "../../assets/Images/HeroTokio.jpg";
import FlagUSA from "../../assets/Images/Banderas/FlagUsa.png"; 
import FlagCanada from "../../assets/Images/Banderas/canada.png";
import FlagTokio from "../../assets/Images/Banderas/japon.svg";

const TravelBenefits = () => {
    const { t } = useTranslation();
    const servicios = [
      { texto: t('travelBenefits.flight'), icono: Flight },
      { texto: t('travelBenefits.insurance'), icono: Secure },
      { texto: t('travelBenefits.security'), icono: Security },
      { texto: t('travelBenefits.hotel'), icono: Hotel },
      { texto: t('travelBenefits.bus'), icono: Bus },
      { texto: t('travelBenefits.culture'), icono: Activities }
    ];
  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center ">
        <div className="bg-gradient-to-t from-[#3CA8E0] to-[#10223E] rounded-2xl w-full h-60 mb-60">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white inline-grid mt-10">
          <span className="text-white">{t('travelBenefits.cards.title')}</span>
          <span className="text-white">{t('travelBenefits.cards.subtitle')}</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          
          <div className="w-72 h-60 rounded-xl flex items-start justify-start bg-cover bg-center" style={{ backgroundImage: `url(${NasaBenefits})` }}>
            <span className="text-white font-bold mt-2 ml-2 text-2xl"><img src={FlagUSA} alt="BanderaUSA" className="w-8 h-5" /></span>
          </div>
          
          <div className="w-72 h-60 rounded-xl flex items-start justify-star bg-cover bg-center" style={{ backgroundImage: `url(${CanadaBenefits})` }}>
            <span className="text-white font-bold mt-2 ml-2 text-2xl"><img src={FlagCanada} alt="BanderaCanada" className="w-8 h-5" /></span>
          </div>
          
          <div className="w-72 h-60 rounded-xl flex items-start justify-start bg-cover bg-center" style={{ backgroundImage: `url(${TokioBenefits})` }}>
            <span className="text-white font-bold mt-2 ml-2 text-2xl"><img src={FlagTokio} alt="BanderaTokio" className="w-8 h-5" /></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-800">
          {servicios.map((serv, index) => (
            <div key={index} className="flex items-center justify-center gap-3">
              <img src={serv.icono} alt={serv.texto} className="w-6 h-6" />
              <span>{serv.texto}</span>
            </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TravelBenefits;
