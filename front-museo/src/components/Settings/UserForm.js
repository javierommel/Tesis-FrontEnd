import React, {Component} from 'react'
import { Button, FormGroup, InputGroup } from "@blueprintjs/core"

//validaciones de campos de formulario
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

class UserForm extends Component {
  state={
    errors: {}
  }

  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      ...props.valoresIniciales
    }
  }

  handleChange = ({target}) => {
    this.setState({
      [target.name]:target.value
    })

  }

  handleSubmit = e => {
    e.preventDefault()
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors)


    if(!Object.keys(result).length){
      const {handleSubmit, handleUpdate, valoresIniciales} = this.props

      if(valoresIniciales.id) {
        handleUpdate(valoresIniciales.id, sinErrors)
      } else {
        handleSubmit(sinErrors)
      }

    } else {
      this.setState({errors: result})
    }

  }

  render(){

    const {errors} = this.state
    const {valoresIniciales} = this.props



    return(
      <div>
        <header>
           <h3 className="bp3-heading">Editor de Usuarios</h3>
        </header>

        <form onSubmit={this.handleSubmit}>

          <FormGroup
              helperText={errors.name}
              label="Nombre"
              labelFor="text-input"
              labelInfo="(obligatorio)"
          >
              <InputGroup id="text-input" defaultValue={valoresIniciales.name} placeholder="Ingresa el nombre completo" name="name" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup
              helperText={errors.email}
              label="Email"
              labelFor="text-mail"
              labelInfo="(obligatorio)"
          >
              <InputGroup id="text-mail" defaultValue={valoresIniciales.email} placeholder="Ingresa el email" name="email" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup
              helperText={errors.website}
              label="Website"
              labelFor="text-website"
              labelInfo="(obligatorio)"
          >
              <InputGroup id="text-website" defaultValue={valoresIniciales.website} placeholder="Ingresa el website" name="website" onChange={this.handleChange}/>
          </FormGroup>

          <Button type="submit" rightIcon="floppy-disk" intent="success" text="Guardar" />


        </form>
      </div>

    )
  }
}

export default UserForm