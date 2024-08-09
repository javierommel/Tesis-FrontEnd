import React, { useState, useEffect, useRef } from 'react';
import ImageZoom from 'react-image-zoom';
import classnames from "classnames";
import { Card, CardHeader, CardBody, TabContent, TabPane, NavLink, NavItem, Nav } from 'reactstrap'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullScreenComponent from 'components/Utils/FullWindowComponent';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";


const CustomImageVideoViewer = ({ nombres, images, videos, textos, titulo, toggle, isfull1, yaw1 }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [showZoom, setShowZoom] = useState(false);
    const [inImage, setInImage] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [numeropaginas, setNumeroPaginas] = useState(1);
    const [iconTabs, setIconsTabs] = React.useState(1);
    const cerrar = require('assets/img/visita360/cerrar.png')
    const information = require('assets/img/visita360/information.png')
    const next = require('assets/img/visita360/next.png')
    const zoom = require('assets/img/visita360/zoom.png')
    const [isFullscreen2, setIsFullscreen2] = useState(true);
    const handle2 = useFullScreenHandle();
    const inputRef = useRef();
    useEffect(() => {
        setNumeroPaginas(textos.length)
        handle2.enter()
        setInImage(true)
    }, []);
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };
    const toggleZoom = () => {
        setShowZoom(!showZoom);
    };
    const goToNextItem = () => {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % (images.length + videos.length));
    };
    const goBackItem = () => {
        setCurrentItemIndex((prevIndex) => {
            const totalItems = images.length + videos.length;
            return (prevIndex - 1 + totalItems) % totalItems;
        });
    };
    const currentItem = currentItemIndex < images.length ? images[currentItemIndex] : videos[currentItemIndex - images.length];

    const handleFullscreenChange = (isFullscreen2) => {
        if (inImage && !isFullscreen2) toggle();
        setIsFullscreen2(isFullscreen2);
    };

    const handleExit = () => {
        //handle2.exit();
        toggle(isfull1, yaw1);
    }

    return (
        <div>
            <FullScreenComponent>
                <div className="image-viewer-container" >
                    <div className={`movable-container ${showDescription ? 'moved-container' : ''}`}>
                        {currentItemIndex < images.length ? (
                            showZoom ?
                                (<Lightbox
                                    className="imagen-visita"
                                    image={currentItem}
                                    onClose={toggleZoom}
                                />) :
                                (
                                    <img
                                        className="imagen-visita"
                                        src={currentItem}
                                        alt="..."
                                    />

                                )
                        ) : (
                            <video
                                src={currentItem}
                                width="100%"
                                height="100%"
                                autoPlay
                                loop
                                controls />
                        )}
                        
                        {nombres[currentItemIndex] && (
                            <div className='container-subtitulo-imagen'>
                                <hr className="line-success linea-descripcion" />
                                <h3 className="subtitulo-imagen">{nombres[currentItemIndex]}</h3>
                            </div>
                        )}
                    </div>
                    {!showDescription && <img className="close-button" src={cerrar} ref={inputRef} onClick={handleExit} alt="Imagen" />}
                    <div className={`description-piece ${showDescription ? 'visible' : 'hidden'}`}>
                        <Card>
                            <CardHeader style={{padding:"5px 15px 0"}}>
                                <Nav className="nav-tabs-info nav-museo" role="tablist" tabs>
                                    <NavItem>
                                        <NavLink
                                            className= {classnames({
                                                'nav-description': true,
                                                active: iconTabs === 1,                                               
                                            })}
                                            onClick={(e) => setIconsTabs(1)}
                                            href="#pablo"
                                            style={{padding:"5px 9px", borderRadius:"20px", fontSize:"x-small"}}
                                        >
                                            1
                                        </NavLink>
                                    </NavItem>
                                    {numeropaginas >= 2 &&
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    'nav-description': true,
                                                    active: iconTabs === 2,
                                                })}
                                                onClick={(e) => setIconsTabs(2)}
                                                href="#pablo"
                                                style={{padding:"5px 9px", borderRadius:"20px", fontSize:"x-small"}}
                                            >
                                                2
                                            </NavLink>
                                        </NavItem>}
                                    {numeropaginas >= 3 &&
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    'nav-description': true,
                                                    active: iconTabs === 3,
                                                })}
                                                onClick={(e) => setIconsTabs(3)}
                                                href="#pablo"
                                                style={{padding:"5px 9px", borderRadius:"20px", fontSize:"x-small"}}
                                            >
                                                3
                                            </NavLink>
                                        </NavItem>}
                                </Nav>
                                <img className="close-button-description" src={cerrar} onClick={toggleDescription} alt="Imagen" />
                            </CardHeader>
                            <CardBody style={{padding:"0px 10px"}}>
                                <TabContent className="tab-space" activeTab={"link" + iconTabs} style={{padding:"0px 0 50px 0px"}}>
                                    <TabPane tabId="link1">
                                        <h3 className='title-visita'>{titulo}</h3>
                                        <p>{textos[0]}</p>
                                    </TabPane>
                                    {numeropaginas >= 2 &&
                                        <TabPane tabId="link2">
                                            <p>{textos[1]}</p>
                                        </TabPane>}
                                    {numeropaginas >= 3 &&
                                        <TabPane tabId="link3">
                                            <p>{textos[2]}</p>
                                        </TabPane>}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </div>

                    <button className={showDescription ? "toggle-description-active" : "toggle-description"} onClick={toggleDescription}>
                        <img className="image-description" src={information} alt="..." />
                        <div className="tooltip-description"><p>Mostrar Historia</p></div>
                    </button>
                    {currentItemIndex < images.length &&
                        <button className={showZoom ? "toggle-zoom-active" : "toggle-zoom"} onClick={toggleZoom} disabled={showDescription}>
                            <img className="image-zoom" src={zoom} alt="..." />
                            <div className="tooltip-zoom"><p>Hacer Zoom</p></div>
                        </button>
                    }
                    {!showDescription &&
                        <button className="prev-image" onClick={goBackItem}>
                            <img src={next} alt="..." />
                        </button>
                    }
                    {!showDescription &&
                        <button className="next-image" onClick={goToNextItem}><span aria-hidden={true}>
                            <img src={next} alt="..." />
                        </span></button>
                    }

                </div>
            </FullScreenComponent>
        </div>
    );
};

export default CustomImageVideoViewer;
