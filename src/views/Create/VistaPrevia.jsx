import React from 'react'
import { Button, Container, Col } from 'react-bootstrap';
import styled from 'styled-components';

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

const VistaPrevia = ({contentCont, showModal}) => {
  if (!Array.isArray(contentCont) || contentCont.length === 0) {
    return null;
  }

  return (
    <>
        <Container>
            <Col>
                <p className='titulo-encuesta-tercero'>Encuesta Veris</p>
                <p style={{marginLeft:'1.4%'}}>Encuesta enfocada en colaboradores de Veris, para cononcer el clima laboral, es de carácter obligatorio.</p>
            </Col>

            {Array.isArray(contentCont) &&
              contentCont.map((seccion, index) => (
                <Col key={index} id={`Sec${index + 1}`}>
                  <p className='titulo-nuevaEncuesta'>Sección {index + 1}</p>
                  <p style={{marginLeft:'1.4%'}}>Preguntas enfocadas en las actividades que realizó en el ultimo trimestre</p>

                  {Array.isArray(seccion.contentPreg) &&
                    seccion.contentPreg.map((pregunta, indicePreg) => {
                      if (pregunta.tipo === 'OM' && pregunta.save) {
                          return (
                              <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                {pregunta.opcionesRespuesta.map((opcion, indiceOpcion) => (
                                  <Col key={opcion.id} style={{ display: 'flex', marginBottom: '1%' }}>
                                  {opcion.type === 'checkbox' ? (
                                    // Opción de tipo "checkbox"
                                    <div>
                                      <HiddenCheckBox
                                        type={opcion.type}
                                        name={`opcion_${index}`}
                                        value={opcion.id}
                                        checked={opcion.checked}
                                        onChange={() => {}}
                                      />
                                      <StyledCheckBox checked={opcion.checked} />
                                    </div>
                                  ) : (
                                    // Opción de tipo "radio"
                                    <div>
                                      <HiddenRadioButton
                                        type={opcion.type}
                                        name={`opcion_${index}`}
                                        value={opcion.id}
                                        checked={opcion.checked}
                                        onChange={() => {}}
                                      />
                                      <StyledRadioButton checked={opcion.checked} />
                                    </div>
                                  )}
                                  <div style={{ marginBottom: '0.4%', marginLeft: '2%'}}>
                                    {opcion.text}
                                  </div>
                                </Col>
                                ))}
                              </Container>
                          );
                      } else if (pregunta.tipo === 'VE' && pregunta.save) {
                          const { opciones, ningunaOpcion, otro } = pregunta;
                          if (!Array.isArray(opciones) || opciones.length === 0) {
                            return null;
                          }
                          return (
                            <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                <Col style={{ display: 'flex' }}>
                                  {opciones.map((opcion) => (
                                    <Col key={opcion.id} style={{ marginRight: '2%' }}>
                                      <Col>
                                        <div style={{ marginBottom: '25%', textAlign: 'center' }}>
                                          {opcion.text}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                          <span
                                            style={{
                                              marginLeft: '2%',
                                              cursor: 'pointer',
                                              marginTop: '0.8%',
                                              // fill: color[opcion.icono],
                                              // stroke: color[opcion.icono],
                                            }}
                                            dangerouslySetInnerHTML={{
                                              // __html: selectedIcon[opcion.icono] || opcion.icono,
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Col>
                                  ))}
                                </Col>

                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{display: 'flex'}}>
                                        <div>
                                            <HiddenRadioButton
                                                type="radio"
                                                checked={ningunaOpcion}
                                                // onChange={Opcion1}
                                            />
                                            <StyledRadioButton checked={ningunaOpcion} />
                                        </div>
                                        <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                            Ninguna Opcion
                                        </div>
                                    </Col>
                                </Col>

                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                    <Col style={{display: 'flex'}}>
                                        <div>
                                            <HiddenRadioButton
                                                type="radio"
                                                checked={otro}
                                                // onChange={Opcion2}
                                            />
                                            <StyledRadioButton checked={otro} />
                                        </div>
                                        <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                            Otro
                                        </div>
                                    </Col>
                                </Col>
                            </Container>
                          );
                      } else if (pregunta.tipo === 'CA' && pregunta.save) {
                        return (
                          <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%'}} className='container-resultadoCargaDatos'>
                              <Col
                                style={{marginLeft: 'unset', marginRight: 'unset'}}
                              >
                                  <p>{indicePreg + 1}. {pregunta.pregunta}</p>
                              </Col>
                              <p>{pregunta.pregunta2}</p>

                              <Button className='buttonElegirArchivo'>
                                Elegir archivo
                              </Button>
                          </Container>
                        );
                      } else if (pregunta.tipo === 'CC' && pregunta.save) {
                        return (
                          <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoCuadroComentarios'>
                              <Col
                                style={{marginLeft: 'unset', marginRight: 'unset'}}
                              >
                                  <p>{indicePreg + 1}. {pregunta.pregunta}</p>
                              </Col>
                              <textarea
                                  style={{ width: '98.8%', border: '1px solid #ccc' }}
                                  className="textodePregunta"
                                  readOnly
                                  rows={5} // Ajusta el número de filas según tus necesidades
                              />
                          </Container>
                        )
                      }
                      return null;
                  })}
                </Col>
              )
            )}
        </Container>
    </>
  )
}

export default VistaPrevia
