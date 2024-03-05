import React from 'react'
import HeaderPiece from './HeaderPiece'
import ListPiece from './ListPiece'

export default function ViewListPiece(props)  {

    const { nuevoObjeto, handleClick, handleDelete, data } = props;
    console.log("view "+ JSON.stringify(props))
    return (
        <div>
            <HeaderPiece nuevoObjeto={nuevoObjeto} />
            <ListPiece data={data} handleClick={handleClick} handleDelete={handleDelete} />
        </div>
    );
}
