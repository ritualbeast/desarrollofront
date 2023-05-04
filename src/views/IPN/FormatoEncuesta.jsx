import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';

const FormatoEncuesta = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  return (
    <div className="d-flex">
      <div className="w-25">
        <Nav className="flex-column">
          <Nav.Link eventKey="clasico" onSelect={handleSelect}>
            Clásico
          </Nav.Link>
          <Nav.Link eventKey="unaPregunta" onSelect={handleSelect}>
            Una pregunta a la vez
          </Nav.Link>
        </Nav>
      </div>
      <div className="w-75 p-3">
        {selectedOption === 'clasico' && (
          <div>
            <h2>Encuesta Clásica</h2>
            <p>
              La encuesta clásica muestra todas las preguntas en una sola página y permite al usuario responderlas en
              cualquier orden.
            </p>
          </div>
        )}
        {selectedOption === 'unaPregunta' && (
          <div>
            <h2>Encuesta de una pregunta a la vez</h2>
            <p>
              La encuesta de una pregunta a la vez muestra solo una pregunta por página y obliga al usuario a responder
              cada pregunta antes de continuar a la siguiente.
            </p>
          </div>
        )}
        {!selectedOption && <p>Selecciona una opción para ver la descripción</p>}
      </div>
    </div>
  );
};

export default FormatoEncuesta;
