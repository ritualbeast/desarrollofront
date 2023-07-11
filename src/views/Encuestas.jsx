import React, {useState} from 'react';
import '../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import { Select, Pagination, Box, Modal} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core";
import { Dropdown } from 'react-bootstrap';
import svgManager from '../assets/svg';
import CrearEncuestas from './Encuestas/CrearEncuestas';
import ModalCrearEncuestas from './Encuestas/ModalCrearEncuestas';

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
const closeSVG = svgManager.getSVG('close');

const paginationStyle = {
  '& .Mui-selected': {
    color: '#0a0800',
    backgroundColor: '#f3cd4f !important',
  },
};

  
const Encuestas = () => {
  const paginationClass = pagination();
  const [opcionFiltro, setOpcionFiltro] = useState('');
  const [openCrearEncuesta, setOpenCrearEncuesta] = useState(false);
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');



  const handleFiltroClick = (opcion, valor) => {
    setOpcionFiltro(opcion);
    setTipo(opcion);
    setValor(valor);
  };

  const handleOpenCrearEncuesta = () => {
  setOpenCrearEncuesta(true);
};

const  [currentPage, setCurrentPage] = useState(0);


  return (
    <>
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
              onClick={handleOpenCrearEncuesta}
            >
              Crear Encuesta <BiPlus />
            </Button>
          </Col>
        </Row>
        <Row className="encuestasFiltros" xs={12}>
          <Col xs={6} className="encuestas-filtrarpor">
            <h4>Filtrar por:</h4>
            <ul className="encuestas-filtrarpor__ul">
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'A' ? 'active' : ''}`} onClick={() => handleFiltroClick('A', 1)}>
                <a >Abiertas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'C' ? 'active' : ''}`} onClick={() => handleFiltroClick('C',1)}>
                <a >Cerradas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'T' ? 'active' : ''}`} onClick={() => handleFiltroClick('T',1)}>
                <a>Todas</a>
              </li>
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

        {(opcionFiltro === 'A' || opcionFiltro === 'C' || opcionFiltro === 'T') && (
          <CrearEncuestas opcionFiltro={opcionFiltro} tipofiltro= {tipo} valorfiltro = {valor}/>
        )}
        
      </Container>
      
      <Modal
        open={openCrearEncuesta}
        onClose={() => setOpenCrearEncuesta(false)}
        sx={{
          width: '60%',
          height: '60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          marginTop: '5%',
        }}
      >
        <Box className="encuesta_modalcrear" sx={{ width: '50%' }}>
          <div className="encuesta_modalcrear_closeicon">
            <p className="encuesta_modalcrear__title">Crear encuesta</p>
            <span
              dangerouslySetInnerHTML={{ __html: closeSVG }}
              onClick={() => setOpenCrearEncuesta(false)}
              className="encuesta_modalcrear__close"
              style={{ marginLeft: 'auto' }}
            />
          </div>   
          <ModalCrearEncuestas />
        </Box>
      </Modal>    
    </>  
  );
};

export default Encuestas;
