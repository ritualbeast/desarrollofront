import React, { useState } from 'react';
import '../../styles/resultadoOpcionMultiple.css';
import { Button, Container, Col } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import $ from 'jquery'
import { Box, Modal } from '@mui/material';
import ModalEliminarPregunta from './ModalEliminarPregunta';

const trashSVG = svgManager.getSVG('trash');
const warningLightSVG = svgManager.getSVG('warning-light');

function ResultadoValoracionEstrellas({ index, pregunta, opciones, color, selectedIcon, handleEliminarPreguntaVE }) {
    const [openEliminarPregunta, setOpenEliminarPregunta] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);

    const ningunaOpcion = {
        id: 'ninguna',
        text: 'Ninguna de las anteriores',
        type: 'radio',
        checked: false,
    };

    const otro = {
        id: 'otro',
        text: 'Otro',
        type: 'radio',
        checked: false,
    };

    const handleMouseEnterEditar = (index) => {
        $(`#editPregVE${index +1}`).removeClass("oculto");
        $(`#editPregVE${index +1}`).addClass("visible");
        $(`#PregVE${index +1}`).addClass("editar-visible");
    };

    const handleMouseLeaveEditar = (index) => {
        $(`#editPregVE${index +1}`).removeClass("visible");
        $(`#editPregVE${index +1}`).addClass("oculto");
        $(`#PregVE${index +1}`).removeClass("editar-visible");
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
        handleEliminarPreguntaVE(index);
        setOpenEliminarPregunta(false)
    }

    return (
        <Container className='container-resultadoOpcionMultiple'>
            <Col>
                <Col 
                    style={{marginLeft: 'unset', marginRight: 'unset', marginTop: '2%'}}
                    id={`editPregVE${index +1}`}
                    className={`contenedor-editar-pregunta`}
                >
                    <p className='titulo-editarPregunta'>Editar</p>
                    <p className='titulo-editarOpciones'>Opciones</p>
                    <p className='titulo-editarMover'>Mover</p>
                    <p className='titulo-editarDuplicar'>Duplicar</p>
                    <div style={{width: '52%'}}></div>
                    <span style={{cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={handleOpenEliminarPregunta}/>
                </Col>
                <Col 
                    style={{marginLeft: 'unset', marginRight: 'unset'}}
                    id={`PregVE${index +1}`}
                    className={`contenedor-tituloNuevaEncuesta `} 
                    onMouseEnter={() => handleMouseEnterEditar(index)}
                    onMouseLeave={() => handleMouseLeaveEditar(index)}
                >
                    <p>{index + 1}. {pregunta}</p>
                </Col>
            </Col>

            <Col style={{ display: 'flex' }}>
                {opciones.map((opcion) => (
                    <Col key={opcion.id} style={{ marginRight: '2%' }}>
                        <Col>
                        <div style={{ marginBottom: '25%', textAlign: 'center' }}>
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
                        <input
                            type={ningunaOpcion.type}
                            name={`opcion_${ningunaOpcion.id}`}
                            value={ningunaOpcion.id}
                            checked={ningunaOpcion.checked}
                            onChange={() => {}}
                        />
                    </div>
                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                        {ningunaOpcion.text}
                    </div>
                </Col>
            </Col>

            <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                <Col style={{display: 'flex'}}>
                    <div>
                        <input
                            type={otro.type}
                            name={`opcion_${otro.id}`}
                            value={otro.id}
                            checked={otro.checked}
                            onChange={() => {}}
                        />
                    </div>
                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                        {otro.text}
                    </div>
                </Col>
            </Col>

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
