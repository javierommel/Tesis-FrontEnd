import React from 'react';
import '../../assets/css/FullScreenComponent.css'; // Asegúrate de crear el archivo CSS correspondiente

const FullScreenComponent = ({ children }) => {
  return (
    <div className="full-screen-content">
      {children}
    </div>
  );
};

export default FullScreenComponent;