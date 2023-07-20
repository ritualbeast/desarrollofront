import React, { useState } from 'react';
import '../../styles/resultadoCargaDatos.css'
import { Button, Container, Col } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import $ from 'jquery'
import { Box, Modal } from '@mui/material';
import ModalEliminarPregunta from './ModalEliminarPregunta';

const trashSVG = svgManager.getSVG('trash');
const warningLightSVG = svgManager.getSVG('warning-light');

const ResultadoCargaDatos = ({index, indexSec, pregunta, pregunta2, handleEditarPregunta, handleEliminarPregunta, }) => {
  const [openEliminarPregunta, setOpenEliminarPregunta] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

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
                <p>{index + 1}. {pregunta}</p>
            </Col>
      </Col>
      
      <p>{pregunta2}</p>

      <Button className='buttonElegirArchivo'>
        Elegir archivo
      </Button>

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
