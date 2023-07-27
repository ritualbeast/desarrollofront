import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import '../../styles/modalCrearEncuestaPersonalizada.css';
import ImagenEncuetaPosterior from '../../assets/img/encuestaPosterior.jpg'
import ImagenPosteriorEvento from '../../assets/img/posteriorEvento.jpg'
import ImagenDatosDemograficos from '../../assets/img/datosDemograficos.jpeg'
import ImagenComunidad from '../../assets/img/comunidad.jpg'
import ImagenMembresia from '../../assets/img/membresia.jpg'
import ImagenEvaluacionServicios from '../../assets/img/evaluacionServicios.jpg'
import { ListarEncuestas } from '../../services/EncuestasServices';

const closeSVG = svgManager.getSVG('close');

const ModalCrearEncuestaPersonalizada = ({ open, onClose, tipofiltro, valorfiltro, nombrefiltro, orden, publico}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickedElements, setClickedElements] = useState({});
    const [tipoFiltro, setTipoFiltro] = useState(tipofiltro);
    const [valorFiltro, setValorFiltro] = useState(valorfiltro);
    const [filtronombre, setFiltroNombre] = useState(nombrefiltro);
    const [ordenamiento, setOrdenamiento] = useState(orden);
    const [dataEncuestas, setDataEncuestas] = useState([]);

    useEffect(() => {
      setTipoFiltro(tipofiltro);
      setValorFiltro(valorfiltro);
      setFiltroNombre(nombrefiltro);
      setOrdenamiento(orden);
    }, [tipofiltro, valorfiltro, nombrefiltro, orden]);

    useEffect(() => {
      console.log('entro')
      ListarEncuestasPublicas(1,10);

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
        // Si la opción actual ya estaba seleccionada, deseleccionarla (establecer en null).
        if (prevSelected === id) {
          setClickedElements((prevState) => ({
            ...prevState,
            [id]: false,
          }));
          return null;
        }
    
        // Si la opción actual no estaba seleccionada, seleccionarla y deseleccionar las demás opciones.
        const newState = {};
        Object.keys(clickedElements).forEach((key) => {
          newState[key] = key === id ? true : false;
        });
        setClickedElements(newState);
    
        return id;
      });
    };
    
   
    
    const ListarEncuestasPublicas = async (newPagina = 1, newSize = 10) => {
      try {
        const response = await  ListarEncuestas(tipoFiltro, valorFiltro, filtronombre, ordenamiento, newPagina, newSize);
        setDataEncuestas(response.data.items);  
        console.log(response.data.items)    
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

          <div className='comentario'>Selecciona una plantilla</div>

          <Container className='modalEncuestasPersonalizadas_container'>
              <Row className='modalCrearEncuestaPersonalizada_rowpreguntas'>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas_ ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                    selected={clickedElements['element1']}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenEncuetaPosterior} alt="imagen" className='imagenModal' width='100%' />
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
                  </Col>
              </Row>
          </Container>
                  
          <div className='encuesta_modal_cerrar'>
              <Box sx={{ width: '50%', display: 'contents'}}>
                  <Col className="d-flex justify-content-center">
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