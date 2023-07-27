import React, { useEffect, useState, useRef } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import svgManager from '../assets/svg';
import NuevaEncuesta from './Create/NuevaEncuesta';
import DisenoEncuesta from './Create/DiseñoEncuesta';
import DisenoEncuestaLateralPrincipal from './Create/DisenoEncuestaLateralPrincipal';
import DefinicionEncuestaLateral from './Definicion/DefinicionEncuestaLateral';
import DefinicionEncuestaCuerpo from './Definicion/DefinicionEncuestaCuerpo';
import DefinicionEncuestaConfiguracion from './Definicion/DefinicionEncuestaConfiguracion';

import DiseñaEncuesta from './Create/DiseñaEncuesta';
import Revision from './Create/Revision';

const circleSVG = svgManager.getSVG('circle');
const chevronsNightSVG = svgManager.getSVG('chevron-rigth');
const eyeSVG = svgManager.getSVG('eye');
const chevronsLeftSVG = svgManager.getSVG('chevrons-left');
const chevronsRightSVG = svgManager.getSVG('chevrons-right');
const helpCircleSVG = svgManager.getSVG('help-circle');
const infoSVG = svgManager.getSVG('info');
const xSVG = svgManager.getSVG('x');
const circle2SVG = svgManager.getSVG('circle2');


