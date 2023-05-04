import React, { useState } from 'react'
import ConsultarReporte from './Reporte/ConsultarReporte'
import ReporteEncuesta from './Reporte/ReporteEncuesta'
import ReporteIPN from './Reporte/ReporteIPN'
import '../styles/reporte.css'

const Reporte = (reporte) => {
    const [opcion, setOpcion] = useState()

    const handleSegment = (op) => {
        setOpcion(op)
    }

    const switchOpcion = () => {
        switch (opcion) {
            case 1:
                return <ConsultarReporte />;
            case 2:
                return <ReporteEncuesta />;
            case 3:
                return <ReporteIPN />;
            default:
                return '';
        }
    }

    return (
        <div className='contenedor'>
            <div className='row'>

                <div className='contenedor-reporte col-4'>
                    <div className='col-12 text-center p-0 menu-tabs'>
                        <div className='menu-reporte' role='button' onClick={() => handleSegment(1)}>
                            <span>
                                Consultar Reporte por Módulo
                                <hr className= {`sub-color sub2 mt-2 ${opcion === 1 ? 'success-panel' : 'd-none'}` }></hr>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='contenedor-reporte col-4'>
                    <div className='col-12 text-center p-0 menu-tabs'>
                        <div className='menu-reporte' role='button' onClick={() => handleSegment(2)}>
                            <span>
                                Reportes de Encuesta
                                <hr className= {`sub-color sub2 mt-2 ${opcion === 2 ? 'success-panel' : 'd-none'}` }></hr>
                            </span>           
                        </div>
                    </div>
                </div>

                <div className='contenedor-reporte col-4'>
                    <div className='col-12 text-center p-0 menu-tabs'>
                        <div className='menu-reporte' role='button' onClick={() => handleSegment(3)}>
                            <span>
                                Reportes de IPN
                                <hr className= {`sub-color sub2 mt-2 ${opcion === 3 ? 'success-panel' : 'd-none'}` }></hr>
                            </span>   
                        </div>
                    </div>
                </div>
            </div>
            <hr className='hr2'/>
            { switchOpcion() }
        </div>
  )
}

export default Reporte
