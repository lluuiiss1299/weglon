import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "./ImageModal";

gsap.registerPlugin(ScrollTrigger);

const secciones = [
  {
    texto: "Conoce y desayuna con un ASTRONAUTA y aprende sobre el espacio.",
    imgs: [
      ["https://images.pixieset.com/84918549/1bbc6d4fd7419ac68206bbfe78857bac-xxlarge.jpg"], // imagen grande
      ["https://images.pixieset.com/84918549/5986d7439537218152153be9763b291e-xxlarge.jpg",
        "https://images.pixieset.com/84918549/59177f158b1b6496e83703b2eec1f94d-large.jpg",
        "https://images.pixieset.com/84918549/c3e54882030ecc8676eadc344d338de0-xxlarge.jpg"], // 3 pequeñas
    ],
    hoverImg: "https://images.pixieset.com/84918549/1bbc6d4fd7419ac68206bbfe78857bac-xxlarge.jpg",
    reverse: false,
  },
  {
    texto: "Despierta la maravilla por la salud y el cuerpo humano en El Health Museum.",
    imgs: [
      ["https://images.pixieset.com/84918549/8aed15732a3a6ff9bbe5d55a55cfc03e-large.jpg"], // imagen grande horizontal
      ["https://images.pixieset.com/84918549/2675423cb85c3781b123fb58a0135902-large.jpg",
        "https://images.pixieset.com/84918549/1f30e98fa49c4c20b7d53e94086386b4-xxlarge.jpg",
        "https://images.pixieset.com/84918549/80cc375c5096037b83f385a30c3effde-large.jpg"], // 2 pequeñas vertical
    ],
    reverse: true,
  },
  {
    texto: "Sorpréndete con la evolución que ha vivido el ser humano en THE MUSEUM OF NATURAL SCIENCE.",
    imgs: [
      ["https://images.pixieset.com/84918549/142691b927c0dae96b6f98d076b43538-xxlarge.jpg"], // grande
      ["https://images.pixieset.com/84918549/6e003777a5fa4e075529102fa0ba987c-large.jpg",
        "https://images.pixieset.com/84918549/ee130b95af11323231f9eacbf52e130a-large.jpg",
        "https://images.pixieset.com/84918549/05e55c38e3b97c7b1fb435f5e66875b6-large.jpg"], // pequeñas
    ],
    reverse: false,
  },
];

const ExperienciasSeccion = () => {
  const sectionRefs = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalAlt, setModalAlt] = useState("");

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
        duration: 1.1,
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
    <section className="flex flex-col gap-20 py-12">
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={modalImg} alt={modalAlt} />
      {secciones.map((sec, i) => (
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
                <h1>{sec.texto}</h1>
              </div>
              <div className="flex flex-col gap-3 text-gray-400 ">
                <img
                  src={sec.imgs[1][0]}
                  alt="Mapa antiguo de Tokio"
                  className="w-full h-[110px] object-cover rounded-2xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                  onClick={() => handleImgClick(sec.imgs[1][0], "Mapa antiguo de Tokio")}
                  style={{ cursor: "pointer" }}
                />
                <div className="flex gap-3 text-gray-400">
                  <img
                    src={sec.imgs[1][1]}
                    alt="Jardín japonés"
                    className="w-1/2 h-[110px] object-cover rounded-xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                    onClick={() => handleImgClick(sec.imgs[1][1], "Jardín japonés")}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={sec.imgs[1][2]}
                    alt="Palacio tradicional interior"
                    className="w-1/2 h-[110px] object-cover rounded-xl bg-gray-300 transition-transform duration-500 hover:scale-110"
                    onClick={() => handleImgClick(sec.imgs[1][2], "Palacio tradicional interior")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 flex flex-col gap-4 ${sec.reverse ? "order-1" : "order-2"
              }`}
          >
            <div className="flex gap-4">
              {sec.imgs[0].map((src, idx2) => (
                <div
                  key={idx2}
                  className="exp-img bg-gray-300 rounded-2xl overflow-hidden w-full h-[465px] relative group"
                >
                  <img src={src} alt="Imagen" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onClick={() => handleImgClick(src, "Imagen grande")} style={{ cursor: "pointer" }} />
                  {/* Overlay con título y subtítulo */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-start transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <h2 className="text-white text-lg font-bold">JHONSON SPACE CENTER</h2>
                    <p className="text-white text-sm font-medium">The Food Lab</p>
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
