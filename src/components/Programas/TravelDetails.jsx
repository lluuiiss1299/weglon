import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CenterTitle from "../../components/Principal/CenterTitle";
import { useTranslation } from "react-i18next";
import ArrowDown from "../../assets/Icons/ArrowDown.svg";
import { BENEFICIOS } from "../../constants/constantsPrograms";


const TravelDetails = () => {

  const [activo, setActivo] = useState(0);

  const { t } = useTranslation();

  const details = [
    {
      title: t("travelDetails.security.title"),
      description: t("travelDetails.security.subtitle"),
      image: BENEFICIOS + "Nasa/" + t("travelDetails.security.img"),
    },
    {
      title: t("travelDetails.lodging.title"),
      description: t("travelDetails.lodging.subtitle"),
      image: BENEFICIOS + "Nasa/" + t("travelDetails.lodging.img"),
    },
    {
      title: t("travelDetails.fly.title"),
      description: t("travelDetails.fly.subtitle"),
      image: BENEFICIOS + "Nasa/" + t("travelDetails.fly.img"),
    },
    {
      title: t("travelDetails.transportation.title"),
      description: t("travelDetails.transportation.subtitle"),
      image: BENEFICIOS + "Nasa/" + t("travelDetails.transportation.img"),
    },
    {
      title: t("travelDetails.travelerSecurity.title"),
      description: t("travelDetails.travelerSecurity.subtitle"),
      image: BENEFICIOS + "Tokio/" + t("travelDetails.travelerSecurity.img"),
    },
  ];

  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <CenterTitle title={t("travelDetails.title")} /> 
      <section className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8 mb-10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-start">
          
          <div className="col-span-3">
            {details.map((item, index) => {
              const esActivo = activo === index;
              return (
                <div key={index} className="border-b border-gray-300 py-3">
                  <button
                    className="flex justify-between items-center w-full"
                    onClick={() => setActivo(esActivo ? null : index)}
                  >
                    <span className="text-lg font-semibold">{item.title}</span>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: esActivo ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold"
                    >
                      <img src={ArrowDown} alt="arrow-down" className="w-6 h-6" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {esActivo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600 text-sm overflow-hidden pr-10"
                      >
                        {item.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-md bg-gray-300 col-span-3">
            <AnimatePresence mode="wait">
              {activo !== null && (
                <motion.img
                  key={details[activo].image}
                  src={details[activo].image}
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
    </motion.section>
  );
};

export default TravelDetails;
