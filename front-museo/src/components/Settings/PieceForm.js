import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


export default function PieceForm(props) {
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password2Focus, setPassword2Focus] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const [tipoOpen, setTipoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggle = () => setTipoOpen((prevState) => !prevState);
  console.log("props: "+JSON.stringify(props))
  /*const { message } = useSelector(state => state.message);
  state = {
    errors: {}
  }*/

  /*constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props.valoresIniciales
    }
  }*/
  const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Este campo es obligatorio'
    }
    if (!values.email) {
      errors.email = 'Este campo es obligatorio'
    }
    if (!values.website) {
      errors.website = 'Este campo es obligatorio'
    }
    return errors
  }
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
    console.log("as " + props.valoresInicialesp.id)
    if (valoresInicialesp.id) {
      props.handleUpdate(valoresInicialesp.id, null, true)
    } else {
      props.handleSubmit(null, true)
    }
  }
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log('ID seleccionado:', selectedOption.value);
  };
  /*const handleSubmit = e => {
    e.preventDefault()
    const { errors, ...sinErrors } = this.state
    const result = validate(sinErrors)


    if (!Object.keys(result).length) {
      const { handleSubmit, handleUpdate, valoresIniciales } = this.props

      if (valoresIniciales.id) {
        handleUpdate(valoresIniciales.id, sinErrors)
      } else {
        handleSubmit(sinErrors)
      }

    } else {
      this.setState({ errors: result })
    }

  }*/


  //const { errors } = this.state
  const { valoresInicialesp } = props



  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {!successful && (<>
          <CardBody>
            <Row>
              <Col lg="6" sm="6">
                <Controller
                  name="username"
                  control={control}
                  defaultValue={valoresInicialesp.numero_ordinal}
                  rules={{ required: 'El nombre de usuario es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": fullNameFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Numero Ordinal"
                          type="text"
                          onFocus={(e) => setFullNameFocus(true)}
                          onBlur={(e) => setFullNameFocus(false)}
                        />
                      </InputGroup>
                      {errors.username && <div className="typography-line"><p className="text-danger">{errors.username.message}</p></div>}
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Código INPC"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Código del Museo"
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
                  name="tipo"
                  control={control}
                  defaultValue={valoresInicialesp}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <Dropdown isOpen={selectedOption !== null} toggle={() => {setSelectedOption(null)}} direction="down">
                        <DropdownToggle caret>{selectedOption ? selectedOption.name : 'Seleccione una opción'}</DropdownToggle>
                        <DropdownMenu >
                        {props.datos.tipo.map((step) => (
                          <DropdownItem key={step.id} onClick={() => handleSelectChange(step)}>{step.name}</DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      
                      

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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Nombre de la Obra"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Materiales"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Técnicas"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Dimensiones"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Inscripciones"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Régimen de Propiedad"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Estado General"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Estado de integridad"
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
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
