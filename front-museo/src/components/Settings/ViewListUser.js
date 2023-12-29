import React from 'react'
import HeaderUser from './HeaderUser'
import ListUser from './ListUser'

export default function ViewListUser(props)  {

    const { nuevoUsuario, handleClick, data } = props;
    console.log("view "+ data)
    return (
        <div>
            <HeaderUser nuevoUsuario={nuevoUsuario} />
            <ListUser data={data} handleClick={handleClick} />
        </div>
    );
}

