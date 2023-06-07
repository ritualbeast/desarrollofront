import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AsistenciaMedica = () => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className='modal'>
        <Button onClick={() => setLgShow(true)}>
          Asistencia Medica
        </Button>

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default AsistenciaMedica
