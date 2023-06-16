import React, { useEffect, useState, useRef } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { lista } from '../prisma/data/listaEncuesta.ts';
import { listaBancoPreguntas } from '../prisma/data/listaBancoPreguntas.ts';
import svgManager from '../assets/svg';

const circleSVG = svgManager.getSVG('circle');
const chevronsNightSVG = svgManager.getSVG('chevron-rigth');
const eyeSVG = svgManager.getSVG('eye');
const chevronsLeftSVG = svgManager.getSVG('chevrons-left');
const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');
const chevronDownSVG = svgManager.getSVG('chevron-down');
const uploadSVG = svgManager.getSVG('upload');
const chevronDownBSVG = svgManager.getSVG('chevron-down-black');

const Create = () => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [showBancoPreguntas, setShowBancoPreguntas] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
      };
      
    useEffect(() => {
        setShowBancoPreguntas(true);
    }, []);

    const handleNestedClick = (nombre) => {
        // Lógica para manejar el clic en las opciones desplegadas
    };

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <Col>
                <span dangerouslySetInnerHTML={{ __html: infoSVG }}/>
                <span
                    className='btnX'
                    ref={targetRef} 
                    onClick={handleIconClick} 
                    style={{float: 'right'}} 
                    dangerouslySetInnerHTML={{ __html: xSVG }}
                />
            </Col>
            <Col>
                Usa nuestra biblioteca de preguntas certificadas por nuestros expertos en metodología para reducir sesgos y obtener respuestas más precisas.
            </Col>
            <Col style={{color: 'rgba(255, 65, 151, 1)', marginLeft: '10px', marginTop: '10px'}}>
                Información
            </Col>
        </Tooltip>
    );

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
                    
                    <Col className='encuesta-cuerpo'>
                        <Col className="encuesta-cuerpo2">
                            <Col>
                                <div className='encuesta-subtitulo1'>
                                    <span dangerouslySetInnerHTML={{ __html: chevronsLeftSVG }}/>
                                    <h2 className='encuesta-subtitulo-1'>Colapsar</h2>
                                </div>
                            </Col>
                            <Col>
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
                        </Col>

                        <Col className="encuesta-Segundocuerpo2">
                            <Col>
                                <div className='encuesta-subtitulo2'>
                                    <h2 className='encuesta-subtitulo-2'>Banco de Preguntas</h2>
                                    <OverlayTrigger
                                        trigger="click"
                                        show={showTooltip}
                                        target={targetRef.current}
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                        onHide={() => setShowTooltip(false)}
                                    >
                                        <div
                                            className='help-icon'
                                            onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                                        >
                                            <span
                                                ref={targetRef}
                                                style={{ marginLeft: '150px' }}
                                                dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                                            />
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </Col>
                            <Col>
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

                        <Col className='encuesta-Tercerocuerpo2'>
                            <Col>
                                <p className='titulo-encuesta-tercero'>Encuesta Veris</p>
                            </Col>
                            <Col>
                                <p className='comentario-encuesta-tercero'>Encuesta enfocada en colaboradores de Veris, para cononcer el clima laboral, es de carácter obligatorio.</p>
                            </Col>
                            <Col className='contendor-nuevaEncuesta'>
                                <Col>
                                    <p className='titulo-nuevaEncuesta'>Sección 1</p>
                                </Col>
                                <Col>
                                    <p className='comentario-nuevaEncuesta'>Primera parte de la encuesta para conocer la relación entre su area y marketing</p>
                                </Col>
                                <Col className='seccion3-nuevaEcuesta'>
                                    <Button className='boton-logotipo'>
                                        <p className='textoLogotipo'>Logotipo</p>
                                        <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                                    </Button>
                                </Col>
                                <Col className='seccion4-nuevaEcuesta'>
                                    <Button className='boton-NuevaPregunta'>
                                        <p className='textoNuevaPregunta'>Nueva Pregunta</p> 
                                        <hr className='hr'/>
                                        <span style={{marginTop: '3px'}} dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}/>
                                    </Button>
                                </Col>
                                <Col className='seccion3-nuevaEcuesta'>
                                    <Button className='boton-Imgpie'>
                                        <p className='textoLogotipo'>Imagen de pie</p>
                                        <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                                    </Button>
                                </Col>
                            </Col>
                            <Button className='boton-encuestaT'>
                                <p className='boton-encuesta-tercero'>Nueva sección</p>
                                <span style={{marginTop: '11px', marginLeft: '5px'}} dangerouslySetInnerHTML={{ __html: chevronDownSVG }}/>
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Container> 
        </>
    )  
}

export default Create
