import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CenterTitle from '../../components/Principal/CenterTitle';
import { useTranslation } from 'react-i18next';
import ModalGallery from './ModalGallery';


const Gallery = ({ trip }) => {
const [galeriaAbierta, setGaleriaAbierta] = useState(false);
const { t } = useTranslation();


return (
    <motion.section
      className="w-full pt-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

        <ModalGallery abierto={galeriaAbierta} onClose={() => setGaleriaAbierta(false)} trip={trip} />
        <CenterTitle title={t("gallery.HeroText")} /> 
        
        <section className="flex flex-col py-12 mb-12">
            <div
            className={`flex flex-col md:flex-row w-full max-w-5xl mx-auto`}
            >
            <div
                className={`exp-text flex-1 text-lg font-semibold md:max-w-[400px]`}
            >
                <div className="max-w-xs mx-6 font-sans bg-white grid grid-cols-1 h-full">
                <div className="flex flex-col gap-3 text-gray-400 h-full">
                    <img
                    src="https://images.pixieset.com/84918549/142691b927c0dae96b6f98d076b43538-xxlarge.jpg"
                    alt="Mapa antiguo de Tokio"
                    className="w-full h-full object-cover rounded-2xl bg-gray-300 transition-transform duration-500"
                    />
                    <div className="flex flex-row gap-3 text-gray-400 h-full pr-3 pt-3">
                    <img
                        src="https://images.pixieset.com/84918549/142691b927c0dae96b6f98d076b43538-xxlarge.jpg"
                        alt="Jardín japonés"
                        className="w-1/2 h-full object-cover rounded-xl bg-gray-300 transition-transform duration-500"
                    />
                    <img
                        src="https://images.pixieset.com/84918549/142691b927c0dae96b6f98d076b43538-xxlarge.jpg"
                        alt="Palacio tradicional interior"
                        className="w-1/2 h-full object-cover rounded-xl bg-gray-300 transition-transform duration-500"
                    />
                    </div>
                </div>
                </div>
            </div>
            <div
                className="flex-1 flex flex-col"
            >
                <div className="flex ">
                    <div
                    className="exp-img bg-gray-300 rounded-2xl overflow-hidden w-full h-[400px] relative group"
                    >
                        <img src="https://images.pixieset.com/84918549/142691b927c0dae96b6f98d076b43538-xxlarge.jpg" 
                        alt="Imagen" className="w-full h-full object-cover transition-transform duration-500"/>
                        <div className="absolute top-4 right-4 z-10">
                            <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold 
                            hover:bg-gray-100 transition-colors duration-300 shadow-md text-sm"
                            onClick={() => setGaleriaAbierta(true)}>
                                Ver Galería
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </motion.section>
  );
};

export default Gallery;