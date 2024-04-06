import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap'
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
import userChart from "./Data/UserData";
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
                        <Line
                            data={userChart.data}
                            options={userChart.options}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

