import React from "react";

const ImageModal = ({ isOpen, onClose, imgSrc, alt }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full p-4 flex justify-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/50 rounded-full px-3 py-1 hover:bg-black/80 transition-colors"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <img
          src={imgSrc}
          alt={alt || "Imagen en grande"}
          className="rounded-2xl max-h-[80vh] object-contain shadow-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal; 