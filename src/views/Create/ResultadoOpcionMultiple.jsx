import React from 'react';
import '../../styles/resultadoOpcionMultiple.css'
import { Col, Container } from 'react-bootstrap';

const ResultadoOpcionMultiple = ({ index, pregunta, opciones }) => {
  return (
    <Container className='container-resultadoOpcionMultiple'>
      <p>{index + 1}. {pregunta}</p>
      
      {opciones.map((opcion) => (
        <Col key={opcion.id} style={{ display: 'flex'}}>
          <input
            type={opcion.type}
            name={`opcion_${index}`}
            value={opcion.id}
            checked={opcion.checked}
            onChange={() => {}}
            style={{marginRight: '2%'}}
          />
          <div style={{ marginBottom: '0.4%'}}>
            {opcion.text}
          </div>
        </Col>
      ))}
    </Container>
  );
};

export default ResultadoOpcionMultiple;
