import React, { useState, useEffect } from 'react';
import ImageZoom from 'react-image-zoom';
import classnames from "classnames";
import { Card, CardHeader, CardBody, TabContent, TabPane, NavLink, NavItem, Nav } from 'reactstrap'
import { FullScreen, useFullScreenHandle } from "react-full-screen";


const CustomImageVideoViewer = ({ images, videos, toggle }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [showZoom, setShowZoom] = useState(false);
    const [inImage, setInImage] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [iconTabs, setIconsTabs] = React.useState(1);
    const cerrar = require('assets/img/visita360/cerrar.png')
    const information = require('assets/img/visita360/information.png')
    const next = require('assets/img/visita360/next.png')
    const zoom = require('assets/img/visita360/zoom.png')
    const [isFullscreen, setIsFullscreen] = useState(true);
    const handle = useFullScreenHandle();
    useEffect(() => {
        handle.enter()
        setInImage(true)
        document.addEventListener('keydown', handleKeyDown);
        // Es importante remover el event listener al desmontar el componente
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
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

    const currentItem = currentItemIndex < images.length ? images[currentItemIndex] : videos[currentItemIndex - images.length];
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            console.log("aefasd")
            setIsFullscreen(isFullscreen);
            toggle();
        }
    };
    const handleFullscreenChange = (isFullscreen) => {
        console.log("full: ", isFullscreen + " : " + inImage);
        if (inImage && !isFullscreen) toggle();
        setIsFullscreen(isFullscreen);


    };
    return (
        <FullScreen handle={handle} onChange={handleFullscreenChange}>
            <div className="image-viewer-container">
                {/* Renderizar imagen o video actual */}
                {currentItemIndex < images.length ? (
                    showZoom ?
                        (<ImageZoom
                            className="imagen-visita-zoom"
                            img={currentItem}
                            zoomPosition="original"
                            offset={{ vertical: 0, horizontal: 1 }}
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
                        autoplay
                        loop
                        controls />
                )}
                {!showDescription && <img className="close-button" src={cerrar} onClick={toggle} alt="Imagen" />}
                {showDescription && <div className="description-piece">
                    <Card>
                        <CardHeader>
                            <Nav className="nav-tabs-info nav-museo" role="tablist" tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: iconTabs === 1,
                                        })}
                                        onClick={(e) => setIconsTabs(1)}
                                        href="#pablo"
                                    >
                                        1
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: iconTabs === 2,
                                        })}
                                        onClick={(e) => setIconsTabs(2)}
                                        href="#pablo"
                                    >
                                        2
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: iconTabs === 3,
                                        })}
                                        onClick={(e) => setIconsTabs(3)}
                                        href="#pablo"
                                    >
                                        3
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <img className="close-button-description" src={cerrar} onClick={toggleDescription} alt="Imagen" />
                        </CardHeader>
                        <CardBody>
                            <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                                <TabPane tabId="link1">
                                    <h3 className='title-visita'>Virgen de la Merced</h3>
                                    <p> Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate B2C
                                        users after installed base benefits. <br />
                                        <br />
                                        Dramatically visualize customer directed convergence
                                        without revolutionary ROI.
                                    </p>
                                </TabPane>
                                <TabPane tabId="link2">
                                    <p>
                                        Completely synergize resource taxing relationships via
                                        premier niche markets. Professionally cultivate one-to-one
                                        customer service with robust ideas. <br />
                                        <br />
                                        Dynamically innovate resource-leveling customer service
                                        for state of the art customer service.
                                    </p>
                                </TabPane>
                                <TabPane tabId="link3">
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely deliverables
                                        for real-time schemas. <br />
                                        <br />
                                        Dramatically maintain clicks-and-mortar solutions without
                                        functional solutions.
                                    </p>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </div>}

                {/* Botón para mostrar/ocultar descripción */}
                <button className={showDescription ? "toggle-description-active" : "toggle-description"} onClick={toggleDescription}>
                    <img className="image-description" src={information} alt="..." />
                    <div class="tooltip-description"><p>Mostrar Historia</p></div>
                </button>
                {currentItemIndex < images.length &&
                    <button className={showZoom ? "toggle-zoom-active" : "toggle-zoom"} onClick={toggleZoom}>
                        <img className="image-zoom" src={zoom} alt="..." />
                        <div class="tooltip-zoom"><p>Hacer Zoom</p></div>
                    </button>
                }
                {!showDescription &&
                    <button className="prev-image" onClick={goToNextItem}>
                        <img src={next} alt="..." />
                    </button>
                }
                {!showDescription &&
                    <button className="next-image" onClick={goToNextItem}><span aria-hidden={true}>
                        <img src={next} alt="..." />
                    </span></button>
                }

            </div>
        </FullScreen>
    );
};

export default CustomImageVideoViewer;
