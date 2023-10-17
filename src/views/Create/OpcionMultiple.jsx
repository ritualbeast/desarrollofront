import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import '../../styles/opcionMultiple.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResultadoOpcionMultiple from './ResultadoOpcionMultiple';
import { ListarTipoPregunta } from '../../services/PreguntaServices';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type } from '@testing-library/user-event/dist/type';

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
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const OpcionMultiple = ({
    indice, 
    indiceSec, 
    save, 
    preguntas, 
    closeopmul, 
    onAceptar, 
    onAceptarComplementaria,
    handleEditarPregunta, 
    handleEliminarPregunta,
    handleCambiarPregunta,
    preguntaVisibleOpen,
    sendTamanoPaso2, 
    sendGrosorPaso2, 
    sendTipografiaPaso2,
    contentCont,
    obtenerPreg, 
    contenEstilos,
    sendColors,
    complementariaValue,
    prueba,
    banderaComplementaria,
    indiceComplementaria,
    saveComplementaria, 
    
    
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
            seccionValue: '', // Valor inicial de la sección
            preguntaValue: '', // Valor inicial de la pregunta
            valor: '',
            orden : 0,
            nemonicoLogicaPregunta: '',
            logicaOpcionRespuesta: '',

        }))
    );
    const [opcionesRespuestaLogica, setOpcionesRespuestaLogica] = useState(() =>
        opcionesApi.map((opcionApi) => ({
            idOpcionRespuesta: opcionApi.idOpcionRespuesta,
            respuesta: opcionApi.respuesta,
            checked: false,
            type: 'radio',
            seccionValue: '', // Valor inicial de la sección
            preguntaValue: '', // Valor inicial de la pregunta
            valor: '',
            orden : 0,
            nemonicoLogicaPregunta: '',
            logicaOpcionRespuesta: '',
        }))
    );
    
    const complementarias = preguntas.preguntasComplementarias ?? [];
    const [opcionText, setOpcionText] = useState("");
    const [moreContendorLogica, setMoreContendorLogica] = useState([]);
    const [usarPonderacion, setUsarPonderacion] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(banderaComplementaria ? true : false);
    const [configuracion3, setConfiguracion3] = useState(false);
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
    const [multipleRespuesta, setMultipleRespuesta] = useState("S");
    const [ponderacion, setPonderacion] = useState("S");
    const [inputs, setInputs] = useState([]);
    const [pregunta, setPregunta] = useState(preguntas.pregunta);
    const [preguntaTemp, setPreguntaTemp] = useState(preguntas.pregunta);
    const [cancelar, setCancelar] = useState('true');
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [informacionPregunta, setInformacionPregunta] = useState('Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología')
    const [selectedTipoPregunta, setSelectedTipoPregunta] = useState(null);
    const [todasLasPreguntasConPosiciones, setTodasLasPreguntasConPosiciones] = useState([]);
    const todasLasPreguntasConPosicion = [];
    const [posicionPregunta, setPosicionPregunta] = useState(0);
    const [posicionContentCont, setPosicionContentCont] = useState(0);
    const [verLogicaPreguntas, setVerLogicaPreguntas] = useState(false);
    const [posicionComplementaria, setPosicionComplementaria] = useState([]);
    
    
    
      // Utiliza el método map para recorrer el arreglo contentCont y capturar su posición
      contentCont[indiceSec].preguntas.map((pregunta, indexPregunta) => {
        
                
            // // Verifica si el objeto de pregunta tiene un atributo "pregunta"
            // if (pregunta?.preguntasComplementarias?.length > 0) {


            //     todasLasPreguntasConPosicion.push({
            //         pregunta: pregunta.pregunta,
            //         posicionContentCont: indiceSec,
            //         posicionPregunta: indexPregunta,
                   
            //         });
            //     pregunta.preguntasComplementarias.map((preguntaComplementaria, indexPreguntaComplementaria) => {
            //         todasLasPreguntasConPosicion.push({
            //             pregunta: preguntaComplementaria.pregunta,
            //             posicionContentCont: indiceSec,
            //             posicionPreguntaComplementaria: indexPreguntaComplementaria,
            //         });

            //     });
            // }

            // else if (pregunta.pregunta) {
                // Agrega la pregunta y sus posiciones al arreglo todasLasPreguntasConPosiciones
                if (pregunta.pregunta !== '') {
                todasLasPreguntasConPosicion.push({
                pregunta: pregunta.pregunta,
                posicionContentCont: indiceSec,
                posicionPregunta: indexPregunta,
               
                });
            }
            // }
        });

        

        

    const verPreguntas = (seccionPosicion, index) => {
        
        const preguntasDeSeccion = [];
      
        // Verifica si la posición de la sección es válida
        if (seccionPosicion >= 0 && seccionPosicion < contentCont.length) {
          const seccion = contentCont[seccionPosicion];
      
          // Verifica si la sección tiene un atributo "preguntas" y si es un arreglo
          if (seccion.preguntas && Array.isArray(seccion.preguntas)) {
            seccion.preguntas.forEach((preguntaa, indexPregunta) => {
                
              // Verifica si el objeto de pregunta tiene un atributo "pregunta"
              if (preguntaa.pregunta !== pregunta) {
              if (preguntaa.pregunta) {
                preguntasDeSeccion.push({
                  pregunta: preguntaa.pregunta,
                  posicionPregunta: indexPregunta,
                  nemonico : preguntaa.nemonico,
                });
            }
              }
            });
      
            // Limpia las preguntas anteriores antes de agregar las nuevas preguntas
            setTodasLasPreguntasConPosiciones([]);
            setTodasLasPreguntasConPosiciones(prevPreguntas => [
                ...prevPreguntas,
                ...preguntasDeSeccion.map(pregunta => ({
                    ...pregunta,
                    index // Añadimos el índice aquí
                }))
            ]);
          }
        } 
      
      };
      
    const seccionesConPosicion = contentCont.map((item, indexContentCont) => {
        return {
          titulo: item.titulo,
          posicionContentCont: indexContentCont
        };
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
    
    const [contadorOpciones, setContadorOpciones] = useState(opcionesRespuesta.length + 1);
    let newType = configuracion3 ? 'checkbox' : 'radio';
    const handleMoreOpcion = () => {
        const newOpcion = {
            idOpcionRespuesta: contadorOpciones,
            checked: false,
            respuesta: "",
            type: newType,
            seccionValue: '',
            preguntaValue: '',
            orden: opcionesRespuesta.length + 1,
            valor: '1',
            nemonicoLogicaPregunta: '',
            logicaOpcionRespuesta: '',
        };
        setOpcionesRespuesta((prevOpciones) => [...prevOpciones, newOpcion]);
        setOpcionText("");
        setMoreContendorLogica((prevLogica) => [...prevLogica, true]);
        setContadorOpciones(contadorOpciones + 1);
    };

    const handleOpcionChange = (idOpcionRespuesta, value, checked, type) => {
        if (!configuracion3) {
          // Solo cambiamos el estado si el switch está en modo "radio"
          if (type === 'checkbox') {
            // Para checkbox, cambiamos el estado del checkbox actual, pero también deseleccionamos todos los demás
            setOpcionesRespuesta((prevOpciones) =>
              prevOpciones.map((opcion) =>
                opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : { ...opcion, checked: false }
              )
            );
          } else if (type === 'radio') {
            // Para radio, deseleccionamos todas las opciones excepto la que se hizo clic
            setOpcionesRespuesta((prevOpciones) =>
              prevOpciones.map((opcion) =>
                opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
              )
            );
          }
        } else {
          // En modo "checkbox", simplemente cambiamos el estado del checkbox actual
          setOpcionesRespuesta((prevOpciones) =>
            prevOpciones.map((opcion) =>
              opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : opcion
            )
          );
        }
    };

    const handleOpcionTextChange = (idOpcionRespuesta, newText) => {
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, respuesta: newText } : opcion
          )
        );

    };
    const handleOpcionPonderacion = (idOpcionRespuesta, newPonderacion) => {
        // Verificar si newPonderacion es una cadena vacía, un número válido entre 0 y 10 o "." para borrar
        if (newPonderacion === "" || newPonderacion === "." || (/^\d+(\.\d*)?$/.test(newPonderacion) && parseFloat(newPonderacion) >= 0 && parseFloat(newPonderacion) <= 10)) {
            
            setOpcionesRespuesta((prevOpciones) =>
                prevOpciones.map((opcion) =>
                    opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, valor: newPonderacion } : opcion
                )
            );
        }
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

    const handleSwitchConfigurar3 = () => {
        setConfiguracion3(!configuracion3);
        setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((opcion) => ({
            ...opcion,
            type: configuracion3 ? 'radio' : 'checkbox',
            checked: configuracion3 ? false : opcion.checked,
          }))
          
        );
        setMultipleRespuesta(!configuracion3 ? "S" : "N");
    };  

    const handleSwitchConfigurar4 = () => {
        setConfiguracion4(!configuracion4);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                ningunaAnteriores: !configuracion4 ? "S" : "N",
            };
        }
        );
    };

    const handleSwitchConfigurar5 = () => {
        setConfiguracion5(!configuracion5);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                otraRespuesta: !configuracion5 ? "S" : "N",
            };
        }
        );
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
        }
        );
    };
    
    const handleInformacionPregunta = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                etiquetaInformacionPregunta: selectedValue,
            };
        }
        );
    };

    const handleSwitchConfigurar7 = () => {
        setConfiguracion7(!configuracion7);
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                bancoPregunta: !configuracion7 ? "S" : "N",
            };
        }
        );
    };

    const handleBancoPregunta = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                etiquetaBancoPregunta: selectedValue,
            };
        }
        );
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
        console.log(selectedValue)
        if (selectedValue !== '') {
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
        verPreguntas(selectedValue, index);
        setVerLogicaPreguntas(true);
        }
        else {
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
            setVerLogicaPreguntas(false);
        }

    };
      
    const handlePreguntaChange = (index, event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue)
        setOpcionesRespuesta((prevOpciones) => {
            const updatedOpciones = prevOpciones.map((opcion, opcionIndex) => {
                if (opcionIndex === index) {
                return {
                    ...opcion,
                    nemonicoLogicaPregunta: selectedValue,
                    logicaOpcionRespuesta: selectedValue,
                };
                }
                return opcion;
            });
            return updatedOpciones;
        });

    };
   
    

    const handleCancelarOpcionMultiple = () => {
        setPregunta(preguntaTemp)
        closeopmul(indice, indiceSec, banderaComplementaria, indiceComplementaria);
    };

    const handleEliminarOpcionMultiple = () => (
        handleEliminarPregunta(indice, indiceSec, banderaComplementaria, indiceComplementaria)
    );
    
    const handleGuardarOpcionMultiple = () => {
        if (validacionOpcionMultiple() === false) return;
        if (validacionConfiguracion1() === false) return;
        if (validacionConfiguracion5() === false) return;
        if (validacionConfiguracion6() === false) return;   
        if (validacionConfiguracion7() === false) return;
        if (validarCheckedRespuestas() === false) return;
        
        setPreguntaTemp(pregunta)
        if (configuracion2)
        {
            console.log("entro a configuracion 2")
            console.log(posicionComplementaria)
            onAceptar(indice, indiceSec, pregunta, opcionesRespuesta, cancelar, configuraciongeneral,multipleRespuesta,ponderacion, configuracion2,posicionPregunta, posicionContentCont, posicionComplementaria);
            //onAceptarComplementaria(indice, indiceSec, pregunta, opcionesRespuesta, cancelar, configuraciongeneral,multipleRespuesta,ponderacion, configuracion2,posicionPregunta, posicionContentCont, posicionComplementaria);
        }
        else
        {
            onAceptar(indice, indiceSec, pregunta, opcionesRespuesta, cancelar, configuraciongeneral,multipleRespuesta,ponderacion, configuracion2, posicionPregunta, posicionContentCont);
        }
        

    };

    const validacionConfiguracion1 = () => {
        if (configuracion1)
        {
            if (configuraciongeneral.mensajeEsObligatoria === '') {
                toast.error('Debe agregar un mensaje de configuracion', { autoClose: 1000 });
                return false;
            }
        }
    };


    const validacionConfiguracion5 = () => {
        if (configuracion5) 
        {  
            if (configuraciongeneral.etiquetaOtraRespuesta === '' || configuraciongeneral.enumTipoTexto === '' 
            || configuraciongeneral.enumCantidadCaracteres === '' || configuraciongeneral.enumValidacion === '') { 
                
                toast.error('Debe llenar todos los campos de la configuracion Agregar "otra"', { autoClose: 1000 });
                return false;
            } 
        }
    };

    const validacionConfiguracion6 = () => {
        if (configuracion6)
        {
            if (configuraciongeneral.etiquetaInformacionPregunta === '') {
                toast.error('Debe agregar un mensaje de información', { autoClose: 1000 });
                return false;
            }
        }
    };
    const validacionConfiguracion7 = () => {
        if (configuracion7)
        {
            if (configuraciongeneral.etiquetaBancoPregunta === '') {
                toast.error('Debe agregar un mensaje de banco de preguntas', { autoClose: 1000 });
                return false;
         
            }
        }
    };

    const validacionOpcionMultiple = () => {
        if (opcionesRespuesta.length < 2) {
            toast.error('Debe agregar al menos 2 opciones de respuesta', { autoClose: 1000 });
            return false;
        }
    };

    const validarCheckedRespuestas = () => {
        const respuestas = opcionesRespuesta.filter((opcion) => opcion.checked);
        if (respuestas.length === 0) {
            toast.error('Debe seleccionar al menos una opción de respuesta', { autoClose: 1000 });
            return false;
        }
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
            valor: opcionApi.valor,
            orden: opcionApi.orden,
        })) ?? [];
        setOpcionesRespuesta(nuevasOpcionesRespuesta);
    }, [contentCont, preguntas.pregunta, preguntas.opcionesRespuesta]);

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
        if (!preguntas.requerida) { // Condición para verificar si la respuesta está vacía
            handleMoreOpcion();
        }
    }, [preguntas.respuesta])

    const handlePregunta = (value) => {
        handleCambiarPregunta(indice, indiceSec, value)
    };     

    const handleComplemetaria = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        console.log(selectedValue)
        setPosicionContentCont(selectedValue.posicionContentCont);
        setPosicionPregunta(selectedValue.posicionPregunta);
        setPosicionComplementaria(selectedValue.posicionPreguntaComplementaria);
      
      };

      
    const ver = () => {
        console.log(handleEditarPregunta )
    }

    return (
    <>
        <button onClick={ver} >veress</button>
      
        <h1>{indice}</h1>
        <ToastContainer />
        {!save  &&  (
           
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
                                {opcionesRespuesta.map((opcion, index) => {
                                    const droppableId = `opcion-${opcion.idOpcionRespuesta ? opcion.idOpcionRespuesta.toString() : index}`;
                                    const draggableId = `draggable-${opcion.idOpcionRespuesta ? opcion.idOpcionRespuesta.toString() : index}`;
                                    return (
                                        <Droppable droppableId={droppableId} key={droppableId}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                                                <Col className="seccion3-1-opcionMultiple-editar">
                                                                    <CustomCheckBox
                                                                        key={opcion.idOpcionRespuesta}
                                                                        className={`custom-checkbox ${opcion.type === 'radio' ? 'custom-radio' : ''}`}
                                                                        checked={opcion.checked}
                                                                    >
                                                                        {opcion.type === 'checkbox' ? (
                                                                            <>
                                                                                <HiddenCheckBox
                                                                                    type="checkbox"
                                                                                    style={{ width: '100%', height: '100%' }}
                                                                                    checked={opcion.checked}
                                                                                    onChange={() => handleOpcionChange(opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'checkbox')}
                                                                                />
                                                                                <StyledCheckBox checked={opcion.checked} />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <HiddenRadioButton
                                                                                    type="radio"
                                                                                    style={{ width: '100%', height: '100%' }}
                                                                                    checked={opcion.checked}
                                                                                    onChange={() => handleOpcionChange(opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'radio')}
                                                                                />
                                                                                <StyledRadioButton checked={opcion.checked} />
                                                                            </>
                                                                        )}
                                                                        <span className="checkmark"></span>
                                                                    </CustomCheckBox>

                                                                    <Respuesta
                                                                        className="textoOpcionRespuesta"
                                                                        type="text"
                                                                        value={opcion.respuesta}
                                                                        placeholder="Ingrese una opción de respuesta"
                                                                        onChange={(e) => handleOpcionTextChange(opcion.idOpcionRespuesta, e.target.value)}
                                                                    />

                                                                    {usarPonderacion && (
                                                                            <Ponderacion
                                                                                className="numeracionRespuesta"
                                                                                
                                                                                type="text"
                                                                                value={
                                                                                    console.log('uh',opcion) ||
                                                                                    opcion.valor}
                                                                                onChange={(e) => handleOpcionPonderacion(opcion.idOpcionRespuesta, e.target.value)}
                                                                            />
                                                                        
                                                                    )}

                                                                    <span
                                                                        style={{ marginTop: '1.3%', marginLeft: '2%', cursor: 'pointer' }}
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
                                    id = 'more'
                                />
                            </Col>
                        </Col>

                        <Col className='seccion5-opcionMultiple-editar'>
                            <label className="switch">
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
                            <label className="switch">
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
                                    onChange={handleEsOBligatoriaMensaje} 
                                />
                            </Col>
                        )}

                        <Col className='seccion2-opcionMultiple-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={ configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-opcionMultiple-configuracion'>
                                <select className='selectConfigurar' onChange={handleComplemetaria}>
                                    <option value="" selected disabled hidden>Seleccionar Pregunta...</option>
                                    {todasLasPreguntasConPosicion.map((pregunta, index) => (
                                        
                                        <option key={index} value={JSON.stringify(pregunta)}>
                                        {pregunta.pregunta}
                                        </option>
                                    ))}
                                </select>

                            </Col>
                        )}

                        <Col className='seccion3-opcionMultiple-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar3} checked={configuracion3}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la pregunta resiva multiples respuestas</p>
                        </Col>
                        
                        <Col className='seccion4-opcionMultiple-configuracion'>
                            <label className="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar como opción de respuesta "Ninguna de las anteriores"</p>
                        </Col>
                        

                        <Col className='seccion5-opcionMultiple-configuracion'>
                            <label className="switch">
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
                                        onChange={handleOtraOpcionRespuesta}
                                    />
                                </Col>
                                <Col className='seccion1-5-2-opcionMultiple-configuracion'>
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

                        <Col className='seccion1-opcionMultiple-configuracion'>
                            <label className="switch">
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
                                    defaultValue={informacionPregunta}
                                    onChange={handleInformacionPregunta}
                                />
                            </Col>
                        )}

                        <Col className='seccion1-opcionMultiple-configuracion'>
                            <label className="switch">
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
                                    onChange={handleBancoPregunta}
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
                                                <div key={opcion.idOpcionRespuesta} style={{ width: '29%' }}>
                                                    <p style={{ margin: 'unset', width: '20%' }}>{opcion.respuesta}</p>
                                                </div>
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
                                                            <option value='' >Seleccionar Sección</option>
                                                            {seccionesConPosicion.map((seccion, index) => (
                                                                <option key={index} value={seccion.posicionContentCont}>
                                                                    {seccion.titulo}
                                                                </option>
                                                            ))}

                                                        </select>

                                                        <select
                                                        className='select1Logica2'
                                                        value= {opcion.nemonicoLogicaPregunta}
                                                        onChange={(event) => handlePreguntaChange(index, event)}
                                                        disabled={!verLogicaPreguntas} // Aquí se habilitará o deshabilitará el select
                                                        >
                                                        <option value='' >Seleccionar LPregunta</option>
                                                        {todasLasPreguntasConPosiciones.map((pregunta, index) => (
                                                            <option key={index} value={pregunta.nemonico}>
                                                            {pregunta.pregunta}
                                                            </option>
                                                        ))}
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
                        Guardar {prueba}
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
                    obtenerPreg={obtenerPreg}
                    contenEstilos={contenEstilos}
                    sendColors={sendColors}
                    configuracion3RC={configuracion3}
                    complementarias={complementarias}
                    complementariaValue={complementariaValue}
                    banderaComplementaria={banderaComplementaria}
                    indiceComplementaria={indiceComplementaria}
                    posicionComplementaria={posicionComplementaria}
                />
            </Container>
        )}



        
    </>
  )
}

export default OpcionMultiple
