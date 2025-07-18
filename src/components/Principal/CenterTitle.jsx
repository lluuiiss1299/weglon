import React from 'react';

const CenterTitle = ({ title, subtitle }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl font-semibold">{title}</h2>
    <p className="text-gray-700 text-lg mt-2">
      {subtitle}
    </p>
  </div>
);

export default CenterTitle; 