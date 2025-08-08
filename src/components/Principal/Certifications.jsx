import React from "react";
import { CERTIFICACIONES } from "../../constants/constantsPrograms.js";
import { useTranslation } from 'react-i18next';
import HeroTitle from './HeroTitle';    
import { Trans } from 'react-i18next';



const Certifications = () => {
  const { t } = useTranslation();
  const certifications = [
  {
    imagen: `${CERTIFICACIONES}Cenni.jpg`,
  },
  {
    imagen: `${CERTIFICACIONES}Usicamm.jpg`,
  },
  {
    imagen: `${CERTIFICACIONES}Oxford.jpg`,
  },
];
  return (
    <section className="w-full px-6 py-16 bg-white">
      <HeroTitle title={t('certifications.title')} subtitle={t('certifications.subtitle')} />
      <div className="max-w-7xl mx-auto">

        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-14 w-1/2 max-sm:w-full max-sm:mb-4">
          <Trans i18nKey="certifications.text" components={{ b: <b /> }} />
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href="/certificaciones/ingles-online"
              className="w-64 h-[400px] rounded-2xl bg-cover bg-center shadow-md block"
              style={{ backgroundImage: `url(${cert.imagen})` }}
            >
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
