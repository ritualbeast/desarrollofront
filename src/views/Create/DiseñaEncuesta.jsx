import React, { useState, useContext } from 'react'
import { Col } from 'react-bootstrap';
import NuevaEncuesta from './../Create/NuevaEncuesta';
import DisenoEncuestaLateralPrincipal from './../Create/DisenoEncuestaLateralPrincipal';
import FormatoEncuestaLateralPrincipal from './../Create/FormatoEncuestaLateralPrincipal';


const DiseñaEncuesta = ({openVistaPrevia, handleCloseVistaPrevia, handleTotalPreguntas, contentInit,
    sendTamanoPaso2, sendGrosorPaso2,sendTipografiaPaso2
}) => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
   


    const handleClickOutsideModal = (event) => {
        const modalContainer = document.getElementById('modal-container');
        if (!modalContainer.contains(event.target)) {
            setOpenAñadirLogo(false);
            setBlurBackground(false);
            setIsModalVisible(false);
        }
    };
    
    return (
        <div
            id="modal-container"
            className={`encuesta-container ${blurBackground ? 'encuesta-blur' : ''}`}
            onClick={handleClickOutsideModal}
        >
            <Col className='encuesta-cuerpo'>
                {activeIcon === 'Estilo'  && (
                    <DisenoEncuestaLateralPrincipal/>
                )}

                {activeIcon === 'Formato' && (
                    <FormatoEncuestaLateralPrincipal/>
                )}

                <Col className={`encuesta-Tercerocuerpo2 ${encuestaSegundoCuerpoVisible ? 'encuesta-abierto' : 'encuesta-cerrado'}`}>
                    {activeIcon !== '' && (
                        <NuevaEncuesta 
                            openVistaPrevia={openVistaPrevia}
                            contentInit={contentInit}
                            handleCloseVistaPrevia={handleCloseVistaPrevia}
                            handleTotalPreguntas={handleTotalPreguntas}
                            sendTamanoPaso2={sendTamanoPaso2}
                            sendGrosorPaso2={sendGrosorPaso2}
                            sendTipografiaPaso2={sendTipografiaPaso2}
                        />
                        )
                    }
                </Col>
            </Col>
        </div>
    )
}

export default DiseñaEncuesta
