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
  cursor: pointer;

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

const contieneNingunaDeLasAnterioresOtraRespuesta = (contentCont) => {
  // Itera sobre contentCont, preguntas y opcionesRespuesta
  for (const contenedor of contentCont) {
    for (const pregunta of contenedor.preguntas) {
      for (const opcion of pregunta.opcionesRespuesta) {
        if (opcion.respuesta === 'Ninguna de las anteriores' || opcion.respuesta === 'Otra respuesta') {
          return true; // Si se encuentra una de las respuestas, devuelve true
        }
      }
    }
  }
  return false; // Si no se encuentra ninguna, devuelve false
};

const obtenerTodasLasOpcionesRespuesta = (contentCont) => {
  const todasLasOpcionesRespuesta = [];

  // Itera sobre contentCont, preguntas y opcionesRespuesta
  for (const contenedor of contentCont) {
    for (const pregunta of contenedor.preguntas) {
      todasLasOpcionesRespuesta.push(...pregunta.opcionesRespuesta);
    }
  }

  return todasLasOpcionesRespuesta;
};

const VistaPrevia = ({ 
  contentContInit, 
  estilos, 
  starFillSVG, 
  squareFillSVG, 
  circleFillSVG, 
  triangleFillSVG,
}) => {
    const tituloRef = useRef(null);
    const descripcionRef = useRef(null);
    const preguntasRef = useRef(null);
    const [tipoIcono, setTipoIcono] = useState()
    const [configuracion4, setConfiguracion4] = useState(false); 
    const [configuracion5, setConfiguracion5] = useState(false);
    const [contentCont, setContentCont] = useState(contentContInit)
    const [opcionesRespuesta, setOpcionesRespuesta] = useState(obtenerTodasLasOpcionesRespuesta(contentCont));
    // console.log('opcionesRespuesta -->>', opcionesRespuesta)

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

      if (contentCont) {
        // Verifica si alguna opción cumple con la lógica en todos los contentCont
        const contieneNingunaOtra = contieneNingunaDeLasAnterioresOtraRespuesta(contentCont);
  
        // Puedes utilizar contieneNingunaOtra como necesites en tu componente
        setConfiguracion4(contieneNingunaOtra);
        setConfiguracion5(contieneNingunaOtra);
      }
  }, [estilos, contentCont]);

  if (!Array.isArray(contentCont) || contentCont.length === 0) {
    return null;
  }
  // console.log('contentCont: ', contentCont)

  const handleOpcionChangeOM = (opcion, idOpcionRespuesta, value, checked, type) => {
    if ((type === 'checkbox') && (checked === false)) {
      opcion.checked = true
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
          opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : { ...opcion, checked: false }
        )
      );
    } else if ((type === 'checkbox') && (checked === true)) {
      opcion.checked = false
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
          opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: !checked } : { ...opcion, checked: false }
        )
      );
    } 
    
    
    else if ((type === 'radio') && (checked === false)) {
      opcion.checked = true
          
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) => {
          if (opcion && !opcion.checked === true) { // Verifica si 'opcion' existe antes de acceder a 'checked'
            opcion.checked = false
            console.log('No seleccionado:', opcion);
          }
          return opcion; // Importante devolver la opción después de modificarla
        })
      );
    }
    
    // opcionesRespuesta.map((opcion) => {
    //   if (!opcion.checked === true) {
    //     opcion.checked = false
    //     console.log('No seleccionado:', opcion);
    //   }
    // });
    
    // else if ((type === 'radio') && (checked === true) && (idOpcionRespuesta)) {
    //   opcion.checked = false
    //   setOpcionesRespuesta((prevOpciones) =>
    //     prevOpciones.map((opcion) =>
    //       opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
    //     )
    //   );
    // }
    console.log('opcion -->>', opcion)
    console.log('opcionesRespuesta -->>', opcionesRespuesta)
  };

  const handleOpcionChangeVE = (opcion, idOpcionRespuesta, value, checked) => {
    if (opcion.checked === false) {
      // opcion.checked === true
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
        )
      );
    } else if (checked === true) {
      // opcion.checked === false
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((opcion) =>
            opcion.idOpcionRespuesta === idOpcionRespuesta ? { ...opcion, checked: true } : { ...opcion, checked: false }
        )
      );
    }
    console.log(opcion)
  };

  const iconoSVG = {
    star: starFillSVG,
    square: squareFillSVG,
    circle: circleFillSVG,
    triangle: triangleFillSVG,
  };

  const handleIconFClick = (opcion) => {
    if (opcion.selectedColor === opcion.colorDefault) {
      opcion.selectedColor = opcion.colorOpcion;
      setOpcionesRespuesta((prevOpciones) =>
      prevOpciones.map((prevOpcion) =>
        prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
          ? {
              ...prevOpcion,
              selectedColor:
                prevOpcion.selectedColor === prevOpcion.colorDefault
                  ? prevOpcion.colorOpcion
                  : prevOpcion.colorDefault,
            }
            : prevOpcion
        ) 
      );

    } else if (opcion.selectedColor === opcion.colorOpcion) {
      opcion.selectedColor = opcion.colorDefault;
      setOpcionesRespuesta((prevOpciones) =>
      prevOpciones.map((prevOpcion) =>
        prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
          ? {
              ...prevOpcion,
              selectedColor:
                prevOpcion.selectedColor === prevOpcion.colorOpcion
                  ? prevOpcion.colorDefault
                  : prevOpcion.colorOpcion,
            }
            : prevOpcion
        ) 
      );
    }
  };

  const handleIconMouseOver = (opcion) => {
    if (opcion.colorDefault) {
      opcion.hoverColor = opcion.colorOpcion;
      setOpcionesRespuesta((prevOpciones) =>
        prevOpciones.map((prevOpcion) =>
          prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
            ? {
                ...prevOpcion,
                hoverColor: opcion.colorOpcion,
              }
            : prevOpcion
        )
      );
    }
  };
  
  const handleIconMouseLeave = (opcion) => {
    if (opcion.colorOpcion) {
      opcion.hoverColor = null;
      setOpcionesRespuesta((prevOpciones) =>
          prevOpciones.map((prevOpcion) =>
              prevOpcion.idOpcionRespuesta === opcion.idOpcionRespuesta
                  ? {
                        ...prevOpcion,
                        hoverColor: null,
                    }
                  : prevOpcion
          )
      );
    }
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

                  {Array.isArray(seccion.preguntas) &&
                    seccion.preguntas.map((pregunta, indicePreg) => {
                      if (pregunta.tipo === 'OM' && pregunta.save) {
                          return (
                              <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                {pregunta.opcionesRespuesta.map((opcion) => (
                                  <Col key={opcion.id} style={{ display: 'flex', marginBottom: '1%' }}>
                                    {opcion.type === 'checkbox' ? (
                                      // Opción de tipo "checkbox"
                                      <div >
                                        <HiddenCheckBox
                                          type={opcion.type}
                                          name={`opcion_${index}`}
                                          value={opcion.id}
                                          checked={opcion.checked}
                                        />
                                        <StyledCheckBox checked={opcion.checked} 
                                        onClick={() => handleOpcionChangeOM(opcion, opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'checkbox')}
                                        />
                                      </div>
                                    ) : (
                                      // Opción de tipo "radio"
                                      <div >
                                        <HiddenRadioButton
                                          type={opcion.type}
                                          name={`opcion_${index}`}
                                          value={opcion.id}
                                          checked={opcion.checked}
                                        />
                                        <StyledRadioButton checked={opcion.checked} 
                                          onClick={() => handleOpcionChangeOM(opcion, opcion.idOpcionRespuesta, opcion.respuesta, opcion.checked, 'radio')}
                                        />
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
                          const {opcionesRespuesta} = pregunta;
                          return (
                            <Container style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p ref={preguntasRef}>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                <Col style={{ display: 'flex' }}>
                                {opcionesRespuesta.map((opcion) => (
                                  opcion.respuesta !== 'Ninguna de las anteriores' &&
                                  opcion.respuesta !== 'Otra respuesta' && (
                                    <Col key={opcion.index} style={{ marginRight: '2%' }}>
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
                                                    fill: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                    stroke: opcion.hoverColor || opcion.selectedColor || opcion.colorDefault,
                                                }}
                                                onMouseOver={() => handleIconMouseOver(opcion)}
                                                onMouseLeave={() => handleIconMouseLeave(opcion)}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                    iconoSVG[opcion.selectedIcon] ||
                                                    (tipoIcono ? iconoSVG[tipoIcono.find((enumGrafico) => enumGrafico.id === opcion.enumGrafico)?.etiqueta] : '') ||
                                                    opcion.enumGrafico,
                                                }}
                                                onClick={() => handleIconFClick(opcion)}
                                            />
                                        </div>
                                      </Col>
                                    </Col>
                                  )))}
                                </Col>
                                
                                {configuracion4 && (
                                  <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                      <Col style={{ display: 'flex' }}>
                                          <div>
                                              <HiddenRadioButton
                                                  type={opcionesRespuesta.type}
                                                  checked={opcionesRespuesta.checked}
                                                  onChange={() =>
                                                      handleOpcionChangeVE(
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

                                {configuracion5 && (
                                  <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                      <Col style={{ display: 'flex' }}>
                                          <div>
                                              <HiddenRadioButton
                                                  type={opcionesRespuesta.type}
                                                  checked={opcionesRespuesta.checked}
                                                  onChange={() =>
                                                      handleOpcionChangeVE(
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
