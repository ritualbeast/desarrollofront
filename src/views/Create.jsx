import React, { useEffect, useState, useRef } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { lista } from '../prisma/data/listaEncuesta.ts';
import { listaBancoPreguntas } from '../prisma/data/listaBancoPreguntas.ts';
import svgManager from '../assets/svg';
import NuevaEncuesta from './Create/NuevaEncuesta';
import DisenoEncuesta from './Create/DiseñoEncuesta';
import DisenoEncuestaLateralPrincipal from './Create/DisenoEncuestaLateralPrincipal';
import DefinicionEncuestaLateral from './Definicion/DefinicionEncuestaLateral';
import DefinicionEncuestaCuerpo from './Definicion/DefinicionEncuestaCuerpo';
import DefinicionEncuestaConfiguracion from './Definicion/DefinicionEncuestaConfiguracion';
import BancoPreguntasLateralPrincipal from './Create/BancoPreguntasLateralPrincipal';
import DiseñaEncuesta from './Create/DiseñaEncuesta';


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
    const [tamanos, setTamano] = useState({tamano: '', titulo: ''});
    const [grosor, setGrosor] = useState({grosor: '', titulo: ''});
    const [tipografia, setTipografia] = useState({tipografia: '', titulo: ''});
    const [openVistaPrevia, setVistaPrevia] = useState(false);
    const [activeTab, setActiveTab] = useState('diseña');
    const [contentCont, setContentCont] = useState([{ tipo: 'C', titulo: 'Seccion ', comentario: '', contentPreg: [] }]);
    

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
      };
      
    useEffect(() => {
        // verificarLocalStorage();
        setShowBancoPreguntas(true);
    }, []);

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

    // const verificarLocalStorage = () => {
    //     const isAdmin = localStorage.getItem("nombreUsuario");
    //     if (isAdmin === null) {
    //     window.location.href = "/login";
    //     }
    // }
    const nextPasos = () => {
        if(pasos === 1){
            setPasos(2);
        }
        setActiveIcon('Banco de Preguntas')

    }

    const [Ispreview, setIspreview] = useState('');
    const enviarPreview = (previe) => {
        console.log(previe)
        setIspreview(previe)
    }

    const [Ispreview2, setIspreview2] = useState('');

    const enviarPreview2 = (previe2) => {
        setIspreview2(previe2)
    }


    const handleSendEstado = (estado) => {
        setEstados(estado)
    }

    const handleSendPosicion = (posicion) => {
        setPosicion(posicion)
    }

    const handleSendTamano = (tamano, titulo) => {
        setTamano({ tamano: tamano, titulo: titulo });
    }

    const handleSendGrosor = (grosor, titulo) => {
        setGrosor({ grosor: grosor, titulo: titulo });  
    }

    const handleSendTipografia = (tipografia, titulo) => {
        setTipografia({ tipografia: tipografia, titulo: titulo });
    }


    // recibir datos de definicion de encuesta cuerpo

    const [datosDefinicionEncuesta, setDatosDefinicionEncuesta] = useState(null);

    const handleSendDatosDefinicionEncuesta = (datos) => {
        // console.log(datos)
    }


    // enviar posicion de logotipo

    const [posicionLogotipo, setPosicionLogotipo] = useState('');

    const handleSendPosicionLogotipo = (posicion) => {
        setPosicionLogotipo(posicion)
    }

    // enviar tamaño de logotipo

    const [tamanoLogotipo, setTamanoLogotipo] = useState('');

    const handleSendTamanoLogotipo = (tamano) => {
        setTamanoLogotipo(tamano)
    }


    
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



    // enviar fuentes paso 2 

    const [tamanoPaso2, setTamanoPaso2] = useState('');
    const [grosorPaso2, setGrosorPaso2] = useState('');
    const [tipografiaPaso2, setTipografiaPaso2] = useState('');

    const handleSendTamanoPaso2 = (tamano) => {
        setTamanoPaso2(tamano)
    }

    const handleSendGrosorPaso2 = (grosor) => {
        setGrosorPaso2(grosor)
    }

    const handleSendTipografiaPaso2 = (tipografia) => {
        setTipografiaPaso2(tipografia)
    }


    

      

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
                            <div className='encuestas_colsg_create_1'>
                                
                            <div className='encuestas_colsg1' style={{position: 'relative', width: '220px', height: '50px'}}>
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
                                    {pasos === 1 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circleSVG }}/>}
                                    {pasos !== 1 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circle2SVG }}/>}
                                    <h2 className='encuesta-sg-create_1_1'>Definición de Encuesta</h2>
                                </div>
                                
                                <div>
                                    <span className='imgchevron' dangerouslySetInnerHTML={{ __html: chevronsNightSVG }}/>
                                </div>


                                <div className='encuestas_colsg1' style={{position: 'relative', width: '180px', height: '50px'}}>
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
                                        2
                                    </div>
                                    {pasos === 2 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circleSVG }}/>}
                                    {pasos !== 2 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circle2SVG }}/>}
                               
                                    <h2 className='encuesta-sg-create_1_1'>Diseña Encuesta</h2>
                                </div>

                                <div>
                                    <span className='imgchevron' dangerouslySetInnerHTML={{ __html: chevronsNightSVG }}/>
                                </div>

                                <div className='encuestas_colsg1'style={{position: 'relative', width: '180px', height: '50px'}}>
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
                                        3
                                    </div>
                                    {pasos === 3 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circleSVG }}/>}
                                    {pasos !== 3 && <span className='imgcircle' dangerouslySetInnerHTML={{ __html: circle2SVG }}/>}
                               
                                    <h2 className='encuesta-sg-create_1_2'>Revisión</h2>
                                </div>
                            </div>
                            <div className='encuestas_colsg_create_2'>
                                <Button className='encuesta-sg-buttonv-create' onClick={handleVistaPrevia}>
                                    <p style={{ marginLeft: '3px', marginRight: '2px'}}>Vista previa</p>
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html: eyeSVG }}/>
                                </Button>
                                <Button className='encuesta-sg-buttons_create' onClick={nextPasos}
                                >Siguiente</Button>
                            </div>
                        </Col>
                        <hr />
                        
                        <Col className='encuesta-cuerpo'>
                            <Col className="encuesta-cuerpo2">
                                <Col style={{paddingTop: '9.5%', paddingBottom: '12%'}}>
                                    <div className='encuesta-subtitulo1' onClick={toggleEncuestaSegundoCuerpo}>
                                    {encuestaSegundoCuerpoVisible ? (
                                        <>
                                            <span style={{display: 'flex'}} dangerouslySetInnerHTML={{ __html: chevronsLeftSVG }} />
                                            <span className="encuesta-subtitulo-1">Colapsar</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="encuesta-subtitulo-1" style={{paddingLeft: '8%'}}>Expandir</span>
                                            <span style={{display: 'flex'}} dangerouslySetInnerHTML={{ __html: chevronsRightSVG }} />
                                        </>
                                    )}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="lista_2">
                                            <div className="fondo-lista">
                                                {lista.map((item) => (
                                                   pasos === 1 && (item.nombre === "Formato" || item.nombre === "Banco de Preguntas") ? null : (
                                                    pasos === 2 && item.nombre === "Configuracion" ? null : (
                                                    <div
                                                        key={item.nombre}
                                                        className={`lista-container ${activeIcon === item.nombre ? 'active' : ''} ${activeIcon && activeIcon !== item.nombre ? 'inactive' : ''}`}
                                                        onClick={() => handleClick(item.nombre)}
                                                    >
                                                        <div className={`juntar-lista-nombre ${activeIcon === item.nombre ? 'active' : ''}`}>
                                                            <div className={`fondo-lista2 ${activeIcon === item.nombre ? 'active-background' : ''}`}>
                                                                {item.icono && (
                                                                    <span dangerouslySetInnerHTML={{ __html: item.icono.replace(/stroke="([^"]*)"/, `stroke="${activeIcon === item.nombre ? 'rgba(255, 199, 0, 1)' : 'rgba(177, 177, 177, 1)'}"`) }}/>
                                                                )}
                                                                <span className="lista-nombre" style={{ textAlign: 'center' }}>{item.nombre}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ) 
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                </Col>
                            </Col>
                            
                            {activeIcon === 'Banco de Preguntas' ? 
                            <BancoPreguntasLateralPrincipal/>: null}

                            {activeIcon === 'Estilo'  && (
                                <DisenoEncuestaLateralPrincipal
                                    datapasos={pasos}
                                    preview3= {Ispreview}
                                    sendPreviewLogotipo= {Ispreview2}
                                    sendEstado2={(estado) =>  handleSendEstado(estado)}
                                    sendPosicion2={(posicion) =>  handleSendPosicion(posicion)}
                                    sendTamano2={(tamano, titulo) =>  handleSendTamano(tamano, titulo)}
                                    sendGrosor2={(grosor, titulo) =>  handleSendGrosor(grosor, titulo)}
                                    sendTipografia2={(tipografia, titulo) =>  handleSendTipografia(tipografia, titulo)}
                                    sendPosicionLogotipo={(posicion) =>  handleSendPosicionLogotipo(posicion)}
                                    sendTamanoLogotipo={(tamano) =>  handleSendTamanoLogotipo(tamano)}
                                    sendTamanoPaso2 = {tamanoPaso2 => handleSendTamanoPaso2(tamanoPaso2)}
                                    sendGrosorPaso2 = {grosorPaso2 => handleSendGrosorPaso2(grosorPaso2)}
                                    sendTipografiaPaso2 = {tipografiaPaso2 => handleSendTipografiaPaso2(tipografiaPaso2)}

                                    />
                                )}

                            {activeIcon === 'Definicion' && (
                                <DefinicionEncuestaLateral/>   
                                )}

                            {activeIcon === 'Configuracion' && (
                                <DefinicionEncuestaConfiguracion
                                closeMenuConfiguracion={handleClick}

                                
                                />


                                )}

                            

                            <Col className={`encuesta-Tercerocuerpo2 ${encuestaSegundoCuerpoVisible ? 'encuesta-abierto' : 'encuesta-cerrado'}`}>
                            {pasos === 1 
                             ? (
                                <DefinicionEncuestaCuerpo 
                                sendPreview={(previe) => enviarPreview(previe)}
                                sendPreview2={(previe2) => enviarPreview2(previe2)}
                                sendEstado3={estados}
                                sendPosicion3={posicion}
                                sendTamano3={tamanos}
                                sendGrosor3={grosor}
                                sendTipografia3={tipografia}
                                sendDatosDefinicionEncuesta={(datos) =>  handleSendDatosDefinicionEncuesta(datos)}
                                sendPosicionLogotipo = {posicionLogotipo}
                                sendTamanoLogotipo = {tamanoLogotipo}



                                />
                            ) :<DiseñaEncuesta 
                            openVistaPrevia={openVistaPrevia} 
                            handleCloseVistaPrevia={handleCloseVistaPrevia}
                            handleTotalPreguntas={recibirTotalPreguntas}
                            contentInit={contentCont}
                        />}

                                
                                    
                            </Col>
                        </Col>
                    </Row>
                </Container> 
            </div>
            
        </>
    )  
}

export default Create
