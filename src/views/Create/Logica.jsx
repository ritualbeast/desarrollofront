import React, { useState } from 'react'
import Logica1 from './Logica/Logica1'
import Logica2 from './Logica/Logica2'
import Logica3 from './Logica/Logica3'
import '../../styles/logica.css'

const Logica = () => {
  const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <Logica1 />;
            case 2:
                return <Logica2 />;
            case 3:
                return <Logica3 />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor-logica'>
            <div className='row-logica'>

                <div className='menu-reporte-logica' role='button' onClick={() => handleSegment(1)}>
                    <span>
                        Logica 1
                    </span>
                </div>

                <div className='menu-reporte-logica' role='button' onClick={() => handleSegment(2)}>
                    <span>
                        Logica 2
                    </span>           
                </div>

                <div className='menu-reporte-logica' role='button' onClick={() => handleSegment(3)}>
                    <span>
                        Logica 3
                    </span>   
                </div>
            </div>
        </div>
    )
}

export default Logica
