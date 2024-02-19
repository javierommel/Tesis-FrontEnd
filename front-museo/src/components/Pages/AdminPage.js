import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "actions/message";
import UserForm from "../Settings/UserForm"
import ViewListUser from "../Settings/ViewListUser"
import PieceForm from "../Settings/PieceForm"
import ViewListPiece from "../Settings/ViewListPiece"
import { getUser, deleteUser, addUser, updateUser } from "../../actions/user"
import { getPiece } from "../../actions/piece"
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
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";


export default function AdminPage() {

  const [datos, setDatos] = useState({
    data: [],
    ruta: 'lista',
    usuarioSeleccionado: null,
    page: 1,
    pageSize: 10,
    roles: [],
  })

  const [datosp, setDatosp] = useState({
    data: [],
    ruta: 'lista',
    piezaSeleccionada: null,
    page: 1,
    pageSize: 10,
    tipo: [],
  })

  //const {ruta, data, usuarioSeleccionado} = datos
  const valoresIniciales = datos.usuarioSeleccionado && datos.data.find(x => x.id === datos.usuarioSeleccionado)
  const valoresInicialesp = datosp.objetoSeleccionado && datosp.data.find(x => x.id === datosp.objetoSeleccionado)
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [textTabs, setTextTabs] = React.useState(4);
  const [iduser, setIduser] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  React.useEffect(() => {
    getUser({ page: datos.page, pageSize: datos.pageSize }).then((dat) => {
      setDatos((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        roles: dat.roles,
      }));

      console.log("dat " + dat)

    })
      .catch((error) => {
        console.log("error" + error.message)
        //setLoading(false);
      });
    getPiece({ page: datosp.page, pageSize: datosp.pageSize }).then((dat) => {
      //console.log("tipo:"+JSON.stringify(dat.data))
      setDatosp((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        tipo: dat.tipo,
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
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
    console.log("seleccion: " + id)
    setDatos((prevDatos) => ({
      ...prevDatos,
      ruta: 'formulario',
      usuarioSeleccionado: id
    }));
  }
  const seleccionObjeto = id => {
    setDatosp((prevDatos) => ({
      ...prevDatos,
      ruta: 'formulario',
      objetoSeleccionado: id
    }));
  }

  const agregarNuevoUsuario = (usuario, cancel) => {
    console.log("were " + cancel)
    if (cancel) cancelarUsuario();
  }

  const eliminarUsuario = (usuario) => {
    console.log("user:"+usuario)
    setIduser(usuario)
    toggle()
  }
  const eliminarUser = () => {
    console.log("iduser: "+iduser+"cur: "+currentUser.id)
    deleteUser({id:iduser, usuario_modificacion:currentUser.id}).then(() => {
      //window.location.reload();
    })
  }
  const agregarNuevoObjeto = (piece, cancel) => {
    console.log("were " + cancel)
    if (cancel) cancelarObjeto();
  }

  const actualizarUsuario = (id, values, cancel) => {
    if (cancel) cancelarUsuario();

  }
  const actualizarNuevoObjeto = (id, values, cancel) => {
    if (cancel) cancelarObjeto();

  }

  const nuevoUsuario = () => {
    setDatos((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'formulario',
      usuarioSeleccionado: undefined
    }));
  }
  const nuevoObjeto = () => {
    setDatosp((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'formulario',
      objetoSeleccionado: undefined
    }));
  }

  const cancelarUsuario = () => {
    setDatos((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'lista',
      usuarioSeleccionado: undefined
    }));
  }
  const cancelarObjeto = () => {
    setDatosp((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'lista',
      objetoSeleccionado: undefined
    }));
  }
  return (
    <>
      <ExamplesNavbar activado={5} />
      <div className="section section-tabs">
        <Container>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Mensaje</ModalHeader>
            <ModalBody>
              ¿Desea eliminar el registro?
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={eliminarUser}>
                Aceptar
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
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
                        handleDelete={eliminarUsuario}
                        data={datos.data}
                      />}

                      {datos.ruta === 'formulario' && <UserForm
                        datos={datos}
                        valoresIniciales={valoresIniciales || {}}
                        handleSubmit={agregarNuevoUsuario}
                        handleUpdate={actualizarUsuario}
                      />}
                    </TabPane>
                    <TabPane tabId="link2">
                      {datosp.ruta === 'lista' && <ViewListPiece
                        nuevoObjeto={nuevoObjeto}
                        handleClick={seleccionObjeto}
                        data={datosp.data}
                      />}

                      {datosp.ruta === 'formulario' && <PieceForm
                        datos={datosp}
                        valoresInicialesp={valoresInicialesp || {}}
                        handleSubmit={agregarNuevoObjeto}
                        handleUpdate={actualizarNuevoObjeto}
                      />}
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
