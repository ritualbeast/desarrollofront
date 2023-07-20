import React, { useEffect, useState } from 'react'
import '../../styles/opcionMultiple.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResultadoOpcionMultiple from './ResultadoOpcionMultiple';

const minusCircleSVG = svgManager.getSVG('minus-circle');
const plushCircleSVG = svgManager.getSVG('plush-circle');
const trashSVG = svgManager.getSVG('trash-mini');

const OpcionMultiple = ({indice, indiceSec, save, contentPreg, closeopmul, onAceptar, handleCargaPreg, handleEditarPregunta}) => {
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
        }
    ]);
    const [opcionText, setOpcionText] = useState("");
    const [moreContendorLogica, setMoreContendorLogica] = useState([]);
    const [usarPonderacion, setUsarPonderacion] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion3, setConfiguracion3] = useState(false);
    const [configuracion4, setConfiguracion4] = useState(false); 
    const [configuracion5, setConfiguracion5] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [pregunta, setPregunta] = useState('');
    const [seccion, setSeccion] = useState({
        tipo: 'CPM',
        contentPreg: [] // Agrega tu array de preguntas aquí
    });

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
            seccionValue: '', // Valor inicial de la sección
            preguntaValue: '', // Valor inicial de la pregunta
        };

        setOpcionesRespuesta((prevOpciones) => [...prevOpciones, newOpcion]);
        setOpcionText("");
        setMoreContendorLogica((prevLogica) => [...prevLogica, true]);
    };

    const handleOpcionChange = (id, value, checked) => {
        setOpcionText(value);

        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((opcion) =>
            opcion.id === id 
                ? { ...opcion, checked: !opcion.checked } // Cambiar el estado checked de la opción actual
                : opcion.type === 'checkbox' // Verificar si es un checkbox
                ? opcion // Mantener el estado de los otros checkboxes
                : { ...opcion, checked: false } // Desmarcar las opciones de tipo radio
            )
        );
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

    const handleSwitchConfigurar3 = () => {
        setConfiguracion3(!configuracion3);
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) => ({
            ...opcion,
            type: configuracion3 ? 'checkbox' : 'radio',
          }))
        );
    };            

    const handleSwitchConfigurar4 = () => {
        setConfiguracion4(!configuracion4);
    };

    const handleSwitchConfigurar5 = () => {
        setConfiguracion5(!configuracion5);
    };

    const handleDragEnd = (result) => {
        console.log('DragDropContext result:', result);
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

    const handleCancelarOpcionMultiple = (indice) => {
        closeopmul(indice);
    }
    
    const handleGuardarOpcionMultiple = () => {
        const nuevaPregunta = {
            tipo: 'CPM',
            pregunta: pregunta,
            save: true
        };
        onAceptar(indice, indiceSec, pregunta, opcionesRespuesta);
    };

    useEffect(() => {
        setMoreContendorLogica([true]);
    }, []);

    return (
    <>
        {!save && (
            <Container className='container-opcionMultiple'>
                <Col className='seccion1-opcionMultiple'>
                    <Col className={`editar-opcionMultiple ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-opcionMultiple ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>
                    
                    <Col className={`logica-opcionMultiple ${isActiveLogica ? 'active' : 'inactive'}`} onClick={handleLogica}>
                        Lógica
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='opcionMultiple-container-editar'>
                        <Col>
                            <select className='selectEditar'>
                                <option value="" selected disabled hidden>Opcion multiple</option>
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

                        <Col className='seccion3-opcionMultiple-editar'>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId={`drop_${indiceSec+1}_${indice+1}`}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                                                <Col className="seccion3-1-opcionMultiple-editar">
                                                                    <label className={`custom-checkbox ${opcion.type === 'radio' ? 'custom-radio' : ''}`}>
                                                                        <input
                                                                            type={opcion.type}
                                                                            style={{ width: '100%', height: '100%' }}
                                                                            checked={opcion.checked}
                                                                            onChange={() => handleOpcionChange(opcion.id)}
                                                                        />
                                                                        <span class="checkmark"></span>
                                                                    </label>

                                                                    <FormControl
                                                                        style={{ width: '79.5%', border: '1px solid #ccc' }}
                                                                        className="textoOpcionRespuesta"
                                                                        type="text"
                                                                        value={opcion.text}
                                                                        placeholder="Ingrese una opción de respuesta"
                                                                        onChange={(e) => handleOpcionTextChange(opcion.id, e.target.value)}
                                                                    />

                                                                    {usarPonderacion && (
                                                                        inputs.map((inputNum, index) => (
                                                                            <input
                                                                                className="numeracionRespuesta"
                                                                                style={{ width: '2.5%', textAlign: 'center' }}
                                                                                key={inputNum}
                                                                                type="text"
                                                                            />
                                                                        ))
                                                                    )}

                                                                    <span
                                                                        style={{ marginTop: '1.3%', marginLeft: '2%', cursor: 'pointer' }}
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

                        <Col className='seccion5-opcionMultiple-editar'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchChange} checked={usarPonderacion} />
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Usar ponderación</p>
                        </Col>
                    </Container>
                )}

                {mostrarConfiguracion && (
                    <Container className='opcionMultiple-container-configuracion'>
                        <Col className='seccion1-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar1} checked={configuracion1}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la respuesta a esta pregunta sea obligatoria</p>
                        </Col>
                        {configuracion1 && (
                            <Col className='seccion1-1-opcionMultiple-configuracion'>
                                <p style={{margin: 'unset' }}>Mostrar este mensaje de error cuando no se responde a esta pregunta.</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." />
                            </Col>
                        )}

                        <Col className='seccion2-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-opcionMultiple-configuracion'>
                                <select className='selectConfigurar'>
                                    <option value="" selected disabled hidden>Seleccionar Pregunta</option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </Col>
                        )}

                        <Col className='seccion3-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar3} checked={configuracion3}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la pregunta resiva multiples respuestas</p>
                        </Col>
                        
                        <Col className='seccion4-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar como opción de respuesta "Ninguna de las anteriores"</p>
                        </Col>
                        {configuracion4 && (
                            <Col className='seccion1-4-opcionMultiple-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" />
                            </Col>
                        )}

                        <Col className='seccion5-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar5} checked={configuracion5}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar "otra" como opción de respuesta para comentarios</p>
                        </Col>
                        {configuracion5 && (
                            <Col className='seccion1-5-opcionMultiple-configuracion'>
                                <Col>
                                    <p style={{margin: 'unset' }}>Etiqueta</p>
                                    <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Otro (especifique)" />
                                </Col>
                                <Col className='seccion1-5-2-opcionMultiple-configuracion'>
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
                    <Container className='opcionMultiple-container-logica'>
                        <Col className='seccion1-opcionMultiple-logica'>
                            <p style={{margin: 'unset'}}>Si la respuesta es...</p>
                            <p style={{margin: 'unset', marginLeft: '6%'}}>Entonces pasar a...</p>
                        </Col>
                        <div>
                            {moreContendorLogica.map((mostrar, index) => mostrar && (
                                <div key={index}>
                                    <Col className='seccion2-opcionMultiple-logica'>
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

                <Col className='seccion6-opcionMultiple'>
                    <Button className='cancelarOpcionMultiple' onClick={handleCancelarOpcionMultiple}>
                        Cancelar
                    </Button>
                        
                    <Button className='guardarOpcionMultiple' onClick={handleGuardarOpcionMultiple}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}

        {save && (
            <Container>
                <ResultadoOpcionMultiple 
                    index={indice}
                    indexSec={indiceSec}
                    pregunta={pregunta} 
                    opciones={opcionesRespuesta}
                    handleEditarPregunta={handleEditarPregunta}
                    closeEliminarCPM={handleCancelarOpcionMultiple}
                />
            </Container>
        )}
    </>
  )
}

export default OpcionMultiple
