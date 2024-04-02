import { Badge } from 'reactstrap'
export const CommentData = [
    {
        header: 'Usuario',
        accessorKey: 'usuario',
    },
    {
        header: 'Commentario',
        accessorKey: 'comentario',
        size: 200,
        maxSize: 200, 
        maxWidth:200,
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