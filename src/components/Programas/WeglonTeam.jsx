import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import HeroTitle from "../Principal/HeroTitle";
import { useTranslation } from "react-i18next";
import { equipoWeglon, EQUIPOWEGLON } from "../../constants/constantsPrograms";

const WeglonTeam = () => {
  const { t } = useTranslation();
  const containerRef = useRef();
  const tweenRef = useRef();

  useEffect(() => {
      const container = containerRef.current;
      const originalContent = container.innerHTML;
      container.innerHTML += originalContent;

      tweenRef.current = gsap.to(container, {
          xPercent: -25,
          ease: "none",
          duration: 150,
          repeat: -1,
      });

      return () => {
          if (tweenRef.current) tweenRef.current.kill();
      };
  }, []);

  const handleMouseEnter = () => {
    gsap.killTweensOf(tweenRef.current, "timeScale");
    gsap.to(tweenRef.current, {
      timeScale: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf(tweenRef.current, "timeScale");
    gsap.to(tweenRef.current, {
      timeScale: 1,
      duration: 1,
      ease: "power1.in",
    });
  };

  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <HeroTitle title={t("weglonTeam.HeroText")} /> 
    <section className="w-full max-w-5xl mx-auto rounded-[30px] p-0 overflow-hidden shadow-xl flex flex-col md:flex-row bg-gradient-to-r from-[#FAFAFA] from-40% via-[#B2B8F6] via-90% via-[#8E97F1] via-90% to-[#6D78ED]">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-start ">
        <div className="flex-1 flex flex-col justify-center px-8 py-10 min-w-[270px] bg-white/60 md:bg-transparent col-span-2 justify-center mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            {t("weglonTeam.title")}
            </h2>
            <p className="mb-7 text-gray-700 max-w-xs">
            {t("weglonTeam.subtitle")}
            </p>
            <motion.a
            whileHover={{
                backgroundColor: "#111827",
                color: "#fff",
                borderColor: "#111827",
                transition: { duration: 0.25 },
            }}
            href="#contacto"
            className="border-2 border-blue-700 text-blue-700 px-5 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-blue-800 hover:text-white text-center"
            >
            Cominicate con nosotros
            </motion.a>
        </div>
        <div className="flex-1 min-w-0 relative py-10 pr-8 col-span-4 ">
          <div className="w-full h-full overflow-hidden rounded-[25px]">
            <div
                ref={containerRef}
                className="flex w-max gap-4 items-center py-12"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {[...equipoWeglon, ...equipoWeglon].map((persona, idx) => (
                    <div
                        key={idx}
                        className="min-w-[180px] w-[240px] h-[350px] rounded-[25px] relative flex flex-col justify-end items-center bg-gradient-to-b from-[#CFF1FF] to-[#0E85F4] mx-1 shadow-lg transition"
                    >
                        <img
                            src={EQUIPOWEGLON + t(persona.imagen)}
                            alt={t(persona.nombreKey)}
                            className="w-full object-contain drop-shadow-xl"
                            draggable={false}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-2/5 rounded-b-[25px] bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
                        <div className="absolute bottom-5 left-0 w-full px-4 text-left z-20">
                            <div className="font-bold text-white text-base">{t(persona.nombreKey)}</div>
                            <div className="text-white text-xs opacity-80">{t(persona.profesionKey)}</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </motion.section>
  );
};

export default WeglonTeam;
