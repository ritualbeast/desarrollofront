import React, { useState } from 'react';

// Importar componentes necesarios para el modal
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
Modal.setAppElement('#root');


// Definir datos de ejemplo para las preguntas y categorías
const preguntas = [
  { id: 1, pregunta: '¿Cuál es tu color favorito?', categoria: 'Preferencias' },
  { id: 2, pregunta: '¿Qué tipo de música te gusta?', categoria: 'Preferencias' },
  { id: 3, pregunta: '¿Cuál es tu comida favorita?', categoria: 'Preferencias' },
  { id: 4, pregunta: '¿Cómo calificarías nuestro servicio?', categoria: 'Servicio al cliente' },
  { id: 5, pregunta: '¿Recomendarías nuestro producto a tus amigos?', categoria: 'Servicio al cliente' },
  { id: 6, pregunta: '¿Cómo nos conociste?', categoria: 'Marketing' },
  { id: 7, pregunta: '¿Qué te parece nuestra página web?', categoria: 'Marketing' },
];

const categorias = ['Preferencias', 'Servicio al cliente', 'Marketing'];

const BancopreguntasEncuestas = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  // Función para abrir el modal con las preguntas de la categoría seleccionada
  const openModal = (category) => {
    setSelectedCategory(category);
    setModalIsOpen(true);
  }
  
  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedCategory(null);
    setModalIsOpen(false);
  }
  
  return (
    <div>
      <h1>Banco de preguntas para encuestas</h1>
      {/* Renderizar cada categoría con sus preguntas */}
      {categorias.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <button onClick={() => openModal(category)}>Ver preguntas</button>
        </div>
      ))}
      
      {/* Modal con las preguntas de la categoría seleccionada */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Preguntas de {selectedCategory}</h2>
        <button onClick={closeModal}>Cerrar</button>
        
        {/* Renderizar cada pregunta de la categoría seleccionada */}
        {preguntas.filter((pregunta) => pregunta.categoria === selectedCategory).map((pregunta) => (
          <div key={pregunta.id}>
            <h3>{pregunta.pregunta}</h3>
            <p>Vista previa de la pregunta</p>
          </div>
        ))}
      </Modal>
    </div>
  )
}

export default BancopreguntasEncuestas;
