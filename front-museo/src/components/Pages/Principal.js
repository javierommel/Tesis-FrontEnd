import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Rating from 'react-rating';
import { getComment, addComment } from "../../actions/comment"
import Comment from "components/Utils/Comment.js"

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardHeader,
  Button,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";
import Loader from "components/Utils/Loader.js"

export default function PrincipalPage() {
  const [commentl, setCommentl] = useState([]);
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState(require("assets/img/mike.jpg"));
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [errorrate, setErrorrate] = useState("");
  const onDismiss = () => setResponse(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    getComment({ page: 1, pageSize: 5, usuario: currentUser.id }).then((dat) => {
      setCommentl(cambiarImagenes(dat.data));
      setImage(cambiarImagen(dat.avatar))
    }).catch((error) => {
      console.log("error" + error.message)
    });
    // Recupera el estado de la respuesta almacenado en localStorage al cargar la página
    const storedResponse = localStorage.getItem('storedResponse');
    if (storedResponse) {
      setResponse(JSON.parse(storedResponse));
      setSuccessful(true);
      // Limpia el estado almacenado después de cargarlo
      localStorage.removeItem('storedResponse');
    }
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const cambiarImagenes = (value) => {
    return value.map((data) => {
      const uint8Array = data.usuario_id.avatar ? new Uint8Array(data.usuario_id.avatar.data) : null;
      const blob = uint8Array ? new Blob([uint8Array]) : null;
      //setImage(blob ? URL.createObjectURL(blob) : null);
      data.usuario_id.avatar = blob ? URL.createObjectURL(blob) : null;
      return data;
    });
  };

  const cambiarImagen = (value) => {
    const uint8Array = value ? new Uint8Array(value.data) : null;
    const blob = uint8Array ? new Blob([uint8Array]) : null;
    const res = blob ? URL.createObjectURL(blob) : null;
    return res;
  };
  const handleChange = (event) => {
    setErrorrate("")
    setComment(event.target.value);
  };

  const saveComment = () => {
    if (comment === "") {
      setErrorrate("Debe ingresar un comentario")
      return
    }
    if (!rate ) {
      setErrorrate("Debe escoger una puntuación")
      return
    }
    addComment(comment, rate, currentUser.id).then(({ message, retcode }) => {
      console.log("asdf: " + message + " " + retcode)
      if (retcode === 0) {
        setResponse(message);
        localStorage.setItem('storedResponse', JSON.stringify(message));
        setSuccessful(true);
        setLoading(false);
        window.location.reload();
      }
      else {
        console.log(message)
        setResponse("Error al intentar guardar el comentario en el servidor")
        setSuccessful(false);
        setLoading(false);
      }
    }).catch((e) => {
      console.log(e.message)
      setResponse("Error al intentar guardar el comentario en el servidor")
      setSuccessful(false);
      setLoading(false);
    });
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Loader loading={loading} />
      <ExamplesNavbar activado={1} />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div style={{ height: "200px" }}></div>
          <Container>
            <Row className="row-grid justify-content-between">
              <Col className="mt-lg-5" md="5">
                <Row>
                  <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="tim-icons icon-zoom-split text-warning" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <CardTitle tag="p">3,237</CardTitle>
                              <p />
                              <p className="card-category">Búsquedas</p>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats upper bg-default">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="tim-icons icon-notes text-white" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <CardTitle tag="p">3,653</CardTitle>
                              <p />
                              <p className="card-category">Comentarios</p>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="tim-icons icon-email-85 text-info" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <CardTitle tag="p">593</CardTitle>
                              <p />
                              <p className="card-category">Recomendaciones</p>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="tim-icons icon-user-run text-success" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <CardTitle tag="p">10,783</CardTitle>
                              <p />
                              <p className="card-category">Visitas</p>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                  <br />
                  <br />
                  <hr className="line-success" />
                  <h1>
                    Museo Virtual
                  </h1>
                  <p>
                    Prueba el asistente virtual que te ayudará con tus dudas.
                    Una forma entretenida de visitar un museo.
                  </p>
                  <br />

                </div>
              </Col>
            </Row>
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
                  <Row style={{ paddingTop: '20px' }}>
                    <Col lg="3"><img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={image}
                      //src={require("assets/img/mike.jpg")}
                      style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    /></Col>
                    <Col><FormGroup>
                      <h4>Publica tu comentario</h4>
                      <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        placeholder="Ingrese aquí su comentario..."
                        onChange={handleChange}
                      />
                    </FormGroup>
                      <Row>
                        <Col lg="7" md="6"></Col>
                        <Col lg="2" md="6" style={{ textAlign: "end" }}>
                          <h5>Puntuación </h5></Col>
                        <Col>
                          <Rating
                            emptySymbol={<img alt="..." style={{ width: '25px', height: '25px' }} src={require("assets/img/pngwing.com1.png")} className="icon" />}
                            fullSymbol={<img alt="..." style={{ width: '20px', height: '20px' }} src={require("assets/img/pngwing.com.png")} className="icon" />}
                            style={{ float: 'right' }}
                            onChange={(rate) => { setRate(rate); setErrorrate("") }}
                          />
                        </Col>
                      </Row>
                      {errorrate!=="" && <div className="typography-line"><p className="text-danger">{errorrate}</p></div>}
                      <Row>
                        <Col>
                          <Button style={{ float: 'right' }} color="info" onClick={saveComment}>Comentar</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="px-md-5">
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>

        <Footer />
        {response !== null && (
          <Alert isOpen color={successful ? 'success' : 'danger'} toggle={onDismiss} style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}>
            {response}
          </Alert>
        )}
      </div>
    </>
  );
}
