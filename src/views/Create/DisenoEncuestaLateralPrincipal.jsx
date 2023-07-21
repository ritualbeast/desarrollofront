import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import DisenoEncuestaLaterallogotipo from './DisenoEncuestaLateralLogotipo';
import DisenoEncuestaLateralPiePagina from './DisenoEncuestaLateralPiePagina';
import DisenoEncuestaLateralFuentes from './DisenoEncuestaLateralFuentes';
import DisenoEncuestaLateralDisposicion from './DisenoEncuestaLateralDisposicion';
import DisenoEncuestaLateralFondo from './DisenoEncuestaLateralFondo';
import DisenoEncuestaLateralTransicion from './DisenoEncuestaLateralTransicion';
import DisenoEncuestaLateralColores from './DisenoEncuestaLateralColores';
import svgManager from '../../assets/svg';
import '../../styles/estilodiseno.css'

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const imageSVG = svgManager.getSVG('image');
const sidebarSVG = svgManager.getSVG('sidebar');
const italicSVG = svgManager.getSVG('italic');
const listSVG = svgManager.getSVG('list');
const dropletSVG = svgManager.getSVG('droplet');
const repeatSVG = svgManager.getSVG('repeat');

const DisenoEncuestaLateralPrincipal = ({datapasos,preview3, sendEstado2,sendPosicion2}) => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);

    const [openDisenoPrincipal, setOpenDisenoPrincipal] = React.useState(true);
    const [openDisenoLogotipo, setOpenDisenoLogotipo] = React.useState(false);
    const [openDisenoPiePagina, setOpenDisenoPiePagina] = React.useState(false);
    const [openDisenoFuentes, setOpenDisenoFuentes] = React.useState(false);
    const [openDisenoDisposicion, setOpenDisenoDisposicion] = React.useState(false);
    const [openDisenoFondo, setOpenDisenoFondo] = React.useState(false);
    const [openDisenoTransicion, setOpenDisenoTransicion] = React.useState(false);
    const [openDisenoColores, setOpenDisenoColores] = React.useState(false);
    const [pasos, setPasos] = React.useState(datapasos);
    const [preview, setPreview] = useState(preview3);

    const openDisenoLogotipoHandler = () => {
        setOpenDisenoLogotipo(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoPiePaginaHandler = () => {
        setOpenDisenoPiePagina(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoFuentesHandler = () => {
        setOpenDisenoFuentes(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoDisposicionHandler = () => {
        setOpenDisenoDisposicion(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoFondoHandler = () => {
        setOpenDisenoFondo(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoTransicionHandler = () => {
        setOpenDisenoTransicion(true);
        setOpenDisenoPrincipal(false);
    };

    const openDisenoColoresHandler = () => {
        setOpenDisenoColores(true);
        setOpenDisenoPrincipal(false);
    };


    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const targetRef = useRef(null);
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

    const handleNestedClick = (nombre) => {
        // Lógica para manejar el clic en las opciones desplegadas
    };

    // lista de diseño

    const listadiseno = [  
        {nombre: 'Logotipo', id: 1, SSVG: imageSVG},
        {nombre: 'Pie de página', id: 2, SSVG: sidebarSVG},
        {nombre: 'Fuentes', id: 3 , SSVG: italicSVG},
        // {nombre: 'Disposicion', id: 4 , SSVG: listSVG},
        {nombre: 'Fondo', id: 4 , SSVG: dropletSVG},
        // {nombre: 'Transcición', id: 6 , SSVG: repeatSVG},
    ];

    const elementosPorFila = 2;

    // Dividir el arreglo en filas de dos elementos
    const filas = [];
    for (let i = 0; i < listadiseno.length; i += elementosPorFila) {
      filas.push(listadiseno.slice(i, i + elementosPorFila));
    }

    // Lista de colores

    const listacolores = [
        {nombre: '1', id: 1},
        {nombre: '2', id: 2},
        {nombre: '3', id: 3},
        {nombre: '4', id: 4},
        {nombre: '5', id: 5},
        {nombre: '6', id: 6},
    ];

    const colores = [
        {id: 1, color: '#FF0000'}, 
        {id: 2, color: '#0000FF'},
        {id: 3, color: '#008000'},
        {id: 4, color: '#FFFF00'},
        {id: 5, color: '#800080'},
        {id: 6, color: '#FFA500'},
        {id: 7, color: '#FF00FF'},
        {id: 8, color: '#A52A2A'},
        {id: 9, color: '#808080'}
    ];

    const handleClickFila = (id) => {
        if (filaSeleccionada === id) {
          setFilaSeleccionada(null); // Desactivar la selección si se hace clic nuevamente en la misma fila
        } else {
          setFilaSeleccionada(id);
          openDisenoColoresHandler();
        }
      };

    const handleClickElemento = (id) => {
        if (id === 1) {
            openDisenoLogotipoHandler();
        } else if (id === 2) {

            openDisenoPiePaginaHandler();
        } else if (id === 3) {

            openDisenoFuentesHandler();
        }  else if (id === 5) {

            openDisenoDisposicionHandler();
        } else if (id === 4) {

            openDisenoFondoHandler();
        } else if (id === 6) {

            openDisenoTransicionHandler();
        } 

        

    };
    const handleSendEstado = (estado) => {
        sendEstado2(estado);
    }
    
    const handleSendPosicion = (posicion) => {
        sendPosicion2(posicion);
    }
    
  return (
    <>
        {openDisenoPrincipal && (
             <Col className="encuesta-Segundocuerpo2">
                <Col>
                <div className="encuesta-subtitulo2">
                    <h2 className="encuesta-subtitulo-2">Estilo</h2>
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
                        className="help-icon"
                        onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                    >
                        <span
                        ref={targetRef}
                        style={{ marginLeft: '150px' }}
                        dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                        />
                    </div>
                    </OverlayTrigger>
                </div>
                </Col>
                <Col>
                
                    <div className="desplegado-container">
                    <div className="listaBancoPreguntas-2">
                        <div className="fondo-lista">
                        {filas.map((fila, index) => (
                            <div className="fila" key={index}>
                                {fila.map((elemento) => (
                                     pasos === 1 && (elemento.nombre === "Disposicion" || elemento.nombre === "Transcición" ||  elemento.nombre === 'Fondo'  ) ? null :  (
                                    
                                        <div className="elemento" key={elemento.id}  onClick={() => handleClickElemento(elemento.id)}>
                                            <span className='disenobar-nombre'>{elemento.nombre}</span>
                                            <br/>
                                            <div className="svg-container">
                                            {/* Renderizar el SVG dentro del div con radius */}
                                            <div className="svg-div">
                                                {<span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html: elemento.SSVG }}/>}
                                            </div>
                                            </div>
                                            
                                        </div>
                                    )
                                ))}
                            </div>
                            ))}  
                            <div className="fila">
                                Colores
                            </div>
                            <div className="contenedorfilas">
                            {listacolores.map((colorL) => (
                                <div
                                className={`fila2${filaSeleccionada === colorL.id ? ' seleccionada' : ''}`}
                                key={colorL.id}
                                onClick={() => handleClickFila(colorL.id)}
                                >
                                <div className="elemento2">
                                    {colores.map((color) => (
                                    <div
                                        className="elementoColores"
                                        key={color.id}
                                        style={{ backgroundColor: color.color }}
                                    >
                                        <span className='disenobar-nombre'>{color.nombre}</span>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ))}
                            </div>
                            
                            
                    
                        
                        </div>
                    </div>
                    </div>
                
                </Col>
            </Col>
            
            )}
       

        {openDisenoLogotipo && (
            <DisenoEncuestaLaterallogotipo 
              openMenuPrincipal={setOpenDisenoPrincipal}
              closeMenuLogotipo={setOpenDisenoLogotipo}
            />
        )    
        }

        {openDisenoPiePagina && (
            <DisenoEncuestaLateralPiePagina 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuPiePagina={setOpenDisenoPiePagina}
                preview4={preview}
                paso={pasos}
                sendEstado={(estado) => handleSendEstado(estado)}
                sendPosicion={(posicion) => handleSendPosicion(posicion)}
            />
        )  
        }

        {openDisenoFuentes && (
            <DisenoEncuestaLateralFuentes 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuFuentes={setOpenDisenoFuentes}
                paso={pasos}
            />
        )
        }

        {openDisenoDisposicion && (
            <DisenoEncuestaLateralDisposicion
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuDisposicion={setOpenDisenoDisposicion}
            
            />
        )
        }

        {openDisenoFondo && (
            <DisenoEncuestaLateralFondo 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuFondo={setOpenDisenoFondo}
            
            />
        )
        }

        {openDisenoTransicion && (
            <DisenoEncuestaLateralTransicion 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuTransicion={setOpenDisenoTransicion}
            />
        )
        }

        {openDisenoColores && (
            <DisenoEncuestaLateralColores
            
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuColores={setOpenDisenoColores}
             />
        )
        }

        
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralPrincipal
