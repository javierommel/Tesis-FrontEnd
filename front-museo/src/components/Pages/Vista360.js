import React from 'react';
import { useState } from "react";
import { Pannellum } from 'pannellum-react';
import Chatbot from "components/Chatbot/Chatbot"
import Flip from "react-reveal/Flip";
import Chat from "assets/img/chat.png";
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Footer from "components/Footer/Footer.js";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import 'components/Utils/Button.css';
import 'assets/css/museo.css';
import piecesArray from "./Visita360/DataVisita/Visita";
import CustomImageViewer from "./Visita360/CustomImageVideoViewer"

export default function Vista360() {
  const [showBot, toggleBot] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const completa = require('assets/img/visita360/fullscreen.png')
  const normal = require('assets/img/visita360/reducir.png')

  const imagenes = [
    require('assets/img/visita360/escena3/Virgen_Niña.JPG'),
    require('assets/img/visita360/escena3/Virgen_de_la_Merced.jpg'),
  ];

  const videos = [
    require('assets/img/visita360/video1.mp4'),
  ];
  const toggle = () => setModal(!modal);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handle = useFullScreenHandle();

  const hotspotIcon = (hotSpotDiv, hotSpot) => {
    console.log("asdfas:; " + hotSpot.arcangel)
    const image = document.createElement("div");
    image.classList.add("hotspot");
    
      const outmuseo = document.createElement("div");
      outmuseo.classList.add("out-museo");
      const inmuseo = document.createElement("div");
      if (hotSpot.left) inmuseo.classList.add("left-museo")
      else if (hotSpot.up) inmuseo.classList.add("up-museo")
      else if (hotSpot.right) inmuseo.classList.add("right-museo")
      else if (hotSpot.down) inmuseo.classList.add("down-museo")
      else if (hotSpot.arcangel > -1) inmuseo.classList.add("arcangel-museo");
      else if (hotSpot.escena > -1) inmuseo.classList.add("salir-museo");
      else inmuseo.classList.add("camara-museo");
      image.appendChild(outmuseo);
      image.appendChild(inmuseo);
    
    hotSpotDiv.appendChild(image);
  };

  const handleClick = (name, escena, left, up, right, down) => {
    console.log("name: " + JSON.stringify(name))
    if (left) setCurrentScene(left)
    else if (up) setCurrentScene(up)
    else if (right) setCurrentScene(right)
    else if (down) setCurrentScene(down)
    else if (escena > -1) setCurrentScene(escena)
    else toggle();
  }
  const handleFullscreenChange = (isFullscreen) => {
    setIsFullscreen(isFullscreen);
  };
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (<>
    <ExamplesNavbar activado={2} />
    <div className="wrapper">
      <div style={{ height: "70px" }}></div>
      <section className="section section-lg section-safe" style={{ height: "800px" }}>
        <FullScreen handle={handle} onChange={handleFullscreenChange}>
          {modal &&
            (<>{/*<div className="backdrop"></div>*/}
              <CustomImageViewer images={imagenes} videos={videos} toggle={toggle} />

              {/*<div className="modal-content-visita">
                <img src={letrero} alt="Imagen" className="image-fondo" />
                <h4 className="title-visita">Virgen Niña</h4>
                <img className="close-button" src={cerrar} onClick={toggle} alt="Imagen" />

                <div className="image-container" >
                  <img src={require('assets/img/visita360/Virgen Niña.JPG')} alt="Imagen" className="image" />
                </div>
                <p className="description">Entre los ornamentos se nombra: la custodia, mandada
                  a trabajar por la madre Abadesa Sebastiana de San
                  Juan en un costo de 800 patacones; una estatua de la
                  Santísima Virgen de la Inmaculada,</p>
                
                        </div>*/}

            </>)}
          {showBot && (
            <Chatbot />
          )}
          <Flip left cascade>
            <button
              className="app-chatbot-button"
              onClick={() => toggleBot((prev) => !prev)}
            >
              <img src={Chat} alt="Chat" />
            </button>
          </Flip>
          <img className="imgfullscreen" src={isFullscreen ? normal : completa} alt="..." onClick={isFullscreen ? handle.exit : handle.enter} />
          <Pannellum
            className="panellum"
            id="1"
            sceneId="firstScene"
            width="100%"
            height={isFullscreen ? "100%" : "730px"}
            image={piecesArray[currentScene].scenePanoImg}
            showFullscreenCtrl={false}
            pitch={0}
            yaw={0}
            hfov={2000}
            autoLoad
            autoRotate={-0.5}
            compass
            onLoad={() => {
              console.log("panorama loaded");
            }}
          >
            {piecesArray[currentScene].hotSpots.map((hotSpot, index) => {
              return (
                <Pannellum.Hotspot
                  key={index}
                  type="custom"
                  pitch={hotSpot.pitch}
                  yaw={hotSpot.yaw}
                  tooltip={(e) => hotspotIcon(e, hotSpot)}
                  handleClick={(evt, name) => handleClick(name, hotSpot.escena, hotSpot.left, hotSpot.up, hotSpot.right, hotSpot.down)}
                  name="image info"
                />
              );
            })}
          </Pannellum>
        </FullScreen>
      </section>
    </div >

    <Footer />

  </>
  );
}
