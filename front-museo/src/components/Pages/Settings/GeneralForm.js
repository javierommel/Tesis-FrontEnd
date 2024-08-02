import React, { useRef, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { getContent } from "../../../actions/general"
import classnames from "classnames";
import { labelStyle, labelStyle2 } from '../../../assets/styles/style'
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
  const [nrocomentarioFocus, setNroComentarioFocus] = useState(false);
  const [contenidoFocus, setContenidoFocus] = useState(false);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);
  const [imagen4, setImagen4] = useState(null);
  const [cargaimagen1, setCargaimagen1] = useState(false);
  const [cargaimagen2, setCargaimagen2] = useState(false);
  const [cargaimagen3, setCargaimagen3] = useState(false);
  const [cargaimagen4, setCargaimagen4] = useState(false);
  const imagen1Ref = useRef();
  const imagen2Ref = useRef();
  const imagen3Ref = useRef();
  const imagen4Ref = useRef();

  const { handleSubmit, control, formState: { errors } } = useForm();

  const handleImage1Change = (e) => {
    setCargaimagen1(true)
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
    setCargaimagen2(true)
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
    setCargaimagen3(true)
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
    setCargaimagen4(true)
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
      setDatos(dat.data.general[0]);
      setDatos(dat.data.general[0]);
      setImagen1(toBlob(dat.data.general[0].imagen1.data));
      setImagen2(toBlob(dat.data.general[0].imagen2.data));
      setImagen3(toBlob(dat.data.general[0].imagen3.data));
      setImagen4(toBlob(dat.data.general[0].imagen4.data));
    })
      .catch((error) => {
        console.error("Error: " + error.message)
      });
  }, []);

  const onSubmit = (data) => {
    props.handleSubmit(data, cargaimagen1 ? imagen1 : null, cargaimagen2 ? imagen2 : null, cargaimagen3 ? imagen3 : null, cargaimagen4 ? imagen4 : null, false)
  }
  const onCancelar = () => {
    props.handleSubmit(null, null, null, null, null, true)
  }

  return (
    <div>
      {datos && (
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          {<>
            <CardBody>
              <Row>
                <Col lg="6" md="6">
                  <Controller
                    name="nrocomentarios"
                    control={control}
                    defaultValue={datos ? datos.nrocomentarios : 5}
                    rules={{ required: 'El número de comentarios es obligatorio.' }}
                    render={({ field }) => (
                      <>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": nrocomentarioFocus,
                          })}
                        >
                          <InputGroupText style={labelStyle} >
                            Nro. Com
                          </InputGroupText>
                          <Input
                          {...field}
                          type="select"
                          onFocus={(e) => setNroComentarioFocus(true)}
                          onBlur={(e) => setNroComentarioFocus(false)}
                          style={{ color: '#ffffff'}}
                        >
                          {[5, 10, 15, 20].map(nrocomment => (
                              <option style={{ color: '#2b3553' }} key={nrocomment} value={nrocomment}>
                                {nrocomment}
                              </option>
                            ))}
                        </Input>
                        </InputGroup>
                        {errors.nrocomentario && <div className="typography-line"><p className="text-danger">{errors.nrocomentario.message}</p></div>}
                      </>
                    )}
                  />
                </Col>
                <Col lg="6" md="6"></Col>
                <Col lg="6" md="6">
                  <Controller
                    name="titulo"
                    control={control}
                    defaultValue={datos ? datos.titulo : ""}
                    rules={{ required: 'El titulo es obligatorio.' }}
                    render={({ field }) => (
                      <>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": tituloFocus,
                          })}
                        >
                          <InputGroupText style={labelStyle} >
                            Titulo
                          </InputGroupText>
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
                    defaultValue={datos ? datos.contenido : ""}
                    rules={{ required: 'El contenido es obligatorio.' }}
                    render={({ field }) => (
                      <>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": contenidoFocus,
                          })}
                        >
                          <InputGroupText style={labelStyle} >
                            Contenido
                          </InputGroupText>
                          <Input
                            {...field}
                            placeholder="Contenido"
                            type="textarea"
                            rows="4"
                            onFocus={(e) => setContenidoFocus(true)}
                            onBlur={(e) => setContenidoFocus(false)}
                          />
                        </InputGroup>
                        {errors.contenido && <div className="typography-line"><p className="text-danger">{errors.contenido.message}</p></div>}
                      </>
                    )}
                  />
                  <br />
                </Col>
                <Col lg="6" md="6"></Col>
                <Col lg="6" >
                  <InputGroupText style={labelStyle2} >
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
                  <InputGroupText style={labelStyle2} >
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
                  <InputGroupText style={labelStyle2} >
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
                  <InputGroupText style={labelStyle2} >
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
        </Form>)}
    </div>

  )
}
