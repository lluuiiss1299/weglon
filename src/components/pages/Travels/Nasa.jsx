import React from 'react';
import HeroImage from '../../Programas/HeroImage';
// import HeroNasa from '../../../assets/Images/HeroNasa.jpg';
// import HeroNasa from 'https://images.pixieset.com/84918549/fead465bfdb26a0c8cf16bae4b64e7e4-xxlarge.jpg';
import { useTranslation } from 'react-i18next';
import ShowImagesDetails from '../../Programas/ShowImagesDetails';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
    <HeroImage image="https://images.pixieset.com/84918549/fead465bfdb26a0c8cf16bae4b64e7e4-xxlarge.jpg" index={0} leftTitle="NASA" rightText={t('destinations.nasa.HeroText')} />
    <ShowImagesDetails />
    </>
  );
};

export default Home;
