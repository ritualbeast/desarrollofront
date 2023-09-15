import React, { useState, useRef, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import svgManager from '../../assets/svg';
import { ListarCategoriasService } from '../../services/EncuestasServices';
import ModalBancoPreguntas from '../Encuestas/ModalBancoPreguntas';

const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');
const chevronsNighBtSVG = svgManager.getSVG('chevron-rigth-black');

const BancoPreguntasLateralPrincipal = ({onObtenerPregunta, contentCont}) => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [showBancoPreguntas, setShowBancoPreguntas] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listarCategoriaEncuestas, setListarCategoriaEncuestas] = useState([]);
    const [openBancoPreguntas, setOpenBancoPreguntas] = useState(false);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
    
    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
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
            <Col>
                Usa nuestra biblioteca de preguntas certificadas por nuestros expertos en metodología para reducir sesgos y obtener respuestas más precisas.
            </Col>
            <Col style={{color: 'rgba(255, 65, 151, 1)', marginLeft: '10px', marginTop: '10px'}}>
                Información
            </Col>
        </Tooltip>
    );

    const handleClickOutsideModal = (event) => {
        const modalContainer = document.getElementById('modal-container');
        if (!modalContainer.contains(event.target)) {
            setOpenAñadirLogo(false);
            setBlurBackground(false);
            setIsModalVisible(false);
        }
    };

    useEffect(() => {
        ListarCategoriaEncuesta();
    }, []);

    const ListarCategoriaEncuesta = async () => {
        try {
          const response = await  ListarCategoriasService(localStorage.getItem('enumTipoEncuesta'),);
          setListarCategoriaEncuestas(response.data.row);
        } catch (error) {
          console.error(error);
        }
    };

    const handleOpenBancoPreguntas = (idCategoriaEncuesta) => {
        setSelectedCategoriaId(idCategoriaEncuesta);
        setOpenBancoPreguntas(true);
        setBlurBackground(true);
        setIsModalVisible(true);
    };

    const handleCloseBancoPreguntas = (preguntasSeleccionadas) => {
        setOpenBancoPreguntas(false);
        onObtenerPregunta(preguntasSeleccionadas)
        setBlurBackground(false);
        setIsModalVisible(false);
    };
    
    return (
        <div
            id="modal-container"
            className={`encuesta-container ${blurBackground ? 'encuesta-blur' : ''}`}
            onClick={handleClickOutsideModal}
        >
            <Col className='encuesta-cuerpo'>
                {activeIcon === 'Banco de Preguntas' && encuestaSegundoCuerpoVisible && (
                    <Col className="encuesta-Segundocuerpo2">
                        <Col>
                            <div className='encuesta-subtitulo2'>
                                <h2 className='encuesta-subtitulo-2'>Banco de Preguntas</h2>
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
                                        className='help-icon'
                                        onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                                    >
                                        <span
                                            ref={targetRef}
                                            style={{ marginLeft: '46%' }}
                                            dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                                        />
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </Col>

                        <Col>
                            {showBancoPreguntas && (
                                <div className="desplegado-container">
                                    <div className="listaBancoPreguntas-2">
                                        <div className="fondo-lista">
                                            {listarCategoriaEncuestas.map((item) => (
                                                <div
                                                    key={item.idCategoriaEncuesta}
                                                    className="encuesta-nombrelista"
                                                    onClick={() => handleOpenBancoPreguntas(item.idCategoriaEncuesta)}
                                                >
                                                    <div className="juntar-listaBancoPreguntas-nombre">
                                                        <div className="fondo-listaBancoPreguntas2" style={{cursor:'pointer', height: '100%'}}>
                                                            <span className="listaBancoPreguntas-nombre" style={{ textAlign: 'center' }}>{item.nombre}</span>
                                                            <span style={{ float: 'right' }} dangerouslySetInnerHTML={{ __html: chevronsNighBtSVG }} />
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Col>
                )}
            </Col>

            <ModalBancoPreguntas 
                open={openBancoPreguntas} 
                onClose={handleCloseBancoPreguntas} 
                categoriaId={selectedCategoriaId}
                contentCont={contentCont}
            />
        </div>
    )
}

export default BancoPreguntasLateralPrincipal
