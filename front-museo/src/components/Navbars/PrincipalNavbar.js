
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "actions/auth";
import { clearMessage } from "actions/message";
import classnames from "classnames";
import { useGoogleLogout } from 'react-google-login'
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Modal, Button,
} from "reactstrap";
import logoSVG from 'assets/img/Logo museo.svg';

export default function ExamplesNavbar({ activado }) {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showReportBoard, setShowReportBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showSupervisorBoard, setShowSupervisorBoard] = useState(false);
  const [pills, setPills] = React.useState(activado);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const clientId = process.env.REACT_APP_CLIENTE_ID
  const onLogoutSuccess = () => {
    console.log("salio")
  }
  const onFailure = () => {
    console.log("Error al salir salio")
  }
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();


  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);
  const logOut = useCallback(() => {
    signOut();
    dispatch(logout(currentUser.id, currentUser.accessToken));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowReportBoard(currentUser.roles.includes("ROLE_ASISTENTE"));
      setShowManagerBoard(currentUser.roles.includes("ROLE_DIRECTOR"));
      setShowSupervisorBoard(currentUser.roles.includes("ROLE_CURADOR"));
    } else {
      setShowAdminBoard(false);
    }
  }, [currentUser]);
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <Modal isOpen={modal} toggle={toggle} modalClassName="modal-mini modal-info modal-mini" >
          <div className="modal-header justify-content-center">
            <button className="close" onClick={toggle}>
              <i className="tim-icons icon-simple-remove text-white" />
            </button>
            <div className="modal-profile">
              <i className="tim-icons icon-alert-circle-exc" />
            </div></div>
          <div className="modal-body">
            ¿Desea abandonar la sesión?
          </div>
          <div className="modal-footer">
            <Button className="btn-neutral"
              color="link" onClick={logOut}>
              Aceptar
            </Button>{' '}
            <Button className="btn-neutral"
              color="link" onClick={toggle}>
              Cancelar
            </Button>
          </div>
        </Modal>
        <div className="saludo-usuario mobile" >
          <p><b>Usuario: </b></p>
          {currentUser.name}
        </div>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <img alt="..." src={logoSVG} style={{ width: "80%", paddingLeft: "80px" }} />
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Universidad de Cuenca
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Opciones
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="nav-pills-info nav-pills-icons" pills>
            <NavItem>
              <NavLink
                className={classnames({
                  "active show": pills === 1,
                })}
                onClick={(e) => setPills(1)}
                tag={Link} to="/home"
              >
                <i className="tim-icons icon-bank" />
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({
                  "active show": pills === 2,
                })}
                onClick={(e) => setPills(2)}
                tag={Link} to="/vista360"
              >
                <i className="tim-icons icon-atom" />
                Visita 360
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  "active show": pills === 3,
                })}
                onClick={(e) => setPills(3)}
                tag={Link} to="/profile-page"
              >
                <i className="tim-icons icon-single-02" />
                Perfil
              </NavLink>
            </NavItem>
            {(showAdminBoard || showReportBoard || showManagerBoard || showSupervisorBoard) && (
              <NavItem>
                <NavLink
                  className={classnames({
                    "active show": pills === 4,
                  })}
                  onClick={(e) => setPills(4)}
                  tag={Link} to="/report-page"
                >
                  <i className="tim-icons icon-chart-bar-32" />
                  Reportes
                </NavLink>
              </NavItem>)}
            {(showAdminBoard || showManagerBoard || showSupervisorBoard || showReportBoard) && (
              <NavItem>
                <NavLink
                  className={classnames({
                    "active show": pills === 5,
                  })}
                  onClick={(e) => setPills(5)}
                  tag={Link} to="/admin-page"
                >
                  <i className="tim-icons icon-settings-gear-63" />
                  Settings
                </NavLink>
              </NavItem>)}
            <NavItem>
              <NavLink onClick={toggle}>
                <i className="tim-icons icon-button-power" />
                Salir
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
