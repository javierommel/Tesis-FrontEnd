import React from 'react'
import ListComment from './ListComment'

export default function ViewListComment(props)  {

    const { handleClick, handleDelete, data } = props;
    return (
        <div>
            <ListComment data={data} handleClick={handleClick} handleDelete={handleDelete}/>
        </div>
    );
}

