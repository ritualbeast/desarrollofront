import React, { useState, useRef, useEffect  } from 'react';
import '../../styles/resultadoOpcionMultiple.css';
import { Button, Container, Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import svgManager from '../../assets/svg';
import $ from 'jquery'
import { Box, Modal } from '@mui/material';
import ModalEliminarPregunta from './ModalEliminarPregunta';
import styled from 'styled-components';
import { ListarEnumeradosService } from '../../services/EnumeradosServices';

const trashSVG = svgManager.getSVG('trash');
const warningLightSVG = svgManager.getSVG('warning-light');
const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');
const chevronDownBSVG = svgManager.getSVG('chevron-down-black');
const chevronUpSVG = svgManager.getSVG('chevron-up');

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
  margin-top: 3%;
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

function ResultadoValoracionEstrellas({ 
    index, 
    indexSec, 
    pregunta, 
    opciones, 
    handleEditarPregunta, 
    closeEliminarCPVE,
    informacion,
    configuracion4Activa,
    configuracion5Activa,
    configuracion6Activa,
    preguntaVisibleC,
    sendTamanoPaso2, 
    sendGrosorPaso2, 
    sendTipografiaPaso2,
    contenEstilos, 
    sendColors,
    starFillSVG,
    squareFillSVG,
    circleFillSVG,
    triangleFillSVG,
    indiceComplementaria,
    banderaComplementaria,
    indiceComplementariaPosicionPregunta,
}) {
    // console.log('opciones -->>', opciones)
    const [openEliminarPregunta, setOpenEliminarPregunta] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);
    const [isUp, setIsUp] = useState(true);
    const [preguntaVisible, setPreguntaVisible] = useState(preguntaVisibleC);
    const [ningunaOpcion, setNingunaOpcion] = useState(false);
    const [otro, setOtro] = useState(false);
    const tamano = sendTamanoPaso2?.tamano ;
    const titulotamano = sendTamanoPaso2?.titulo;
    const grosor = sendGrosorPaso2?.grosor;
    const tituloGrosor = sendGrosorPaso2?.titulo;
    const tipografia = sendTipografiaPaso2?.tipografia;
    const tituloTipografia = sendTipografiaPaso2?.titulo;
    const [opcionesRespuestaStyle, setOpcionesRespuestaStyle] = useState({});
    const [preguntasStyle, setPreguntasStyle] = useState({});
    const [contentEstilos, setContentEstilos] = useState(contenEstilos);
    const [opcionesRespuesta, setOpcionesRespuesta] = useState(opciones);
    const [tipoIcono, setTipoIcono] = useState();
    const opcionNinguna = opcionesRespuesta.find((opcion) => opcion.respuesta === 'Ninguna de las anteriores');
    const otraRespuesta = opcionesRespuesta.find((opcion) => opcion.respuesta === 'Otra respuesta');
    const [banderaEditarComplemetaria, setBanderaEditarComplemetaria] = useState(true);
 

    useEffect(() => {
        let newStyle = {...opcionesRespuestaStyle};
       
        if (contenEstilos.fuente.opcionesRespuestas.enumTamanio !== ''){
          newStyle.fontSize = `${contenEstilos.fuente.opcionesRespuestas.enumTamanio}px`;
        }
        if (contenEstilos.fuente.opcionesRespuestas.enumGrosor !== ''){
          newStyle.fontWeight = contenEstilos.fuente.opcionesRespuestas.enumGrosor;
        }
        if (contenEstilos.fuente.opcionesRespuestas.enumTipografia !== ''){
          newStyle.fontFamily = contenEstilos.fuente.opcionesRespuestas.enumTipografia;
        }
        setOpcionesRespuestaStyle(newStyle);
    
        let newStyle2 = {...preguntasStyle};
        
        if (contenEstilos.fuente.preguntas.enumTamanio !== ''){

          newStyle2.fontSize = `${contenEstilos.fuente.preguntas.enumTamanio}px`;
        }
        if (contenEstilos.fuente.preguntas.enumGrosor !== ''){
          newStyle2.fontWeight = contenEstilos.fuente.preguntas.enumGrosor;
        }
        if (contenEstilos.fuente.preguntas.enumTipografia !== ''){
          newStyle2.fontFamily = contenEstilos.fuente.preguntas.enumTipografia;
        }
    
        setPreguntasStyle(newStyle2);
    
        if (contenEstilos.fuente.preguntas.color !== ''){
          setPreguntasStyle({...newStyle2, color: contenEstilos.fuente.preguntas.color});
        }
    
        if (contenEstilos.fuente.opcionesRespuestas.color !== ''){
          setOpcionesRespuestaStyle({...newStyle, color: contenEstilos.fuente.opcionesRespuestas.color});
        }
    
    
      }, [tamano, grosor, tipografia, titulotamano, tituloGrosor, tituloTipografia, contenEstilos, sendColors]);
    
    

    const handleOpcionChange = (idOpcionRespuesta, value, checked) => {
        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((opcion) =>
                opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
            )
        );
    };

    useEffect(() => {
        handleOpcionChange()
    }, [])

    const handleMouseEnterEditar = (index, indexSec) => {

        $(`#editPreg${index +1}-${indexSec}`).removeClass("oculto");
        $(`#editPreg${index +1}-${indexSec}`).addClass("visible");
        $(`#Preg${index +1}-${indexSec}`).addClass("editar-visible");
      };
    
      const handleMouseLeaveEditar = (index, indexSec) => {
        $(`#editPreg${index +1}-${indexSec}`).removeClass("visible");
        $(`#editPreg${index +1}-${indexSec}`).addClass("oculto");
        $(`#Preg${index +1}-${indexSec}`).removeClass("editar-visible");
      };
    
    
    const handleOpenEliminarPregunta = () => {
        setOpenEliminarPregunta(true)
        setBlurBackground(true);
        setIsModalVisible(true);
    };
    
    const handleCloseEliminar = () => {
        setOpenEliminarPregunta(false);
        setBlurBackground(false);
        setIsModalVisible(false);
    };
    
    const handleCloseEliminarPregunta = () => {
        closeEliminarCPVE(index);
        setOpenEliminarPregunta(false)
        setBlurBackground(false);
        setIsModalVisible(false);
    };

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltipC" {...props}>
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
            <Col>{informacion}</Col>
        </Tooltip>
    );

    const cambioIcono = (index) => {
        setIsUp(!isUp);
    };
    
    const currentIcon = (index) => (preguntaVisible[index] ? chevronUpSVG : chevronDownBSVG);

    const visiblePregunta = (index) => {
      setPreguntaVisible((prevVisibility) => {
        const newVisibility = [...prevVisibility];
        newVisibility[index] = !newVisibility[index];
        return newVisibility;
      });
    };

    const listarEnumeradosVigencia = async () => {
        try {
            const response = await ListarEnumeradosService('', 6);
            setTipoIcono(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarEnumeradosService('', 6);
                setTipoIcono(response.data.listaEnumerados);
    
                // Luego de obtener los datos, puedes continuar con el resto del código
                handleOpcionChange();
                // Resto del código...
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); // Llama a la función asincrónica
    }, []);    

    const iconoSVG = {
        star: starFillSVG,
        square: squareFillSVG,
        circle: circleFillSVG,
        triangle: triangleFillSVG,
    };

    const handleIconFClick = (opcion) => {
        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((prevOpcion) =>
                prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
                    ? {
                          ...prevOpcion,
                          selectedColor:
                              prevOpcion.selectedColor === prevOpcion.colorDefault
                                  ? prevOpcion.colorOpcion // Cambia a colorOpcion
                                  : prevOpcion.colorDefault, // Cambia a colorDefault
                      }
                    : prevOpcion
            )
        );
    };
    
    const handleIconMouseOver = (opcion) => {
        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((prevOpcion) =>
                prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
                    ? {
                          ...prevOpcion,
                          hoverColor: opcion.colorOpcion, // Cambia a colorOpcion al pasar el mouse por encima
                      }
                    : prevOpcion
            )
        );
    };
    
    const handleIconMouseLeave = (opcion) => {
        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((prevOpcion) =>
                prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
                    ? {
                          ...prevOpcion,
                          hoverColor: null, // Restaura el color predeterminado al salir del mouse
                      }
                    : prevOpcion
            )
        );
    };
    const ver = () => {
        console.log(opcionesRespuesta);
    }


    return (
        <>
            <button className='buttonComplementaria' onClick={ver}>
            verWrapper

            </button>
            <Container className='container-resultadoOpcionMultiple'>
                <Col>
                    <Col 
                        style={{marginLeft: 'unset', marginRight: 'unset', marginTop: '2%'}}
                        id={`editPreg${index +1}-${indexSec}`}
                        className={`contenedor-editar-pregunta`}
                    >
                        {banderaComplementaria ? (  
                            <p className='titulo-editarPregunta' onClick={() => {handleEditarPregunta(indexSec, indiceComplementaria, banderaComplementaria, index, banderaEditarComplemetaria, indiceComplementariaPosicionPregunta)}}>EditarC</p>  
                        ) : (
                            <p className='titulo-editarPregunta' onClick={() => {handleEditarPregunta(indexSec, index, banderaComplementaria)}}>Editar</p>
                        )

                        }
                        <p className='titulo-editarOpciones'>Opciones</p>
                        <p className='titulo-editarMover'>Mover</p>
                        <p className='titulo-editarDuplicar'>Duplicar</p>
                        <div style={{width: '52%'}}></div>
                        <span style={{cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={handleOpenEliminarPregunta}/>
                    </Col>
                    <Col 
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        id={`Preg${index +1}-${indexSec}`}
                        className={`contenedor-tituloNuevaEncuesta `} 
                        onMouseEnter={() => handleMouseEnterEditar(index, indexSec)}
                        onMouseLeave={() => handleMouseLeaveEditar(index, indexSec)}
                
                    >
                        <Col style={{width:'95%', display:'flex'}}>
                            <p style={{...preguntasStyle, width:'95%'}}
                            >{index + 1}. {pregunta}</p>
                            {configuracion6Activa && (
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
                                        className='help-icon-r'
                                        onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                                    >
                                        <span
                                            ref={targetRef}
                                            style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                                            dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                                        />
                                    </div>
                                </OverlayTrigger>
                            )}
                        </Col>
                        <Col style={{width:'5%'}}>
                            <span 
                                style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} 
                                onClick={() => {cambioIcono(index); visiblePregunta(index);}}
                                dangerouslySetInnerHTML={{ __html: currentIcon(index) }} 
                            />
                        </Col>
                    </Col>
                </Col>

                {banderaComplementaria ? (
                    preguntaVisible[indiceComplementaria] && (
                        <div>
                            <Col style={{ display: 'flex' }}>
                                {opcionesRespuesta.map((opcion, index) => (
                                    opcion.respuesta !== 'Ninguna de las anteriores' &&
                                    opcion.respuesta !== 'Otra respuesta' && (
                                        <Col key={index} style={{ marginRight: '2%' }}>
                                            <Col>
                                                <div style={{...opcionesRespuestaStyle, textAlign: 'center' }}>
                                                    {opcion.respuesta}
                                                </div>
                                                <br />
                                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <span
                                                        style={{
                                                            marginLeft: '2%',
                                                            cursor: 'pointer',
                                                            marginTop: '0.8%',
                                                            fill: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                            stroke: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                        }}
                                                        onMouseOver={() => handleIconMouseOver(opcion)}
                                                        onMouseLeave={() => handleIconMouseLeave(opcion)}
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                            iconoSVG[opcion.selectedIcon] ||
                                                            (tipoIcono ? iconoSVG[tipoIcono.find((enumGrafico) => enumGrafico.id === opcion.enumGrafico)?.etiqueta] : '') ||
                                                            opcion.enumGrafico, // Utiliza el enumGrafico si no se encuentra una etiqueta coincidente
                                                        }}
                                                        onClick={() => handleIconFClick(opcion, index)}
                                                    />
                                                </div>
                                            </Col>
                                        </Col>
                                    )
                                ))}
                            </Col>
    
                            {configuracion4Activa && (
                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{ display: 'flex' }}>
                                        <>
                                            <HiddenRadioButton
                                                type={opcionNinguna.type}
                                                checked={opcionNinguna.checked}
                                                value={opcionNinguna.idOpcionRespuesta}
                                            />
                                            <StyledRadioButton checked={opcionNinguna.checked} 
                                                onClick={() => handleOpcionChange(opcionNinguna, opcionNinguna.idOpcionRespuesta, opcionNinguna.respuesta, opcionNinguna.checked, 'radio')}
                                            />
                                        </>
                                        <div style={{...opcionesRespuestaStyle, textAlign: 'center' }}>
                                            {opcionNinguna.respuesta}
                                        </div>
                                    </Col>
                                </Col>
                            )}
    
                            {configuracion5Activa && (
                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{ display: 'flex' }}>
                                        <div>
                                            <HiddenRadioButton
                                                type={otraRespuesta.type}
                                                checked={otraRespuesta.checked}
                                                value={otraRespuesta.idOpcionRespuesta}
                                            />
                                            <StyledRadioButton checked={otraRespuesta.checked}
                                                onClick={() => handleOpcionChange(otraRespuesta, otraRespuesta.idOpcionRespuesta, otraRespuesta.respuesta, otraRespuesta.checked, 'radio')}
                                            />
                                        </div>
                                        <div style={{...opcionesRespuestaStyle, marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                            {otraRespuesta.respuesta}
                                        </div>
                                    </Col>
                                </Col>
                            )}
                        </div>
                    )
                ) : (
                    preguntaVisible[index] && (
                        <div>
                            <Col style={{ display: 'flex' }}>
                                {opcionesRespuesta.map((opcion, index) => (
                                    opcion.respuesta !== 'Ninguna de las anteriores' &&
                                    opcion.respuesta !== 'Otra respuesta' && (
                                        <Col key={index} style={{ marginRight: '2%' }}>
                                            <Col>
                                                <div style={{...opcionesRespuestaStyle, textAlign: 'center' }}>
                                                    {opcion.respuesta}
                                                </div>
                                                <br />
                                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <span
                                                        style={{
                                                            marginLeft: '2%',
                                                            cursor: 'pointer',
                                                            marginTop: '0.8%',
                                                            fill: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                            stroke: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                        }}
                                                        onMouseOver={() => handleIconMouseOver(opcion)}
                                                        onMouseLeave={() => handleIconMouseLeave(opcion)}
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                            iconoSVG[opcion.selectedIcon] ||
                                                            (tipoIcono ? iconoSVG[tipoIcono.find((enumGrafico) => enumGrafico.id === opcion.enumGrafico)?.etiqueta] : '') ||
                                                            opcion.enumGrafico, // Utiliza el enumGrafico si no se encuentra una etiqueta coincidente
                                                        }}
                                                        onClick={() => handleIconFClick(opcion, index)}
                                                    />
                                                </div>
                                            </Col>
                                        </Col>
                                    )
                                ))}
                            </Col>
    
                            {configuracion4Activa && (
                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{ display: 'flex' }}>
                                        <>
                                            <HiddenRadioButton
                                                type={opcionNinguna.type}
                                                checked={opcionNinguna.checked}
                                                value={opcionNinguna.idOpcionRespuesta}
                                            />
                                            <StyledRadioButton checked={opcionNinguna.checked} 
                                                onClick={() => handleOpcionChange(opcionNinguna, opcionNinguna.idOpcionRespuesta, opcionNinguna.respuesta, opcionNinguna.checked, 'radio')}
                                            />
                                        </>
                                        <div style={{...opcionesRespuestaStyle, textAlign: 'center' }}>
                                            {opcionNinguna.respuesta}
                                        </div>
                                    </Col>
                                </Col>
                            )}
    
                            {configuracion5Activa && (
                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{ display: 'flex' }}>
                                        <div>
                                            <HiddenRadioButton
                                                type={otraRespuesta.type}
                                                checked={otraRespuesta.checked}
                                                value={otraRespuesta.idOpcionRespuesta}
                                            />
                                            <StyledRadioButton checked={otraRespuesta.checked}
                                                onClick={() => handleOpcionChange(otraRespuesta, otraRespuesta.idOpcionRespuesta, otraRespuesta.respuesta, otraRespuesta.checked, 'radio')}
                                            />
                                        </div>
                                        <div style={{...opcionesRespuestaStyle, marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                            {otraRespuesta.respuesta}
                                        </div>
                                    </Col>
                                </Col>
                            )}
                        </div>
                    )
                    
                )}

                <Modal
                    open={openEliminarPregunta}
                    onClose={() => setOpenEliminarPregunta(false)}
                    sx={{
                    width: '60%',
                    height: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    marginTop: '5%',
                    }}
                    BackdropProps={{
                    onClick: () => {
                    setOpenEliminarPregunta(false);
                        setBlurBackground(false);
                        setIsModalVisible(false);
                    },
                    sx: {
                        backdropFilter: 'blur(5px)', // Para aplicar un desenfoque al fondo de la modal
                    },
                    }}
                >
                    <Box className="encuesta_modalEliminarSeccion" sx={{ marginTop: '12%', width: '50%', height: '43%' }}>
                        <div className="encuesta_modalDuplciar_closeicon">
                            <span style={{marginTop: '5.8%'}} dangerouslySetInnerHTML={{ __html: warningLightSVG }}/>
                            <p className="encuesta_modalElimninar__title">Eliminar Sección</p>
                        </div>
                            
                        <ModalEliminarPregunta/>

                        <div className='encuesta_modal_cerrarEliminar'>
                            <Box sx={{ width: '50%', display: 'contents'}}>
                                <Col className="d-flex justify-content-center">
                                    <Button className='buttonCancelarEliminar' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                        <span className='cancelar-eliminar'>Cancelar</span>
                                    </Button>
                                    <Button className='buttonDeleteEliminar' variant="contained" color="primary"
                                        onClick={handleCloseEliminarPregunta}
                                    >
                                        <span className='eliminar'>Eliminar</span>
                                    </Button>
                                </Col>
                            </Box>
                        </div>
                    </Box>
                </Modal>
            </Container>
        </>
    );
}

export default ResultadoValoracionEstrellas;
