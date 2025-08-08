import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(gsap, ScrollTrigger);
import HeroTitle from './HeroTitle';
import { useTranslation } from 'react-i18next';

const VideoHero = () => {
  const videoRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Solo aplica la animación en pantallas >= 1024px
        "(min-width: 1024px)": () => {
          gsap.to(videoRef.current, {
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top top",
              end: "bottom center",
              scrub: true,
              // markers: true,
            },
            borderRadius: "45px",
            scale: 0.87,
            ease: "none",
          });
        },
        // Si quieres puedes poner un handler para móviles:
        // "(max-width: 1023px)": () => {
        //   // Aquí podrías resetear el estilo si quieres
        //   gsap.set(videoRef.current, { borderRadius: 0, scale: 1 });
        // }
      });
    });

    return () => ctx.revert(); // Limpia la animación al desmontar
  }, []);

  return (
    <section className="w-full py-6 max-sm:py-0">
        <div className="mx-auto">
        <video
            className="w-full"
            ref={videoRef}
            autoPlay
            muted
            loop
        >
            <source src="https://weglon-assets-prod.s3.us-east-1.amazonaws.com/Videos/japon.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
        </video>
        </div>
        <HeroTitle title={t('hero.title')} subtitle={t('hero.subtitle')} />
    </section>
  );
};

export default VideoHero;
