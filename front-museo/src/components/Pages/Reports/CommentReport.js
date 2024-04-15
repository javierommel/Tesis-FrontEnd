import React, { useState, useRef } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    FormGroup,
    Input,
    Button,
    Label,
} from 'reactstrap'
import { exportComponentAsPNG, exportComponentAsPDF, exportComponentAsJPEG } from "react-component-export-image";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import commentChart from "./Data/CommentData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CommentReport() {
    const [selectedValue, setSelectedValue] = useState(2);

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };
    const handleClick = () => {
        console.log('res ' + selectedValue)
        if (selectedValue === 0) {
            exportComponentAsPDF(componentRef,
                {
                    fileName: 'comentario',
                    html2CanvasOptions:
                    {
                        backgroundColor: '#525f7f'
                    },
                    pdfOptions: {
                        w: 220,
                        h: 140,
                        orientation: 'p',
                    }
                })
        }
        else if (selectedValue === 1) {
            exportComponentAsPNG(componentRef,
                {
                    fileName: 'comentario',
                    html2CanvasOptions: { backgroundColor: '#525f7f' }
                })
        }
        else {
            exportComponentAsJPEG(componentRef,
                {
                    fileName: 'comentario',
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
                    <div className="pie-museo " ref={componentRef}>
                        <Pie
                            data={commentChart.data}
                            options={commentChart.options}
                        />
                    </div>
                </CardBody>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Label>Tipo Archivo</Label>
                        <FormGroup>
                            <Input type="select" value={selectedValue} onChange={handleChange}>
                                {tipo.map((step) => (
                                    <option style={{ color: '#2b3553' }} value={step.id} key={step.id} >{step.nombre}</option>
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

