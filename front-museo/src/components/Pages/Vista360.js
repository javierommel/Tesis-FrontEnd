import React from 'react';
import { useState, useEffect } from "react";
import { Pannellum } from 'pannellum-react';
import Chatbot from "components/Chatbot/Chatbot"
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
  const { user: currentUser } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [showSala, setShowSala] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [textos, setTextos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [sala, setSala] = useState("Sala de Bordado 1");
  const [hfov, setHfov] = useState(120);
  const [yaw, setYaw] = useState(0);
  const completa = require('assets/img/visita360/fullscreen.png')
  const normal = require('assets/img/visita360/reducir.png')
  const salasup = require('assets/img/visita360/rowup.png')
  const salasdown = require('assets/img/visita360/rowdown.png')
  const sala1 = require('assets/img/visita360/sala1.jpg')
  const sala2 = require('assets/img/visita360/sala2.jpg')
  const sala3 = require('assets/img/visita360/sala3.jpg')
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Inicialmente chequea el ancho de la pantalla
    handleResize();

    // Agrega un event listener para manejar cambios de tamaño de pantalla
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggle = (isfull1, yaw1) => {
    setModal(!modal);
    if (isfull1) {
      setIsFull(false)
      setYaw(yaw1)
      handle.enter();
    }

  }
  const toggleSala = () => {
    setShowSala(!showSala);
  }
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const handle = useFullScreenHandle();

  const hotspotIcon = (hotSpotDiv, hotSpot) => {
    const image = document.createElement("div");
    image.classList.add("hotspot");
    const outmuseo = document.createElement("div");
    const inmuseo = document.createElement("div");
    if (hotSpot.up > -1) inmuseo.classList.add("out-up-museo")
    else outmuseo.classList.add("out-museo");
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
      return true;
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
      setHfov(120)
    }
    else {
      if (isFullscreen) setYaw(hotSpot.yaw);
      toggle();
    }
  }
  const changeSala = (sala, nombre_sala) => {
    setCurrentScene(sala)
    setSala(nombre_sala)
    setYaw(0)
    setHfov(120)
    //toggleSala();
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
    setIsFullscreen(isFullscreen);
  };
  if (!currentUser) {
    return <Navigate to="/login-page" />;
  }
  return (<>
    <ExamplesNavbar activado={2} />
    <div className="wrapper-museo">
      <div style={{ height: "70px" }}></div>
      <section className="section section-lg section-safe" style={{ height: isMobile?"620px":"800px" }}>
        <FullScreen handle={handle} onChange={handleFullscreenChange} >
          {modal &&
            (
              <CustomImageViewer images={imagenes} videos={videos} textos={textos} titulo={titulo} toggle={toggle} isfull1={isFull} yaw1={yaw} />
            )}
          <Chatbot />
          <img className={isFullscreen?"imgfullscreen1":"imgfullscreen"} src={isFullscreen ? normal : completa} alt="..." onClick={isFullscreen ? handleExit : handleEnter} />
          <Pannellum
            className="panellum"
            id="1"
            sceneId="firstScene"
            width="100%"
            height={isFullscreen ? "100%" : (isMobile?"600px":"730px")}
            image={piecesArray[currentScene].scenePanoImg}
            showFullscreenCtrl={false}
            showZoomCtrl={false}
            pitch={-10}
            yaw={yaw}
            hfov={hfov}
            autoLoad
            autoRotate={-0.5}
            title={sala}
            onLoad={() => {
              console.log("visita cargada");
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
          {showSala && <div className="salas-museo">
            <div className="imagen-item">
              <img
                alt="   Seleccione una imagen..."
                className="salas-imagen"
                src={sala1}
                onClick={() => changeSala(0, "Sala de Bordado 1")}
              />
              <div className="descripcion-imagen" onClick={() => changeSala(0, "Sala de Bordado 1")}>Sala de Bordado 1</div>
            </div>
            <div className="imagen-item">
              <img
                alt="   Seleccione una imagen..."
                className="salas-imagen"
                src={sala2}
                onClick={() => changeSala(3, "Sala de Bordado 2")}
              />
              <div className="descripcion-imagen" onClick={() => changeSala(3, "Sala de Bordado 2")}>Sala de Bordado 2</div>
            </div>
            <div className="imagen-item">
              <img
                alt="   Seleccione una imagen..."
                className="salas-imagen"
                src={sala3}
                onClick={() => changeSala(6, "Sala del Risco")}
              />
              <div className="descripcion-imagen" onClick={() => changeSala(6, "Sala del Risco")}
              >Sala del Risco</div>
            </div>
          </div>}
          <img className="imgsala" src={showSala ? salasdown : salasup} alt="..." onClick={toggleSala} />

        </FullScreen>
      </section>
    </div >

    <Footer />

  </>
  );
}
