import React, { useRef, useState } from "react"; // O usa tus íconos SVG
import Arrow from "../../assets/Icons/ArrowDown.svg";
import { useTranslation } from "react-i18next"; 
import { motion } from "framer-motion";
import CenterTitle from "../Principal/CenterTitle";
import { BENEFICIOS } from "../../constants/constantsPrograms";

const CARD_WIDTH = 350; // px (ajusta según diseño)

const CarruselCaracteristicas = ({ trip }) => {
  const scrollRef = useRef();
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const beneficios = trip === "nasa" ? BENEFICIOS + "Nasa/" : trip === "tokio" ? BENEFICIOS + "Tokio/" : BENEFICIOS + "Canada/";
  const scrollByCards = (dir = 1) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * (CARD_WIDTH + 24), // ancho de card + gap (si usas gap-6)
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad del scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.section
      className="w-full pt-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    > 
      <CenterTitle title={t("characteristics.title")} /> 
    <div className="relative w-full py-6 mb-8 mt-16 pl-16">
      <div className="flex items-center">
        {/* Carrusel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab select-none"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch"
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {t(`characteristics.${trip}`, { returnObjects: true }).map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 rounded-3xl bg-neutral-200 overflow-hidden shadow-md relative group"
              style={{ width: `${CARD_WIDTH}px`, height: "500px" }}
            >
              <img src={beneficios + item.img[0]} alt={item.titulo} className="object-cover w-full h-full pointer-events-none" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-center">
                <div>
                  <span className="text-3xl font-extrabold text-white drop-shadow-lg leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
              {/* Overlay con degradado */}
              <div className="absolute bottom-0 left-0 w-full h-full p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-end justify-end transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h2 className="text-white text-lg font-bold">{item.hoverText}</h2>
              </div>
            </div>
          ))}
        </div>
        {/* Flechas */}
      </div>
        <div className="flex-row flex justify-end gap-5 z-10 mt-4 pr-12">
          <button
            className="w-8 h-8 rounded-full bg-gray-100 shadow hover:bg-gray-200 flex items-center justify-center"
            onClick={() => scrollByCards(-1)}
          >
            <img src={Arrow} alt="Arrow" className="w-5 h-5 rotate-90" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-gray-100 shadow hover:bg-gray-200 flex items-center justify-center"
            onClick={() => scrollByCards(1)}
          >
            <img src={Arrow} alt="Arrow" className="w-5 h-5 rotate-[270deg]" />
          </button>
        </div>
    </div>
    </motion.section>
  );
};

export default CarruselCaracteristicas;
