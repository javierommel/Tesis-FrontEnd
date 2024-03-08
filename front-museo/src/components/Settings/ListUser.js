import React, { useMemo, useEffect } from 'react'
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
import '../../assets/css/table.css';
import { Button } from "reactstrap";



export default function ListUser(props) {
    const handleClick = id => e => {

        props.handleClick(id)
    }
    const handleDelete = id => e => {

        props.handleDelete(id)
    }
    const NuevaColumna = ({ id: id }) => <>
        <Button color="default" size="sm" onClick={handleClick(id)}>
            <i className="tim-icons icon-refresh-02" />

        </Button>
        <Button color="default" size="sm" onClick={handleDelete(id)}>
            <i className="tim-icons icon-trash-simple" />

        </Button></>
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
            cell: ({ row }) => (
                <NuevaColumna
                    id={row.original.id}
                    estado={row.original.estado}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        columns,
        data: datosConNuevaColumnaMemo,
        debugTable: true,
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
                })
            }
        };

        // Agregar el event listener al montar el componente
        window.addEventListener('resize', handleResize);

        // Remover el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
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
                                            {/*header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null*/}
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
                    <div>Página</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <div className="controls">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span aria-hidden={true}></span>
                        <i
                            aria-hidden={true}
                            className="tim-icons icon-double-left"
                        />

                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span aria-hidden={true}></span>
                        <i
                            aria-hidden={true}
                            className="tim-icons icon-minimal-left"
                        />
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span aria-hidden={true}></span>
                        <i
                            aria-hidden={true}
                            className="tim-icons icon-minimal-right"
                        />
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span aria-hidden={true}></span>
                        <i
                            aria-hidden={true}
                            className="tim-icons icon-double-right"
                        />
                    </button>
                </div>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                Mostrar {table.getRowModel().rows.length.toLocaleString()} de {' '}
                {table.getRowCount().toLocaleString()} Resultados
            </div>
        </div>
    )

}
