import React, { useRef, useEffect } from "react";
import Logo1 from '../../assets/Images/Escudos/CollageAlbertEinstein.png';
import Logo2 from '../../assets/Images/Escudos/CollageAlianza.png';
import Logo3 from '../../assets/Images/Escudos/CollageAntonioPlancarte.png';
import Logo4 from '../../assets/Images/Escudos/CollageGreenland.png';
import Logo5 from '../../assets/Images/Escudos/CollageHidalgoMichoacan.png';
import Logo6 from '../../assets/Images/Escudos/CollageLaCuenca.png';
import Logo7 from '../../assets/Images/Escudos/CollageMonteAlban.png';
import Logo8 from '../../assets/Images/Escudos/CollageVictoriaVirtud.png';
import gsap from "gsap";

const logos = [
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8
];

const EscudosCarrusel = () => {
  const containerRef = useRef();
  const tweenRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const logosClone = container.innerHTML;

    // Clonar logos para efecto infinito
    container.innerHTML += logosClone;

    tweenRef.current = gsap.to(container, {
      xPercent: -50,
      ease: "none",
      duration: 50,
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(tweenRef.current, {
      timeScale: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(tweenRef.current, {
      timeScale: 1,
      duration: 1,
      ease: "power1.in",
    });
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Centros Educativos Asociados</h2>
        <p className="text-gray-700 text-lg mt-2">
          Convierte tu colegio en un centro certificador
        </p>
      </div>

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
