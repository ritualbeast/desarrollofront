import React, {useState} from 'react';
import '../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core";
import svgManager from '../assets/svg';
import CrearEncuestas from './Encuestas/CrearEncuestas';
import ModalCrearEncuesta from './Encuestas/ModalCrearEncuesta';

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
  const [openModalCrearEncuesta, setOpenModalCrearEncuesta] = useState(false);
  const [tipo, setTipo] = useState('A');
  const [publica, setPublica] = useState('S')
  const [valor, setValor] = useState('');
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [openFiltronombre, setOpenFiltroNombre] = useState(false);
  const [openFiltronombre2, setOpenFiltroNombre2] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleFiltroClick = (opcion, valor) => {
    console.log('entro a la funcion')
    setInputValue('');
    setOpcionFiltro(opcion);
    setTipo(opcion);
    setValor(valor);
    setOpenFiltroNombre(!openFiltronombre);
    setOpenFiltroNombre2(!openFiltronombre2);
  };

  const handleOpenCrearEncuesta = () => {
    setOpenModalCrearEncuesta(true);
  };

  const  [currentPage, setCurrentPage] = useState(0);

// funcion buscar por nombre filtro

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
    console.log(event.target.value);
    setInputValue('');
    setOpcionFiltro('');
    setTipo('');
    setValor('');
    setOpenFiltroNombre(!openFiltronombre);
    setOpenFiltroNombre2(!openFiltronombre2);
  };
// funcion  buscar por nombre

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setTipo('');
    setValor('');
    setOpenFiltroNombre2(!openFiltronombre2);
    setOpenFiltroNombre(!openFiltronombre);
    setRefreshComponent(!refreshComponent);
    console.log(inputValue);
    console.log(opcionFiltro);
  };

  return (
    <>
      <Container fluid className='encuesta-container'>
        <Row id="encuestas-Row">
          <Col xs={2} className="encuestas__coltitulo">
            <h2 className='encuesta-titulo'>Mis Encuestas</h2>
          </Col>

          <Col xs={7} className="encuestas__colinput">
            <div className="input-container" > 
              <input
                type="text"
                placeholder="Buscar por nombre"
                className="input-filtro"
                value={inputValue}
                onChange={handleChange}
              />
              
              <SearchIcon className="search-icon" onClick={handleClick} />
              
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
                <a className={opcionFiltro === 'A' ? 'active' : ''}>Abiertas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'C' ? 'active' : ''}`} onClick={() => handleFiltroClick('C',1)}>
                <a  className={opcionFiltro === 'C' ? 'active' : ''}>Cerradas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'T' ? 'active' : ''}`} onClick={() => handleFiltroClick('T',1)}>
                <a className={opcionFiltro === 'T' ? 'active' : ''}>Todas</a>
              </li>
            </ul>
          </Col>

          <Col xs={6} className="encuestas-ordenarpor">
            <h4>Ordenar por:</h4>
            <select className="encuestas-ordenarpor__select" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
              <option value="">Seleccionar Categoría</option>
              <option value="nombre">Nombre</option>
              <option value="fechaCreacion">Fecha de creación</option>
            </select>
          </Col>
        </Row>

        {(openFiltronombre) && (
          <CrearEncuestas opcionFiltro={opcionFiltro} tipofiltro= {tipo} valorfiltro = {valor} nombrefiltro = {inputValue} orden={categoriaSeleccionada} />
        )}

        {openFiltronombre2 && (
          <CrearEncuestas opcionFiltro={opcionFiltro} tipofiltro= {tipo} valorfiltro = {valor} nombrefiltro = {inputValue} orden= {categoriaSeleccionada} />
        )  
        }
      </Container>
      
      <ModalCrearEncuesta 
        open = {openModalCrearEncuesta} 
        onClose={() => setOpenModalCrearEncuesta(false)} 
        opcionFiltro={opcionFiltro} 
        tipofiltro= {tipo} 
        valorfiltro = {valor} 
        nombrefiltro = {inputValue}
        orden={categoriaSeleccionada}
        publico={publica}
      /> 
    </>  
  );
};

export default Encuestas;
