import React, { useState } from 'react'
import svgManager from '../../assets/svg';
import '../../styles/modalCrearEncuesta.css';

const PlusSqareSVG = svgManager.getSVG('plus-sqare');
const TrelloSVG = svgManager.getSVG('trello');

const ModalCrearEncuestas = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
        <div className='comentario'>Selecciona una opcion</div>
        <div className='modalCrearEncuesta_Contenedorbutton'>
          <div
            className={`modalCrearEncuesta_button ${selectedOption === 'opcion1' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('opcion1')}
          >
            <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
            <h2 className='modal1Comentario'>Comienza desde cero</h2>
          </div>

          <div
            className={`modalCrearEncuesta_button ${selectedOption === 'opcion2' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('opcion2')}
          >
            <span style={{ marginTop: '12px', marginLeft: '5px', marginRight: '10px' }} dangerouslySetInnerHTML={{ __html: PlusSqareSVG }} />
            <h2 className='modal2Comentario'>Usa y personaliza una plantilla</h2>
          </div>
        </div>
    </>
  )
}

export default ModalCrearEncuestas
