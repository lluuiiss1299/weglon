import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "./ImageModal";
import { useTranslation } from "react-i18next";
import CenterTitle from "../../components/Principal/CenterTitle";
import { LUGARESNASA, LUGARESTOKIO, LUGARESCANADA } from "../../constants/constantsPrograms";

gsap.registerPlugin(ScrollTrigger);

const ExperienciasSeccion = ({ trip }) => {
  const sectionRefs = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const { t } = useTranslation();
  const lugares = trip === "nasa" ? LUGARESNASA : trip === "tokio" ? LUGARESTOKIO : LUGARESCANADA;

  useEffect(() => {
    sectionRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const imgs = ref.querySelectorAll(".exp-img");
      const texto = ref.querySelector(".exp-text");
      gsap.set([imgs, texto], { opacity: 0, filter: "blur(12px)" });

      gsap.to([imgs, texto], {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.15,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref,
          start: "top 75%",
          end: "bottom 65%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const handleImgClick = (src, alt) => {
    setModalImg(src);
    setModalAlt(alt);
    setModalOpen(true);
  };

  return (
    <section className="flex flex-col gap-20 py-12 mb-12 mt-6">
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={modalImg} alt={modalAlt} />
      <CenterTitle title={t(`showImagesDetails.title`)} />
      {(t(`showImagesDetails.${trip}`, { returnObjects: true })).map((sec, i) => (
        <div
          ref={el => (sectionRefs.current[i] = el)}
          key={i}
          className={`flex flex-col md:flex-row gap-8 md:gap-10 w-full max-w-5xl mx-auto`}
        >
          <div
            className={`exp-text flex-1 text-lg font-semibold md:max-w-[300px]  ${sec.reverse ? "order-2 md:text-right" : "order-1 md:text-left"
              }`}
          >
            <div className="max-w-xs mx-auto font-sans bg-white grid grid-cols-1 grid-rows-2 content-between">
              <div className="text-xl font-bold leading-snug">
                <h1>{sec.title}</h1>
              </div>
              <div className="flex flex-col gap-3 text-gray-400 ">
                <img
                  src={lugares + sec.imgs[1][0]}
                  alt="Mapa antiguo de Tokio"
                  
                  className="w-full h-[110px] object-cover rounded-2xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                  onClick={() => handleImgClick(lugares + sec.imgs[1][0], "Mapa antiguo de Tokio")}
                  style={{ cursor: "pointer" }}
                />
                <div className="flex gap-3 text-gray-400">
                  <img
                    src={lugares + sec.imgs[1][1]}
                    alt="Jardín japonés"
                    
                    className="w-1/2 h-[110px] object-cover rounded-xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                    onClick={() => handleImgClick(lugares + sec.imgs[1][1], "Jardín japonés")}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={lugares + sec.imgs[1][2]}
                    alt="Palacio tradicional interior"
                    
                    className="w-1/2 h-[110px] object-cover rounded-xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                    onClick={() => handleImgClick(lugares + sec.imgs[1][2], "Palacio tradicional interior")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 flex flex-col gap-4 order-1`}
          >
            <div className="flex gap-4">
              {sec.imgs[0].map((src, idx2) => (
                <div
                  key={idx2}
                  className="exp-img bg-gray-300 rounded-2xl overflow-hidden w-full h-[465px] relative group"
                >
                  <img src={lugares + src} alt="Imagen" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onClick={() => handleImgClick(lugares + src, "Imagen grande")} style={{ cursor: "pointer" }} />
                  {/* Overlay con título y subtítulo */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-start transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <h2 className="text-white text-lg font-bold">{t(`showImagesDetails.${trip}.${i}.hoverTitle`)}</h2>
                    <p className="text-white text-sm font-medium">{t(`showImagesDetails.${trip}.${i}.hoverSubtitle`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExperienciasSeccion;
