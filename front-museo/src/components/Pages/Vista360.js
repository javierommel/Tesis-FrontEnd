
import React from 'react';
import { useState } from "react";
import { Pannellum } from 'pannellum-react';
import myImage from "assets/img/PanoramaInterior2.png";
import Chatbot from "components/Chatbot/Chatbot"
import Flip from "react-reveal/Flip";
import Chat from "assets/img/chat.png";
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";

export default function Vista360() {
    const [showBot, toggleBot] = useState(false);
    return (
      <div>
        <ExamplesNavbar activado={2}/>
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
      </div>
    );
}
