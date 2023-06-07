import React from 'react'
import Encuestas from './IPN/Encuestas'
import { Link } from 'react-router-dom';

const IPN = () => {
  return (
    <div>
      <div className='encuestaContenedorBotones'>
            <div className='encuestaButtonCrear'>
              <Link to= 'crearEncuesta'>
                <button type="button"
                   style={{ 
                    padding: '5px', 
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    borderRadius: '5px',  
                    cursor: 'pointer'
                }}
                >
                  Crear encuesta
                </button>
              </Link>
            </div>
      </div>
      <Encuestas />
    </div>
  )
}

export default IPN
