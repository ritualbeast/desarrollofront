import React, { useState } from 'react'
import ConsultarRespuestaIPN from './ReporteIPN/ConsultarRespuestaIPN'
import ReporteEstadisticoIPN from './ReporteIPN/ReporteEstadisticoIPN'

const ReporteIPN = () => {
  const [opcion, setOpcion] = useState()
  
  const handleSegment = (op) => {
    setOpcion(op)
  }

  const switchOpcion = () => {
    switch (opcion) {
      case 1:
        return <ConsultarRespuestaIPN />;
      case 2:
        return <ReporteEstadisticoIPN />;
      default:
        return '';
    }
  }

  return (
    <div className='contenedor'>
      <div className='row d-flex justify-context-between'>
        <div className='contenedor-reporte col-6 d-flex flex-column justify-content-center'>
          <div className='col-12 text-center p-0 menu-tabs flex-grow-1'>
            <div className='menu-reporte' role='button' onClick={() => handleSegment(1)}>
              <span>
                Consultar Respuestas por encuesta
                <hr className={`sub-color sub2 mt-2 ${opcion === 1 ? 'success-panel' : 'd-none'}`} />
              </span>
            </div>
          </div>
        </div>
        <div className='contenedor-reporte col-6 d-flex flex-column justify-content-center'>
          <div className='col-12 text-center p-0 menu-tabs flex-grow-1'>
            <div className='menu-reporte' role='button' onClick={() => handleSegment(2)}>
              <span>
                Reporte Estadístico
                <hr className={`sub-color sub2 mt-2 ${opcion === 2 ? 'success-panel' : 'd-none'}`} />
              </span>
            </div>
          </div>
        </div>
      </div>
      { switchOpcion() }
    </div>
  );
}

export default ReporteIPN
