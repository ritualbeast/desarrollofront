import React, { useState } from 'react';
import OpcionMultiple from './OpcionMultiple';

const ResultadoOpcionMultiple = () => {
  const capturarValores = (pregunta, opciones) => {
    // Aquí puedes utilizar los valores capturados como desees
    console.log('Pregunta:', pregunta);
    console.log('Opciones de respuesta:', opciones);
  };

  return (
    <div>
      <OpcionMultiple onPreguntaChange={capturarValores} />
    </div>
  );
};

export default ResultadoOpcionMultiple;
