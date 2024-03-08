import { Badge } from 'reactstrap'
export const CommentData = [
    /*{
        Header: 'Usuario',
        accessor: 'usuario',
        headerStyle: {
            width: '50%',  // Puedes ajustar este porcentaje según tus necesidades
        },
    },
    {
        Header: 'Commentario',
        accessor: 'comentario',
        width: '50%',  // Porcentaje relativo
    },
    {
        Header: 'Estado',
        accessor: 'estado',
        Cell: ({ value }) => (
            <div style={{ textAlign: 'center', width: '10%' }}>
                {value === 1 ? <Badge color="success">Activo</Badge> : <Badge className="badge-default">Inactivo</Badge>}
            </div>
        ),
    },
    {
        Header: '',
        accessor: 'botones'
    },*/
    {
        header: 'Usuario',
        accessorKey: 'usuario',
    },
    {
        header: 'Commentario',
        accessorKey: 'comentario',
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
        cell: value => (
            <div style={{ textAlign: 'center', width: '10%' }}>
                {value.getValue() === 1 ? <Badge color="success">Activo</Badge> : <Badge className="badge-default">Inactivo</Badge>}
            </div>
        ),
    },
    
];