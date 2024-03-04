import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Rating from 'react-rating';
import { getComment, addComment } from "../../actions/comment"
import Comment from "components/PageHeader/Comment.js"

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
import Loader from "components/PageHeader/Loader.js"

export default function PrincipalPage() {
  const navigate = useNavigate();
  const [commentl, setCommentl] = useState([]);
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState(require("assets/img/mike.jpg"));
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const onDismiss = () => setResponse(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  React.useEffect(() => {
    getComment({ page: 1, pageSize: 10, usuario:currentUser.id }).then((dat) => {
      setCommentl(cambiarImagenes(dat.data));
      setImage(cambiarImagen(dat.avatar))
      console.log("commentList: " + JSON.stringify(dat.data))
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
    setComment(event.target.value);
  };

  const saveComment = () => {
    console.log("rate: " + rate + " comment: " + comment)
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

  const handleButtonClick = () => {
    navigate('/vista360');
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
          <Container>
            <div className="content-center brand">
              <h1 className="h2-seo">Museo Las conceptas</h1>
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


        <section className="section section-lg section-safe">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path5.png")}
          />
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/chester-wade.jpg")}
                />
                <Card className="card-stats bg-danger">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">100%</CardTitle>
                        <p className="card-category text-white">Safe</p>
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
                          Satisfied customers
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
                        <p className="card-category text-white">Business</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="7" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <h3>Comentarios</h3>
                  </CardHeader>
                  <CardBody>
                    {commentl.map((step) => (
                      <Comment data={step} />

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
                          <Col></Col>
                          <Col ><h5>Puntuación </h5></Col>
                          <Col>
                            <Rating
                              emptySymbol={<img style={{ width: '25px', height: '25px' }} src={require("assets/img/pngwing.com1.png")} className="icon" />}
                              fullSymbol={<img style={{ width: '25px', height: '25px' }} src={require("assets/img/pngwing.com.png")} className="icon" />}
                              style={{ float: 'right' }}
                              onChange={(rate) => setRate(rate)}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button style={{ float: 'right' }} onClick={saveComment}>Comentar</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <div className="px-md-5">
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
              </Col>
            </Row>
          </Container>
        </section>
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
