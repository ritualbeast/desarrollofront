import React from 'react'
import svgManager from '../../assets/svg';
import '../../styles/modalCrearEncuesta.css';

const PlusSqareSVG = svgManager.getSVG('plus-sqare');

const ModalCrearEncuestas = () => {
  return (
    <>
        <div className='comentario'>Selecciona una opcion</div>
        <div className='modalCrearEncuesta_Contenedorbutton'>
            <div className='modalCrearEncuesta_button'>
                <span dangerouslySetInnerHTML={{ __html: PlusSqareSVG }}/> Comienza desde cero
            </div>
            <div className='modalCrearEncuesta_button'>
                Usa y personaliza una plantilla
            </div>
        </div>
    </>
  )
}

export default ModalCrearEncuestas
