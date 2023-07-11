import React, { useState, Fragment, useEffect, useRef } from 'react'
import '../../styles/nuevaEncuesta.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import ModalAñadirLogo from '../Create/ModalAñadirLogo';
import ModalDuplicarSeccion from './ModalDuplicarSeccion';
import ModalSeccionCierre from './ModalSeccionCierre';
import OpcionMultiple from './OpcionMultiple';
import VariacionEstrellas from './VariacionEstrellas';
import $ from 'jquery'
import { keys } from '@material-ui/core/styles/createBreakpoints';
import ResultadoOpcionMultiple from './ResultadoOpcionMultiple';

const chevronDownSVG = svgManager.getSVG('chevron-down');
const uploadSVG = svgManager.getSVG('upload');
const chevronDownBSVG = svgManager.getSVG('chevron-down-black');
const chevronUpSVG = svgManager.getSVG('chevron-up');
const closeSVG = svgManager.getSVG('close');
const copyRosaSVG = svgManager.getSVG('copy-rosa');
const trashSVG = svgManager.getSVG('trash');
const listPlushSVG = svgManager.getSVG('list-plush');
const arrowDownSVG = svgManager.getSVG('arrow-down');
const editSVG = svgManager.getSVG('edit');
const starSVG = svgManager.getSVG('star');
const tableSVG = svgManager.getSVG('table');
const clipBoardSVG = svgManager.getSVG('clip-board');

