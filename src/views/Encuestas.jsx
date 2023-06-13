import React from 'react';
import '../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import { Select, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core";
import { Dropdown } from 'react-bootstrap';
import svgManager from '../assets/svg';
/*iconos menu encuestas*/
import puntos from '../assets/img/icono_3puntos.jpg';
import copy from '../assets/img/icon_copy.png';
import eliminar from '../assets/img/icon_basura.png';
import base from '../assets/img/icon_database.png';
const pagination = makeStyles({
  root: {
    "& li.Mui-selected": {
      color: "yellow",
      backgroundColor: "yellow"
    },
    "& li:nth-of-type(2).Mui-selected": {
      backgroundColor: "red"
    }
  }
});

const copySVG = svgManager.getSVG('copy');
const verticalSVG = svgManager.getSVG('vertical');
const eyeSVG = svgManager.getSVG('eye');
const shareSVG = svgManager.getSVG('share');
const databaseSVG = svgManager.getSVG('database');
const sendSVG = svgManager.getSVG('send');
const trash = svgManager.getSVG('trash');

const paginationStyle = {
  '& .Mui-selected': {
    color: '#0a0800',
    backgroundColor: '#f3cd4f',
  },
};

const Encuestas = () => {
  const paginationClass = pagination();
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
            <li className="encuestas-filtrarpor__li"><a href=''>Abiertas</a></li>
            <li className="encuestas-filtrarpor__li"><a href=''>Cerradas</a></li>
            <li className="encuestas-filtrarpor__li"><a href=''>Todas</a></li>
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
        <div className='encuestas-titulo'>
          <h4 className='encuestas-titulo__h4'>Encuesta 1</h4>
          <Dropdown className='encuestas-dropdownmenu'>
            <Dropdown.Toggle variant="primary" id="dropdown-menu" className='encuestas-icon'>
              <span dangerouslySetInnerHTML={{ __html: verticalSVG }} />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu-right dropdown-column'>
              
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: copySVG }} />
                Duplicar</Dropdown.Item>
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: eyeSVG }} />
                Visualizar</Dropdown.Item>
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: shareSVG }} />
                Compartir</Dropdown.Item>
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: databaseSVG }} />
                Ver datos</Dropdown.Item>
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: sendSVG }} />
                Publicar</Dropdown.Item>
              <Dropdown.Item className='encuesta-item'>
                <span dangerouslySetInnerHTML={{ __html: trash }} />
                Eliminar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
            


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
          <div className={paginationClass.root}>
          <Pagination
  count={10}
  variant="outlined"
  shape="rounded"
  sx={paginationStyle}
/>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Encuestas;
