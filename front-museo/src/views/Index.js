import React from "react";
import { useState } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/Pages/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import Chatbot from "components/Chatbot/Chatbot"
import Chat from "assets/img/chat.png";
import Flip from "react-reveal/Flip";
import './Button.css'; // Archivo de estilos personalizados



export default function Index() {
  const [showBot, toggleBot] = useState(false);
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <IndexNavbar activado={1} />
      <div className="wrapper">
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

        <PageHeader />

        <Footer />
      </div>
    </>
  );
}
