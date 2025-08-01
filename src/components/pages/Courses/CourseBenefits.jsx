import React from "react";
import checkDot from '../../../assets/Icons/CheckDot.svg';

const caracteristicasCol1 = [
  "Test diagnóstico inicial.",
  "Simulacros de examen, ejercicios y hojas de repaso.",
  "Formación oral con videos.",
  "Artículos, flashcards, coaching y más.",
  "Ruta de estudio adaptada a tus objetivos.",
];
const caracteristicasCol2 = [
  "Accesibilidad totalmente online.",
  "Ruta personalizada según examen y fecha.",
  "Feedback detallado y estadísticas.",
  "Tiempo de entrenamiento: 3 y 6 meses.",
];

const CaracteristicasCursos = () => (
  <section className="w-full max-w-6xl mx-auto py-10 px-2 md:px-8">
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 leading-tight">
      Plataformas de entrenamiento para <br />
      certificarte en el idioma de tu preferencia
    </h2>
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
      {/* Columna 1 */}
      <ul className="flex-1 flex flex-col gap-8">
        {caracteristicasCol1.map((texto, idx) => (
          <li key={idx} className="flex items-center gap-6">
            <img src={checkDot} alt="checkDot" className="w-16 h-16" />
            <span className="text-xl md:text-2xl">{texto}</span>
          </li>
        ))}
      </ul>
      {/* Columna 2 */}
      <ul className="flex-1 flex flex-col gap-8">
        {caracteristicasCol2.map((texto, idx) => (
          <li key={idx} className="flex items-center gap-6">
            <img src={checkDot} alt="checkDot" className="w-16 h-16" />
            <span className="text-xl md:text-2xl">{texto}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CaracteristicasCursos;
