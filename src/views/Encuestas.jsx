import React from 'react';
import '../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';

const Encuestas = () => {
  return (
    <Container fluid>
      <Row id="encuestas-Row" className="flex">
        <Col xs={4} className="flex encuestas__col pr-5">
          <h2 className="m-0 text-indigo-800">Mis Encuestas</h2>
        </Col>

        <Col xs={8} className="flex encuestas__col">
          <input
            type="text"
            placeholder="Buscar encuesta"
            className="input-filtro w-80 h-12 bg-white border border-gray-300 rounded px-2"
          />
          <Button
            variant="primary"
            className="btn-notisurvey ml-5 w-48 h-12 flex items-center justify-center gap-2 bg-yellow-400 rounded"
            startIcon={<BiPlus />}
          >
            <BiPlus />Crear Encuesta
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Encuestas;
