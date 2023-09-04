import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Box, Modal } from '@mui/material';
import svgManager from '../../assets/svg';
import '../../styles/modalanadirFondo.css';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const closeSVG = svgManager.getSVG('close');
const trashSVG = svgManager.getSVG('trash');
// crear consumo categoria de encuestas


const ModalLogotipo = ({ open, onClose, sendImagenLogo }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);

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
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleAceptar = () => {
        onClose();
        // clear the preview
        sendImagenLogo(selectedFile);
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
                maxWidth: '680px',
                maxHeight: '430px',

                overflow: 'auto',
                minWidth: '40%',
            }}
        >
            <div className="encuesta_modalAñadir_closeicon">
                <p className="encuesta_modalAñadir__title">Subir una imagen de Logotipo</p>
                <span
                    dangerouslySetInnerHTML={{ __html: closeSVG }}
                    onClick={onClose}
                    className="encuesta_modalAñadir__close"
                    style={{ marginLeft: 'auto' }}
                />
            </div>
            <Container>
                <Row className='contenedor-añadirLogo'>
                    {selectedFile ? (
                        <>
                            <div className='contenedor-añadirLogo-2'>
                                
                                    <img src={preview} alt="preview" style={{ height: '120px', width: '120px' }} />
                                    {selectedFile.name}
                                
                                <div className='contenedor-añadirLogo-3'>
                                    <span dangerouslySetInnerHTML={{ __html: trashSVG }} style={{ cursor: 'pointer' }} onClick={() => setSelectedFile(undefined)} />
                                </div>
                                

                            </div>
                        
                        </>
                    ) : (
                        <>
                        <Col>
                            <span dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} style={{ cursor: 'pointer' }} onClick={() => document.getElementById('file-input').click()} />
                        </Col>
                        <Col className='contendorTitulo-añadirLogo'>
                            <h2 className='titulo-añadirLogo'>Arrastra y suelta una imagen o</h2>
                            <h2 className='titulo-añadirLogo-2'>
                            <label className='inputimagen' htmlFor="file-input">Explora</label>
                            </h2>
                        </Col>
                        <Col>
                            <h2 className='comentario-añadirLogo'>La imagen debe tener un tamaño de 500px x 100px y ser en formato JPEG o PNG</h2>
                        </Col>
                        <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile} />
                        </>
                    )}
                </Row>
            </Container>

            <br />

            <Col className='contenedorBotonesFondo'>
                <Button
                    className='buttoncancelarFondo'
                    variant="contained"
                    color="primary"
                    onClick={handleCancelar}
                >
                    Cancelar
                </Button>
                <Button
                    className='buttondeleteFondo'
                    variant="contained"
                    color="primary"
                    onClick={handleAceptar}
                >
                    Aceptar
                </Button>
            </Col>
            <br />
        </Box>
    </Modal>
  );
};

export default ModalLogotipo;