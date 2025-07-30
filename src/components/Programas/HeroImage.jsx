import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next'; 
import HeroImge from '../../assets/Images/Hero/HeroNasa.jpg';

const HeroImage = ({ trip, index }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.inOut' }
    );
  }, []);
  const image = "/src/assets/Images/Hero/" + t(`destinations.${trip}.imageHero`);

  return (
    <motion.div
      className="relative w-full h-[350px] md:h-[95vh] rounded-2xl overflow-hidden"
      style={{ minHeight: 250 }}
    >
      <motion.img
        ref={imageRef}
        src={image}
        alt="Hero"
        className="w-full h-full object-cover rounded-2xl"
        layoutId={`hero-image-${index}`}
      />
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col md:flex-row justify-between items-start md:items-start px-6 py-12"
        style={{ opacity: 0 }}
      >
        <div className="mt-6 md:mt-0 md:ml-4 text-center ">
          <h1 className="text-4xl md:text-3xl font-semibold text-white leading-tight">WE-Experience</h1>
          <span className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {t(`destinations.${trip}.heroTitle`)}
          </span>
        </div>
        <div className="mt-4 md:mt-0 md:mr-4 text-center max-w-sm ml-auto">
          <p className="text-base md:text-lg text-white">
            {t(`destinations.${trip}.heroText`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroImage;



