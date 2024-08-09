import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import faceSVG from 'assets/img/Logo Facebook.svg';
import xSVG from 'assets/img/X.png';
import tkSVG from 'assets/img/tiktok.png';
import insSVG from 'assets/img/Logo Instagram.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="icon-text-footer">
          <Col md="3"></Col>
          <Col md="3">
            <h1 className="texto-footer">UCUENCA</h1>
          </Col>
          <Col md="3">
            <h4 className="texto-footer">Síguenos:</h4>
            <div className="iconos-redes">
              <Button
                className="btn-icon btn-round btn-footer"
                color="default"
                href="https://www.tiktok.com/@museodelasconceptas_1986"
                id="idtiktok"
                target="_blank"
              >
                <img alt="..." src={tkSVG} style={{paddingTop:"4px", width:"65%"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="idtiktok">
                Síguenos
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-round btn-footer"
                color="default"
                href="https://x.com/MuseoConceptas"
                id="idtwitter"
                target="_blank"
              >
                <img alt="..." src={xSVG} style={{paddingTop:"5px", paddingLeft:"0.5px", width:"30px"}} />
              </Button>
              <UncontrolledTooltip delay={0} target="idtwitter">
                Síguenos
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-round btn-footer"
                color="default"
                href="https://www.facebook.com/museodelasconceptasecuador"
                id="tooltip230450801"
                target="_blank"
              >
                <img alt="..." src={faceSVG} style={{paddingTop:"5px", paddingLeft:"0.5px", width:"30px"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Dale me gusta
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-round btn-footer"
                color="default"
                href="https://www.instagram.com/museodelasconceptas/"
                id="tooltip318450378"
                target="_blank"
              >
                <img alt="..." src={insSVG} style={{paddingTop:"4.5px", width:"80%"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Síguenos
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
        <Row>
        
        <Col md="12" className="texto-copyright">
            <h5 className="texto-footer">Copyright 2023 - Todos los derechos Reservados - Museo Las Conceptas | Powered by Rommel Chocho</h5>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
