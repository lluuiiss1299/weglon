import React from "react";
import { useTranslation } from "react-i18next";
import { CERTIFICACIONES } from "../../../constants/constantsPrograms";

const HeroCourse = ( { course } ) => {

    const { t } = useTranslation();
    const datos = t("coursesData", { returnObjects: true });
    const courseData = datos[course];
    if (!courseData) return <div>Ruta no encontrada.</div>;

  return (
    <section className="w-full min-h-[580px] bg-gradient-to-tr from-[#4B51CF] to-[#A6EFFF] p-10 flex flex-col md:flex-row gap-8 md:gap-0 items-center shadow-lg justify-center">
    {/* Columna izquierda */}
    <div className="flex-1 flex flex-col justify-center h-full max-w-[540px]">
      <div>
        <span className="inline-block bg-[#065BAA] text-white font-bold px-4 py-2 rounded-lg text-lg mb-2">
          {datos.badge}
        </span>
      </div>
      <h1 className="font-extrabold text-5xl md:text-6xl text-white mt-2 mb-2 tracking-tight drop-shadow-md">
        {courseData.title}
      </h1>
      <p className="text-white mb-8 text-base md:text-lg max-w-[420px]">
        {datos.description}
      </p>
      <div className="flex flex-row items-center gap-6 mb-8">
        <a
          href="/plataformas/cursos"
          className="bg-white text-[#242b33] font-bold px-8 py-2 rounded-xl text-lg shadow-sm border border-white hover:bg-[#d3eafd] transition"
        >
          &#8592; {datos.back}
        </a>
        <a
          href="/contacto"
          className="border-2 border-white text-white px-8 py-2 rounded-xl text-lg font-bold bg-transparent hover:bg-white hover:text-[#1792cf] transition"
        >
          {datos.button}
        </a>
      </div>
      {/* Avatares y stats */}
      <div className="flex items-center gap-4 mt-3">
        {/* Avatares */}
        <div className="flex -space-x-3">
          {/* Sustituye por tus imágenes */}
          <img src={datos.studentImage1} className="w-12 h-12 rounded-full  object-cover" alt="Avatar" />
          <img src={datos.studentImage2} className="w-12 h-12 rounded-full object-cover" alt="Avatar" />
          <div className="w-12 h-12 bg-white text-[#065BAA] font-bold rounded-full flex items-center justify-center text-base">1000+</div>
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-tight">{datos.students}</p>    
          <span className="text-white/70 text-xs">{datos.studentsDescription}</span>
        </div>
      </div>
    </div>

    {/* Columna derecha */}
    <div className="flex-1 flex flex-row w-full md:w-[540px] h-[500px] max-w-[540px]">
        <div className="flex flex-col w-1/2 h-full items-center justify-center relative">
            <img
                src="https://weglon-assets-prod.s3.us-east-1.amazonaws.com/Images/Certificaciones/CentroCertificador.jpg"
                className="rounded-3xl w-full h-[350px] object-cover p-2"
                alt="Estudiante"
            />
            <span className="mt-[200px] mr-[120px] text-black text-sm bg-[#F4F5FF] rounded-full px-2 pt-8 absolute w-24 h-24 text-center" dangerouslySetInnerHTML={{ __html: datos.duration }}></span>
        </div>
        <div className="flex flex-col w-1/2 h-full justify-center gap-2">
            <img
                src={CERTIFICACIONES + courseData.image}
                className="rounded-3xl w-full h-[350px]  p-2"
                alt="Estudiante"
            />
            <img
                src="https://weglon-assets-prod.s3.us-east-1.amazonaws.com/Images/Certificaciones/HeroCertificaciones.webp"
                className="rounded-3xl w-full h-[150px] object-cover p-2"
                alt="Estudiante"
            />
            <span className="mb-[30px] ml-[150px] text-black text-sm bg-[#F4F5FF] rounded-full px-2 pt-8 absolute w-24 h-24 text-center" dangerouslySetInnerHTML={{ __html: datos.validity }}></span>

        </div>
      </div> 
  </section>
);
};

export default HeroCourse;
