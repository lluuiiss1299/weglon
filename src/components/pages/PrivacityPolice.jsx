import React from 'react';
import { BASEIMAGE } from '../../constants/constantsPrograms';

const PrivacityPolice = () => {
  return (
    <>
        <div className="w-full h-[130vh] bg-white flex flex-col items-center justify-start my-8">
            <img src={BASEIMAGE+"PrivacityImage.webp"} alt="Privacidad" className="w-2/3 h-full " />
        </div>
    </>
  );
};

export default PrivacityPolice;