import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Box, Modal, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import svgManager from '../../assets/svg';
import '../../styles/modalBancopreguntas.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ListarCategoriasService} from '../../services/EncuestasServices';
import checkcircle from '../../assets/img/check-circle.png';
import { BancoPreguntas } from '../../services/PreguntaServices';
import Select from 'react-select';
import styled from 'styled-components';

const xSVG = svgManager.getSVG('x');

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '96%'
  }),
  control: (provided, state) => ({
    ...provided,
    width:'102.5%',
    backgroundColor: 'white',
    color: 'black',
    borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 206, 72, 0.2)' : 'none',
    "&:hover": {
      borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    paddingTop:'unset',
    paddingBottom:'unset',
    color: state.isFocused ? 'black' : 'black',
    backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
  })
};

const BuscarPreguntas = styled.input`
    width: 100% !important;
    height: 50% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const ModalBancoPreguntas = ({ open, onClose, categoriaId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [listarCategoriaEncuestas, setListarCategoriaEncuestas] = useState([]);
  const [clickedElements, setClickedElements] = useState({});
  const [listarBancoPreguntas, setListarBancoPreguntas] = useState([]);
  const [selectedCategoriaEncuesta, setSelectedCategoriaEncuesta] = useState({
      value: '',
      label: 'Todas las categorías',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = (id, preguntaItem) => {
    setClickedElements((prevState) => {
      // Comprueba si el elemento ya ha sido seleccionado
      if (prevState[id]) {
        // Si ya ha sido seleccionado, elimínalo del estado
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      } else {
        // Si no ha sido seleccionado, agrégalo al estado con toda la información
        return { ...prevState, [id]: preguntaItem };
      }
    });
  };

  const countClickedElements = Object.keys(clickedElements).length;

  useEffect(() => {
    const ListarCategoriaEncuesta = async () => {
      try {
        const response = await ListarCategoriasService();
        setListarCategoriaEncuestas(response.data.row);
        
        // Busca la categoría correspondiente al ID y establece el valor y el nombre
        const matchingCategoria = response.data.row.find((item) => item.idCategoriaEncuesta === categoriaId);
        if (matchingCategoria) {
          setSelectedCategoriaEncuesta({
            value: matchingCategoria.idCategoriaEncuesta,
            label: matchingCategoria.nombre,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const BancoPreguntaEncuesta = async (idCategoria) => {
      try {
        const response = await BancoPreguntas(idCategoria);
        setListarBancoPreguntas(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    ListarCategoriaEncuesta();
    BancoPreguntaEncuesta(categoriaId);
  }, [categoriaId]);

  const handleChangeCategoria = async(selectedOption) => {
    const selectedIdCategoria = selectedOption.value;
    setSelectedCategoriaEncuesta(selectedOption);
    try {
      const response = await BancoPreguntas(selectedIdCategoria);
      setListarBancoPreguntas(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuscarPreguntas = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleGuardar = () => {
    const preguntasSeleccionadas = Object.values(clickedElements).map((preguntaItem) => {
      const tipoPregunta = preguntaItem.tipoPregunta;
  
      if (tipoPregunta === 'OM') {
        const opcionesRespuesta = preguntaItem.opcionesRespuesta || []; // Asegúrate de que opcionesRespuesta esté definido
        const opcionesConCamposAdicionales = opcionesRespuesta.map((opcion) => ({
            ...opcion,
            checked: false,
            type: 'radio',
        }));
        return {
          ...preguntaItem,
          opcionesRespuesta: opcionesConCamposAdicionales,
          // Propiedades adicionales específicas para el tipo 'OM'
          save: true,
          cancelar: true,
          configuracionPregunta: {},
          mensajeError: '',
          mensajeErrorRequerido: '',
          multipleRespuesta: '',
          nemonico: "1S_1P",
          orden: '',
          pesoArchivo: "",
          placeHolder: "seleccione",
          preguntasComplementarias: [],
          ponderacion: "",
          requerida: true,
          tipoArchivo: "",
        };
      } else if (tipoPregunta === 'VE') {
        const opcionesRespuesta = preguntaItem.opcionesRespuesta || []; // Asegúrate de que opcionesRespuesta esté definido
        const opcionesConCamposAdicionales = opcionesRespuesta.map((opcion) => ({
            ...opcion,
            selectedIcon: 'star',
            colorDefault: "#e0dcdc",
            selectedColor: "#e0dcdc",
        }));

        return {
          ...preguntaItem,
          opcionesRespuesta: opcionesConCamposAdicionales,
          // Propiedades adicionales específicas para el tipo 'VE'
          save: true,
          cancelar: true,
          mensajeError: '',
          mensajeErrorRequerido: '',
          nemonico: "1S_1P",
          orden: '',
          pesoArchivo: "",
          placeHolder: "seleccione",
          preguntasComplementarias: [],
          ponderacion: "",
          requerida: "",
          tipoArchivo: "",
          configuracionPregunta: '',
        };
      }

      return {
        ...preguntaItem,
      };

    });
    onClose(preguntasSeleccionadas)
    setClickedElements({});
    setBlurBackground(false);
    setIsModalVisible(false);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      BackdropProps={{
        onClick: () => {
          setBlurBackground(false);
          setIsModalVisible(false);
        },
        sx: {
          backdropFilter: 'blur(5px)', // Para aplicar un desenfoque al fondo de la modal
        },
      }}
    >
      <Box
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '80%',
          height: '90%',
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
              <span style={{cursor:'pointer'}} dangerouslySetInnerHTML={{ __html: xSVG }} onClick={onClose} />
            </Grid>
          </Row>

          <Row className='modalbancopreguntas_rowfiltro'>
            <Col xs={3} className='modalbancopreguntas_col1'>
                <Select 
                    className='modalbancopreguntas_select'
                    styles={customStyles}
                    onChange={handleChangeCategoria} 
                    options={listarCategoriaEncuestas.map((item) => ({
                        label: item.nombre,
                        value: item.idCategoriaEncuesta,
                    }))}
                    value={selectedCategoriaEncuesta}
                />
            </Col>
            <Col xs={9} className='modalbancopreguntas_col2'>
                <BuscarPreguntas 
                  className='modalbancopreguntas_input' 
                  type="text" 
                  placeholder="Buscar preguntas" 
                  value={searchTerm}
                  onChange={handleBuscarPreguntas}
                />
                <SearchIcon className="search-icon" onClick={handleBuscarPreguntas} style={{
                  width: '4% !important',
                  marginTop: '0.2%',
                  cursor: 'pointer',
                  right: '1%',
                }} />
            </Col>
          </Row>

          <Row className='modalbancopreguntas_rowtitle2'>
            <Col className='modalbancopreguntas_coltitle2x'>
              <p>Selecciona una o varias preguntas</p>
            </Col>
            <Col className='modalbancopreguntas_coltitle3'>
              <p className='modalbancopreguntas_seleccionadas'> {countClickedElements} seleccionadas</p>
              <p className='modalbancopreguntas_preguntastotal'>{listarBancoPreguntas.length} Preguntas</p>
            </Col>
          </Row>
          
          <Container className='modalbancopreguntas_divpreguntas'>
              <Row className='modalbancopreguntas_rowpreguntas'>
                  {listarBancoPreguntas
                  .filter((preguntaItem) => preguntaItem.pregunta.includes(searchTerm))
                  .map((preguntaItem, index) => (
                      <Col
                        md={6}
                        key={index}
                        className={`modalbancopreguntas_colpreguntas ${clickedElements[`element${index}`] ? 'clicked' : ''}`}
                        onClick={() => handleClick(`element${index}`, preguntaItem)}
                      >
                        {clickedElements[`element${index}`] ? (
                          <div className='modalbancopreguntas_checkicon'>
                            <Image src={checkcircle} width="40px" height="40px" alt="checkcircle" />
                          </div>
                        ) : null}

                        <div className='modalbancopreguntas_divpreguntasbody'>
                          {preguntaItem.pregunta}
                        </div>

                        <div className='modalbancopreguntas_divmenudesplegable'>
                          <Accordion className = 'modalbancopreguntas_divmenudesplegableSelect'>
                            <AccordionSummary
                              expandIcon= {<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              onClick={(event) => event.stopPropagation()} 
                              style={{ minHeight: '10px' }}
                            >
                              Mostrar respuestas
                            </AccordionSummary>

                            <AccordionDetails className='modalbancopreguntas_acordion'>
                              <ul className='modalbancopreguntas_ul'>
                                  {preguntaItem.opcionesRespuesta.map((respuesta, respuestaIndex) => (
                                    <li key={respuestaIndex} className='modalbancopreguntas_li'>{respuesta.respuesta}</li>
                                  ))}
                              </ul>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </Col>
                  ))}
              </Row>
          </Container>
           
          <Row className='modalbancopreguntas_rowpaginacion'>
            <Col className='modalbancopreguntas_colpaginacion'>
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
                onClick={handleGuardar}
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
