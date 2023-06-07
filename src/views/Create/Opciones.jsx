import React, { useState } from 'react'
import Test from './Opciones/Test'
import ModoTest from './Opciones/ModoTest'
import '../../styles/opciones.css'

const Opciones = () => {
  const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <Test />;
            case 2:
                return <ModoTest />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor-opciones'>
            <div className='row-opciones'>

                <div className='menu-reporte-opciones' role='button' onClick={() => handleSegment(1)}>
                    <span>
                        Test
                    </span>
                </div>

                <div className='menu-reporte-opciones' role='button' onClick={() => handleSegment(2)}>
                    <span>
                        Modo Test
                    </span>           
                </div>
            </div>
        </div>
    )
}

export default Opciones
