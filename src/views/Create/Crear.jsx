import React, { useState } from 'react'
import OpcionMultiple from './Crear/OpcionMultiple'
import Casillas from './Crear/Casillas'
import MenuDesplegable from './Crear/MenuDesplegable'
import '../../styles/crear.css'

const Crear = () => {
    const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <OpcionMultiple />;
            case 2:
                return <Casillas />;
            case 3:
                return <MenuDesplegable />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor-crear'>
            <div className='row-crear'>
                <div className='menu-reporte-crear' role='button' onClick={() => handleSegment(1)}>
                    <span>
                        Opcion Multiple
                    </span>
                </div>

                <div className='menu-reporte-crear' role='button' onClick={() => handleSegment(2)}>
                    <span>
                        Casillas de Verificacion
                    </span>           
                </div>

                <div className='menu-reporte-crear' role='button' onClick={() => handleSegment(3)}>
                    <span>
                        Menú desplegable
                    </span>   
                </div>
            </div>
        </div>
    ) 
}

export default Crear
