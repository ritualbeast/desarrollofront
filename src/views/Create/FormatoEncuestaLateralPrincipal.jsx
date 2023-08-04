import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import styled from 'styled-components';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');

const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledRadioButton = styled.div`
  display: inline-block;
  width: 16.5px;
  height: 16.5px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'rgba(194, 194, 194, 1)')};
  background-color: ${(props) => (props.checked ? 'white' : 'white')};
  position: relative;
  margin-top: 0.2%;
  margin-left: 0.4%;
  margin-right: 2%;
  cursor: pointer;

  &:before {
    content: '';
    display: ${(props) => (props.checked ? 'block' : 'none')};
    position: absolute;
    top: 2.3px;
    left: 2.3px;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'transparent')}; 
  }
`;

const FormatoEncuestaLateralPrincipal = () => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [openDisenoPrincipal, setOpenDisenoPrincipal] = React.useState(true);
    const targetRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (option) => {
      setSelectedOption(option);
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
                                <Col style={{ padding: '2%', paddingTop: '4%' }}>
                                    <div
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={() => handleOptionChange('clásico')}
                                    >
                                        <HiddenRadioButton
                                            type="radio"
                                            checked={selectedOption === 'clásico'}
                                            onChange={() => handleOptionChange('clásico')}
                                        />
                                        <StyledRadioButton checked={selectedOption === 'clásico'} />
                                        <label for="opcion1">Clásico</label>
                                    </div>
                                </Col>

                                <hr />

                                <Col style={{ padding: '2%' }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleOptionChange('pregunta1')}
                                >
                                    <HiddenRadioButton
                                        type="radio"
                                        checked={selectedOption === 'pregunta1'}
                                        onChange={() => handleOptionChange('pregunta1')}
                                    />
                                    <StyledRadioButton checked={selectedOption === 'pregunta1'} />
                                    <label for="opcion2">Una pregunta a la vez</label>
                                </div>
                                </Col>

                                <hr />

                                <Col style={{ padding: '2%' }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleOptionChange('pregunta2')}
                                >
                                    <HiddenRadioButton
                                        type="radio"
                                        checked={selectedOption === 'pregunta2'}
                                        onChange={() => handleOptionChange('pregunta2')}
                                    />
                                    <StyledRadioButton checked={selectedOption === 'pregunta2'} />
                                    <label for="opcion2">Una pregunta a la vez editable</label>
                                </div>
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
