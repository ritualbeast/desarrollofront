import React, { useEffect, useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaLogo.css'
import { ListarEnumeradosService } from '../../services/EstilosServices';
import Select from 'react-select';

const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '108%'
    }),
    control: (provided, state) => ({
      ...provided,
      width:'102.5%',
      backgroundColor: 'white',
      color: 'black',
      borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 206, 72, 0.2)' : 'none',
      "&:hover": {
        borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const uploadSVG = svgManager.getSVG('upload');

const DisenoEncuestaLateralPiePagina = ({openMenuPrincipal, closeMenuPiePagina, sendEstado,sendPosicion,paso
,sendPosicionImagen, sendTamanoImagen, sendPreviewPiePagina, contenEstilos
}) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [pasos, setPasos] = useState(paso);
    const [previewPiePagina, setPreviewPiePagina] = useState(sendPreviewPiePagina);
    const [estilos, setEstilos] = useState(contenEstilos);  

    useEffect(() => {
        ListarPosicionImagen();
        setPreviewPiePagina(sendPreviewPiePagina);
    }, [previewPiePagina]);

    const handleChangeTamano = (event) => {
        setTamanoSeleccionado(event.target.value);
        sendTamanoImagen(event.target.value);
        estilos.pieDePagina.tamanio = event.target.value;
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

    const handleEstadoClick = (estado) => {
        sendEstado(estado);
    }

    const handlePosicionClick = (posicion) => {
        sendPosicion(posicion);
    }

    // consumo de posicion de pie de pagina
    const [posicionImagen, setPosicionImagen] = useState([]);
    const ListarPosicionImagen = async () => {
        try {
            const response = await  ListarEnumeradosService('POSICION_IMAGEN')
            setPosicionImagen(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePosicion = (event) => {
        sendPosicionImagen(event.target.value);
        estilos.pieDePagina.enumPosicion = event.target.value;
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
                    <div className="listaBancoPreguntas-2" style={{paddingBottom:'5%'}}>
                        <div className="fondo-lista">
                            <div className="contenedorCabeceraLogotipo" style={{cursor:'pointer'}} onClick={volverMenuPrincipal}>
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }}/>
                                <span className='cabeceraTitle'>Pie de página</span>
                            </div>
                            
                            {sendPreviewPiePagina != undefined ? (
                                <img
                                    src={sendPreviewPiePagina}
                                    alt="preview"
                                    style={{ height: '92px', width: '100%' }}
                                    className="imagenLogotipoEncuesta"
                                />
                            ) :  <div className="contenedorLogotipo">
                                <div className='buttonLogotipo'>
                                    <span className='buttonLogotipoText'>Imagen</span>
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  uploadSVG }}/>
                                </div>
                                </div>
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
                                            checked={
                                                estilos.pieDePagina.tamanio !== undefined && estilos.pieDePagina.tamanio !== ""
                                                    ? estilos.pieDePagina.tamanio === opcion.id.toString()
                                                    : tamanoSeleccionado === opcion.id.toString()
                                            }
                                            onChange={handleChangeTamano}
                                            label={opcion.nombre}
                                        />
                                        </div>
                                    ))}
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
                                                <Select
                                                    styles={customStyles}
                                                    options={posicionImagen.map((opcion) => ({
                                                        value: opcion.etiqueta,
                                                        label: opcion.etiqueta,
                                                    }))}
                                                    onChange={(selectedOption) => handlePosicionClick({ target: { value: selectedOption.value } })}
                                                />
                                            </div>
                                        </div> 
                                    </>
                                ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Col>                       
    </>
  )
}

export default DisenoEncuestaLateralPiePagina
