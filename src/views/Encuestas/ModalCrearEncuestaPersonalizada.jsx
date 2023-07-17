import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core";
import { Dropdown } from 'react-bootstrap';

import svgManager from '../../assets/svg';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {EliminarEncuesta} from '../../services/EncuestasServices';
import '../../styles/modalCrearEncuestaPersonalizada.css';
import { Hub } from '@mui/icons-material';
import ImagenPersonalizada from '../../assets/img/encuestaPersonalizadaImage.jpg';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const closeSVG = svgManager.getSVG('close');
const alertSVG = svgManager.getSVG('alert');
const trelloSVG = svgManager.getSVG('trello');
const PlusSqareSVG = svgManager.getSVG('plus-sqare');
const fileSVG = svgManager.getSVG('file');
const listSVG = svgManager.getSVG('list');


// crear consumo categoria de encuestas


const ModalCrearEncuestaPersonalizada = ({ open, onClose }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickedElements, setClickedElements] = useState({});


    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleCancelar = () => {
        onClose();
        // clear the preview
        setPreview(undefined)
        setSelectedFile(undefined)

    }

    const handleOptionClick = (option) => {
        setSelectedOption((prevSelectedOption) => (prevSelectedOption === option ? null : option));
      };


      const handleClick = (id) => {
        setClickedElements((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
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
        width: '920px',

        minWidth: '40%',
        minHeight: '90%',
        maxHeight: '90%',
        backdropFilter: 'blur(10px)',
      }}
    >
        <div className="encuesta_modalcrear_closeicon">
            <p className="encuesta_modalcrear__title">Plantillas</p>
            <span
              dangerouslySetInnerHTML={{ __html: closeSVG }}
              onClick={() => onClose()}
              className="encuesta_modalcrear__close"
              style={{ marginLeft: 'auto' }}
            />
          </div>  
          <div className="input-container" > 
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="input-filtroPersonalizado"
            />
            <SearchIcon className="search-icon"/>
            
          </div>
          <div className='espaciado'></div>
          <div className='comentario'>Selecciona una plantilla</div>
          <Container className='modalEncuestasPersonalizadas_container'>
            <Row className='modalCrearEncuestaPersonalizada_rowpreguntas'>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenPersonalizada} alt="imagen" className='imagenModal' width='100%' />
                        </div>
                        <div className='modalbancopreguntas_divpreguntasbody'>
                            Reúne información demográfica de tus encuestados.
                         </div>
                    </div>
                    
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element2'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element2')}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenPersonalizada} alt="imagen" className='imagenModal' width='100%' />
                        </div>
                        <div className='modalbancopreguntas_divpreguntasbody'>
                            Reúne información demográfica de tus encuestados.
                         </div>
                    </div>
                    
                  </Col>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenPersonalizada} alt="imagen" className='imagenModal' width='100%' />
                        </div>
                        <div className='modalbancopreguntas_divpreguntasbody'>
                            Reúne información demográfica de tus encuestados.
                         </div>
                    </div>
                    
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenPersonalizada} alt="imagen" className='imagenModal' width='100%' />
                        </div>
                        <div className='modalbancopreguntas_divpreguntasbody'>
                            Reúne información demográfica de tus encuestados.
                         </div>
                    </div>
                    
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className={`modalbancopreguntas_colpreguntas ${clickedElements['element1'] ? 'clicked' : ''}`}
                    onClick={() => handleClick('element1')}
                  >
                    <div className='ContenedorEncuestaPersonalizada'>
                        <div className='imagenColModal'>
                            <img src={ImagenPersonalizada} alt="imagen" className='imagenModal' width='100%' />
                        </div>
                        <div className='modalbancopreguntas_divpreguntasbody'>
                            Reúne información demográfica de tus encuestados.
                         </div>
                    </div>
                    
                    <div className='modalbancopreguntas_divmenudesplegable'>
                    
                    </div>
                  </Col>
              </Row>
          </Container>
                
        <div className='encuesta_modal_cerrar'>
            <Box sx={{ width: '50%', display: 'contents'}}>
                    <Col className="d-flex justify-content-center">
                      <Button className='buttoncancelarEncuest' variant="contained" color="primary" onClick={handleCancelar}>
                        <span className='cancelar-encuesta'>Cancelar</span>
                      </Button>
                      <Button className={`buttonContinuar ${selectedOption === null ? 'disabled' : ''}`} 
                      variant="contained" color="primary"
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