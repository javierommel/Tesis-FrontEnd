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
import { piecesArray, information } from "./Visita360/DataVisita/Visita";
import CustomImageViewer from "./Visita360/CustomImageVideoViewer"

export default function Vista360() {
  const [showBot, toggleBot] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [textos, setTextos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [sala, setSala] = useState("Sala de Bordado 1");
  const [hfov, setHfov] = useState(2000);
  const [yaw, setYaw] = useState(0);
  const completa = require('assets/img/visita360/fullscreen.png')
  const normal = require('assets/img/visita360/reducir.png')
  const toggle = (isfull1, yaw1) => {
    console.log("fullscreen1: " + isFullscreen + " vuelvefull1: " + isfull1)
    setModal(!modal);
    if (isfull1) {
      setIsFull(false)
      setYaw(yaw1)
      handle.enter();
    }

  }
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const handle = useFullScreenHandle();

  const hotspotIcon = (hotSpotDiv, hotSpot) => {
    const image = document.createElement("div");
    image.classList.add("hotspot");
    const outmuseo = document.createElement("div");
    outmuseo.classList.add("out-museo");
    const inmuseo = document.createElement("div");
    if (hotSpot.up > -1) inmuseo.classList.add("up-museo")
    else if (hotSpot.escena > -1) {
      inmuseo.classList.add("salir-museo");
      const tooltip_salir = document.createElement("div");
      tooltip_salir.classList.add("tooltip-salir");
      const texto = document.createTextNode("Visitar otra Sala");
      tooltip_salir.appendChild(texto);
      image.appendChild(tooltip_salir);
    }
    else inmuseo.classList.add("camara-museo");
    image.appendChild(outmuseo);
    image.appendChild(inmuseo);

    hotSpotDiv.appendChild(image);
  };

  const handleClick = (name, hotSpot) => {
    information[hotSpot.sala - 1].map((datos) => {
      if (datos.hotSpot === hotSpot.orden) {
        setImagenes(datos.imagenes);
        setVideos(datos.videos);
        setTextos(datos.texto)
        setTitulo(datos.titulo)
      }
    })
    if (hotSpot.up > -1) {
      setCurrentScene(hotSpot.up)
      setYaw(hotSpot.yawp)
      setHfov(hotSpot.hfov)
    }
    else if (hotSpot.escena > -1) {
      setCurrentScene(hotSpot.escena)
      setSala(hotSpot.nombre_sala)
      setYaw(0)
      setHfov(180)
    }
    else {
      if(isFullscreen) setYaw(hotSpot.yaw);
      toggle();
    }
  }

  const handleEnter = () => {
    handle.enter();
    setIsFull(true);
  }
  const handleExit = () => {
    handle.exit();
    setIsFull(false);
  }
  const handleFullscreenChange = (isFullscreen) => {
    console.log("vista360: " + isFullscreen)
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
        <FullScreen handle={handle} onChange={handleFullscreenChange} >
          {modal &&
            (
              <CustomImageViewer images={imagenes} videos={videos} textos={textos} titulo={titulo} toggle={toggle} isfull1={isFull} yaw1={yaw}/>
            )}
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
          <img className="imgfullscreen" src={isFullscreen ? normal : completa} alt="..." onClick={isFullscreen ? handleExit : handleEnter} />
          <Pannellum
            className="panellum"
            id="1"
            sceneId="firstScene"
            width="100%"
            height={isFullscreen ? "100%" : "730px"}
            image={piecesArray[currentScene].scenePanoImg}
            showFullscreenCtrl={false}
            pitch={0}
            yaw={yaw}
            hfov={hfov}
            autoLoad
            autoRotate={-0.5}
            title={sala}
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
                  handleClick={(evt, name) => handleClick(name, hotSpot)}
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
