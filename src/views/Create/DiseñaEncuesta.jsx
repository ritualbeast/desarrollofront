import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import NuevaEncuesta from './../Create/NuevaEncuesta';
import DisenoEncuestaLateralPrincipal from './../Create/DisenoEncuestaLateralPrincipal';
import FormatoEncuestaLateralPrincipal from './../Create/FormatoEncuestaLateralPrincipal';
// quizas pienses que este componente 
// es obsoleto y no hace nada, y estas en lo cierto.
// este componente no hace nada
// pero es necesario  
// porque cuando removemos este componente
// todo el proyecto se rompe por alguna razon
// y no sabemos porque.
// asi que aqui se queda 


const DiseñaEncuesta = ({openVistaPrevia, handleCloseVistaPrevia, handleTotalPreguntas, contentInit,
    sendTamanoPaso2, sendGrosorPaso2,sendTipografiaPaso2, sendImagenFondo, sendFooterImagen, obtenerPreg, regresarRevision
}) => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [blurBackground, setBlurBackground] = useState(false);
   console.log(sendImagenFondo);


    const handleClickOutsideModal = (event) => {
        const modalContainer = document.getElementById('modal-container');
        if (!modalContainer.contains(event.target)) {
            setBlurBackground(false);
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
                            sendImagenFondo={sendImagenFondo}
                            sendFooterImagen={sendFooterImagen}
                            obtenerPreg = {obtenerPreg}
                            regresarRevision={regresarRevision}
                        />
                        )
                    }
                </Col>
            </Col>
        </div>
    )
}

export default DiseñaEncuesta
