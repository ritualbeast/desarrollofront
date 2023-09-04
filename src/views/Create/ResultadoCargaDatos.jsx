import React, { useState, useRef, useEffect } from 'react';
import '../../styles/resultadoCargaDatos.css'
import { Button, Container, Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import svgManager from '../../assets/svg';
import $ from 'jquery'
import { Box, Modal } from '@mui/material';
import ModalEliminarPregunta from './ModalEliminarPregunta';

const trashSVG = svgManager.getSVG('trash');
const warningLightSVG = svgManager.getSVG('warning-light');
const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');
const chevronDownBSVG = svgManager.getSVG('chevron-down-black');
const chevronUpSVG = svgManager.getSVG('chevron-up');

const ResultadoCargaDatos = ({
  index, 
  indexSec, 
  pregunta, 
  pregunta2, 
  handleEditarPregunta, 
  handleEliminarPregunta,
  informacion,
  configuracion2Activa,
  preguntaVisibleC,
  sendTamanoPaso2, 
  sendGrosorPaso2, 
  sendTipografiaPaso2,
  contenEstilos, 
  sendColors
}) => {
  const [openEliminarPregunta, setOpenEliminarPregunta] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const targetRef = useRef(null);
  const [isUp, setIsUp] = useState(true);
  const [preguntaVisible, setPreguntaVisible] = useState(preguntaVisibleC);
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
  }

  const handleCloseEliminar = () => {
    setOpenEliminarPregunta(false);
    setBlurBackground(false);
    setIsModalVisible(false);
  };

  const handleCloseEliminarPregunta = () => {
    handleEliminarPregunta(index, indexSec);
    setOpenEliminarPregunta(false)
  }

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
    <Container className='container-resultadoCargaDatos'>
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
                    {configuracion2Activa && (
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
          <p>{pregunta2}</p>

          <Button className='buttonElegirArchivo'>
            Elegir archivo
          </Button>
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
  )
}

export default ResultadoCargaDatos
