import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ScrollDriven
 * Componente con un contenedor scrollable que muestra tarjetas apiladas (z-stack)
 * simulando profundidad: a medida que haces scroll, la tarjeta activa queda al frente
 * y las siguientes se escalan y se desplazan hacia atrás.
 */
const ScrollDriven = ({
  itemCount = 4,
  itemHeight = 120,
  stackOffsetY = 12,
  scaleStep = 0.04,
  containerHeight = 150,
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const items = useMemo(() => Array.from({ length: itemCount }, (_, i) => i + 1), [itemCount]);

  // Usamos rAF para evitar cálculos continuos en cada evento de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollTop(container.scrollTop);
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const step = itemHeight * 0.8; // cuánto scroll avanza por tarjeta "activa"
  const activeIndex = Math.max(0, Math.min(items.length - 1, Math.floor(scrollTop / step)));

  const getItemStyle = (index) => {
    const depth = Math.max(0, index - activeIndex); // 0 para activa y anteriores; >0 para siguientes
    const translateY = depth * stackOffsetY;
    const scale = Math.max(0.6, 1 - depth * scaleStep);
    const zIndex = 1000 - index; // las primeras encima
    const opacity = Math.max(0.35, 1 - depth * 0.08);

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm font-semibold text-gray-300">z-stack</div>
      <div
        ref={containerRef}
        className="relative w-full overflow-y-auto rounded-lg"
        style={{ height: containerHeight, background: "#1d1f27", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
      >
        <div className="relative" style={{ height: items.length * (itemHeight * 0.6) + containerHeight / 2 }}>
          {items.map((n, index) => (
            <div
              key={n}
              className="sticky px-3"
              style={{ top: 24 }}
            >
              <div
                style={getItemStyle(index)}
                className="relative w-full rounded-md"
              >
                <div
                  className="rounded-md"
                  style={{
                    height: itemHeight,
                    background: "#2a2d39",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="h-full w-full flex items-center px-5 text-gray-200 select-none">
                    {n}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs text-gray-400">Desplázate dentro del contenedor para ver el efecto</div>
    </div>
  );
};

export default ScrollDriven;


