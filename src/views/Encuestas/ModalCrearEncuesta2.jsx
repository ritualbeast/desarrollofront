import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import {EliminarEncuesta} from '../../services/EncuestasServices';
import '../../styles/modalCrearEncuesta2.css';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const closeSVG = svgManager.getSVG('close');
const alertSVG = svgManager.getSVG('alert');
const trelloSVG = svgManager.getSVG('trello');
const PlusSqareSVG = svgManager.getSVG('plus-sqare');
const fileSVG = svgManager.getSVG('file');
const listSVG = svgManager.getSVG('list');


// crear consumo categoria de encuestas


const ModalCrearEncuesta2 = ({ open, onClose }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);

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
        maxWidth: '1052px',
        maxHeight: '307px',

        overflow: 'auto',
        minWidth: '40%',
        backdropFilter: 'blur(10px)',
      }}
    >
        <div className="encuesta_modalcrear_closeicon">
            <p className="encuesta_modalcrear__title">Crear encuesta</p>
            <span
              dangerouslySetInnerHTML={{ __html: closeSVG }}
              onClick={() => onClose()}
              className="encuesta_modalcrear__close"
              style={{ marginLeft: 'auto' }}
            />
          </div>  
          <div className='comentario'>Selecciona una opcion</div>
                <div className='modalCrearEncuesta_Contenedorbutton'>
                <div className={`modalCrearEncuesta_button ${selectedOption === 'opcion1' ? 'selected' : ''}`}
                    onClick={() => handleOptionClick('opcion1')}
                >
                    <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
                    <div className='ContenedorModalComentario'>
                        
                        <h2 className='modal2Comentario'>Clásico</h2>
                        <p className='modalsubcomentario'>
                            Muestra todas las preguntas en una sola página al mismo tiempo.
                        </p>
                    </div>
                </div>
                   

                <div
                    className={`modalCrearEncuesta_button ${selectedOption === 'opcion2' ? 'selected' : ''}`}
                    onClick={() => handleOptionClick('opcion2')}
                >
                    <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: trelloSVG }} />
                    <div className='ContenedorModalComentario'>
                        
                        <h2 className='modal2Comentario'>Una pregunta a la vez</h2>
                        <p className='modalsubcomentario'>
                            Pasa de forma automática a la siguiente pregunta.
                        </p>
                    </div>
                </div>
                <div className={`modalCrearEncuesta_button ${selectedOption === 'opcion3' ? 'selected' : ''}`}
                    onClick={() => handleOptionClick('opcion3')}
                >
                    <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
                    
                    <div className='ContenedorModalComentario'>
                        <h2 className='modal1Comentario'>Una pregunta a la vez editable</h2>
                        <p className='modalsubcomentario'>
                            Pasa de forma automática a la siguiente pregunta.
                        </p>
                    </div>
                </div>


       
        </div>
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
export default ModalCrearEncuesta2;