import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Estilos para los efectos hover dinámicos
const hoverStyles = `
  .course-link:hover {
    background-color: var(--hover-bg-color) !important;
    color: var(--hover-text-color) !important;
  }
  .course-link:hover svg {
    stroke: var(--hover-text-color) !important;
  }
`;  


const CoursesList = () => {
  const { t } = useTranslation();
  const languages = Object.values(t('courses.language', { returnObjects: true }));
  
  // Estado para controlar qué idiomas están abiertos (solo el primero por defecto)
  const [openLanguages, setOpenLanguages] = useState(() => {
    const initialState = {};
    languages.forEach((_, index) => {
      initialState[index] = index === 0; // Solo el primer idioma abierto
    });
    return initialState;
  });
  
  // Estados para las alturas de cada idioma
  const [heights, setHeights] = useState(() => {
    const initialHeights = {};
    languages.forEach((_, index) => {
      initialHeights[index] = index === 0 ? "auto" : "0px";
    });
    return initialHeights;
  });
  
  const contentRefs = useRef({});

  // Maneja apertura/cierre lento para un idioma específico
  const toggle = (index) => {
    const isOpen = openLanguages[index];
    
    if (isOpen) {
      // Cierra: primero setea la altura real, luego a 0
      setHeights(prev => ({
        ...prev,
        [index]: `${contentRefs.current[index]?.scrollHeight}px`
      }));
      setTimeout(() => {
        setHeights(prev => ({
          ...prev,
          [index]: "0px"
        }));
      }, 10);
      setTimeout(() => {
        setOpenLanguages(prev => ({
          ...prev,
          [index]: false
        }));
      }, 600);
    } else {
      // Abre
      setOpenLanguages(prev => ({
        ...prev,
        [index]: true
      }));
      setTimeout(() => {
        setHeights(prev => ({
          ...prev,
          [index]: `${contentRefs.current[index]?.scrollHeight}px`
        }));
      }, 10);
      setTimeout(() => {
        setHeights(prev => ({
          ...prev,
          [index]: "auto"
        }));
      }, 600);
    }
  };

  return (
    <>
      <style>{hoverStyles}</style>
      <div className="max-w-5xl mx-auto my-8">
        {languages.map((item, idx) => (
          <div key={idx} className="mb-8">
      <div
        className="flex items-center justify-between pb-1 select-none"
        onClick={() => toggle(idx)}
        style={{ cursor: "pointer" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: item.headerColor }}>
          {item.title}
        </h2>
        <svg
          className={`w-8 h-8 transition-transform duration-200 ${openLanguages[idx] ? "rotate-0" : "-rotate-90"}`}
          stroke="#bdbdbd"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="h-1 w-full mb-5" style={{ backgroundColor: item.hrColor }} />

      <div
        ref={(el) => contentRefs.current[idx] = el}
        style={{
          overflow: "hidden",
          transition: "height 0.6s cubic-bezier(.77,0,.18,1), opacity 0.6s cubic-bezier(.77,0,.18,1)",
          height: heights[idx],
          opacity: openLanguages[idx] ? 1 : 0,
        }}
      >
        <div className="space-y-6 pt-1 pb-2">
          {item.courses.map((curso, idx) => (
            <Link
              to={curso.link}
              key={curso.name}
              className="course-link flex items-center justify-between px-8 py-6 bg-[#f5f5f5] rounded-full 
              font-bold text-2xl md:text-3xl transition-all duration-200 group "
              style={{ 
                color: item.textColor,
                boxShadow: `0 0 0 0 ${item.hrColor}`,
                '--hover-bg-color': item.bgHover,
                '--hover-text-color': item.headerColor
              }}
            >
              <span>{curso.name}</span>
              <span className="flex items-center">
                <svg
                  className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ stroke: item.textColor }}
                >
                  <path d="M10 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg
                  className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2 group-hover:scale-110 -ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ stroke: item.textColor }}
                >
                  <path d="M10 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
      </div>
      ))}
      </div>
    </>
  );
};

export default CoursesList;
