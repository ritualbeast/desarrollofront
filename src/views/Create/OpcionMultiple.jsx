import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import '../../styles/opcionMultiple.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResultadoOpcionMultiple from './ResultadoOpcionMultiple';
import { ListarTipoPregunta } from '../../services/PreguntaServices';
import styled from 'styled-components';

const minusCircleSVG = svgManager.getSVG('minus-circle');
const plushCircleSVG = svgManager.getSVG('plush-circle');
const trashSVG = svgManager.getSVG('trash-mini');

const Pregunta = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Respuesta = styled(FormControl)`
    width: 79.5% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Ponderacion = styled.input`
    width: 2.5% !important;
    text-align: center !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const MensajeError = styled(FormControl)`
    width: 94% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Etiqueta = styled(FormControl)`
    width: 94% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Etiqueta2 = styled(FormControl)`
    width: 94% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Informacion = styled.textarea`
    width: 94%;
    border: 1px solid #ccc;
    outline: none;
    padding: 1%; 
    border-radius:4px;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const AlimentarBancoPreguntas = styled.textarea`
    width: 94%;
    border: 1px solid #ccc; 
    padding: 1%;
    border-radius: 4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const CustomCheckBox = styled.label`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.checked ? 'red' : 'white')}; /* Cambiar el color rojo aquí */
  margin-right: 5px;
  background-color: unset;
`;

const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  width: 16.5px;
  height: 16.5px;
  border: 2px solid rgba(194, 194, 194, 1);
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'white')};
  border:${(props) => (props.checked ? '2px solid rgba(255, 206, 72, 1)' : '2px solid rgba(194, 194, 194, 1)')};
  position: relative;
  margin-top: 3%;
  margin-left: 0.4%;
  margin-right: 2%;

  &:after {
    content: '${(props) => (props.checked ? '\u2713' : '')}';
    font-size: 14px;
    color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
    position: absolute;
    top: -2px;
    left: 3px;

  }
`;

const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledRadioButton = styled.div`
  display: inline-block;
  width: 16.5px;
  height: 16.5px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'rgba(194, 194, 194, 1)')};
  background-color: ${(props) => (props.checked ? 'white' : 'white')};
  position: relative;
  margin-top: 3%;
  margin-left: 0.4%;
  margin-right: 2%;

  &:before {
    content: '';
    display: ${(props) => (props.checked ? 'block' : 'none')};
    position: absolute;
    top: 2.3px;
    left: 2.3px;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'transparent')}; 
    cursor: pointer;
  }
`;

