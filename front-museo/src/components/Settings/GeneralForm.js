import React, { useRef, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { getContent } from "../../actions/general"
import classnames from "classnames";
import { labelStyle } from '../../assets/styles/style'
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

export default function GeneralForm(props) {
  const [datos, setDatos] = useState(false);
  const [tituloFocus, setTituloFocus] = useState(false);
  const [contenidoFocus, setContenidoFocus] = useState(false);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);
  const [imagen4, setImagen4] = useState(null);
  const imagen1Ref = useRef();
  const imagen2Ref = useRef();
  const imagen3Ref = useRef();
  const imagen4Ref = useRef();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImage3Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen3(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImage4Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen4(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const toBlob = (image) => {
    const uint8Array1 = image ? new Uint8Array(image) : null;
    const blob1 = uint8Array1 ? new Blob([uint8Array1]) : null;
    return blob1 ? URL.createObjectURL(blob1) : null;
  }
  useEffect(() => {
    getContent().then((dat) => {
      setDatos(dat.data[0]);
      setImagen1(toBlob(dat.data.imagen1));
      setImagen2(toBlob(dat.data.imagen2));
      setImagen3(toBlob(dat.data.imagen3));
      setImagen4(toBlob(dat.data.imagen4));
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
  }, []);

  const onSubmit = (data) => {
    props.handleSubmit(data, imagen1, imagen2, imagen3, imagen4, false)
  }
  const onCancelar = () => {
    props.handleSubmit(null, null, null, null, null, true)
  }

  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {<>
          <CardBody>
            <Row>
              <Col lg="6" md="6">
                <Controller
                  name="titulo"
                  control={control}
                  defaultValue={datos.titulo}
                  rules={{ required: 'El titulo es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": tituloFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-paper" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Titulo"
                          type="text"
                          onFocus={(e) => setTituloFocus(true)}
                          onBlur={(e) => setTituloFocus(false)}
                        />
                      </InputGroup>
                      {errors.titulo && <div className="typography-line"><p className="text-danger">{errors.titulo.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" md="6"></Col>
              <Col lg="6" md="6">
                <Controller
                  name="contenido"
                  control={control}
                  defaultValue={datos.contenido}
                  rules={{ required: 'El contenido es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": contenidoFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-paper" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Contenido"
                          type="textarea"
                          rows="5"
                          onFocus={(e) => setContenidoFocus(true)}
                          onBlur={(e) => setContenidoFocus(false)}
                        />
                      </InputGroup>
                      {errors.contenido && <div className="typography-line"><p className="text-danger">{errors.contenido.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" md="6"></Col>
              <Col lg="6" >
                <InputGroupText style={labelStyle} >
                  Imagen1
                </InputGroupText>
                <img
                  alt="   Seleccione una imagen..."
                  className="img-center img-fluid"
                  src={imagen1}
                  style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                  onClick={() => {
                    imagen1Ref.current.click();
                  }}
                />
                <input ref={imagen1Ref} type="file" onChange={handleImage1Change} hidden />
                <br />
              </Col>
              <Col lg="6" >
                <InputGroupText style={labelStyle} >
                  Imagen2
                </InputGroupText>
                <img
                  alt="   Seleccione una imagen..."
                  className="img-center img-fluid"
                  src={imagen2}
                  style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                  onClick={() => {
                    imagen2Ref.current.click();
                  }}
                />
                <input ref={imagen2Ref} type="file" onChange={handleImage2Change} hidden />
                <br />
              </Col>
              <Col lg="6" >
                <InputGroupText style={labelStyle} >
                  Imagen3
                </InputGroupText>
                <img
                  alt="   Seleccione una imagen..."
                  className="img-center img-fluid"
                  src={imagen3}
                  style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                  onClick={() => {
                    imagen3Ref.current.click();
                  }}
                />
                <input ref={imagen3Ref} type="file" onChange={handleImage3Change} hidden />
                <br />
              </Col>
              <Col lg="6" >
                <InputGroupText style={labelStyle} >
                  Imagen4
                </InputGroupText>
                <img
                  alt="   Seleccione una imagen..."
                  className="img-center img-fluid"
                  src={imagen4}
                  style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                  onClick={() => {
                    imagen4Ref.current.click();
                  }}
                />
                <input ref={imagen4Ref} type="file" onChange={handleImage4Change} hidden />
                <br />
              </Col>

            </Row>
          </CardBody>
          <CardFooter>
            <Button color="info" size="sm" type="submit">
              Guardar
            </Button>
            <Button color="warning" size="sm" onClick={onCancelar}>
              Cancelar
            </Button>
          </CardFooter>
        </>}
      </Form>
    </div>

  )
}
