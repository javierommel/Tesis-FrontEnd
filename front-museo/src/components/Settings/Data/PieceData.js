import { Badge } from 'reactstrap'

export const PieceData = [
    {
        Header: 'ID',
        accessor: 'numero_ordinal',
    },
    {
        Header: 'Código',
        accessor: 'codigo_inpc',
    },
    {
        Header: 'Nombre',
        accessor: 'nombre',
    },
    {
        Header: 'Tipo',
        accessor: 'tipo',
    },
    {
        Header: 'Autor',
        accessor: 'autor',
    },
    {
        Header: 'Estado',
        accessor: 'estado',
        Cell: ({ value }) => (
            value===1?<Badge color="success">Activo</Badge>:<Badge className="badge-default">Inactivo</Badge>
          ),
    },
    {
        Header: '',
        accessor: 'botones',
    },
];
