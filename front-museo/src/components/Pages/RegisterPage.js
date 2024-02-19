import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useForm, Controller } from 'react-hook-form';
import { getCountry } from "../../actions/general"
//import { isEmail } from "validator";

import { register } from "actions/auth";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Input,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [userFocus, setUserFocus] = React.useState(false);
  const [countryFocus, setCountryFocus] = React.useState(false);
  const [yearFocus, setYearFocus] = React.useState(false);
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [password2Focus, setPassword2Focus] = React.useState(false);
  const [country, setCountry] = useState([]);
  const anioActual = new Date().getFullYear();
  // Crear un array con los últimos 80 años
  const anios = Array.from({ length: 80 }, (_, index) => anioActual - index);

  React.useEffect(() => {
    getCountry().then((dat) => {
      setCountry(dat.data);
      //console.log("dat " + dat)
    })
      .catch((error) => {
        console.log("error" + error.message)
        //setLoading(false);
      });
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)"
    );
  };
  const { handleSubmit, control, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    //e.preventDefault();

    setSuccessful(false);

    //form.current.validateAll();

    //if (checkBtn.current.context._errors.length === 0) {
    dispatch(register(data.name, data.username, data.email, data.password, data.country, data.year))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    //}
  };
  const password = watch('password', '');
  const validatePassword = (value) => {
    console.log("value: " + value)
    console.log("password: " + password)
    return value === password || 'El password ingresado no coincide';
  };
  const validateNacionalidad = (value) => {
    return value !== "0" || 'El pais es obligatorio.';
  };

  const validateEdad = (value) => {
    return value !== "0" || 'El año de nacimiento es obligatorio.';
  };

  return (
    <>
      <IndexNavbar activado={3} />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col />
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">Registro</CardTitle>
                    </CardHeader>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                      {!successful && (<>
                        <CardBody>
                          <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'El nombre de usuario es obligatorio.' }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": userFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-single-02" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Usuario"
                                    type="text"
                                    onFocus={(e) => setUserFocus(true)}
                                    onBlur={(e) => setUserFocus(false)}
                                  />
                                </InputGroup>
                                {errors.username && <div className="typography-line"><p className="text-danger">{errors.username.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'El nombre completo es obligatorio.' }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": fullNameFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-badge" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Nombre Completo"
                                    type="text"
                                    onFocus={(e) => setFullNameFocus(true)}
                                    onBlur={(e) => setFullNameFocus(false)}
                                  />
                                </InputGroup>
                                {errors.name && <div className="typography-line"><p className="text-danger">{errors.name.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'El email es obligatorio.' }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": emailFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-email-85" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Email"
                                    type="text"
                                    onFocus={(e) => setEmailFocus(true)}
                                    onBlur={(e) => setEmailFocus(false)}
                                  />
                                </InputGroup>
                                {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: 'El password es obligatorio.',
                            }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": passwordFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-lock-circle" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Password"
                                    type="password"
                                    onFocus={(e) => setPasswordFocus(true)}
                                    onBlur={(e) => setPasswordFocus(false)}
                                  />
                                </InputGroup>
                                {errors.password && <div className="typography-line"><p className="text-danger">{errors.password.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="password2"
                            control={control}
                            defaultValue=""
                            rules={{
                              validate: validatePassword,
                              required: 'El password es obligatorio.'
                            }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": password2Focus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-lock-circle" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Repetir Password"
                                    type="password"
                                    onFocus={(e) => setPassword2Focus(true)}
                                    onBlur={(e) => setPassword2Focus(false)}
                                  />
                                </InputGroup>
                                {errors.password2 && <div className="typography-line"><p className="text-danger">{errors.password2.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="country"
                            control={control}
                            defaultValue="0"
                            rules={{ validate: validateNacionalidad }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": countryFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-planet" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    placeholder="Nacionalidad"
                                    type="select"
                                    onFocus={(e) => setCountryFocus(true)}
                                    onBlur={(e) => setCountryFocus(false)}
                                    style={{ color: '#6c757d' }}
                                  >
                                    <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                                      Nacionalidad
                                    </option>
                                    {country.map((step) => (
                                      <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                                    ))}
                                  </Input>
                                </InputGroup>
                                {errors.country && <div className="typography-line"><p className="text-danger">{errors.country.message}</p></div>}
                              </>
                            )}
                          />
                          <Controller
                            name="year"
                            control={control}
                            defaultValue="0"
                            rules={{
                              required: 'El año de nacimiento es obligatorio.',
                              validate: validateEdad
                            }}
                            render={({ field }) => (
                              <>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": yearFocus,
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-calendar-60" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    {...field}
                                    color="primary"
                                    placeholder="Año de Nacimiento"
                                    type="select"
                                    onFocus={(e) => setYearFocus(true)}
                                    onBlur={(e) => setYearFocus(false)}
                                    style={{ color: '#6c757d' }}
                                  >
                                    <option style={{ color: '#434444' }} key={0} disabled value="0">
                                      Año Nacimiento
                                    </option>
                                    {anios.map((step) => (
                                      <option style={{ color: '#2b3553' }} key={step} value={step}>{step}</option>
                                    ))}
                                  </Input>
                                </InputGroup>
                                {errors.year && <div className="typography-line"><p className="text-danger">{errors.year.message}</p></div>}
                              </>
                            )}
                          />

                        </CardBody>
                        <CardFooter>
                          <Button className="btn btn-lg w-100" size="lg" disabled={loading} type="submit">
                            Registrar
                          </Button>
                        </CardFooter>
                      </>)}
                      {message && (
                        <div className="form-group">
                          <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                          </div>
                        </div>
                      )}
                    </Form>
                  </Card>
                </Col>
                <Col />
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
