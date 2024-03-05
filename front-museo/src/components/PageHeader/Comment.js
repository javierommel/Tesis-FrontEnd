import React, {useState, useEffect}  from 'react';
import Rating from 'react-rating';
import { formatDistanceToNow } from 'date-fns';
import {
    Row,
    Col,
  } from "reactstrap";

export default function Comment({data}) {
    const timeAgo = formatDistanceToNow(new Date(data.fecha_registro), { addSuffix: true });

    return (
        <Row>
        <Col lg="3"><img
          alt="..."
          className="img-center img-fluid rounded-circle"
          src={data.usuario_id.avatar?data.usuario_id.avatar:require("assets/img/avatar2.png")}
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
        /></Col>
        <Col>
          <h5>{data.usuario_id.nombre}<span style={{ color: "gray", fontSize: '80%', whiteSpace: 'nowrap' }}> - {timeAgo}</span></h5>
          <p style={{ color: "gray" }}>
            {data.comentario}
          </p>
          <Row>
            <Col ></Col>
            <Col ><h5>{data.puntuacion} pts </h5></Col>
            <Col ><Rating
              emptySymbol={<img style={{ width: '25px', height: '25px' }} src={require("assets/img/pngwing.com1.png")} className="icon" />}
              fullSymbol={<img style={{ width: '20px', height: '20px' }} src={require("assets/img/pngwing.com.png")} className="icon" />}
              style={{ float: 'right' }}
              readonly
              initialRating={data.puntuacion}
            /></Col>
          </Row>
        </Col>
      </Row>
    );
};