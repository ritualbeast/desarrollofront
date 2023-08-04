import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap';
import '../../styles/resultadoEncuesta.css'
import Veris from '../../assets/img/veris.png'
import svgManager from '../../assets/svg';
import ResultadoEncuesta2 from './ResultadoEncuesta2';
import styled from 'styled-components';

const starFillSVG = svgManager.getSVG('star-fill');

const StyledTextarea = styled.textarea`
  width: 98.8%;
  border: 1px solid #ccc;
  outline: none;

  /* Estilo para el textarea cuando está en foco */
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
  width: 12px;
  height: 12px;
  border: 2px solid rgba(194, 194, 194, 1);
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? 'rgba(255, 206, 72, 1)' : 'white')};
  border:${(props) => (props.checked ? '2px solid rgba(255, 206, 72, 1)' : '2px solid rgba(194, 194, 194, 1)')};
  position: relative;
  margin-top: 0.4%;
  margin-left: 0.4%;
  margin-right: 2%;

  &:after {
    content: '${(props) => (props.checked ? '\u2713' : '')}';
    font-size: 11px;
    color: white;
    display: ${(props) => (props.checked ? 'block' : 'none')};
    position: absolute;
    top: -2px;
    left: 2px;
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
  margin-top: 0.2%;
  margin-left: 0.4%;
  margin-right: 2%;
  cursor: pointer;

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
  }
`;

const ResultadoEncuesta = () => {
    const [opcion1, setOpcion1] = useState(false);
    const [opcion2, setOpcion2] = useState(false);
    const [opcion3, setOpcion3] = useState(false);
    const [opcion4, setOpcion4] = useState(false);
    const [mostrarResultado2, setMostrarResultado2] = useState(false);

    const Opcion1 = () => {
        setOpcion1(!opcion1);
    };

    const Opcion2 = () => {
        setOpcion2(!opcion2);
    };

    const Opcion3 = () => {
        setOpcion3(!opcion3);
    };

    const Opcion4 = () => {
        setOpcion4(!opcion4);
    };

    const handleSiguienteClick = () => {
        setMostrarResultado2(true);
    };

    const handleRegresarClick = () => {
        setMostrarResultado2(false);
    }

    return (
        <div className='global-resultadoEncuesta'>
            {!mostrarResultado2 && (
                <div>
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
            
                            <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                    <p>1. Pregunta 1</p>
                                </Col>

                                <div>
                                    <label style={{ display: 'flex' }}>
                                        <HiddenCheckBox 
                                            type="checkbox"
                                            checked={opcion1}
                                            onChange={Opcion1}
                                            style={{ marginRight: '2%' }}
                                        />
                                        <StyledCheckBox checked={opcion1} />
                                        <div style={{ marginBottom: '0.4%' }}>
                                            Respuesta 1
                                        </div>
                                    </label>

                                    <label style={{ display: 'flex' }}>
                                        <HiddenCheckBox
                                            type="checkbox"
                                            checked={opcion2}
                                            onChange={Opcion2}
                                            style={{ marginRight: '2%' }}
                                        />
                                        <StyledCheckBox checked={opcion2} />
                                        <div style={{ marginBottom: '0.4%' }}>
                                            Respuesta 2
                                        </div>
                                    </label>
                                </div>
                            </Container>

                            <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                    <p>2. Pregunta 2</p>
                                </Col>

                                <Col style={{ display: 'flex' }}>
                                    <Col style={{ marginRight: '2%', display:'flex' }}>
                                        <Col style={{ marginRight:'8%'}}>
                                            <div style={{ textAlign: 'center' }}>
                                                Nada
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'6%' }}>
                                                <span
                                                    style={{
                                                        display:'flex', 
                                                        alignItems:'center', 
                                                        justifyContent:'center'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: starFillSVG }}
                                                />
                                            </div>
                                        </Col>

                                        <Col style={{ marginRight:'8%'}}>
                                            <div style={{ textAlign: 'center' }}>
                                                Poco
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'6%' }}>
                                                <span
                                                    style={{
                                                        display:'flex', 
                                                        alignItems:'center', 
                                                        justifyContent:'center'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: starFillSVG }}
                                                />
                                            </div>
                                        </Col>

                                        <Col style={{ marginRight:'8%'}}>
                                            <div style={{ textAlign: 'center' }}>
                                                Regular
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'6%' }}>
                                                <span
                                                    style={{
                                                        display:'flex', 
                                                        alignItems:'center', 
                                                        justifyContent:'center'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: starFillSVG }}
                                                />
                                            </div>
                                        </Col>

                                        <Col style={{ marginRight:'8%'}}>
                                            <div style={{ textAlign: 'center' }}>
                                                Mucho
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'6%' }}>
                                                <span
                                                    style={{
                                                        display:'flex', 
                                                        alignItems:'center', 
                                                        justifyContent:'center'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: starFillSVG }}
                                                />
                                            </div>
                                        </Col>
                                    </Col>
                                </Col>

                                <div>
                                    <label style={{ display: 'flex' }}>
                                        <HiddenRadioButton
                                            type="checkbox"
                                            checked={opcion3}
                                            onChange={Opcion3}
                                            style={{ marginRight: '2%' }}
                                        />
                                        <StyledRadioButton checked={opcion3} />
                                        <div style={{ marginBottom: '0.4%' }}>
                                            Ninguna de las anteriores
                                        </div>
                                    </label>

                                    <label style={{ display: 'flex' }}>
                                        <HiddenRadioButton
                                            type="checkbox"
                                            checked={opcion4}
                                            onChange={Opcion4}
                                            style={{ marginRight: '2%' }}
                                        />
                                        <StyledRadioButton checked={opcion4} />
                                        <div style={{ marginBottom: '0.4%' }}>
                                            Otro
                                        </div>
                                    </label>
                                </div>
                            </Container>

                            <Container style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoCargaDatos'>
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

                            <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoCuadroComentarios'>
                                <Col style={{marginLeft: 'unset', marginRight: 'unset'}}>
                                    <p>4. Pregunta 4</p>
                                </Col>
                                <StyledTextarea
                                    className="textodePregunta"
                                    readOnly
                                    rows={5}
                                />
                            </Container>
                        </Col>
                    </Container>

                    <Button 
                        className='button-siguiente-resultadoEncuesta' 
                        onClick={handleSiguienteClick}
                    >
                        Siguiente
                    </Button>
                </div>
            )}

            {mostrarResultado2 && <ResultadoEncuesta2
                    handleRegresar={handleRegresarClick}
                />
            }
        </div>
    )
}

export default ResultadoEncuesta
