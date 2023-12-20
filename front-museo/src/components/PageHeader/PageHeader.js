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
import './PageHeader.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  UncontrolledCarousel,
} from "reactstrap";
const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "",
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "",
  },
];




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
      <div className="section">
        <Container>
          <div className="title">
            <h3></h3>
          </div>
          <Row className="justify-content-between align-items-center">
            <Col className="mb-5 mb-lg-0" lg="5">
              <h1 className="text-white font-weight-light">
                Museo Las Conceptas
              </h1>
              <p className="text-white mt-4">
                En un edificio colonial, de los más antiguos
                de la ciudad de Cuenca, a trescientos metros
                de la plaza central “Parque Calderón”,el
                Museo de las Conceptas cuenta historia de
                la ciudad desde un Monasterio de Claustro.<br />
                <br />
                Las colecciones que se exhiben son parte del
                dote que las religiosas aportaron al convento
                durante los cuatro siglos de vida del monasterio.
                En su mayoría pinturas y esculturas religiosas,
                representaciones de la vida de Jesús, de la Virgen
                en diversas advocaciones; arcángeles, ángeles,
                querubines y maravillosos retratos de santos y santas.<br />
                <br />
                En la actualidad el museo auspicia y propicia actos
                culturales como seminarios, talleres, exposiciones y
                otros eventos artísticos.
              </p>
              <Button
                className="mt-4"
                color="warning"
                href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/alert"
              >
                See all components
              </Button>
            </Col>
            <Col lg="6">
              <UncontrolledCarousel
                items={carouselItems}
                indicators={false}
                autoPlay={false}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <section className="section section-lg section-safe">
        <img
          alt="..."
          className="path"
          src={require("assets/img/path5.png")}
        />
        
      </section>
    </div>
  );
}
