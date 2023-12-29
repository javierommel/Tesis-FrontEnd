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
} from "reactstrap";


export default function UserForm(props) {
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
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
  const validate = values => {
    const errors = {}
    if(!values.name) {
      errors.name = 'Este campo es obligatorio'
    }
    if(!values.email) {
      errors.email = 'Este campo es obligatorio'
    }
    if(!values.website) {
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
      props.handleUpdate(valoresIniciales.id, data,false)
    } else {
      props.handleSubmit(data,false)
    }
  }
  const onCancelar = () => {
    setLoading(false);
    console.log("as "+props.valoresIniciales.id)
    if (valoresIniciales.id) {
      props.handleUpdate(valoresIniciales.id, null,true)
    } else {
      props.handleSubmit(null,true)
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
        {/*<form onSubmit={handleSubmit(onSubmit)}>

          <FormGroup
            helperText={errors.name}
            label="Nombre"
            labelFor="text-input"
            labelInfo="(obligatorio)"
          >
            <InputGroup id="text-input" defaultValue={valoresIniciales.name} placeholder="Ingresa el nombre completo" name="name"  />
          </FormGroup>

          <FormGroup
            helperText={errors.email}
            label="Email"
            labelFor="text-mail"
            labelInfo="(obligatorio)"
          >
            <InputGroup id="text-mail" defaultValue={valoresIniciales.email} placeholder="Ingresa el email" name="email"  />
          </FormGroup>

          <FormGroup
            helperText={errors.website}
            label="Website"
            labelFor="text-website"
            labelInfo="(obligatorio)"
          >
            <InputGroup id="text-website" defaultValue={valoresIniciales.website} placeholder="Ingresa el website" name="website"  />
          </FormGroup>

          <Button type="submit" rightIcon="floppy-disk" intent="success" text="Guardar" />


        </form>*/}
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          {!successful && (<>
            <CardBody>
            <Row>
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
              <Button  color="primary" size="sm" disabled={loading} type="submit">
                Guardar
              </Button>
              <Button  color="primary" size="sm" disabled={loading} onClick={onCancelar}>
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
