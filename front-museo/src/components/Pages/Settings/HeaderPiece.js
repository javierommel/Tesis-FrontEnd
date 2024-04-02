import React, { Component } from 'react'
import { Button } from "reactstrap";


class HeaderPiece extends Component {
  render() {
    const { nuevoObjeto } = this.props
    return (
      <header>

        <Button color="info" size="sm" onClick={nuevoObjeto}>
        <i className="tim-icons icon-simple-add" />
          Agregar
        </Button>
      </header>
    )
  }
}

export default HeaderPiece