/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useNavigate } from 'react-router-dom';


// reactstrap components
import { Container } from "reactstrap";

import './PageHeader.css';

export default function PageHeader() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/vista360');
  };
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">Museo Las conceptas</h1>
          <h3 className="d-none d-sm-block">
            Prueba el asistente virtual que te ayudará con tus dudas.
            Una forma entretenida de visitar un museo.
          </h3>
          <div>
            <button className="noselect blue" onClick={handleButtonClick}>Ingrese aquí</button>
          </div>
        </div>
      </Container>
    </div>
  );
}
