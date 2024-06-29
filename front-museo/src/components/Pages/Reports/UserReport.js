import React, { useState, useRef, useEffect } from 'react'
import { getReport } from "../../../actions/general"
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Input,
    Button,
    Label,
} from 'reactstrap'
import { exportComponentAsPNG, exportComponentAsPDF, exportComponentAsJPEG } from "react-component-export-image";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { utils, writeFile } from 'xlsx';
import ExcelJS from 'exceljs';
import { userChart, dataUserVisit, dataUserTime } from "./Data/UserData";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function UserReport() {

    const [selectedValue, setSelectedValue] = useState(2);

    const [carga, setCarga] = useState(false)
    const anioActual = new Date().getFullYear();
    const anios = Array.from({ length: 80 }, (_, index) => anioActual - index);
    useEffect(() => {
        const tipo = 1
        getReport(tipo).then((dat) => {
            //console.log("asdf: "+JSON.stringify(dat.data))
            const counts = dat.data.map(item => parseInt(item.nacional));
            const counts1 = dat.data.map(item => parseInt(item.internacional));
            if (userChart.data.datasets && userChart.data.datasets.length > 0) {
                userChart.data.datasets[0].data = counts;
                userChart.data.datasets[1].data = counts1;
            } else {
                console.error("Datasets array is empty or undefined");
            }
            setCarga(true)
        }).catch((error) => {
            console.log("error" + error.message)
        });
    }, []);

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };
    const handleClick = () => {
        //console.log('res ' + selectedValue)
        if (selectedValue === 0) {
            exportComponentAsPDF(componentRef,
                {
                    fileName: 'nrovisitas',
                    html2CanvasOptions:
                    {
                        backgroundColor: '#525f7f'
                    },
                    pdfOptions: {
                        w: 276,
                        h: 160,
                        x: 10,
                        y: 10,
                        orientation: 'p',
                    }
                })
        }
        else if (selectedValue === 1) {
            exportComponentAsPNG(componentRef,
                {
                    fileName: 'nrovisitas',
                    html2CanvasOptions: { backgroundColor: '#525f7f' }
                })
        }
        else {
            exportComponentAsJPEG(componentRef,
                {
                    fileName: 'nrovisitas',
                    html2CanvasOptions: { backgroundColor: '#525f7f' }
                })
        }
    };
    const tipo = [
        {
            id: 0,
            nombre: 'PDF'
        },
        {
            id: 1,
            nombre: 'PNG'
        },
        {
            id: 2,
            nombre: 'JPEG'
        }
    ]

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('DatosUsuario');

        // Definir encabezados de columna con estilos
        worksheet.columns = [
            { header: 'Usuario', key: 'usuario', width: 40, style: { alignment: { horizontal: 'center' } } },
            { header: 'Nombre', key: 'nombre', width: 40, style: { alignment: { horizontal: 'center' } } },
            { header: 'NroVisitas', key: 'nrovisitas', width: 10, style: { alignment: { horizontal: 'center' } } },
            { header: 'Pais', key: 'pais', width: 30 },
            { header: 'Edad', key: 'edad', width: 30 },
        ];

        const tipo = 2;
        const resultado = await getReport(tipo);
        // Poblar filas de datos
        resultado.data.forEach((row) => {
            worksheet.addRow(row);
        });
        /*dataUserVisit.forEach((row) => {
            worksheet.addRow(row);
        });*/

        const headerRow = worksheet.getRow(1); // Get row 1 (header row)
        headerRow.eachCell((cell) => {
            cell.font = { bold: true }; // Apply bold font to each cell in header row
        });
        // Guardar el libro de trabajo en un archivo
        const fileName = 'NumeroVisitas.xlsx';
        try {
            const buffer = workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const fileUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                link.click();
            })

        } catch (error) {
            console.error('Error al exportar el archivo Excel:', error);
        }
    };
    const handleExportT = async () => {
        const tipo = 3;
        const resultado = await getReport(tipo);
        const worksheet = utils.json_to_sheet(resultado.data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Usuarios');
        writeFile(workbook, 'TiempoVisitas.xlsx'); // Triggers a download in the browser
    };
    const componentRef = useRef();
    return (
        <div>
            <Card className="card-chart card-plain">
                {/*<CardHeader>
                <Row>
                    <Col md="3">
                        <FormGroup className='w-100'>
                            <Input type="select" value={selectedValue} onChange={handleChange}>
                                {anios.map((step) => (
                                    <option style={{ color: '#2b3553' }} key={step} value={step}>{step}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <Button
                            className="btn btn-lg w-100 float-right"
                            color="info"
                            onClick={handleClick}
                        >
                            Cargar Reporte
                        </Button>
                    </Col>
                    </Row>
                            </CardHeader>*/}
                <CardBody>
                    <div className="line-museo" ref={componentRef}>
                        {carga &&
                            <Line
                                data={userChart.data}
                                options={userChart.options}
                            />
                        }
                    </div>
                </CardBody>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Label>Tipo Archivo</Label>
                        <FormGroup>
                            <Input type="select" value={selectedValue} onChange={handleChange}>
                                {tipo.map((step) => (
                                    <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button
                            className="btn btn-lg w-100 float-right"
                            color="info"
                            onClick={handleClick}
                        >
                            Exportar Gráfico
                        </Button>
                    </Col>
                    <Col md="3"></Col>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Button
                            className="btn btn-lg w-100 float-right"
                            color="info"
                            onClick={handleExport}
                        >
                            Reporte Usuario Visitas .xlsx
                        </Button>
                    </Col>
                    <Col md="3"></Col>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Button
                            className="btn btn-lg w-100 float-right"
                            color="info"
                            onClick={handleExportT}
                        >
                            Reporte Tiempo Visita .xlsx
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

