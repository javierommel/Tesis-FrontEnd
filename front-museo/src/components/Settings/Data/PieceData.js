import { Badge } from 'reactstrap'

export const PieceData = [
    {
        header: 'ID',
        accessorKey: 'numero_ordinal',
    },
    {
        header: 'Código',
        accessorKey: 'codigo_inpc',
    },
    {
        header: 'Nombre',
        accessorKey: 'nombre',
    },
    {
        header: 'Tipo',
        accessorKey: 'tipo_bien',
    },
    {
        header: 'Autor',
        accessorKey: 'autor',
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
