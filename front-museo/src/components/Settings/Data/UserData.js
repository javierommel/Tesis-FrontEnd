import { Badge } from 'reactstrap'
export const UserData = [
    {
        Header: 'Usuario',
        accessor: 'usuario',
    },
    {
        Header: 'Nombres',
        accessor: 'nombre',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Roles',
        accessor: '',
    },
    {
        Header: 'Estado',
        accessor: 'estado',
        style: {
            textAlign: "center",
          },
        Cell: ({ value }) => (
            value===1?<Badge color="success">Activo</Badge>:<Badge className="badge-default">Inactivo</Badge>
          ),
    },
    {
        Header: '',
        accessor: 'botones',
    },
];