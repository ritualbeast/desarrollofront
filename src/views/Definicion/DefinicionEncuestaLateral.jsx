import React, { useRef, useState, useEffect } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/definicionEncuesta.css' 
import DefinicionEncuestaCuerpo from './DefinicionEncuestaCuerpo';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const uploadSVG = svgManager.getSVG('upload');
const trashSVG = svgManager.getSVG('trash');
const edit2SVG = svgManager.getSVG('edit2');

const DefinicionEncuestaLateral = ({openMenuPrincipal, closeMenuLogotipo}) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [estado, setEstado] = useState('');
    const [posicionSeleccionada, setPosicionSeleccionada] = useState('');
    const [showDefinicionEncuestaCuerpo, setShowDefinicionEncuestaCuerpo] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!selectedFile) {
          setPreview(null);
          return;
        }
    
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    
        // Liberar memoria cuando se desmonte el componente
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

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
        closeMenuLogotipo(false);
    }

    const handleEstadoClick = (estado) => {
        setEstado(estado);
    }

    const handlePosicionClick = (posicion) => {
        setPosicionSeleccionada(posicion);
    }

    const onSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
        } else {
          setSelectedFile(null);
        }
    };
    
  return (
    <>
        {showDefinicionEncuestaCuerpo && <DefinicionEncuestaCuerpo estado={estado} posicion={posicionSeleccionada}/>}
        <Col className="encuesta-Segundocuerpo2">
            <Col>
                <div className="encuesta-subtitulo2">
                    <h2 className="encuesta-subtitulo-2">Banco de preguntas</h2>

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
                                style={{ marginLeft: '70px' }}
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
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }} />
                                <span className='cabeceraTitle'>Cargar archivos</span>
                            </div>
                        
                            {selectedFile ? (
                                // Si se ha seleccionado una imagen, mostrar la vista previa y ocultar el botón de carga
                                <div className="contenedorLogotipo">
                                    
                                    <img src={preview} alt="preview" style={{ height: '92px', width: '180px'  }} className='imagenLogotipoEncuesta'/>
                                    <div className='subcontenedorLogotipo'>
                                        <div className='buttonLogotipoeditar'>
                                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  edit2SVG }}/>
                                        </div>
                                        <div className='buttonLogotipoeliminar'>
                                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  trashSVG }}/>
                                        </div>

                                    </div>
                                    
                                </div>
                                ) : (
                                // Si no se ha seleccionado una imagen, mostrar el botón de carga
                                <div className="contenedorLogotipo">
                                    <div className='buttonLogotipo'>
                                    <span className='buttonLogotipoText'>Logo</span>
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadSVG }} onClick={() => document.getElementById('file-input').click()} />
                                    <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile} />

                                    </div>
                                </div>
                            )}

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

                            <br/>

                            <div className="contenedorLogotipo">
                                <div className='buttonLogotipo' >
                                    <span className='buttonLogotipoText'>Imagen</span>
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  uploadSVG }}/>
                                </div>
                            </div>

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

                            <br/>

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

export default DefinicionEncuestaLateral
