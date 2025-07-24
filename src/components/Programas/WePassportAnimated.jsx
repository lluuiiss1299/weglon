import React from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HeroTitle from "../Principal/HeroTitle";
import WePassport from "../../assets/Images/pasaporte.jpg";



const Carousel = () => {
    const { t } = useTranslation();
  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <section className="w-full px-6 pt-10 pb-24 ">
            <HeroTitle title={t("wePassport.title")} subtitle={t("wePassport.subtitle")} />
            <div className="flex flex-row justify-center items-center">
                <img src={WePassport} alt="We-Passport" className="w-50 h-80 object-cover"/>
                
            </div>
        </section>
    </motion.section>
  );
};

export default Carousel;
