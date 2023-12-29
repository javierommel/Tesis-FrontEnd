import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "actions/message";
import UserForm from "../Settings/UserForm"
import ViewListUser from "../Settings/ViewListUser"
import {getUser, addUser, updateUser} from "../../actions/user"
// react plugin used to create charts
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";


export default function AdminPage() {

  const [datos,setDatos]=useState({
    data: [],
    ruta: 'lista',
    usuarioSeleccionado:null,
  })
  
  //const {ruta, data, usuarioSeleccionado} = datos
  const valoresIniciales = datos.usuarioSeleccionado && datos.data.find(x => x.id === datos.usuarioSeleccionado)
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [textTabs, setTextTabs] = React.useState(4);
  React.useEffect(() => {
    getUser().then((dat) => {
      setDatos((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat,    // Actualizando solo la propiedad 'data'
      }));
      
      console.log("dat "+dat)
      
    })
    .catch((error) => {
      console.log("error"+error.message)
      //setLoading(false);
    });
    
    //setDatos({data:getUser().data.data});
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);
  /*useEffect(() => {
    if (currentUser) {
      console.log("current: " + currentUser.roles)
      if (!currentUser.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/home" />;
      }
    } else {
      return <Navigate to="/home" />;
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }*/
  const seleccionUsuario = id => {
    this.setState({
      ruta: 'formulario',
      usuarioSeleccionado: id
    })
  }

  const agregarNuevoUsuario = usuario => {
    
  }

  const actualizarNuevoUsuario = (id, values) => {
    
  }

  const nuevoUsuario = () => {
    
  }
  return (
    <>
      <ExamplesNavbar activado={4} />
      <div className="section section-tabs">
        <Container>
          <div className="title">
            <h3 className="mb-3">Administrador</h3>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="20">
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  With icons
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
                        onClick={(e) => setIconsTabs(1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-spaceship" />
                        Usuarios
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: iconTabs === 2,
                        })}
                        onClick={(e) => setIconsTabs(2)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-settings-gear-63" />
                        Piezas
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                    <TabPane tabId="link1">
                      {datos.ruta === 'lista' && <ViewListUser
                        nuevoUsuario={nuevoUsuario}
                        handleClick={seleccionUsuario}
                        data={datos.data}
                      />}

                      {datos.ruta === 'formulario' && <UserForm
                        valoresIniciales={valoresIniciales || {}}
                        handleSubmit={agregarNuevoUsuario}
                        handleUpdate={actualizarNuevoUsuario}
                      />}
                    </TabPane>
                    <TabPane tabId="link2">
                      <p>
                        Completely synergize resource taxing relationships via
                        premier niche markets. Professionally cultivate one-to-one
                        customer service with robust ideas. <br />
                        <br />
                        Dynamically innovate resource-leveling customer service
                        for state of the art customer service.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
        <Footer />
      </div>

    </>
  );
}
