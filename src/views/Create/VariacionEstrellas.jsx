import React, { useEffect, useState } from 'react'
import '../../styles/variacionEstrellas.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SketchPicker } from 'react-color';
import ResultadoValoracionEstrellas from './ResultadoValoracionEstrellas';

const minusCircleSVG = svgManager.getSVG('minus-circle');
const plushCircleSVG = svgManager.getSVG('plush-circle');
const trashSVG = svgManager.getSVG('trash-mini');
const starFillSVG = svgManager.getSVG('star-fill');
const squareFillSVG = svgManager.getSVG('square-fill');
const circleFillSVG = svgManager.getSVG('circle-fill');
const triangleFillSVG = svgManager.getSVG('triangle-fill');

const opciones = [
    { id: 1, icono: 'star' },
    { id: 2, icono: 'square' },
    { id: 3, icono: 'circle' },
    { id: 4, icono: 'triangle' },
  ];

const VariacionEstrellas = ({closeopmul, onPreguntaChange, indice, onAceptarValoracionEstrellas}) => {
    const [mostrarContenedor, setMostrarContenedor] = useState(true);
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [mostrarLogica, setMostrarLogica] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isActiveLogica, setIsActiveLogica] = useState(true);
    const [opcionesRespuesta, setOpcionesRespuesta] = useState([
        {
            id: 1,
            checked: false,
            text: "",
            type: 'checkbox',
            seccionValue: '',
            preguntaValue: '',
            icono: starFillSVG,
          }
    ]);
    const [opcionText, setOpcionText] = useState("");
    const [moreContendorLogica, setMoreContendorLogica] = useState([]);
    const [usarPonderacion, setUsarPonderacion] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion4, setConfiguracion4] = useState(false); 
    const [configuracion5, setConfiguracion5] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [pregunta, setPregunta] = useState('');
    const [showColorPicker, setShowColorPicker] = useState({});
    const [selectedColor, setSelectedColor] = useState({});
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [selectedIcono, setSelectedIcono] = useState(starFillSVG);
    const [selectedIcon, setSelectedIcon] = useState({});

    
    // const handleCancelarOpcionMultiple = () => {
    //     closeopmul(false);
    // }

    const handleEditar = () => {
        setMostrarEditar(!mostrarEditar);
        setMostrarConfiguracion(false);
        setMostrarLogica(false);
        setIsActiveEditar(false)
        setIsActiveConfiguracion(true);
        setIsActiveLogica(true);
    };

    const handleConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
        setMostrarEditar(false);
        setMostrarLogica(false);
        setIsActiveConfiguracion(false)
        setIsActiveEditar(true);
        setIsActiveLogica(true);
    };

    const handleLogica = () => {
        setMostrarLogica(!mostrarLogica);
        setMostrarEditar(false);
        setMostrarConfiguracion(false);
        setIsActiveLogica(false);
        setIsActiveEditar(true);
        setIsActiveConfiguracion(true);
    };

    const handleMoreOpcion = () => {
        const newOpcion = {
            id: opcionesRespuesta.length + 1,
            checked: false,
            text: "",
            type: 'checkbox',
            seccionValue: '',
            preguntaValue: '',
            icono: selectedIcono,
        };

        console.log("Nueva opción de respuesta:", newOpcion);

        setOpcionesRespuesta((prevOpciones) => [...prevOpciones, newOpcion]);
        setOpcionText("");
        setMoreContendorLogica((prevLogica) => [...prevLogica, true]);
    };

    const handleOpcionTextChange = (id, newText) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.id === id ? { ...opcion, text: newText } : opcion
          )
        );
    };
    
    const handleDeleteOpcion = (id) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.filter((opcion) => opcion.id !== id)
        );
      };

    const handleSwitchChange = () => {
        setUsarPonderacion(!usarPonderacion);

        if (!usarPonderacion) {
            setInputs([1]);
          } else {
            setInputs([]);
          }
    };

    const handleSwitchConfigurar1 = () => {
        setConfiguracion1(!configuracion1);
    };

    const handleSwitchConfigurar2 = () => {
        setConfiguracion2(!configuracion2);
    };           

    const handleSwitchConfigurar4 = () => {
        setConfiguracion4(!configuracion4);
    };

    const handleSwitchConfigurar5 = () => {
        setConfiguracion5(!configuracion5);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return; // No se soltó en una ubicación válida
      
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
      
        const opcionesCopy = [...opcionesRespuesta];
        const [removed] = opcionesCopy.splice(sourceIndex, 1);
        opcionesCopy.splice(destinationIndex, 0, removed);
      
        setOpcionesRespuesta(opcionesCopy);
    };

    const handleClearOpcion = (index) => {
        setOpcionesRespuesta((prevOpciones) => {
          const updatedOpciones = prevOpciones.map((opcion, opcionIndex) => {
            if (opcionIndex === index) {
              return {
                ...opcion,
                seccionValue: '',
                preguntaValue: '',
              };
            }
            return opcion;
          });
          return updatedOpciones;
        });
    };

    const handleSeccionChange = (index, event) => {
        const selectedValue = event.target.value;
        setOpcionesRespuesta((prevOpciones) => {
            const updatedOpciones = prevOpciones.map((opcion, opcionIndex) => {
                if (opcionIndex === index) {
                return {
                    ...opcion,
                    seccionValue: selectedValue,
                };
                }
                return opcion;
            });
            return updatedOpciones;
        });
    };
      
    const handlePreguntaChange = (index, event) => {
        const selectedValue = event.target.value;
        setOpcionesRespuesta((prevOpciones) => {
            const updatedOpciones = prevOpciones.map((opcion, opcionIndex) => {
                if (opcionIndex === index) {
                return {
                    ...opcion,
                    preguntaValue: selectedValue,
                };
                }
                return opcion;
            });
            return updatedOpciones;
        });
    };

    const handleGuardarValoracionEstrellas = () => {
        setMostrarResultado(true);
        onAceptarValoracionEstrellas();
        setMostrarContenedor(false);
    };

    const handleIconClick = (id) => {
        setShowColorPicker((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
    };
      
    const handleColorChange = (color, id) => {
        setSelectedColor((prevState) => ({
          ...prevState,
          [id]: color.hex,
        }));
    };
      
    const handleCloseColorPicker = (id) => {
        setShowColorPicker((prevState) => ({
          ...prevState,
          [id]: false,
        }));
    };
    
    const handleIconChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedIcono(selectedValue);
    };

    useEffect(() => {
        setMoreContendorLogica([true]);
    }, []);

    return (
    <>
        {mostrarContenedor && (
            <Container className='container-variacionEstrellas'>
                <Col className='seccion1-variacionEstrellas'>
                    <Col className={`editar-variacionEstrellas ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-variacionEstrellas ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>
                    
                    <Col className={`logica-variacionEstrellas ${isActiveLogica ? 'active' : 'inactive'}`} onClick={handleLogica}>
                        Lógica
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='variacionEstrellas-container-editar'>
                        <Col>
                            <select className='selectEditar'>
                                <option value="" selected disabled hidden>Variación por Estrella</option>
                                <option value="option1">Opción 1</option>
                                <option value="option2">Opción 2</option>
                                <option value="option3">Opción 3</option>
                            </select>
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>Pregunta {indice+1}</p>
                            <FormControl 
                                style={{ width: '94.2%', border: '1px solid #ccc' }} 
                                className= 'textoAgradecimiento' 
                                type="text"
                                value={pregunta}
                                placeholder="Escribe aquí..."
                                onChange={(e) => setPregunta(e.target.value)}
                            />
                        </Col>

                        <Col className='seccion3-variacionEstrellas-editar'>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId={`${indice}`}>
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {opcionesRespuesta.map((opcion, index) => {
                                                return (
                                                    <Draggable
                                                        key={opcion.id.toString()}
                                                        draggableId={opcion.id.toString()}
                                                        index={index}
                                                        
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Col className="seccion3-1-variacionEstrellas-editar">
                                                                    <p style={{ marginBottom: '1%', marginRight: '2%', cursor: 'default' }}>{index+1} estrella</p>

                                                                    <FormControl
                                                                        style={{ width: '37%', border: '1px solid #ccc' }}
                                                                        className="textoOpcionRespuesta"
                                                                        type="text"
                                                                        value={opcion.text}
                                                                        placeholder="Ingrese una estiqueta de valoración"
                                                                        onChange={(e) => handleOpcionTextChange(opcion.id, e.target.value)}
                                                                    />

                                                                    <select
                                                                        className="selectTipoGrafico"
                                                                        style={{ width: '20%' }}
                                                                        value={selectedIcon[opcion.id] || 'star'}
                                                                        onChange={(e) => handleIconChange(e, opcion.id)}
                                                                    >
                                                                        <option value="star">Estrella</option>
                                                                        <option value="square">Cuadrado</option>
                                                                        <option value="circle">Círculo</option>
                                                                        <option value="triangle">Triángulo</option>
                                                                    </select>

                                                                    <p style={{marginLeft: '2%'}}>Color</p>

                                                                    <span
                                                                        style={{
                                                                            marginLeft: '2%',
                                                                            cursor: 'pointer',
                                                                            marginTop: '0.8%',
                                                                            fill: selectedColor[opcion.id],
                                                                            color: selectedColor[opcion.id],
                                                                        }}
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                            selectedIcon[opcion.id] === 'square'
                                                                                ? squareFillSVG
                                                                                : selectedIcon[opcion.id] === 'circle'
                                                                                ? circleFillSVG
                                                                                : selectedIcon[opcion.id] === 'triangle'
                                                                                ? triangleFillSVG
                                                                                : starFillSVG,
                                                                        }}
                                                                        onClick={() => handleIconClick(opcion.id)}
                                                                        value={opcion.icono}
                                                                    />

                                                                    {showColorPicker[opcion.id] && (
                                                                        <div style={{ position: 'absolute', zIndex: '2', right: '20%', marginTop: '-3%' }}>
                                                                            <SketchPicker
                                                                                color={selectedColor[opcion.id]}
                                                                                onChange={(color) => handleColorChange(color, opcion.id)}
                                                                                onChangeComplete={() => handleCloseColorPicker(opcion.id)}
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    {usarPonderacion && (
                                                                        inputs.map((inputNum, index) => (
                                                                            <input
                                                                                className="numeracionRespuesta"
                                                                                style={{ width: '2.2%', textAlign: 'center', height: '2%', marginTop: '1.2%' }}
                                                                                key={inputNum}
                                                                                // placeholder={index + 1}
                                                                                type="text"
                                                                            />
                                                                        ))
                                                                    )}

                                                                    <span
                                                                        style={{ marginTop: '2%', marginLeft: '2%', cursor: 'pointer' }}
                                                                        dangerouslySetInnerHTML={{ __html: minusCircleSVG }}
                                                                        onClick={() => handleDeleteOpcion(opcion.id)}
                                                                    />
                                                                </Col>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            <Col >
                                <span 
                                    style={{ marginTop: '1.3%', cursor: 'pointer' }} 
                                    dangerouslySetInnerHTML={{ __html: plushCircleSVG }} 
                                    onClick={handleMoreOpcion}
                                />
                            </Col>
                        </Col>

                        <Col className='seccion5-variacionEstrellas-editar'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchChange} checked={usarPonderacion} />
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Usar ponderación</p>
                        </Col>
                    </Container>
                )}

                {mostrarConfiguracion && (
                    <Container className='variacionEstrellas-container-configuracion'>
                        <Col className='seccion1-variacionEstrellas-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar1} checked={configuracion1}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la respuesta a esta pregunta sea obligatoria</p>
                        </Col>
                        {configuracion1 && (
                            <Col className='seccion1-1-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Mostrar este mensaje de error cuando no se responde a esta pregunta.</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." />
                            </Col>
                        )}

                        <Col className='seccion2-variacionEstrellas-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-variacionEstrellas-configuracion'>
                                <select className='selectConfigurar'>
                                    <option value="" selected disabled hidden>Seleccionar Pregunta</option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </Col>
                        )}
                        
                        <Col className='seccion4-variacionEstrellas-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar como opción de respuesta "Ninguna de las anteriores"</p>
                        </Col>
                        {configuracion4 && (
                            <Col className='seccion1-4-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" />
                            </Col>
                        )}

                        <Col className='seccion5-variacionEstrellas-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar5} checked={configuracion5}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar "otra" como opción de respuesta para comentarios</p>
                        </Col>
                        {configuracion5 && (
                            <Col className='seccion1-5-variacionEstrellas-configuracion'>
                                <Col>
                                    <p style={{margin: 'unset' }}>Etiqueta</p>
                                    <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Otro (especifique)" />
                                </Col>
                                <Col className='seccion1-5-2-variacionEstrellas-configuracion'>
                                    <Col style={{ width: '55%' }}>
                                        <Col>
                                            <p className='configurarTamaño'>Tamaño</p>
                                        </Col>
                                        <Col className='contenedorConfigurarTamaño'>
                                            <select className='selectConfigurarTamaño1'>
                                                <option value="" selected disabled hidden>Una sola linea de texto</option>
                                                <option value="option1">Opción 1</option>
                                                <option value="option2">Opción 2</option>
                                                <option value="option3">Opción 3</option>
                                            </select>

                                            <select className='selectConfigurarTamaño2'>
                                                <option value="" selected disabled hidden>50 caracteres</option>
                                                <option value="option1">Opción 1</option>
                                                <option value="option2">Opción 2</option>
                                                <option value="option3">Opción 3</option>
                                            </select>
                                        </Col>
                                    </Col>
                                    <Col style={{ width: '41.12%', marginLeft: '2%' }}>
                                        <p className='configurarValidacion'>Validación</p>

                                        <select className='selectConfigurarValidacion'>
                                            <option value="" selected disabled hidden>No validar esta respuesta</option>
                                            <option value="option1">Opción 1</option>
                                            <option value="option2">Opción 2</option>
                                            <option value="option3">Opción 3</option>
                                        </select>
                                    </Col>
                                </Col>
                            </Col>
                        )}
                    </Container>
                )}

                {mostrarLogica && (
                    <Container className='variacionEstrellas-container-logica'>
                        <Col className='seccion1-variacionEstrellas-logica'>
                            <p style={{margin: 'unset'}}>Si la respuesta es...</p>
                            <p style={{margin: 'unset', marginLeft: '6%'}}>Entonces pasar a...</p>
                        </Col>
                        <div>
                        {moreContendorLogica.map((mostrar, index) => mostrar && (
                            <div key={index}>
                                <Col className='seccion2-variacionEstrellas-logica'>
                                    {opcionesRespuesta.map((opcion, opcionIndex) => (
                                        opcionIndex === index && (
                                            <div key={opcion.id} style={{ width: '29%' }}>
                                                <p style={{ margin: 'unset', width: '20%' }}>{opcion.text}</p>
                                            </div>
                                        )
                                    ))}

                                    {opcionesRespuesta.map((opcion, opcionIndex) => (
                                        opcionIndex === index && (
                                            <Col style={{ width: '100%' }}>
                                                <div key={opcion.id}></div>
                                                    <select
                                                        className='select1Logica1'
                                                        value={opcion.seccionValue}
                                                        onChange={(event) => handleSeccionChange(opcionIndex, event)}
                                                    >
                                                        <option value='' disabled hidden>Seleccionar Sección</option>
                                                        <option value='option1'>Sección 1</option>
                                                        <option value='option2'>Sección 2</option>
                                                        <option value='option3'>Sección 3</option>
                                                    </select>

                                                    <select
                                                        className='select1Logica2'
                                                        value={opcion.preguntaValue}
                                                        onChange={(event) => handlePreguntaChange(index, event)}
                                                    >
                                                        <option value='' disabled hidden>Seleccionar Pregunta</option>
                                                        <option value='option1'>Pregunta 1</option>
                                                        <option value='option2'>Pregunta 2</option>
                                                        <option value='option3'>Pregunta 3</option>
                                                    </select>

                                                    <Button className='borrarLogica'>
                                                        <span
                                                            style={{ marginTop: '1.3%', cursor: 'pointer' }}
                                                            dangerouslySetInnerHTML={{ __html: trashSVG }}
                                                            onClick={() => handleClearOpcion(index)}
                                                        />
                                                    </Button>
                                            </Col>
                                        )
                                    ))}
                                </Col>
                            </div>
                            ))}
                        </div>
                    </Container> 
                )}

                <Col className='seccion6-variacionEstrellas'>
                    <Button 
                        className='cancelarvariacionEstrellas' 
                        // onClick={handleCancelarOpcionMultiple}
                    >
                        Cancelar
                    </Button>
                        
                    <Button className='guardarvariacionEstrellas' onClick={handleGuardarValoracionEstrellas}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}
        
        {mostrarResultado && (
            <Container>
                <ResultadoValoracionEstrellas
                index={indice}
                pregunta={pregunta}
                opciones={opcionesRespuesta.map((opcion) => ({
                    ...opcion,
                    icono: opcion.icono,
                }))}
                color={selectedColor}
                selectedIcon={selectedIcon}
                />
            </Container>
        )}
    </>
  )
}

export default VariacionEstrellas
