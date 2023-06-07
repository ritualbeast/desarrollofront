import React, { useState } from 'react'
import '../styles/create.css'
import Crear from './Create/Crear'
import Estilo from './Create/Estilo'
import Logica from './Create/Logica'
import BancodePreguntas from './Create/BancodePreguntas'
import Opciones from './Create/Opciones'

const Create = () => {
    const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <Crear />;
            case 2:
                return <Estilo />;
            case 3:
                return <Logica />;
            case 4:
                return <Opciones />;
            case 5:
                return <BancodePreguntas />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor-create col-12'>
            <div className='row-create col-2'>

                <div className='menu-reporte-create' role='button' onClick={() => handleSegment(1)}>
                    <span>
                        Crear
                    </span>
                </div>

                <div className='menu-reporte-create' role='button' onClick={() => handleSegment(2)}>
                    <span>
                        Estilo
                    </span>           
                </div>

                <div className='menu-reporte-create' role='button' onClick={() => handleSegment(3)}>
                    <span>
                        Logica
                    </span>
                </div>

                <div className='menu-reporte-create' role='button' onClick={() => handleSegment(4)}>
                    <span>
                        Opciones
                    </span>
                </div>

                <div className='menu-reporte-create' role='button' onClick={() => handleSegment(5)}>
                    <span>
                        Banco de Preguntas
                    </span>
                </div>
            </div>

            <div className='row col-3'>
                { switchOpcion() }
            </div>

            <div className='row col-7'>
                
            </div>
        </div>
    )  
}

export default Create
