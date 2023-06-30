import React, { useState } from 'react'
import '../../styles/opcionMultiple.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';

const uploadSVG = svgManager.getSVG('upload');

const OpcionMultiple = () => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [mostrarLogica, setMostrarLogica] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isActiveLogica, setIsActiveLogica] = useState(true);

    const handleEditar = () => {
        setMostrarEditar(!mostrarEditar);
        setMostrarConfiguracion(false);
        setMostrarLogica(false);
        setIsActiveEditar(false)
        setIsActiveConfiguracion(true);
        setIsActiveLogica(true);
    };

    const handleConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
        setMostrarEditar(false);
        setMostrarLogica(false);
        setIsActiveConfiguracion(false)
        setIsActiveEditar(true);
        setIsActiveLogica(true);
    };

    const handleLogica = () => {
        setMostrarLogica(!mostrarLogica);
        setMostrarEditar(false);
        setMostrarConfiguracion(false);
        setIsActiveLogica(false);
        setIsActiveEditar(true);
        setIsActiveConfiguracion(true);
    };

  return (
    <>
        <br />
        <Container className='container-opcionMultiple'>
            <Col className='seccion1-opcionMultiple'>
                <Col className={`editar-opcionMultiple ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                    Editar
                </Col>

                <Col className={`configurar-opcionMultiple ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                    Configuración
                </Col>
                
                <Col className={`logica-opcionMultiple ${isActiveLogica ? 'active' : 'inactive'}`} onClick={handleLogica}>
                    Lógica
                </Col>
            </Col>
            
            {mostrarEditar && (
                <Container className='opcionMultiple-container-editar'>
                    <Col>
                        <select className='selectEditar'>
                            <option value="" selected disabled hidden>Opcion multiple</option>
                            <option value="option1">Opción 1</option>
                            <option value="option2">Opción 2</option>
                            <option value="option3">Opción 3</option>
                        </select>
                    </Col>

                    <Col>
                        <p style={{ marginLeft: '2%', marginBottom: '1%' }}>Pregunta 1</p>
                        <FormControl style={{ width: '94.2%', border: '1px solid #ccc' }} className= 'textoAgradecimiento' type="text" placeholder="Escribe aquí..." />
                    </Col>

                    <Col className='seccion3-opcionMultiple-editar'>
                        <Col>
                            <p>Permitir que el usuario pueda escoger:</p>
                        </Col>
                        <Col>
                            <p>Multiples respuestas </p>
                        </Col>
                        <Col>
                            <p>Una sola respuesta</p>
                        </Col>
                    </Col>
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
