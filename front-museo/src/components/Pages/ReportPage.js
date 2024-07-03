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
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.roles.includes("ROLE_ADMIN", "ROLE_DIRECTOR", "ROLE_CURADOR", "ROLE_ASISTENTE")) {
        navigate("/home");
        window.location.reload();
      }
    } else {
      navigate("/login-page");
      //window.location.reload();
    }
  }, [currentUser, navigate]);

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
    return <Navigate to="/login-page" />;
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
                        </Nav>
                      </CardHeader>
                      <CardBody>
                        <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                          <TabPane tabId="link1">
                            <UserReport />
                          </TabPane>
                          <TabPane tabId="link2">
                            <MuseumReport />
                          </TabPane>
                          <TabPane tabId="link3">
                            <CommentReport />
                          </TabPane>
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

            
        </div>
        
        <Footer />
      </div>
    </>
  );
}
