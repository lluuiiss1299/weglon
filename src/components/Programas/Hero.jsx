import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(gsap, ScrollTrigger);
import HeroTitle from '../Principal/HeroTitle';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { HERO } from '../../constants/constantsPrograms';

const VideoHero = () => {
  const numero_aleatorio = Math.floor(Math.random() * 3) + 1;
  const videoRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          gsap.to(videoRef.current, {
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top top",
              end: "bottom center",
              scrub: true,
            },
            borderRadius: "45px",
            scale: 0.87,
            ease: "none",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full pt-6">
        <HeroTitle title={t('programs.title')} subtitle={<Trans i18nKey="programs.subtitle" components={{ br: <br /> }} />} />
        <div className="mx-auto">
        <video
            className="w-full"
            ref={videoRef}
            poster={`${HERO + "VideoHeroMain" + numero_aleatorio + ".webp"}`}
            preload="none"
            autoPlay
            muted
            loop
            playsInline
        >
            <source src={`https://weglon-assets-prod.s3.us-east-1.amazonaws.com/Videos/MAINVIDEOPT${numero_aleatorio}.mp4`} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
        </video>
        </div>
    </section>
  );
};

export default VideoHero;
