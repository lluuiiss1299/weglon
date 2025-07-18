import React from 'react';
import HeroImage from '../../Programas/HeroImage';
import HeroNasa from '../../../assets/Images/HeroNasa.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
    <HeroImage image={HeroNasa} index={0} leftTitle="NASA" rightText={t('destinations.nasa.HeroText')} />
    </>
  );
};

export default Home;
