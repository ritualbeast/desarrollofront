import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaLogo.css'
import Logo from '../../assets/img/LOGO_VERIS.jpg'
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const edit2SVG = svgManager.getSVG('edit-2');
const trashSVG = svgManager.getSVG('trash');
const uploadSVG = svgManager.getSVG('upload');


const DisenoEncuestaLateralPiePagina = ({openMenuPrincipal, closeMenuPiePagina, preview4, sendEstado,sendPosicion,paso}) => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [selectedFile, setSelectedFile] = useState();
    const [previeww, setPreview] = useState(preview4);
    const [estado, setEstado] = useState('Guardar');
    const [posicionSeleccionada, setPosicionSeleccionada] = useState('1');
    const [pasos, setPasos] = useState(paso);

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

    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuPiePagina(false);
    }

    const handleEnviarFotoPiePagina = () => {
    }

    const handleEstadoClick = (estado) => {
        sendEstado(estado);
    }

    const handlePosicionClick = (posicion) => {
        sendPosicion(posicion);
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
                            <span className='cabeceraTitle'>Pie de página</span>
                        </div>
                        {preview4 != null ? (
                        <img
                            src={preview4}
                            alt="preview"
                            style={{ height: '92px', width: '100%' }}
                            className="imagenLogotipoEncuesta"
                        />
                        ) : null 
                        }

                        <div className="contenedorContenedorTamano">
                            <span className='contenedortamanoLogotipoTamano'>Tamaño</span>
                            <div className="contenedortamanoLogotipo">
                                <div className='radioLogotipo'>
                                {tamano.map((opcion) => (
                                    <div key={opcion.id} className="radioOption">
                                    <RadioButton
                                        id={opcion.id.toString()}
                                        value={opcion.id.toString()}
                                        checked={tamanoSeleccionado === opcion.id.toString()}
                                        onChange={handleChangeTamano}
                                        label={opcion.nombre}
                                    />
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="contenedorContenedorPosicion">
                            <span className='contenedorPosicionLabel'>Posición</span>
                            
                            <div className="contenedorPosicion">
                                <select className="selectPosicion">
                                    <option value="1">Izquierda</option>
                                    <option value="2">Derecha</option>
                                    <option value="3">Centro</option>
                                    <option value="4">Arriba</option>
                                    <option value="5">Abajo</option>
                                </select>
                            </div>
                        </div>

                        {pasos === 1 ? (
                            <>
                                <div className="contenedorCabeceraLogotipo">
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }} onClick={volverMenuPrincipal}/>
                                    <span className='cabeceraTitle'>Agregar botón pie de pagina</span>
                                </div>

                                <div className="contenedorbuton">
                                    <button className="botonGuardar" onClick={() => handleEstadoClick('Guardar')}>
                                    Guardar
                                    </button>
                                    <button className="botonEnviar" onClick={() => handleEstadoClick('Enviar')}>
                                    Enviar
                                    </button>
                                    <button className="botonActualizar" onClick={() => handleEstadoClick('Actualizar')}>
                                    Actualizar
                                    </button>
                                </div>

                                <div className="contenedorContenedorPosicion">
                                    <span className='contenedorPosicionLabel'>Posición</span>
                                    
                                    <div className="contenedorPosicion">
                                        <select className="selectPosicion"  onChange={(e) => handlePosicionClick(e.target.value)}>
                                            <option value="1">Izquierda</option>
                                            <option value="2">Derecha</option>
                                            <option value="3">Centro</option>
                                        </select>
                                    </div>
                                </div> 
                            </>
                        ) : null
                        }


                        <br />
                        <br />
                        <br />
                        <br />
                        <div> </div>
                        
                   
                    
                    
                    </div>
                </div>
                </div>
            
            </Col>
        </Col>
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralPiePagina
