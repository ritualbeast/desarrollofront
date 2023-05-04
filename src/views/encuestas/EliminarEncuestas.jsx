import React from 'react';

const EliminarEncuestas = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>¿Estás seguro de que deseas eliminar esta encuesta?</h2>
        <button onClick={onConfirm}>Sí, eliminar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EliminarEncuestas;

