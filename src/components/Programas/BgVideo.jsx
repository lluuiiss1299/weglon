import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import video from "../../assets/Videos/japon.mp4";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);


const VideoScrollReveal = ({ trip }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: videoRef.current,
      pinSpacing: false,
      scrub: true,

    });
    gsap.to(overlayRef.current, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true,
      }
    });

    ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const prog = self.progress;
          let opacity = 1 - 2 * Math.abs(prog - 0.5);
          overlayRef.current.style.opacity = opacity;
        },
      });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative h-[300vh] bg-black mb-12">
      <div ref={containerRef} className="relative h-[200vh]">
        <video
        ref={videoRef}
        src={video}
        className="w-full h-[100vh] object-cover sticky top-0"
        autoPlay
        muted
        loop
        playsInline
        />
            <div
            ref={overlayRef}
            className="absolute top-0 left-0 w-full h-[300vh] flex flex-col justify-center items-center "
            style={{
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "bold",
                background: "rgba(10,12,20,0.58)",
                backdropFilter: "blur(2px)",
                opacity: 0,
                transition: "opacity 0.1s",
            }}
            >
            <div className="max-w-7xl grid h-56 grid-rows-3 content-around gap-32 text-center px-4  pb-12">
                <h1 className="mb-4 text-7xl">{t(`destinations.${trip}.videoTitle`)}</h1>
                <h2 className="text-4xl mb-4">
                {t(`destinations.${trip}.videoText1`)}
                </h2>
                <h2 className="text-4xl mb-4">
                {t(`destinations.${trip}.videoText2`)}
                </h2>
                <a href="#" className=" text-black px-12 py-2 rounded-full text-white border-2 border-gray-300 border-solid w-[70%] text-center mx-auto hover:bg-gray-300 hover:text-black">
                    <span className="text-white text-4xl">{t(`destinations.buttonText`)}</span>
                </a>
            </div>
        </div>
        
      </div>
      <div style={{ height: "100vh" }} />
    </section>
  );
};

export default VideoScrollReveal;
