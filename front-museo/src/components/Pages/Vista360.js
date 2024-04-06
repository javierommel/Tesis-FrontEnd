import React from 'react';
import { useState } from "react";
import { Pannellum } from 'pannellum-react';
import myImage from "assets/img/visita360/escena1.JPG";
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
  const completa = require('assets/img/visita360/fullscreen.png')
  const normal = require('assets/img/visita360/reducir.png')
  
  const letrero = require('assets/img/visita360/fondo1.png')
  const imagenes = [
    require('assets/img/visita360/Virgen_Niña.JPG'),
    require('assets/img/visita360/Virgen_de_la_Merced.jpg'),
  ];
  
  const videos = [
    require('assets/img/visita360/video1.mp4'),
  ];
  const toggle = () => setModal(!modal);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handle = useFullScreenHandle();

  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement("div");
    image.classList.add("hotspot");
    const inmuseo = document.createElement("div");
    inmuseo.classList.add("in-museo");
    const outmuseo = document.createElement("div");
    outmuseo.classList.add("out-museo");
    image.appendChild(inmuseo);
    image.appendChild(outmuseo);
    hotSpotDiv.appendChild(image);
  };

  const handleClick = name => {
    console.log("name: " + JSON.stringify(name))
    toggle();
  }
  const handleFullscreenChange = (isFullscreen) => {
    setIsFullscreen(isFullscreen);
  };
  const onInit = () => {
    console.log('lightGallery has been initialized');
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
              <CustomImageViewer images={imagenes} videos={videos} toggle={toggle}/>
              
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
            image={myImage}
            showFullscreenCtrl={false}
            pitch={0}
            yaw={-90}
            hfov={2000}
            autoLoad
            autoRotate={-0.5}
            compass
            onLoad={() => {
              console.log("panorama loaded");
            }}
          >
            {piecesArray.map((hotSpot, index) => {
              return (
                <Pannellum.Hotspot
                  key={index}
                  type="custom"
                  pitch={hotSpot.pitch}
                  yaw={hotSpot.yaw}
                  tooltip={hotspotIcon}
                  handleClick={(evt, name) => handleClick(name)}
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
