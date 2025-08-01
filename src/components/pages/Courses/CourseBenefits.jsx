import React from "react";
import checkDot from '../../../assets/Icons/CheckDot.svg';
import { useTranslation } from 'react-i18next';

const CaracteristicasCursos = () => {
  const { t } = useTranslation();
  const caracteristicasCol1 = [
    t('courses.benefit1'),
    t('courses.benefit2'),
    t('courses.benefit3'),
    t('courses.benefit4'),
    t('courses.benefit5'),
];
const caracteristicasCol2 = [
    t('courses.benefit6'),
    t('courses.benefit7'),
    t('courses.benefit8'),
    t('courses.benefit9'),
];

  return(
    <section className="w-full max-w-6xl mx-auto py-20 px-2 md:px-8">
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 leading-tight">
    {t('courses.title')}
    </h2>
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
      {/* Columna 1 */}
      <ul className="flex-1 flex flex-col gap-10">
        {caracteristicasCol1.map((texto, idx) => (
          <li key={idx} className="flex items-center gap-6">
            <img src={checkDot} alt="checkDot" className="w-16 h-16" />
            <span className="text-xl md:text-2xl">{texto}</span>
          </li>
        ))}
      </ul>
      {/* Columna 2 */}
      <ul className="flex-1 flex flex-col gap-10">
        {caracteristicasCol2.map((texto, idx) => (
          <li key={idx} className="flex items-center gap-6">
            <img src={checkDot} alt="checkDot" className="w-16 h-16" />
            <span className="text-xl md:text-2xl">{texto}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
  )
};

export default CaracteristicasCursos;
