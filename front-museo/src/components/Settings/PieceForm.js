import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getInformationPiece } from "../../actions/piece"
import classnames from "classnames";
import { labelStyle, titleStyle } from '../../assets/styles/style'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Form,
  FormGroup,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  CustomInput
} from "reactstrap";


export default function PieceForm(props) {
  const [information, setInformation] = useState(false);
  const [codigoinpcFocus, setCodigoinpcFocus] = useState(false);
  const [numeroordinalFocus, setNumeroOrdinalFocus] = useState(false);
  const [numerohistoricoFocus, setNumeroHistoricoFocus] = useState(false);
  const [nombreFocus, setNombreFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [typeFocus, setTypeFocus] = useState(false);
  const [password2Focus, setPassword2Focus] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const [tipoOpen, setTipoOpen] = useState(false);
  const toggle = () => setTipoOpen((prevState) => !prevState);
  const handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })

  }
  const onSubmit = (data) => {
    setLoading(true);
    if (valoresInicialesp.id) {
      props.handleUpdate(valoresInicialesp.id, data, false)
    } else {
      props.handleSubmit(data, false)
    }
  }
  const onCancelar = () => {
    setLoading(false);
    //console.log("as " + props.valoresInicialesp.id)
    if (valoresInicialesp.id) {
      props.handleUpdate(valoresInicialesp.id, null, true)
    } else {
      props.handleSubmit(null, true)
    }
  }

  useEffect(() => {

    getInformationPiece().then((dat) => {
      console.log("inf; " + JSON.stringify(dat.data))
      setInformation(dat.data);
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
  }, []);

  const { valoresInicialesp } = props
  const materialesSeleccionados = valoresInicialesp.materiales && valoresInicialesp.materiales.split(',').map(material => parseInt(material.trim()));
  const deteriorosSeleccionados = valoresInicialesp.deterioros && valoresInicialesp.deterioros.split(',').map(deterioro => parseInt(deterioro.trim()));

  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {!successful && (<>
          <CardBody>
            <Row>
              <Col lg="6" md="6">
                <br />
                <Controller
                  name="estado"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <>
                      <CustomInput
                        {...field}
                        type="switch"
                        id="switch-2"
                        label={field.value ? 'Activado' : 'Desactivado'}
                        checked={field.value}
                      />
                    </>
                  )}
                />
                <br />
              </Col>
              <Col lg="6" md="6">
              </Col>
              <Col lg="6" >
                <Controller
                  name="numero_ordinal"
                  control={control}
                  defaultValue={valoresInicialesp.numero_ordinal}
                  rules={{ required: 'El nombre de usuario es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup disabled
                        className={classnames({
                          "input-group-focus": numeroordinalFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Id
                        </InputGroupText>
                        <Input disabled
                          {...field}
                          placeholder="Numero Ordinal"
                          type="text"
                          onFocus={(e) => setNumeroOrdinalFocus(true)}
                          onBlur={(e) => setNumeroOrdinalFocus(false)}
                        />
                      </InputGroup>
                      {errors.numero_ordinal && <div className="typography-line"><p className="text-danger">{errors.numero_ordinal.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6">
                <Controller
                  name="codigo_inpc"
                  control={control}
                  defaultValue={valoresInicialesp.codigo_inpc}
                  rules={{ required: 'El codigo INPC es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": codigoinpcFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          INPC
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Código INPC"
                          type="text"
                          onFocus={(e) => setCodigoinpcFocus(true)}
                          onBlur={(e) => setCodigoinpcFocus(false)}
                        />
                      </InputGroup>
                      {errors.codigo_inpc && <div className="typography-line"><p className="text-danger">{errors.codigo_inpc.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="numero_historico"
                  control={control}
                  defaultValue={valoresInicialesp.numero_historico}
                  rules={{ required: 'El numero histórico del Museo es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": numerohistoricoFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Código
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Código del Museo"
                          type="text"
                          onFocus={(e) => setNumeroHistoricoFocus(true)}
                          onBlur={(e) => setNumeroHistoricoFocus(false)}
                        />
                      </InputGroup>
                      {errors.numero_historico && <div className="typography-line"><p className="text-danger">{errors.numero_historico.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="tipo_bien"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'El tipo de bien es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": typeFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Tipo
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Tipo Pieza"
                          type="select"
                          onFocus={(e) => setTypeFocus(true)}
                          onBlur={(e) => setTypeFocus(false)}
                          style={{ color: '#ffffff' }}
                        >
                          <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                            Tipo Pieza
                          </option>
                          {information?.type?.map((step) => (
                            <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                          ))}
                        </Input>
                      </InputGroup>
                      {errors.type && <div className="typography-line"><p className="text-danger">{errors.type.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={valoresInicialesp.nombre}
                  rules={{ required: 'El nombre de la obra es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": nombreFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Nombre
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Nombre de la Obra"
                          type="text"
                          onFocus={(e) => setNombreFocus(true)}
                          onBlur={(e) => setNombreFocus(false)}
                        />
                      </InputGroup>
                      {errors.nombre && <div className="typography-line"><p className="text-danger">{errors.nombre.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="otro_nombre"
                  control={control}
                  defaultValue={valoresInicialesp.otro_nombre}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup disabled
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Otro Nom.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Otro nombre..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Row style={{ padding: '20px' }}>
                <Col lg="2">
                  <InputGroupText style={titleStyle} >
                    Materiales
                  </InputGroupText>
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                {information && information.material.map((option) =>
                (
                  <Col lg="2" sm="3">
                    <Controller
                      key={option.id}
                      name={`materiales[${option.id}]`}
                      control={control}
                      defaultValue={""}
                      render={({ field }) => <FormGroup check>
                        <Label check>
                          <Input key={option.id} id={option.id}
                            type="checkbox"
                            {...field}
                            defaultChecked={materialesSeleccionados && materialesSeleccionados.includes(option.id)}
                          />
                          <span className="form-check-sign" />
                          {option.nombre}
                        </Label>
                      </FormGroup>}
                    />
                  </Col>
                ))
                }
              </Row>
              <Col lg="6" >
                <Controller
                  name="otro_material"
                  control={control}
                  defaultValue={valoresInicialesp.otro_material}
                  render={({ field }) => (
                    <>
                      <InputGroup disabled
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Otro
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Otro material..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="technique"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'La técnica es obligatoria.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": typeFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Técnica
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Tipo Técnica"
                          type="select"
                          onFocus={(e) => setTypeFocus(true)}
                          onBlur={(e) => setTypeFocus(false)}
                          style={{ color: '#FFFFFFCC' }}
                        >
                          <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                            Tipo Técnica
                          </option>
                          {information?.technique?.map((step) => (
                            <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                          ))}
                        </Input>
                      </InputGroup>
                      {errors.technique && <div className="typography-line"><p className="text-danger">{errors.technique.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="autor"
                  control={control}
                  defaultValue={valoresInicialesp.autor}
                  rules={{ required: 'El autor es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Autor
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Autor"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="siglo"
                  control={control}
                  defaultValue={valoresInicialesp.siglo}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Siglo
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Siglo"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="anio"
                  control={control}
                  defaultValue={valoresInicialesp.anio}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Año
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Año"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6"></Col>
              <Col lg="2">
                <InputGroupText style={titleStyle} >
                  Dimensiones
                </InputGroupText>
              </Col>
              <Col lg="2" >
                <Controller
                  name="alto"
                  control={control}
                  defaultValue={valoresInicialesp.alto}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Alto
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Alto..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="2" >
                <Controller
                  name="ancho"
                  control={control}
                  defaultValue={valoresInicialesp.ancho}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Ancho
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Ancho..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="2" >
                <Controller
                  name="diametro"
                  control={control}
                  defaultValue={valoresInicialesp.diametro}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Diámetro
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Diámetro..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="2" >
                <Controller
                  name="espesor"
                  control={control}
                  defaultValue={valoresInicialesp.espesor}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Espesor
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Espesor..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="2" >
                <Controller
                  name="peso"
                  control={control}
                  defaultValue={valoresInicialesp.peso}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Peso
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Peso..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="inscripcion"
                  control={control}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Inscripc.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Inscripciones..."
                          type="textarea"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="descripcion"
                  control={control}
                  defaultValue={valoresInicialesp.descripcion}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Descripc.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Descripción"
                          type="textarea"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="ubicacion"
                  control={control}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Ubicación
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Ubicación en el museo"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="regimen"
                  control={control}
                  defaultValue={valoresInicialesp.regimen}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Régimen
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Régimen de Propiedad..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="state"
                  control={control}
                  defaultValue={valoresInicialesp.estado_piezas}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": typeFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Estado
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Estado General"
                          type="select"
                          onFocus={(e) => setTypeFocus(true)}
                          onBlur={(e) => setTypeFocus(false)}
                          style={{ color: '#FFFFFFCC' }}
                        >
                          <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                            Estado General...
                          </option>
                          {information?.state?.map((step) => (
                            <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                          ))}
                        </Input>
                      </InputGroup>
                      {errors.state && <div className="typography-line"><p className="text-danger">{errors.state.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="otro_deterioro"
                  control={control}
                  defaultValue={valoresInicialesp.otro_deterioro}
                  render={({ field }) => (
                    <>
                      <InputGroup disabled
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Otro Det.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Otro deterioro..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Row style={{ padding: '20px' }}>
                <Col lg="2">
                  <InputGroupText style={titleStyle} >
                    Deterioros
                  </InputGroupText>
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                <Col lg="2">
                </Col>
                {information && information.deterioration.map((option) =>
                (
                  <Col lg="2" sm="3">
                    <Controller
                      key={option.id}
                      name={`deterioro[${option.id}]`}
                      control={control}
                      defaultValue={""}
                      render={({ field }) => <FormGroup check>
                        <Label check>
                          <Input key={option.id} id={option.id}
                            type="checkbox"
                            {...field}
                            defaultChecked={deteriorosSeleccionados && deteriorosSeleccionados.includes(option.id)}
                          />
                          <span className="form-check-sign" />
                          {option.nombre}
                        </Label>
                      </FormGroup>}
                    />
                  </Col>
                ))
                }
              </Row>
              <Col lg="6" >
                <Controller
                  name="estado_integridad"
                  control={control}
                  defaultValue={valoresInicialesp.estado_integridad}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": typeFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Integridad
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Estado de Integridad..."
                          type="select"
                          onFocus={(e) => setTypeFocus(true)}
                          onBlur={(e) => setTypeFocus(false)}
                          style={{ color: '#FFFFFFCC' }}
                        >
                          <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                            Estado Integridad
                          </option>
                          {information?.integrity?.map((step) => (
                            <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                          ))}
                        </Input>
                      </InputGroup>
                      {errors.integrity && <div className="typography-line"><p className="text-danger">{errors.integrity.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="conservacion"
                  control={control}
                  defaultValue={valoresInicialesp.conservacion}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Conserv.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Conservación Preventiva"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="observacion"
                  control={control}
                  defaultValue={valoresInicialesp.observacion}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Observ.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Observaciones"
                          type="textarea"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.observacion && <div className="typography-line"><p className="text-danger">{errors.observacion.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="publicidad"
                  control={control}
                  defaultValue={valoresInicialesp.publicidad}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Publicidad
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Información de imagen"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="imagen1"
                  control={control}
                  defaultValue={valoresInicialesp.imagen1}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Imagen1
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Imagenes 1..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="imagen2"
                  control={control}
                  defaultValue={valoresInicialesp.imagen2}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Imagen2
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Imagenes 2..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="registro_fotográfico"
                  control={control}
                  defaultValue={valoresInicialesp.registro_fotográfico}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Reg. Foto.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Código Fotográfico"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="entidad_investigadora"
                  control={control}
                  defaultValue={valoresInicialesp.entidad_investigadora}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Ent. Inv.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Entidad Investigadora"
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="registrado"
                  control={control}
                  defaultValue={valoresInicialesp.registrado}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Registro
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Registrado por..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="fecha_registro"
                  control={control}
                  defaultValue={valoresInicialesp.fecha_registro}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          F. Reg.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Fecha Registro..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="revisado"
                  control={control}
                  defaultValue={valoresInicialesp.revisado}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Revisado
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Revisado por..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.revisado && <div className="typography-line"><p className="text-danger">{errors.revisado.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="fecha_revision"
                  control={control}
                  defaultValue={valoresInicialesp.fecha_revision}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          F. Rev.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Fecha Revisión..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.fecha_revision && <div className="typography-line"><p className="text-danger">{errors.fecha_revision.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" >
                <Controller
                  name="realiza_foto"
                  control={control}
                  defaultValue={valoresInicialesp.realiza_foto}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Real. Foto.
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Realiza Foto..."
                          type="text"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                        />
                      </InputGroup>
                      {errors.realiza_foto && <div className="typography-line"><p className="text-danger">{errors.realiza_foto.message}</p></div>}
                    </>
                  )}
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button color="info" size="sm" sm="6" disabled={loading} type="submit">
              Guardar
            </Button>
            <Button color="warning" size="sm" sm="6" disabled={loading} onClick={onCancelar}>
              Cancelar
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
    </div >

  )
}
