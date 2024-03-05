import React, { useMemo } from 'react'
import { useTable, usePagination } from "react-table";
import { PieceData } from "./Data/PieceData"
import '../../assets/css/table.css';
import { Button } from "reactstrap";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function ListPiece(props) {
    
    const handleClick = id => e => {
        props.handleClick(id)
    }

    const handleDelete = id => e => {
        props.handleDelete(id)
    }

    const NuevaColumna = ({ id: id }) => <>
        <Button color="info" size="sm" onClick={handleClick(id)}>
            <i className="tim-icons icon-refresh-02" />
            Actualizar
        </Button>
        <Button color="success" size="sm" onClick={handleDelete(id)}>
            <i className="tim-icons icon-trash-simple" />
            Eliminar
        </Button></>
    const { data } = props
    console.log("list: " + JSON.stringify(data))
    const datosConNuevaColumna = dat => {
        return dat.map(objeto => ({
            ...objeto,
            botones: <NuevaColumna key={objeto.id} id={objeto.id}/>,
        }));
    };

    const columns = useMemo(() => PieceData, []);
    console.log("dt: " + data)
    const datosConNuevaColumnaMemo = useMemo(() => datosConNuevaColumna(data), [data]);

    const table = useTable({
        columns,
        data: datosConNuevaColumnaMemo,
        initialState: {
            pageSize: 10,
            pageIndex: 0
        },
    },
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
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
            <div className="pagination">
                <span>
                    Página
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>
                </span>
                <div className="controls">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <BiFirstPage className="page-controller" />
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <MdKeyboardArrowLeft className="page-controller" />
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <MdKeyboardArrowRight className="page-controller" />
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <BiLastPage className="page-controller" />
                    </button>
                </div>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {[5, 10, 15].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )

}
