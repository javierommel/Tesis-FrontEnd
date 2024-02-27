import React, { useEffect, useRef, useState } from "react";

import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm, Controller } from 'react-hook-form';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { getUserId, updateUser } from "../../actions/user"
import { getCountry } from "../../actions/general"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/PrincipalNavbar.js";
import Footer from "components/Footer/Footer.js";
import Loader from "components/PageHeader/Loader.js"

let ps = null;

export default function ProfilePage() {
  const [datos, setDatos] = useState({})
  const [country, setCountry] = useState([]);
  const { handleSubmit, control, watch, formState: { errors } } = useForm();
  const anioActual = new Date().getFullYear();
  const [passwordUpdate, setPasswordUpdate] = useState(true);
  const [image, setImage] = useState(require("assets/img/mike.jpg"));
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const inputRef = useRef();
  // Crear un array con los últimos 80 años
  const anios = Array.from({ length: 80 }, (_, index) => anioActual - index);

  useEffect(() => {

    getUserId(currentUser.id).then((dat) => {
      setDatos(dat.data);
      console.log("asdf1: " + JSON.stringify(datos.nombre))

    }).catch((error) => {
      console.log("error" + error.message)
    });

    getCountry().then((dat) => {
      setCountry(dat.data);
    }).catch((error) => {
      console.log("error" + error.message)
    });

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);

  console.log("user: " + JSON.stringify(currentUser))
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateNacionalidad = (value) => {
    return value !== "0" || 'El pais es obligatorio.';
  };
  const TogglePassword = () => {
    setPasswordUpdate(!passwordUpdate);
  };
  const onSubmit = (data) => {
    updateUser(currentUser.id, data, currentUser.id).then(({ message, retcode }) => {
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
    }).catch((e) => {
      console.log(e.message)
      setResponse("Error al intentar actualizar la información en el servidor")
      setSuccessful(false);
      setLoading(false);
    });
  }
  return (
    <>
    <Loader loading={loading} />
      <ExamplesNavbar activado={3} />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  {/*<CardHeader>
                    <h1 className="profile-title text-left">Perfil</h1>
                    <h5 className="text-on-back">01</h5>
  </CardHeader>*/}
                  <CardBody>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col md="6">
                          <Controller
                            name="username"
                            control={control}
                            defaultValue={currentUser.id}
                            rules={{ required: 'El usuario es obligatorio.' }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Usuario</label>
                                <Input {...field} type="text" disabled />
                                {errors.username && <div className="typography-line"><p className="text-danger">{errors.username.message}</p></div>}
                              </FormGroup>
                            )}
                          />
                        </Col>
                        <Col md="6">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue={datos.email}
                            rules={{ required: 'El email es obligatorio.' }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Email</label>
                                <Input {...field} type="email" disabled />
                                {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                              </FormGroup>
                            )}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Controller
                            name="name"
                            control={control}
                            defaultValue={datos.nombre}
                            rules={{ required: 'El email es obligatorio.' }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Nombre Completo</label>
                                <Input {...field} type="text" />
                                {errors.name && <div className="typography-line"><p className="text-danger">{errors.name.message}</p></div>}
                              </FormGroup>
                            )}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Controller
                            name="year"
                            control={control}
                            defaultValue={datos.fnacimiento}
                            rules={{
                              required: 'El año de nacimiento es obligatorio.',
                              validate: validateNacionalidad
                            }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Año Nacimiento</label>
                                <Input {...field} type="select" >
                                  <option style={{ color: '#434444' }} key={0} disabled value="0">
                                    Año Nacimiento
                                  </option>
                                  {anios.map((step) => (
                                    <option style={{ color: '#2b3553' }} key={step} value={step}>{step}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                            )}
                          />
                        </Col>
                        <Col md="6">
                          <Controller
                            name="country"
                            control={control}
                            defaultValue={datos.pais}
                            rules={{
                              required: 'La nacionalidad es obligatorio.',
                              validate: validateNacionalidad
                            }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Nacionalidad</label>
                                <Input {...field} type="select">
                                  <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                                    Nacionalidad
                                  </option>
                                  {country.map((step) => (
                                    <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                            )}
                          />
                        </Col>
                      </Row>
                      <Button
                        className="btn btn-lg w-100 float-right"
                        color="info"
                        data-placement="right"
                        type="button"
                        onClick={TogglePassword}
                      >
                        {passwordUpdate ? "Cambiar Password" : "No Cambiar Password"}
                      </Button>
                      <Row>
                        <Col md="6">
                          <Controller
                            name="password"
                            control={control}
                            defaultValue={""}
                            rules={{ required: 'El email es obligatorio.' }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Password</label>
                                <Input {...field} disabled={passwordUpdate} type="password" />
                              </FormGroup>
                            )}
                          />
                        </Col>
                        <Col md="6">
                          <Controller
                            name="password2"
                            control={control}
                            defaultValue={""}
                            rules={{ required: 'El email es obligatorio.' }}
                            render={({ field }) => (
                              <FormGroup>
                                <label>Repetir-Password</label>
                                <Input {...field} disabled={passwordUpdate} type="password" />
                              </FormGroup>
                            )}
                          />
                        </Col>
                      </Row>
                      <Button
                        className="btn btn-lg w-100 float-right"
                        color="info"
                        data-placement="right"
                        type="submit"
                      >
                        Guardar
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={image}
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                  </CardHeader>
                  <CardBody>
                    <Button
                      onClick={() => {
                        console.log(inputRef);
                        inputRef.current.click();
                      }}
                      className="btn btn-lg w-100"
                    >
                      Subir foto
                    </Button>
                    <input ref={inputRef} type="file" onChange={handleImageChange} hidden />
                  </CardBody>
                </Card>
                    </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
