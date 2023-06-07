import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Demografia = () => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className='modal'>
        <Button onClick={() => setLgShow(true)}>
          Demografía
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

export default Demografia
