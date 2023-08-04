import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap';
import '../../styles/resultadoEncuesta.css'
import svgManager from '../../assets/svg';
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

const ResultadoEncuesta2 = ({handleRegresar}) => {
    const [opcion5, setOpcion5] = useState(false);
    const [opcion6, setOpcion6] = useState(false);
    const [opcion7, setOpcion7] = useState(false);
    const [opcion8, setOpcion8] = useState(false);

    const Opcion5 = () => {
        setOpcion5(!opcion5);
    };

    const Opcion6 = () => {
        setOpcion6(!opcion6);
    };

    const Opcion7 = () => {
        setOpcion7(!opcion7);
    };

    const Opcion8 = () => {
        setOpcion8(!opcion8);
    };

    const handleResgresarClick = () => {
        handleRegresar();
    }
  return (
    <div className='global-resultadoEncuesta'>
            <Container className='container_resultadoEncuesta'>
                <Col className='contenedor-preguntas-fin'>
                    <p className='titulo-nuevaEncuesta'>Sección 2</p>
                    <p style={{marginLeft:'1.4%'}}>Preguntas enfocadas en las actividades que realizó en el ultimo trimestre</p>
    
                    <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>5. Pregunta 5</p>
                        </Col>

                        <div>
                            <label style={{ display: 'flex' }}>
                                <HiddenCheckBox
                                    type="checkbox"
                                    checked={opcion5}
                                    onChange={Opcion5}
                                    style={{ marginRight: '2%' }}
                                />
                                <StyledCheckBox checked={opcion5} />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <HiddenCheckBox
                                    type="checkbox"
                                    checked={opcion6}
                                    onChange={Opcion6}
                                    style={{ marginRight: '2%' }}
                                />
                                <StyledCheckBox checked={opcion6} />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoOpcionMultiple'>
                        <Col>
                            <p>6. Pregunta 6</p>
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
                                    checked={opcion7}
                                    onChange={Opcion7}
                                    style={{ marginRight: '2%' }}
                                />
                                <StyledRadioButton checked={opcion7} />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 1
                                </div>
                            </label>

                            <label style={{ display: 'flex' }}>
                                <HiddenRadioButton
                                    type="checkbox"
                                    checked={opcion8}
                                    onChange={Opcion8}
                                    style={{ marginRight: '2%' }}
                                />
                                <StyledRadioButton checked={opcion8} />
                                <div style={{ marginBottom: '0.4%' }}>
                                    Respuesta 2
                                </div>
                            </label>
                        </div>
                    </Container>

                    <Container style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoCargaDatos'>
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

                    <Container style={{marginLeft:'1.4%', width: '92.8%', background:'rgba(245, 245, 245, 1)'}} className='container-resultadoCuadroComentarios'>
                        <Col
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                        >
                            <p>8. Pregunta 8</p>
                        </Col>
                        <StyledTextarea
                            className="textodePregunta"
                            readOnly
                            rows={5}
                        />
                    </Container>
                </Col>
            </Container>
            
            <div style={{display:'flex', flexFlow: 'row-reverse', marginRight: '20%' }}>
                <Button className='button-finalizar-resultadoEncuesta'>
                    Finalizar
                </Button>

                <Button 
                    className='button-regresar-resultadoEncuesta'
                    onClick={handleResgresarClick}
                >
                    Regresar
                </Button>
            </div>
            
    </div>
  )
}

export default ResultadoEncuesta2
