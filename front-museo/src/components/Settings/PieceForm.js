import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getInformationPiece } from "../../actions/piece"
import classnames from "classnames";
import {labelStyle, titleStyle} from '../../assets/styles/style'
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
  Label,
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
      //console.log("inf; "+JSON.stringify(dat.data))
      setInformation(dat.data);
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
  }, []);

  const { valoresInicialesp } = props



  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {!successful && (<>
          <CardBody>
            <Row>
              <Col lg="6" sm="6">
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
              <Col lg="6" sm="6">
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
              <Col lg="6" sm="6">
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
              <Col lg="6" sm="6">
                <Controller
                  name="type"
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
              <Col lg="6" sm="6">
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup disabled 
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Otro Nombre
                        </InputGroupText>
                        <Input disabled
                          {...field}
                          placeholder="Otra denominación"
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
              <Col lg="6" sm="6">
                <Controller
                  name="material"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'El material es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": typeFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Material
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
                            Tipo Material
                          </option>
                          {information?.material?.map((step) => (
                            <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                          ))}
                        </Input>
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" sm="6">
                <Controller
                  name="otro_material"
                  control={control}
                  defaultValue={valoresInicialesp.email}
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
                        <Input disabled 
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
              <Col lg="6" sm="6">
                <Controller
                  name="technique"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
                          style={{ color: '#6c757d' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
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
              <Col lg="2" sm="6" style={{alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Label color="info" style={titleStyle}>
                  Dimensiones
                </Label>
              </Col>
              <Col lg="2" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="2" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="2" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="2" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="2" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Inscripción
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Inscripciones..."
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Descripción
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Descripción"
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="state"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
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
                          style={{ color: '#6c757d' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Elementos
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Elementos"
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
              <Col lg="6" sm="6">
                <Controller
                  name="integrity"
                  control={control}
                  defaultValue={valoresInicialesp.email}
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
                          style={{ color: '#6c757d' }}
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Conservación
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Observaciones
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Observaciones"
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Inf. Imagen
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Foto1
                        </InputGroupText>
                        <Input
                          {...field}
                          placeholder="Fotos"
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
              <Col lg="6" sm="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresInicialesp.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                      >
                        <InputGroupText style={labelStyle} >
                          Cod. Foto
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
            </Row>
          </CardBody>
          <CardFooter>
            <Button color="primary" size="sm" disabled={loading} type="submit">
              Guardar
            </Button>
            <Button color="primary" size="sm" disabled={loading} onClick={onCancelar}>
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
    </div>

  )
}
