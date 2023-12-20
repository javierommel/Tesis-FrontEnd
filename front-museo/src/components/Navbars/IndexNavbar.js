import React from "react";
import { Link } from "react-router-dom";
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

export default function IndexNavbar({activado}) {
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
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>UCuenca• </span>
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
                tag={Link} to="/inicio"
              >
                <i className="tim-icons icon-istanbul" />
                Principal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  "active show": pills === 2,
                })}
                onClick={(e) => setPills(2)}
                tag={Link} to="/login-page"
              >
                <i className="tim-icons icon-single-02" />
                Ingresar
              </NavLink>
            </NavItem>
            {activado===3 &&
            <NavItem>
              <NavLink
                className={classnames({
                  "active show": pills === 3,
                })}
                onClick={(e) => setPills(3)}
                tag={Link} to="/register-page"
              >
                <i className="tim-icons icon-badge" />
                Registrar
              </NavLink>
            </NavItem>}
          </Nav>
        </Collapse>
      </Container>
    </Navbar >
  );
}
