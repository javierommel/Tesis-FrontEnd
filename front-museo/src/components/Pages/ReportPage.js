import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "actions/message";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  NavLink,
  TabContent,
  TabPane,
  NavItem,
  Nav,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";
import UserReport from "./Reports/UserReport";
import MuseumReport from "./Reports/MuseumReport";
import CommentReport from "./Reports/CommentReport";
export default function ReportPage() {
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showReportBoard, setShowReportBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showSupervisorBoard, setShowSupervisorBoard] = useState(false);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowReportBoard(currentUser.roles.includes("ROLE_REPORT"));
      setShowManagerBoard(currentUser.roles.includes("ROLE_MANAGER"));
      setShowSupervisorBoard(currentUser.roles.includes("ROLE_SUPERVISOR"));
      if (currentUser.roles.includes("ROLE_MANAGER", "ROLE_REPORT", "ROLE_SUPERVISOR")) {
        navigate("/home");
        window.location.reload();
      }
    } else {
      navigate("/login-page");
      //window.location.reload();
    }
  }, [currentUser,navigate]);

  useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  useEffect(() => {
    if (["/login-page", "/register-page"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <ExamplesNavbar activado={4} />
      <div className="section-museo section section-tabs">
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
          <div className="content-center">
            <section className="section-museo section section-tabs">
              <img
                alt="..."
                className="path"
                src={require("assets/img/path4.png")}
              />
              <img
                alt="..."
                className="path2"
                src={require("assets/img/path2.png")}
              />
              <Container>
                {/*<Modal isOpen={modal} toggle={toggle} modalClassName="modal-mini modal-info modal-mini" >
                  <div toggle={toggle} className="modal-header justify-content-center">
                    <button className="close" onClick={toggle}>
                      <i className="tim-icons icon-simple-remove text-white" />
                    </button>
                    <div className="modal-profile">
                      <i className="tim-icons icon-alert-circle-exc" />
                    </div></div>
                  <div className="modal-body">
                    {mensajealert}
                  </div>
                  <div className="modal-footer">
                    <Button className="btn-neutral"
                      color="link" onClick={tipoupdate === 0 ? eliminarUser : (tipoupdate === 1 ? eliminarObjet : (tipoupdate === 2 ? eliminarComment : modificarComment))}>
                      Aceptar
                    </Button>{' '}
                    <Button className="btn-neutral"
                      color="link" onClick={toggle}>
                      Cancelar
                    </Button>
                  </div>
                 </Modal>*/}
                <div className="title">
                  <h3 className="mb-3"><br /></h3>
                </div>
                <Row>
                  <Col className="ml-auto mr-auto" md="12" xl="20">
                    <div className="mb-3">
                      <small className="text-uppercase font-weight-bold">


                      </small>
                    </div>
                    <Card>
                      <CardHeader>
                        <Nav className="nav-tabs-info" role="tablist" tabs>
                          {(showAdminBoard || showManagerBoard) && (
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: iconTabs === 1,
                                })}
                                onClick={(e) => { setIconsTabs(1); }}
                                href="#usuarios"
                              >
                                <i className="tim-icons icon-single-02" />
                                Usuarios
                              </NavLink>
                            </NavItem>
                          )}
                          {(showAdminBoard || showManagerBoard || showSupervisorBoard) && (
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: iconTabs === 2,
                                })}
                                onClick={(e) => { setIconsTabs(2); }}
                                href="#piezas"
                              >
                                <i className="tim-icons icon-settings-gear-63" />
                                Museo
                              </NavLink>
                            </NavItem>
                          )}
                          {(showAdminBoard || showManagerBoard || showReportBoard) && (
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: iconTabs === 3,
                                })}
                                onClick={(e) => { setIconsTabs(3); }}
                                href="#comentarios"
                              >
                                <i className="tim-icons icon-paper" />
                                Comentarios
                              </NavLink>
                            </NavItem>
                          )}
                        </Nav>
                      </CardHeader>
                      <CardBody>
                        <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                          {(showAdminBoard || showManagerBoard) && (
                            <TabPane tabId="link1">
                              <UserReport />
                            </TabPane>
                          )}
                          {(showAdminBoard || showManagerBoard) && (
                            <TabPane tabId="link2">
                              <MuseumReport />
                            </TabPane>
                          )}
                          {(showAdminBoard || showManagerBoard) && (
                            <TabPane tabId="link3">
                              <CommentReport />
                            </TabPane>
                          )}
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>

                </Row>
                {/*response !== null && (
                  <UncontrolledAlert
                    isOpen
                    toggle={onDismiss}
                    className="alert-with-icon"
                    color={successful ? 'success' : 'danger'}
                    style={{
                      position: 'fixed',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 9999,
                    }}
                  >
                    <span data-notify="icon" className={successful ? "tim-icons icon-check-2" : "tim-icons icon-alert-circle-exc"} />
                    <span>
                      {response}
                    </span>
                  </UncontrolledAlert>
                  )*/}
              </Container>
              
            </section>
          </div>
        </div>
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
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
                                <i className="tim-icons icon-trophy text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,237</CardTitle>
                                <p />
                                <p className="card-category">Premios</p>
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
                                <i className="tim-icons icon-coins text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">3,653</CardTitle>
                                <p />
                                <p className="card-category">Ganancia</p>
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
                                <i className="tim-icons icon-gift-2 text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">593</CardTitle>
                                <p />
                                <p className="card-category">Regalos</p>
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
                                <i className="tim-icons icon-credit-card text-success" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">10,783</CardTitle>
                                <p />
                                <p className="card-category">Tarjetas</p>
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
                    <h1>
                      Resumen <br />
                      Mensual
                    </h1>
                    <p>
                      I should be capable of drawing a single stroke at the
                      present moment; and yet I feel that I never was a greater
                      artist than now.
                    </p>
                    <br />
                    <p>
                      When, while the lovely valley teems with vapour around me,
                      and the meridian sun strikes the upper surface of the
                      impenetrable foliage of my trees, and but a few stray.
                    </p>
                    <br />
                    <a
                      className="font-weight-bold text-info mt-5"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show all{" "}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
}
