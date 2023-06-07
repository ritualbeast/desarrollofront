import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import '../../styles/bancoDePreguntas.css'

const BancodePreguntas = () => {
  const [lgShow, setLgShow] = useState(false);
  const [modals, setModals] = useState({
    preguntasUsadas: false,
    todasLasCategorias: false,
    asistenciaMedica: false,
    comentariosClientes: false,
    comunidad: false,
    demografia: false,
    educacion: false
  });

    return (
        <div className='contenedor'>
            <div className='row'>
              <>
                <Button onClick={() => setModals({ ...modals, preguntasUsadas: true })}>
                  Preguntas Usadas
                </Button>

                <Modal
                  size="lg"
                  show={modals.preguntasUsadas}
                  onHide={() => setModals({ ...modals, preguntasUsadas: false })}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Preguntas Usadas
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className='consulta-modal'>
                    <label htmlFor="reporte"></label>
                    <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar preguntas usadas previamente' />
                  </div>
                  </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, todasLasCategorias: true})}>
                    Todas las Categorias
                </Button>

                <Modal
                    size="lg"
                    show={modals.todasLasCategorias}
                    onHide={() => setModals({...modals, todasLasCategorias: false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Todas las Categorias
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de NotiSurvey' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, asistenciaMedica: true,})}>
                    Asistencia Médica
                </Button>

                <Modal
                    size="lg"
                    show={modals.asistenciaMedica}
                    onHide={() => setModals({...modals, asistenciaMedica: false,})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Asistencia Médica
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de Asistencia Médica' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, comentariosClientes: true})}>
                    Comentarios de Clientes
                </Button>

                <Modal
                    size="lg"
                    show={modals.comentariosClientes}
                    onHide={() => setModals({...modals, comentariosClientes: false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Comentarios de Clientes
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de Comentarios de Clientes' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, comunidad: true})}>
                    Comunidad
                </Button>

                <Modal
                    size="lg"
                    show={modals.comunidad}
                    onHide={() => setModals({...modals, comunidad: false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Comunidad
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de Comunidad' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, demografia: true})}>
                    Demografía
                </Button>
              
                <Modal
                    size="lg"
                    show={modals.demografia}
                    onHide={() => setModals({...modals, demografia: false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Demografia
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de Demografía' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>

              <>
                <Button onClick={() => setModals({...modals, educacion: true})}>
                    Educación
                </Button>

                <Modal
                    size="lg"
                    show={modals.educacion}
                    onHide={() => setModals({...modals, educacion: false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Educación
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='consulta-modal'>
                        <label htmlFor="reporte"></label>
                        <input className='input-modal' type="text" id='reporte' name='reporte' placeholder='Buscar en el Banco de Preguntas de Educación' />
                      </div>
                    </Modal.Body>
                </Modal>
              </>
            </div>
        </div>
    )
}

export default BancodePreguntas
