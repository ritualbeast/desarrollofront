import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaDisposicion.css'
const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const alignCenterSVG = svgManager.getSVG('align-center');
const alignLeftSVG = svgManager.getSVG('align-left');
const alignRightSVG = svgManager.getSVG('align-right');


const DisenoEncuestaLateralDisposicion = () => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');

    const ContenedorTamanoLogotipo = () => {
        const [tamanoSeleccionado, setTamanoSeleccionado] = useState('1');
    }
    const handleChangeTamano = (event) => {
          setTamanoSeleccionado(event.target.value);
    };
    

    const RadioButton = ({ id, value, checked, onChange, label }) => (
        <label className="radioButton">
            <input
            type="radio"
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            />
            <span className="checkmark"></span>
            {label}
        </label>
        );
  
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

    

    // lista tamano

    const tamano = [
        { id: 1, nombre: 'Tamaño actual' },
        { id: 2, nombre: 'Pequeño' },
        { id: 3, nombre: 'Mediano' },
        { id: 4, nombre: 'Grande' } 
    ];

    // resaltar seleccion

    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        if (selectedItem === item) {
          setSelectedItem(null);
        } else {
          setSelectedItem(item);
        }
      };
    
    
    
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
                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }}/>
                            <span className='cabeceraTitle'>Disposición</span>
                        </div>
                        
                        <div className="contenedorDispocision">
                            <div
                                className={`Dispocision ${selectedItem === 1 ? 'selected' : ''}`}
                                onClick={() => handleClick(1)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: alignLeftSVG }}/>
                                <span className="1">Izquierda</span>
                            </div>
                            <div
                                className={`Dispocision ${selectedItem === 2 ? 'selected' : ''}`}
                                onClick={() => handleClick(2)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: alignCenterSVG }}/>
                                <span className="2">Centro</span>
                            </div>
                            <div
                                className={`Dispocision ${selectedItem === 3 ? 'selected' : ''}`}
                                onClick={() => handleClick(3)}
                            >
                                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: alignRightSVG }}/>
                                <span className="3">Derecha</span>
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

export default DisenoEncuestaLateralDisposicion
