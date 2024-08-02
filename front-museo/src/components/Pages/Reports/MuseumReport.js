import React, { useState, useRef, useEffect } from 'react'
import { getReport } from "../../../actions/general"
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Input,
    Button,
    Label,
} from 'reactstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { exportComponentAsPNG, exportComponentAsPDF, exportComponentAsJPEG } from "react-component-export-image";

import {museumChart} from "./Data/MuseumData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function MuseumReport() {
    const [selectedValue, setSelectedValue] = useState(2);

    const [carga, setCarga] = useState(false)
    useEffect(() => {
        const tipo = 5
        getReport(tipo).then((dat) => {
            const counts = dat.data.map(item => parseInt(item.visitas));
            const counts1 = dat.data.map(item => parseInt(item.recomendaciones));
            const counts2 = dat.data.map(item => item.nombre);
            if (museumChart.data.datasets && museumChart.data.datasets.length > 0) {
                museumChart.data.labels = counts2;
                museumChart.data.datasets[0].data = counts;
                museumChart.data.datasets[1].data = counts1;
            } else {
                console.error("Datasets array is empty or undefined");
            }
            setCarga(true)
        }).catch((error) => {
            console.error("Error: " + error.message)
        });
    }, []);

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };
    const handleClick = () => {
        if (selectedValue === 0) {
            exportComponentAsPDF(componentRef,
                {
                    fileName: 'piezasvisitadas',
                    html2CanvasOptions:
                    {
                        backgroundColor: '#525f7f'
                    },
                    pdfOptions: {
                        w: 276,
                        h: 160,
                        x:10,
                        y:10,
                        orientation: 'p',
                    }
                })
        }
        else if (selectedValue === 1) {
            exportComponentAsPNG(componentRef,
                {
                    fileName: 'piezasvisitadas',
                    html2CanvasOptions: { backgroundColor: '#525f7f' }
                })
        }
        else {
            exportComponentAsJPEG(componentRef,
                {
                    fileName: 'piezasvisitadas',
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
    const componentRef = useRef();
    return (
        <div>
            <Card className="card-chart card-plain">
                <CardBody>
                    <div className="bar-museo" ref={componentRef}>
                    {carga&&
                        <Bar
                            data={museumChart.data}
                            options={museumChart.options}
                        />}
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

                </Row>
            </Card>
        </div>
    );
}

