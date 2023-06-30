import React, { useEffect } from 'react'
import Encuestas from './IPN/Encuestas'
import { Link } from 'react-router-dom';

const IPN = () => {
  useEffect(() => {
    verificarLocalStorage()
  }, [])

  const verificarLocalStorage = () => {
    const isAdmin = localStorage.getItem('data')
    if (isAdmin === null) {
      window.location.href = global.ROUTE_LOGIN
    }
  }
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
