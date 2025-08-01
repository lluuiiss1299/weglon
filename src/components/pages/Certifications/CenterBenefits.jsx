import React from "react";
import Monitor from "../../../assets/Icons/Benefits/DigitalPlatforms.svg";
import Money from "../../../assets/Icons/Benefits/EconomicBenefits.svg";
import Tools from "../../../assets/Icons/Benefits/DigitalTools.svg";
import Gift from "../../../assets/Icons/Benefits/Gift.svg";
import MoneyArrow from "../../../assets/Icons/Benefits/Retribution.svg";
import Megaphone from "../../../assets/Icons/Benefits/AddMaterial.svg";
import TextInfo from "./TextInfo";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
// Ejemplo: puedes reemplazar estos SVG por tus propios iconos
const ICONS = [
  // Pantalla (Plataformas digitales)
  <img src={Monitor} alt="Plataformas digitales" className="w-12 h-12" />,
  // Dinero (Beneficios económicos)
  <img src={Money} alt="Beneficios económicos" className="w-12 h-12" />,
  // Audífonos (Herramientas)
  <img src={Tools} alt="Herramientas" className="w-12 h-12" />,
  // Regalo (Certificación gratuita)
  <img src={Gift} alt="Certificación gratuita" className="w-12 h-12" />,
  // Dinero flecha (Retribución económica)
  <img src={MoneyArrow} alt="Retribución económica" className="w-12 h-12" />,
  // Megáfono (Material Publicitario)
  <img src={Megaphone} alt="Material Publicitario" className="w-12 h-12" />
];


const CardsBeneficios = () => {
    const { t } = useTranslation();
    const BENEFICIOS = [
      {
        icon: ICONS[0],
        titulo: t("centroCertificador.benefits.0.title"),
        descripcion: t("centroCertificador.benefits.0.subtitle"),
      },
      {
        icon: ICONS[1],
        titulo: t("centroCertificador.benefits.1.title"),
        descripcion: t("centroCertificador.benefits.1.subtitle"),
      },
      {
        icon: ICONS[2],
        titulo: t("centroCertificador.benefits.2.title"),
        descripcion: t("centroCertificador.benefits.2.subtitle"),
      },
      {
        icon: ICONS[3],
        titulo: t("centroCertificador.benefits.3.title"),
        descripcion: t("centroCertificador.benefits.3.subtitle"),
      },
      {
        icon: ICONS[4],
        titulo: t("centroCertificador.benefits.4.title"),
        descripcion: t("centroCertificador.benefits.4.subtitle"),
      },
      {
        icon: ICONS[5],
        titulo: t("centroCertificador.benefits.5.title"),
        descripcion: t("centroCertificador.benefits.5.subtitle"),
      }
    ];
    return (
    <motion.section
      className="w-full pt-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
  <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
    {BENEFICIOS.map((item, idx) => (
      <div
        key={idx}
        className="flex flex-col items-start bg-white rounded-2xl border border-gray-300 p-6 min-h-[200px] transition-shadow hover:shadow-md"
      >
        <div className="mr-4 flex-shrink-0 mb-8">{item.icon}</div>
        <div>
          <div className="font-bold text-base mb-1">{item.titulo}</div>
          <div className="text-sm text-gray-800">{item.descripcion}</div>
        </div>
      </div>
    ))}
  </section>
  <TextInfo titulo={t("centroCertificador.collage")}/>
  </motion.section>
);
};

export default CardsBeneficios;
