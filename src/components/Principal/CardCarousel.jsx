import React from "react";
import { Link } from "react-router-dom";

const destinos = [
  { nombre: "NASA", ruta: "/programas/nasa", imagen: "/images/nasa.jpg" },
  { nombre: "TOKYO", ruta: "/programas/tokyo", imagen: "/images/tokyo.jpg" },
  { nombre: "CANADA", ruta: "/programas/canada", imagen: "/images/canada.jpg" },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: "/images/italia.jpg" },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: "/images/italia.jpg" },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: "/images/italia.jpg" },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: "/images/italia.jpg" },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: "/images/italia.jpg" },
];

const Carousel = () => {
  return (
    <section className="w-full px-6 py-10 bg-white">
      <h2 className="text-center text-lg font-medium text-gray-700 mb-6">
        Viaja al extranjero, diviértete, estudia, conecta con nuevas culturas, haz amigos, y vive experiencias únicas
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {destinos.map((destino, index) => (
          <Link
            key={index}
            to={destino.ruta}
            className="flex-shrink-0 w-60 h-[400px] bg-cover bg-center rounded-2xl shadow-md relative"
            style={{
              backgroundImage: `url(${destino.imagen})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-center items-center p-4 text-white text-center">
              <span className="text-sm font-semibold tracking-widest">WE-EXPERIENCE</span>
              <span className="text-3xl font-bold mt-2">{destino.nombre}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
