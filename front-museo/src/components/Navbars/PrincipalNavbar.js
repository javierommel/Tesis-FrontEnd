
import React, { useCallback } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "actions/auth";
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

export default function ExamplesNavbar({activado}) {
  console.log("activado: "+activado);
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
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
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
                href="#pablo"
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
                  href="#pablo"
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
                  href="#pablo"
                >
                  <i className="tim-icons icon-single-02" />
                  Perfil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    "active show": pills === 4,
                  })}
                  onClick={(e) => setPills(4)}
                  href="/profile-page"
                >
                  <i className="tim-icons icon-chart-bar-32" />
                  Estadísticas
                </NavLink>
              </NavItem>
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
