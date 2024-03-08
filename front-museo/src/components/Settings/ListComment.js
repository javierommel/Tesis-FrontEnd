import React, { useMemo, useState } from 'react'

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
import { CommentData as columnDefinitions } from "./Data/CommentData"
import '../../assets/css/table.css';
import { Button, Tooltip } from "reactstrap";

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
        <span>
            <Button id={'b-' + id} color="default" size="sm" onClick={() => handleClick(id, estado)}>
                <i className="tim-icons icon-button-power" />
            </Button>
            <Tooltip
                placement="left"
                isOpen={tooltipOpen}
                target={'b-' + id}
                toggle={toggle}
            >
                {estado === 0 ? "Activar" : "Desactivar"}
            </Tooltip>
        </span>
        <Button color="default" size="sm" onClick={handleDelete(id)}>
            <i className="tim-icons icon-trash-simple" />

        </Button></>
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
            header: 'Acciones',
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
