import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { login } from 'actions/auth';
import { auth, provider } from "../../variables/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { CLEAR_MESSAGE } from "actions/types"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Loader from "components/Utils/Loader.js"
import eye from 'assets/img/eye.ico';

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    dispatch({ type: CLEAR_MESSAGE })
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
  let navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const onDismiss = () => dispatch({ type: CLEAR_MESSAGE });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(login(data.username, data.password))
      .then(() => {
        setLoading(false);
        setSuccessful(true);
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);

      });
  };
  const signGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      const credential = GoogleAuthProvider.credentialFromResult(data);
      console.log("asfasf: " + JSON.stringify(credential))
      console.log(data.user.email);
    });
  }
  const handleMouseDown = () => {
    // Muestra la contraseña cuando se mantiene presionado el ojo
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    // Oculta la contraseña cuando se suelta el ojo
    setShowPassword(false);
  };
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <Loader loading={loading} />
      <IndexNavbar activado={2} />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col />
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">

                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square2.png")}
                      />
                      <CardTitle tag="h2">Ingresar</CardTitle>
                    </CardHeader>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)} >
                      <CardBody>
                        <Button className="btn btn-lg w-100" color="success" size="lg" onClick={signGoogle}>
                          <i className="fab fa-google" />&nbsp;&nbsp;&nbsp;
                          Ingresar con Google
                        </Button>
                        <div className="sso-divider">
                          <span>O</span>
                        </div>
                        <Controller
                          name="username"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'El nombre de usuario es obligatorio.' }}
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
                                  placeholder="Usuario o Email"
                                  type="text"
                                  onFocus={(e) => {
                                    setEmailFocus(true)
                                    dispatch({ type: CLEAR_MESSAGE })
                                  }}
                                  onBlur={(e) => setEmailFocus(false)}
                                />
                              </InputGroup>
                              {errors.username && <div className="typography-line"><p className="text-danger">{errors.username.message}</p></div>}

                            </>
                          )}
                        />
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'El password es obligatorio.' }}
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
                                  type={showPassword ? 'text' : 'password'}
                                  onFocus={(e) => {
                                    setPasswordFocus(true)
                                    dispatch({ type: CLEAR_MESSAGE })
                                  }}
                                  onBlur={(e) => setPasswordFocus(false)}
                                  style={{
                                    borderRight: 'none',
                                    borderTopRightRadius: 0, // Sin border radius en la esquina derecha
                                    borderBottomRightRadius: 0, // Sin border radius en la esquina derecha
                                  }}
                                />
                                <InputGroupAddon addonType="append"
                                  style={{ borderLeft: 'none', }}
                                >
                                  <InputGroupText
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <img src={eye} style={{ width: '16px' }} />
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                              {errors.password && <div className="typography-line"><p className="text-danger">{errors.password.message}</p></div>}
                            </>
                          )}
                        />
                      </CardBody>
                      <CardFooter>
                        <Button className="btn btn-lg w-100" color="info" size="lg" disabled={loading} type="submit">
                          {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          Ingresar
                        </Button>
                        <div style={{ textAlign: 'center' }}>
                          <h5>¿No tiene cuenta? <Link to="/register-page">Regístrese</Link></h5>
                        </div>
                      </CardFooter>
                    </Form>
                  </Card>
                </Col>
                <Col />
              </Row>
              <div className="register-bg" />
            </Container>
          </div>
        </div>
        {message !== "" && (
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
              {message}
            </span>
          </UncontrolledAlert>
        )}
        <Footer />
      </div>
    </>
  );
}
