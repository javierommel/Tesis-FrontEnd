
import React from 'react';
import { useState } from "react";
import { Pannellum } from 'pannellum-react';
import myImage from "assets/img/museo360.JPG";
import Chatbot from "components/Chatbot/Chatbot"
import Flip from "react-reveal/Flip";
import Chat from "assets/img/chat.png";
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import Footer from "components/Footer/Footer.js";
import 'components/Utils/Button.css';
import 'assets/css/museo.css';
export default function Vista360() {
  const [showBot, toggleBot] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const hanldeClick = name => {
    console.log("name: " + JSON.stringify(name))
    toggle();
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (<>
    <ExamplesNavbar activado={2} />
    <Modal isOpen={modal} toggle={toggle} className="custom-modal" fade={false}> {/* Desactiva la animación de desvanecimiento */}
      <ModalHeader toggle={toggle}>Modal Title</ModalHeader>
      <ModalBody>
        <div className="image-container">
          <img src={require('assets/img/visita360/Virgen Niña.JPG')} alt="Imagen" className="image" />
        </div>
        <div className="text-container">
          <p className="description">
            Entre los ornamentos se nombra: la custodia, mandada
            a trabajar por la madre Abadesa Sebastiana de San
            Juan en un costo de 800 patacones; una estatua de la
            Santísima Virgen de la Inmaculada,
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
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
    <div className="wrapper">
      <div style={{ height: "60px" }}></div>
      <section className="section section-lg section-safe">
        <Pannellum
          id="1"
          sceneId="firstScene"
          width="100%"
          height="800px"
          image={myImage}

          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          onLoad={() => {
            console.log("panorama loaded");
          }}
        >
          {/* Otro contenido de tu componente */}
          <Pannellum.Hotspot
            type="custom"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/farminf/pannellum-react"
          />

          <Pannellum.Hotspot
            type="custom"
            pitch={10}
            yaw={-85}
            text="Info Hotspot Text 4"
            URL="https://github.com/farminf/pannellum-react"
            name="hs1"
            handleClick={(evt, name) => hanldeClick(name)}
          />
        </Pannellum>
      </section>
    </div>
    <Footer />

  </>
  );
}
