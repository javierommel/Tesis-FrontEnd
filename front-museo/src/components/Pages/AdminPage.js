import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "actions/message";
import UserForm from "./Settings/UserForm"
import ViewListUser from "./Settings/ViewListUser"
import PieceForm from "./Settings/PieceForm"
import PieceAddForm from "./Settings/PieceAddForm"
import GeneralForm from "./Settings/GeneralForm"
import ViewListPiece from "./Settings/ViewListPiece"
import ViewListComment from "./Settings/ViewListComment"
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
    total: 0,
    totalPages: 0,
    prevPage: 0,
    nextPage: 0,
    currentPage: 0,
  })

  const [datosp, setDatosp] = useState({
    data: [],
    ruta: 'lista',
    piezaSeleccionada: null,
    page: 1,
    pageSize: 10,
    tipo: [],
    total: 0,
    totalPages: 0,
    prevPage: 0,
    nextPage: 0,
    currentPage: 0,
  })

  const [datosc, setDatosc] = useState({
    data: [],
    ruta: 'lista',
    comentarioSeleccionado: null,
    page: 1,
    pageSize: 10,
    tipo: [],
    total: 0,
    totalPages: 0,
    prevPage: 0,
    nextPage: 0,
    currentPage: 0,
  })
  const navigate = useNavigate();
  const valoresIniciales = datos.usuarioSeleccionado && datos.data.find(x => x.usuario === datos.usuarioSeleccionado)
  const valoresInicialesp = datosp.objetoSeleccionado && datosp.data.find(x => x.numero_ordinal === datosp.objetoSeleccionado)
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUsuarioBoard, setShowUsuarioBoard] = useState(false);
  const [showAsistenteBoard, setShowAsistenteBoard] = useState(false);
  const [showDirectorBoard, setShowDirectorBoard] = useState(false);
  const [showCuradorBoard, setShowCuradorBoard] = useState(false);
  const [iconTabs, setIconsTabs] = useState(1);
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
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    if (currentUser) {
      setShowUsuarioBoard(currentUser.roles.includes("ROLE_USUARIO"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowDirectorBoard(currentUser.roles.includes("ROLE_DIRECTOR"));
      if (currentUser.roles.includes("ROLE_ASISTENTE")) {
        setShowAsistenteBoard(true);
        setIconsTabs(2)
      }
      if (currentUser.roles.includes("ROLE_CURADOR")) {
        setShowCuradorBoard(true);
        setIconsTabs(2)
      }
      if (currentUser.roles.includes("ROLE_DIRECTOR", "ROLE_ASISTENTE", "ROLE_CURADOR")) {
        navigate("/home");
        window.location.reload();
      }
    } else {
      navigate("/login-page");
      window.location.reload();
    }
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, [currentUser]);

  useEffect(() => {
    getUserTable(datos.page, datos.pageSize)
    getPieceTable(datosp.page, datosp.pageSize)
    getCommentTable(datosc.page, datosc.pageSize);
  }, [datos.page, datos.pageSize, datosc.page, datosc.pageSize, datosp.page, datosp.pageSize]);

  let location = useLocation();

  useEffect(() => {
    if (["/login-page", "/register-page"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  if (!currentUser) {
    return <Navigate to="/login-page" />;
  }
  const seleccionUsuario = id => {
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
  const getUserTable = (page, pageSize) => {
    getUser({ page: page, pageSize: pageSize }).then((dat) => {
      setDatos((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        roles: dat.roles,
        total: dat.total,
        totalPages: dat.totalPages,
        nextPage: dat.nextPage,
        prevPage: dat.prevPage,
        currentPage: dat.currentPage
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
      });
  }
  const getPieceTable = (page, pageSize) => {
    getPiece({ page, pageSize }).then((dat) => {
      setDatosp((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        tipo: dat.tipo,
        total: dat.total,
        totalPages: dat.totalPages,
        nextPage: dat.nextPage,
        prevPage: dat.prevPage,
        currentPage: dat.currentPage
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
      });
  }
  const getCommentTable = (page, pageSize) => {
    getCommentList({ page, pageSize }).then((dat) => {
      setDatosc((prevDatos) => ({
        ...prevDatos,         // Manteniendo las propiedades existentes
        data: dat.data,    // Actualizando solo la propiedad 'data'
        tipo: dat.tipo,
        total: dat.total,
        totalPages: dat.totalPages,
        nextPage: dat.nextPage,
        prevPage: dat.prevPage,
        currentPage: dat.currentPage
      }));

    })
      .catch((error) => {
        console.log("error" + error.message)
        setLoading(false);
      })
  }
  const agregarNuevoUsuario = (usuario, cancel) => {
    if (cancel) { cancelarUsuario(); }
    else {
      try {
        const rol_array = [];
        setLoading(true);
        setSuccessful(false);
        usuario.roles.map((check, index) => {
          if (index !== 0) {
            if (check) rol_array.push(datos.roles[index - 2].nombre)
          }
          return null;
        })
        addUser(usuario.name, usuario.username, usuario.email, usuario.password, usuario.country, usuario.year, currentUser.id, rol_array).then(({ message, retcode }) => {
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
          setSuccessful(true);
          setLoading(false);
          getCommentTable(datosc.page, datosc.pageSize)
          cancelarComentario()
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
      deleteUser(iduser, currentUser.id).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          setSuccessful(true);
          setLoading(false);
          getUserTable(datos.page, datos.pageSize)
          cancelarUsuario()
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
      deleteComment(idcomment, currentUser.id).then(({ message, retcode }) => {
        if (retcode === 0) {
          setResponse(message);
          setSuccessful(true);
          setLoading(false);
          getCommentTable(datosc.page, datosc.pageSize)
          cancelarComentario()
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
          setSuccessful(true);
          setLoading(false);
          getPieceTable(datosp.page, datosp.pageSize)
          cancelarObjeto()
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
            setSuccessful(true);
            setLoading(false);
            getPieceTable(datosp.page, datosp.pageSize)
            cancelarObjeto()
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
          rol_array.push(datos.roles[index - 2].nombre);
        }
      });
      setTimeout(() => {
        updateUser(id, values, currentUser.id, rol_array).then(({ message, retcode }) => {
          if (retcode === 0) {
            setResponse(message);
            setSuccessful(true);
            setLoading(false);
            getUserTable(datos.page, datos.pageSize)
            cancelarUsuario()
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
            setSuccessful(true);
            setLoading(false);
            getPieceTable(datosp.page, datosp.pageSize)
            cancelarObjeto()
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
            setSuccessful(true);
            setLoading(false);
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
  const cancelarComentario = () => {
    setDatosc((prevDatos) => ({
      ...prevDatos,         // Manteniendo las propiedades existentes
      ruta: 'lista',
      objetoSeleccionado: undefined
    }));
  }
  return (
    <>
      <Loader loading={loading} />
      <ExamplesNavbar activado={5} />
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
            <Modal isOpen={modal} toggle={toggle} modalClassName="modal-mini modal-info modal-mini" >
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
            </Modal>
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
                      {(showAdminBoard || showDirectorBoard) && (
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
                      )}
                      {(showAdminBoard || showDirectorBoard || showCuradorBoard) && (
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
                      )}
                      {(!showUsuarioBoard) && (
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
                      )}
                      {(!showUsuarioBoard) && (
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
                      )}
                    </Nav>
                  </CardHeader>
                  <CardBody>
                    <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                      {(showAdminBoard || showDirectorBoard) && (
                        <TabPane tabId="link1">
                          {datos.ruta === 'lista' && <ViewListUser
                            nuevoUsuario={nuevoUsuario}
                            handleClick={seleccionUsuario}
                            handleDelete={eliminarUsuario}
                            getUserTable={getUserTable}
                            data={datos.data}
                            datat={{ currentPage: datos.currentPage, total: datos.total, totalPages: datos.totalPages, nextPage: datos.nextPage, prevPage: datos.prevPage }}
                          />}

                          {datos.ruta === 'formulario' && <UserForm
                            datos={datos}
                            valoresIniciales={valoresIniciales || {}}
                            handleSubmit={agregarNuevoUsuario}
                            handleUpdate={actualizarUsuario}
                          />}
                        </TabPane>
                      )}
                      {(showAdminBoard || showDirectorBoard || showCuradorBoard) && (
                        <TabPane tabId="link2">
                          {datosp.ruta === 'lista' && <ViewListPiece
                            nuevoObjeto={nuevoObjeto}
                            handleClick={seleccionObjeto}
                            handleDelete={eliminarObjeto}
                            getPieceTable={getPieceTable}
                            datat={{ currentPage: datosp.currentPage, total: datosp.total, totalPages: datosp.totalPages, nextPage: datosp.nextPage, prevPage: datosp.prevPage }}
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
                      )}
                      {(!showUsuarioBoard) && (
                        <TabPane tabId="link3">
                          {datosc.ruta === 'lista' && <ViewListComment
                            handleClick={modificarComentario}
                            handleDelete={eliminarComentario}
                            getCommentTable={getCommentTable}
                            data={datosc.data}
                            datat={{ currentPage: datosc.currentPage, total: datosc.total, totalPages: datosc.totalPages, nextPage: datosc.nextPage, prevPage: datosc.prevPage }}
                          />}
                        </TabPane>
                      )}
                      {(!showUsuarioBoard) && (
                        <TabPane tabId="link4">
                          <GeneralForm
                            handleSubmit={updateContenido}
                          />
                        </TabPane>
                      )}
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
        </div>
        <Footer />
      </div>

    </>
  );
}
