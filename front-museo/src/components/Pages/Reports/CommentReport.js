import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import commentChart from "./Data/CommentData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CommentReport() {

    return (
        <div>
            <Card className="card-chart card-plain">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <hr className="line-info" />
                            <h5 className="card-category">Total Inversiones</h5>
                            <CardTitle tag="h2">Performance</CardTitle>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Pie
                            data={commentChart.data}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

