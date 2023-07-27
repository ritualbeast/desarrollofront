import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');

const FormatoEncuestaLateralPrincipal = () => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [openDisenoPrincipal, setOpenDisenoPrincipal] = React.useState(true);
    const targetRef = useRef(null);

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
      {openDisenoPrincipal && (
             <Col className="encuesta-Segundocuerpo2">
                <Col>
                    <div className="encuesta-subtitulo2">
                        <h2 className="encuesta-subtitulo-2">Formato</h2>
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
                            className="help-icon"
                            onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                        >
                            <span
                            ref={targetRef}
                            style={{ marginLeft: '50.4%' }}
                            dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                            />
                        </div>
                        </OverlayTrigger>
                    </div>
                </Col>

                <Col>
                    <div className="desplegado-container">
                        <div className="listaBancoPreguntas-2">
                            <div className="fondo-lista">
                                <Col style={{padding: '2%', paddingTop: '4%'}}>
                                    <input type="radio" id="opcion1" name="opciones" value="opcion1"/>
                                    <label for="opcion1">Clásico</label>
                                </Col>
                        
                                <hr />

                                <Col style={{padding: '2%'}}>
                                    <input type="radio" id="opcion2" name="opciones" value="opcion2"/>
                                    <label for="opcion2">Una pregunta a la vez</label><br/>
                                </Col>

                                <hr />

                                <Col style={{padding: '2%'}}>
                                    <input type="radio" id="opcion2" name="opciones" value="opcion2"/>
                                    <label for="opcion2">Una pregunta a la vez editable</label><br/>
                                </Col>

                                <hr />
                            </div>
                        </div>
                    </div>
                </Col>
            </Col>
        )}
    </>
  )
}

export default FormatoEncuestaLateralPrincipal
