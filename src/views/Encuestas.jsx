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
  const [blurBackground, setBlurBackground] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFiltroClick = (opcion) => {
    setOpcionFiltro(opcion);
  };

  const handleOpenCrearEncuesta = () => {
    setOpenCrearEncuesta(true);
    setBlurBackground(true);
    setIsModalVisible(true);
  };

  const handleCloseEliminar = () => {
    setOpenCrearEncuesta(false);
    setBlurBackground(false);
    setIsModalVisible(false);
  };

  const handleClickOutsideModal = (event) => {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer.contains(event.target)) {
      setOpenCrearEncuesta(false);
      setBlurBackground(false);
      setIsModalVisible(false);
    }
  };    

  return (
    <>
    <div
      id="modal-container"
      className={`encuesta-container ${blurBackground ? 'encuesta-blur' : ''}`}
      onClick={handleClickOutsideModal}
    >
      <Container fluid>
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
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'abiertas' ? 'active' : ''}`} onClick={() => handleFiltroClick('abiertas')}>
                <a >Abiertas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'cerradas' ? 'active' : ''}`} onClick={() => handleFiltroClick('cerradas')}>
                <a >Cerradas</a>
              </li>
              <li className={`encuestas-filtrarpor__li ${opcionFiltro === 'todas' ? 'active' : ''}`} onClick={() => handleFiltroClick('todas')}>
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

        {(opcionFiltro === 'abiertas' || opcionFiltro === 'cerradas' || opcionFiltro === 'todas') && (
          <CrearEncuestas opcionFiltro={opcionFiltro} />
        )}
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
    </div>
      
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
        BackdropProps={{
          onClick: () => {
            setOpenCrearEncuesta(false);
            setBlurBackground(false);
            setIsModalVisible(false);
          },
        }}
      >
        <Box className="encuesta_modalcrear" sx={{ width: '73%', height: '60%' }}>
          <div className="encuesta_modalcrear_closeicon">
            <p className="encuesta_modalcrear__title">Crear encuesta</p>
            <span
              dangerouslySetInnerHTML={{ __html: closeSVG }}
              onClick={() => handleCloseEliminar(false)}
              className="encuesta_modalcrear__close"
              style={{ marginLeft: 'auto' }}
            />
          </div>
          
          <ModalCrearEncuestas/>

          <div className='encuesta_modal_cerrar'>
            <Box sx={{ width: '50%', display: 'contents'}}>
                    <Col className="d-flex justify-content-center">
                      <Button className='buttoncancelaruser' variant="contained" color="primary" onClick={handleCloseEliminar}>
                        <span className='cancelar-encuesta'>Cancelar</span>
                      </Button>
                      <Button className='buttondeleteuser' variant="contained" color="primary"
                      // onClick={handleEliminar}
                      >
                        <span className='continuar-encuesta'>Continuar</span>
                      </Button>
                    </Col>
            </Box>
          </div>
        </Box>
      </Modal>

          
    </>
  );
};

export default Encuestas;
