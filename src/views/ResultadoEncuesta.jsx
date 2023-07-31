import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap';
import '../styles/resultadoEncuesta.css'
import Veris from '../assets/img/veris.png'

const ResultadoEncuesta = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <Container className='container_resultadoEncuesta'>
                <Col className='contenedor-preguntas-fin'>
                    <p className='titulo-encuesta-tercero' style={{marginTop:'unset'}}>Encuesta Veris</p>
                    <p style={{marginLeft:'1.4%'}}>Encuesta enfocada en colaboradores de Veris, para cononcer el clima laboral, es de carácter obligatorio.</p>
                </Col>
                    
                <Col className='contenedor-preguntas-fin'>
                    <img src={Veris} alt="." style={{width: '80%', marginLeft: '10%' }} />
                </Col>

                <Col className='contenedor-preguntas-fin'>
                    <p className='titulo-nuevaEncuesta'>Sección 1</p>
                    <p style={{marginLeft:'1.4%'}}>Preguntas enfocadas en las actividades que realizó en el ultimo trimestre</p>
    
                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>1. Pregunta 1</p>
                        </Col>

                        <div>
                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>2. Pregunta 2</p>
                        </Col>

                        <Col style={{ display: 'flex' }}>
                            <Col style={{ marginRight: '2%' }}>
                                <Col>
                                <div style={{ marginBottom: '25%', textAlign: 'center' }}>
                                    Respuesta 2
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span
                                    style={{
                                        marginLeft: '2%',
                                        cursor: 'pointer',
                                        marginTop: '0.8%',

                                    }}
                                    />
                                </div>
                                </Col>
                            </Col>
                        </Col>

                        <div>
                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%'}} className='container-resultadoCargaDatos'>
                        <Col
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        >
                            <p>3. Pregunta 3</p>
                        </Col>
                        <p>Respuesta 3</p>

                        <Button className='buttonElegirArchivo'>
                        Elegir archivo
                        </Button>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoCuadroComentarios'>
                        <Col
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        >
                            <p>4. Pregunta 4</p>
                        </Col>
                        <textarea
                            style={{ width: '98.8%', border: '1px solid #ccc' }}
                            className="textodePregunta"
                            readOnly
                            rows={5} // Ajusta el número de filas según tus necesidades
                        />
                    </Container>
                </Col>

                <Col className='contenedor-preguntas-fin'>
                    <p className='titulo-nuevaEncuesta'>Sección 2</p>
                    <p style={{marginLeft:'1.4%'}}>Preguntas enfocadas en las actividades que realizó en el ultimo trimestre</p>
    
                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>5. Pregunta 5</p>
                        </Col>

                        <div>
                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>6. Pregunta 6</p>
                        </Col>

                        <Col style={{ display: 'flex' }}>
                            <Col style={{ marginRight: '2%' }}>
                                <Col>
                                <div style={{ marginBottom: '25%', textAlign: 'center' }}>
                                    Respuesta 2
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span
                                    style={{
                                        marginLeft: '2%',
                                        cursor: 'pointer',
                                        marginTop: '0.8%',

                                    }}
                                    />
                                </div>
                                </Col>
                            </Col>
                        </Col>

                        <div>
                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    style={{ marginRight: '2%' }}
                                />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%'}} className='container-resultadoCargaDatos'>
                        <Col
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        >
                            <p>7. Pregunta 7</p>
                        </Col>
                        <p>Respuesta 1</p>

                        <Button className='buttonElegirArchivo'>
                        Elegir archivo
                        </Button>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoCuadroComentarios'>
                        <Col
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        >
                            <p>8. Pregunta 8</p>
                        </Col>
                        <textarea
                            style={{ width: '98.8%', border: '1px solid #ccc' }}
                            className="textodePregunta"
                            readOnly
                            rows={5} // Ajusta el número de filas según tus necesidades
                        />
                    </Container>
                </Col>
            </Container>
        </>
    )
}

export default ResultadoEncuesta
