import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaColor.css'
import { SketchPicker } from 'react-color';
import { ChromePicker } from 'react-color';
import CustomSketchPicker from './CustomSketchPicker';





const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');

const DisenoEncuestaLateralColores = ( {openMenuPrincipal, closeMenuColores} ) => {

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

    const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [savedColors, setSavedColors] = useState([]);

  

  const handleAddColor = () => {
    setSavedColors((prevColors) => [...prevColors, currentColor]);
  };



    

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };


    const handleClickColorSeleccionado = (index) => {
        const updatedColorEncuesta = [...colorEncuesta];
        updatedColorEncuesta[index].isOpen = true;
        setColorEncuesta(updatedColorEncuesta);
    };
    
    const handleCloseColorPicker = (index) => {
        const updatedColorEncuesta = [...colorEncuesta];
        updatedColorEncuesta[index].isOpen = false;
        setColorEncuesta(updatedColorEncuesta[0].isOpen = false);

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

    

    // lista tamano

    const tamano = [
        { id: 1, nombre: 'Tamaño actual' },
        { id: 2, nombre: 'Pequeño' },
        { id: 3, nombre: 'Mediano' },
        { id: 4, nombre: 'Grande' } 
    ];

    // lista de colores de encuesta

       
    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuColores(false);
    }
    
    
  return (
    <>
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
                                <div className="contenedorFuenteColor" key={index}>
                                    <div className="subcontenedorFuenteTitulo">
                                        <span className="fuenteTitulo">{color.nombre}</span>
                                    </div>
                                    <div className="contenedorColorSeleccionado" onClick={() => handleClickColorSeleccionado(index)}>
                                        {color.isOpen && (
                                            <div style={{ position: 'absolute', zIndex: '2', right: '70%' }}>
                                                <CustomSketchPicker
                                                    handleCloseColorPicker={() => handleCloseColorPicker(index)}
                                                />
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>
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
