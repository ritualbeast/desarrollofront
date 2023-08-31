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
const dropletSVG = svgManager.getSVG('droplet');

const DisenoEncuestaLateralPrincipal = ({datapasos,preview3, sendPreviewLogotipo, sendEstado2,sendPosicion2, 
    sendTamano2, sendGrosor2, sendTipografia2, sendPosicionLogotipo, sendTamanoLogotipo
    ,sendTamanoPaso2, sendGrosorPaso2,sendTipografiaPaso2, sendPosicionLogotipoPiePagina, sendTamanoLogotipoPiePagina, 
    sendImagenFondo, sendImagenFondoEstructura, contenEstilos, sendColors
}) => {

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
    const [defaultColors, setDefaultColors] = useState(
    [
        [
            { nombre: 'Rojo', color: '#ff0000' },
            { nombre: 'Verde', color: '#00ff00' },
            { nombre: 'Azul', color: '#0000ff' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Blanco', color: '#ffffff' },
        ],
        [
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Blanco', color: '#ffffff' },
        ],
        [
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Blanco', color: '#ffffff' },
        ], 
        [
            { nombre: 'Rojo', color: '#ff0000' },
            { nombre: 'Verde', color: '#00ff00' },
            { nombre: 'Azul', color: '#0000ff' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Blanco', color: '#ffffff' },
            // ... puedes añadir más aquí
        ],
        [
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre: 'Blanco', color: '#ffffff' },
            // ... puedes añadir más aquí
        ],
        [
            { nombre : 'Naranja', color: '#ffa500' },
            { nombre : 'Morado', color: '#800080' },
            { nombre : 'Gris', color: '#808080' },
            { nombre : 'Morado', color: '#9888e2' },
            { nombre : 'Gris', color: '#808080' },
            { nombre : 'Rojo', color: '#ff0000' },
            { nombre: 'Magenta', color: '#ff00ff' },
            { nombre: 'Cyan', color: '#00ffff' },
            { nombre: 'Amarillo', color: '#ffff00' },
            { nombre: 'Blanco', color: '#ffffff' },
        ], 
    ]
    );

    

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

    const [selectedColors, setSelectedColors] = useState(null);
    const handleClickFila = (id) => {
        if (filaSeleccionada === id) {
          setFilaSeleccionada(null);
          setSelectedColors(null); // Desactivar la selección de colores
        } else {
          setFilaSeleccionada(id);
          setSelectedColors(defaultColors[id - 1]); // -1 porque los IDs empiezan en 1 pero los índices de los arreglos en 0
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

    const handleSendTamano = (tamano, titulo) => {
        sendTamano2(tamano, titulo);
    }

    const handleSendGrosor = (grosor, titulo) => {
        sendGrosor2(grosor, titulo);
    }

    const handleSendTipografia = (tipografia, titulo) => {
        sendTipografia2(tipografia, titulo);
    }

    // enviar posicion de imagen de logotipo

    const handleSendPosicionLogotipo = (posicion) => {
        sendPosicionLogotipo(posicion);
    }

    // enviar tamaño de imagen de logotipo

    const handleSendTamanoLogotipo = (tamano) => {
        sendTamanoLogotipo(tamano);
    }

    // enviar posicion de imagen de logotipo de pie de pagina

    const handleSendPosicionLogotipoPiePagina = (posicion) => {
        sendPosicionLogotipoPiePagina(posicion);
    }

    // enviar tamaño de imagen de logotipo de pie de pagina


    const handleSendTamanoLogotipoPiePagina = (tamano) => {
        sendTamanoLogotipoPiePagina(tamano);
    }



    // enviar datos al paso 2
    
    const handleSendTamanoPaso2 = (tamanoPaso2,titulo) => {
        sendTamanoPaso2(tamanoPaso2,titulo);
    }


    const handleSendGrosorPaso2 = (grosorPaso2,titulo) => {
        sendGrosorPaso2(grosorPaso2,titulo);
    }

    const handleSendTipografiaPaso2 = (tipografiaPaso2,titulo) => {
        sendTipografiaPaso2(tipografiaPaso2,titulo);
    }

    const [colors, setColors] = useState(defaultColors);


    const saveColors = (colors) => {
        setColors(colors);
    }   

    const [imagenFondo, setImagenFondo] = useState(sendImagenFondoEstructura);
    const recibirImagenFondo = (imagen) => {
        setImagenFondo(imagen);
    }

    sendImagenFondo(imagenFondo);

    
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
                            {
                                listacolores.map((colorL, index) => (
                                    <div
                                        className={`fila2${filaSeleccionada === colorL.id ? ' seleccionada' : ''}`}
                                        key={colorL.id}
                                        onClick={() => handleClickFila(colorL.id)}
                                    >
                                        <div className="elemento2">
                                        {
                                            // Asegúrate de que hay un conjunto de colores para este índice
                                            defaultColors[index] ? defaultColors[index].map((colorSubArray, subIndex) => (
                                                <div
                                                    className="elementoColores"
                                                    key={subIndex}
                                                    style={{ backgroundColor: colorSubArray.color }}
                                                >
                                                    <span className='disenobar-nombre'></span>
                                                </div>
                                            )) : 'No hay colores para este elemento'
                                        }
                                        </div>
                                    </div>
                                ))
                            }

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
              sendPosicionImagen={(posicion) => handleSendPosicionLogotipo(posicion)}
              sendTamanoImagen={(tamano) => handleSendTamanoLogotipo(tamano)}
              sendPreviewLogo = {sendPreviewLogotipo}
              contenEstilos={contenEstilos}
            />
        )    
        }

        {openDisenoPiePagina && (
            <DisenoEncuestaLateralPiePagina 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuPiePagina={setOpenDisenoPiePagina}
                sendPreviewPiePagina={preview3}
                paso={pasos}
                sendEstado={(estado) => handleSendEstado(estado)}
                sendPosicion={(posicion) => handleSendPosicion(posicion)}
                sendPosicionImagen={(posicion) => handleSendPosicionLogotipoPiePagina(posicion)}
                sendTamanoImagen={(tamano) => handleSendTamanoLogotipoPiePagina(tamano)}
                contenEstilos={contenEstilos}

            />
        )  
        }

        {openDisenoFuentes && (
            <DisenoEncuestaLateralFuentes 
                openMenuPrincipal={setOpenDisenoPrincipal}
                closeMenuFuentes={setOpenDisenoFuentes}
                paso={pasos}
                sendTamano={(tamano, titulo) => handleSendTamano(tamano, titulo)}
                sendGrosor={(grosor, titulo) => handleSendGrosor(grosor, titulo)}
                sendTipografia={(tipografia, titulo) => handleSendTipografia(tipografia, titulo)}
                sendTamanoPaso2 = { (tamanoPaso2, titulo) => handleSendTamanoPaso2(tamanoPaso2, titulo) }
                 sendGrosorPaso2 = { (grosorPaso2, titulo) => handleSendGrosorPaso2(grosorPaso2, titulo) }
                 sendTipografiaPaso2 = { (tipografiaPaso2, titulo) => handleSendTipografiaPaso2(tipografiaPaso2, titulo) }
                 contenEstiloss={contenEstilos}
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
                sendImagenFondo = {(imagen) => {recibirImagenFondo(imagen)}}
                sendImagenFondoEstructura = {imagenFondo}
                contenEstilos={contenEstilos}
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
                sendColors={sendColors}
                datapasos={datapasos}
                selectedColors={selectedColors}
                contenEstilos={contenEstilos}
             />
        )
        }

        
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralPrincipal
