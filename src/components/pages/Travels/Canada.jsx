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
    <HeroImage trip="canada" index={1} />
    <ShowImagesDetails trip="canada"/>
    <BgVideo trip="canada"/>
    <Gallery trip="canada"/>
    <CarruselCaracteristicas trip="canada"/>
    <WePassportAnimated />  
    <AgendaCita />
    </>
  );
};

export default Home;
