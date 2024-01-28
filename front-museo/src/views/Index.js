import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/Pages/PageHeader.js";
import Footer from "components/Footer/Footer.js";

import './Button.css'; // Archivo de estilos personalizados



export default function Index() {
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

        <PageHeader />

        <Footer />
      </div>
    </>
  );
}
