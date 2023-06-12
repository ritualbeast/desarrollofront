import React from 'react';
import '../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import { Select, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Encuestas = () => {
  return (
    <Container fluid className='encuesta-container'>
      <Row id="encuestas-Row">
        <Col xs={2} className="encuestas__coltitulo">
          <h2 className='encuesta-titulo'>Mis Encuestas</h2>
        </Col>

        <Col xs={7} className="encuestas__colinput">
          <div className="input-container">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="input-filtro"
            />
            <SearchIcon className="search-icon" />
          </div>
        </Col>

        <Col xs={3} className="encuestas__colbutton">
          <Button
            variant="primary"
            className="btn-notisurvey"
            startIcon={<BiPlus />}
          >
            Crear Encuesta <BiPlus />
          </Button>
        </Col>
      </Row>
      <Row className="encuestasFiltros" xs={12}>
        <Col xs={6} className="encuestas-filtrarpor">
          <h4>Filtrar por:</h4>
          <ul className="encuestas-filtrarpor__ul">
            <li className="encuestas-filtrarpor__li"><span>Abiertas</span></li>
            <li className="encuestas-filtrarpor__li"><span>Cerradas</span></li>
            <li className="encuestas-filtrarpor__li"><span>Todas</span></li>
          </ul>
        </Col>

        <Col xs={6} className="encuestas-ordenarpor">
          <h4>Ordenar por:</h4>
          <select className="encuestas-ordenarpor__select">
            <option value="default">Seleccionar Categoría</option>
            <option value="nombre">Nombre</option>
            <option value="fecha">Fecha de creación</option>
          </select>

        </Col>
      </Row>
      <Row className="encuestas-cuerpo">
        <Col xs={4} className="encuestas-cuerpo__col">
            <h4>Encuesta 1</h4>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton">
              Editar encuesta
            </Button>
        </Col>
        <Col xs={4} className="encuestas-cuerpo__col">
            <h4>Encuesta 2</h4>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton">
              Editar encuesta
            </Button>
        </Col>
        <Col xs={4} className="encuestas-cuerpo__col">
            <h4>Encuesta 3</h4>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton">
              Editar encuesta
            </Button>
        </Col>
      </Row>

      <Row className="encuestas-paginacion">
        <Col xs={12} className="encuestas-paginacion__col">
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Col>
      </Row>

    </Container>
  );
};

export default Encuestas;
