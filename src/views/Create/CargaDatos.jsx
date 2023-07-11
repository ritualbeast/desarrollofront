import React, { useEffect, useState } from 'react'
import '../../styles/cargaDatos.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ResultadoOpcionMultiple from './ResultadoOpcionMultiple';

const minusCircleSVG = svgManager.getSVG('minus-circle');
const plushCircleSVG = svgManager.getSVG('plush-circle');
const trashSVG = svgManager.getSVG('trash-mini');

const CargaDatos = (closeopmul, indice, onAceptar) => {
    const [mostrarContenedor, setMostrarContenedor] = useState(true);
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion3, setConfiguracion3] = useState(false);
    const [configuracion4, setConfiguracion4] = useState(false); 
    const [configuracion5, setConfiguracion5] = useState(false);
    const [pregunta, setPregunta] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    
    const handleCancelarOpcionMultiple = () => {
        closeopmul(false);
    }

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

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
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

    const handleSwitchConfigurar4 = () => {
        setConfiguracion4(!configuracion4);
    };

    const handleSwitchConfigurar5 = () => {
        setConfiguracion5(!configuracion5);
    };

    const handleGuardarOpcionMultiple = () => {
        setMostrarResultado(true);
        onAceptar();
        setMostrarContenedor(false);
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
                                placeholder="Adjunte su CV"
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
                                value={pregunta}
                                placeholder="Suba archivos PDF, PNG" 
                                readOnly
                                onChange={(e) => setPregunta(e.target.value)}
                            />
                        </Col>

                        <Col className='seccion4-cargaDatos-editar'>
                            <p style={{ cursor: 'default' }}>Tipos de archivos permitidos</p>

                            <Col className='seccion4-1-cargaDatos-editar'>
                                <label >
                                    <input
                                        style={{width: '2%'}}
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PDF</p>
                            </Col>

                            <Col>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>DOC, DOCX</p>
                            </Col>

                            <Col>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>PNG</p>
                            </Col>

                            <Col>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>JPG</p>
                            </Col>

                            <Col>
                                <p style={{ marginBottom: '1%', cursor: 'default' }}>GIF</p>
                            </Col>
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
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-cargaDatos-configuracion'>
                                <select className='selectConfigurar'>
                                    <option value="" selected disabled hidden>Seleccionar Pregunta</option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </Col>
                        )}

                        <Col className='seccion3-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar3} checked={configuracion3}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la pregunta resiva multiples respuestas</p>
                        </Col>
                        
                        <Col className='seccion4-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar como opción de respuesta "Ninguna de las anteriores"</p>
                        </Col>
                        {configuracion4 && (
                            <Col className='seccion1-4-cargaDatos-configuracion'>
                                <p style={{margin: 'unset' }}>Etiqueta</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" />
                            </Col>
                        )}

                        <Col className='seccion5-cargaDatos-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar5} checked={configuracion5}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar "otra" como opción de respuesta para comentarios</p>
                        </Col>
                        {configuracion5 && (
                            <Col className='seccion1-5-cargaDatos-configuracion'>
                                <Col>
                                    <p style={{margin: 'unset' }}>Etiqueta</p>
                                    <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Otro (especifique)" />
                                </Col>
                                <Col className='seccion1-5-2-cargaDatos-configuracion'>
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

                <Col className='seccion6-cargaDatos'>
                    <Button className='cancelarCargaDatos' onClick={handleCancelarOpcionMultiple}>
                        Cancelar
                    </Button>
                        
                    <Button className='guardarCargaDatos' onClick={handleGuardarOpcionMultiple}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}

        {mostrarResultado && (
            <Container>
                <ResultadoOpcionMultiple index={indice} pregunta={pregunta} />
            </Container>
        )}
    </>
  )
}

export default CargaDatos
