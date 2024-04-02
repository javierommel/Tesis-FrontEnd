import React from 'react'
import ListComment from './ListComment'

export default function ViewListComment(props)  {

    const { handleClick, handleDelete, data, datat,  getCommentTable} = props;
    return (
        <div>
            <ListComment datat={datat} data={data} handleClick={handleClick} handleDelete={handleDelete} getCommentTable={getCommentTable}/>
        </div>
    );
}

