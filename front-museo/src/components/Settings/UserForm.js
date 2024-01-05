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
  FormGroup,
  Label,
  Card,
  CardHeader,
} from "reactstrap";


export default function UserForm(props) {
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [fnacFocus, setFnacFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password2Focus, setPassword2Focus] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
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
  console.log("roles: " +JSON.stringify(props.datos.roles))
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
    if (valoresIniciales.id) {
      props.handleUpdate(valoresIniciales.id, data, false)
    } else {
      props.handleSubmit(data, false)
    }
  }
  const onCancelar = () => {
    setLoading(false);
    console.log("as " + props.valoresIniciales.id)
    if (valoresIniciales.id) {
      props.handleUpdate(valoresIniciales.id, null, true)
    } else {
      props.handleSubmit(null, true)
    }
  }

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
  const { valoresIniciales } = props



  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {!successful && (<>
          <CardBody>
            <Row>
              <Col lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <p className="category">Roles</p>

                    {props.datos.roles.map((option) =>
                    (
                        <Controller
                          name={`checkboxGroup.${option.id}`}
                          control={control}
                          defaultValue={false}
                          render={({ field }) => <FormGroup check>
                          <Label check>
                            <Input defaultChecked type="checkbox" {...field}/>
                            <span className="form-check-sign" />
                            {option.name}
                          </Label>
                        </FormGroup>}
                        />
                    ))}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4" md="6"></Col>
              <Col lg="8" sm="6">
                <Controller
                  name="username"
                  control={control}
                  defaultValue={valoresIniciales.name}
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
                          placeholder="Nombre Completo"
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
              <Col lg="8" sm="6">
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
              </Col>
              <Col lg="8" sm="6">
                <Controller
                  name="fnacimiento"
                  control={control}
                  defaultValue={valoresIniciales.fnacimiento}
                  rules={{ required: 'El email es obligatorio.' }}
                  render={({ field }) => (
                    <>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": fnacFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-calendar-60" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          placeholder="Fecha Nacimiento"
                          type="text"
                          onFocus={(e) => setFnacFocus(true)}
                          onBlur={(e) => setFnacFocus(false)}
                        />
                      </InputGroup>
                      {errors.fnacimiento && <div className="typography-line"><p className="text-danger">{errors.fnacimiento.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="8" sm="6">
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
                          type="password"
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                        />
                      </InputGroup>
                      {errors.password && <div className="typography-line"><p className="text-danger">{errors.password.message}</p></div>}
                    </>
                  )}
                />
              </Col>
              <Col lg="8" sm="6">
                <Controller
                  name="password2"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'El password es obligatorio.' }}
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
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button color="info" size="sm" disabled={loading} type="submit">
              Guardar
            </Button>
            <Button color="success" size="sm" disabled={loading} onClick={onCancelar}>
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
