import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaColor.css'
import { SketchPicker } from 'react-color';
import { ChromePicker } from 'react-color';
import CustomSketchPicker from './CustomSketchPicker';
import { colors } from '@mui/material';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');

const DisenoEncuestaLateralColores = ( {
    openMenuPrincipal, 
    closeMenuColores, 
    sendColors, 
    datapasos, 
    selectedColors,
    contenEstilos
} ) => {

    const [showTooltip, setShowTooltip] = React.useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#fff');
    const [selectedColorOpen, setSelectedColorOpen] = useState(false);
    const [colorEncuesta, setColorEncuesta] = useState([
        {id: 1, nombre: 'Titulo de encuesta', isOpen: false},
        { id: 2, nombre: 'Descripción de encuesta' , isOpen: false},
        { id: 3, nombre: 'Titulo de sección' , isOpen: false},
        { id: 4, nombre: 'Descripción de sección' , isOpen: false},
        { id: 5, nombre: 'Preguntas' , isOpen: false},
        { id: 6, nombre: 'Opciones de respuesta' , isOpen: false},
        { id: 7, nombre: 'Fondo' , isOpen: false},
        { id: 8, nombre: 'Texto de pie de página' , isOpen: false},
        { id: 9, nombre: 'Botones' , isOpen: false},
        { id: 10, nombre: 'Texto de botón' , isOpen: false},
    ]);
    const [defaultColores, setDefaultColores] = useState(selectedColors || []);
    const [currentColor, setCurrentColor] = useState('#FFFFFF');
    const [savedColors, setSavedColors] = useState([]);
    const [estilos, setEstilos] = useState(contenEstilos);
    


    const handleClickColorSeleccionado = (index) => {
        const updatedColorEncuesta = [...colorEncuesta];
        updatedColorEncuesta[index].isOpen = true;
        setColorEncuesta(updatedColorEncuesta);
    };
    
    const handleCloseColorPicker = (index) => {
        const updatedColorEncuesta = [...colorEncuesta];
        updatedColorEncuesta[index].isOpen = false;
        setColorEncuesta(updatedColorEncuesta); // Corrección aquí
    };
    
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


    // lista de colores de encuesta

    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuColores(false);
    }

    const defaultColors = [
        '#ff0000', // Rojo
        '#00ff00', // Verde
        '#0000ff', // Azul
        '#ff00ff', // Magenta
        '#00ffff', // Cyan
        '#ffff00', // Amarillo
        
    ];
    
    const initialColors = colorEncuesta.map((_, index) => {
        const colorArray = defaultColores[index % defaultColores.length];
        return colorArray ? colorArray.color : '#FFFFFF'; // Utiliza un valor por defecto si no hay colores disponibles
      });
    const [colors, setColors] = useState(initialColors);
    sendColors(colors);

    const handleChangeComplete = (newColor, index, colornombre) => {
        const updatedColors = [...colors];
        updatedColors[index] = newColor.hex;
        setColors(updatedColors);
        // handleCloseColorPicker(index);
        const estilosnuevo = { ...estilos };
        console.log(colornombre)
        if(transformarTitulo(colornombre) === 'fondo'){
            console.log(estilosnuevo.fondo)
            estilosnuevo.fondo.colorFondo = newColor.hex;
            
        }
        else {
            estilosnuevo.fuente[transformarTitulo(colornombre)].color = newColor.hex;
        }
        setEstilos(estilosnuevo);

    };


    const transformarTitulo = (titulo) => {
        const mapeoTitulos = {
          "Titulo de encuesta": "tituloEncuesta",
          "Descripción de encuesta": "descripcionEncuesta",
          "Texto de pie de página": "leyenda",
          "Texto de botón": "textoBotones",
          "Título de sección": "tituloSeccion",
          "Descripción de sección": "descripcionSeccion",
          "Preguntas": "preguntas",
          "Opciones de respuesta": "opcionesRespuesta",
          "Texto de cierre de encuestas": "textoCierreEncuesta",
          "Fondo": "fondo",
          
        };

        console.log(mapeoTitulos[titulo])
      
        return mapeoTitulos[titulo];
      };

    
    const handleCloseButtonClick = (event, index) => {
        event.stopPropagation();
        handleCloseColorPicker(index);
    };

    const verestilos = () => {
        console.log(estilos);
    }
    
  return (
    <>
        <button onClick={verestilos}
        >555</button>
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
                        <div className="contenedorCabeceraLogotipo">
                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }} onClick={volverMenuPrincipal}/>
                            <span className='cabeceraTitle'>Colores</span>
                        </div>
                        <div className='contenedorColorPrincipal'>
                        {colorEncuesta.map((color, index) => (
                            datapasos === 1 &&  (color.nombre === 'Titulo de sección' || color.nombre === 'Descripción de sección' || 
                            color.nombre === 'Preguntas' || color.nombre === 'Opciones de respuesta' ) ? null :  (
                            <div className="contenedorFuenteColor" key={index}>
                                
                                    
                                      <>
                                        <div className="subcontenedorFuenteTitulo">
                                            <span className="fuenteTitulo">{color.nombre}</span>
                                        </div>
                                        <div className="contenedorColorSeleccionado"
                                        style={{ backgroundColor: colors[index] }}  
                                        onClick={() => handleClickColorSeleccionado(index)}>
                                            {color.isOpen && (
                                                <div style={{ position: 'absolute', zIndex: '2', right: '70%', backgroundColor : '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'}}> 
                                                    <SketchPicker 
                                                        color={colors[index]}
                                                        onChangeComplete={(newColor) => handleChangeComplete(newColor, index, color.nombre)} 
                                                        
                                                    />
                                                    <button 
                                                        style={{marginTop: '10px', padding: '5px 10px', cursor: 'pointer'}}
                                                        onClick={(event) => handleCloseButtonClick(event, index)}
                                                    >
                                                        Cerrar
                                                    </button>

                                                </div>
                                            )}
                                        </div>
                                      </>  
                                    
                                 
                               
                            </div>
                            )
                        ))}
                        </div>

                    
                    </div>
                    <br />
                    <br />
                </div>
                </div>
            
            </Col>
        </Col>
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralColores
