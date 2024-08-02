import { useState, useCallback } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import ImageViewer from 'react-simple-image-viewer';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Recommendation({ data }) {
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
    setIsViewerOpen(true);
    handleEnter();
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
        <FullScreen handle={handle}>
          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </FullScreen>
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