import React, {useEffect, useState} from 'react';
import '../../styles/modalVistaPrevia.css'
import { Col } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import VistaPrevia from './VistaPrevia';

const closeSVG = svgManager.getSVG('close');
const windowsSVG = svgManager.getSVG('windows');
const smartphoneSVG = svgManager.getSVG('smartphone');
const tabletSVG = svgManager.getSVG('tablet');

const ModalVistaPrevia = ({
    open, 
    onClose, 
    contentContInit, 
    indice, 
    indiceSec, 
    showModal,
    sendTamanoPaso2, 
    sendGrosorPaso2,
    sendTipografiaPaso2,
    estilos,
    starFillSVG,
    squareFillSVG,
    circleFillSVG,
    triangleFillSVG,
    // configuracion4Activa,
    // configuracion5Activa,
    // opcionesRespuestaInit,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [activeContent, setActiveContent] = useState('windows');   

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

    const handleIconClick = (content) => {
        setActiveContent(content);
      };
    
    const renderContent = () => {
        if (activeContent === 'windows' || activeContent === 'tablet' || activeContent === 'smartphone') {
            return <VistaPrevia 
                contentContInit={contentContInit}
                indice={indice}
                indiceSec={indiceSec}
                showModal={showModal}
                sendTamanoPaso2={sendTamanoPaso2}
                sendGrosorPaso2={sendGrosorPaso2}
                sendTipografiaPaso2={sendTipografiaPaso2}
                estilos={estilos}
                starFillSVG={starFillSVG}
                squareFillSVG={squareFillSVG}
                circleFillSVG={circleFillSVG}
                triangleFillSVG={triangleFillSVG}
            />;
        } else {
            return null;
        }
    };
      
    return (
        <Modal 
            className='ModalVistaPrevia' 
            open={open} 
            onClose={onClose}
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
            <Box className='Box-ModalVistaPrevia'>
                <div className="encuesta_modalAñadir_closeicon">
                    <h3 className='ObtenerUrl'>Vista Previa</h3>

                    <Col style={{display:'flex', marginLeft: 'auto', marginRight: 'auto'}}>
                        <span 
                            dangerouslySetInnerHTML={{ __html: windowsSVG }} 
                            style={{marginLeft:'unset', marginRight:'unset', 
                            backgroundColor: activeContent === 'windows' ? 'rgba(255, 206, 72, 1)' : 'initial', 
                            paddingTop:'3%',
                            paddingLeft:'3%',
                            paddingRight:'3%',
                            borderRadius:'8px'
                        }}
                            onClick={() => handleIconClick('windows')}
                        />
                        <span 
                            dangerouslySetInnerHTML={{ __html: tabletSVG }} 
                            style={{marginRight:'unset', 
                            backgroundColor: activeContent === 'tablet' ? 'rgba(255, 206, 72, 1)' : 'initial',
                            paddingTop:'3%',
                            paddingLeft:'3%',
                            paddingRight:'3%',
                            borderRadius:'8px'
                        }}
                            onClick={() => handleIconClick('tablet')}
                        />
                        <span 
                            dangerouslySetInnerHTML={{ __html: smartphoneSVG }} 
                            style={{marginRight:'unset', 
                            backgroundColor: activeContent === 'smartphone' ? 'rgba(255, 206, 72, 1)' : 'initial',
                            paddingTop:'3%',
                            paddingLeft:'3%',
                            paddingRight:'3%',
                            borderRadius:'8px'
                        }}
                            onClick={() => handleIconClick('smartphone')} 
                        />
                    </Col>
                    
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={onClose}
                        className="encuesta_modalAñadir__close"
                        style={{ marginLeft: '10%' }}
                    />
                </div>

                <Box className={`Container-ModalVistaPrevia ${activeContent}`}>
                    {renderContent()}
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalVistaPrevia
