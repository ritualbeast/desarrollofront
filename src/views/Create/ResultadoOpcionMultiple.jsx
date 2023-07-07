import React, { useState } from 'react';
import OpcionMultiple from './OpcionMultiple';

const ResultadoOpcionMultiple = () => {
  const [pregunta, setPregunta] = useState('');

  const handlePreguntaChange = (value) => {
    setPregunta(value);
  };

  return (
    <div>
      <h2>Resultado Opción Múltiple</h2>
      <OpcionMultiple onPreguntaChange={handlePreguntaChange} />
      <p>Valor de la pregunta: {pregunta}</p>
    </div>
  );
};

export default ResultadoOpcionMultiple;
