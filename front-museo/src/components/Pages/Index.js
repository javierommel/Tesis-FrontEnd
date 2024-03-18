import React, { useState, useEffect } from "react";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import '../Utils/PageHeader.css';
import Comment from "components/Utils/Comment.js"
import { getComment } from "../../actions/comment"
import { getContent } from "../../actions/general"
// reactstrap components
import {
  Container,
  Row,
  Col,
  UncontrolledCarousel,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
const carouselItems = [
  {
    src: require("assets/img/museo1.jpeg"),
    altText: "Slide 1",
    caption: "",
  },
  {
    src: require("assets/img/museo2.jpeg"),
    altText: "Slide 2",
    caption: "",
  },
  {
    src: require("assets/img/museo3.jpeg"),
    altText: "Slide 3",
    caption: "",
  },
];


export default function Index() {
  const [commentl, setCommentl] = useState([]);
  const [contenido, setContenido] = useState(false);
  useEffect(() => {
    getComment({ page: 1, pageSize: 10, usuario: null }).then((dat) => {
      setCommentl(cambiarImagenes(dat.data));
    }).catch((error) => {
      console.error("error" + error.message)
    });
    getContent().then((dat) => {
      setContenido(dat.data[0]);
      //console.log("datos: "+JSON.stringify(contenido.titulo))
      /*setImagen1(toBlob(dat.data.imagen1));
      setImagen2(toBlob(dat.data.imagen2));
      setImagen3(toBlob(dat.data.imagen3));
      setImagen4(toBlob(dat.data.imagen4));*/
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const cambiarImagenes = (value) => {
    return value.map((data) => {
      const uint8Array = data.usuario_id.avatar ? new Uint8Array(data.usuario_id.avatar.data) : null;
      const blob = uint8Array ? new Blob([uint8Array]) : null;
      data.usuario_id.avatar = blob ? URL.createObjectURL(blob) : null;
      return data;
    });
  };

  return (
    <>
      <IndexNavbar activado={1} />
      <div className="wrapper">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <div className="wrapper">
          <div style={{ height: "150px" }}></div>
          <section className="section section-lg section-safe">

            <Container>
              <Row className="row-grid justify-content-between">
                <Col md="5">
                  <UncontrolledCarousel
                    items={carouselItems}
                    indicators={false}
                    autoPlay={false}
                  />

                  <Card className="card-stats bg-danger">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">100%</CardTitle>
                          <p className="card-category text-white">Puntuación</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-info">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">573 K</CardTitle>
                          <p className="card-category text-white">
                            Usuarios Registrados
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-default">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">10 425</CardTitle>
                          <p className="card-category text-white">Visitas</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6">
                  <div className="px-md-5" >
                    <hr className="line-success" />
                    <h3 className="text-white font-weight-light">
                      {contenido&&contenido.titulo}
                    </h3>
                    <p className="text-white mt-4" style={{ textAlign: "justify" }}>
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
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="10" md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <hr className="line-success" />
                      <h3 >Comentarios</h3>
                    </CardHeader>
                    <CardBody>
                      {commentl.map((step) => (
                        <Comment data={step} key={step.id} />
                      ))}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
