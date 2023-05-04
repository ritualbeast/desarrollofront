import React, { useState } from 'react';

import '../../../styles/dashboard.css';
const FiltroDashboard = () => {
  const [indicadores, setIndicadores] = useState(false);
  const [selectedIndicadores, setSelectedIndicadores] = useState([]);
  const [graficos, setGraficos] = useState(false);
  const [selectedGraficos, setSelectedGraficos] = useState([]);


  const toggleIndicadores = () => {
    setIndicadores(!indicadores);
  };

  const handleIndicadorSelection = (event) => {
    const indicador = event.target.value;
    const index = selectedIndicadores.indexOf(indicador);
    if (index > -1) {
      // Si ya se seleccionó el indicador, se quita de la lista de seleccionados
      setSelectedIndicadores(selectedIndicadores.filter(item => item !== indicador));
    } else {
      // Si no se ha seleccionado el indicador, se agrega a la lista de seleccionados
      setSelectedIndicadores([...selectedIndicadores, indicador]);
    }
  };

  const toggleGraficos = () => {
    setGraficos(!graficos);
  };

  const handleGraficoSelection = (event) => {
    const grafico = event.target.value;
    const index = selectedGraficos.indexOf(grafico);
    if (index > -1) {
      // Si ya se seleccionó el grafico, se quita de la lista de seleccionados
      setSelectedGraficos(selectedGraficos.filter(item => item !== grafico));
    } else {
      // Si no se ha seleccionado el grafico, se agrega a la lista de seleccionados
      setSelectedGraficos([...selectedGraficos, grafico]);
    }
  };

  return (
    <div className='filtroDashboard'>
      <ul className='uldashboard'>
        <li className='labeldashboard'onClick={toggleIndicadores}>Indicadores</li>
        {indicadores && (
          <ul className="indicadores-dropdown"> {/* Estilos personalizados para el menú desplegable */}
            <li>
              <label className='labeldashboard'>
                <input type="checkbox" value="Universo de Datos" onChange={handleIndicadorSelection} />
                Universo de Datos
              </label>
            </li>
            <li>
              <label className='labeldashboard'>
                <input type="checkbox" value="Correos enviados" onChange={handleIndicadorSelection} />
                Correos enviados
              </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Correos exitosos" onChange={handleIndicadorSelection} />
                    Correos exitosos 
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Correos fallidos" onChange={handleIndicadorSelection} />
                    Correos fallidos
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Correos abiertos" onChange={handleIndicadorSelection} />
                    Correos abiertos
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Correos rebotados" onChange={handleIndicadorSelection} />
                    Correos rebotados
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Encuestas abiertas" onChange={handleIndicadorSelection} />
                    Encuestas abiertas
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Encuestas abortadas" onChange={handleIndicadorSelection} />
                    Encuestas abortadas
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Encuestas completadas" onChange={handleIndicadorSelection} /> 
                    Encuestas completadas
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                    <input type="checkbox" value="Tiempo promedio de respuesta" onChange={handleIndicadorSelection} />
                    Tiempo promedio de respuesta
                </label>
            </li>
            
            {/* Resto de opciones de indicadores */}
          </ul>
        )}
      </ul>
      <ul className='uldashboard'>
        <li className='labeldashboard' onClick={toggleGraficos}>Gráficos</li>
        {graficos && (
            <ul className="graficos-dropdown"> {/* Estilos personalizados para el menú desplegable */}
            <li>
                <label className='labeldashboard'>
                <input type="checkbox" value="Tiempo de respuesta vs Actualizaciones vs Cantidad de respuestas" onChange={handleGraficoSelection} />
                Tiempo de respuesta vs Actualizaciones vs Cantidad de respuestas
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                <input type="checkbox" value="Gráficos IPN - NPS (Net Promoter Score)" onChange={handleGraficoSelection} />
                Gráficos IPN - NPS (Net Promoter Score)
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                <input type="checkbox" value="Gráficos CSAT (Customer Satisfaction Score)" onChange={handleGraficoSelection} />
                Gráficos CSAT (Customer Satisfaction Score)
                </label>
            </li>
            <li>
                <label className='labeldashboard'>
                <input type="checkbox" value="Gráficos CES - Customer Effort Score" onChange={handleGraficoSelection} />
                Gráficos CES - Customer Effort Score
                </label>
            </li>
            {/* Resto de opciones de gráficos */}
            </ul>
        )}
        </ul>
      <button className='boton-dashboard'>Aplicar</button>


    </div>
  );
};

export default FiltroDashboard;

