import React, {useEffect, useState} from 'react';
import { Container, FormControl, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../assets/svg';

const closeSVG = svgManager.getSVG('close');

const ModalObtenerUrl = ({open, onClose}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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
                    maxWidth: '680px',
                    maxHeight: '430px',
                    overflow: 'auto',
                    minWidth: '50%',
                }}
            >
                <div className="encuesta_modalAñadir_closeicon">
                    <h3 style={{color:'rgba(39, 0, 137, 1)', marginBottom: 'unset'}}>Obtener URL</h3>
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={onClose}
                        className="encuesta_modalAñadir__close"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>

                <Container>
                    <p style={{marginTop:'unset', marginBottom: 'unset', marginLeft:'2.5%'}}>Copie la URL y compártalo</p>
                </Container>
                <br />

                <Col style={{marginLeft:'2.5%'}}>
                    <p style={{marginTop:'unset', marginBottom: 'unset'}}>URL</p>
                    <Col style={{display:'flex'}}>
                        <FormControl 
                            style={{width:'82%', borderColor:'rgba(194, 194, 194, 1)'}}
                            type="text" 
                            placeholder=""
                        />
                        <Button
                            style={{
                                background:'rgba(255, 199, 0, 1)',
                                marginLeft:'2%',
                                borderRadius:'40px',
                                paddingLeft:'2.5%',
                                paddingRight:'2.5%'
                            }}
                        >
                            Copiar
                        </Button>
                    </Col>
                </Col>
                <br />
            </Box>
        </Modal>
    );
};

export default ModalObtenerUrl
