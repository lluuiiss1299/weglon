import React, { useEffect, useRef } from 'react';
import VideoHeroSrc from '../../assets/Videos/japon.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(gsap, ScrollTrigger);

const VideoHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: true,
        markers: true,
      },
      borderRadius: '45px',
      scale: 0.87,
      ease: 'none',
    });
  }, []);

  return (
    <section className="w-full py-6">
        <div className="mx-auto">
        <video
            className="w-full"
            ref={videoRef}
            autoPlay
            muted
            loop
        >
            <source src={VideoHeroSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
        </video>
        </div>
        <div className='mx-auto max-w-7xl px-12 pt-12 pb-24 flex flex-row justify-between items-center'>
        <h1 className="text-6xl font-bold text-center mt-6">We-Experience</h1>
        <p className="text-center text-lg mt-4">
          Más que un viaje, una transformación.
        </p>
      </div>
    </section>
  );
};

export default VideoHero;
