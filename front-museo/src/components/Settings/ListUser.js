import React, { Component } from 'react'
import { Button, UL } from "@blueprintjs/core"

export default function ListUser(props) {
    const handleClick = id => e => {
        const { handleClick } = props
        handleClick(id)
    }

    const { data } = props

    return (
        <UL className="Classes.LIST">
            {data.map(x =>
                <li key={x.id}> {x.name}
                    <Button icon="user" text="Editar" onClick={handleClick(x.id)} />

                </li>
            )}
        </UL>
    )

}
