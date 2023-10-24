import React, { useState, useRef, useEffect } from 'react';
import '../../styles/resultadoOpcionMultiple.css'
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

const CustomCheckBox = styled.label`
  position: relative;
  display: inline-block;
  width: 50%;
  height: 20px;
  background-color: ${(props) => (props.checked ? 'red' : 'white')}; /* Cambiar el color rojo aquí */
  margin-right: 5px;
  background-color: unset;
`;

const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  width: 16.5px;
  height: 16.5px;
  border: 2px solid rgba(194, 194, 194, 1);
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'white')};
  border:${(props) => (props.checked ? '2px solid rgba(255, 206, 72, 1)' : '2px solid rgba(194, 194, 194, 1)')};
  position: relative;
  margin-top: 3%;
  margin-left: 0.4%;
  margin-right: 2%;
  cursor: pointer;

  &:after {
    content: '${(props) => (props.checked ? '\u2713' : '')}';
    font-size: 14px;
    color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
    position: absolute;
    top: -2px;
    left: 3px;

  }
`;

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

const ResultadoOpcionMultiple = ({ 
  index, 
  indexSec, 
  pregunta, 
  opciones, 
  closeEliminarCPM, 
  handleEditarPregunta,
  informacion,
  configuracion6Activa,
  preguntaVisibleC,
  sendTamanoPaso2, 
  sendGrosorPaso2, 
  sendTipografiaPaso2,
  obtenerPreg,
  contenEstilos, 
  sendColors,
  configuracion3RC,
  complementarias,
  complementariaValue,
  indiceComplementaria,
  banderaComplementaria,
  indiceComplementariaPosicionPregunta,
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
  const [opcionesRespuesta, setOpcionesRespuesta] = useState(opciones);
  const [configuracion3, setConfiguracion3] = useState(configuracion3RC);
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
  }

  const handleCloseEliminar = () => {
    setOpenEliminarPregunta(false);
    setBlurBackground(false);
    setIsModalVisible(false);
  };

  const handleCloseEliminarPregunta = () => {
    closeEliminarCPM(index);
    setOpenEliminarPregunta(false);
    setBlurBackground(false);
    setIsModalVisible(false);
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

  const cambioIcono = () => {
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

  const handleOpcionChange = (idOpcionRespuesta, value, checked, type) => {
    if (!configuracion3) {
      // Solo cambiamos el estado si el switch está en modo "radio"
      if (type === 'checkbox') {
        // Para checkbox, cambiamos el estado del checkbox actual, pero también deseleccionamos todos los demás
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : { ...opcion, checked: false }
          )
        );
      } else if (type === 'radio') {
        // Para radio, deseleccionamos todas las opciones excepto la que se hizo clic
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
          )
        );
      }
    } else {
      // En modo "checkbox", simplemente cambiamos el estado del checkbox actual
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
          opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : opcion
        )
      );
    }
  };

  const ver = () => {
      console.log(indiceComplementaria)
  }


  return (
    <>
      <button className='buttonComplementaria' onClick={ver}>
      ver

      </button>
      <Container id={`idPregunta${index+1}`} className='container-resultadoOpcionMultiple'>
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
                      <p style={{...preguntasStyle, width:'95%'}}>{index + 1}. {pregunta}</p>
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
            {opcionesRespuesta.map((opcion, idx) => (
               <CustomCheckBox 
               key={idx} 
               style={{ marginBottom: '1%', width: '100%', height: 'auto' }}
             >
               <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '0', padding: '0'}}>
                 {opcion.type === 'checkbox' ? (
                   // Opción de tipo "checkbox"
                   <>
                     <HiddenCheckBox
                       type={opcion.type}
                       name={`opcion_${index}`}
                       value={opcion.id}
                       checked={opcion.checked}
                       onChange={() => handleOpcionChange(opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'checkbox')}
                     />
                     <StyledCheckBox checked={opcion.checked}/>
                   </>
                 ) : (
                   // Opción de tipo "radio"
                   <>
                     <HiddenRadioButton
                       type={opcion.type}
                       name={`opcion_${index}`}
                       value={opcion.id}
                       checked={opcion.checked}
                       onChange={() => 
                         handleOpcionChange(
                           opcion.idOpcionRespuesta, 
                           opcion.respuesta, 
                           opcion.checked, 
                           'radio'
                         )
                       }
                     />
                     <StyledRadioButton checked={opcion.checked}/>
                   </>
                 )}
                 <div style={{...opcionesRespuestaStyle, marginBottom: '0.4%', marginLeft: '2%'}}>
                   {opcion.respuesta}
                 </div>
               </div>
             </CustomCheckBox>
            ))}
          </div>
        )
        ) : (
          preguntaVisible[index] && (
            <div>
              {opcionesRespuesta.map((opcion, idx) => (
                <CustomCheckBox 
                key={idx} 
                style={{ marginBottom: '1%', width: '100%', height: 'auto' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '0', padding: '0'}}>
                  {opcion.type === 'checkbox' ? (
                    // Opción de tipo "checkbox"
                    <>
                      <HiddenCheckBox
                        type={opcion.type}
                        name={`opcion_${index}`}
                        value={opcion.id}
                        checked={opcion.checked}
                        onChange={() => handleOpcionChange(opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'checkbox')}
                      />
                      <StyledCheckBox checked={opcion.checked}/>
                    </>
                  ) : (
                    // Opción de tipo "radio"
                    <>
                      <HiddenRadioButton
                        type={opcion.type}
                        name={`opcion_${index}`}
                        value={opcion.id}
                        checked={opcion.checked}
                        onChange={() => 
                          handleOpcionChange(
                            opcion.idOpcionRespuesta, 
                            opcion.respuesta, 
                            opcion.checked, 
                            'radio'
                          )
                        }
                      />
                      <StyledRadioButton checked={opcion.checked}/>
                    </>
                  )}
                  <div style={{...opcionesRespuestaStyle, marginBottom: '0.4%', marginLeft: '2%'}}>
                    {opcion.respuesta}
                  </div>
                </div>
              </CustomCheckBox>
              
              ))}
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
                              <Button className='buttonCancelarEliminar' variant="contained" color="primary" 
                                  onClick={handleCloseEliminar}
                              >
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
};

export default ResultadoOpcionMultiple;
