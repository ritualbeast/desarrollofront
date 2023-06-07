import React, { useState } from 'react'
import '../../../styles/crearEncuestadeCero.css'
import ipn from '../../IPN'
import { Link } from 'react-router-dom';

const CrearEncuestadeCero = () => {
    const [nombreEncuesta, setNombreEncuesta] = useState('');
    const [categoriaEncuesta, setCategoriaEncuesta] = useState('');
    const [nuevaCategoria, setNuevaCategoria] = useState('');

    const handleNombreEncuesta = (event) => {
        setNombreEncuesta(event.target.value);
    }

    const handleCategoriaEncuesta = (event) => {
        setCategoriaEncuesta(event.target.value);
    }

    const handleNuevaCategoria = (event) => {
        setNuevaCategoria(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar el código para enviar la información al backend o hacer lo que necesites con ella
    }
  return (
    <form onSubmit={handleSubmit}>
        <label>
          Nombre de la encuesta:
          <input type="text" value={nombreEncuesta} onChange={handleNombreEncuesta} />
        </label>

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

        <div className="card-container-decero">
          <div className="card-decero">
            <h3>Formato Clásico</h3>
            <p>Permite mostrar todas las preguntas de la encuesta en una sola página.</p> 
          </div>
          <div className="card-decero">
            <h3>Una pregunta a la vez</h3>
            <p>Permite mostrar una sola pregunta de la encuesta por página.</p>          
          </div>
        </div>

        <div className='encuestaContenedorBotones'>
            <div className='encuestaButtonCrear'>
              <Link to= '/create'>
                <button type="button"
                   style={{ 
                    padding: '5px', 
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    borderRadius: '5px',  
                    cursor: 'pointer'
                }}
                >
                  Crear encuesta
                </button>
              </Link>
            </div>
          </div>
      </form>
  )
}

export default CrearEncuestadeCero
