import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import '../../styles/añadirLogo.css';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');

const ModalAgregarFondo = () => {

  return (
    <>
        <Container>
          <Row className='contenedor-añadirLogo'>
            <Col>
              <span dangerouslySetInnerHTML={{ __html: uploadCloudSVG }}/>
            </Col>
            <Col className='contendorTitulo-añadirLogo'>
              <h2 className='titulo-añadirLogo'>Arrastra y suelta una imagen o </h2>
              <h2 className='titulo-añadirLogo-2' href="#">Explora</h2>
            </Col>
            <Col>
              <h2 className='comentario-añadirLogo'>La imagen debe tener un tamaño de 500px x 100px y ser en formato JPEG o PNG</h2>
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default ModalAgregarFondo
