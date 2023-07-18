// Archivo: EstadoContext.js
import React, { createContext, useContext, useState } from 'react';

const EstadoContext = createContext();

export const EstadoProvider = ({ children }) => {
  const [estado, setEstado] = useState('Guardar');
  const [posicionSeleccionada, setPosicionSeleccionada] = useState('1');

  return (
    <EstadoContext.Provider value={{ estado, setEstado, posicionSeleccionada, setPosicionSeleccionada }}>
      {children}
    </EstadoContext.Provider>
  );
};

export const useEstadoContext = () => {
  return useContext(EstadoContext);
};
