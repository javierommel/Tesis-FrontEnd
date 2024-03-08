import { Badge } from 'reactstrap'


export const UserData = [
    {
        header: 'Usuario',
        accessorKey: 'usuario',
    },
    {
        header: 'Nombres',
        accessorKey: 'nombre',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Roles',
        accessorKey: '',
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
        cell: value => (
            value.getValue()===1?<Badge color="success">Activo</Badge>:<Badge className="badge-default">Inactivo</Badge>
          ),
    },
    
];