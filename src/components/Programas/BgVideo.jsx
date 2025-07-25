import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import video from "../../assets/Videos/japon.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoScrollReveal = () => {
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
        onUpdate: (self) => {
        }
      }
    });

    ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const prog = self.progress;
          console.log(prog);
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
      {/* Contenedor para el pin */}
      <div ref={containerRef} className="relative h-[200vh]">
        {/* Video Pinned */}

        <video
        ref={videoRef}
        src={video}
        className="w-full h-[100vh] object-cover sticky top-0"
        autoPlay
        muted
        loop
        playsInline
        />

        {/* Overlay */}
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
                <h1 className="mb-4 text-4xl">Texto espectacular sobre el video</h1>
                <h2 className="text-lg mb-4">
                Este texto se desliza y se sobrepone al video mientras haces scroll, al puro estilo Apple. Puedes poner aquí tu mensaje principal.
                </h2>
                <h2 className="text-lg mb-4">
                Este texto se desliza y se sobrepone al video mientras haces scroll, al puro estilo Apple. Puedes poner aquí tu mensaje principal.
                </h2>
                <a href="#" className=" text-black px-12 py-2 rounded-full text-white border-2 border-gray-300 border-solid w-1/2 text-center mx-auto hover:bg-gray-300 hover:text-black">
                    Mas Información
                </a>
            </div>
        </div>
        
      </div>
      {/* Espacio extra abajo para "desanclar" */}
      <div style={{ height: "100vh" }} />
    </section>
  );
};

export default VideoScrollReveal;
