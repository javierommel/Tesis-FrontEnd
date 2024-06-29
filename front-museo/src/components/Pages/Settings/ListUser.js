import React, { useMemo, useEffect, useState } from 'react'
//import { useTable, usePagination } from "react-table";
import {
    Table as ReactTable,
    PaginationState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    getSortedRowModel,
} from '@tanstack/react-table'

import { UserData as columnDefinitions } from "./Data/UserData"
import '../../../assets/css/table.css';
import { Button, UncontrolledTooltip, Pagination, PaginationLink, PaginationItem, Input } from "reactstrap";



export default function ListUser(props) {
    const editar = require('assets/img/editar.png')
    const handleClick = id => e => {
        props.handleClick(id)
    }
    const handleDelete = id => e => {
        props.handleDelete(id)
    }
    const NuevaColumna = ({ id: id }) => <>
        <Button id={'f-' + id.replace(/\./g, '-').replace(/@/g, '-')} color="success" size="sm" onClick={handleClick(id)}>
            <img src={editar} alt="..." style={{ height: "16px" }} />

        </Button>
        <UncontrolledTooltip
            delay={0}
            placement="top"
            target={'f-' + id.replace(/\./g, '-').replace(/@/g, '-')}
        >
            Modificar
        </UncontrolledTooltip>
        <Button id={'e-' + id.replace(/\./g, '-').replace(/@/g, '-')} color="primary" size="sm" onClick={handleDelete(id)}>
            <i className="tim-icons icon-trash-simple" />

        </Button>
        <UncontrolledTooltip
            delay={0}
            placement="top"
            target={'e-' + id.replace(/\./g, '-').replace(/@/g, '-')}
        >
            Eliminar
        </UncontrolledTooltip>
    </>
    const { data } = props
    const datosConNuevaColumna = dat => {
        return dat.map(objeto => ({
            ...objeto,
            botones: <NuevaColumna key={objeto.usuario} id={objeto.usuario} />,
        }));
    };

    //const columns = useMemo(() => UserData, []);
    const datosConNuevaColumnaMemo = useMemo(() => datosConNuevaColumna(data), [data]);
    const columns = [
        ...columnDefinitions,
        {
            header: '',
            accessorKey: 'botones',
            enableColumnFilter: false,
            cell: ({ row }) => (
                <NuevaColumna
                    id={row.original.usuario}
                    estado={row.original.estado}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        columns,
        data: datosConNuevaColumnaMemo,
        debugTable: false,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination,
        },
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    })

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                table.getAllLeafColumns().map(column => {
                    if (column.id === "email") {
                        if (column.getIsVisible()) {
                            column.show = false;
                            column.toggleVisibility()
                        }
                    }
                    if (column.id === "rolesname") {
                        if (column.getIsVisible()) {
                            column.show = false;
                            column.toggleVisibility()
                        }
                    }
                    if (column.id === "nombre") {
                        if (column.getIsVisible()) {
                            column.show = false;
                            column.toggleVisibility()
                        }
                    }
                })
            }
            else {
                table.getAllLeafColumns().map(column => {
                    if (column.id === "email") {
                        if (!column.getIsVisible()) {
                            column.show = true;
                            column.toggleVisibility()
                        }
                    }
                    if (column.id === "rolesname") {
                        if (!column.getIsVisible()) {
                            column.show = true;
                            column.toggleVisibility()
                        }
                    }
                    if (column.id === "nombre") {
                        if (!column.getIsVisible()) {
                            column.show = true;
                            column.toggleVisibility()
                        }
                    }
                })
            }
        };
        handleResize();


        // Agregar el event listener al montar el componente
        window.addEventListener('resize', handleResize);

        // Remover el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="p-2">ta
            <div className="h-2" />
            <table className="mobile">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted()] ?? null}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2" />

            <div className="pagination">
                <span className="flex items-center gap-1">
                    <div>Página <strong>
                        {props.datat.currentPage} de{' '}
                        {props.datat.totalPages.toLocaleString()}
                    </strong></div>

                </span>
                <div className="controls">
                    <Pagination
                        className="pagination pagination-info"
                        listClassName="pagination-info"
                    >
                        <PaginationItem disabled={!props.datat.prevPage}>
                            <PaginationLink
                                aria-label="Previous"
                                href="#pablo"
                                onClick={() => {
                                    table.firstPage()
                                    props.getUserTable(1, table.getState().pagination.pageSize)
                                }}

                            >
                                <span aria-hidden={true}>
                                    <i
                                        aria-hidden={true}
                                        className="tim-icons icon-double-left"
                                    />
                                </span>
                            </PaginationLink>
                        </PaginationItem >
                        <PaginationItem disabled={!props.datat.prevPage}>
                            <PaginationLink
                                aria-label="Previous"
                                href="#pablo"
                                onClick={() => {
                                    table.previousPage()
                                    props.getUserTable(props.datat.prevPage, table.getState().pagination.pageSize)
                                }}

                            >
                                <span aria-hidden={true}>
                                    <i
                                        aria-hidden={true}
                                        className="tim-icons icon-minimal-left"
                                    />
                                </span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={!props.datat.nextPage}>
                            <PaginationLink
                                aria-label="Previous"
                                href="#pablo"
                                onClick={() => {
                                    table.nextPage()
                                    props.getUserTable(props.datat.nextPage, table.getState().pagination.pageSize)
                                }}

                            >
                                <span aria-hidden={true}>
                                    <i
                                        aria-hidden={true}
                                        className="tim-icons icon-minimal-right"
                                    />
                                </span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={!props.datat.nextPage}>
                            <PaginationLink
                                aria-label="Next"
                                href="#pablo"

                                onClick={() => {
                                    table.lastPage()
                                    props.getUserTable(props.datat.totalPages, table.getState().pagination.pageSize)
                                }}

                            >
                                <span aria-hidden={true}>
                                    <i
                                        aria-hidden={true}
                                        className="tim-icons icon-double-right"
                                    />
                                </span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </div>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        props.getUserTable(table.getState().pagination.pageIndex + 1, Number(e.target.value))
                        table.setPageSize(Number(e.target.value))

                    }}
                >
                    {[10, 20, 30].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                Mostrar {table.getRowModel().rows.length.toLocaleString()} de {' '}
                {props.datat.total.toLocaleString()} Resultados
            </div>
        </div>
    )

}
function Filter({
    column,
    table,
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    return (
        <Input
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Buscar...`}
            className="w-36 border shadow rounded"
        />
    )
}
