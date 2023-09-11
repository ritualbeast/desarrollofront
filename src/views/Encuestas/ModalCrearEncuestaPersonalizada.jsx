import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/modalCrearEncuestaPersonalizada.css';
import { ListarEncuestas } from '../../services/EncuestasServices';
import styled from 'styled-components';

const closeSVG = svgManager.getSVG('close');

const BuscarNombre = styled.input`
    width: 100% !important;
    padding: 0.5rem;
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const ModalCrearEncuestaPersonalizada = ({ open, onClose }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickedElements, setClickedElements] = useState({});
    const [dataEncuestas, setDataEncuestas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);

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
      setBlurBackground(false);
      setIsModalVisible(false);
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
              <BuscarNombre
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
export default ModalCrearEncuestaPersonalizada;