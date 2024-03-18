
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
import Footer from "components/Footer/Footer.js";
import 'components/Utils/Button.css';

export default function Vista360() {
  const [showBot, toggleBot] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (<>
    <ExamplesNavbar activado={2} />

    {/* Otro contenido de tu componente */}
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
            type="info"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/farminf/pannellum-react"
          />

          <Pannellum.Hotspot
            type="info"
            pitch={31}
            yaw={-107}
            text="Info Hotspot Text 4"
            URL="https://github.com/farminf/pannellum-react"
          />
        </Pannellum>
      </section>
    </div>
    <Footer />

  </>
  );
}
