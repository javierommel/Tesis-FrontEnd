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
import xSVG from 'assets/img/x1.png';
import tkSVG from 'assets/img/tiktok.png';
import insSVG from 'assets/img/Logo Instagram.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">UCuenca</h1>
          </Col>
          <Col md="5">
            <h5 className="title">Copyright 2023 <br />Todos los derechos Reservados - Museo Las Conceptas. <br />Powered by Rommel Chocho</h5>
          </Col>
          <Col md="4">
            <h3 className="title">Síguenos:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.tiktok.com/@museodelasconceptas_1986"
                id="idtiktok"
                target="_blank"
              >
                <img alt="..." src={tkSVG} style={{paddingTop:"4px", width:"60%"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="idtiktok">
                Síguenos
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.tiktok.com/@museodelasconceptas_1986"
                id="idtwitter"
                target="_blank"
              >
                <img alt="..." src={xSVG} />
              </Button>
              <UncontrolledTooltip delay={0} target="idtwitter">
                Síguenos
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/museodelasconceptasecuador"
                id="tooltip230450801"
                target="_blank"
              >
                <img alt="..." src={faceSVG} style={{paddingTop:"0.5px", width:"95%"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Dale me gusta
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.instagram.com/museodelasconceptas/"
                id="tooltip318450378"
                target="_blank"
              >
                <img alt="..." src={insSVG} style={{paddingTop:"4.5px", width:"70%"}}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Síguenos
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
