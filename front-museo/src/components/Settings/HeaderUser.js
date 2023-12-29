import React, { Component } from 'react'
import { Button } from "reactstrap";


class HeaderUser extends Component {
  render() {
    const { nuevoUsuario } = this.props
    return (
      <header>

        <Button color="info" size="sm" onClick={nuevoUsuario}>
        <i className="tim-icons icon-simple-add" />
          Agregar
        </Button>
      </header>
    )
  }
}

export default HeaderUser