import React, { useState, useEffect } from "react";
import ImageModal from './ImageModal';
import { useTranslation } from "react-i18next";
import { LUGARESNASA, LUGARESTOKIO, LUGARESCANADA, BENEFICIOS } from "../../constants/constantsPrograms";




const ModalGallery = ({ abierto, onClose, trip }) => {
    const lugares = trip === "nasa" ? LUGARESNASA : trip === "tokio" ? LUGARESTOKIO : LUGARESCANADA;
    const beneficios = trip === "nasa" ? BENEFICIOS + "Nasa/" : trip === "tokio" ? BENEFICIOS + "Tokio/" : BENEFICIOS + "Canada/";
    const { t } = useTranslation();
    const [tab, setTab] = useState("todas");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState("");
    const [modalAlt, setModalAlt] = useState("");

    const categorias = [
        { nombre: "Todas las fotos", key: "todas", imgs: [] },
        { nombre: "Hospedaje", key: "hospedaje", imgs: t(`travelVisits.${trip}.hospedaje`, { returnObjects: true }).map(img => beneficios + img) },
        ...(() => {
          // Obtenemos el arreglo de destinos desde la traducción
          const destinos = t(`travelVisits.${trip}.destinos`, { returnObjects: true });
          if (!Array.isArray(destinos)) return [];
          return destinos.map((destino, idx) => ({
            nombre: destino.title,
            key: destino.title,
            // imgs: destino.img,
            imgs: (() => {
              if (!Array.isArray(destino.img)) return [];
              return destino.img.map(img => lugares + img);
              })(),
          }));
        })(),
      ];

  
    const handleImgClick = (src, alt) => {
        setModalImg(src);
        setModalAlt(alt);
        setModalOpen(true);
        };
  // Desactivar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup: restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [abierto]);

  if (!abierto) return null;

  const fotosTodas = categorias.map(c => c.imgs).flat();

  const fotos = tab === "todas"
    ? fotosTodas
    : categorias.find(c => c.key === tab)?.imgs;

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace click en el backdrop, no en el contenido del modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
        <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={modalImg} alt={modalAlt} />
      <div className="bg-[#fafafa] rounded-2xl w-full max-w-6xl max-h-[95vh] min-h-[745px] shadow-2xl relative flex flex-col">
        {/* Header fijo */}
        <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-200">
          {/* Cerrar */}
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-lg font-bold z-10"
            onClick={onClose}
          >×</button>
          {/* Título */}
          <h2 className="text-2xl font-semibold mb-2 pr-12">{t("travelVisits.nasa.title")}</h2>
          {/* Tabs */}
          <div className="flex gap-3 mb-2 flex-wrap">
            {categorias.map(cat => (
              <button
                key={cat.key}
                onClick={() => setTab(cat.key)}
                className={`px-4 py-1 rounded-full border ${tab === cat.key ? "bg-black text-white" : "bg-white text-black"} transition`}
              >
                {cat.nombre} ({cat.key === "todas" ? fotosTodas.length : cat.imgs.length})
              </button>
            ))}
          </div>
          {/* <hr className="mb-4" /> */}
          {/* Subtítulo */}
          {/* <h3 className="text-xl font-medium">
            {categorias.find(c => c.key === tab)?.nombre}
          </h3> */}
        </div>
        
        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {/* Grid de imágenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fotos.map((src, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-gray-300 flex items-center justify-center overflow-hidden"
              >
                <img src={src} alt="" className="object-cover w-full h-full hover:scale-105 transition-all duration-300" 
                 onClick={() => handleImgClick(src, "Mapa antiguo de Tokio")}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
