import React, {Component} from 'react'
import { Button } from "@blueprintjs/core"


class HeaderUser extends Component {
  render(){
    const {nuevoUsuario} = this.props
    return(
      <header>
         <h3 className="bp3-heading">Mantenedor de Usuarios</h3>

        <Button rightIcon="arrow-right" intent="success" text="Agregar usuario" onClick={nuevoUsuario} />

      </header>
    )
  }
}

export default HeaderUser