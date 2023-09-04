import React, { useState } from 'react'
import '../../styles/seccionCierre.css';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import styled from 'styled-components';
import $ from 'jquery'

const uploadSVG = svgManager.getSVG('upload');
const chevronUpSVG = svgManager.getSVG('chevron-up');
const chevronDownBlackSVG = svgManager.getSVG('chevron-down-black');
const copyRosaSVG = svgManager.getSVG('copy-rosa');
const trashSVG = svgManager.getSVG('trash');

const Agradecimiento = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const URL = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const ModalSeccionCierre = ({seccionVisibleInit, handleCancelarCierre, handleGuardarCierre}) => {
    const [duplicarSeccionVisible, setDuplicarSeccionVisible] = useState(false);
    const [openDuplicarSeccion, setOpenDuplicarSeccion] = useState(false);
    const [openEliminarSeccion, setOpenEliminarSeccion] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [editarSeccionVisible, setEditarSeccionVisible] = useState(false);
    const [seccionVisible, setSeccionVisible] = useState(seccionVisibleInit);
    const [indexEliminar, setIndexEliminar] = useState(null);
    const [isUp, setIsUp] = useState(true);

    const handleDuplicarSeccion = () => {
        setOpenDuplicarSeccion(true);
        setBlurBackground(true);
        setIsModalVisible(true);
    }

    const handleEliminarSeccion = (index) => {
        setOpenEliminarSeccion(true)
        setBlurBackground(true);
        setIsModalVisible(true);
        setIndexEliminar(index);
    };

    const handleMouseEnterEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("oculto");
      $(`#editSec${index +1}`).addClass("visible");
      $(`#Sec${index +1}`).addClass("editar-visible");
    };

    const handleMouseLeaveEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("visible");
      $(`#editSec${index +1}`).addClass("oculto");
      $(`#Sec${index +1}`).removeClass("editar-visible");
    };

    const cambioIcono = (index) => {
        setIsUp(!isUp);
    };

    const currentIcon = (index) => (seccionVisible[index] ? chevronUpSVG : chevronDownBlackSVG);

    const visibleSeccion = (index) => {
        setSeccionVisible((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const handleEditarTitulo = (index) => {
        // setMostrarContenedorC((prevState) => {
        //   const newState = [...prevState];
        //   newState[index] = !newState[index];
        //   return newState;
        // });
      
        // const seccionActual = contentCont[index];
        // const previoTitulo = seccionActual.titulo;
        // const previoComentario = seccionActual.comentario;
      
        // setTitulo(previoTitulo);
        // setComentario(previoComentario);
      
        // let obj = {
        //   tipo: 'C',
        //   titulo: previoTitulo,
        //   comentario: previoComentario,
        //   contentPreg: []
        // };
      
        // const nuevoEstado = [...contentCont];
        // nuevoEstado[index] = obj;
        // setContentCont(nuevoEstado);
        // setEditarTituloVisible((prevVisibility) => [...prevVisibility, false]);
    };

    const handleCancelarSeccionCierre = () => {
        // setPregunta(preguntaTemp)
        handleCancelarCierre();
    };

    const handleGuardarSeccionCierre = () => (
        handleGuardarCierre()
    );

  return (
    <>
        <br />
        <Container className='encuesta-SeccionCierre'>
                <Col>
                    <Col className={`contenedor-editar-seccion`}>
                        <p className='titulo-editarEncuesta' onClick={()=> {handleEditarTitulo()}}>Editar</p>
                        <div style={{width: '81.6%'}}></div>
                        <span style={{ marginRight: '2.7%', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: copyRosaSVG }} onClick={handleDuplicarSeccion}/>
                        <span style={{cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => handleEliminarSeccion()}/>
                    </Col>

                    <Col
                        className={`contenedor-tituloNuevaEncuesta`}
                        onMouseEnter={() => handleMouseEnterEditar()}
                        onMouseLeave={() => handleMouseLeaveEditar()}
                    >
                        <p className="titulo-nuevaEncuesta">Sección de Cierre</p>
                        <span 
                            style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} 
                            onClick={() => {cambioIcono(); visibleSeccion();}}
                            dangerouslySetInnerHTML={{ __html: currentIcon() }} 
                        />
                    </Col>
                </Col>
            
                <Col className="seccion2-SeccionCierre">
                    <Button className="boton-Imgpie">
                        <p className="textoLogotipo">Imagen de cierre</p>
                        <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                    </Button>
                </Col>
            
                <Col className="seccion3-SeccionCierre">
                    <p style={{ marginLeft: '2%' }}>Texto de agradecimiento</p>
                    <Agradecimiento className= 'textoAgradecimiento' type="text" placeholder="Escribe aquí..." />
                </Col>
            
                <Col className="seccion4-SeccionCierre">
                    <p style={{ marginLeft: '2%' }}>Url de redirección</p>
                    <URL className= 'urlRedireccion' type="text" placeholder="Escribe aquí..." />
                </Col>
                
                <Col style={{display: 'flex'}}>
                    <Button className='finalizarSeccion'>
                        <p style={{ marginTop: '10%', marginBottom: '10%', color: 'rgba(255, 255, 255, 1)' }}>Finalizar</p>
                    </Button>
                </Col>
                
                <Col className='seccion6-SeccionCierre'>
                    <Button className='cancelarSeccion' onClick={handleCancelarSeccionCierre}>
                        Cancelar
                    </Button>
                    <Button className='guardarSeccion' onClick={handleGuardarSeccionCierre}>
                        Guardar
                    </Button>
                </Col>
        </Container>
    </>
    
  )
}

export default ModalSeccionCierre
