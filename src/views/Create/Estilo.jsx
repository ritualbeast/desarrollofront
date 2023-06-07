import React, { useState } from 'react'
import Ajustes from './Estilo/Ajustes'
import Temas from './Estilo/Temas'
import '../../styles/estilo.css'

const Estilo = () => {
  const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <Ajustes />;
            case 2:
                return <Temas />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor-estilo'>
            <div className='row-estilo'>

                <div className='menu-reporte-estilo' role='button' onClick={() => handleSegment(1)}>
                    <span>
                        Ajustes
                    </span>
                </div>

                <div className='menu-reporte-estilo' role='button' onClick={() => handleSegment(2)}>
                    <span>
                        Temas
                    </span>           
                </div>

            </div>
        </div>
    )
}

export default Estilo
