import React from 'react'
import ListComment from './ListComment'

export default function ViewListComment(props)  {

    const { handleClick, handleDelete, handleDestacado, data, datat,  getCommentTable} = props;
    return (
        <div>
            <ListComment datat={datat} data={data} handleClick={handleClick} handleDelete={handleDelete} handleDestacado={handleDestacado} getCommentTable={getCommentTable}/>
        </div>
    );
}

