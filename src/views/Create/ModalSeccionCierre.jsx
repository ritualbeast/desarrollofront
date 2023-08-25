import React, { useState } from 'react'
import '../../styles/seccionCierre.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import styled from 'styled-components';

const uploadSVG = svgManager.getSVG('upload');
const chevronUpSVG = svgManager.getSVG('chevron-up');
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

const ModalSeccionCierre = () => {
    const [duplicarSeccionVisible, setDuplicarSeccionVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [editarSeccionVisible, setEditarSeccionVisible] = useState(false);

    const handleDuplicarSeccion = () => {
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleMouseEnterDuplicar = () => {
        setDuplicarSeccionVisible(true);
      };
  
      const handleMouseLeaveDuplicar = () => {
        setDuplicarSeccionVisible(false);
      };  

  return (
    <>
        <br />
        <Container className='encuesta-SeccionCierre'>
                <Col className="">
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
                    <p className="titulo-nuevaEncuesta">Sección de Cierre</p>
                    <span
                        style={{ display: "flex", alignItems: "center" }}
                        dangerouslySetInnerHTML={{ __html: chevronUpSVG }}
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
                    <Button className='cancelarSeccion'>
                        Cancelar
                    </Button>
                    <Button className='guardarSeccion'>
                        Guardar
                    </Button>
                </Col>
        </Container>
    </>
    
  )
}

export default ModalSeccionCierre
