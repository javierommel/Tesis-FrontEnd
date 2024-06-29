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
  const imgSrc = "https://coolsms-storage-test.s3.ap-northeast-2.amazonaws.com/19013037529548/Hos4N.png"
  const images = [
    require('assets/img/visita360/escena3/hotSpot2/3.jpg'),
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
    console.log("ffffff")
    handle.exit();
  }
  return (
    <Card className='img-chat'>
      <CardHeader className='header-chat'>
        <h5 className="text-white font-weight" style={{ paddingBottom: '0px' }}>
          {data && data[0]}
        </h5>
        <img alt="PICTU" onClick={() => openImageViewer(imgSrc)} src={inf} style={{ width: '80px', cursor: 'pointer', border: 'double',
    borderColor: 'darkgrey'}} />
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
          {data && data[1]}
        </p>
      </CardBody>
    </Card>
  );
};