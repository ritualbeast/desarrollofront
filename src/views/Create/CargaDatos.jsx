import React, { useState } from 'react'
import Select from 'react-select';
import '../../styles/cargaDatos.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ResultadoCargaDatos from './ResultadoCargaDatos';
import { useEffect } from 'react';
import { ListarTipoPregunta } from '../../services/PreguntaServices';
import styled from 'styled-components';

const trashSVG = svgManager.getSVG('trash-mini');

const Pregunta = styled.textarea`
    width: 94.8%; 
    border: 1px solid #ccc;
    border-radius:4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const Comentario = styled.textarea`
    width: 96.8%;
    border: 1px solid #ccc;
    border-radius:4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
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
  margin-top: 40%;
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

const Informacion = styled.textarea`
    width: 94%;
    border: 1px solid #ccc;
    outline: none;
    padding: 1%; 
    border-radius: 4px;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const Instrucciones = styled(FormControl)`
    width: 95.32% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const MB = styled.input`
    width: 2.2% !important;
    height: 2.2% !important;
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

const CargaDatos = ({
    indice, 
    indiceSec, 
    save, 
    contentPreg, 
    closeCargaArchivos, 
    handleCargaArchivos, 
    handleEditarPregunta, 
    handleEliminarPregunta,
    handleCambiarPregunta,
    preguntaVisibleOpen,
    contentCont,
 }) => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [mostrarLogica, setMostrarLogica] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isActiveLogica, setIsActiveLogica] = useState(true);
    const [seccionValue, setSeccionValue] = useState('');
    const [preguntaValue, setPreguntaValue] = useState('');
    const [isCheckedPDF, setIsCheckedPDF] = useState(false);
    const [isCheckedDOC, setIsCheckedDOC] = useState(false);
    const [isCheckedPNG, setIsCheckedPNG] = useState(false);
    const [isCheckedJPG, setIsCheckedJPG] = useState(false);
    const [isCheckedGIF, setIsCheckedGIF] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion3, setConfiguracion3] = useState(false);
    const [pregunta, setPregunta] = useState(contentPreg.pregunta);
    const [pregunta2, setPregunta2] = useState(contentPreg.pregunta2);
    const [pesoArchivo, setPesoArchivo] = useState(contentPreg.pesoArchivo);
    const [mensajeError, setMensajeError] = useState('Solo los archivos PDF, DOC, DOCX, PNG, JPG, JPEG, GIF son compatibles.'); 
    const [preguntaTemp, setPreguntaTemp] = useState(contentPreg.pregunta);
    const [pregunta2Temp, setPregunta2Temp] = useState(contentPreg.pregunta2);
    const [cancelar, setCancelar] = useState('true');
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [informacionPregunta, setInformacionPregunta] = useState('Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología')
    const [selectedTipoPregunta, setSelectedTipoPregunta] = useState(null);
    const [selectedFormats, setSelectedFormats] = useState("");
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

    const updateSelectedFormats = () => {
        let formats = [];
        if (isCheckedPDF) formats.push("PDF");
        if (isCheckedDOC) formats.push("DOC, DOCX");
        if (isCheckedPNG) formats.push("PNG");
        if (isCheckedJPG) formats.push("JPG");
        if (isCheckedGIF) formats.push("GIF");

        setSelectedFormats(formats.join(", "));
    };

    const handleCheckboxPDF = (event) => {
        setIsCheckedPDF(event.target.checked);
        updateSelectedFormats();
    };

    const handleCheckboxDOC = (event) => {
        setIsCheckedDOC(event.target.checked);
        updateSelectedFormats();
    };

    const handleCheckboxPNG = (event) => {
        setIsCheckedPNG(event.target.checked);
        updateSelectedFormats();
    };

    const handleCheckboxJPG = (event) => {
        setIsCheckedJPG(event.target.checked);
        updateSelectedFormats();
    };

    const handleCheckboxGIF = (event) => {
        setIsCheckedGIF(event.target.checked);
        updateSelectedFormats();
    };

    const handleSwitchConfigurar1 = () => {
        setConfiguracion1(!configuracion1);
        setConfiguraciongeneral({
            ...configuraciongeneral,
            esObligatoria: configuracion1 ? "N" : "S",
            
        })
    };

    const handleEsOBligatoriaMensaje = (event) => {
        const selectedValue = event.target.value;
        setConfiguraciongeneral((prevConfiguracion) => {
            return {
                ...prevConfiguracion,
                mensajeEsObligatoria: selectedValue,
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

    const handleSwitchConfigurar2 = () => {
        setConfiguracion2(!configuracion2);
        setConfiguraciongeneral({
            ...configuraciongeneral,
            informacionPregunta: configuracion2 ? "N" : "S",

        })
    };

    const handleSwitchConfigurar3 = () => {
        setConfiguracion3(!configuracion3);
        setConfiguraciongeneral({
            ...configuraciongeneral,
            bancoPregunta: configuracion3 ? "N" : "S",

        })
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

    const handleClearOpcion = () => {
        setSeccionValue('');
        setPreguntaValue('');
    }

    const handleSeccionChange = (event) => {
        const selectedValue = event.target.value;
        setSeccionValue(selectedValue);
    };

    const handlePreguntaChange = (event) => {
        const selectedValue = event.target.value;
        setPreguntaValue(selectedValue);
    };

    const handleCancelarCargaArchivo = () => {
        setPregunta(preguntaTemp)
        setPregunta2(pregunta2Temp)
        closeCargaArchivos(indice, indiceSec);
    }

    const handleGuardarCargaDatos = () => {
        setPreguntaTemp(pregunta)
        setPregunta2Temp(pregunta2)
        handleCargaArchivos(indice, indiceSec, pregunta, pregunta2, cancelar, configuraciongeneral, selectedFormats, mensajeError, pesoArchivo);
    };

    const listarTipoPregunta = async () => {
        try {
            const response = await ListarTipoPregunta();
            setTipoPregunta(response.data.listTipoPreguntas);
            const defaultTipo = response.data.listTipoPreguntas.find((item) => item.idTipoPregunta === 4);
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

    useEffect(() => {
        setPreguntaTemp(contentPreg.pregunta)
        setPregunta(contentPreg.pregunta)
    }, [contentCont]);

    const handlePregunta = (value) => {
        console.log(value)
        handleCambiarPregunta(indice, indiceSec, value)
    }

    return (
    <>
        {!save  && (
            <Container className='container-cargaDatos'>
                <Col className='seccion1-cargaDatos'>
                    <Col className={`editar-cargaDatos ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-cargaDatos ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>

                    <Col className={`logica-opcionMultiple ${isActiveLogica ? 'active' : 'inactive'}`} onClick={handleLogica}>
                        Lógica
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='cargaDatos-container-editar'>
                        <Col>
                            <Select
                                styles={customStyles}
                                className='selectEditar_CD'
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
                                className="textoAgradecimiento"
                                id='idTextoAgradecimiento'
                                value={pregunta}
                                onChange={(e) => setPregunta(e.target.value)}
                                rows={5} // Ajusta el número de filas según tus necesidades
                            />
                        </Col>

                        <Col className='seccion3-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', cursor: 'default' }}>Instrucciones para el encuestado</p>

                            <Instrucciones
                                className= '' 
                                type="text"
                                value={pregunta2}
                                readOnly
                                onChange={(e) => setPregunta2(e.target.value)}
                            />
                        </Col>

                        <Col className='seccion4-cargaDatos-editar'>
                            <p style={{ cursor: 'default' }}>Tipos de archivos permitidos</p>

                            <Col className='seccion4-1-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '100%'}}>
                                    <HiddenCheckBox
                                        type="checkbox"
                                        checked={isCheckedPDF}
                                        onChange={handleCheckboxPDF}
                                        
                                    />
                                    <StyledCheckBox checked={isCheckedPDF} />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PDF</p>
                            </Col>

                            <Col className='seccion4-2-cargaDatos-editar'>
                                <label style={{marginTop: '5.6%', width: '55%'}}>
                                    <HiddenCheckBox
                                        type="checkbox"
                                        checked={isCheckedDOC}
                                        onChange={handleCheckboxDOC}
                                    />
                                    <StyledCheckBox checked={isCheckedDOC} />
                                </label>
                                <p style={{ width: '170%', marginTop: '13.4%', cursor: 'default' }}>DOC, DOCX</p>
                            </Col>

                            <Col className='seccion4-3-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <HiddenCheckBox
                                        type="checkbox"
                                        checked={isCheckedPNG}
                                        onChange={handleCheckboxPNG}
                                    />
                                    <StyledCheckBox checked={isCheckedPNG} />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PNG</p>
                            </Col>

                            <Col className='seccion4-4-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <HiddenCheckBox
                                        type="checkbox"
                                        checked={isCheckedJPG}
                                        onChange={handleCheckboxJPG}
                                    />
                                    <StyledCheckBox checked={isCheckedJPG} />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>JPG</p>
                            </Col>

                            <Col className='seccion4-5-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <HiddenCheckBox
                                        type="checkbox"
                                        checked={isCheckedGIF}
                                        onChange={handleCheckboxGIF}
                                    />
                                    <StyledCheckBox checked={isCheckedGIF} />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>GIF</p>
                            </Col>
                        </Col>

                        <Col className='seccion5-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', marginTop: '1.3%', cursor: 'default' }}>Peso máximo</p>
                            
                            <MB
                                className="numeracionRespuesta"
                                style={{ width: '2.2%', height: '2.2%', textAlign: 'center' }}
                                type="text"
                                onChange={(e) => setPesoArchivo(e.target.value)}
                            />

                            <p style={{ marginBottom: '1%', marginLeft: '2%', marginTop: '1.3%', cursor: 'default' }}>Mb</p>
                        </Col>

                        <Col className='seccion6-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', cursor: 'default' }}>Cuando se cargue un archivo erróneo, mostrar este mensaje de error.</p>
                            <Comentario
                                className="textoMensajeError"
                                value='Solo los archivos PDF, DOC, DOCX, PNG, JPG, JPEG, GIF son compatibles.'
                                readOnly
                                onChange={(e) => setMensajeError(e.target.value)}
                                rows={5} // Ajusta el número de filas según tus necesidades
                            />
                        </Col>
                    </Container>
                )}

                {mostrarConfiguracion && (
                    <Container className='cargaDatos-container-configuracion'>
                        <Col className='seccion1-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar1} checked={configuracion1}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la respuesta a esta pregunta sea obligatoria</p>
                        </Col>
                        {configuracion1 && (
                            <Col className='seccion1-1-cargaDatos-configuracion'>
                                <p style={{margin: 'unset' }}>Mostrar este mensaje de error cuando no se responde a esta pregunta.</p>
                                <MensajeError 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    placeholder="Escribe aquí..."
                                    onChange={handleEsOBligatoriaMensaje} 
                                />
                            </Col>
                        )}

                        <Col className='seccion2-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar información sobre la pregunta</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-1-cargaDatos-configuracion'>
                                <p style={{margin: 'unset' }}>Información sobre pregunta</p>
                                <Informacion 
                                    className= 'textoConfiguracion1' 
                                    type="text" 
                                    value={configuraciongeneral.etiquetaInformacionPregunta}
                                    onChange={handleInformacionPregunta}
                                />
                            </Col>
                        )}

                        <Col className='seccion1-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar3} checked={configuracion3}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Alimentar a banco de preguntas</p>
                        </Col>
                        {configuracion3 && (
                            <Col className='seccion1-1-cuadroComentarios-configuracion'>
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
                            <div>
                                <Col className='seccion2-opcionMultiple-logica'>
                                    <div style={{ width: '29%' }}>
                                        <p style={{ margin: 'unset', width: '20%' }}>Respuesta</p>
                                    </div>

                                    <Col style={{ width: '100%' }}>
                                        <div></div>
                                            <select
                                                className='select1Logica1'
                                                value={seccionValue}
                                                onChange={handleSeccionChange}
                                            >
                                                <option value='' disabled hidden>Seleccionar Sección</option>
                                                <option value='option1'>Sección 1</option>
                                                <option value='option2'>Sección 2</option>
                                                <option value='option3'>Sección 3</option>
                                            </select>

                                            <select
                                                className='select1Logica2'
                                                value={preguntaValue}
                                                onChange={(event) => handlePreguntaChange(event)}
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
                                                    onClick={() => handleClearOpcion()}
                                                />
                                            </Button>
                                    </Col>
                                </Col>
                            </div>
                        </div>
                    </Container> 
                )}

                <Col className='seccion6-cargaDatos'>
                    <Button className='cancelarCargaDatos' onClick={handleCancelarCargaArchivo}>
                        Cancelar
                    </Button>
                        
                    <Button className='guardarCargaDatos' onClick={handleGuardarCargaDatos}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}

        {save  && (
            <Container>
                 <ResultadoCargaDatos                
                    index={indice} 
                    indexSec={indiceSec}
                    pregunta={pregunta} 
                    pregunta2={pregunta2}
                    handleEditarPregunta={handleEditarPregunta}
                    handleEliminarPregunta={handleEliminarPregunta}
                    informacion = {informacionPregunta}
                    configuracion2Activa={configuracion2}
                    preguntaVisibleC={preguntaVisibleOpen}
                />
            </Container>
        )}
    </>
  )
}

export default CargaDatos
