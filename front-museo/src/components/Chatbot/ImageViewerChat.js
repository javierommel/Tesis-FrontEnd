import { useState, useEffect } from 'react'
import Lightbox from "react-awesome-lightbox";


export default function ImageViewerChat({ data, onOut }) {
  const imgSrc = `data:image/jpeg;base64,${data}`
  const images = [
    `data:image/jpeg;base64,${data}`,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    setCurrentImage(0);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    onOut();
  };
  return (<>
    <Lightbox
      className="imagen-visita"
      image={data}
      onClose={closeImageViewer}
    />
  </>
  );
};