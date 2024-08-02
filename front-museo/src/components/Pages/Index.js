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


export default function Index() {
  const [commentl, setCommentl] = useState([]);
  const [contenido, setContenido] = useState(false);
  const [puntuacion, setPuntuacion] = useState(false);
  const [nrovisitas, setNroVisitas] = useState(false);
  const [nrousuarios, setNroUsuarios] = useState(false);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);
  const [imagen4, setImagen4] = useState(null);
  const toBlob = (image) => {
    const uint8Array1 = image ? new Uint8Array(image) : null;
    const blob1 = uint8Array1 ? new Blob([uint8Array1]) : null;
    return blob1 ? URL.createObjectURL(blob1) : null;
  }
  useEffect(() => {
    getComment({ page: 1, pageSize: 5, usuario: null }).then((dat) => {
      setCommentl(cambiarImagenes(dat.data));
    }).catch((error) => {
      console.error("Error: " + error.message)
    });
    getContent().then((dat) => {
      setContenido(dat.data.general[0]);
      setPuntuacion(dat.data.porcentage);
      setNroUsuarios(dat.data.nrouser);
      setNroVisitas(dat.data.nrovisit);
      setImagen1(toBlob(dat.data.general[0].imagen1.data));
      setImagen2(toBlob(dat.data.general[0].imagen2.data));
      setImagen3(toBlob(dat.data.general[0].imagen3.data));
      setImagen4(toBlob(dat.data.general[0].imagen4.data));
    })
      .catch((error) => {
        console.error("Error:" + error.message)
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
  const carouselItems = [
    {
      src: {imagen1},
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
                  {imagen1&&<UncontrolledCarousel
                     items={[
                      {
                        altText: 'Slide 1',
                        caption: '',
                        key: 1,
                        src: imagen1
                      },
                      {
                        altText: 'Slide 2',
                        caption: '',
                        key: 2,
                        src: imagen2
                      },
                      {
                        altText: 'Slide 3',
                        caption: '',
                        key: 3,
                        src: imagen3
                      }
                      ,
                      {
                        altText: 'Slide 3',
                        caption: '',
                        key: 4,
                        src: imagen4
                      }
                    ]}
                    indicators={false}
                    autoPlay={false}
                  />}

                  <Card className="card-stats bg-danger">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">{puntuacion}%</CardTitle>
                          <p className="card-category text-white">Puntuación</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-info">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">{nrousuarios}</CardTitle>
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
                          <CardTitle tag="p">{nrovisitas}</CardTitle>
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
                    <p className="text-white mt-4" style={{ textAlign: "justify", whiteSpace: 'pre-wrap' }}>
                      {contenido&&contenido.contenido}
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
