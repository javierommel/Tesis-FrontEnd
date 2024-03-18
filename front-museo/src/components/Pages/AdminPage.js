import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "actions/message";
import UserForm from "../Settings/UserForm"
import ViewListUser from "../Settings/ViewListUser"
import PieceForm from "../Settings/PieceForm"
import PieceAddForm from "../Settings/PieceAddForm"
import GeneralForm from "../Settings/GeneralForm"
import ViewListPiece from "../Settings/ViewListPiece"
import ViewListComment from "../Settings/ViewListComment"
import { getUser, deleteUser, addUser, updateUser } from "../../actions/user"
import { getPiece, addPiece, updatePiece, deletePiece } from "../../actions/piece"
import { getCommentList, deleteComment, updateComment } from "../../actions/comment"
import { updateContent } from "../../actions/general"
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
  Button,
  UncontrolledAlert
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";
import Loader from "components/Utils/Loader.js"

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

  const [datosc, setDatosc] = useState({
    data: [],
    ruta: 'lista',
    comentarioSeleccionado: null,
    page: 1,
    pageSize: 10,
    tipo: [],
  })
  const valoresIniciales = datos.usuarioSeleccionado && datos.data.find(x => x.usuario === datos.usuarioSeleccionado)
  const valoresInicialesp = datosp.objetoSeleccionado && datosp.data.find(x => x.numero_ordinal === datosp.objetoSeleccionado)
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [iduser, setIduser] = useState("");
  const [idpiece, setIdpiece] = useState("");
  const [idcomment, setIdcomment] = useState("");
  const [activarcomment, setActivarComment] = useState(0);
  const [tipoupdate, setTipoupdate] = useState(0);
  const [mensajealert, setMensajealert] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const onDismiss = () => setResponse(null);

  useEffect(() => {
    getUser({ page: datos.page, pageSize: datos.pageSize }).then((dat) => {
      //console.log("rolesss: "+JSON.stringify(dat.data))
      setDatos((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        roles: dat.roles,
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
      });
    getPiece({ page: datosp.page, pageSize: datosp.pageSize }).then((dat) => {
      setDatosp((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        tipo: dat.tipo,
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
      });
    getCommentList({ page: datosc.page, pageSize: datosc.pageSize }).then((dat) => {
      //console.log("data: " + JSON.stringify(dat))
      setDatosc((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        tipo: dat.tipo,
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
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
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (currentUser) {
      //console.log("current: " + currentUser.roles)
      if (!currentUser.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/home" />;
      }
    } else {
      return <Navigate to="/home" />;
    }
  }, [currentUser]);


  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const seleccionUsuario = id => {
    //console.log("seleccion: " + id)
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
    if (cancel) { cancelarUsuario(); }
    else {
      try {
        const rol_array = [];
        setLoading(true);
        setSuccessful(false);
        //console.log(JSON.stringify(usuario))
        usuario.roles.map((check, index) => {
          if (index !== 0) {
            if (check) rol_array.push(datos.roles[index - 1].nombre)
          }
          return null;
        })
        addUser(usuario.name, usuario.username, usuario.email, usuario.password, usuario.country, usuario.year, currentUser.id, rol_array).then(({ message, retcode }) => {
          //console.log("asdf: " + message + " " + retcode)
          if (retcode === 0) {
            setResponse(message);
            localStorage.setItem('storedResponse', JSON.stringify(message));
            setSuccessful(true);
            setLoading(false);
            window.location.reload();
          }
          else {
            console.log(message)
            setResponse("Error al intentar guardar la información en el servidor")
            setSuccessful(false);
            setLoading(false);
          }
        }).catch((e) => {
          console.log(e.message)
          setResponse("Error al intentar guardar la información en el servidor")
          setSuccessful(false);
          setLoading(false);
        });
      }
      catch (e) {
        console.log(e.message)
        setResponse("Error al intentar guardar la información")
        setSuccessful(false);
        setLoading(false);
      }
    }
  }

  const eliminarUsuario = (usuario) => {
    setIduser(usuario)
    setMensajealert("¿Desea eliminar el registro?")
    setTipoupdate(0)
    toggle()
  }
  const eliminarComentario = (comentario) => {
    setTipoupdate(2)
    setIdcomment(comentario)
    setMensajealert("¿Desea eliminar el registro?")
    toggle()
  }
  const modificarComentario = (comentario, estado) => {
    setTipoupdate(3)
    setIdcomment(comentario)
    if (estado === 1) {
      setMensajealert("¿Desea desactivar el comentario?");
      setActivarComment(0);
    }
    else {
      setMensajealert("¿Desea activar el comentario?")
      setActivarComment(1);
    }
    toggle()
  }

  const modificarComment = () => {
    toggle()
    setLoading(true);
    setTimeout(() => {
      updateComment(idcomment, activarcomment, currentUser.id).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          localStorage.setItem('storedResponse', JSON.stringify(message));
          setSuccessful(true);
          setLoading(false);
          window.location.reload();
        }
        else {
          console.log(message)
          setResponse("Error al intentar actualizar el registro en el servidor")
          setSuccessful(false);
          setLoading(false);
        }
      })
    }, 2000);
  }
  const eliminarUser = () => {
    toggle()
    setLoading(true);
    setTimeout(() => {
      deleteUser({ id: idcomment, usuario_modificacion: currentUser.id }).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          localStorage.setItem('storedResponse', JSON.stringify(message));
          setSuccessful(true);
          setLoading(false);
          window.location.reload();
        }
        else {
          console.log(message)
          setResponse("Error al intentar borrar el registro en el servidor")
          setSuccessful(false);
          setLoading(false);
        }
      })
    }, 2000);
  }
  const eliminarComment = () => {
    toggle()
    setLoading(true);
    setTimeout(() => {
      deleteComment(iduser, currentUser.id).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          localStorage.setItem('storedResponse', JSON.stringify(message));
          setSuccessful(true);
          setLoading(false);
          window.location.reload();
        }
        else {
          console.log(message)
          setResponse("Error al intentar borrar el registro en el servidor")
          setSuccessful(false);
          setLoading(false);
        }
      })
    }, 2000);
  }
  const eliminarObjeto = (objeto) => {

    setIdpiece(objeto)
    setMensajealert("¿Desea eliminar el registro?")
    setTipoupdate(1)
    toggle()
  }

  const eliminarObjet = () => {
    toggle()
    setLoading(true);
    setTimeout(() => {
      deletePiece(idpiece, currentUser.id).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          localStorage.setItem('storedResponse', JSON.stringify(message));
          setSuccessful(true);
          setLoading(false);
          window.location.reload();
        }
        else {
          console.log(message)
          setResponse("Error al intentar borrar el registro en el servidor")
          setSuccessful(false);
          setLoading(false);
        }
      })
    }, 2000);
  }
  const agregarNuevoObjeto = (file, cancel) => {

    if (cancel) {
      cancelarObjeto();
    }
    else {
      setLoading(true);
      setTimeout(() => {
        addPiece(file).then(({ message, retcode }) => {
          if (retcode === 0) {
            setResponse(message);
            localStorage.setItem('storedResponse', JSON.stringify(message));
            setSuccessful(true);
            setLoading(false);
            window.location.reload();
          }
          else {
            console.log(message)
            setResponse("Error al intentar guardar los registros en el servidor")
            setSuccessful(false);
            setLoading(false);
          }
        })
      }, 2000);
    }
  }

  const actualizarUsuario = (id, values, cancel) => {
    if (cancel) { cancelarUsuario(); }
    else {
      const rol_array = [];
      setLoading(true);
      setSuccessful(false);
      values.roles.forEach((check, index) => {
        if (index !== 0 && check) {
          rol_array.push(datos.roles[index - 1].nombre);
        }
      });
      setTimeout(() => {
        updateUser(id, values, currentUser.id, rol_array).then(({ message, retcode }) => {
          if (retcode === 0) {
            setResponse(message);
            localStorage.setItem('storedResponse', JSON.stringify(message));
            setSuccessful(true);
            setLoading(false);
            window.location.reload();
          }
          else {
            console.log(message)
            setResponse("Error al intentar actualizar el registro en el servidor")
            setSuccessful(false);
            setLoading(false);
          }
        }).catch((e) => {
          console.log(e.message)
          setResponse("Error al intentar actualizar la información en el servidor")
          setSuccessful(false);
          setLoading(false);
        });
      }, 2000);
    }

  }
  const actualizarObjeto = (id, values, imagen1, imagen2, information, cancel) => {
    if (cancel) { cancelarObjeto(); }
    else {
      const materiales_array = [];
      const deterioros_array = [];
      setLoading(true);
      setSuccessful(false);
      values.materiales.forEach((check, index) => {
        if (index !== 0 && check) {
          materiales_array.push(information.material[index - 1].nombre);
        }
      });
      values.deterioros.forEach((check, index) => {
        if (index !== 0 && check) {
          deterioros_array.push(information.deterioration[index - 1].nombre);
        }
      });
      setTimeout(() => {
        updatePiece(id, values, currentUser.id, materiales_array, deterioros_array, imagen1, imagen2).then(({ message, retcode }) => {
          if (retcode === 0) {
            setResponse(message);
            localStorage.setItem('storedResponse', JSON.stringify(message));
            setSuccessful(true);
            setLoading(false);
            window.location.reload();
          }
          else {
            console.log(message)
            setResponse("Error al intentar actualizar el registro en el servidor")
            setSuccessful(false);
            setLoading(false);
          }
        }).catch((e) => {
          console.log(e.message)
          setResponse("Error al intentar actualizar la información en el servidor")
          setSuccessful(false);
          setLoading(false);
        });
      }, 2000);
    }

  }
  const updateContenido = (values, imagen1, imagen2, imagen3, imagen4, cancel) => {
    if (cancel) { cancelarObjeto(); }
    else {
      setLoading(true);
      setSuccessful(false);
      setTimeout(() => {
        updateContent(values, currentUser.id, imagen1, imagen2, imagen3, imagen4).then(({ message, retcode }) => {
          if (retcode === 0) {
            setResponse(message);
            localStorage.setItem('storedResponse', JSON.stringify(message));
            setSuccessful(true);
            setLoading(false);
            window.location.reload();
          }
          else {
            console.log(message)
            setResponse("Error al intentar actualizar el registro en el servidor")
            setSuccessful(false);
            setLoading(false);
          }
        }).catch((e) => {
          console.log(e.message)
          setResponse("Error al intentar actualizar la información en el servidor")
          setSuccessful(false);
          setLoading(false);
        });
      }, 2000);
    }

  }

  const nuevoUsuario = () => {
    //console.log("asdf");
    setDatos((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'formulario',
      usuarioSeleccionado: undefined
    }));
  }
  const nuevoObjeto = () => {
    setDatosp((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'formularion',
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
      <Loader loading={loading} />
      <ExamplesNavbar activado={5} />
      <div className="section section-tabs">
        <Container>
          <Modal isOpen={modal} toggle={toggle} modalClassName="modal-mini modal-info modal-mini" >
            <ModalHeader toggle={toggle} className="modal-header justify-content-center">
              <button className="close" onClick={toggle}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                <i className="tim-icons icon-alert-circle-exc" />
              </div></ModalHeader>
            <ModalBody>
              {mensajealert}
            </ModalBody>
            <ModalFooter>
              <Button className="btn-neutral"
                color="link" onClick={tipoupdate === 0 ? eliminarUser : (tipoupdate === 1 ? eliminarObjet : (tipoupdate === 2 ? eliminarComment : modificarComment))}>
                Aceptar
              </Button>{' '}
              <Button className="btn-neutral"
                color="link" onClick={toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
          <div className="title">
            <h3 className="mb-3"><br /></h3>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="12" xl="20">
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  Mantenimiento

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
                        onClick={(e) => { setIconsTabs(1); cancelarObjeto() }}
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
                        onClick={(e) => { setIconsTabs(2); cancelarUsuario() }}
                        href="#piezas"
                      >
                        <i className="tim-icons icon-settings-gear-63" />
                        Piezas
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: iconTabs === 3,
                        })}
                        onClick={(e) => { setIconsTabs(3); cancelarObjeto(); cancelarUsuario() }}
                        href="#comentarios"
                      >
                        <i className="tim-icons icon-paper" />
                        Comentarios
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: iconTabs === 4,
                        })}
                        onClick={(e) => { setIconsTabs(4); cancelarObjeto(); cancelarUsuario() }}
                        href="#general"
                      >
                        <i className="tim-icons icon-align-center" />
                        General
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
                        handleDelete={eliminarObjeto}
                        data={datosp.data}
                      />}

                      {datosp.ruta === 'formulario' && <PieceForm
                        datos={datosp}
                        valoresInicialesp={valoresInicialesp || {}}
                        handleUpdate={actualizarObjeto}
                      />}
                      {datosp.ruta === 'formularion' && <PieceAddForm
                        handleSubmit={agregarNuevoObjeto}
                      />}
                    </TabPane>
                    <TabPane tabId="link3">
                      {datosc.ruta === 'lista' && <ViewListComment
                        handleClick={modificarComentario}
                        handleDelete={eliminarComentario}
                        data={datosc.data}
                      />}
                    </TabPane>
                    <TabPane tabId="link4">
                      <GeneralForm
                        handleSubmit={updateContenido}
                      />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

          </Row>
          {response !== null && (
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
          )}
        </Container>
        <Footer />
      </div>

    </>
  );
}
