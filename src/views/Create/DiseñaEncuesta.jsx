import React, { useState, useContext } from 'react'
import { Col } from 'react-bootstrap';
import NuevaEncuesta from './../Create/NuevaEncuesta';
import DisenoEncuestaLateralPrincipal from './../Create/DisenoEncuestaLateralPrincipal';
import FormatoEncuestaLateralPrincipal from './../Create/FormatoEncuestaLateralPrincipal';
import { AppContext } from '../../context/AppContext';

const DiseñaEncuesta = ({openVistaPrevia, handleCloseVistaPrevia, handleTotalPreguntas, contentInit}) => {
    const [activeIcon, setActiveIcon] = useState('Banco de Preguntas');
    const [encuestaSegundoCuerpoVisible, setEncuestaSegundoCuerpoVisible] = useState(true);
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { contextValue, setContextValue } = useContext(AppContext);


    console.log('DiseñaEncuesta', contextValue.grosor);

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
                        />
                        )
                    }
                </Col>
            </Col>
        </div>
    )
}

export default DiseñaEncuesta
