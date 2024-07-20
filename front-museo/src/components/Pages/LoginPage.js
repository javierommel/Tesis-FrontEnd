import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { login, verifyTokenConfirmation } from 'actions/auth';
import { addUserGoogle } from "../../actions/user"
import { gapi } from 'gapi-script'
import {GoogleLogin} from 'react-google-login'
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
  const [response, setResponse] = useState("")
  const clienID = process.env.REACT_APP_CLIENTE_ID
  //const { token } = useParams();
  //const { search } = useLocation();
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    //console.log("token: " + token)
    if (token) {
      verifyTokenConfirmation(token).then(({ message, retcode }) => {
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
    }
    const start = () => {
      gapi.auth2.init({
        clienId: clienID
      })
      gapi.load("client:auth2", start)
    }
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
  const onDismiss = () => { dispatch({ type: CLEAR_MESSAGE }); setResponse("") }

  const dispatch = useDispatch();


  const onSubmit = (data) => {
    setLoading(true);
    dispatch(login(data.username, data.password, false))
      .then(() => {
        setLoading(false);
        setSuccessful(true);
        //navigate("/home");
        //window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);

      });
  };

  const onSuccess = (response) => {
    //console.log(response)
    verifyUserGoogle(response.profileObj)

  }
  const onFailure = () => {
    console.log("Algo salió mal")
  }
  const verifyUserGoogle = (usuario) => {
    try {
      setLoading(true);
      setSuccessful(false);
      const usuariogoogle = usuario.email
      //console.log("email: " + usuariogoogle)
      addUserGoogle(usuario.name, usuario.email, usuario.email, usuario.imageUrl)
        .then(({ message, retcode }) => {
          console.log(message)
          if (retcode === 0) {
            dispatch(login(usuariogoogle, "", true))
              .then(() => {
                localStorage.setItem("isGoogleLogin", true);
                setLoading(false);
                setSuccessful(true);
                //navigate("/home");
                //window.location.reload();
              })
              .catch(() => {
                setSuccessful(false);
                setLoading(false);
              });
            setResponse(message);
            setSuccessful(true);
            setLoading(false);
          }
          else {
            console.log(message)
            setResponse(message)
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

          <div className="content content-museo">
            <Container className='container-museo'>
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
                        <GoogleLogin
                          clientId={clienID}
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          cookiePolicy={"single_host_origin"}
                          isSignedIn={true}
                          render={renderProps => (
                            <Button className="btn btn-lg w-100" color="success" size="lg" onClick={renderProps.onClick} ><i className="fab fa-google" />&nbsp;&nbsp;&nbsp;Ingresar con Google</Button>
                          )}
                        />
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
        {(message !== "" || response !== "") && (
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
              {response === "" ? message : response}
            </span>
          </UncontrolledAlert>
        )}
        <Footer />
      </div>
    </>
  );
}
