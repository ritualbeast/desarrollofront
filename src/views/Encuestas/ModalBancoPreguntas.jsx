import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

import { Select, Pagination, Box, Modal, Menu, MenuItem, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import svgManager from '../../assets/svg';
import '../../styles/modalBancopreguntas.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ListarCategoriasService} from '../../services/EncuestasServices';
import checkcircle from '../../assets/img/check-circle.png';

const alertSVG = svgManager.getSVG('alert');
const xSVG = svgManager.getSVG('x');
const searchSVG = svgManager.getSVG('search');


const ModalBancoPreguntas = ({ open, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [listarCategoriaEncuestas, setListarCategoriaEncuestas] = useState([]);
  const [clickedElements, setClickedElements] = useState({});

  const handleClick = (id) => {
    setClickedElements((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const countClickedElements = Object.values(clickedElements).filter((value) => value === true).length;

  useEffect(() => {
    ListarCategoriaEncuesta();
  }, []);
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
   // crear consumo categoria de encuestas
 
   const ListarCategoriaEncuesta = async () => {
     try {
       const response = await  ListarCategoriasService();
       setListarCategoriaEncuestas(response.data.row);
     } catch (error) {
       console.error(error);
     }
   };

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
          resize: 'both',
          minWidth: '40%',
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
                {listarCategoriaEncuestas.map((item, index) => (
                  <option key={index} value={item.idCategoriaEncuesta}>{item.nombre}</option>
                ))  
                }
                
              </select>
            </Col>
            <Col xs={9} className='modalbancopreguntas_col2'>
              <input className='modalbancopreguntas_input' type="text" placeholder="Buscar preguntas" />
              <div className='modalbancopreguntas_searchIconContainer'>
                <span className='modalbancopreguntas_searchIcon'
                 dangerouslySetInnerHTML={{ __html: searchSVG }} />
              </div>
            </Col>
          </Row>

          <Row className='modalbancopreguntas_rowtitle2'>
            <Col className='modalbancopreguntas_coltitle2x'>
              <p>Selecciona una o varias preguntas</p>
            </Col>
            <Col className='modalbancopreguntas_coltitle3'>
              <p className='modalbancopreguntas_seleccionadas'> {countClickedElements} seleccionadas</p>
              <p className='modalbancopreguntas_preguntastotal'>0 Preguntas</p>
            </Col>
          </Row>
          
          <Container className='modalbancopreguntas_divpreguntas'>
            <Row className='modalbancopreguntas_rowpreguntas'>
                  <Col
                    md={6}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                  >
                    {clickedElements['element1'] ? (
                    <div className='modalbancopreguntas_checkicon'>
                      <Image src={checkcircle} width="40px" height="40px" alt="checkcircle" />
                      </div>
                    ) : null}
                    <div className='modalbancopreguntas_divpreguntasbody'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={(event) => event.stopPropagation()} 
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
                  <Col
                    md={6}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element2'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element2')}
                  >
                    {clickedElements['element2'] ? (
                    <div className='modalbancopreguntas_checkicon'>
                      <Image src={checkcircle} width="40px" height="40px" alt="checkcircle" />
                      </div>
                    ) : null}
                    <div className='modalbancopreguntas_divpreguntasbody'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={(event) => event.stopPropagation()} 
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
                  <Col
                    md={6}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element3'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element3')}
                  >
                    {clickedElements['element3'] ? (
                    <div className='modalbancopreguntas_checkicon'>
                      <Image src={checkcircle} width="40px" height="40px" alt="checkcircle" />
                      </div>
                    ) : null}
                    <div className='modalbancopreguntas_divpreguntasbody'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam pariatur molestiae quisquam ipsum iusto et quae deserunt hic magnam temporibus! Beatae ullam odio expedita dolor quos soluta autem inventore et?
                    </div>
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                      <AccordionSummary
                        expandIcon= {<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={(event) => event.stopPropagation()} 
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
              </Row>
          </Container>
           
          <Row className='modalbancopreguntas_rowpaginacion'>
            <Col className='modalbancopreguntas_colpaginacion' style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className='buttoncancelarEncuestas'
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                className={`buttondeleteEncuestas ${countClickedElements === 0 ? 'disabled' : ''}`}
                variant="contained"
                color="primary"
                onClick={onClose}
                disabled={countClickedElements === 0}
              >
                {countClickedElements === 0 ? 'Agregar pregunta/s' : `Agregar ${countClickedElements} pregunta${countClickedElements > 1 ? 's' : ''}`}
              </Button>


            </Col>
          </Row>
        </Container >
      </Box>
    </Modal >
  );
};


export default ModalBancoPreguntas;
