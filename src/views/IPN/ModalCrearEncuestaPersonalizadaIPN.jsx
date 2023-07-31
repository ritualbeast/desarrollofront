import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/modalCrearEncuestaPersonalizada.css';
import { ListarEncuestas } from '../../services/EncuestasServices';

const closeSVG = svgManager.getSVG('close');

const ModalCrearEncuestaPersonalizadaIPN = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [selectedOption, setSelectedOption] = useState(null);
  const [clickedElements, setClickedElements] = useState({});
  const [dataEncuestas, setDataEncuestas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    ListarEncuestasPublicas();

    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleCancelar = () => {
    onClose();
    setPreview(undefined)
    setSelectedFile(undefined)
  }

  const handleClick = (id) => {
    setSelectedOption((prevSelected) => {
      if (prevSelected === id) {
        setClickedElements((prevState) => ({
          ...prevState,
          [id]: false,
        }));
        return null;
      }
  
      const newState = {};
      Object.keys(clickedElements).forEach((key) => {
        newState[key] = key === id;
      });
      setClickedElements(newState);
  
      return id;
    });
  };    
  
  const ListarEncuestasPublicas = async () => {
    try {
      const response = await  ListarEncuestas('', '', '', 'nombre', '1', '50', 'S');
      setDataEncuestas(response.data.items);  
      console.log(response.data.items)    
    } catch (error) {
      console.error(error);
    }
  };

  const handleBusqueda = () => {
    const encuestasFiltradas = dataEncuestas.filter((encuesta) => {
      return encuesta.titulo.toLowerCase().includes(busqueda.toLowerCase());
    });
  
    setDataEncuestas(encuestasFiltradas);
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
        borderRadius: '20px',
        minWidth: '30%',
        maxWidth: '60%',
        minHeight: '85%',
        maxHeight: '80%',
        backdropFilter: 'blur(10px)',
      }}
    >
        <div className="encuesta_modalcrear_closeicon">
            <p className="encuesta_modalcrear_title_plantilla">Plantillas</p>
            <span
              dangerouslySetInnerHTML={{ __html: closeSVG }}
              onClick={() => onClose()}
              className="encuesta_modalcrear__close"
              style={{ marginLeft: 'auto' }}
            />
        </div>

        <div style={{display:'flex'}}>
          <div className='comentario_'>Selecciona una plantilla</div>

          <div className="input-container_" > 
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="input-filtroPersonalizado"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <SearchIcon className="search-icon_" onClick={handleBusqueda}/>
            
          </div>
        </div>
        

        <Container className='modalEncuestasPersonalizadas_container'>
            <Row className='modalCrearEncuestaPersonalizada_rowpreguntas'>
              {dataEncuestas.map((encuesta, index) => (
                <Col
                  key={encuesta.idEncuesta}
                  md={4}
                  className={
                    `modalbancopreguntas_colpreguntas_ 
                    ${clickedElements[encuesta.idEncuesta] ? 'clicked' : ''} 
                    ${selectedOption === encuesta.idEncuesta ? 'selected-option' : ''}`
                  }
                  onClick={() => handleClick(encuesta.idEncuesta)}
                  selected={clickedElements[encuesta.idEncuesta]}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                    <div className='imagenColModal'>
                      {/* <img src={ImagenEncuetaPosterior} alt="imagen" className='imagenModal' width='100%' /> */}
                    </div>

                    <h4 className='modalbancopreguntas_divpreguntasbody'>
                      {encuesta.titulo}
                    </h4>

                    <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                      {encuesta.descripcion}
                    </p>
                  </div>
                </Col>
              ))}

                {/* <Col
                  md={4}
                  className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element2'] ? 'clicked' : ''}`}
                  onClick={() => handleClick('element2')}
                  selected={clickedElements['element2']}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                      <div className='imagenColModal'>
                          <img src={ImagenPosteriorEvento} alt="imagen" className='imagenModal' width='100%' />
                      </div>
                      <h4 className='modalbancopreguntas_divpreguntasbody'>
                          Encuesta de opinión posterior a un evento
                      </h4>
                      <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                          Reúne información demográfica de tus encuestados.
                      </p>
                  </div>
                </Col>

                <Col
                  md={4}
                  className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element3'] ? 'clicked' : ''}`}
                  onClick={() => handleClick('element3')}
                  selected={clickedElements['element3']}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                      <div className='imagenColModal'>
                          <img src={ImagenDatosDemograficos} alt="imagen" className='imagenModal' width='100%' />
                      </div>
                      <h4 className='modalbancopreguntas_divpreguntasbody'>
                          Encuesta de opinión posterior a un evento
                      </h4>
                      <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                          Reúne información demográfica de tus encuestados.
                      </p>
                  </div>
                  
                  <div className='modalbancopreguntas_divmenudesplegable'>
                  
                  </div>
                </Col>

                <Col
                  md={4}
                  className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element4'] ? 'clicked' : ''}`}
                  onClick={() => handleClick('element4')}
                  selected={clickedElements['element4']}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                      <div className='imagenColModal'>
                          <img src={ImagenComunidad} alt="imagen" className='imagenModal' width='100%' />
                      </div>
                      <h4 className='modalbancopreguntas_divpreguntasbody'>
                          Encuesta sobre la comunidad
                      </h4>
                      <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                          Descubra más sobre la opinión de los encuestados
                      </p>
                  </div>
                  
                  <div className='modalbancopreguntas_divmenudesplegable'>
                  
                  </div>
                </Col>

                <Col
                  md={4}
                  className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element5'] ? 'clicked' : ''}`}
                  onClick={() => handleClick('element5')}
                  selected={clickedElements['element5']}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                      <div className='imagenColModal'>
                          <img src={ImagenMembresia} alt="imagen" className='imagenModal' width='100%' />
                      </div>
                      <h4 className='modalbancopreguntas_divpreguntasbody'>
                          Plantilla de encuesta sobre la membresía
                      </h4>
                      <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                          ¿Deseas recopilar opiniones de los miembros de tu organización o ...
                      </p>
                  </div>
                </Col>

                <Col
                  md={4}
                  className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element6'] ? 'clicked' : ''}`}
                  onClick={() => handleClick('element6')}
                  selected={clickedElements['element6']}
                >
                  <div className='ContenedorEncuestaPersonalizada'>
                      <div className='imagenColModal'>
                          <img src={ImagenEvaluacionServicios} alt="imagen" className='imagenModal' width='100%' />
                      </div>
                      <h4 className='modalbancopreguntas_divpreguntasbody'>
                          Evaluación de servicios
                      </h4>
                      <p style={{marginLeft:'6%', marginRight:'6%', marginTop:'2%', marginBottom:'2%'}}>
                          Obtenga información sobre la calidad del servicio prestado.
                      </p>
                  </div>
                </Col> */}
            </Row>
        </Container>
                
        <div className='encuesta_modal_cerrar_'>
            <Box sx={{ width: '50%', display: 'contents'}}>
                <Col className="d-flex justify-content-center" style={{display: 'flex'}}>
                  <Button 
                    className='buttoncancelarEncuest' 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCancelar}
                  >
                    <span className='cancelar-encuesta'>Cancelar</span>
                  </Button>

                  <Button 
                    className={`buttonContinuar ${selectedOption === null ? 'disabled' : ''}`} 
                    variant="contained" 
                    color={selectedOption === null ? "default" : "primary"}
                    disabled={!selectedOption}
                  >
                    <span className='continuar-encuesta'>Continuar</span>
                  </Button>
                </Col>
            </Box>
        </div>
    </Box>
  </Modal>
);
};

export default ModalCrearEncuestaPersonalizadaIPN
