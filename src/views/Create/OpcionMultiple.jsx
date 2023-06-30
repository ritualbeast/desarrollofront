import React, { useState } from 'react'
import '../../styles/opcionMultiple.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';

const uploadSVG = svgManager.getSVG('upload');

const OpcionMultiple = () => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [mostrarLogica, setMostrarLogica] = useState(false);

    const handleEditar = () => {
        setMostrarEditar(!mostrarEditar);
    };

    const handleConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
    };

    const handleLogica = () => {
        setMostrarLogica(!mostrarLogica);
    };

  return (
    <>
        <br />
        <Container className='encuesta-SeccionCierre'>
            <Col>
                <Col onClick={handleEditar}>
                    Editar
                </Col>

                <Col onClick={handleConfiguracion}>
                    Configuración
                </Col>
                
                <Col onClick={handleLogica}>
                    Lógica
                </Col>
            </Col>
            
            {mostrarEditar && (
                <Container className='opcionMultiple-container-editar'>
                    <p>Editar</p>
                </Container>
            )}

            {mostrarConfiguracion && (
                <Container className='opcionMultiple-container-configuracion'>
                    <p>Configuracion</p>
                </Container>
            )}

            {mostrarLogica && (
                <Container className='opcionMultiple-container-logica'>
                    <p>Logica</p>
                </Container>
            )}

            <Col className='seccion6-opcionMultiple'>
                <Button className='cancelarOpcionMultiple'>
                    Cancelar
                </Button>
                    
                <Button className='guardarOpcionMultiple'>
                    Guardar
                </Button>
            </Col>
        </Container>    
    </>
  )
}

export default OpcionMultiple
