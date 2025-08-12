import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(gsap, ScrollTrigger);
import HeroTitle from './HeroTitle';
import { useTranslation } from 'react-i18next';
import CenterTitle from './CenterTitle';

const VideoHero = () => {
  const videoRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!videoRef.current) return;

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: true,
        // markers: true,
      },
      borderRadius: '45px',
      scale: 0.87,
      ease: 'none',
    });
  }, []);

  return (
    <section className="w-full py-6">
      <HeroTitle title={t('platform.title')} subtitle={t('platform.subtitle')} />
        <div
        id="iframe-wrapper"
         className="mx-auto mb-24 flex justify-center w-[70%] h-[70vh] relative">
        <iframe 

          src="https://anglolinguist.com" 
          style={{width: '100%', height: '100%', border: 'none', pointerEvents:'none'}} 
          loading="lazy">
        </iframe> 
        <a href="https://anglolinguist.com" target="_blank" 
          style={{position: 'absolute', top: 0, left: 0, width: '98%', height: '100%', zIndex: 2}}>
        </a>
        </div>
        <CenterTitle title={t('centers.title')} subtitle={t('centers.subtitle')} /> 
    </section>
  );
};

export default VideoHero;
