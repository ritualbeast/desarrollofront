import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaTransicion.css'
const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const slashSVG = svgManager.getSVG('slash');
const chevronsrightSVG = svgManager.getSVG('chevrons-right');
const chevronsdownSVG = svgManager.getSVG('chevrons-down');


const DisenoEncuestaLateralTransicion = ({openMenuPrincipal, closeMenuTransicion}) => {

    const [showTooltip, setShowTooltip] = React.useState(false);
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

    // resaltar seleccion

    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        if (selectedItem === item) {
          setSelectedItem(null);
        } else {
          setSelectedItem(item);
        }
      };
    

          
    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuTransicion(false);
    }
    
  return (
    <>
        <Col className="encuesta-Segundocuerpo2">
            <Col>
            <div className="encuesta-subtitulo2">
                <h2 className="encuesta-subtitulo-2">Estilo</h2>
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
                    style={{ marginLeft: '150px' }}
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
                        <div className="contenedorCabeceraLogotipo">
                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }} onClick={volverMenuPrincipal}/>
                            <span className='cabeceraTitle'>Disposición</span>
                        </div>
                        
                        <div className="contenedorDispocision">
                            <div
                                className={`Dispocision ${selectedItem === 1 ? 'selected' : ''}`}
                                onClick={() => handleClick(1)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: slashSVG }}/>
                                <span className="1">Ninguna</span>
                            </div>
                            <div
                                className={`Dispocision ${selectedItem === 2 ? 'selected' : ''}`}
                                onClick={() => handleClick(2)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: chevronsrightSVG }}/>
                                <span className="2">Izquierda a derecha</span>
                            </div>
                            <div
                                className={`Dispocision ${selectedItem === 3 ? 'selected' : ''}`}
                                onClick={() => handleClick(3)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: chevronsdownSVG }}/>
                                <span className="3">Arriba a abajo</span>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                </div>
            
            </Col>
        </Col>
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralTransicion
