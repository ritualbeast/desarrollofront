import React from 'react'
import svgManager from '../../assets/svg';
import '../../styles/modalCrearEncuesta.css';

const ModalCrearEncuestas = () => {
  return (
    <>
        Selecciona una opcion
        <div className='modalCrearEncuesta_Contenedorbutton'>
            <div className='modalCrearEncuesta_button'>
                Comienza desde cero
            </div>
            <div className='modalCrearEncuesta_button'>
                Usa y personaliza una plantilla
            </div>
        </div>
    </>
  )
}

export default ModalCrearEncuestas
