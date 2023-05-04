import React from 'react'
import { Container, Row, Col, Button
 } from 'react-bootstrap'

const EstiloEncuesta = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          <Col>
            <h1>Estilo de Encuesta</h1>
          </Col>
          <Col>
            <div className='divEstilo'> 
              Ajustes de estilo
            </div>
          </Col>
          <Col>
            <div className='divEstilo'>  
              Temas
            </div>
          </Col>
        </Col>
        <Col xs={9}>
          /</Col>
       
        </Row>
    </Container>

  )
}

export default EstiloEncuesta
