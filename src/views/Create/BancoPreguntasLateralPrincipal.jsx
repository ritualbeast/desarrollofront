import React, { useState, useRef } from 'react'
import { Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import svgManager from '../../assets/svg';
import { lista } from '../../prisma/data/listaEncuesta.ts';
import { listaBancoPreguntas } from '../../prisma/data/listaBancoPreguntas.ts';
import NuevaEncuesta from './../Create/NuevaEncuesta';
import DisenoEncuestaLateralPrincipal from './../Create/DisenoEncuestaLateralPrincipal';
import FormatoEncuestaLateralPrincipal from './../Create/FormatoEncuestaLateralPrincipal';

const chevronsLeftSVG = svgManager.getSVG('chevrons-left');
const chevronsRightSVG = svgManager.getSVG('chevrons-right');
const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');

const BancoPreguntasLateralPrincipal = () => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [showBancoPreguntas, setShowBancoPreguntas] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
    };
    
    const handleNestedClick = (nombre) => {
        // Lógica para manejar el clic en las opciones desplegadas
    };

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const toggleEncuestaSegundoCuerpo = () => {
        setEncuestaSegundoCuerpoVisible(!encuestaSegundoCuerpoVisible);
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

    const handleClickOutsideModal = (event) => {
        const modalContainer = document.getElementById('modal-container');
        if (!modalContainer.contains(event.target)) {
            setOpenAñadirLogo(false);
            setBlurBackground(false);
            setIsModalVisible(false);
        }
    };
    
    return (
        <div
            id="modal-container"
            className={`encuesta-container ${blurBackground ? 'encuesta-blur' : ''}`}
            onClick={handleClickOutsideModal}
        >
            <Col className='encuesta-cuerpo'>
                

                {activeIcon === 'Banco de Preguntas' && encuestaSegundoCuerpoVisible && (
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
                                            style={{ marginLeft: '46%' }}
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
                )}

               
            </Col>
        </div>
    )
}

export default BancoPreguntasLateralPrincipal
