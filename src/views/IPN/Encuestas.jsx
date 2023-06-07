import React from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import '../../styles/global.css';
import { useState } from 'react';

const Encuestas = () => {

  const [showEliminarModal, setShowEliminarModal] = useState(false);

  const handleEliminarEncuesta = () => {
    setShowEliminarModal(true);
  };

  return (
      <div>
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
                title="--Seleccione--"
                variant="outline-primary"
              >
                <Dropdown.Item disabled>--Seleccione--</Dropdown.Item>
                <Dropdown.Item onClick={handleEliminarEncuesta}>Eliminar</Dropdown.Item> 
                <Dropdown.Item>Editar</Dropdown.Item>
                <Dropdown.Item>Ver</Dropdown.Item>
                <Dropdown.Item>Duplicar</Dropdown.Item>
                <Dropdown.Item>Compartir</Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Encuestas;
