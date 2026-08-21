import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollSequence
 * ---------------
 * Dibuja una secuencia de imágenes en un <canvas> sincronizada con el scroll
 * (GSAP ScrollTrigger, pin + scrub), muestra overlays de texto sobre el canvas
 * y, detrás del canvas, "escenas" (imagen + texto por país) con un efecto de
 * profundidad tipo carrusel: entran desde atrás (chicas, borrosas) y quedan
 * al frente (foco, tamaño real) mientras dura su rango de frames.
 *
 * IMPORTANTE: para que las escenas se vean, los frames del canvas en esos
 * rangos deben tener zonas transparentes (alpha) — si tus webp son opacos de
 * borde a borde no habrá nada de fondo que mostrar.
 *
 * Uso:
 * <ScrollSequence
 *   frameCount={100}
 *   basePath="/frames"      // public/frames/1.webp ... 100.webp
 *   ext="webp"
 *   scrollHeight={4000}     // px de scroll que dura toda la secuencia
 *   overlays={[
 *     {
 *       startFrame: 5,
 *       endFrame: 25,
 *       fade: 8,             // frames de transición para el fade in/out
 *       className: "left-10 top-1/3",
 *       content: (
 *         <h2 className="text-4xl font-bold text-white">Primer momento</h2>
 *       ),
 *     },
 *   ]}
 *   scenes={[
 *     {
 *       startFrame: 20,
 *       endFrame: 35,
 *       fade: 15,             // frames de transición de profundidad
 *       farScale: 0.88,       // qué tan "atrás" arranca/termina (0-1)
 *       depthBlur: true,
 *       image: "/countries/japan.jpg",
 *       title: "Japón",
 *       description: "Un recorrido por sus templos y ciudades.",
 *       textClassName: "left-16 bottom-24",
 *     },
 *     {
 *       startFrame: 50,
 *       endFrame: 65,
 *       image: "/countries/peru.jpg",
 *       title: "Perú",
 *       description: "Machu Picchu y la cordillera andina.",
 *       textClassName: "right-16 bottom-24 text-right",
 *     },
 *   ]}
 * />
 */
export default function ScrollSequence({
  frameCount = 100,
  basePath = "../../assets/Images/Wepassport/",
  ext = "webp",
  padFrames = false, // true si tus archivos son 001,002... en vez de 1,2...
  padLength = 3,
  scrollHeight = 4000,
  overlays = [],
  scenes = [],
  onReady,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRefs = useRef([]);
  const sceneRefs = useRef([]);
  const imagesRef = useRef([]);
  const stateRef = useRef({ frame: 0 });
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const frameUrl = useCallback(
    (index) => {
      const n = index + 1; // frames van de 1 a frameCount
      const num = padFrames ? String(n).padStart(padLength, "0") : String(n);
      return `${basePath}/WPP${num}.${ext}`;
    },
    [basePath, ext, padFrames, padLength]
  );

  // --- Precarga de las 100 imágenes ---
  useEffect(() => {
    let cancelled = false;
    const images = new Array(frameCount);
    let loaded = 0;

    const handleLoad = () => {
      loaded += 1;
      if (!cancelled) setProgress(loaded / frameCount);
      if (loaded === frameCount && !cancelled) {
        imagesRef.current = images;
        setReady(true);
        onReady?.();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = handleLoad;
      img.onerror = handleLoad; // no bloquear todo por una imagen rota
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [frameCount, frameUrl, onReady]);

  // --- Dibuja un frame en el canvas simulando object-fit: cover ---
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

  // --- Ajusta la resolución real del canvas al tamaño del contenedor ---
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

  // --- ScrollTrigger: pin de la sección + scrub del frame + overlays ---
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

      // t = 0 -> escena "atrás" (chica, borrosa, transparente)
      // t = 1 -> escena "al frente" (tamaño real, foco, opaca)
      const updateScenes = (frame) => {
        scenes.forEach((sc, i) => {
          const el = sceneRefs.current[i];
          if (!el) return;
          const fade = sc.fade ?? 15;
          let t = 0;

          if (frame >= sc.startFrame && frame <= sc.endFrame) {
            t = 1;
          } else if (frame > sc.endFrame && frame <= sc.endFrame + fade) {
            t = 1 - (frame - sc.endFrame) / fade;
          } else if (frame < sc.startFrame && frame >= sc.startFrame - fade) {
            t = 1 - (sc.startFrame - frame) / fade;
          }

          t = Math.max(0, Math.min(1, t));

          const farScale = sc.farScale ?? 0.88;
          const scale = gsap.utils.interpolate(farScale, 1, t);
          const blur = sc.depthBlur === false ? 0 : (1 - t) * 6;

          gsap.set(el, {
            opacity: t,
            scale,
            filter: blur ? `blur(${blur.toFixed(1)}px)` : "none",
            zIndex: i, // las escenas posteriores quedan "más adelante" al cruzarse
            pointerEvents: t > 0.5 ? "auto" : "none",
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
          const frame = self.progress * (frameCount - 1);
          stateRef.current.frame = frame;
          drawFrame(Math.round(frame));
          updateOverlays(frame);
          updateScenes(frame);
        },
      });

      // primer frame visible al montar
      drawFrame(0);
      updateOverlays(0);
      updateScenes(0);
    }, wrapperRef);

    return () => ctx.revert();
  }, [ready, frameCount, scrollHeight, overlays, scenes, drawFrame]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {!ready && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black text-white">
          <div className="w-48">
            <div className="mb-2 text-sm text-center opacity-70">
              Cargando {Math.round(progress * 100)}%
            </div>
            <div className="h-1 bg-white/20 rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Escenas de países: detrás del canvas, efecto de profundidad */}
      {scenes.map((sc, i) => (
        <div
          key={sc.id ?? `scene-${i}`}
          ref={(el) => (sceneRefs.current[i] = el)}
          className="absolute inset-0 opacity-0"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {sc.image && (
            <img
              src={sc.image}
              alt={sc.title ?? ""}
              className={`absolute inset-0 w-full h-full object-cover ${
                sc.imageClassName ?? ""
              }`}
            />
          )}
          {(sc.title || sc.description) && (
            <div
              className={`absolute z-10 max-w-lg px-10 text-white ${
                sc.textClassName ?? "left-16 bottom-24"
              }`}
            >
              {sc.title && (
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                  {sc.title}
                </h2>
              )}
              {sc.description && (
                <p className="text-base md:text-lg opacity-80">
                  {sc.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20"
      />

      {overlays.map((ov, i) => (
        <div
          key={ov.id ?? i}
          ref={(el) => (overlayRefs.current[i] = el)}
          className={`absolute z-30 max-w-md opacity-0 pointer-events-none px-6 ${
            ov.className ?? "left-10 top-1/2 -translate-y-1/2"
          }`}
        >
          {ov.content}
        </div>
      ))}
    </div>
  );
}