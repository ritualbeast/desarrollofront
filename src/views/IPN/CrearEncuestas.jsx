import React, { useState } from 'react'
import CrearEncuestadeCero from './CrearEncuesta/CrearEncuestadeCero'
import UsarPlantilla from './CrearEncuesta/UsarPlantilla'
import { Link } from 'react-router-dom';

const CrearEncuestas = () => {

  const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <CrearEncuestadeCero />;
            case 2:
                return <UsarPlantilla />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor'>
            <div className='row'>

                <div className='contenedor-reporte col-6'>
                    <div className='col-12 text-center p-0 menu-tabs'>
                        <div className='menu-reporte' role='button' onClick={() => handleSegment(1)}>
                            <span>
                                Crear Encuesta desde Cero
                                <hr className= {`sub-color sub2 mt-2 ${opcion === 1 ? 'success-panel' : 'd-none'}` }></hr>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='contenedor-reporte col-6'>
                    <div className='col-12 text-center p-0 menu-tabs'>
                        <div className='menu-reporte' role='button' onClick={() => handleSegment(2)}>
                            <span>
                                Usa una plantilla predefinida
                                <hr className= {`sub-color sub2 mt-2 ${opcion === 2 ? 'success-panel' : 'd-none'}` }></hr>
                            </span>           
                        </div>
                    </div>
                </div>

            </div>
            <hr className='hr2'/>
            { switchOpcion() }
            <Link to= '/ipn'>
                <button type="submit" 
                    style={{ 
                    padding: '5px', 
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    borderRadius: '5px',  
                    cursor: 'pointer'
                }}>Regresar</button>
            </Link>
        </div>
    )
}

export default CrearEncuestas;
