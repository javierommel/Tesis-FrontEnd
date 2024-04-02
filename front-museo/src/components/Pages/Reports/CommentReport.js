import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap'
import { Line } from "react-chartjs-2";
import commentChart from "./Data/CommentData";
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
                        <Line
                            data={commentChart.data}
                            options={commentChart.options}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

