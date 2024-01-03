import React, {useRef, useState} from "react";
import classnames from "classnames";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
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


let ps = null;

export default function ProfilePage() {
  const inputRef = useRef();
  const [image, setImage] = useState(require("assets/img/mike.jpg"));
  React.useEffect(() => {
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
  const { user: currentUser } = useSelector((state) => state.auth);
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

  return (
    <>
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
                  <CardHeader>
                    <h1 className="profile-title text-left">Perfil</h1>
                    <h5 className="text-on-back">01</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Nombre Completo</label>
                            <Input defaultValue="Mike" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email</label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Password</label>
                            <Input defaultValue="001-12321345" type="password" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Repetir-Password</label>
                            <Input defaultValue="CreativeTim" type="password" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn btn-lg w-100 float-right"
                        color="info"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
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
                      //src={require("assets/img/mike.jpg")}
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                  </CardHeader>
                  <CardBody>
                    {/*<Button
                      className="btn btn-lg w-100"
                      color="info"
                      type="file"
                    >
                      Subir foto
                    </Button>*/}
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
