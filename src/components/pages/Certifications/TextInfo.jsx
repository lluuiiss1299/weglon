import React from "react";

const TextInfo = ({ titulo, texto }) => (
  <section className="w-full flex flex-col md:flex-row items-center justify-center mt-16">
    <div className="flex-1 max-w-5xl text-center md:text-center px-4">
      <h2 className="text-4xl font-bold mb-8 leading-tight">
        {titulo}
      </h2>
      <p className="mb-12 text-xl font-normal leading-snug">
        {texto}
      </p>
    </div>
  </section>
);

export default TextInfo;