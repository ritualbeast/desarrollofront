import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';

const alertSVG = svgManager.getSVG('alert');
const ModalEliminarEncuestas = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80%',
        overflow: 'auto',
      }}
    >
      <Container>
        <Row>
          <Col className='modalEliminarencuesta_encabezado' >
            <span dangerouslySetInnerHTML={{ __html: alertSVG }} />
            <p className='modalEliminarencuesta_titulo'>Eliminar encuesta</p>
          </Col>
          <Col className='modalEliminarencuesta_encabezado'>
          <span />
          <p className='modalEliminarencuesta_titulo2'>¿Desea eliminar la encuesta seleccionada?</p>
          </Col>
        </Row>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            
            <Button
              className='buttoncancelarEncuesta'
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              className='buttondeleteEncuesta'
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </Container>
    </Box>
  </Modal>
);

export default ModalEliminarEncuestas;
