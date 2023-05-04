import React, { useState } from 'react';
import { Table, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import CrearEncuestas from './CrearEncuestas';
import { Link } from 'react-router-dom';
import EliminarEncuestas from './EliminarEncuestas';

const Encuestas = () => {
  const [showEliminarModal, setShowEliminarModal] = useState(false);

  const handleEliminarEncuesta = () => {
    setShowEliminarModal(true);
  };

  const handleCloseEliminarModal = () => {
    setShowEliminarModal(false);
  };

  return (
    <div>
      <div className='encuestaContenedorTitulo'>
        <div className='encuestaContenedorBotones'>
          <div className='encuestaButtonCrear'>
            <Link to= 'crearEncuesta'>
              <button type="button">Crear encuesta desde cero</button>
            </Link>
          </div>
        </div>
        <div className='encuestaButtonCrear'>
          <button type="button">Usa una plantilla predefinida</button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Encuesta 1</td>
            <td>01/01/2021</td>
            <td>Activa</td>
            <td>
              <DropdownButton
                id="dropdown-basic-button"
                title={<i className="fas fa-ellipsis-v"></i>}
                variant="outline-primary"
              >
                <Dropdown.Item onClick={handleEliminarEncuesta}>
                  Eliminar
                </Dropdown.Item>
                <Dropdown.Item>Editar</Dropdown.Item>
                <Dropdown.Item>Ver</Dropdown.Item>
                <Dropdown.Item>Duplicar</Dropdown.Item>
                <Dropdown.Item>Compartir</Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Encuesta</Modal.Title>
          <EliminarEncuestas />
        </Modal.Header>
        <Modal.Body>
          <EliminarEncuestas />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Encuestas;

