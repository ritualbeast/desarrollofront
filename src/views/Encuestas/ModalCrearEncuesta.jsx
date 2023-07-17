import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Select, Pagination, Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import {EliminarEncuesta} from '../../services/EncuestasServices';
import '../../styles/modalCrearEncuesta.css';
import ModalCrearEncuesta2 from './ModalCrearEncuesta2';
import ModalCrearEncuestaPersonalizada from './ModalCrearEncuestaPersonalizada';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const closeSVG = svgManager.getSVG('close');
const alertSVG = svgManager.getSVG('alert');
const trelloSVG = svgManager.getSVG('trello');
const PlusSqareSVG = svgManager.getSVG('plus-sqare');

// crear consumo categoria de encuestas


const ModalCrearEncuesta = ({ open, onClose }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [openModalCrearEncuesta2, setOpenModalCrearEncuesta2] = useState(false);
    const [openModalCrearEncuestaPersonalizada, setOpenModalCrearEncuestaPersonalizada] = useState(false);

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
    
    const handleOpenModalCrearEncuesta2 = () => {
        if (selectedOption === 'opcion1') {
            setOpenModalCrearEncuesta2(true);
        }
        else if (selectedOption === 'opcion2') {
            setOpenModalCrearEncuestaPersonalizada(true);
        }
        onClose();
        };

    const handleCerrarModalCrearEncuesta2 = () => {
        setOpenModalCrearEncuesta2(false);
        
        };

    const handleCerrarModalCrearEncuestaPersonalizada = () => {
        setOpenModalCrearEncuestaPersonalizada(false);
        
        };


  

  

  return (
    <>
        <ModalCrearEncuesta2 open={openModalCrearEncuesta2} onClose={handleCerrarModalCrearEncuesta2} />
        <ModalCrearEncuestaPersonalizada open={openModalCrearEncuestaPersonalizada} onClose={handleCerrarModalCrearEncuestaPersonalizada} />
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
                <div className='comentario'>Selecciona el formato de la encuesta</div>
                <div className='modalCrearEncuesta_Contenedorbutton'>
                    <div
                        className={`modalCrearEncuesta_button_ ${selectedOption === 'opcion1' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('opcion1')}
                    >
                        <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
                        <h2 className='modal1Comentario'>Comienza desde cero</h2>
                    </div>

                    <div
                        className={`modalCrearEncuesta_button_ ${selectedOption === 'opcion2' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('opcion2')}
                    >
                        <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: trelloSVG }} />
                        <h2 className='modal2Comentario'>Usa y personaliza una plantilla</h2>
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
                            onClick={handleOpenModalCrearEncuesta2}
                            >
                                <span className='continuar-encuesta'>Continuar</span>
                            </Button>
                            </Col>
                    </Box>
                </div>
            </Box>
        </Modal>
    </>
    
  );
};
export default ModalCrearEncuesta;