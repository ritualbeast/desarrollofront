import React from 'react'
import { Button, Container, Col } from 'react-bootstrap';

const VistaPrevia = ({contentCont, showModal}) => {
  if (!Array.isArray(contentCont) || contentCont.length === 0) {
    return null;
  }

  // if (!Array.isArray(showModal) || showModal.length === 0) {
  //   return null;
  // }
  console.log(contentCont)

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
                      if (pregunta.tipo === 'M' && pregunta.save) {
                          return (
                              <Container key={indicePreg} style={{marginLeft:'1.4%', width: '92.8%'}} className='container-resultadoOpcionMultiple'>
                                <Col>
                                  <p>{indicePreg + 1}. {pregunta.pregunta}</p>
                                </Col>

                                {pregunta.opcionesRespuesta.map((opcion, indiceOpcion) => (
                                  <Col key={indiceOpcion} style={{ display: 'flex' }}>
                                    <input
                                      type={opcion.type}
                                      name={`opcion_${index}`}
                                      value={opcion.id}
                                      checked={opcion.checked}
                                      onChange={() => {}}
                                      style={{marginRight: '2%'}}
                                    />
                                    <div style={{ marginBottom: '0.4%'}}>
                                      {opcion.text}
                                    </div>
                                  </Col>
                                ))}
                              </Container>
                          );
                      } else if (pregunta.tipo === 'V' && pregunta.save) {
                          const { opciones, ningunaOpcion, otraOpcion } = pregunta;
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
                                  <Col style={{ display: 'flex' }}>
                                    <div>
                                      <input
                                        type={ningunaOpcion.type}
                                        name={`opcion_${ningunaOpcion.id}`}
                                        value={ningunaOpcion.id}
                                        checked={ningunaOpcion.checked}
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                      {ningunaOpcion.text}
                                    </div>
                                  </Col>
                                </Col>

                                <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                                  <Col style={{ display: 'flex' }}>
                                    <div>
                                      <input
                                        type={otraOpcion.type}
                                        name={`opcion_${otraOpcion.id}`}
                                        value={otraOpcion.id}
                                        checked={otraOpcion.checked}
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                                      {otraOpcion.text}
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
