import { useState, useEffect, useCallback } from 'react'
import ImageViewer from 'react-simple-image-viewer';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function ImageViewerChat({ data, onOut }) {
  const inf = require('assets/img/visita360/escena3/hotSpot2/3.jpg')
  const imgSrc = `data:image/jpeg;base64,${data}`
  const images = [
    `data:image/jpeg;base64,${data}`,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const handle = useFullScreenHandle();
  useEffect(() => {
    setCurrentImage(0);
    setIsViewerOpen(true);
    handleEnter();

  }, []);
  
  const closeImageViewer = () => {
    handleExit();
    setCurrentImage(0);
    setIsViewerOpen(false);
    onOut();
  };
  const handleEnter = () => {
    handle.enter();
  }
  const handleExit = () => {
    console.log("ffffff")
    handle.exit();
  }
  return (
        <FullScreen handle={handle}>
          {isViewerOpen && (<>
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
            <p>Prueba de texto</p></>
          )}
        </FullScreen>
  );
};