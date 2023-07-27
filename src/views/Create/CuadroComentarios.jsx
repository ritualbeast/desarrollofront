import React, { useEffect, useState } from 'react'
import '../../styles/cuadroComentarios.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ResultadoCuadroComentarios from './ResultadoCuadroComentarios';
import { ListarTipoPregunta } from '../../services/PreguntaServices';

const trashSVG = svgManager.getSVG('trash-mini');

const CuadroComentarios = ({
    indice, 
    indiceSec, 
    save, 
    contentPreg, 
    closeCuadroComentarios, 
    handleCuadroComentarios, 
    handleEditarPregunta, 
    handleEliminarPregunta, 
    handleCambiarPregunta,
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
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [configuracion3, setConfiguracion3] = useState(false);
    const [configuracion4, setConfiguracion4] = useState(false);
    const [pregunta, setPregunta] = useState(contentPreg.pregunta);
    const [preguntaTemp, setPreguntaTemp] = useState(contentPreg.pregunta);
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

    const handleCancelarCuadroComentarios = () => {
        setPregunta(preguntaTemp)
        closeCuadroComentarios(indice, indiceSec);   
    }

    const handleEliminarCuadroComentarios = () => {
        handleEliminarPregunta(indice, indiceSec)
    }

    const handleGuardarCuadroComentarios = () => {
        setPreguntaTemp(pregunta)
        handleCuadroComentarios(indice, indiceSec, pregunta, cancelar);
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
        handleCambiarPregunta(indice, indiceSec, value)
    }

    return (
    <>
        {!save && (
            <Container className='container-cuadroComentarios'>
                <Col className='seccion1-cuadroComentarios'>
                    <Col className={`editar-cuadroComentarios ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-cuadroComentarios ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>

                    <Col className={`logica-opcionMultiple ${isActiveLogica ? 'active' : 'inactive'}`} onClick={handleLogica}>
                        Lógica
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='cuadroComentarios-container-editar'>
                        <Col>
                            <select 
                                className='selectEditar'
                                onChange={(e) => handlePregunta(e.target.value)}
                            >
                                {tipoPregunta.map((item) => (
                                    <option
                                        key={item.idTipoPregunta}
                                        value={item.tipo}
                                        selected={item.idTipoPregunta === 5}
                                    >
                                        {item.descripcion}
                                    </option>
                                ))}
                            </select>
                        </Col>

                        <Col>
                            <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>Texto de pregunta</p>
                            <textarea
                                style={{ width: '94.8%', border: '1px solid #ccc' }}
                                className="textoAgradecimiento"
                                value={pregunta}
                                onChange={(e) => setPregunta(e.target.value)}
                                rows={5} // Ajusta el número de filas según tus necesidades
                            />
                        </Col>
                    </Container>
                )}

                {mostrarConfiguracion && (
                    <Container className='cuadroComentarios-container-configuracion'>
                        <Col className='seccion1-cuadroComentarios-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar1} checked={configuracion1}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que la respuesta a esta pregunta sea obligatoria</p>
                        </Col>
                        {configuracion1 && (
                            <Col className='seccion1-1-cuadroComentarios-configuracion'>
                                <p style={{margin: 'unset' }}>Mostrar este mensaje de error cuando no se responde a esta pregunta.</p>
                                <FormControl style={{ width: '94%', border: '1px solid #ccc' }} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." />
                            </Col>
                        )}

                        <Col className='seccion2-cuadroComentarios-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar2} checked={configuracion2}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Hacer que esta pregunta sea complementaria</p>
                        </Col>
                        {configuracion2 && (
                            <Col className='seccion1-2-cuadroComentarios-configuracion'>
                                <select className='selectConfigurar'>
                                    <option value="" selected disabled hidden>Seleccionar Pregunta</option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </Col>
                        )}

                        <Col className='seccion3-cuadroComentarios-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar3} checked={configuracion3}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Agregar información sobre la pregunta</p>
                        </Col>
                        {configuracion3 && (
                            <Col className='seccion1-1-cuadroComentarios-configuracion'>
                                <p style={{margin: 'unset' }}>Información sobre pregunta</p>
                                <textarea style={{ width: '94%', border: '1px solid #ccc', padding:'1%', borderRadius:'4px'}} className= 'textoConfiguracion1' type="text" placeholder="Escribe aquí..." value={informacionPregunta}/>
                            </Col>
                        )}

                        <Col className='seccion3-cuadroComentarios-configuracion'>
                            <label class="switch">
                                <input type="checkbox" onChange={handleSwitchConfigurar4} checked={configuracion4}/>
                                <span className="slider round"></span>
                            </label>
                            <p style={{ margin: 'unset', cursor: 'default' }}>Alimentar a banco de preguntas</p>
                        </Col>
                        {configuracion4 && (
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

                <Col className='seccion6-cuadroComentarios'>
                    <Button className='cancelarCuadroComentarios' onClick={handleCancelarCuadroComentarios}>
                        Cancelar
                    </Button>
                        
                    <Button className='guardarCuadroComentarios' onClick={handleGuardarCuadroComentarios}>
                        Guardar
                    </Button>
                </Col>
            </Container>
        )}

        {save && (
            <Container>
                <ResultadoCuadroComentarios
                    index={indice}
                    indexSec={indiceSec}
                    pregunta={pregunta}
                    handleEditarPregunta={handleEditarPregunta}
                    handleEliminarPregunta = {handleEliminarCuadroComentarios}
                    informacion = {informacionPregunta}
                    configuracion3Activa={configuracion3}
                    preguntaVisibleC={preguntaVisibleOpen}
                />
            </Container>
        )}
    </>
  )
}

export default CuadroComentarios
