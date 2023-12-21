
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "actions/auth";
import { clearMessage } from "actions/message";
import classnames from "classnames";
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
} from "reactstrap";

export default function ExamplesNavbar({ activado }) {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [pills, setPills] = React.useState(activado);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
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
    dispatch(logout());
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowAdminBoard(false);
    }
  }, [currentUser]);
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div style={{ position: 'absolute', top: '10px', left: '20px', color: 'white' }}>
          <span><b>Bienvenido: </b></span>
          {currentUser.username}
        </div>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>BLK• </span>
            Museo de las Conceptas
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
            {showAdminBoard && (
              <NavItem>
                <NavLink
                  className={classnames({
                    "active show": pills === 4,
                  })}
                  onClick={(e) => setPills(4)}
                  tag={Link} to="/report-page"
                >
                  <i className="tim-icons icon-chart-bar-32" />
                  Estadísticas
                </NavLink>
              </NavItem>)}
            {showAdminBoard && (
              <NavItem>
                <NavLink
                  className={classnames({
                    "active show": pills === 5,
                  })}
                  onClick={(e) => setPills(5)}
                  tag={Link} to="/admin-page"
                >
                  <i className="tim-icons icon-settings-gear-63" />
                  Administración
                </NavLink>
              </NavItem>)}
            <NavItem>
              <NavLink tag={Link} to="/" onClick={logOut}>
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
