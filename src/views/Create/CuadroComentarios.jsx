import React, { useEffect, useState } from 'react'
import '../../styles/cuadroComentarios.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import ResultadoCuadroComentarios from './ResultadoCuadroComentarios';

const CuadroComentarios = ({handleCerrarCuadroComentarios, handleAceptarCuadroComentarios, indice, onAceptarCuadroComentarios, closeCuadroComentarios}) => {
    const [mostrarContenedor, setMostrarContenedor] = useState(true);
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [isActiveConfiguracion, setIsActiveConfiguracion] = useState(true);
    const [moreContendorLogica, setMoreContendorLogica] = useState([]);
    const [configuracion1, setConfiguracion1] = useState(false);
    const [configuracion2, setConfiguracion2] = useState(false);
    const [pregunta, setPregunta] = useState('Añada un comentario sobre la charla');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [contentCuadro, setContentCuadro] = useState([]);
    console.log(indice);
    
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

    const handleSwitchConfigurar1 = () => {
        setConfiguracion1(!configuracion1);
    };

    const handleSwitchConfigurar2 = () => {
        setConfiguracion2(!configuracion2);
    };

    const handleCancelarCuadroComentarios = () => {
        closeCuadroComentarios();   
    }

    const handleGuardarCuadroComentarios = () => {
        const nuevaPregunta = {
          tipo: 'CPCC',
          pregunta: pregunta
        };
        setContentCuadro((prevContentCuadro) => [...prevContentCuadro, nuevaPregunta]);
        setMostrarResultado(true);
        setMostrarContenedor(false);
      };      

    // useEffect(() => {
    //     setSeccion({ ...seccion, contentPreg: [] }); // Inicializa el contenido de la sección aquí
    // }, []);

    const handleEliminarPregunta = (index) => {
        const newContentCuadro = [...contentCuadro];
        newContentCuadro.splice(index, 1);
        setContentCuadro(newContentCuadro);
    };            

    return (
    <>
        {mostrarContenedor && (
            <Container className='container-cuadroComentarios'>
                <Col className='seccion1-cuadroComentarios'>
                    <Col className={`editar-cuadroComentarios ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                        Editar
                    </Col>

                    <Col className={`configurar-cuadroComentarios ${isActiveConfiguracion ? 'active' : 'inactive'}`} onClick={handleConfiguracion}>
                        Configuración
                    </Col>
                </Col>
                
                {mostrarEditar && (
                    <Container className='cuadroComentarios-container-editar'>
                        <Col>
                            <select className='selectEditar'>
                                <option value="" selected disabled hidden>Cuadro para Comentario</option>
                                <option value="option1">Opción 1</option>
                                <option value="option2">Opción 2</option>
                                <option value="option3">Opción 3</option>
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

        {mostrarResultado && (
            <Container>
                {contentCuadro.map((preg, index) => {
                if (preg.tipo === 'CC') {
                    return (
                    <CuadroComentarios
                        key={index}
                        closeopmul={handleCerrarCuadroComentarios}
                        indice={index}
                        onAceptarCuadroComentarios={handleAceptarCuadroComentarios}
                        closeCuadroComentarios={closeCuadroComentarios}
                    />
                    );
                } else if (preg.tipo === 'CPCC') {
                    return (
                    <ResultadoCuadroComentarios
                        key={index}
                        index={index}
                        pregunta={preg.pregunta}
                        handleEliminarPreguntaCC={() => handleEliminarPregunta(index)}
                    />
                    );
                }
                return null;
                })}
            </Container>
        )}
    </>
  )
}

export default CuadroComentarios
