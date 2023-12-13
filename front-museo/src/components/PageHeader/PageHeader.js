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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

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
      <section className="section section-lg section-safe">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path5.png")}
          />
          <Container>
            
            <Row className="row-grid justify-content-between" />
            <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/museo.jpeg")}
                />
              </Col>
              <Col md="6">
                <div className="px-md-5">
                  <hr className="line-success" />
                  <h3>Museo Las Conceptas</h3>
                  <p>
                  En un edificio colonial, de los más antiguos
                  de la ciudad de Cuenca, a trescientos metros 
                  de la plaza central “Parque Calderón”,el 
                  Museo de las Conceptas cuenta historia de 
                  la ciudad desde un Monasterio de Claustro.<br/>
                  <br/>
                  Las colecciones que se exhiben son parte del 
                  dote que las religiosas aportaron al convento 
                  durante los cuatro siglos de vida del monasterio. 
                  En su mayoría pinturas y esculturas religiosas, 
                  representaciones de la vida de Jesús, de la Virgen 
                  en diversas advocaciones; arcángeles, ángeles, 
                  querubines y maravillosos retratos de santos y santas.<br/>
                  <br/>
                  En la actualidad el museo auspicia y propicia actos 
                  culturales como seminarios, talleres, exposiciones y 
                  otros eventos artísticos.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
    </div>
  );
}
