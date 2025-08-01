import React from "react";
import Image from "../../../assets/Images/Hero/HeroCentroCertificador.png";
import TextInfo from "./TextInfo";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CentroCertificador = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      className="w-full pt-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-10 h-[400px] ">
        {/* Texto */}
        <div className="flex-1 max-w-md text-center md:text-left px-4">
        <h2 className="text-4xl font-bold mb-8 leading-tight">
            {t("centroCertificador.titulo")}
        </h2>
        <p className="mb-12 text-lg font-normal leading-snug">
            {t("centroCertificador.texto")}
        </p>
        <a
            href="/contacto"
            className="px-6 py-2 rounded-full border-2 border-blue-700 font-semibold text-blue-700 transition bg-white hover:bg-black hover:text-white hover:border-black"
        >
            {t("centroCertificador.button")}
        </a>
        </div>
        {/* Imagen */}
        <div className="flex-1 max-w-2xl mt-8 md:mt-0 md:ml-8 h-[450px] w-full">
            <div className="rounded-2xl overflow-hidden">
                <img src={Image} alt="Centro certificador" className="object-cover w-full h-[400px]" />
            </div>
        </div>
    </section>
    <TextInfo  titulo={t("centroCertificador.text1")} texto={t("centroCertificador.text2")}/>
    </motion.section>
  
  );
};

export default CentroCertificador;
