import React, { useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getCountry } from "../../../actions/general"
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
  FormGroup,
  Label,
  Card,
  CustomInput
} from "reactstrap";
import eye from 'assets/img/eye.ico';
import { error } from 'jquery';

export default function UserForm(props) {
  const [userFocus, setUserFocus] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password2Focus, setPassword2Focus] = useState(false);
  const [countryFocus, setCountryFocus] = React.useState(false);
  const [yearFocus, setYearFocus] = React.useState(false);
  const { register, handleSubmit, getValues, control, watch, setError, clearErrors, formState: { errors } } = useForm();
  const [country, setCountry] = useState([]);
  const anioActual = new Date().getFullYear();
  // Crear un array con los últimos 80 años
  const anios = Array.from({ length: 80 }, (_, index) => anioActual - index);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(true);
  const nacionalidadUpdate = watch('country') > 0;
  const anioUpdate = watch('year') > 0;

  const activo = watch('estado') === 1;

  React.useEffect(() => {
    getCountry().then((dat) => {
      setCountry(dat.data);
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
  }, []);

  const onSubmit = (data) => {
    if (valoresIniciales.usuario) {
      props.handleUpdate(valoresIniciales.usuario, data, false)
    } else {
      props.handleSubmit(data, false)
    }
  }
  const onCancelar = () => {
    if (valoresIniciales.usuario) {
      props.handleUpdate(valoresIniciales.usuario, null, true)
    } else {
      props.handleSubmit(null, true)
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
  const handleMouseDown2 = () => {
    // Muestra la contraseña cuando se mantiene presionado el ojo
    setShowPassword2(true);
  };

  const handleMouseUp2 = () => {
    // Oculta la contraseña cuando se suelta el ojo
    setShowPassword2(false);
  };
  const TogglePassword = () => {
    setPasswordUpdate(!passwordUpdate);
  };
  const password = watch('password', '');
  const validatePassword = (value) => {
    return value === password || 'El password ingresado no coincide';
  };
  const validateNacionalidad = (value) => {
    return value !== "0" || 'El pais es obligatorio.';
  };

  const validateEdad = (value) => {
    console.log("123: " + value)
    return value !== "0" || 'El año de nacimiento es obligatorio.';
  };

  const validateRoles = (value) => {
    console.log(value+" : "+getValues('roles'))
    //const hasTrueValue = getValues('roles').some(role => role.isChecked);
    const hasTrueValue = getValues('roles').includes(true);
    if (!hasTrueValue) {
      setError('roles', {
        type: 'manual',
        message: 'Debe seleccionar al menos un rol'
      });
    } else {
      clearErrors('roles'); // Elimina el error si al menos un rol está seleccionado
    }
    return hasTrueValue;
  };

  const { valoresIniciales } = props
  const rolesSeleccionados = valoresIniciales.roles && valoresIniciales.roles.split(',').map(role => parseInt(role.trim()));
  const nuevoregistro = valoresIniciales.usuario ? false : true;
  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {<>
          <CardBody>
            <Row>
              <Col lg="6" md="6">
                <Card className="card-coin card-plain" >
                  <CardBody>
                    <p className="category">Roles</p>

                    {props.datos.roles.map((option, index) =>
                    (
                      <Controller
                        key={option.id}
                        name={`roles.${option.id}]`}
                        control={control}
                        defaultValue={rolesSeleccionados && rolesSeleccionados.includes(option.id)}
                        rules={{validate: validateRoles}}
                        render={({ field }) => <FormGroup check>
                          <Label check>
                            <Input key={option.id} id={option.id}
                              type="checkbox"
                              {...field}
                              defaultChecked={rolesSeleccionados && rolesSeleccionados.includes(option.id)} />
                            <span className="form-check-sign" />
                            {option.nombre}
                          </Label>
                        </FormGroup>}
                      />
                      
                    ))}
                    {errors.roles && <div className="typography-line"><p className="text-danger">{errors.roles.message}</p></div>}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" md="6"></Col>
              <Col lg="6" md="6">
                <br />
                <Controller
                  name="estado"
                  control={control}
                  defaultValue={valoresIniciales&&valoresIniciales.estado===1?true:false}
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
              <Col lg="6" md="6"></Col>
              <Col lg="6" md="6">
                <Controller
                  name="username"
                  control={control}
                  defaultValue={valoresIniciales.usuario}
                  rules={{ required: 'El nombre de usuario es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": userFocus,
                        })}
                        disabled={valoresIniciales.usuario ? true : false}
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
                          disabled={valoresIniciales.usuario ? true : false}
                        />
                      </InputGroup>
                      {errors.username && <div className="typography-line"><p className="text-danger">{errors.username.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" md="6">
                <Controller
                  name="name"
                  control={control}
                  defaultValue={valoresIniciales.nombre}
                  rules={{ required: 'El nombre es obligatorio.' }}
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
              </Col>
              <Col lg="6" md="6">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={valoresIniciales.email}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": emailFocus,
                        })}
                        disabled={valoresIniciales.email ? true : false}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                          disabled={valoresIniciales.email ? true : false}
                        />
                      </InputGroup>
                      {errors.email && <div className="typography-line"><p className="text-danger">{errors.email.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" md="6"></Col>
              {!nuevoregistro && (
                <>

                  <Col lg="6" md="6">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => TogglePassword()}
                        />
                        <span className="form-check-sign" />
                        Cambiar Password
                      </Label>
                    </FormGroup>
                    <br />
                  </Col>
                  <Col lg="6"></Col></>
              )}
              <Col lg="6" md="6">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: nuevoregistro ? 'El password es obligatorio.' : (passwordUpdate ? false : 'El password es obligatorio.') }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": passwordFocus,
                        })}
                        disabled={nuevoregistro ? false : passwordUpdate}
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
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                          style={{
                            borderRight: 'none',
                            borderTopRightRadius: 0, // Sin border radius en la esquina derecha
                            borderBottomRightRadius: 0, // Sin border radius en la esquina derecha
                          }}
                          disabled={nuevoregistro ? false : passwordUpdate}
                        />
                        <InputGroupAddon addonType="append" style={{ borderLeft: 'none', }}
                          disabled={nuevoregistro ? false : passwordUpdate}
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
              </Col>
              <Col lg="6" md="6">
                <Controller
                  name="password2"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: nuevoregistro ? validatePassword : (passwordUpdate ? false : validatePassword),
                    required: nuevoregistro ? 'El password es obligatorio.' : (passwordUpdate ? false : 'El password es obligatorio.')
                  }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": password2Focus,
                        })}
                        disabled={nuevoregistro ? false : passwordUpdate}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Repetir Password"
                          type={showPassword2 ? 'text' : 'password'}
                          onFocus={(e) => setPassword2Focus(true)}
                          onBlur={(e) => setPassword2Focus(false)}
                          style={{
                            borderRight: 'none',
                            borderTopRightRadius: 0, // Sin border radius en la esquina derecha
                            borderBottomRightRadius: 0, // Sin border radius en la esquina derecha
                          }}
                          disabled={nuevoregistro ? false : passwordUpdate}
                        />
                        <InputGroupAddon addonType="append" style={{ borderLeft: 'none', }}
                          disabled={nuevoregistro ? false : passwordUpdate}
                        >
                          <InputGroupText
                            onMouseDown={handleMouseDown2}
                            onMouseUp={handleMouseUp2}
                            onMouseLeave={handleMouseUp2}
                            style={{
                              cursor: 'pointer',
                            }}
                          >

                            <img src={eye} style={{ width: '16px' }} />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.password2 && <div className="typography-line"><p className="text-danger">{errors.password2.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="6" md="6">
                <Controller
                  name="country"
                  control={control}
                  defaultValue={valoresIniciales.pais}
                  rules={{
                    required: 'El pais es obligatorio.',
                    validate: validateNacionalidad
                  }}
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
                          style={{ color: nuevoregistro ? (!nacionalidadUpdate ? '#807d7d' : '#ffffff') : '#ffffff' }}
                        >
                          <option style={{ color: '#434444' }} key={"0"} selected={nuevoregistro} disabled value="0" >
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
              </Col>
              <Col lg="6" md="6">
                <Controller
                  name="year"
                  control={control}
                  defaultValue={valoresIniciales.fnacimiento}
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
                          style={{ color: nuevoregistro ? (!anioUpdate ? '#807d7d' : '#ffffff') : '#ffffff' }}
                        >
                          <option style={{ color: '#434444' }} key={0} selected={nuevoregistro ? (anioUpdate ? false : true) : false} disabled value="0">
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
