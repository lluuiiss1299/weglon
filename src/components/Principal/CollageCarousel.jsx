import React, { useRef, useEffect } from "react";
import { ESCUDOS } from "../../constants/constantsPrograms";
import gsap from "gsap";
import CenterTitle from './CenterTitle';
import { useTranslation } from 'react-i18next';


const EscudosCarrusel = () => {
  const containerRef = useRef();
  const tweenRef = useRef();
  const { t } = useTranslation();


  const logos = t("collage.logos", { returnObjects: true }).map((logo) => ESCUDOS + logo);

  useEffect(() => {
    const container = containerRef.current;
    const logosClone = container.innerHTML;

    // Clonar logos para efecto infinito
    container.innerHTML += logosClone;

    tweenRef.current = gsap.to(container, {
      xPercent: -20,
      ease: "none",
      duration: 50,
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
    <section className="py-16 bg-white overflow-hidden">
      

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={containerRef}
          className="flex w-max gap-12 px-6 items-center py-12"
        >
          {logos.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-40 h-32">
              <img
                src={src}
                alt={`escudo-${index}`}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EscudosCarrusel;
