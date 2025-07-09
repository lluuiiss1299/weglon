import React from "react";
import { Link } from "react-router-dom";
import cardNasa from '../../assets/Images/CardNasa.png';
import cardTokio from '../../assets/Images/CardTokio.png';
import cardCanada from '../../assets/Images/CardCanada.png';
import cardItaly from '../../assets/Images/CardItaly.png';

const destinos = [
  { nombre: "NASA", ruta: "/programas/nasa", imagen: cardNasa },
  { nombre: "TOKYO", ruta: "/programas/tokyo", imagen: cardTokio },
  { nombre: "CANADA", ruta: "/programas/canada", imagen: cardCanada },
  { nombre: "ITALIA", ruta: "/programas/italia", imagen: cardItaly },
];

const Carousel = () => {
  return (
    <section className="w-full px-6 pt-10 pb-24 bg-gray-100">
      <h2 className="text-center text-lg font-medium text-gray-700 mb-12">
        Viaja al extranjero, diviértete, estudia, conecta con nuevas<br /> culturas, haz amigos, y vive experiencias únicas.
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide items-center flex-row justify-center items-center">
        {destinos.map((destino, index) => (
          <Link
            key={index}
            to={destino.ruta}
            className="flex-shrink-0 w-60 h-[400px] bg-cover bg-center rounded-2xl shadow-md relative"
            style={{
              backgroundImage: `url(${destino.imagen})`,
            }}
          >
            {/* <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-center items-center p-4 text-white text-center">
              <span className="text-sm font-semibold tracking-widest">WE-EXPERIENCE</span>
              <span className="text-3xl font-bold mt-2">{destino.nombre}</span>
            </div> */}
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Carousel;
