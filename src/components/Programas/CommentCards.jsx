import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { testimonios, BASEIMAGE } from "../../constants/constantsPrograms";
import { useTranslation } from "react-i18next";
import Titulo from "../Principal/CenterTitle";
import { motion } from "framer-motion";

const columnas = 4;
const cardsPorColumna = 6;
const duraciones = [60, 80, 70, 50]; // segundos por loop para cada columna

function getColumnData(index) {
  let arr = [];
  for (let i = 0; i < cardsPorColumna; i++) {
    arr.push(testimonios[(i + index) % testimonios.length]);
  }
  return arr;
}

// Función para obtener la clase de sombra según el viaje
function getShadowClass(trip) {
  switch (trip) {
    case "nasa":
      return "hover:shadow-[0_0_32px__rgba(88,133,255,0.50)]"; // azul pastel
    case "canada":
      return "hover:shadow-[0_0_32px_0_rgba(255,99,132,0.50)]"; // rojo pastel
    case "tokio":
      return "hover:shadow-[0_0_32px_0_rgba(255,221,51,0.50)]"; // amarillo pastel
    default:
      return "hover:shadow-lg";
  }
}

const CommentCards = () => {
  const { t } = useTranslation();
  const contenedoresRef = useRef([]);
  const mobileTrackRef = useRef(null);

  // Animación columnas (desktop/tablet)
  useEffect(() => {
    let timelines = [];
    contenedoresRef.current.forEach((col, idx) => {
      if (!col) return;
      gsap.set(col, { yPercent: 0 });
      const tl = gsap.to(col, {
        yPercent: -50,
        duration: duraciones[idx % duraciones.length],
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(col, { yPercent: 0 });
        }
      });
      col.parentElement.addEventListener("mouseenter", () => tl.pause());
      col.parentElement.addEventListener("mouseleave", () => tl.resume());
      timelines.push(tl);
    });
    return () => {
      timelines.forEach(tl => tl.kill());
    };
  }, []);

  // Animación carrusel horizontal (mobile)
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    // Loop horizontal de la pista
    gsap.set(track, { xPercent: 0 });
    const trackTl = gsap.to(track, {
      xPercent: -150,
      duration: 50,
      ease: "none",
      repeat: -1,
      onRepeat: () => gsap.set(track, { xPercent: 0 })
    });

    // Pausa en hover de todo el carrusel
    const container = track.parentElement;
    const pause = () => trackTl.pause();
    const resume = () => trackTl.resume();
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);


    return () => {
      trackTl.kill();
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <motion.section
      className="w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Titulo title={t("testimonials.title")} />
      {/* Desktop/Tablet: columnas verticales auto-scroll */}
      <section className="relative w-full py-16 bg-white overflow-hidden hidden md:block">
        <div className="max-w-5xl mx-auto flex gap-8">
          {[...Array(columnas)].map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-[500px] relative overflow-hidden"
              style={{ minWidth: "260px" }}
            >
              <div
                ref={(el) => (contenedoresRef.current[idx] = el)}
                className="flex flex-col gap-6"
              >
                {[...getColumnData(idx), ...getColumnData(idx)].map((testi, tIdx) => {
                  const trip = t(testi.tripKey);
                  const shadowClass = getShadowClass(trip);
                  return (
                    <div
                      key={tIdx}
                      className={`bg-white rounded-xl shadow-lg px-7 py-6 min-h-[150px] flex flex-col justify-between border border-blue-100 transition-shadow duration-300 ${shadowClass}`}
                    >
                      <div className="italic text-gray-700 mb-6">{t(testi.commentKey)}</div>
                      <div className="flex items-center gap-3">
                        <img
                          src={BASEIMAGE + "Avatar/" + t(testi.avatar)}
                          alt={t(testi.nameKey)}
                          className="w-10 h-10 rounded-full object-cover bg-blue-100"
                        />
                        <div>
                          <div className="font-bold text-[15px]">{t(testi.nameKey)}</div>
                          <div className="text-xs text-blue-600">{t(testi.rolKey)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/90 via-white/60 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/90 via-white/60 to-transparent z-10" />
            </div>
          ))}
        </div>
      </section>

      {/* Mobile: carrusel horizontal infinito con blob animado */}
      <section className="relative w-full py-10 bg-white overflow-hidden md:hidden">
        <div className="max-w-[92vw] mx-auto">
          <div className="relative overflow-hidden">
            <div
              ref={mobileTrackRef}
              className="flex gap-6 will-change-transform"
            >
              {[...testimonios, ...testimonios].map((testi, idx) => {
                const trip = t(testi.tripKey);
                const shadowClass = getShadowClass(trip);

                const blobColorClass =
                  trip === "nasa"
                    ? "bg-blue-300"
                    : trip === "canada"
                    ? "bg-red-300"
                    : trip === "tokio"
                    ? "bg-yellow-300"
                    : "bg-slate-300";

                return (
                  <div key={idx} className="relative shrink-0">
                    <div
                      className={`bg-white rounded-xl shadow-lg px-6 py-6 w-[280px] min-h-[150px] flex flex-col justify-between border border-blue-100 transition-shadow duration-300 ${shadowClass}`}
                    >
                      <div className="italic text-gray-700 mb-6 text-sm">
                        {t(testi.commentKey)}
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={BASEIMAGE + "Avatar/" + t(testi.avatar)}
                          alt={t(testi.nameKey)}
                          className="w-10 h-10 rounded-full object-cover bg-blue-100"
                        />
                        <div>
                          <div className="font-bold text-[15px]">{t(testi.nameKey)}</div>
                          <div className="text-xs text-blue-600">{t(testi.rolKey)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default CommentCards;
