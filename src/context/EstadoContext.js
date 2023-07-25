
import React, { useContext, useState } from 'react';

const EstadoContext = React.createContext();

export const EstadoProvider = (props) => {

  const [previewContext, setPreviewContext]  = useState(null);

  return (
    <EstadoContext.Provider value={{ previewContext }}>
      {props.children}
    </EstadoContext.Provider>
  );
};

export const useEstadoContext = () => {
  return useContext(EstadoContext);
};
