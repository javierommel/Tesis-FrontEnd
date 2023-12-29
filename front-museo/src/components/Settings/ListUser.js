import React, { useMemo } from 'react'
import { useTable } from "react-table";
import { UserData } from "./Data/UserData"
import '../../assets/css/table.css';
import { Button } from "reactstrap";

export default function ListUser(props) {
    const handleClick = id => e => {
        const { handleClick } = props
        handleClick(id)
    }
    const NuevaColumna = () => <>
        <Button color="info" size="sm">
            <i className="tim-icons icon-refresh-02" />
            Actualizar
        </Button>
        <Button color="success" size="sm">
            <i className="tim-icons icon-trash-simple" />
            Eliminar
        </Button></>
    const { data } = props
    const datosConNuevaColumna = dat => {
        return dat.map(objeto => ({
            ...objeto,
            botones: <NuevaColumna key={objeto.id} />,
        }));
    };

    const columns = useMemo(() => UserData, []);
    const datosConNuevaColumnaMemo = useMemo(() => datosConNuevaColumna(data), [data]);

    //const columns = UserData();
    //const data = useRows();
    const table = useTable({ columns, data: datosConNuevaColumnaMemo });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;
    return (
        <>
            {/* Añadimos las propiedades a nuestra tabla nativa */}
            <table {...getTableProps()}>
                <thead>
                    {
                        // Recorremos las columnas que previamente definimos
                        headerGroups.map(headerGroup => (
                            // Añadimos las propiedades al conjunto de columnas
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Recorremos cada columna del conjunto para acceder a su información
                                    headerGroup.headers.map((column) => (
                                        // Añadimos las propiedades a cada celda de la cabecera
                                        <th {...column.getHeaderProps()}>
                                            {
                                                // Pintamos el título de nuestra columna (propiedad "Header")
                                                column.render("Header")
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                {/* Añadimos las propiedades al cuerpo de la tabla */}
                <tbody {...getTableBodyProps()}>
                    {
                        // Recorremos las filas
                        rows.map(row => {
                            // Llamamos a la función que prepara la fila previo renderizado
                            prepareRow(row);
                            return (
                                // Añadimos las propiedades a la fila
                                <tr {...row.getRowProps()}>
                                    {
                                        // Recorremos cada celda de la fila
                                        row.cells.map((cell) => {
                                            // Añadimos las propiedades a cada celda de la fila
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        // Pintamos el contenido de la celda
                                                        cell.render("Cell")
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table >
        </>
    )

}
