import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const TravelVisits = () => {
    const { t } = useTranslation();

  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center ">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          hola
        </h1>
      </div>
    </motion.section>
  );
};

export default TravelVisits;
