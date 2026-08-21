import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroTitle from "../../components/Principal/HeroTitle";
import {WEPASSPORT, WEPASSPORTIMAGES } from "../../constants/constantsPrograms.js";

gsap.registerPlugin(ScrollTrigger);

const FRAME_START = 2;
const FRAME_END = 100;

const FRAME_URLS = Array.from(
  { length: FRAME_END - FRAME_START + 1 },
  (_, i) => `${WEPASSPORT}WPP${i + FRAME_START}.webp`
);

const defaultSections = {
  left: [
    { start: 0, end: 0.18, fade: 0.02, title: "", description: "" },
    { start: 0.18, end: 0.30, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"usa.webp" },
    { start: 0.32, end: 0.46, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"canada.webp" },
    { start: 0.48, end: 0.61, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"london.webp" },
    { start: 0.64, end: 0.76, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"germany.webp" },
    { start: 0.78, end: 0.92, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"arabia.webp" },
    
  ],
  right: [
    { start: 0, end: 0.18, fade: 0.04, title: "", description: "" },
    { start: 0.18, end: 0.30, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"nasa.webp" },
    { start: 0.32, end: 0.46, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"japon.webp" },
    { start: 0.48, end: 0.61, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"italy.webp" },
    { start: 0.64, end: 0.76, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"grecia.webp" },
    { start: 0.78, end: 0.92, fade: 0.02, title: "", description: "", image: WEPASSPORTIMAGES+"weglon.webp" },
  ],
  top: [
    { start: 0, end: 0.31, fade: 0.04, title: "wePassport.phrases.0.phrase", description: "wePassport.phrases.0.author" },
    { start: 0.35, end: 0.64, fade: 0.04, title: "wePassport.phrases.1.phrase", description: "wePassport.phrases.1.author" },
    { start: 0.68, end: 1, fade: 0.04, title: "wePassport.phrases.2.phrase", description: "wePassport.phrases.2.author" },
  ],
};

