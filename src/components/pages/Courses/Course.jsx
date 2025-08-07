import React from 'react';
import { useParams } from 'react-router-dom';
import HeroCourse from './HeroCourse';
import CourseImage from './CourseImg';

const Course = () => {
    const { course } = useParams();    
  return (
    <>
        <HeroCourse course={course} />
        <CourseImage/>     
    </>
  );
};

export default Course;