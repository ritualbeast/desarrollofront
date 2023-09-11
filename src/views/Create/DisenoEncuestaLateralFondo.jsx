import React, { useEffect, useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaFondo.css'
import Logo from '../../assets/img/LOGO_VERIS.jpg'
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import ModalFondo from './ModalFondo';
const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const uploadSVG = svgManager.getSVG('upload');

const trashSVG = svgManager.getSVG('trash');

const DisenoEncuestaLaterallogotipo = ({
    openMenuPrincipal, 
    closeMenuFondo, 
    sendImagenFondo, 
    sendImagenFondoEstructura,
    contenEstilos
}) => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [openFondo, setOpenFondo] = useState(false);
    
    const [selectedFile, setSelectedFile] = useState(sendImagenFondoEstructura);
    sendImagenFondo(selectedFile);

    useEffect(() => {
    }, [selectedFile]);

    const handleCloseFondo = () => {
        setOpenFondo(false);
    }

    const handleOpenFondo = () => {
        setOpenFondo(true);
    }
  
    const targetRef = useRef(null);
    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <Col>
                <span dangerouslySetInnerHTML={{ __html: infoSVG }}/>
                <span
                    className='btnX'
                    ref={targetRef} 
                    onClick={handleIconClick} 
                    style={{float: 'right'}} 
                    dangerouslySetInnerHTML={{ __html: xSVG }}
                />
            </Col>
            <Col>
                Usa nuestra biblioteca de preguntas certificadas por nuestros expertos en metodología para reducir sesgos y obtener respuestas más precisas.
            </Col>
            <Col style={{color: 'rgba(255, 65, 151, 1)', marginLeft: '10px', marginTop: '10px'}}>
                Información
            </Col>
        </Tooltip>
    );

    

    // lista tamano

    const tamano = [
        { id: 1, nombre: 'Tamaño actual' },
        { id: 2, nombre: 'Pequeño' },
        { id: 3, nombre: 'Mediano' },
        { id: 4, nombre: 'Grande' } 
    ];

    
    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuFondo(false);
    }

    const handleRecibirImagenFondo = (imagen) => {
        setSelectedFile(imagen);

    }
    
  return (
    <>
        <ModalFondo open={openFondo}
         onClose={handleCloseFondo}
         sendImagenFondo= {(imagen) => {handleRecibirImagenFondo(imagen)}}
         contenEstilos={contenEstilos}
           />

        <Col className="encuesta-Segundocuerpo2">
            <Col>
                <div className="encuesta-subtitulo2">
                    <h2 className="encuesta-subtitulo-2">Fondo</h2>

                    <OverlayTrigger
                        trigger="click"
                        show={showTooltip}
                        target={targetRef.current}
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        onHide={() => setShowTooltip(false)}
                    >
                    <div className="help-icon" onClick={() => setShowTooltip(!showTooltip)}>
                        <span
                            ref={targetRef}
                            style={{ marginLeft: '150px' }}
                            dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                        />
                    </div>
                    </OverlayTrigger>
                </div>
            </Col>

            <Col>
                <div className="desplegado-container">
                    <div className="listaBancoPreguntas-2" style={{paddingBottom:'5%'}}>
                        <div className="fondo-lista">
                            <div className="contenedorCabeceraLogotipo" style={{cursor:'pointer'}}  onClick={volverMenuPrincipal}>
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }}/> 
                                <span className='cabeceraTitle'>Fondo</span>
                            </div>

                            <div className="contenedorLogotipo">
                                <div className='buttonLogotipo' onClick={handleOpenFondo}>
                                    <span className='buttonLogotipoText'>Imagen</span>
                                    <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  uploadSVG }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Col>                      
    </>
  )
}

export default DisenoEncuestaLaterallogotipo
