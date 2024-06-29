import Rating from 'react-rating';
import { formatDistanceToNow } from 'date-fns';
import {
  Row,
  Col,
} from "reactstrap";

export default function Comment({ data }) {
  const timeAgo = formatDistanceToNow(new Date(data.fecha_registro), { addSuffix: true });

  return (
    <Row key={data.id} className={data.destacado===1?"comentario-destacado":"comentario-normal"}>
      <Col lg="3"><img
        alt="..."
        className="img-center img-fluid rounded-circle"
        src={data.usuario_id.avatar ? data.usuario_id.avatar : require("assets/img/avatar.jpg")}
        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
      /></Col>
      <Col>
        <h5>{data.usuario_id.nombre}<span style={{ color: "#bdb8b8", fontSize: '80%', whiteSpace: 'nowrap' }}> - {timeAgo}</span></h5>
        <p style={{ color: "#bdb8b8" }}>
          {data.comentario}
        </p>
        <Row>
          <Col lg="7" md="6"></Col>
          <Col lg="2" md="6" style={{textAlign:"end"}}>
            <h5>{data.puntuacion} pts </h5>
          </Col>
          <Col lg="3" md="6"><Rating
            emptySymbol={<img alt="..." style={{ width: '25px', height: '25px' }} src={require("assets/img/pngwing.com1.png")} className="icon" />}
            fullSymbol={<img alt="..." style={{ width: '20px', height: '20px' }} src={require("assets/img/pngwing.com.png")} className="icon" />}
            style={{ float: 'right' }}
            readonly
            initialRating={data.puntuacion}
          /></Col>
        </Row>
      </Col>
    </Row>
  );
};