import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

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
  Label,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  const navigate = useNavigate();
  const inputRef = useRef();
  const [image, setImage] = useState(require("assets/img/mike.jpg"));
  const handleButtonClick = () => {
    navigate('/vista360');
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
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
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <Row>
                      <Col lg="3"><img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={image}
                        //src={require("assets/img/mike.jpg")}
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                      /></Col>
                      <Col><h5>Nombre de persona</h5>
                        <p>
                          The design system comes with three pre-built pages to help
                          you get started faster. You can change the text and images
                          and you're good to go.
                        </p></Col>
                    </Row>
                    <Row>
                      <Col lg="3"><img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={image}
                        //src={require("assets/img/mike.jpg")}
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                      /></Col>
                      <Col><FormGroup>
                        <Label for="exampleText">
                          Ingrese su comentario
                        </Label>
                        <Input
                          id="exampleText"
                          name="text"
                          type="textarea"
                        />
                        <Button>Comentar</Button>
                      </FormGroup></Col>
                    </Row>

                    <div className="px-md-5">


                      {/*<ul className="list-unstyled mt-5">
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            <div className="icon icon-success mb-2">
                              <i className="tim-icons icon-vector" />
                            </div>
                            <div className="ml-3">
                              <h6>Carefully crafted components</h6>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            <div className="icon icon-success mb-2">
                              <i className="tim-icons icon-tap-02" />
                            </div>
                            <div className="ml-3">
                              <h6>Amazing page examples</h6>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            <div className="icon icon-success mb-2">
                              <i className="tim-icons icon-single-02" />
                            </div>
                            <div className="ml-3">
                              <h6>Super friendly support team</h6>
                            </div>
                          </div>
                        </li>
  </ul>*/}
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
      </div>
    </>
  );
}
