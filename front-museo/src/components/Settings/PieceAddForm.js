import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  Form,
  InputGroup,
  Row,
  Col,
} from "reactstrap";


export default function PieceForm(props) {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const onSubmit = () => {
    props.handleSubmit(file, false)
  }

  const onCancelar = () => {
    props.handleSubmit(null, true)
  }

  return (
    <div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <>
          <CardBody>
            <Row>
              <Col lg="10" sm="6">
                <Controller
                  name="file"
                  control={control}
                  
                  render={({ field }) => (
                    <>
                      <InputGroup>
                        <Input
                          {...field}
                          type="file"
                          onChange={handleFileChange}
                        />
                      </InputGroup>
                      {errors.file && <div className="typography-line"><p className="text-danger">{errors.file.message}</p></div>}
                    </>
                  )}
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button color="primary" size="sm" type="submit">
              Guardar
            </Button>
            <Button color="primary" size="sm" onClick={onCancelar}>
              Cancelar
            </Button>
          </CardFooter>
        </>

      </Form>
    </div>

  )
}
