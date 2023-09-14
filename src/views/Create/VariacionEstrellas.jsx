import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import '../../styles/variacionEstrellas.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SketchPicker } from 'react-color';
import ResultadoValoracionEstrellas from './ResultadoValoracionEstrellas';
import { ListarTipoPregunta } from '../../services/PreguntaServices';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListarEnumeradosService } from '../../services/EnumeradosServices';

const minusCircleSVG = svgManager.getSVG('minus-circle');
const plushCircleSVG = svgManager.getSVG('plush-circle');
const trashSVG = svgManager.getSVG('trash-mini');
const starFillSVG = svgManager.getSVG('star-fill');
const squareFillSVG = svgManager.getSVG('square-fill');
const circleFillSVG = svgManager.getSVG('circle-fill');
const triangleFillSVG = svgManager.getSVG('triangle-fill');

  const Pregunta = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Respuesta = styled(FormControl)`
    width: 37% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Ponderacion = styled.input`
    width: 2.2% !important;
    height: 2% !important;
    text-align: center !important;
    border: 1px solid #ccc !important;
    outline: none;
    margin-top: 1.2% !important;

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

const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '94%',
      marginLeft: '1.8%',
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
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const VariacionEstrellas = ({
    indice, 
    indiceSec, 
    save, 
    preguntas, 
    closeVariacionEstrellas, 
    onAceptarValoracionEstrellas, 
    handleEditarPregunta, 
    handleEliminarPregunta,
    handleCambiarPregunta,
    preguntaVisibleOpen,
    sendTamanoPaso2, 
    sendGrosorPaso2, 
    sendTipografiaPaso2,
    contenEstilos,
    sendColors,
    contentCont,
}) => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [mostrarLogica, setMostrarLogica] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isActiveLogica, setIsActiveLogica] = useState(true);
    const opcionesApi = preguntas.opcionesRespuesta ?? [];
    const [opcionesRespuesta, setOpcionesRespuesta] = useState(() =>
        opcionesApi.map((opcionApi) => ({
            idOpcionRespuesta: opcionApi.idOpcionRespuesta,
            respuesta: opcionApi.respuesta,
            checked: false,
            type: 'radio',
            seccionValue: '',
            preguntaValue: '',
            enumGrafico: opcionApi.enumGrafico,
            colorOpcion: opcionApi.colorOpcion,
            colorDefault: "#e0dcdc",
            selectedIcon: opcionApi.enumGrafico,
            selectedColor: "#e0dcdc",
        }))
    );
    const [opcionText, setOpcionText] = useState("");
    const [moreContendorLogica, setMoreContendorLogica] = useState([]);
    const [usarPonderacion, setUsarPonderacion] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion4, setConfiguracion4] = useState(false); 
    const [configuracion5, setConfiguracion5] = useState(false);
    const [configuracion6, setConfiguracion6] = useState(false);
    const [configuracion7, setConfiguracion7] = useState(false);
    const [configuraciongeneral, setConfiguraciongeneral] = useState(
        {
            esObligatoria: "N",
            mensajeEsObligatoria: "",
            ningunaAnteriores: "N",
            otraRespuesta: "N",
            etiquetaOtraRespuesta: "",
            enumTipoTexto: "",
            enumCantidadCaracteres: "",
            enumValidacion: "",
            informacionPregunta: "N",
            etiquetaInformacionPregunta: "'Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología'",
            bancoPregunta: "N",
            etiquetaBancoPregunta: ""
        }
    );
    const [ponderacion, setPonderacion] = useState("N");
    const [inputs, setInputs] = useState([]);
    const [pregunta, setPregunta] = useState(preguntas.pregunta);
    const [preguntaTemp, setPreguntaTemp] = useState(preguntas.pregunta);
    const [cancelar, setCancelar] = useState('true');
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [informacionPregunta, setInformacionPregunta] = useState('Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología')
    const [ningunaAnteriores, setNingunaAnteriores] = useState('Ninguna de las anteriores')
    const [otraRespuesta, setOtraRespuesta] = useState('Otra respuesta');
    const [selectedTipoPregunta, setSelectedTipoPregunta] = useState(null);
    const containerColor = useRef(null);
    const todasLasPreguntasConPosicion = [];
    const [posicionContentCont, setPosicionContentCont] = useState(0);
    const [posicionPregunta, setPosicionPregunta] = useState(0);

     // Utiliza el método map para recorrer el arreglo contentCont y capturar su posición
     contentCont.map((item, indexContentCont) => {
        // Verifica si el objeto actual tiene un atributo "preguntas"
        if (item.preguntas && Array.isArray(item.preguntas)) {
            // Utiliza otro bucle para recorrer el arreglo de preguntas dentro del objeto y capturar su posición
            item.preguntas.map((pregunta, indexPregunta) => {
                
            // Verifica si el objeto de pregunta tiene un atributo "pregunta"
            if (pregunta.pregunta) {
                // Agrega la pregunta y sus posiciones al arreglo todasLasPreguntasConPosiciones
                todasLasPreguntasConPosicion.push({
                pregunta: pregunta.pregunta,
                posicionContentCont: indexContentCont,
                posicionPregunta: indexPregunta,
                });
            }
            });
        }
        });


    const handleEditar = () => {
        setMostrarEditar(!mostrarEditar);
        setMostrarConfiguracion(false);
        setMostrarLogica(false);
        setIsActiveEditar(false)
        setIsActiveConfiguracion(true);
        setIsActiveLogica(true);
        if (mostrarEditar === true) {
            setMostrarEditar(mostrarEditar)
        }
    };

    const handleConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
        setMostrarEditar(false);
        setMostrarLogica(false);
        setIsActiveConfiguracion(false)
        setIsActiveEditar(true);
        setIsActiveLogica(true);
        if (mostrarConfiguracion === true) {
            setMostrarConfiguracion(mostrarConfiguracion)
        }
    };

    const handleLogica = () => {
        setMostrarLogica(!mostrarLogica);
        setMostrarEditar(false);
        setMostrarConfiguracion(false);
        setIsActiveLogica(false);
        setIsActiveEditar(true);
        setIsActiveConfiguracion(true);
        if (mostrarLogica === true) {
            setMostrarLogica(mostrarLogica)
        }
    };

    const handleMoreOpcion = () => {
        const newOpcion = {
            idOpcionRespuesta: opcionesRespuesta.length + 1,
            checked: false,
            respuesta: "",
            type: 'radio',
            seccionValue: '',
            preguntaValue: '',
            enumGrafico: '',
            colorOpcion: "#e0dcdc",
            colorDefault: "#e0dcdc",
            selectedIcon: 'star',
            selectedColor: "#e0dcdc",
        };

        setOpcionesRespuesta((prevOpciones) => [...prevOpciones, newOpcion]);
        setMoreContendorLogica((prevLogica) => [...prevLogica, true]);
    };

    const handleOpcionTextChange = (idOpcionRespuesta, newText) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, respuesta: newText } : opcion
          )
        );
    };
    
    const handleDeleteOpcion = (idOpcionRespuesta) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.filter((opcion) => opcion.idOpcionRespuesta !== idOpcionRespuesta)
        );
    };

    const handleSwitchChange = () => {
        setUsarPonderacion(!usarPonderacion);

        if (!usarPonderacion) {
            setInputs([1]);
          } else {
            setInputs([]);
          }
        setPonderacion(!usarPonderacion ? "S" : "N");
    };

    const handleSwitchConfigurar1 = () => {
        setConfiguracion1(!configuracion1);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                esObligatoria: !configuracion1 ? "S" : "N",
            };
        });
    };

    const handleEsOBligatoriaMensaje = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                mensajeEsObligatoria: selectedValue,
            };
        }
        );
    };

    const handleSwitchConfigurar2 = () => {
        setConfiguracion2(!configuracion2);
    };
    
    useEffect(() => {
        // Verificar si alguna respuesta contiene "Ninguna de las anteriores" o "Otra respuesta"

        const contieneNingunaAnteriores = opcionesRespuesta.some(
            (opcion) => opcion.respuesta === 'Ninguna de las anteriores'
        );
        const contieneOtraRespuesta = opcionesRespuesta.some(
            (opcion) => opcion.respuesta === 'Otra respuesta'
        );
        // Actualizar los interruptores de configuración en consecuencia
        // setConfiguracion4(contieneNingunaAnteriores);
        // setConfiguracion5(contieneOtraRespuesta);
    }, [opcionesRespuesta]);

    const handleSwitchConfigurar4 = () => {
        // Invierte el valor de configuracion4
        setConfiguracion4(!configuracion4);
        // Actualiza las opciones de respuesta
        setOpcionesRespuesta((prevOpcionesRespuesta) => {
            // Filtra las opciones de respuesta que no contienen 'Ninguna de las anteriores'
            const nuevasOpciones = prevOpcionesRespuesta.filter(
                (opcion) => opcion.respuesta !== 'Ninguna de las anteriores'
            );
        
            return nuevasOpciones;
        });
      
        // Actualiza el estado de configuraciongeneral según el valor de configuracion4
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                ningunaAnteriores: configuracion4 ? 'S' : 'N',
            };
        });
    };
    
    const handleSwitchConfigurar5 = () => {
        // Invierte el valor de configuracion4
        setConfiguracion5(!configuracion5);
      
        // Actualiza las opciones de respuesta
        setOpcionesRespuesta((prevOpcionesRespuesta) => {
            // Filtra las opciones de respuesta que no contienen 'Ninguna de las anteriores'
            const nuevasOpciones = prevOpcionesRespuesta.filter(
                (opcion) => opcion.respuesta !== 'Otra respuesta'
            );
        
            return nuevasOpciones;
        });
      
        // Actualiza el estado de configuraciongeneral según el valor de configuracion4
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                ningunaAnteriores: configuracion4 ? 'S' : 'N',
            };
        });
    };

    const handleOtraOpcionRespuesta = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                etiquetaOtraRespuesta: selectedValue,
            };
        }
        );
    };

    const handleenumTipoTexto = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                enumTipoTexto: selectedValue,
            };
        });
    };

    const handleenumCantidadCaracteres = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                enumCantidadCaracteres: selectedValue,
            };
        });
    };

    const handleenumValidacion = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                enumValidacion: selectedValue,
            };
        });
    };

    const handleSwitchConfigurar6 = () => {
        setConfiguracion6(!configuracion6);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                informacionPregunta: !configuracion6 ? "S" : "N",
            };
        });
    };

    const handleInformacionPregunta = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                etiquetaInformacionPregunta: selectedValue,
            };
        });
    };

    const handleSwitchConfigurar7 = () => {
        setConfiguracion7(!configuracion7);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                bancoPregunta: !configuracion7 ? "S" : "N",
            };
        });
    };

    const handleBancoPregunta = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                etiquetaBancoPregunta: selectedValue,
            };
        });
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
            const updatedOpciones = prevOpciones.filter((_, opcionIndex) => opcionIndex !== index);
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

    const handleCancelarVariacionEstrellas = () => {
        setPregunta(preguntaTemp)
        closeVariacionEstrellas(indice, indiceSec);
    };

    const handleEliminarVariacionEstrellas = () => {
        handleEliminarPregunta(indice, indiceSec)
    };

    const handleGuardarValoracionEstrellas = () => {
        console.log(opcionesRespuesta)
        if (validacionConfiguracion1() === false) return;
        if (validacionConfiguracion4() === false) return;
        if (validacionConfiguracion5() === false) return;


        if (!validacionEstrella()) {
            return;
        }
        setPreguntaTemp(pregunta)
        onAceptarValoracionEstrellas(indice, indiceSec, pregunta, opcionesRespuesta, cancelar,configuraciongeneral,ponderacion);
    };

    const validacionEstrella = () => {
        if (pregunta === '' || opcionesRespuesta.length < 2) {
            toast.error('La pregunta debe tener al menos 2 opciones de respuesta');
            return false;
        }
    
        // Verificar que todas las opciones tengan la propiedad 'respuesta' no vacía
        const todasTienenRespuestaNoVacia = opcionesRespuesta.every(opcion => opcion.respuesta !== '');
    
        if (!todasTienenRespuestaNoVacia) {
            toast.error('Todas las opciones de respuesta deben tener una respuesta', { autoClose: 1000 });
            return false;
        }
    
        return true;
    }
    
    const validacionConfiguracion1 = () => {
        if (configuracion1 === true && configuraciongeneral.mensajeEsObligatoria === '') {
            toast.error('Debe ingresar un mensaje de error');
            return false;
        }
        return true;
    }

    const validacionConfiguracion4 = () => {    
        if (configuracion4 === true && configuraciongeneral.etiquetaOtraRespuesta === '') {
            toast.error('Debe ingresar una etiqueta para la opción "Ninguna de las anteriores"');
            return false;
        }
        return true;
    }

    const validacionConfiguracion5 = () => {
        console.log(configuracion5)
        if (configuracion5) 
        {
            console.log('si entra a configuracion 5')   
            if (configuraciongeneral.etiquetaOtraRespuesta === '' || configuraciongeneral.enumTipoTexto === '' 
            || configuraciongeneral.enumCantidadCaracteres === '' || configuraciongeneral.enumValidacion === '') { 
                
                toast.error('Debe llenar todos los campos de la configuracion Agregar "otra"', { autoClose: 1000 });
                return false;
            } 
        }
    };


    


    const handleIconClick = (idOpcionRespuesta) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta
              ? { ...opcion, showColorPicker: !opcion.showColorPicker }
              : opcion
          )
        );
    };
      
    const handleColorChange = (color, idOpcionRespuesta) => {
        setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((opcion) =>
                opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, colorOpcion: color.hex } : opcion
            )
        );
    };
      
    const handleCloseColorPicker = (idOpcionRespuesta) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, showColorPicker: false } : opcion
          )
        );
    };

    const handleIconChange = (idOpcionRespuesta, newIcon) => {

        console.log(newIcon)
        const EnumGrafico = newIcon === 'square' ? 13 : newIcon === 'circle' ? 14 : newIcon === 'triangle' ? 40 : newIcon === 'star' ? 12 : 0
        console.log(EnumGrafico)
        setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, selectedIcon: newIcon, enumGrafico: EnumGrafico } : opcion
        ));
    };

    useEffect(() => {
        setMoreContendorLogica([true]);
    }, []);

    useEffect(() => {
        setPreguntaTemp(preguntas.pregunta)
        setPregunta(preguntas.pregunta)
        const nuevasOpcionesRespuesta = preguntas.opcionesRespuesta?.map((opcionApi) => ({
            idOpcionRespuesta: opcionApi.idOpcionRespuesta,
            respuesta: opcionApi.respuesta,
            checked: opcionApi.checked,
            type: opcionApi.type,
            seccionValue: opcionApi.seccionValue,
            preguntaValue: opcionApi.preguntaValue,
            enumGrafico: opcionApi.enumGrafico,
            colorOpcion: opcionApi.colorOpcion,
            colorDefault: opcionApi.colorDefault,
            selectedIcon: opcionApi.enumGrafico,
            selectedColor: opcionApi.selectedColor,
        })) ?? [];
        setOpcionesRespuesta(nuevasOpcionesRespuesta);
    }, [contentCont, preguntas.pregunta, preguntas.opcionesRespuesta]);

    const listarTipoPregunta = async () => {
        try {
            const response = await ListarTipoPregunta();
            setTipoPregunta(response.data.listTipoPreguntas);
            const defaultTipo = response.data.listTipoPreguntas.find((item) => item.idTipoPregunta === 2);
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
        if (!preguntas.requerida) { // Condición para verificar si la respuesta está vacía
            handleMoreOpcion();
        }
        listarEnumeradosVigencia()
    }, [preguntas.respuesta])

    const handlePregunta = (value) => {
        handleCambiarPregunta(indice, indiceSec, value)
    };

    const [tipoIcono, setTipoIcono] = useState()
    const listarEnumeradosVigencia = async () => {
        try {
            const response = await ListarEnumeradosService('', 6);
             
            setTipoIcono(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };

    const handleComplemetaria = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        setPosicionContentCont(selectedValue.posicionContentCont);
        setPosicionPregunta(selectedValue.posicionPregunta);
      
      };

    return (
    <>
        <ToastContainer />
        {!save && (
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
                            <Select
                                styles={customStyles}
                                className='selectEditar_VE'
                                onChange={(selectedOption) => handlePregunta(selectedOption.value)}
                                options={tipoPregunta.map((item) => ({
                                    value: item.tipo,
                                    label: item.descripcion,
                                }))}
                                value={selectedTipoPregunta}
                            />
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>Pregunta {indice+1}</p>
                            <Pregunta 
                                className= 'textoAgradecimiento' 
                                type="text"
                                value={pregunta}
                                placeholder="Escribe aquí..."
                                onChange={(e) => setPregunta(e.target.value)}
                            />
                        </Col>

                        <Col className='seccion3-variacionEstrellas-editar'>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                {opcionesRespuesta
                                    .filter((opcion) => opcion.respuesta !== 'Ninguna de las anteriores' && opcion.respuesta !== 'Otra respuesta')
                                    .map((opcion, index) => {
                                        const droppableId = `opcion-${opcion.idOpcionRespuesta ? opcion.idOpcionRespuesta.toString() : index}`;
                                        const draggableId = `draggable-${opcion.idOpcionRespuesta ? opcion.idOpcionRespuesta.toString() : index}`;
                                        return (
                                            <Droppable droppableId={droppableId} key={droppableId}>
                                                {(provided) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        <Draggable
                                                            key={draggableId}
                                                            draggableId={draggableId}
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

                                                                        <Respuesta
                                                                            className="textoOpcionRespuesta"
                                                                            type="text"
                                                                            value={opcion.respuesta}
                                                                            placeholder="Ingrese una estiqueta de valoración"
                                                                            onChange={(e) => handleOpcionTextChange(opcion.idOpcionRespuesta, e.target.value)}
                                                                        />

                                                                        <select
                                                                            className="selectTipoGrafico"
                                                                            style={{ width: '20%' }}
                                                                            value={opcion.selectedIcon}
                                                                            onChange={(e) => handleIconChange(opcion.idOpcionRespuesta, e.target.value)}
                                                                        >
                                                                            {tipoIcono?.map((enumGrafico) => (
                                                                                <option key={enumGrafico.id} value={enumGrafico.etiqueta}>
                                                                                    {enumGrafico.descripcion}
                                                                                </option>
                                                                            ))}
                                                                        </select>

                                                                        <p style={{marginLeft: '2%'}}>Color</p>

                                                                        <span
                                                                            style={{
                                                                                marginLeft: '2%',
                                                                                cursor: 'pointer',
                                                                                marginTop: '0.8%',
                                                                                fill: opcion.colorOpcion,
                                                                                color: opcion.colorOpcion,
                                                                            }}
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    opcion.selectedIcon === 'square' ? squareFillSVG
                                                                                    : opcion.selectedIcon === 'circle' ? circleFillSVG
                                                                                    : opcion.selectedIcon === 'triangle' ? triangleFillSVG
                                                                                    : starFillSVG,
                                                                            }}
                                                                            onClick={() => handleIconClick(opcion.idOpcionRespuesta)}
                                                                            value={opcion.enumGrafico}
                                                                        />

                                                                        {opcion.showColorPicker && (
                                                                            <div
                                                                                ref={containerColor}
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    zIndex: 1000,
                                                                                    right: '20%',
                                                                                    marginTop: '-3%',
                                                                                }}
                                                                            >
                                                                                <SketchPicker
                                                                                    color={opcion.colorOpcion}
                                                                                    onChange={(color) => handleColorChange(color, opcion.idOpcionRespuesta)}
                                                                                />
                                                                                <button 
                                                                                    style={{marginTop: '2px', padding: '5px 10px', cursor: 'pointer'}}
                                                                                    onClick={() => handleCloseColorPicker(opcion.idOpcionRespuesta)}
                                                                                >
                                                                                    Cerrar
                                                                                </button>
                                                                            </div>
                                                                        )}

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
                                                                            style={{ marginTop: '2%', marginLeft: '2%', cursor: 'pointer' }}
                                                                            dangerouslySetInnerHTML={{ __html: minusCircleSVG }}
                                                                            onClick={() => handleDeleteOpcion(opcion.idOpcionRespuesta)}
                                                                        />
                                                                    </Col>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        );
                                    })}
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
                            <label className="switch">
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
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar1} checked={configuracion1}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la respuesta a esta pregunta sea obligatoria</p>
                        </Col>
                        {configuracion1 && (
                            <Col className='seccion1-1-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Mostrar este mensaje de error cuando no se responde a esta pregunta.</p>
                                <MensajeError 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..." 
                                    onChange={handleEsOBligatoriaMensaje} 
                                />
                            </Col>
                        )}

                        <Col className='seccion2-variacionEstrellas-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-variacionEstrellas-configuracion'>
                                <select className='selectConfigurar' onChange={handleComplemetaria} value={posicionContentCont}>
                                   <option value="" selected disabled hidden>Seleccionar Pregunta</option>
                                    {todasLasPreguntasConPosicion.map((pregunta, index) => (
                                        <option key={index} value={JSON.stringify(pregunta)}>
                                        {pregunta.pregunta}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        )}
                        
                        <Col className='seccion4-variacionEstrellas-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar como opción de respuesta "Ninguna de las anteriores"</p>
                        </Col>
                        {configuracion4 && (
                            <Col className='seccion1-4-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <Etiqueta 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    defaultValue={ningunaAnteriores}
                                    
                                />
                            </Col>
                        )}

                        <Col className='seccion5-variacionEstrellas-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar5} checked={configuracion5}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar "otra" como opción de respuesta para comentarios</p>
                        </Col>
                        {configuracion5 && (
                            <Col className='seccion1-5-variacionEstrellas-configuracion'>
                                <Col>
                                    <p style={{margin: 'unset' }}>Etiqueta</p>
                                    <Etiqueta2 
                                        className= 'textoConfiguracion1' 
                                        type="text" 
                                        placeholder="Otro (especifique)" 
                                        value={otraRespuesta}
                                        onChange={handleOtraOpcionRespuesta}
                                        readOnly
                                    />
                                </Col>
                                <Col className='seccion1-5-2-variacionEstrellas-configuracion'>
                                    <Col style={{ width: '55%' }}>
                                        <Col>
                                            <p className='configurarTamaño'>Tamaño</p>
                                        </Col>
                                        <Col className='contenedorConfigurarTamaño'>
                                            <select className='selectConfigurarTamaño1' onChange={handleenumTipoTexto}>
                                                <option value="" selected disabled hidden>Seleccione</option>
                                                <option value="6">Una sola linea</option>
                                                <option value="7">Multiple lineas</option>
                                            </select>

                                            <select className='selectConfigurarTamaño2' onChange={handleenumCantidadCaracteres}>
                                                <option value="" selected disabled hidden>Seleccione</option>
                                                <option value="8">10 caracteres</option>
                                                <option value="9">20 caracteres</option>
                                                <option value="10">30 caracteres</option>
                                            </select>
                                        </Col>
                                    </Col>
                                    <Col style={{ width: '41.12%', marginLeft: '2%' }}>
                                        <p className='configurarValidacion'>Validación</p>

                                        <select className='selectConfigurarValidacion' onChange={handleenumValidacion}>
                                            <option value="" selected disabled hidden>Seleccione</option>
                                            <option value="11">No validar esta respuesta</option>
                                        </select>
                                    </Col>
                                </Col>
                            </Col>
                        )}

                        <Col className='seccion1-variacionEstrellas-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar6} checked={configuracion6}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar información sobre la pregunta</p>
                        </Col>
                        {configuracion6 && (
                            <Col className='seccion1-1-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Información sobre pregunta</p>
                                <Informacion 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..." 
                                    value={configuraciongeneral.etiquetaInformacionPregunta}
                                    onChange={handleInformacionPregunta}
                                />
                            </Col>
                        )}

                        <Col className='seccion1-variacionEstrellas-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar7} checked={configuracion7}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Alimentar a banco de preguntas</p>
                        </Col>
                        {configuracion7 && (
                            <Col className='seccion1-1-variacionEstrellas-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <AlimentarBancoPreguntas 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..."
                                    onChange={handleBancoPregunta}
                                />
                                <p style={{margin: 'unset', color:'rgba(158, 158, 158, 1)', marginRight:'2%' }}>Crea un banco de preguntas del equipo para guardar y volver a seleccionar rápidamente las preguntas que más usa tu equipo</p>
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
                                            opcion.respuesta !== 'Ninguna de las anteriores' &&
                                            opcion.respuesta !== 'Otra respuesta' && (
                                                opcionIndex === index && (
                                                    <div key={opcion.idOpcionRespuesta} style={{ width: '29%' }}>
                                                        <p style={{ margin: 'unset', width: '20%' }}>{opcion.respuesta}</p>
                                                    </div>
                                                )
                                            )
                                        ))}

                                        {opcionesRespuesta.map((opcion, opcionIndex) => (
                                            opcionIndex === index && (
                                                <Col style={{ width: '100%' }}>
                                                    <div key={opcion.idOpcionRespuesta}></div>
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
                    <Button className='cancelarvariacionEstrellas' onClick={handleCancelarVariacionEstrellas}>
                        Cancelar
                    </Button>
                        
                    <Button className='guardarvariacionEstrellas' onClick={handleGuardarValoracionEstrellas}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}
        
        {save && (
            <Container>
                <ResultadoValoracionEstrellas
                    index={indice}
                    indexSec={indiceSec}
                    pregunta={pregunta}
                    opciones={opcionesRespuesta}
                    handleEditarPregunta={handleEditarPregunta}
                    closeEliminarCPVE={handleEliminarVariacionEstrellas}
                    informacion = {informacionPregunta}
                    configuracion4Activa={configuracion4}
                    configuracion5Activa={configuracion5}
                    configuracion6Activa={configuracion6}
                    preguntaVisibleC={preguntaVisibleOpen}
                    sendTamanoPaso2={sendTamanoPaso2}
                    sendGrosorPaso2={sendGrosorPaso2}
                    sendTipografiaPaso2={sendTipografiaPaso2}
                    contenEstilos={contenEstilos}
                    sendColors={sendColors}
                    starFillSVG={starFillSVG}
                    squareFillSVG={squareFillSVG}
                    circleFillSVG={circleFillSVG}
                    triangleFillSVG={triangleFillSVG}
                    preguntas={preguntas}
                />
            </Container>
        )}
    </>
  )
}

export default VariacionEstrellas
