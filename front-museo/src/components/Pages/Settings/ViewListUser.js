import React from 'react'
import HeaderUser from './HeaderUser'
import ListUser from './ListUser'

export default function ViewListUser(props)  {

    const { nuevoUsuario, handleClick, handleDelete, getUserTable, data, datat } = props;
    return (
        <div>
            <HeaderUser nuevoUsuario={nuevoUsuario} />
            <ListUser datat={datat} data={data} handleClick={handleClick} handleDelete={handleDelete} getUserTable={getUserTable}/>
        </div>
    );
}