const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '96%'
    }),
    control: (provided, state) => ({
      ...provided,
      width:'102.5%',
      backgroundColor: 'white',
      color: 'black',
      borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 206, 72, 0.2)' : 'none',
      "&:hover": {
        borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const OpcionMultiple = ({
    indice, 
    indiceSec, 
    save, 
    contentPreg, 
    closeopmul, 
    onAceptar, 
    handleEditarPregunta, 
    handleEliminarPregunta,
    handleCambiarPregunta,
    preguntaVisibleOpen,
    sendTamanoPaso2, sendGrosorPaso2, sendTipografiaPaso2
}) => {
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
            type: 'radio',
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
    const [configuracion6, setConfiguracion6] = useState(false);
    const [configuracion7, setConfiguracion7] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [pregunta, setPregunta] = useState(contentPreg.pregunta);
    const [preguntaTemp, setPreguntaTemp] = useState(contentPreg.pregunta);
    const [cancelar, setCancelar] = useState('true');
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [informacionPregunta, setInformacionPregunta] = useState('Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología')
    const [selectedTipoPregunta, setSelectedTipoPregunta] = useState(null);
    
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
            type: 'radio',
            seccionValue: '', // Valor inicial de la sección
            preguntaValue: '', // Valor inicial de la pregunta
        };

        setOpcionesRespuesta((prevOpciones) => [...prevOpciones, newOpcion]);
        setOpcionText("");
        setMoreContendorLogica((prevLogica) => [...prevLogica, true]);
    };

    const handleOpcionChange = (id, value, checked, type) => {
        if (!configuracion3) {
          // Solo cambiamos el estado si el switch está en modo "radio"
          if (type === 'checkbox') {
            // Para checkbox, cambiamos el estado del checkbox actual, pero también deseleccionamos todos los demás
            setOpcionesRespuesta((prevOpciones) =>
              prevOpciones.map((opcion) =>
                opcion.id === id ? { ...opcion, checked: !checked } : { ...opcion, checked: false }
              )
            );
          } else if (type === 'radio') {
            // Para radio, deseleccionamos todas las opciones excepto la que se hizo clic
            setOpcionesRespuesta((prevOpciones) =>
              prevOpciones.map((opcion) =>
                opcion.id === id ? { ...opcion, checked: true } : { ...opcion, checked: false }
              )
            );
          }
        } else {
          // En modo "checkbox", simplemente cambiamos el estado del checkbox actual
          setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((opcion) =>
              opcion.id === id ? { ...opcion, checked: !checked } : opcion
            )
          );
        }
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
            type: configuracion3 ? 'radio' : 'checkbox',
            checked: configuracion3 ? false : opcion.checked,
          }))
        );
    };                  

    const handleSwitchConfigurar4 = () => {
        setConfiguracion4(!configuracion4);
    };

    const handleSwitchConfigurar5 = () => {
        setConfiguracion5(!configuracion5);
    };

    const handleSwitchConfigurar6 = () => {
        setConfiguracion6(!configuracion6);
    };

    const handleSwitchConfigurar7 = () => {
        setConfiguracion7(!configuracion7);
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

    const handleCancelarOpcionMultiple = () => {
        setPregunta(preguntaTemp)
        closeopmul(indice, indiceSec);
    }

    const handleEliminarOpcionMultiple = () => (
        handleEliminarPregunta(indice, indiceSec)
    )
    
    const handleGuardarOpcionMultiple = () => {
        setPreguntaTemp(pregunta)
        onAceptar(indice, indiceSec, pregunta, opcionesRespuesta, cancelar);
    };

    useEffect(() => {
        setMoreContendorLogica([true]);
    }, []);

    const listarTipoPregunta = async () => {
        try {
            const response = await ListarTipoPregunta();
            setTipoPregunta(response.data.listTipoPreguntas);
            const defaultTipo = response.data.listTipoPreguntas.find((item) => item.idTipoPregunta === 1);
            if (defaultTipo) {
                const data={
                    value: defaultTipo.idTipoPregunta,
                    label:defaultTipo.descripcion
                }
                setSelectedTipoPregunta(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        listarTipoPregunta();
    }, [])

    const handlePregunta = (value) => {
        handleCambiarPregunta(indice, indiceSec, value)
    }

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
                            <Select
                                styles={customStyles}
                                className='selectEditar_OM'
                                onChange={(selectedOption) => handlePregunta(selectedOption.value)}
                                options={tipoPregunta.map((item) => ({
                                    value: item.tipo,
                                    label: item.descripcion,
                                }))}
                                value={selectedTipoPregunta}
                            />
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2.2%', marginBottom: '1%', cursor: 'default' }}>Pregunta {indice+1}</p>
                            <Pregunta 
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
                                                                    <CustomCheckBox
                                                                        key={opcion.id}
                                                                        className={`custom-checkbox ${opcion.type === 'radio' ? 'custom-radio' : ''}`}
                                                                        checked={opcion.checked}
                                                                    >
                                                                        {opcion.type === 'checkbox' ? (
                                                                            <>
                                                                                <HiddenCheckBox
                                                                                    type="checkbox"
                                                                                    style={{ width: '100%', height: '100%' }}
                                                                                    checked={opcion.checked}
                                                                                    onChange={() => handleOpcionChange(opcion.id, opcion.text, opcion.checked, 'checkbox')}
                                                                                />
                                                                                <StyledCheckBox checked={opcion.checked} />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <HiddenRadioButton
                                                                                    type="radio"
                                                                                    style={{ width: '100%', height: '100%' }}
                                                                                    checked={opcion.checked}
                                                                                    onChange={() => handleOpcionChange(opcion.id, opcion.text, opcion.checked, 'radio')}
                                                                                />
                                                                                <StyledRadioButton checked={opcion.checked} />
                                                                            </>
                                                                        )}
                                                                        <span class="checkmark"></span>
                                                                    </CustomCheckBox>

                                                                    <Respuesta
                                                                        className="textoOpcionRespuesta"
                                                                        type="text"
                                                                        value={opcion.text}
                                                                        placeholder="Ingrese una opción de respuesta"
                                                                        onChange={(e) => handleOpcionTextChange(opcion.id, e.target.value)}
                                                                    />

                                                                    {usarPonderacion && (
                                                                        inputs.map((inputNum, index) => (
                                                                            <Ponderacion
                                                                                className="numeracionRespuesta"
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
                                <MensajeError 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..." 
                                />
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
                                <Etiqueta 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                />
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
                                    <Etiqueta2 
                                        className= 'textoConfiguracion1' 
                                        type="text" 
                                        placeholder="Otro (especifique)" 
                                    />
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

                        <Col className='seccion1-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar6} checked={configuracion6}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar información sobre la pregunta</p>
                        </Col>
                        {configuracion6 && (
                            <Col className='seccion1-1-opcionMultiple-configuracion'>
                                <p style={{margin: 'unset' }}>Información sobre pregunta</p>
                                <Informacion 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..." 
                                    value={informacionPregunta}
                                />
                            </Col>
                        )}

                        <Col className='seccion1-opcionMultiple-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar7} checked={configuracion7}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Alimentar a banco de preguntas</p>
                        </Col>
                        {configuracion7 && (
                            <Col className='seccion1-1-opcionMultiple-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <AlimentarBancoPreguntas 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..."
                                />
                                <p style={{margin: 'unset', color:'rgba(158, 158, 158, 1)', marginRight:'2%' }}>Crea un banco de preguntas del equipo para guardar y volver a seleccionar rápidamente las preguntas que más usa tu equipo</p>
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
                    closeEliminarCPM={handleEliminarOpcionMultiple}
                    informacion = {informacionPregunta}
                    configuracion6Activa={configuracion6}
                    preguntaVisibleC={preguntaVisibleOpen}
                    sendTamanoPaso2={sendTamanoPaso2}
                    sendGrosorPaso2={sendGrosorPaso2}
                    sendTipografiaPaso2={sendTipografiaPaso2}
                />
            </Container>
        )}
    </>
  )
}

export default OpcionMultiple
