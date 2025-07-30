import React from 'react';
import HeroImage from '../../Programas/HeroImage';
import ShowImagesDetails from '../../Programas/ShowImagesDetails';
import BgVideo from '../../Programas/BgVideo';
import Gallery from '../../Programas/Gallery';
import CarruselCaracteristicas from '../../Programas/IncludeCards';
import WePassportAnimated from '../../Programas/WePassportAnimated';
import AgendaCita from '../../Programas/ContactHook';

const Home = () => {
  return (
    <>
    <HeroImage trip="tokio" index={1} />
    <ShowImagesDetails trip="tokio"/>
    <BgVideo trip="tokio"/>
    <Gallery trip="tokio"/>
    <CarruselCaracteristicas trip="tokio"/>
    <WePassportAnimated />  
    <AgendaCita />
    </>
  );
};

export default Home;
