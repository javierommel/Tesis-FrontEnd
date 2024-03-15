import React, { useRef, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getInformationPiece } from "../../actions/piece"
import classnames from "classnames";
import { labelStyle, titleStyle } from '../../assets/styles/style'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Form,
  FormGroup,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  CustomInput
} from "reactstrap";


export default function PieceForm(props) {
  const [information, setInformation] = useState(false);
  const [codigoinpcFocus, setCodigoinpcFocus] = useState(false);
  const [numeroordinalFocus, setNumeroOrdinalFocus] = useState(false);
  const [numerohistoricoFocus, setNumeroHistoricoFocus] = useState(false);
  const [nombreFocus, setNombreFocus] = useState(false);
  const [autorFocus, setAutorFocus] = useState(false);
  const [typeFocus, setTypeFocus] = useState(false);
  const [otronombreFocus, setOtronombreFocus] = useState(false);
  const [tecnicaFocus, setTecnicaFocus] = useState(false);
  const [otromaterialFocus, setOtromaterialFocus] = useState(false);
  const [sigloFocus, setSigloFocus] = useState(false);
  const [anioFocus, setAniolFocus] = useState(false);
  const [altoFocus, setAltoFocus] = useState(false);
  const [anchoFocus, setAnchoFocus] = useState(false);
  const [diametroFocus, setDiametroFocus] = useState(false);
  const [espesorFocus, setEspesorFocus] = useState(false);
  const [pesoFocus, setPesoFocus] = useState(false);
  const [inscripcionFocus, setInscripcionFocus] = useState(false);
  const [descripcionFocus, setDescripcionFocus] = useState(false);
  const [ubicacionFocus, setUbicacionFocus] = useState(false);
  const [regimenFocus, setRegimenFocus] = useState(false);
  const [estadopiezasFocus, setEstadopiezasFocus] = useState(false);
  const [otrodeterioroFocus, setOtrodeterioroFocus] = useState(false);
  const [estadointegridadFocus, setEstadointegridadFocus] = useState(false);
  const [conservacionFocus, setConservacionFocus] = useState(false);
  const [observacionFocus, setObservacionFocus] = useState(false);
  const [publicidadFocus, setPublicidadFocus] = useState(false);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [registrofotograficoFocus, setRegistrofotograficoFocus] = useState(false);
  const [entidadinvestigadoraFocus, setEntidadinvestigadoraFocus] = useState(false);
  const [registradoFocus, setRegistradoFocus] = useState(false);
  const [fecharegistroFocus, setRecharegistroFocus] = useState(false);
  const [revisadoFocus, setRevisadoFocus] = useState(false);
  const [fecharevisionFocus, setFecharevisionFocus] = useState(false);
  const [realizafotoFocus, setRealizafotoFocus] = useState(false);
  const imagen1Ref = useRef();
  const imagen2Ref = useRef();
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    props.handleUpdate(valoresInicialesp.numero_ordinal, data, imagen1, imagen2, information,false)
  }
  const onCancelar = () => {
    props.handleUpdate(valoresInicialesp.numero_ordinal, null, null, null, null, true)
  }

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const uint8Array1 = valoresInicialesp.imagen1 ? new Uint8Array(valoresInicialesp.imagen1.data) : null;
    const blob1 = uint8Array1 ? new Blob([uint8Array1]) : null;
    setImagen1(blob1 ? URL.createObjectURL(blob1) : null);

    const uint8Array2 = valoresInicialesp.imagen2 ? new Uint8Array(valoresInicialesp.imagen2.data) : null;
    const blob2 = uint8Array2 ? new Blob([uint8Array2]) : null;
    setImagen2(blob2 ? URL.createObjectURL(blob2) : null);
    getInformationPiece().then((dat) => {
      setInformation(dat.data);
    })
      .catch((error) => {
        console.log("error" + error.message)
      });
  }, []);

  const { valoresInicialesp } = props
  const materialesSeleccionados = valoresInicialesp.materiales && valoresInicialesp.materiales.split(',').map(material => parseInt(material.trim()));
  const deteriorosSeleccionados = valoresInicialesp.deterioros && valoresInicialesp.deterioros.split(',').map(deterioro => parseInt(deterioro.trim()));

  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Row>
            <Col lg="6" md="6">
              <br />
              <Controller
                name="estado"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <>
                    <CustomInput
                      {...field}
                      type="switch"
                      id="switch-2"
                      label={field.value ? 'Activado' : 'Desactivado'}
                      checked={field.value}
                    />
                  </>
                )}
              />
              <br />
            </Col>
            <Col lg="6" md="6">
            </Col>
            <Col lg="6" >
              <Controller
                name="numero_ordinal"
                control={control}
                defaultValue={valoresInicialesp.numero_ordinal}
                rules={{ required: 'El número ordinal es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup disabled
                      className={classnames({
                        "input-group-focus": numeroordinalFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Id
                      </InputGroupText>
                      <Input disabled
                        {...field}
                        placeholder="Numero Ordinal"
                        type="text"
                        onFocus={(e) => setNumeroOrdinalFocus(true)}
                        onBlur={(e) => setNumeroOrdinalFocus(false)}
                      />
                    </InputGroup>
                    {errors.numero_ordinal && <div className="typography-line"><p className="text-danger">{errors.numero_ordinal.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6">
              <Controller
                name="codigo_inpc"
                control={control}
                defaultValue={valoresInicialesp.codigo_inpc}
                rules={{ required: 'El codigo INPC es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": codigoinpcFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        INPC
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Código INPC"
                        type="text"
                        onFocus={(e) => setCodigoinpcFocus(true)}
                        onBlur={(e) => setCodigoinpcFocus(false)}
                      />
                    </InputGroup>
                    {errors.codigo_inpc && <div className="typography-line"><p className="text-danger">{errors.codigo_inpc.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="numero_historico"
                control={control}
                defaultValue={valoresInicialesp.numero_historico}
                rules={{ required: 'El numero histórico del Museo es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": numerohistoricoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Código
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Código del Museo"
                        type="text"
                        onFocus={(e) => setNumeroHistoricoFocus(true)}
                        onBlur={(e) => setNumeroHistoricoFocus(false)}
                      />
                    </InputGroup>
                    {errors.numero_historico && <div className="typography-line"><p className="text-danger">{errors.numero_historico.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="tipo_bien"
                control={control}
                defaultValue={valoresInicialesp.tipo_bien}
                rules={{ required: 'El tipo de bien es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": typeFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Tipo
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Tipo Pieza"
                        type="select"
                        onFocus={(e) => setTypeFocus(true)}
                        onBlur={(e) => setTypeFocus(false)}
                        style={{ color: '#ffffff' }}
                      >
                        <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                          Tipo Pieza
                        </option>
                        {information?.type?.map((step) => (
                          <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                        ))}
                      </Input>
                    </InputGroup>
                    {errors.tipo_bien && <div className="typography-line"><p className="text-danger">{errors.tipo_bien.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="nombre"
                control={control}
                defaultValue={valoresInicialesp.nombre}
                rules={{ required: 'El nombre de la obra es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": nombreFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Nombre
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Nombre de la Obra"
                        type="text"
                        onFocus={(e) => setNombreFocus(true)}
                        onBlur={(e) => setNombreFocus(false)}
                      />
                    </InputGroup>
                    {errors.nombre && <div className="typography-line"><p className="text-danger">{errors.nombre.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="otro_nombre"
                control={control}
                defaultValue={valoresInicialesp.otro_nombre}
                render={({ field }) => (
                  <>
                    <InputGroup disabled
                      className={classnames({
                        "input-group-focus": otronombreFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Otro Nom.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Otro nombre..."
                        type="text"
                        onFocus={(e) => setOtronombreFocus(true)}
                        onBlur={(e) => setOtronombreFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Row style={{ padding: '20px' }}>
              <Col lg="2">
                <InputGroupText style={titleStyle} >
                  Materiales
                </InputGroupText>
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              {information && information.material.map((option) =>
              (
                <Col lg="2" sm="3">
                  <Controller
                    key={option.id}
                    name={`materiales[${option.id}]`}
                    control={control}
                    defaultValue={materialesSeleccionados && materialesSeleccionados.includes(option.id)}
                    render={({ field }) => <FormGroup check>
                      <Label check>
                        <Input key={option.id} id={option.id}
                          type="checkbox"
                          {...field}
                          defaultChecked={materialesSeleccionados && materialesSeleccionados.includes(option.id)}
                        />
                        <span className="form-check-sign" />
                        {option.nombre}
                      </Label>
                    </FormGroup>}
                  />
                </Col>
              ))
              }
            </Row>
            <Col lg="6" >
              <Controller
                name="otro_material"
                control={control}
                defaultValue={valoresInicialesp.otro_material}
                render={({ field }) => (
                  <>
                    <InputGroup disabled
                      className={classnames({
                        "input-group-focus": otromaterialFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Otro
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Otro material..."
                        type="text"
                        onFocus={(e) => setOtromaterialFocus(true)}
                        onBlur={(e) => setOtromaterialFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="tecnica"
                control={control}
                defaultValue={valoresInicialesp.tecnica}
                rules={{ required: 'La técnica es obligatoria.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": tecnicaFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Técnica
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Tipo Técnica"
                        type="select"
                        onFocus={(e) => setTecnicaFocus(true)}
                        onBlur={(e) => setTecnicaFocus(false)}
                        style={{ color: '#FFFFFFCC' }}
                      >
                        <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                          Tipo Técnica
                        </option>
                        {information?.technique?.map((step) => (
                          <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                        ))}
                      </Input>
                    </InputGroup>
                    {errors.tecnica && <div className="typography-line"><p className="text-danger">{errors.tecnica.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="autor"
                control={control}
                defaultValue={valoresInicialesp.autor}
                rules={{ required: 'El autor es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": autorFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Autor
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Autor"
                        type="text"
                        onFocus={(e) => setAutorFocus(true)}
                        onBlur={(e) => setAutorFocus(false)}
                      />
                    </InputGroup>
                    {errors.autor && <div className="typography-line"><p className="text-danger">{errors.autor.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="siglo"
                control={control}
                defaultValue={valoresInicialesp.siglo}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": sigloFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Siglo
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Siglo"
                        type="text"
                        onFocus={(e) => setSigloFocus(true)}
                        onBlur={(e) => setSigloFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="anio"
                control={control}
                defaultValue={valoresInicialesp.anio}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": anioFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Año
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Año"
                        type="text"
                        onFocus={(e) => setAniolFocus(true)}
                        onBlur={(e) => setAniolFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6"></Col>
            <Col lg="2">
              <InputGroupText style={titleStyle} >
                Dimensiones
              </InputGroupText>
            </Col>
            <Col lg="2" >
              <Controller
                name="alto"
                control={control}
                defaultValue={valoresInicialesp.alto}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": altoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Alto
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Alto..."
                        type="text"
                        onFocus={(e) => setAltoFocus(true)}
                        onBlur={(e) => setAltoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="2" >
              <Controller
                name="ancho"
                control={control}
                defaultValue={valoresInicialesp.ancho}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": anchoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Ancho
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Ancho..."
                        type="text"
                        onFocus={(e) => setAnchoFocus(true)}
                        onBlur={(e) => setAnchoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="2" >
              <Controller
                name="diametro"
                control={control}
                defaultValue={valoresInicialesp.diametro}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": diametroFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Diámetro
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Diámetro..."
                        type="text"
                        onFocus={(e) => setDiametroFocus(true)}
                        onBlur={(e) => setDiametroFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="2" >
              <Controller
                name="espesor"
                control={control}
                defaultValue={valoresInicialesp.espesor}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": espesorFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Espesor
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Espesor..."
                        type="text"
                        onFocus={(e) => setEspesorFocus(true)}
                        onBlur={(e) => setEspesorFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="2" >
              <Controller
                name="peso"
                control={control}
                defaultValue={valoresInicialesp.peso}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": pesoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Peso
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Peso..."
                        type="text"
                        onFocus={(e) => setPesoFocus(true)}
                        onBlur={(e) => setPesoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="inscripcion"
                control={control}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": inscripcionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Inscripc.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Inscripciones..."
                        type="textarea"
                        onFocus={(e) => setInscripcionFocus(true)}
                        onBlur={(e) => setInscripcionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="descripcion"
                control={control}
                defaultValue={valoresInicialesp.descripcion}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": descripcionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Descripc.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Descripción"
                        type="textarea"
                        onFocus={(e) => setDescripcionFocus(true)}
                        onBlur={(e) => setDescripcionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="ubicacion"
                control={control}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": ubicacionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Ubicación
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Ubicación en el museo"
                        type="text"
                        onFocus={(e) => setUbicacionFocus(true)}
                        onBlur={(e) => setUbicacionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="regimen"
                control={control}
                defaultValue={valoresInicialesp.regimen}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": regimenFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Régimen
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Régimen de Propiedad..."
                        type="text"
                        onFocus={(e) => setRegimenFocus(true)}
                        onBlur={(e) => setRegimenFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="estado_piezas"
                control={control}
                defaultValue={valoresInicialesp.estado_piezas}
                rules={{ required: 'El estado de la pieza de arte es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": estadopiezasFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Estado
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Estado General"
                        type="select"
                        onFocus={(e) => setEstadopiezasFocus(true)}
                        onBlur={(e) => setEstadopiezasFocus(false)}
                        style={{ color: '#FFFFFFCC' }}
                      >
                        <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                          Estado General...
                        </option>
                        {information?.state?.map((step) => (
                          <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                        ))}
                      </Input>
                    </InputGroup>
                    {errors.estado_piezas && <div className="typography-line"><p className="text-danger">{errors.estado_piezas.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="otro_deterioro"
                control={control}
                defaultValue={valoresInicialesp.otro_deterioro}
                render={({ field }) => (
                  <>
                    <InputGroup disabled
                      className={classnames({
                        "input-group-focus": otrodeterioroFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Otro Det.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Otro deterioro..."
                        type="text"
                        onFocus={(e) => setOtrodeterioroFocus(true)}
                        onBlur={(e) => setOtrodeterioroFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Row style={{ padding: '20px' }}>
              <Col lg="2">
                <InputGroupText style={titleStyle} >
                  Deterioros
                </InputGroupText>
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              <Col lg="2">
              </Col>
              {information && information.deterioration.map((option) =>
              (
                <Col lg="2" sm="3">
                  <Controller
                    key={option.id}
                    name={`deterioros[${option.id}]`}
                    control={control}
                    defaultValue={deteriorosSeleccionados && deteriorosSeleccionados.includes(option.id)}
                    render={({ field }) => <FormGroup check>
                      <Label check>
                        <Input key={option.id} id={option.id}
                          type="checkbox"
                          {...field}
                          defaultChecked={deteriorosSeleccionados && deteriorosSeleccionados.includes(option.id)}
                        />
                        <span className="form-check-sign" />
                        {option.nombre}
                      </Label>
                    </FormGroup>}
                  />
                </Col>
              ))
              }
            </Row>
            <Col lg="6" >
              <Controller
                name="estado_integridad"
                control={control}
                defaultValue={valoresInicialesp.estado_integridad}
                rules={{ required: 'El estado de integridad es obligatorio.' }}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": estadointegridadFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Integridad
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Estado de Integridad..."
                        type="select"
                        onFocus={(e) => setEstadointegridadFocus(true)}
                        onBlur={(e) => setEstadointegridadFocus(false)}
                        style={{ color: '#FFFFFFCC' }}
                      >
                        <option style={{ color: '#434444' }} key={"0"} disabled value="0" >
                          Estado Integridad
                        </option>
                        {information?.integrity?.map((step) => (
                          <option style={{ color: '#2b3553' }} key={step.id} value={step.id}>{step.nombre}</option>
                        ))}
                      </Input>
                    </InputGroup>
                    {errors.estado_integridad && <div className="typography-line"><p className="text-danger">{errors.estado_integridad.message}</p></div>}
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="conservacion"
                control={control}
                defaultValue={valoresInicialesp.conservacion}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": conservacionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Conserv.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Conservación Preventiva"
                        type="text"
                        onFocus={(e) => setConservacionFocus(true)}
                        onBlur={(e) => setConservacionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="observacion"
                control={control}
                defaultValue={valoresInicialesp.observacion}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": observacionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Observ.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Observaciones"
                        type="textarea"
                        onFocus={(e) => setObservacionFocus(true)}
                        onBlur={(e) => setObservacionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="publicidad"
                control={control}
                defaultValue={valoresInicialesp.publicidad}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": publicidadFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Publicidad
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Información de imagen"
                        type="text"
                        onFocus={(e) => setPublicidadFocus(true)}
                        onBlur={(e) => setPublicidadFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <InputGroupText style={labelStyle} >
                Imagen1
              </InputGroupText>
              <img
                alt="   Seleccione una imagen..."
                className="img-center img-fluid"
                src={imagen1}
                style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                onClick={() => {
                  imagen1Ref.current.click();
                }}
              />
              <input ref={imagen1Ref} type="file" onChange={handleImage1Change} hidden />
              <br />
            </Col>
            <Col lg="6" >
              <InputGroupText style={labelStyle} >
                Imagen2
              </InputGroupText>
              <img
                alt="   Seleccione una imagen..."
                className="img-center img-fluid"
                src={imagen2}
                style={{ width: '150px', height: '100px', borderRadius: '5%', borderStyle: 'solid', cursor: 'pointer' }}
                onClick={() => {
                  imagen2Ref.current.click();
                }}
              />
              <input ref={imagen2Ref} type="file" onChange={handleImage2Change} hidden />
              <br />
            </Col>
            <Col lg="6" >
              <Controller
                name="registro_fotográfico"
                control={control}
                defaultValue={valoresInicialesp.registro_fotográfico}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": registrofotograficoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Reg. Foto.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Código Fotográfico"
                        type="text"
                        onFocus={(e) => setRegistrofotograficoFocus(true)}
                        onBlur={(e) => setRegistrofotograficoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="entidad_investigadora"
                control={control}
                defaultValue={valoresInicialesp.entidad_investigadora}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": entidadinvestigadoraFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Ent. Inv.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Entidad Investigadora"
                        type="text"
                        onFocus={(e) => setEntidadinvestigadoraFocus(true)}
                        onBlur={(e) => setEntidadinvestigadoraFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="registrado"
                control={control}
                defaultValue={valoresInicialesp.registrado}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": registradoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Registro
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Registrado por..."
                        type="text"
                        onFocus={(e) => setRegistradoFocus(true)}
                        onBlur={(e) => setRegistradoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="fecha_registro"
                control={control}
                defaultValue={valoresInicialesp.fecha_registro}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": fecharegistroFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        F. Reg.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Fecha Registro..."
                        type="text"
                        onFocus={(e) => setRecharegistroFocus(true)}
                        onBlur={(e) => setRecharegistroFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="revisado"
                control={control}
                defaultValue={valoresInicialesp.revisado}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": revisadoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Revisado
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Revisado por..."
                        type="text"
                        onFocus={(e) => setRevisadoFocus(true)}
                        onBlur={(e) => setRevisadoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="fecha_revision"
                control={control}
                defaultValue={valoresInicialesp.fecha_revision}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": fecharevisionFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        F. Rev.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Fecha Revisión..."
                        type="text"
                        onFocus={(e) => setFecharevisionFocus(true)}
                        onBlur={(e) => setFecharevisionFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
            <Col lg="6" >
              <Controller
                name="realiza_foto"
                control={control}
                defaultValue={valoresInicialesp.realiza_foto}
                render={({ field }) => (
                  <>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": realizafotoFocus,
                      })}
                    >
                      <InputGroupText style={labelStyle} >
                        Real. Foto.
                      </InputGroupText>
                      <Input
                        {...field}
                        placeholder="Realiza Foto..."
                        type="text"
                        onFocus={(e) => setRealizafotoFocus(true)}
                        onBlur={(e) => setRealizafotoFocus(false)}
                      />
                    </InputGroup>
                  </>
                )}
              />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button color="info" size="sm" sm="6" type="submit">
            Guardar
          </Button>
          <Button color="warning" size="sm" sm="6" onClick={onCancelar}>
            Cancelar
          </Button>
        </CardFooter>
      </Form>
    </div >

  )
}
