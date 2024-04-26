import React, { useMemo, useState, useEffect } from 'react'


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
import { CommentData as columnDefinitions } from "./Data/CommentData"
import '../../../assets/css/table.css';
import { Button, UncontrolledTooltip,Pagination, PaginationLink, PaginationItem, } from "reactstrap";

export default function ListComment(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        setTooltipOpen(!tooltipOpen);
    };
    const handleClick = (id, estado) => e => {

        props.handleClick(id, estado)
    }
    const handleDelete = id => e => {

        props.handleDelete(id)
    }
    const NuevaColumna = ({ id: id, estado: estado }) => <>
        <Button id={'d-' + id} color="success" size="sm" onClick={handleClick(id,estado)}>
            <i className="tim-icons icon-button-power" />
        </Button>
        <UncontrolledTooltip
            delay={0}
            placement="top"
            target={'d-' + id}
        >
            {estado === 0 ? 'Activar' : 'Desactivar'}
        </UncontrolledTooltip>
        <Button id={'b-' + id} color="primary" size="sm" onClick={handleDelete(id)}>
            <i className="tim-icons icon-trash-simple" />
        </Button>
        <UncontrolledTooltip
            delay={0}
            placement="top"
            target={'b-' + id}
        >
            Eliminar
        </UncontrolledTooltip>
    </>
    const { data } = props
    const datosConNuevaColumna = dat => {
        return dat.map(objeto => ({
            ...objeto,
            botones: <NuevaColumna key={objeto.id} id={objeto.id} estado={objeto.estado} />,
        }));
    };

    //const columns = useMemo(() => CommentData, []);
    const datosConNuevaColumnaMemo = useMemo(() => datosConNuevaColumna(data), [data]);

    /*const table = useTable({
        columns,
        data: datosConNuevaColumnaMemo,
        initialState: {
            pageSize: 10,
            pageIndex: 0
        },
    },
        usePagination
    );*/
    const columns = [
        ...columnDefinitions,
        {
            header: '',
            accessorKey: 'botones',
            size:200,
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
                    if (column.id === "usuario") {
                        if (column.getIsVisible()) {
                            column.show = false;
                            column.toggleVisibility()
                        }
                    }
                })
                
            }
            else {
                table.getAllLeafColumns().map(column => {
                    if (column.id === "usuario") {
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
        <div className="p-2">
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
                                    props.getCommentTable(1, table.getState().pagination.pageSize)
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
                                    props.getCommentTable(props.datat.prevPage, table.getState().pagination.pageSize)
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
                                    props.getCommentTable(props.datat.nextPage, table.getState().pagination.pageSize)
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
                                    props.getCommentTable(props.datat.totalPages, table.getState().pagination.pageSize)
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
                        props.getCommentTable(table.getState().pagination.pageIndex + 1, Number(e.target.value))
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

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue)?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue)?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    )
}
