import React, { useEffect, useState, useRef } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { lista } from '../prisma/data/listaEncuesta.ts';
import svgManager from '../assets/svg';
import DisenoEncuestaLateralPrincipal from './Create/DisenoEncuestaLateralPrincipal';
import DefinicionEncuestaLateral from './Definicion/DefinicionEncuestaLateral';
import DefinicionEncuestaCuerpo from './Definicion/DefinicionEncuestaCuerpo';
import DefinicionEncuestaConfiguracion from './Definicion/DefinicionEncuestaConfiguracion';
import BancoPreguntasLateralPrincipal from './Create/BancoPreguntasLateralPrincipal';
import DiseñaEncuesta from './Create/DiseñaEncuesta';
import FormatoEncuestaLateralPrincipal from './Create/FormatoEncuestaLateralPrincipal';
import Revision from './Create/Revision';

const circleSVG = svgManager.getSVG('circle');
const chevronsNightSVG = svgManager.getSVG('chevron-rigth');
const eyeSVG = svgManager.getSVG('eye');
const chevronsLeftSVG = svgManager.getSVG('chevrons-left');
const chevronsRightSVG = svgManager.getSVG('chevrons-right');
const circle2SVG = svgManager.getSVG('circle2');

const Create = () => {
    const [activeIcon, setActiveIcon] = useState('Configuracion');
    const [activeTab, setActiveTab] = useState(true);
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pasos, setPasos] = useState(1);
    const [estados, setEstados] = useState('');
    const [posicion, setPosicion] = useState('');
    const [tamanos, setTamano] = useState({tamano: '', titulo: ''});
    const [grosor, setGrosor] = useState({grosor: '', titulo: ''});
    const [tipografia, setTipografia] = useState({tipografia: '', titulo: ''});
    const [openVistaPrevia, setVistaPrevia] = useState(false);
    const [Ispreview, setIspreview] = useState('');
    const [Ispreview2, setIspreview2] = useState('');
    const [posicionLogotipo, setPosicionLogotipo] = useState('');
    const [tamanoLogotipo, setTamanoLogotipo] = useState('');
    const [posicionLogotipoPiePagina, setPosicionLogotipoPiePagina] = useState('');
    const [tamanoLogotipoPiePagina, setTamanoLogotipoPiePagina] = useState('');
    const [tamanoPaso2, setTamanoPaso2] = useState({tamano: '', titulo: ''});
    const [grosorPaso2, setGrosorPaso2] = useState({grosor: '', titulo: ''});
    const [tipografiaPaso2, setTipografiaPaso2] = useState({tipografia: '', titulo: ''});
    const DefinicionEncuestaCuerpoRef = useRef(null);
    const ConfiguracionEncuestaRef = useRef(null);
    const [contentCont, setContentCont] = useState([{ 
        titulo: 'Seccion ',
        descripcion: '#', 
        orden: 1,
        imagenCabecera: '', 
        imagenPie : '',  
        tipoSeccion: 'C',  
        textoAgradecimiento: 'ok',
        urlRedireccion: '#',
        imagenCierre: '#',   
        textoBotonCierre: '#',
        preguntas: [] 

    }]);
    const [encuestaEstilos, setEncuestaEstilos] = useState({
        logotipo: {
          tamanio: "1",
          enumPosicion: ""
        },
        pieDePagina: {
          tamanio: "1",
          enumPosicion: ""
        },
        fuente: {
          tituloEncuesta: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          descripcionEncuesta: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          tituloSeccion: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          descripcionSeccion: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          preguntas: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          opcionesRespuestas: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          textoCierreEncuesta: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          },
          textoBotones: {
            enumTipografia: "",
            enumGrosor: "",
            enumTamanio: ""
          }
        },
        fondo: {
          colorFondo: "",
          imagenFondo: ""
        }
      });
      const [datosEncuesta, setDatosEncuesta] = useState({
        imagenCabecera : '',
        imagenPie : '',
        titulo : '',
        descripcion : '',
        leyenda : '',
      });

      const [datosConfiguracionEncuesta, setDatosConfiguracionEncuesta] = useState({
        idCategoriaEncuesta: '',
        enumTipoVigencia: '',
        fechaInicio : '',
        fechaFin : '',
        });
       


    const regresarRevision = () => {
        if(pasos === 3) {
            setPasos(2)
            setActiveIcon('Banco de Preguntas')
            setLateralOpciones(true)
            setActiveTab(true);
        }
    }

    const handleClick = (nombre) => {
        setActiveIcon(nombre);
    };
      
    useEffect(() => {
        
    }, [Ispreview, Ispreview2]);

    const toggleEncuestaSegundoCuerpo = () => {
        setEncuestaSegundoCuerpoVisible(!encuestaSegundoCuerpoVisible);
    };

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
    const [lateralOpciones, setLateralOpciones] = useState(true)
    const [activeFuncionEnviarDatos, setActiveFuncionEnviarDatos] = useState(false)

    const nextPasos = () => {
        
        if(pasos === 1){
            
            if (datosConfiguracionEncuesta.categoria === '' || datosConfiguracionEncuesta.vigencia === '' 
            || datosConfiguracionEncuesta.enum_tipo_encuesta === '' || datosConfiguracionEncuesta.enum_tipoVigencia === '' 
            || datosConfiguracionEncuesta.fechaInicio === '' || datosConfiguracionEncuesta.fechaFin === ''
             || datosEncuesta.titulo === ''
            || datosEncuesta.descripcion === '' || datosEncuesta.leyenda === ''

            ) {
                alert('Por favor, complete todos los campos');
                return;
            }
            
            setPasos(2);
            setActiveTab(true);
            // handleSendDatosDefinicionEncuestaPaso2();
            

        }
        setActiveIcon('Banco de Preguntas')
        if (pasos === 2) {
            setPasos(3)
            setActiveIcon('')
            setLateralOpciones(false)
            setActiveTab(false);
        }
    }

    const enviarPreview = (previe) => {
        // console.log(previe)
        setIspreview(previe)
    }

    const enviarPreview2 = (previe2) => {
        // console.log(previe2)
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

    

    const handleSendPosicionLogotipo = (posicion) => {
        setPosicionLogotipo(posicion)
    }

    const handleSendTamanoLogotipo = (tamano) => {
        setTamanoLogotipo(tamano)
    }

    const handleSendPosicionLogotipoPiePagina = (posicion) => {
        setPosicionLogotipoPiePagina(posicion)
    }

    const handleSendTamanoLogotipoPiePagina = (tamano) => {
        setTamanoLogotipoPiePagina(tamano)
    }
    
    const handleCloseVistaPrevia = () => {
        setVistaPrevia(false);
    };

    const handleVistaPrevia = () => {
        setVistaPrevia(true);
    };

    const recibirTotalPreguntas = (contentCont) => {
        setContentCont(contentCont);
    };

    const handleSendTamanoPaso2 = (tamano, titulo) => {
        setTamanoPaso2({tamano: tamano, titulo: titulo})
    }

    const handleSendGrosorPaso2 = (grosor, titulo) => {
        setGrosorPaso2({grosor: grosor, titulo: titulo})
    }

    const handleSendTipografiaPaso2 = (tipografia , titulo) => {
        setTipografiaPaso2({tipografia: tipografia, titulo: titulo})
    }


    const [datosDefinicionEncuesta, setDatosDefinicionEncuesta] = useState([])

    const sendDatosDefinicionEncuesta = (datos) => {
        setDatosEncuesta(datos)
      };

    const sendDatosConfiguracionEncuesta = (datos) => {
       console.log(datos)
        setDatosConfiguracionEncuesta(datos)
    }

    const sendDatosEstilosDefinicionEncuesta = (datos) => {
        setEncuestaEstilos(datos)
    }
    

    const leerestilos = () => {
        console.log(datosConfiguracionEncuesta);
      }

    const [imagenFondo, setImagenFondo] = useState(null)
    const handleSendImagenFondo = (imagen) => {
        
        setImagenFondo(imagen)
    }

    const [sendFooterImagen, setSendFooterImagen] = useState(null)
    const handleSendFooterImagen = (imagen) => {
        setSendFooterImagen(imagen)
    }

    return (
        <>
            <button onClick={leerestilos}>leer estilos</button>

            
        
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
                                
                                <div className='encuestas_colsg1' style={{position: 'relative', width: '220px', height: '50px'}}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '0', 
                                        left: '-3px', 
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
                                        left: '0.5px', 
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
                                
                                {activeTab ? (
                                    <Button 
                                    className={`encuesta-sg-buttons-create ${activeTab ? 'active' : ''}`}
                                        onClick={() => nextPasos('revision')}
                                    >
                                        Siguiente
                                    </Button>
                                ) : null}
                            </div>
                        </Col>
                        <hr />
                        
                        <Col className='encuesta-cuerpo'>
                            {lateralOpciones ? (
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
                                ) : null
                            }
                            
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
                                    sendTamanoPaso2 = {(tamanoPaso2, titulo) => handleSendTamanoPaso2(tamanoPaso2,titulo)}
                                    sendGrosorPaso2 = {(grosorPaso2, titulo) => handleSendGrosorPaso2(grosorPaso2,titulo)}
                                    sendTipografiaPaso2 = {(tipografiaPaso2, titulo) => handleSendTipografiaPaso2(tipografiaPaso2,titulo)}
                                    sendPosicionLogotipoPiePagina = {(posicion) => handleSendPosicionLogotipoPiePagina(posicion)}
                                    sendTamanoLogotipoPiePagina = {(tamano) => handleSendTamanoLogotipoPiePagina(tamano)}
                                    sendImagenFondo = {(imagen) => handleSendImagenFondo(imagen)}
                                    sendImagenFondoEstructura = {imagenFondo}
                                    />
                            )}

                            {activeIcon === 'Formato' && (
                                <FormatoEncuestaLateralPrincipal/>
                            )}

                            {activeIcon === 'Definicion' && (
                                <DefinicionEncuestaLateral/>   
                            )}

                            {activeIcon === 'Configuracion' && (
                                <DefinicionEncuestaConfiguracion
                                    ref={ConfiguracionEncuestaRef}
                                    closeMenuConfiguracion={handleClick}
                                    sendDatosConfiguracionEncuesta = {sendDatosConfiguracionEncuesta}
                                    contentInit={datosConfiguracionEncuesta}
                                />
                            )}

                            <Col className={`encuesta-Tercerocuerpo2 ${encuestaSegundoCuerpoVisible ? 'encuesta-abierto' : 'encuesta-cerrado'}`}>
                                {pasos === 1 
                                ? (
                                    <DefinicionEncuestaCuerpo 
                                        ref={DefinicionEncuestaCuerpoRef}
                                        sendPreview={(previe) => enviarPreview(previe)}
                                        sendPreview2={(previe2) => enviarPreview2(previe2)}
                                        sendEstado3={estados}
                                        sendPosicion3={posicion}
                                        sendTamano3={tamanos}
                                        sendGrosor3={grosor}
                                        sendTipografia3={tipografia}
                                        
                                        sendPosicionLogotipo = {posicionLogotipo}
                                        sendTamanoLogotipo = {tamanoLogotipo}
                                        sendPosicionLogotipoPiePagina = {posicionLogotipoPiePagina}
                                        sendTamanoLogotipoPiePagina = {tamanoLogotipoPiePagina}
                                        activeFuncionEnviarDatos={activeFuncionEnviarDatos}
                                        contentInit={datosEncuesta}
                                        contenEstilos= {encuestaEstilos}
                                        sendDatosDefinicionEncuesta={sendDatosDefinicionEncuesta} 
                                        sendEstilosDefinicionEncuesta= {sendDatosEstilosDefinicionEncuesta}
                                        
                                    />

                                ) : pasos === 2 ? (<DiseñaEncuesta 
                                        openVistaPrevia={openVistaPrevia} 
                                        handleCloseVistaPrevia={handleCloseVistaPrevia}
                                        handleTotalPreguntas={recibirTotalPreguntas}
                                        contentInit={contentCont}
                                        sendTamanoPaso2 = {tamanoPaso2}
                                        sendGrosorPaso2 = {grosorPaso2}
                                        sendTipografiaPaso2 = {tipografiaPaso2}
                                        sendImagenFondo = {imagenFondo}
                                        sendFooterImagen = {sendFooterImagen}
                                    />
                                ) : pasos === 3 ? ( <Revision
                                        regresar={regresarRevision}
                                        handleTotalPreguntas={contentCont}
                                        handleDatosPaso1 = {datosDefinicionEncuesta}
                                        handleDatosConfiguracion = {datosConfiguracionEncuesta}
                                        handleEstilos = {encuestaEstilos}
                                        
                                    />
                                ) : null
                                }
                            </Col>
                        </Col>
                    </Row>
                </Container> 
            </div>
            
        </>
    )  
}

export default Create
