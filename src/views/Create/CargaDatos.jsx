import React, { useState } from 'react'
import '../../styles/cargaDatos.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import ResultadoCargaDatos from './ResultadoCargaDatos';

const CargaDatos = ({closeCargaArchivos, indice, onAceptarCargaArchivos}) => {
    const [mostrarContenedor, setMostrarContenedor] = useState(true);
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isCheckedPDF, setIsCheckedPDF] = useState(false);
    const [isCheckedDOC, setIsCheckedDOC] = useState(false);
    const [isCheckedPNG, setIsCheckedPNG] = useState(false);
    const [isCheckedJPG, setIsCheckedJPG] = useState(false);
    const [isCheckedGIF, setIsCheckedGIF] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [pregunta, setPregunta] = useState('Adjunte su CV');
    const [pregunta2, setPregunta2] = useState('Suba archivos PDF, PNG');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [seccion, setSeccion] = useState({
        tipo: 'CPCD',
        contentPreg: [] // Agrega tu array de preguntas aquí
    });

    const handleEditar = () => {
        setMostrarEditar(!mostrarEditar);
        setMostrarConfiguracion(false);
        setIsActiveEditar(false)
        setIsActiveConfiguracion(true);
    };

    const handleConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
        setMostrarEditar(false);
        setIsActiveConfiguracion(false)
        setIsActiveEditar(true);
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

    const handleCancelarCargaArchivo = () => {
        closeCargaArchivos(false);
    }

    const handleGuardarCargaDatos = () => {
        const nuevaPregunta = {
            tipo: 'CPCD',
            pregunta: pregunta,
            pregunta2: pregunta2
        };
        const newContentPreg = [...seccion.contentPreg, nuevaPregunta];
        setSeccion({ ...seccion, contentPreg: newContentPreg });
        setMostrarResultado(true);
        setMostrarContenedor(false);
    };

    const handleEliminarPregunta = (index) => {
        const newContentPreg = [...seccion.contentPreg];
        newContentPreg.splice(index, 1);
        setSeccion({ ...seccion, contentPreg: newContentPreg });
    };

    return (
    <>
        {mostrarContenedor && (
            <Container className='container-cargaDatos'>
                <Col className='seccion1-cargaDatos'>
                    <Col className={`editar-cargaDatos ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-cargaDatos ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='cargaDatos-container-editar'>
                        <Col>
                            <select className='selectEditar'>
                                <option value="" selected disabled hidden>Carga de archivos</option>
                                <option value="option1">Opción 1</option>
                                <option value="option2">Opción 2</option>
                                <option value="option3">Opción 3</option>
                            </select>
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>Pregunta {indice+1}</p>
                            <textarea
                                style={{ width: '94.8%', border: '1px solid #ccc' }}
                                className="textoAgradecimiento"
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

        {mostrarResultado && (
            <Container>
                {seccion.contentPreg.map((preg, index) => { 
                    if (preg.tipo == 'CPCD') {
                            return <ResultadoCargaDatos 
                                key={index} 
                                index={indice} 
                                pregunta={pregunta} 
                                pregunta2={pregunta2}
                                handleEliminarPreguntaCD={() => handleEliminarPregunta(index)}
                            />
                    }  return '';
                })}
            </Container>
        )}
    </>
  )
}

export default CargaDatos
