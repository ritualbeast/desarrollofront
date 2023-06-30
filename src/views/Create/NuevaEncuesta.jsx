import React, { useState, Fragment } from 'react'
import '../../styles/nuevaEncuesta.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import ModalAñadirLogo from '../Create/ModalAñadirLogo';
import ModalDuplicarSeccion from './ModalDuplicarSeccion';
import ModalSeccionCierre from './ModalSeccionCierre';
import OpcionMultiple from './OpcionMultiple';

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
    const [editarSeccionVisible, setEditarSeccionVisible] = useState(false);
    const [nuevaSeccionVisible, setNuevaSeccionVisible] = useState(false)
    const [nuevaPreguntaVisible, setNuevaPreguntaVisible] = useState(false)
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [openDuplicarSeccion, setOpenDuplicarSeccion] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [numContenedores, setNumContenedores] = useState(0);
    const [duplicarSeccionVisible, setDuplicarSeccionVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOpcionMultiple, setShowOpcionMultiple] = useState(false);

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
      setNumContenedores(numContenedores + 1);
      setNuevaSeccionVisible(false);
    };

    const handleSeccionCierre = () => {
      setShowModal(true);
      setNuevaSeccionVisible(false);
    };    

    const handleOptionMultiple = () => {
      setShowOpcionMultiple(true);
      setNuevaPreguntaVisible(false);
    };

    const handleValoracionEstrellas = () => {
      setNuevaPreguntaVisible(false);
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

    const handleMouseEnterEditar = () => {
      setEditarSeccionVisible(true);
    };

    const handleMouseLeaveEditar = () => {
      setEditarSeccionVisible(false);
    };

    const handleButtonClick = () => {
      setNuevaSeccionVisible(!nuevaSeccionVisible);
    };

    const handleButtonNuevaPregunta = () => {
      setNuevaPreguntaVisible(!nuevaPreguntaVisible);
      setIsActive(!isActive);
    }

    const handleMouseEnterDuplicar = () => {
      setDuplicarSeccionVisible(true);
    };

    const handleMouseLeaveDuplicar = () => {
      setDuplicarSeccionVisible(false);
    };
    
    const duplicarContenedor = (
        <Col className="contendor-nuevaEncuesta">
          <Col>
            <Col
              className={`contenedor-editar-seccion ${
                editarSeccionVisible ? "visible" : "oculto"
              }`}
              onMouseEnter={handleMouseEnterDuplicar}
              onMouseLeave={handleMouseLeaveDuplicar}
            >
              <p className="titulo-editarEncuesta">Editar</p>
              <span
                className='iconcoCopyRosa'
                style={{ marginRight: "2.7%" }}
                dangerouslySetInnerHTML={{ __html: copyRosaSVG }}
                onClick={handleDuplicarSeccion}
              />
              <span dangerouslySetInnerHTML={{ __html: trashSVG }} />
            </Col>

            <Col
              className={`contenedor-tituloNuevaEncuesta ${
                editarSeccionVisible ? "editar-visible" : ""
              }`}
              onMouseEnter={handleMouseEnterDuplicar}
              onMouseLeave={handleMouseLeaveDuplicar}
            >
              <p className="titulo-nuevaEncuesta">Sección 1</p>
              <span
                style={{ display: "flex", alignItems: "center" }}
                dangerouslySetInnerHTML={{ __html: chevronUpSVG }}
              />
            </Col>
          </Col>
      
          <Col className="seccion3-nuevaEcuesta">
            <Button className="boton-logotipo" onClick={handleOpenAñadirLogo}>
              <p className="textoLogotipo">Logotipo</p>
              <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
            </Button>
          </Col>
      
          <Col className="seccion4-nuevaEcuesta">
            <Button className="boton-NuevaPregunta">
              <p className="textoNuevaPregunta">Nueva Pregunta</p>
              <hr className="hr" />
              <span
                style={{ marginTop: "3px" }}
                dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}
              />
            </Button>
          </Col>
      
          <Col className="seccion3-nuevaEcuesta">
            <Button className="boton-Imgpie">
              <p className="textoLogotipo">Imagen de pie</p>
              <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
            </Button>
          </Col>
        </Col>
    );

  return (
    <>
        <Container className='encuesta-Tercerocuerpo2-1'>
            <Col>
                <p className='titulo-encuesta-tercero'>Encuesta Veris</p>
            </Col>

            <Col className='contendor-nuevaEncuesta'>
                <Col>
                    <Col 
                        className={`contenedor-editar-seccion ${editarSeccionVisible ? 'visible' : 'oculto'}`}
                        onMouseEnter={handleMouseEnterEditar}
                        onMouseLeave={handleMouseLeaveEditar}
                    >
                        <p className='titulo-editarEncuesta'>Ediar</p>
                        <span style={{ marginRight: '2.7%' }} dangerouslySetInnerHTML={{ __html: copyRosaSVG }} onClick={handleDuplicarSeccion}/>
                        <span dangerouslySetInnerHTML={{ __html: trashSVG }} />
                    </Col>
                    <Col 
                        className={`contenedor-tituloNuevaEncuesta ${editarSeccionVisible ? 'editar-visible' : ''}`} 
                        onMouseEnter={handleMouseEnterEditar}
                        onMouseLeave={handleMouseLeaveEditar}
                    >
                        <p className='titulo-nuevaEncuesta'>Sección 1</p>
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

                {showOpcionMultiple && <OpcionMultiple />}

                <Col className='seccion4-nuevaEcuesta'>
                    <Button 
                      className={`boton-NuevaPregunta ${nuevaPreguntaVisible ? 'editar-visible' : ''} ${isActive ? 'active' : ''}`}
                      onClick={handleButtonNuevaPregunta}
                    >
                        <p className='textoNuevaPregunta'>Nueva Pregunta</p> 
                        <hr className='hr'/>
                        <span style={{marginTop: '3px'}} dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}/>
                    </Button>
                </Col>

                {nuevaPreguntaVisible && (
                      <Container className={`container-newContendorPregunta ${nuevaPreguntaVisible ? 'visible' : 'oculto'}`}>
                        <Row style={{width: '25%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', zIndex: '2', background: 'white', marginTop: '9%' }}>
                          <Col className='container-newContendorPregunta-pt1' onClick={handleOptionMultiple}>
                            <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: editSVG }}/>
                            <p style={{ marginTop: '2%', marginBottom: '2%' }}>Opción multiple</p>
                          </Col>
                          
                          <Col className='container-newContendorPregunta-pt2' onClick={handleValoracionEstrellas}>
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
                      </Container>
                )}

                <Col className='seccion3-nuevaEcuesta'>
                    <Button className='boton-Imgpie'>
                        <p className='textoLogotipo'>Imagen de pie</p>
                        <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                    </Button>
                </Col>
            </Col>

            {Array.from({ length: numContenedores }, (_, index) => (
              <Fragment key={index}>
                <br />
                <Col className="contendor-nuevaEncuesta">
                  <Col>
                    <Col
                      className={`contenedor-editar-seccion ${
                        editarSeccionVisible ? "visible" : "oculto"
                      }`}
                      onMouseEnter={handleMouseEnterDuplicar}
                      onMouseLeave={handleMouseLeaveDuplicar}
                    >
                      <p className="titulo-editarEncuesta">Editar</p>
                      <span
                        className='iconcoCopyRosa'
                        style={{ marginRight: "2.7%" }}
                        dangerouslySetInnerHTML={{ __html: copyRosaSVG }}
                        onClick={handleDuplicarSeccion}
                      />
                      <span dangerouslySetInnerHTML={{ __html: trashSVG }} />
                    </Col>

                    <Col
                      className={`contenedor-tituloNuevaEncuesta ${
                        editarSeccionVisible ? "editar-visible" : ""
                      }`}
                      onMouseEnter={handleMouseEnterDuplicar}
                      onMouseLeave={handleMouseLeaveDuplicar}
                    >
                      <p className="titulo-nuevaEncuesta">Sección {index + 2}</p>
                      <span
                        style={{ display: "flex", alignItems: "center" }}
                        dangerouslySetInnerHTML={{ __html: chevronUpSVG }}
                      />
                    </Col>
                  </Col>

                  <Col className="seccion3-nuevaEcuesta">
                    <Button className="boton-logotipo" onClick={handleOpenAñadirLogo}>
                      <p className="textoLogotipo">Logotipo</p>
                      <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                    </Button>
                  </Col>

                  <Col className="seccion4-nuevaEcuesta">
                    <Button className="boton-NuevaPregunta">
                      <p className="textoNuevaPregunta">Nueva Pregunta</p>
                      <hr className="hr" />
                      <span
                        style={{ marginTop: "3px" }}
                        dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}
                      />
                    </Button>
                  </Col>

                  <Col className="seccion3-nuevaEcuesta">
                    <Button className="boton-Imgpie">
                      <p className="textoLogotipo">Imagen de pie</p>
                      <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                    </Button>
                  </Col>
                </Col>
                <br />
              </Fragment>
            ))}

            {showModal && <ModalSeccionCierre />}

            {nuevaSeccionVisible && (
            <Container className={`container-newContendor ${nuevaSeccionVisible ? 'visible' : 'oculto'}`}>
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
