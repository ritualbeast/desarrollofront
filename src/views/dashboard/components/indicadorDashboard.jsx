import React from 'react';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaReply, FaChartLine } from 'react-icons/fa';
import '../../../styles/dashboardIndicador.css';

const IndicadorDashboard = () => {
  return (
    <div>
      <div>
        <h1>Indicadores</h1>
      </div>
      <div className="indicador-container" xs={4} >
        <div className="indicador">
          <FaEnvelope className="indicador__icono" />
          <div className="indicador__titulo">Correos enviados</div>
          <div>1000</div>
        </div>
        <div className="indicador">
          <FaCheckCircle className="indicador__icono" />
          <div className="indicador__titulo">Correos exitosos</div>
          <div>800</div>
        </div>
        <div className="indicador">
          <FaTimesCircle className="indicador__icono" />
          <div className="indicador__titulo">Correos fallidos</div>
          <div>200</div>
        </div>
        <div className="indicador">
          <FaReply className="indicador__icono" />
          <div className="indicador__titulo">Correos rebotados</div>
          <div>50</div>
        </div>
        <div className="indicador">
          <FaEnvelope className="indicador__icono" />
          <div className="indicador__titulo">Correos abiertos</div>
          <div>500</div>
        </div>
        <div className="indicador">
          <FaChartLine className="indicador__icono" />
          <div className="indicador__titulo">Encuestas abiertas</div>
          <div>300</div>
        </div>
        <div className="indicador">
          <FaTimesCircle className="indicador__icono" />
          <div className="indicador__titulo">Encuestas abortadas</div>
          <div>100</div>
        </div>
        <div className="indicador">
          <FaCheckCircle className="indicador__icono" />
          <div className="indicador__titulo">Encuestas completadas</div>
          <div>200</div>
        </div>
        <div className="indicador">
          <FaChartLine className="indicador__icono" />
          <div className="indicador__titulo">Tiempo promedio de respuestas</div>
          <div>2 min</div>
        </div>
      </div>
    </div>
  );
};

export default IndicadorDashboard;
