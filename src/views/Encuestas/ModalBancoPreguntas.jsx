import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';

const alertSVG = svgManager.getSVG('alert');
const ModalBancoPreguntas = ({ open, onClose }) => (
    
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
        width: '80%',
        height: '80%',
        overflow: 'auto',
      }}
    >
      <Container>
        <p>Banco de preguntas</p>
        <Row>
          <Col>
            <select>
              <option value="todas">Todas las categorias</option>


              </select>
          </Col>
          <Col>
            <input type="text" placeholder="Buscar preguntas" />
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
              Agregar pregunta/s
            </Button>
          </Col>
        </Row>
      </Container>
    </Box>
  </Modal>
  
);

export default ModalBancoPreguntas;
