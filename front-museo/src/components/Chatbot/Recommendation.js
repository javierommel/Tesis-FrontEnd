import { useState, useCallback } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

import Lightbox from "react-awesome-lightbox";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullWindowComponent from "components/Utils/FullWindowComponent"

export default function Recommendation({ data, imageViewer }) {
  const inf = require('assets/img/visita360/escena3/hotSpot2/3.jpg')
  const imgSrc = `data:image/jpeg;base64,${data[5]}`
  const images = [
    `data:image/jpeg;base64,${data[5]}`,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const handle = useFullScreenHandle();
  const openImageViewer = useCallback((index) => {
    setCurrentImage(0);
    if (typeof imageViewer === 'function') {
      imageViewer(images);  // Llama a la función y pasa los datos necesarios
    } else {
      console.error('imageViewer is not a function');
    }
    //handleEnter();
  }, []);

  const closeImageViewer = () => {
    handleExit();
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const handleEnter = () => {
    handle.enter();
  }
  const handleExit = () => {
    handle.exit();
  }
  return (
    <Card className='img-chat'>
      <CardHeader className='header-chat'>
        <h5 className="text-white font-weight" style={{ paddingBottom: '0px' }}>
          {data && <span style={{ fontWeight: 'bold' }}>{data[0]}</span>}
        </h5>
        {data[5] &&
          <img alt="PICTU" onClick={() => openImageViewer(imgSrc)} src={`data:image/jpeg;base64,${data[5]}`} style={{
            width: '80px', cursor: 'pointer', border: 'double',
            borderColor: 'darkgrey'
          }} />
        }

        {isViewerOpen && (
          <FullWindowComponent>
            <Lightbox
              className="imagen-visita"
              image={images}
              onClose={closeImageViewer}
            />
          </FullWindowComponent>
        )}

      </CardHeader>
      <CardBody>
        <p className="text-chat text-white mt-4" >
          {data && <><span style={{ fontWeight: 'bold' }}>Autor:</span> {data[2]}<br /></>}
          {data && <><span style={{ fontWeight: 'bold' }}>Siglo:</span> {data[3]}<br /></>}
          {data && <><span style={{ fontWeight: 'bold' }}>Descripción:</span> {data[1]}</>}
        </p>
      </CardBody>
    </Card>
  );
};