import React, { useEffect, useRef, useState } from 'react'
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

const VistaPrevia = ({ 
  contentCont, 
  estilos, 
  starFillSVG, 
  squareFillSVG, 
  circleFillSVG, 
  triangleFillSVG, 
  configuracion4Activa,
  configuracion5Activa,
  opcionesRespuestaInit
}) => {
    const tituloRef = useRef(null);
    const descripcionRef = useRef(null);
    const preguntasRef = useRef(null);
    const [tipoIcono, setTipoIcono] = useState()
    const [opcionesRespuesta, setOpcionesRespuesta] = useState(opcionesRespuestaInit);
    console.log(configuracion4Activa)
    console.log(configuracion5Activa)

    useEffect(() => {
      if (estilos['Título de sección']) {
          const { tamano, tipografia, grosor } = estilos['Título de sección'];
          if (tituloRef.current) {
              tituloRef.current.style.fontSize = `${tamano}px`;
              tituloRef.current.style.fontStyle = tipografia === 'Cursiva' ? 'italic' : 'normal';
              tituloRef.current.style.fontWeight = grosor;
          }
      }

      if (estilos['Descripción de sección']) {
          const { tamano, tipografia, grosor } = estilos['Descripción de sección'];
          if (descripcionRef.current) {
              descripcionRef.current.style.fontSize = `${tamano}px`;
              descripcionRef.current.style.fontStyle = tipografia === 'Cursiva' ? 'italic' : 'normal';
              descripcionRef.current.style.fontWeight = grosor;
          }
      }

      if (estilos['Preguntas']) {
        const {tamano, tipografia, grosor } = estilos ['Preguntas'];
        if (preguntasRef.current) {
            preguntasRef.current.style.fontSize = `${tamano}px`;
            preguntasRef.current.style.fontStyle = tipografia === 'Cursiva' ? 'italic' : 'normal';
            preguntasRef.current.style.fontWeight = grosor;
        }
      }

  }, [estilos]);

  if (!Array.isArray(contentCont) || contentCont.length === 0) {
    return null;
  }
  console.log('contentCont: ', contentCont)

  const handleOpcionChange = (idOpcionRespuesta, value, checked) => {
    setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
        )
    );
  };

  const iconoSVG = {
    star: starFillSVG,
    square: squareFillSVG,
    circle: circleFillSVG,
    triangle: triangleFillSVG,
  };

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
                  <p className='titulo-nuevaEncuesta' ref={tituloRef}>{seccion.titulo}</p>
                  <p style={{marginLeft:'1.4%'}} ref={descripcionRef}>{seccion.comentario}</p>

                  {Array.isArray(seccion.contentPreg) &&
                    seccion.contentPreg.map((pregunta, indicePreg) => {
                      if (pregunta.tipo === 'OM' && pregunta.save) {
                          return (
                              <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
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
                                      {opcion.respuesta}
                                    </div>
                                  </Col>
                                ))}
                              </Container>
                          );
                      } else if (pregunta.tipo === 'VE' && pregunta.save) {
                          const { opcionesRespuesta, ningunaOpcion, otro } = pregunta;
                          return (
                            <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                <Col style={{ display: 'flex' }}>
                                {opcionesRespuesta.map((opcion, index) => (
                                  opcion.respuesta !== 'Ninguna de las anteriores' &&
                                  opcion.respuesta !== 'Otra respuesta' && (
                                    <Col key={opcion.id} style={{ marginRight: '2%' }}>
                                      <Col>
                                        <div style={{ textAlign: 'center' }}>
                                            {opcion.respuesta}
                                        </div>
                                        <br />
                                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                                            <span
                                                style={{
                                                    marginLeft: '2%',
                                                    cursor: 'pointer',
                                                    marginTop: '0.8%',
                                                    fill: opcion.selectedColor,
                                                    stroke: opcion.selectedColor,
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                    iconoSVG[opcion.selectedIcon] ||
                                                    (tipoIcono ? iconoSVG[tipoIcono.find((icono) => icono.id === opcion.icono)?.etiqueta] : '') ||
                                                    opcion.icono,
                                                }}
                                            />
                                        </div>
                                      </Col>
                                    </Col>
                                  )))}
                                </Col>
                                
                                {configuracion4Activa && (
                                  <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                      <Col style={{ display: 'flex' }}>
                                          <div>
                                              <HiddenRadioButton
                                                  type={opcionesRespuesta.type}
                                                  checked={opcionesRespuesta.checked}
                                                  onChange={() =>
                                                      handleOpcionChange(
                                                      opcionesRespuesta.idOpcionRespuesta,
                                                      opcionesRespuesta.respuesta,
                                                      opcionesRespuesta.checked
                                                      )
                                                  }
                                              />
                                              <StyledRadioButton checked={opcionesRespuesta.checked} />
                                          </div>
                                          <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                              Ninguna de las anteriores
                                          </div>
                                      </Col>
                                  </Col>
                                )}

                                {configuracion5Activa && (
                                  <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                      <Col style={{ display: 'flex' }}>
                                          <div>
                                              <HiddenRadioButton
                                                  type={opcionesRespuesta.type}
                                                  checked={opcionesRespuesta.checked}
                                                  onChange={() =>
                                                      handleOpcionChange(
                                                      opcionesRespuesta.idOpcionRespuesta,
                                                      opcionesRespuesta.respuesta,
                                                      opcionesRespuesta.checked
                                                      )
                                                  }
                                              />
                                              <StyledRadioButton checked={opcionesRespuesta.checked} />
                                          </div>
                                          <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                              Otra respuesta
                                          </div>
                                      </Col>
                                  </Col>
                                )}
                            </Container>
                          );
                      } else if (pregunta.tipo === 'CA' && pregunta.save) {
                        return (
                          <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%', paddingBottom: '1.1%'}} className='container-resultadoCargaDatos'>
                              <Col
                                style={{marginLeft: 'unset', marginRight: 'unset'}}
                              >
                                <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
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
                                  <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
                              </Col>
                              <textarea
                                  style={{ width: '98.8%', border: '1px solid #ccc' }}
                                  className="textodePregunta"
                                  value={pregunta.respuesta}
                                  readOnly
                                  rows={5} // Ajusta el número de filas según tus necesidades
                              />
                              {console.log(pregunta.respuesta)}
                          </Container>
                        )
                      } return null;
                  })}
                </Col>
              )
            )}
        </Container>
    </>
  )
};

export default VistaPrevia
