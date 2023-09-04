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
    color, 
    selectedIcon, 
    handleEditarPregunta, 
    closeEliminarCPVE,
    informacion,
    configuracion6Activa,
    preguntaVisibleC,
    sendTamanoPaso2, 
    sendGrosorPaso2, 
    sendTipografiaPaso2,
    contenEstilos, 
    sendColors
}) {
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
  


    useEffect(() => {
        // Envía el valor de preview1 a la función prop previewSend inmediatamente cuando cambie
        let newStyle = {};
        if (titulotamano === 'Opciones de respuesta') {
          newStyle.fontSize = `${tamano}px`;
        }
        if (tituloGrosor === 'Opciones de respuesta') {
          newStyle.fontWeight = grosor;
        }
        if (tituloTipografia === 'Opciones de respuesta') {
          newStyle.fontFamily = tipografia;
        }
        if (Object.keys(newStyle).length !== 0){
          setOpcionesRespuestaStyle(newStyle);
        }
        
        let newStyle2 = {};
        if (titulotamano === 'Preguntas') {
          newStyle2.fontSize = `${tamano}px`;
        }
        if (tituloGrosor === 'Preguntas') {
          newStyle2.fontWeight = grosor;
        }
        if (tituloTipografia === 'Preguntas') {
          newStyle2.fontFamily = tipografia;
        }
    
        if (Object.keys(newStyle2).length !== 0){
          setPreguntasStyle(newStyle2);
        }

        if (Object.keys(contentEstilos).length !== 0){
            setContentEstilos(contentEstilos);
          }
      
          if (contentEstilos.fuente.preguntas.color !== ''){
            setPreguntasStyle({...newStyle2, color: contentEstilos.fuente.preguntas.color});
          }
      
          if (contentEstilos.fuente.opcionesRespuestas.color !== ''){
            setOpcionesRespuestaStyle({...newStyle, color: contentEstilos.fuente.opcionesRespuestas.color});
          }
    
    
      }, [tamano, grosor, tipografia, titulotamano, tituloGrosor, tituloTipografia, contentEstilos, sendColors]);
    

    const Opcion1 = () => {
        setNingunaOpcion(!ningunaOpcion);
    };

    const Opcion2 = () => {
        setOtro(!otro);
    };

    const handleMouseEnterEditar = (index) => {
        $(`#editPreg${index +1}`).removeClass("oculto");
        $(`#editPreg${index +1}`).addClass("visible");
        $(`#Preg${index +1}`).addClass("editar-visible");
    };
    
    const handleMouseLeaveEditar = (index) => {
        $(`#editPreg${index +1}`).removeClass("visible");
        $(`#editPreg${index +1}`).addClass("oculto");
        $(`#Preg${index +1}`).removeClass("editar-visible");
    };
    
    const handleOpenEliminarPregunta = () => {
        setOpenEliminarPregunta(true)
        setBlurBackground(false);
        setIsModalVisible(false);
    };
    
    const handleCloseEliminar = () => {
        setOpenEliminarPregunta(false);
        setBlurBackground(false);
        setIsModalVisible(false);
    };
    
    const handleCloseEliminarPregunta = () => {
        closeEliminarCPVE(index);
        setOpenEliminarPregunta(false)
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

    return (
        <Container className='container-resultadoOpcionMultiple'>
            <Col>
                <Col 
                    style={{marginLeft: 'unset', marginRight: 'unset', marginTop: '2%'}}
                    id={`editPreg${index +1}`}
                    className={`contenedor-editar-pregunta`}
                >
                    <p className='titulo-editarPregunta' onClick={() => {handleEditarPregunta(indexSec, index)}}>Editar</p>
                    <p className='titulo-editarOpciones'>Opciones</p>
                    <p className='titulo-editarMover'>Mover</p>
                    <p className='titulo-editarDuplicar'>Duplicar</p>
                    <div style={{width: '52%'}}></div>
                    <span style={{cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={handleOpenEliminarPregunta}/>
                </Col>
                <Col 
                    style={{marginLeft: 'unset', marginRight: 'unset'}}
                    id={`Preg${index +1}`}
                    className={`contenedor-tituloNuevaEncuesta `} 
                    onMouseEnter={() => handleMouseEnterEditar(index)}
                    onMouseLeave={() => handleMouseLeaveEditar(index)}
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

            {preguntaVisible[index] && (
                <div>
                    <Col style={{ display: 'flex' }}>
                        {opciones.map((opcion) => (
                            <Col key={opcion.id} style={{ marginRight: '2%' }}>
                                <Col>
                                <div style={opcionesRespuestaStyle}>
                                    {opcion.text}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <span
                                        style={{
                                            marginLeft: '2%',
                                            cursor: 'pointer',
                                            marginTop: '0.8%',
                                            fill: color[opcion.icono],
                                            stroke: color[opcion.icono],
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: selectedIcon[opcion.icono] || opcion.icono,
                                        }}
                                    />
                                </div>
                                </Col>
                            </Col>
                        ))}
                    </Col>

                    <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                        <Col style={{display: 'flex'}}>
                            <div>
                                <HiddenRadioButton
                                    type="radio"
                                    checked={ningunaOpcion}
                                    onChange={Opcion1}
                                />
                                <StyledRadioButton checked={ningunaOpcion} />
                            </div>
                            <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                Ninguna Opcion
                            </div>
                        </Col>
                    </Col>

                    <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                        <Col style={{display: 'flex'}}>
                            <div>
                                <HiddenRadioButton
                                    type="radio"
                                    checked={otro}
                                    onChange={Opcion2}
                                />
                                <StyledRadioButton checked={otro} />
                            </div>
                            <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                Otro
                            </div>
                        </Col>
                    </Col>
                </div>
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
    );
}

export default ResultadoValoracionEstrellas;
