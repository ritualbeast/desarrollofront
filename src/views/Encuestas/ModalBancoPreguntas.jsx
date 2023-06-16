import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal, Menu, MenuItem, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import svgManager from '../../assets/svg';
import '../../styles/modalBancopreguntas.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const alertSVG = svgManager.getSVG('alert');
const xSVG = svgManager.getSVG('x');


const ModalBancoPreguntas = ({ open, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const data = [
    {
      pregunta: 'Lorem ipsum 1',
      respuestas: ['Mostrar respuestas 1', 'Respuesta 1 de la pregunta 1', 'Respuesta 2 de la pregunta 1']
    },
    {
      pregunta: 'Lorem ipsum 2',
      respuestas: ['Mostrar respuestas 2', 'Respuesta 1 de la pregunta 2', 'Respuesta 2 de la pregunta 2']
    },
    // Agrega más objetos de datos aquí si es necesario
  ];

  const rows = Math.ceil(data.length / 2); // Calcular el número de filas


  return (
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
          <Row className='modalbancopreguntas_rowtitle'>
            <Grid  className='modalbancopreguntas_coltitle'>
              <p>Banco de preguntas</p>
            </Grid>
            <Grid  className='modalbancopreguntas_coltitle2'>
              <span dangerouslySetInnerHTML={{ __html: xSVG }} onClick={onClose} />
            </Grid>
          </Row>

          <Row className='modalbancopreguntas_rowfiltro'>
            <Col xs={3} className='modalbancopreguntas_col1'>
              <select className='modalbancopreguntas_select'>
                <option value="todas">Todas las categorias</option>
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
              </select>
            </Col>
            <Col xs={9} className='modalbancopreguntas_col2'>
              <input className='modalbancopreguntas_input' type="text" placeholder="Buscar preguntas" />
            </Col>
          </Row>

          <Row className='modalbancopreguntas_rowtitle2'>
            <Col className='modalbancopreguntas_coltitle2x'>
              <p>Selecciona una o varias preguntas</p>
            </Col>
            <Col className='modalbancopreguntas_coltitle3'>
              <p className='modalbancopreguntas_seleccionadas'>2 seleccionadas</p>
              <p className='modalbancopreguntas_preguntastotal'>0 Preguntas</p>
            </Col>
          </Row>
          
          <Container className='modalbancopreguntas_divpreguntas'>
            <Row className='modalbancopreguntas_rowpreguntas'>
             <Col className='modalbancopreguntas_colpreguntas' md={6}>
                    <div className='modalbancopreguntas_divpreguntas'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        Mostrar respuestas
                      </AccordionSummary>
                      <AccordionDetails className='modalbancopreguntas_acordion'>
                        <ul className='modalbancopreguntas_ul'>
                          <li className='modalbancopreguntas_li'>Respuesta 1 de la pregunta 1</li>
                          <li className='modalbancopreguntas_li'>Respuesta 2 de la pregunta 1</li>
                        </ul>
                      </AccordionDetails>

                    </Accordion>
                    </div>
                  </Col>
                  <Col className='modalbancopreguntas_colpreguntas' md={6}>
                    <div className='modalbancopreguntas_divpreguntas'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <p className='modalbancopreguntas_p'>Mostrar respuestas</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='modalbancopreguntas_p'>Respuesta 1 de la pregunta 1</p>
                        <p className='modalbancopreguntas_p'>Respuesta 2 de la pregunta 1</p>
                      </AccordionDetails>
                    </Accordion>
                    </div>
                  </Col>
                  <Col className='modalbancopreguntas_colpreguntas' md={6}>
                    <div className='modalbancopreguntas_divpreguntas'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <p className='modalbancopreguntas_p'>Mostrar respuestas</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='modalbancopreguntas_p'>Respuesta 1 de la pregunta 1</p>
                        <p className='modalbancopreguntas_p'>Respuesta 2 de la pregunta 1</p>
                      </AccordionDetails>
                    </Accordion>
                    </div>
                  </Col>
                  <Col className='modalbancopreguntas_colpreguntas' md={6}>
                    <div className='modalbancopreguntas_divpreguntas'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <p className='modalbancopreguntas_p'>Mostrar respuestas</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='modalbancopreguntas_p'>Respuesta 1 de la pregunta 1</p>
                        <p className='modalbancopreguntas_p'>Respuesta 2 de la pregunta 1</p>
                      </AccordionDetails>
                    </Accordion>
                    </div>
                  </Col>
              </Row>
          </Container>
           
          <Row>
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className='buttoncancelarEncuestas'
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                className='buttondeleteEncuestas'
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Agregar pregunta/s
              </Button>
            </Col>
          </Row>
        </Container >
      </Box>
    </Modal >
  );
};


export default ModalBancoPreguntas;
