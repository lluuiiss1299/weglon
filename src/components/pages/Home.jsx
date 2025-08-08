import React from 'react';
import VideoHero from '../Principal/VideoHero';
import CardCarousel from '../Principal/CardCarousel';
import Certifications from '../Principal/Certifications';
import Platform from '../Principal/Platform';
import CollageCarousel from '../Principal/CollageCarousel';
import ScrollDriven from '../Principal/ScrollDriven';

const Home = () => {
  return (
    <>
      <VideoHero />
      <CardCarousel />
      <Certifications />
      <Platform />
      <CollageCarousel />
      <ScrollDriven />
    </>
  );
};

export default Home;
