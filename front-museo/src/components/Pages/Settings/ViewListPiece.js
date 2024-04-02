import React from 'react'
import HeaderPiece from './HeaderPiece'
import ListPiece from './ListPiece'

export default function ViewListPiece(props)  {

    const { nuevoObjeto, handleClick, handleDelete, data, datat,  getPieceTable} = props;
    return (
        <div>
            <HeaderPiece nuevoObjeto={nuevoObjeto} />
            <ListPiece datat={datat} data={data} handleClick={handleClick} handleDelete={handleDelete} getPieceTable={getPieceTable}/>
        </div>
    );
}
