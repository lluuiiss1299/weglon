import React from 'react';


const HeroTitle = ({ title, subtitle }) => {
  return (
    <>
      <div className='mx-auto max-w-7xl px-12 pt-12 pb-24 flex flex-row justify-between items-center flex-wrap max-sm:px-2'>
        <h1 className="text-5xl font-bold text-center mt-6 max-sm:w-full max-sm:mb-4">{title}</h1>
        <p className="text-center text-lg mt-4 w-1/3 max-sm:w-full">
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default HeroTitle; 