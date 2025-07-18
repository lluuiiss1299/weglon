import React from "react";
import Cenni from '../../assets/Images/Cenni.png';
import Oxford from '../../assets/Images/Oxford.png';
import Usicamm from '../../assets/Images/Usicamm.png';
import { useTranslation } from 'react-i18next';
import HeroTitle from './HeroTitle';    
import { Trans } from 'react-i18next';

const certifications = [
  {
    nombre: "CENNI",
    imagen: Cenni,
  },
  {
    nombre: "OXFORD",
    imagen: Oxford,
  },
  {
    nombre: "USICAMM",
    imagen: Usicamm,
  },
];

const Certifications = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full px-6 py-16 bg-white">
      <HeroTitle title={t('certifications.title')} subtitle={t('certifications.subtitle')} />
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex justify-between items-start px-12 mb-16 flex-wrap">
          <h2 className="text-5xl font-bold text-black">We-Certifications</h2>
          <p className="text-center text-base text-black max-w-sm">
            Certifica tu futuro con <br /> estándares internacionales.
          </p>
        </div> */}

        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-14 w-1/2">
          <Trans i18nKey="certifications.text" components={{ b: <b /> }} />
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="w-64 h-[400px] rounded-2xl bg-cover bg-center shadow-md"
              style={{ backgroundImage: `url(${cert.imagen})` }}
            >
              <div className="w-full h-full flex items-start p-4 bg-black/0 text-white font-bold text-2xl tracking-wide">
                {cert.nombre}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