const NuevaEncuesta = () => {
    const [nuevaSeccionVisible, setNuevaSeccionVisible] = useState(false)
    const [nuevaPreguntaVisible, setNuevaPreguntaVisible] = useState(false)
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [openDuplicarSeccion, setOpenDuplicarSeccion] = useState(false);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOpcionMultiple, setShowOpcionMultiple] = useState(false);
    const [contentCont, setContentCont] = useState([{tipo:'C', contentPreg:[]}]);
    const [contentVari, setContentVari] = useState([]);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const handleOpenAñadirLogo = () => {
        setOpenAñadirLogo(true);
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleDuplicarSeccion = () => {
        setOpenDuplicarSeccion(true);
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleNewContenedor = () => {
      let obj={
        tipo:'C',
        contentPreg:[]
      }
      setContentCont((prevCont) => [...prevCont, obj]);
      setNuevaSeccionVisible(false);
    };
    console.log(contentCont);

    const handleSeccionCierre = () => {
      setShowModal(true);
      setNuevaSeccionVisible(false);
    };    

    const handleOptionMultiple = (index) => {
      setShowOpcionMultiple(true);
      let obj={
        tipo:'M',
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;

      console.log('nuevoEstado', nuevoEstado)
      setContentCont(nuevoEstado);

      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };

    const handleValoracionEstrellas = (index) => {
      let obj={
        tipo:'V',
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;
      
      setContentVari((prevVari) => [...prevVari, obj]);
      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };

    const handleMatrizValoracion = () => {
      setNuevaPreguntaVisible(false);
    };

    const handleCargaArchivo = () => {
      setNuevaPreguntaVisible(false);
    };

    const handleCuadroComentarios = () => {
      setNuevaPreguntaVisible(false);
    };

    const handleCloseEliminar = () => {
        setOpenAñadirLogo(false);
        setOpenDuplicarSeccion(false);
        setBlurBackground(false);
        setIsModalVisible(false);
    };

    const handleMouseEnterEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("oculto");
      $(`#editSec${index +1}`).addClass("visible");
      $(`#Sec${index +1}`).addClass("editar-visible");
      // setEditarSeccionVisible(true);
    };

    const handleMouseLeaveEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("visible");
      $(`#editSec${index +1}`).addClass("oculto");
      $(`#Sec${index +1}`).removeClass("editar-visible");
      // setEditarSeccionVisible(false);
    };

    const handleButtonClick = () => {
      setNuevaSeccionVisible(!nuevaSeccionVisible);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target) &&
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setIsActive(false);
          setNuevaPreguntaVisible(false);
          setNuevaSeccionVisible(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [nuevaPreguntaVisible, nuevaSeccionVisible]);

    const handleButtonNuevaPregunta = (index) => {
      // Verificar el estado actual de las acciones
      
      if($(`#NuevaPreg${index +1}`).hasClass('active')){

        $(`#NuevaPreg${index +1}`).removeClass("active");
        $(`#NuevaPreg${index +1}`).addClass("inactive");
        $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
        $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
      }else{
        $(`#NuevaPregVisi${index +1}`).removeClass("ocultar");
        $(`#NuevaPreg${index +1}`).addClass("active");
        $(`#NuevaPreg${index +1}`).removeClass("inactive");
        $(`#NuevaPreg${index +1}`).addClass("editar-visible");
      }
    };
    
    const handleCerrarOpcionMultiple = (dato, index) => {
      console.log(dato);
      //setShowOpcionMultiple(dato);
      console.log("index ", index);
    
      let variable
      let obj={
        tipo:'M',
      }
      const nuevoEstado = [...contentCont];
        const contenidoActual = [...nuevoEstado[0].contentPreg];
     $.each(contentCont, function(index2, elemento) {
      //if(index2 !== index){
        console.log(1);
        //handleOptionMultiple()
        variable = elemento.contentPreg.splice(index, 1)
        
        //contenidoActual.push(obj);

      //}
     });
     contentCont.contentPreg=variable;
     console.log(contentCont);
     //setContentCont(contenidoActual);
    };

    const capturarValores = (pregunta, opciones) => {
      // Aquí puedes utilizar los valores capturados como desees
      console.log('Pregunta:', pregunta);
      console.log('Opciones de respuesta:', opciones);
    };

    let dato = false;

    const handleAceptarOpcionMultiple = () => {
      setMostrarResultado(true);
    };

  return (
    <>
        <Container className='encuesta-Tercerocuerpo2-1'>
            <Col>
                <p className='titulo-encuesta-tercero'>Encuesta Veris</p>
            </Col>

            {contentCont.map((seccion, index) => {
                return (
                  <Col>
                    <Col key={index} className='contendor-nuevaEncuesta principal'>
                      <Col>
                          <Col 
                              id={`editSec${index +1}`}
                              className={`contenedor-editar-seccion`}
                          >
                              <p className='titulo-editarEncuesta'>Editar</p>
                              <span style={{ marginRight: '2.7%' }} dangerouslySetInnerHTML={{ __html: copyRosaSVG }} onClick={handleDuplicarSeccion}/>
                              <span dangerouslySetInnerHTML={{ __html: trashSVG }} />
                          </Col>
                          <Col 
                              id={`Sec${index +1}`}
                              className={`contenedor-tituloNuevaEncuesta `} 
                              onMouseEnter={() => handleMouseEnterEditar(index)}
                              onMouseLeave={() => handleMouseLeaveEditar(index)}
                          >
                              <p className='titulo-nuevaEncuesta'>Sección {index +1}</p>
                              <span style={{ display: 'flex', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: chevronUpSVG }} />
                          </Col>
                      </Col>
      
                      <Col className='seccion3-nuevaEcuesta'>
                          <Button 
                              className='boton-logotipo'
                              onClick={handleOpenAñadirLogo}
                          >
                              <p className='textoLogotipo'>Logotipo</p>
                              <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                          </Button>
                      </Col>
                      
                      {console.log(seccion)}
                      {seccion.contentPreg.map((preg, indexp) => { 
                        if (preg.tipo == 'M') {
                          return <OpcionMultiple id='miModal' indice={indexp} indiceSec = {index}  closeopmul={() => handleCerrarOpcionMultiple(false, indexp)} onAceptar={handleAceptarOpcionMultiple} />                        }  
                        if (preg.tipo == 'V') {
                          return <VariacionEstrellas indice={index} />
                        }
                        return '';
                      })}
                      
                      <Col className='seccion4-nuevaEcuesta'>
                          <Button
                            id={`NuevaPreg${index + 1}`}
                            ref={buttonRef}
                            className={`boton-NuevaPregunta ${nuevaPreguntaVisible ? 'editar-visible' : ''} ${isActive ? 'active' : 'inactive'}`}
                            onClick={() => handleButtonNuevaPregunta(index)}
                          >
                              <p className='textoNuevaPregunta'>Nueva Pregunta</p> 
                              <hr className='hr'/>
                              <span style={{marginTop: '3px'}} dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}/>
                          </Button>
                      </Col>
                      
                      {/* {nuevaPreguntaVisible && ( */}
                            <div
                              ref={containerRef}
                              id={`NuevaPregVisi${index + 1}`}
                              className="container-newContendorPregunta ocultar"
                              
                            >
                              <Row style={{width: '25%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', zIndex: '2', background: 'white', marginTop: '9%' }}>
                                <Col className='container-newContendorPregunta-pt1' onClick={()=> { handleOptionMultiple(index) }}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: editSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>Opción multiple</p>
                                </Col>
                                
                                <Col className='container-newContendorPregunta-pt2' onClick={() => handleValoracionEstrellas(index)}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: starSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>Valoración por estrellas</p>
                                </Col>
      
                                <Col className='container-newContendorPregunta-pt3' onClick={handleMatrizValoracion}>
                                  <span style={{ marginTop: '2%', marginLeft:'5.5%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: tableSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>Matríz de valoración</p>
                                </Col>
                                
                                <Col className='container-newContendorPregunta-pt4' onClick={handleCargaArchivo}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>Carga de archivo</p>
                                </Col>
      
                                <Col className='container-newContendorPregunta-pt5' onClick={handleCuadroComentarios}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: clipBoardSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>Cuadro para comentarios</p>
                                </Col>
                              </Row>
                            </div>
                      {/* )} */}
      
                      <Col className='seccion3-nuevaEcuesta'>
                          <Button className='boton-Imgpie'>
                              <p className='textoLogotipo'>Imagen de pie</p>
                              <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                          </Button>
                      </Col>
                    </Col>
                    <br />
                  </Col>
                )
            })}

            {showModal && <ModalSeccionCierre />}

            {nuevaSeccionVisible && (
              <Container 
                ref={containerRef}
                className={`container-newContendor ${nuevaSeccionVisible ? 'visible' : 'oculto'}`}
              >
                <Row style={{width: '25%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', zIndex: '2', background: 'white', marginBottom: '2%' }}>
                  <Col className='container-newContendor-pt1' onClick={handleNewContenedor}>
                    <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: listPlushSVG }}/>
                    <p style={{ marginTop: '2%', marginBottom: '2%' }}>Sección con preguntas</p>
                  </Col>
                  
                  <Col className='container-newContendor-pt2' onClick={handleSeccionCierre}>
                    <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: arrowDownSVG }}/>
                    <p style={{ marginTop: '2%', marginBottom: '2%' }}>Sección de cierre</p>
                  </Col>
                </Row>
              </Container>
            )}

            <Button
              ref={buttonRef}
              className={`boton-encuestaT ${nuevaSeccionVisible ? 'editar-visible' : ''}`}
              onClick={handleButtonClick}
            >
              <p className='boton-encuesta-tercero'>Nueva sección</p>
              <span style={{marginTop: '11px', marginLeft: '5px'}} dangerouslySetInnerHTML={{ __html: chevronDownSVG }}/>
            </Button>
        </Container>
        
        <Modal
            open={openAñadirLogo}
            onClose={() => setOpenAñadirLogo(false)}
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
                setOpenAñadirLogo(false);
                setBlurBackground(false);
                setIsModalVisible(false);
            },
            }}
        >
            <Box className="encuesta_modalAñadirLogotipo" sx={{ marginTop: '12%', width: '83%', height: '88%' }}>
                <div className="encuesta_modalAñadir_closeicon">
                    <p className="encuesta_modalAñadir__title">Añadir Logotipo</p>
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={() => handleCloseEliminar(false)}
                        className="encuesta_modalAñadir__close"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                    
                <ModalAñadirLogo/>

                <div className='encuesta_modal_cerrarLogo'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                        <Col className="d-flex justify-content-center">
                            <Button className='buttoncancelarlogo' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                <span className='cancelar-logo'>Cancelar</span>
                            </Button>
                            <Button className='buttondeletelogo' variant="contained" color="primary"
                                // onClick={handleEliminar}
                            >
                                <span className='agregarLogotipo'>Agregar logotipo</span>
                            </Button>
                        </Col>
                    </Box>
                </div>
            </Box>
        </Modal>

        <Modal
            open={openDuplicarSeccion}
            onClose={() => setOpenDuplicarSeccion(false)}
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
                setOpenDuplicarSeccion(false);
                setBlurBackground(false);
                setIsModalVisible(false);
            },
            }}
        >
            <Box className="encuesta_modalDuplicarSeccion" sx={{ marginTop: '12%', width: '55%', height: '53%' }}>
                <div className="encuesta_modalDuplciar_closeicon">
                    <p className="encuesta_modalDuplicar__title">Duplicar Sección</p>
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={() => handleCloseEliminar(false)}
                        className="encuesta_modalDuplicar__close"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                    
                <ModalDuplicarSeccion/>

                <div className='encuesta_modal_cerrarDuplicar'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                        <Col className="d-flex justify-content-center">
                            <Button className='buttoncancelarduplicar' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                <span className='cancelar-duplicar'>Cancelar</span>
                            </Button>
                            <Button className='buttondeleteduplicar' variant="contained" color="primary"
                                // onClick={handleDuplicar}
                            >
                                <span className='duplicar'>Duplicar</span>
                            </Button>
                        </Col>
                    </Box>
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default NuevaEncuesta
