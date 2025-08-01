import React from "react";
import Image from "../../../assets/Images/OnlineIngles.png";
import { useTranslation } from "react-i18next";
import Calendario from "../../../assets/Icons/Benefits/Calendario.svg";
import Clock24Hrs from "../../../assets/Icons/Benefits/Clock24Hrs.svg";
import Test from "../../../assets/Icons/Benefits/Test.svg";
import Support from "../../../assets/Icons/Benefits/Support.svg";
import Certificated from "../../../assets/Icons/Benefits/Certificated.svg";
import TextInfo from "./TextInfo";
import { motion } from "framer-motion";
// Puedes importar tus propios íconos o usar SVG inline



const BeneficiosOnline = () => {
  const { t } = useTranslation();
  const beneficios = [
    {
      icono: (
        <img src={Calendario} fill="#CA9F3F" width="38" height="38" alt="Calendario" />
      ),
      texto: t("OnlineCertifications.benefits.0.title"),
    },
    {
      icono: (
        <img src={Clock24Hrs} fill="#CA9F3F" width="38" height="38" alt="Reloj" />
      ),
      texto: t("OnlineCertifications.benefits.1.title"),
    },
    {
      icono: (
        <img src={Test} fill="#CA9F3F" width="38" height="38" alt="Test" />
      ),
      texto: t("OnlineCertifications.benefits.2.title"),
    },
    {
      icono: (
        <img src={Support} fill="#CA9F3F" width="38" height="38" alt="Support" />
      ),
      texto: t("OnlineCertifications.benefits.3.title"),
    },
    {
      icono: (
        <img src={Certificated} fill="#CA9F3F" width="38" height="38" alt="Certificated" />
      ),
      texto: t("OnlineCertifications.benefits.4.title"),
    },
  ];
  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
  <section className="w-full flex flex-col items-center py-10">
    <div className="w-full flex flex-col items-center my-16">
      <h2 className="text-5xl font-bold">{t("OnlineCertifications.title")}</h2>
    </div>
    <div className="w-full max-w-4xl grid grid-cols-3 gap-x-6 gap-y-6 relative">
      <div className="col-span-1 flex flex-col items-center py-16">
        <div className="border border-[#CA9F3F] rounded-xl p-4 flex flex-col items-center w-full max-w-[190px] min-h-[150px]">
          {beneficios[0].icono}
          <p className="text-center text-sm mt-3">{beneficios[0].texto}</p>
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center">
        <div className="border border-[#CA9F3F] rounded-xl p-4 flex flex-col items-center w-full max-w-[190px] min-h-[150px]">
          {beneficios[1].icono}
          <p className="text-center text-sm mt-3">{beneficios[1].texto}</p>
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center py-16">
        <div className="border border-[#CA9F3F] rounded-xl p-4 flex flex-col items-center w-full max-w-[190px] min-h-[150px]">
          {beneficios[2].icono}
          <p className="text-center text-sm mt-3">{beneficios[2].texto}</p>
        </div>
      </div>
      <div className="col-span-3 flex justify-center my-6 absolute top-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[300px] flex items-center justify-center">
          <img src={Image} alt="Estudiando online" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center ">
        <div className="border border-[#CA9F3F] rounded-xl p-4 flex flex-col items-center w-full max-w-[190px] min-h-[150px]">
          {beneficios[3].icono}
          <p className="text-center text-sm mt-3">{beneficios[3].texto}</p>
        </div>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1 flex flex-col items-center">
        <div className="border border-[#CA9F3F] rounded-xl p-4 flex flex-col items-center w-full max-w-[190px] min-h-[150px]">
          {beneficios[4].icono}
          <p className="text-center text-sm mt-3">{beneficios[4].texto}</p>
        </div>
      </div>
    </div>
    <a
      href="/contacto"
      className="mt-8 px-8 py-2 rounded-full border-2 border-blue-700 font-semibold text-blue-700 transition bg-white hover:bg-black hover:text-white text-lg hover:border-black"
    >
      {t("OnlineCertifications.button")}
    </a>
    <TextInfo titulo={t("OnlineCertifications.text1")} texto={t("OnlineCertifications.text2")}/>
  </section>
  </motion.section>
  );
};

export default BeneficiosOnline;
