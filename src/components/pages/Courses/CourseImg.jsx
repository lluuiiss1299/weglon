import React from 'react';
import Toeic from '../../../assets/images/Toeic.png';

const CourseImg = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto my-12">
            <img src={Toeic} alt="Toeic" className="w-full h-full object-cover" />
        </div>
    </>
  );
};

export default CourseImg;