import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Select, Pagination, Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import '../../styles/modalCrearEncuesta.css';

const closeSVG = svgManager.getSVG('close');
const trelloSVG = svgManager.getSVG('trello');
const PlusSqareSVG = svgManager.getSVG('plus-sqare');

const ModalCrearEncuesta = ({ open, onClose, handleOpenCrearEncuestaPersonalizada, handleOpenModalCrearDesdeCero }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    
    useEffect(() => {
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

    const handleOptionClick = (option) => {
        setSelectedOption((prevSelectedOption) => (prevSelectedOption === option ? null : option));
    };
    
    const handleOpenModalCrearEncuesta2 = () => {
        if (selectedOption === 'opcion1') {
            handleOpenModalCrearDesdeCero(true);
            onClose('opcion1');
        } else if (selectedOption === 'opcion2') {
            handleOpenCrearEncuestaPersonalizada(true);
            onClose('opcion2');
        }
    };

  return (
    <>        
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
                maxWidth: '1052px',
                maxHeight: '307px',

                overflow: 'auto',
                minWidth: '40%',
                backdropFilter: 'blur(10px)',
            }}
            >
                <div className="encuesta_modalcrear_closeicon">
                    <p className="encuesta_modalcrear__title__">Crear encuesta</p>
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
                        <span style={{ marginTop: '2px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
                        <h2 className='modal1Comentario__'>Comienza desde cero</h2>
                    </div>

                    <div
                        className={`modalCrearEncuesta_button_ ${selectedOption === 'opcion2' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('opcion2')}
                    >
                        <span style={{ marginTop: '2px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: trelloSVG }} />
                        <h2 className='modal2Comentario__'>Usa y personaliza una plantilla</h2>
                    </div>
                </div>

                <div className='encuesta_modal_cerrar__'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                            <Col className="d-flex justify-content-center" style={{display: 'flex'}}>
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