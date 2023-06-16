import React, { useEffect, useState } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { lista } from '../prisma/data/listaEncuesta.ts';
import { listaBancoPreguntas } from '../prisma/data/listaBancoPreguntas.ts';
import svgManager from '../assets/svg';

const circleSVG = svgManager.getSVG('circle');
const chevronsNightSVG = svgManager.getSVG('chevron-rigth');
const eyeSVG = svgManager.getSVG('eye');
const chevronsLeftSVG = svgManager.getSVG('chevrons-left');
const helpCircleSVG = svgManager.getSVG('help-circle');

const Create = () => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [showBancoPreguntas, setShowBancoPreguntas] = useState(true);

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
      };
      
    useEffect(() => {
        setShowBancoPreguntas(true);
    }, []);

    const handleNestedClick = (nombre) => {
        // Lógica para manejar el clic en las opciones desplegadas
    };

    return (
        <>
            <Container fluid className='encuesta-container'>
                <Row>
                    <Col xs={2} className="encuestas_coltitulo_create">
                        <h2 className='encuesta-titulo-create'>Encuesta Veris</h2>
                    </Col>
                    
                    <Col xs={2} className="encuestas_colsg_create">
                        <div className='encuestas_colsg_create_1'>
                            <div className='encuestas_colsg1'>
                                <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circleSVG }}/>
                                <h2 className='encuesta-sg-create_1_1'>Diseña Encuesta</h2>
                            </div>
                            <div>
                                <span className='imgchevron' dangerouslySetInnerHTML={{ __html: chevronsNightSVG }}/>
                            </div>
                            <div className='encuestas_colsg1'>
                                <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circleSVG }}/>
                                <h2 className='encuesta-sg-create_1_2'>Revisión</h2>
                            </div>
                        </div>
                        <div className='encuestas_colsg_create_2'>
                            <Button className='encuesta-sg-buttonv-create'>
                                <p style={{ marginLeft: '3px', marginRight: '2px'}}>Vista previa</p>
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html: eyeSVG }}/>
                            </Button>
                            <Button className='encuesta-sg-buttons-create'>Siguiente</Button>
                        </div>
                    </Col>
                    <hr />
                    
                    <Col xs={2} className="encuestas_colsubtitulo_create">
                        <div className='encuesta-subtitulo1'>
                            <span dangerouslySetInnerHTML={{ __html: chevronsLeftSVG }}/>
                            <h2 className='encuesta-subtitulo-1'>Colapsar</h2>
                        </div>
                        <div className='encuesta-subtitulo2'>
                            <h2 className='encuesta-subtitulo-2'>Banco de Preguntas</h2>
                            <span style={{marginLeft: '150px'}} dangerouslySetInnerHTML={{ __html: helpCircleSVG }}/>
                        </div>
                    </Col>
                    
                    <Col className='encuesta-cuerpo'>
                        <Col className="encuesta-cuerpo2">
                            <div className="lista-2">
                                <div className="fondo-lista">
                                    {lista.map((item) => (
                                    <div
                                        key={item.nombre}
                                        className={`lista-container ${activeIcon === item.nombre ? 'active' : ''} ${activeIcon && activeIcon !== item.nombre ? 'inactive' : ''}`}
                                        onClick={() => handleClick(item.nombre)}
                                    >
                                        <div className={`juntar-lista-nombre ${activeIcon === item.nombre ? 'active' : ''}`}>
                                            <div className={`fondo-lista2 ${activeIcon === item.nombre ? 'active-background' : ''}`}>
                                                {item.icono && (
                                                    <span dangerouslySetInnerHTML={{ __html: item.icono }} />
                                                )}
                                                <span className="lista-nombre" style={{ textAlign: 'center' }}>{item.nombre}</span>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </Col>

                        <Col className="encuesta-Segundocuerpo2">
                            {showBancoPreguntas && (
                                <div className="desplegado-container">
                                    <div className="listaBancoPreguntas-2">
                                        <div className="fondo-lista">
                                            {listaBancoPreguntas.map((item) => (
                                                <div
                                                    key={item.nombre}
                                                    className="encuesta-nombrelista"
                                                    onClick={() => handleNestedClick(item.nombre)}
                                                >
                                                    <div className="juntar-listaBancoPreguntas-nombre">
                                                        <div className="fondo-listaBancoPreguntas2">
                                                            <span className="listaBancoPreguntas-nombre" style={{ textAlign: 'center' }}>{item.nombre}</span>
                                                            {item.icono && (
                                                                <span style={{ float: 'right' }} dangerouslySetInnerHTML={{ __html: item.icono }} />
                                                            )}
                                                            <hr style={{ marginTop: '15px', marginBottom: '15px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Col>
                </Row>
            </Container> 
        </>
    )  
}

export default Create
