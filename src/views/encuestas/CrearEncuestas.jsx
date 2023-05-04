import React, { useState } from 'react';
import '../../styles/CrearEncuestas.css';

const CrearEncuestas = () => {
  const [nombreEncuesta, setNombreEncuesta] = useState('');
  const [categoriaEncuesta, setCategoriaEncuesta] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [fechaValidez, setFechaValidez] = useState('');

  const handleNombreEncuesta = (event) => {
    setNombreEncuesta(event.target.value);
  }

  const handleCategoriaEncuesta = (event) => {
    setCategoriaEncuesta(event.target.value);
  }

  const handleNuevaCategoria = (event) => {
    setNuevaCategoria(event.target.value);
  }

  const handleFechaValidez = (event) => {
    setFechaValidez(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar el código para enviar la información al backend o hacer lo que necesites con ella
  }

  return (
    <div className="crear-encuestas">
      <h1>Crear Encuestas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la encuesta:
          <input type="text" value={nombreEncuesta} onChange={handleNombreEncuesta} />
        </label>
        <br />
        <label>
          Categoría de la encuesta:
          <select value={categoriaEncuesta} onChange={handleCategoriaEncuesta}>
            <option value="">Selecciona una categoría</option>
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
            <option value="categoria3">Categoría 3</option>
            <option value="otra">Otra</option>
          </select>
          {categoriaEncuesta === 'otra' && (
            <input type="text" value={nuevaCategoria} onChange={handleNuevaCategoria} placeholder="Escribe la nueva categoría" />
          )}
        </label>
        <br />
        <label>
          Fecha de validez:
          <input type="date" value={fechaValidez} onChange={handleFechaValidez} />
        </label>
        <br />
        <div className="card-container">
          <div className="card">
            <h3>Formato Clásico</h3>
            <p>Permite mostrar todas las preguntas de la encuesta en una sola página.</p> 
          </div>
          <div className="card">
            <h3>Una pregunta a la vez</h3>
            <p>Permite mostrar una sola pregunta de la encuesta por página.</p>          
          </div>
          <div className="card">
            <h3>Conversación</h3>
            <p>Permite mostrar la encuesta como una conversación con el usuario.</p>  
          </div>
        </div>
        <button type="submit">Crear encuesta</button>
      </form>
    </div>
  )
}

export default CrearEncuestas;