export default function WePassportAnimated({
  frameCount = FRAME_URLS.length,
  scrollHeight = 4000,
  overlays = [],
  sections = defaultSections,
  onReady,
}) {
  const { t } = useTranslation();
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRefs = useRef([]);
  const imagesRef = useRef([]);
  const stateRef = useRef({ frame: 0 });
  const sectionItemRefs = useRef({ left: [], right: [], top: [] });
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const totalFrames = Math.min(frameCount, FRAME_URLS.length);

  const frameUrl = useCallback(
    (index) => FRAME_URLS[index] ?? FRAME_URLS[FRAME_URLS.length - 1],
    []
  );


  useEffect(() => {
    if (totalFrames === 0) return;

    let cancelled = false;
    const images = new Array(totalFrames);
    let loaded = 0;

    const handleLoad = () => {
      loaded += 1;
      if (!cancelled) setProgress(loaded / totalFrames);
      if (loaded === totalFrames && !cancelled) {
        imagesRef.current = images;
        setReady(true);
        onReady?.();
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = handleLoad;
      img.onerror = handleLoad;
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [totalFrames, frameUrl, onReady]);


  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = wrapper.clientWidth * dpr;
      canvas.height = wrapper.clientHeight * dpr;
      canvas.style.width = `${wrapper.clientWidth}px`;
      canvas.style.height = `${wrapper.clientHeight}px`;
      drawFrame(Math.round(stateRef.current.frame));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [drawFrame]);


  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const updateOverlays = (frame) => {
        overlays.forEach((ov, i) => {
          const el = overlayRefs.current[i];
          if (!el) return;
          const fade = ov.fade ?? 6;
          let opacity = 0;

          if (frame >= ov.startFrame && frame <= ov.endFrame) {
            opacity = 1;
          } else if (frame > ov.endFrame && frame <= ov.endFrame + fade) {
            opacity = 1 - (frame - ov.endFrame) / fade;
          } else if (frame < ov.startFrame && frame >= ov.startFrame - fade) {
            opacity = 1 - (ov.startFrame - frame) / fade;
          }

          opacity = Math.max(0, Math.min(1, opacity));

          gsap.set(el, {
            opacity,
            y: (1 - opacity) * 20,
            pointerEvents: opacity > 0.5 ? "auto" : "none",
          });
        });
      };

      const updateSections = (progressFraction) => {
        Object.entries(sections).forEach(([zoneKey, items]) => {
          const refs = sectionItemRefs.current[zoneKey] || [];
          const slideDir = zoneKey === "left" ? 1 : zoneKey === "right" ? -1 : 0;
 
          items.forEach((item, i) => {
            const el = refs[i];
            if (!el) return;
            const fade = item.fade ?? 0.04;
            let t = 0;
 
            if (progressFraction >= item.start && progressFraction <= item.end) {
              t = 1;
            } else if (
              progressFraction > item.end &&
              progressFraction <= item.end + fade
            ) {
              t = 1 - (progressFraction - item.end) / fade;
            } else if (
              progressFraction < item.start &&
              progressFraction >= item.start - fade
            ) {
              t = 1 - (item.start - progressFraction) / fade;
            }
 
            t = Math.max(0, Math.min(1, t));
 
            if (slideDir !== 0) {
              const travel = item.travelPercent ?? 100;
              gsap.set(el, {
                opacity: t,
                xPercent: slideDir * travel * (1 - t),
                pointerEvents: t > 0.5 ? "auto" : "none",
              });
            } else {
              gsap.set(el, {
                opacity: t,
                y: (1 - t) * 16,
                pointerEvents: t > 0.5 ? "auto" : "none",
              });
            }
          });
        });
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${scrollHeight}`,
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const frame = self.progress * (totalFrames - 1);
          stateRef.current.frame = frame;
          drawFrame(Math.round(frame));
          updateOverlays(frame);
          updateSections(self.progress);
        },
      });

      drawFrame(0);
      updateOverlays(0);
      updateSections(0);
    }, wrapperRef);

    return () => ctx.revert();
  }, [ready, totalFrames, scrollHeight, overlays, sections, drawFrame]);

  return (
    <section className="w-full px-6 pt-10 ">
      <HeroTitle
        title={t(`wePassport.title`)}
        subtitle={t(`wePassport.subtitle`)}
      />
      <div ref={wrapperRef} className="relative w-full h-screen overflow-visible">
        {!ready && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black text-white">
            <div className="w-48">
              <div className="mb-2 text-sm text-center opacity-70">
                Cargando {Math.round(progress * 100)}%
              </div>
              <div className="h-1 bg-white/20 rounded overflow-visible">
                <div
                  className="h-full bg-white transition-all duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sección 1 - columna izquierda */}
        <div
          className="hidden md:block absolute overflow-visible text-black "
          style={{ bottom: "0%", left: "0%", right: "80%", top: "0%" }}
        >
          {sections.left.map((item, i) => (
            <div
              key={item.id ?? `left-${i}`}
              ref={(el) => (sectionItemRefs.current.left[i] = el)}
              className="absolute inset-0 flex flex-col justify-center px-6 opacity-0"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title ?? ""}
                  className="w-full object-cover rounded mb-4"
                  style={{ transform: "rotate(350deg)" }}
                />
              )}
              {item.title && <h3 className="text-2xl font-bold mb-2">{item.title}</h3>}
              {item.description && (
                <p className="text-sm opacity-80">{item.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Sección 2 - columna derecha */}
        <div
          className="hidden md:block absolute overflow-visible text-black"
          style={{ bottom: "0%", left: "80%", right: "0%", top: "0%" }}
        >
          {sections.right.map((item, i) => (
            <div
              key={item.id ?? `right-${i}`}
              ref={(el) => (sectionItemRefs.current.right[i] = el)}
              className="absolute inset-0 flex flex-col justify-center px-6 opacity-0"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title ?? ""}
                  className="w-full object-cover rounded mb-4"
                  style={{ transform: "rotate(10deg)" }}
                />
              )}
              {item.title && <h3 className="text-2xl font-bold mb-2">{item.title}</h3>}
              {item.description && (
                <p className="text-sm opacity-80">{item.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Sección 3 - franja superior */}
        <div
          className="absolute overflow-hidden text-black left-[4%] right-[4%] top-0 md:left-[20%] md:right-[20%]"
          style={{ bottom: "70%" }}
        >
          {sections.top.map((item, i) => (
            <div
              key={item.id ?? `top-${i}`}
              ref={(el) => (sectionItemRefs.current.top[i] = el)}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 md:px-6 opacity-0"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title ?? ""}
                  className="h-full max-h-full object-contain mb-2"
                />
              )}
              {item.title && (
                <h3 className="text-sm sm:text-lg md:text-3xl italic mb-1">"{t(item.title)}"</h3>
              )}
              {item.description && (
                <p className="text-xs md:text-sm flex font-bold justify-end w-full">{t(item.description)}</p>
              )}
            </div>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pt-[30%] px-[3%] md:pt-[12%] md:px-[7%]"
        />

        {overlays.map((ov, i) => (
          <div
            key={ov.id ?? i}
            ref={(el) => (overlayRefs.current[i] = el)}
            className={`absolute z-10 max-w-md opacity-0 pointer-events-none px-6 ${
              ov.className ?? "left-10 top-1/2 -translate-y-1/2"
            }`}
          >
            {ov.content}
          </div>
        ))}
      </div>
    </section>
  );
}