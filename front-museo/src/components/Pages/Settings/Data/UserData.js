import { Badge } from 'reactstrap'


export const UserData = [
    {
        header: 'Usuario',
        accessorKey: 'usuario',
        enableColumnFilter: true,
    },
    {
        header: 'Nombres',
        accessorKey: 'nombre',
        enableColumnFilter: false,
    },
    {
        header: 'Email',
        accessorKey: 'email',
        enableColumnFilter: false,
    },
    {
        header: 'Roles',
        accessorKey: 'rolesname',
        enableColumnFilter: false,
    },
    {
        header: 'Estado',
        accessorKey: 'estado',
        enableColumnFilter: false,
        cell: value => (
            <div style={{ alignContent: 'center', width: '10%' }}>
                {value.getValue() === 1 ? <Badge color="success">Activo</Badge> : <Badge className="badge-default">Inactivo</Badge>}
            </div>
        ),
    },
    
];