const Create = () => {
    const [activeIcon, setActiveIcon] = useState('Configuracion');
    const [showBancoPreguntas, setShowBancoPreguntas] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pasos, setPasos] = useState(1);
    const [previeww, setPrevieww] = useState(null);
    const [estados, setEstados] = useState('');
    const [posicion, setPosicion] = useState('');
    const [tamanos, setTamano] = useState({ tamano: '', titulo: '' });
    const [grosor, setGrosor] = useState({ grosor: '', titulo: '' });
    const [tipografia, setTipografia] = useState({ tipografia: '', titulo: '' });

    const [activeTab, setActiveTab] = useState('diseña');
    const [openVistaPrevia, setVistaPrevia] = useState(false);
    const [contentCont, setContentCont] = useState([{ tipo: 'C', titulo: 'Seccion ', comentario: '', contentPreg: [] }]);
    const [ispreview2, setIspreview2] = useState(null);
    const [posicionLogotipo, setPosicionLogotipo] = useState('');
    const [tamanoLogotipo, setTamanoLogotipo] = useState('');
    

    const handleCloseVistaPrevia = () => {
        setVistaPrevia(false);
    };

    const handleVistaPrevia = () => {
        setVistaPrevia(true);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getIconStrokeColor = (tab) => {
        return activeTab === tab ? 'rgba(255, 199, 0, 1)' : 'rgba(216, 216, 216, 1)';
    };

    const regresarRevision = () => {
        setActiveTab('diseña');
    };

    const recibirTotalPreguntas = (contentCont) => {
        setContentCont(contentCont);
        console.log(contentCont);
    };

    const enviarTotalPreguntas = () => {
        setContentCont(contentCont);
        console.log(contentCont);
    };

    useEffect(() => {
        recibirTotalPreguntas();
    }, []);

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
    };

    const handleNestedClick = (nombre) => {
        // Lógica para manejar el clic en las opciones desplegadas
    };

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const toggleEncuestaSegundoCuerpo = () => {
        setEncuestaSegundoCuerpoVisible(!encuestaSegundoCuerpoVisible);
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

    const nextPasos = () => {
        if (pasos === 1) {
            setPasos(2);
        }
        setActiveIcon('Banco de Preguntas');
    };

    const enviarPreview = (previe) => {
        console.log(previe);
        setPrevieww(previe);
    };

    const enviarPreview2 = (previe2) => {
        setIspreview2(previe2);
    };

    const handleSendEstado = (estado) => {
        setEstados(estado);
    };

    const handleSendPosicion = (posicion) => {
        setPosicion(posicion);
    };

    const handleSendTamano = (tamano, titulo) => {
        setTamano({ tamano: tamano, titulo: titulo });
    };

    const handleSendGrosor = (grosor, titulo) => {
        setGrosor({ grosor: grosor, titulo: titulo });
    };

    const handleSendTipografia = (tipografia, titulo) => {
        setTipografia({ tipografia: tipografia, titulo: titulo });
    };

    const handleSendDatosDefinicionEncuesta = (datos) => {
        // console.log(datos)
    };

    const handleSendPosicionLogotipo = (posicion) => {
        setPosicionLogotipo(posicion);
    };

    const handleSendTamanoLogotipo = (tamano) => {
        setTamanoLogotipo(tamano);
    };

    return (
        <>
            <div
                id="modal-container"
                className={`encuesta-container ${blurBackground ? 'encuesta-blur' : ''}`}
                onClick={handleClickOutsideModal}
            >
                <Container fluid className='encuesta-container'>
                    <Row>
                        <Col xs={2} className="encuestas_coltitulo_create">
                            <h2 className='encuesta-titulo-create'>Encuesta Veris</h2>
                        </Col>
                        
                        <Col xs={2} className="encuestas_colsg_create">
                            <div className={`encuestas_colsg_create_1 ${activeTab !== 'diseña' ? 'inactive' : ''}`}>
                                <div 
                                    className={`encuestas_colsg1 ${activeTab === 'diseña' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('diseña')}
                                    style={{position: 'relative', width: '180px', height: '50px', cursor: 'pointer'}}
                                >
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '0', 
                                        left: '0', 
                                        width: '17.2%', 
                                        height: '92%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontStyle: 'normal',
                                        color: 'rgba(32, 32, 32, 1)',
                                        fontWeight: 'bold'
                                    }}>
                                        1
                                    </div>
                                    <span 
                                        className='imgcircle' 
                                        dangerouslySetInnerHTML={{ __html: circleSVG.replace(/stroke="([^"]*)"/, `stroke="${getIconStrokeColor('diseña')}"`) }}
                                    />
                                    <h2 className='encuesta-sg-create_1_1'>Diseña Encuesta</h2>
                                </div>

                                <div>
                                    <span className='imgchevron' dangerouslySetInnerHTML={{ __html: chevronsNightSVG }}/>
                                </div>

                                <div 
                                    className={`encuestas_colsg1 ${activeTab === 'revision' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('revision')}
                                    style={{position: 'relative', width: '180px', height: '50px', cursor: 'pointer'}}
                                >
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '0', 
                                        left: '0', 
                                        width: '17.6%', 
                                        height: '92%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontStyle: 'normal',
                                        color: 'rgba(32, 32, 32, 1)',
                                        fontWeight: 'bold'
                                    }}>
                                        2
                                    </div>
                                    <span 
                                        className='imgcircle' 
                                        dangerouslySetInnerHTML={{ __html: circleSVG.replace(/stroke="([^"]*)"/, `stroke="${getIconStrokeColor('revision')}"`) }}
                                    />
                                    <h2 className='encuesta-sg-create_1_2'>Revisión</h2>
                                </div>
                            </div>

                            <div className='encuestas_colsg_create_2'>
                                <Button className='encuesta-sg-buttonv-create' onClick={handleVistaPrevia}>
                                    <p style={{ marginLeft: '3px', marginRight: '2px'}}>Vista previa</p>
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html: eyeSVG }}/>
                                </Button>
                                
                                {activeTab !== 'revision' && (
                                    <Button 
                                        className='encuesta-sg-buttons-create'
                                        onClick={() => handleTabChange('revision')}
                                    >
                                        Siguiente
                                    </Button>
                                )}
                            </div>
                        </Col>
                        <hr />
                        
                        {activeTab === 'diseña' ? <DiseñaEncuesta 
                            openVistaPrevia={openVistaPrevia} 
                            handleCloseVistaPrevia={handleCloseVistaPrevia}
                            handleTotalPreguntas={recibirTotalPreguntas}
                            contentInit={contentCont}
                        /> : null}
                        {activeTab === 'revision' ? <Revision 
                            regresar={regresarRevision}
                            handleTotalPreguntas={contentCont}
                        /> : null}
                    </Row>
                </Container>
            </div>
        </>
    );  
};

export default Create;

