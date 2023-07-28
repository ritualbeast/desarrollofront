import React, { useState } from 'react'
import '../../styles/cargaDatos.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ResultadoCargaDatos from './ResultadoCargaDatos';
import { useEffect } from 'react';
import { ListarTipoPregunta } from '../../services/PreguntaServices';

const trashSVG = svgManager.getSVG('trash-mini');

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
    contentCont,
    preguntaVisibleOpen,
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
    const [preguntaTemp, setPreguntaTemp] = useState(contentPreg.pregunta);
    const [pregunta2Temp, setPregunta2Temp] = useState(contentPreg.pregunta2);
    const [cancelar, setCancelar] = useState('true');
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [informacionPregunta, setInformacionPregunta] = useState('Considerar que debe ser unicamente en nuestras centrales medicas de Quito y exceptuando optometría y sicología')

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

    const handleCheckboxPDF = (event) => {
        setIsCheckedPDF(event.target.checked);
    };

    const handleCheckboxDOC = (event) => {
        setIsCheckedDOC(event.target.checked);
    };

    const handleCheckboxPNG = (event) => {
        setIsCheckedPNG(event.target.checked);
    };

    const handleCheckboxJPG = (event) => {
        setIsCheckedJPG(event.target.checked);
    };

    const handleCheckboxGIF = (event) => {
        setIsCheckedGIF(event.target.checked);
    };

    const handleSwitchConfigurar1 = () => {
        setConfiguracion1(!configuracion1);
    };

    const handleSwitchConfigurar2 = () => {
        setConfiguracion2(!configuracion2);
    };

    const handleSwitchConfigurar3 = () => {
        setConfiguracion3(!configuracion3);
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
        handleCargaArchivos(indice, indiceSec, pregunta, pregunta2, cancelar);
    };

    const listarTipoPregunta = async () => {
        try {
            const response = await ListarTipoPregunta();
            console.log(response.data.listTipoPreguntas)
            setTipoPregunta(response.data.listTipoPreguntas)
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        listarTipoPregunta();
    }, [])

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
                            <select 
                                className='selectEditar'
                                onChange={(e) => handlePregunta(e.target.value)}
                            >
                                {tipoPregunta.map((item) => (
                                    <option
                                        key={item.idTipoPregunta}
                                        value={item.tipo}
                                        selected={item.idTipoPregunta === 4}
                                    >
                                        {item.descripcion}
                                    </option>
                                ))}
                            </select>
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>Pregunta {indice+1}</p>
                            <textarea
                                style={{ width: '94.8%', border: '1px solid #ccc' }}
                                className="textoAgradecimiento"
                                id='idTextoAgradecimiento'
                                value={pregunta}
                                onChange={(e) => setPregunta(e.target.value)}
                                rows={5} // Ajusta el número de filas según tus necesidades
                            />
                        </Col>

                        <Col className='seccion3-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', cursor: 'default' }}>Instrucciones para el encuestado</p>

                            <FormControl 
                                style={{ width: '95.32%', border: '1px solid #ccc' }} 
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
                                    <input
                                        type="checkbox"
                                        style={{width: '70%', height: '70%'}}
                                        checked={isCheckedPDF}
                                        onChange={handleCheckboxPDF}
                                    />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PDF</p>
                            </Col>

                            <Col className='seccion4-2-cargaDatos-editar'>
                                <label style={{marginTop: '5.6%', width: '55%'}}>
                                    <input
                                        type="checkbox"
                                        style={{width: '70%', height: '70%'}}
                                        checked={isCheckedDOC}
                                        onChange={handleCheckboxDOC}
                                    />
                                </label>
                                <p style={{ width: '170%', marginBottom: '1%', cursor: 'default' }}>DOC, DOCX</p>
                            </Col>

                            <Col className='seccion4-3-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <input
                                        type="checkbox"
                                        style={{width: '70%', height: '70%'}}
                                        checked={isCheckedPNG}
                                        onChange={handleCheckboxPNG}
                                    />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PNG</p>
                            </Col>

                            <Col className='seccion4-4-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <input
                                        type="checkbox"
                                        style={{width: '70%', height: '70%'}}
                                        checked={isCheckedJPG}
                                        onChange={handleCheckboxJPG}
                                    />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>JPG</p>
                            </Col>

                            <Col className='seccion4-5-cargaDatos-editar'>
                                <label style={{marginTop: '11%', width: '48%'}}>
                                    <input
                                        type="checkbox"
                                        style={{width: '70%', height: '70%'}}
                                        checked={isCheckedGIF}
                                        onChange={handleCheckboxGIF}
                                    />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>GIF</p>
                            </Col>
                        </Col>

                        <Col className='seccion5-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', marginTop: '1.3%', cursor: 'default' }}>Peso máximo</p>
                            
                            <input
                                className="numeracionRespuesta"
                                style={{ width: '2.2%', height: '2.2%', textAlign: 'center' }}
                                type="text"
                            />

                            <p style={{ marginBottom: '1%', marginLeft: '2%', marginTop: '1.3%', cursor: 'default' }}>Mb</p>
                        </Col>

                        <Col className='seccion6-cargaDatos-editar'>
                            <p style={{ marginBottom: '1%', cursor: 'default' }}>Cuando se cargue un archivo erróneo, mostrar este mensaje de error.</p>
                            <textarea
                                style={{ width: '96.8%', border: '1px solid #ccc' }}
                                className="textoMensajeError"
                                value='Solo los archivos PDF, DOC, DOCX, PNG, JPG, JPEG, GIF son compatibles.'
                                readOnly
                                onChange={(e) => setPregunta(e.target.value)}
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
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." />
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
                                <textarea style={{ width: '94%', border: '1px solid #ccc', padding:'1%', borderRadius:'4px'}} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." value={informacionPregunta}/>
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
                                <textarea style={{ width: '94%', border: '1px solid #ccc', padding:'1%', borderRadius:'4px'}} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..."/>
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
