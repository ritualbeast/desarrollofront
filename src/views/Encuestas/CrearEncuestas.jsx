import React, {useState} from 'react'
import '../../styles/encuestas.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Select, Pagination, Box, Modal} from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ModalEliminarEncuestas from './ModalEliminarEncuestas';
import ReactDropdown from 'react-dropdown';
import ModalBancoPreguntas from './ModalBancoPreguntas';


const copySVG = svgManager.getSVG('copy');
const verticalSVG = svgManager.getSVG('vertical');
const eyeSVG = svgManager.getSVG('eye');
const shareSVG = svgManager.getSVG('share');
const databaseSVG = svgManager.getSVG('database');
const sendSVG = svgManager.getSVG('send');
const trash = svgManager.getSVG('trash');

const CrearEncuestas = () => {
    const [openEliminar, setOpenEliminar] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openBancoPreguntas, setOpenBancoPreguntas] = useState(false);

    const handleOpenBancoPreguntas = () => {
        setOpenBancoPreguntas(true);
    };

    const handleCloseBancoPreguntas = () => {
        setOpenBancoPreguntas(false);
    };

    const handleOpenMenu = () => {
      setOpen(true);
    };
  
    const handleCloseMenu = () => {
      setOpen(false);
    };
  
    const handleOpenEliminar = () => {
      setOpenEliminar(true);
    };
  
    const handleCloseEliminar = () => {
      setOpenEliminar(false);
    };
  
    return (
      <div>
        <ModalEliminarEncuestas open={openEliminar} onClose={handleCloseEliminar} />
        <ModalBancoPreguntas open={openBancoPreguntas} onClose={handleCloseBancoPreguntas} />
        <Row className="encuestas-cuerpo">
          <Col xs={4} className="encuestas-cuerpo__col">
            <div className="encuestas-titulo">
              <h4 className="encuestas-titulo__h4">Encuesta 1</h4>
              <Dropdown
                className="encuestas-dropdownmenu"
                onClick={handleOpenMenu}
                show={open}
                onClose={handleCloseMenu}
              >
                <Dropdown.Toggle variant="primary" id="dropdown-menu" className="encuestas-icon">
                  <span dangerouslySetInnerHTML={{ __html: verticalSVG }} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right dropdown-column">
                  <Dropdown.Item className="encuesta-item">
                    <span dangerouslySetInnerHTML={{ __html: copySVG }} />
                    Duplicar
                  </Dropdown.Item>
                  <Dropdown.Item className="encuesta-item">
                    <span dangerouslySetInnerHTML={{ __html: eyeSVG }} />
                    Visualizar
                  </Dropdown.Item>
                  <Dropdown.Item className="encuesta-item">
                    <span dangerouslySetInnerHTML={{ __html: shareSVG }} />
                    Compartir
                  </Dropdown.Item>
                  <Dropdown.Item className="encuesta-item">
                    <span dangerouslySetInnerHTML={{ __html: databaseSVG }} />
                    Ver datos
                  </Dropdown.Item>
                  <Dropdown.Item className="encuesta-item">
                    <span dangerouslySetInnerHTML={{ __html: sendSVG }} />
                    Publicar
                  </Dropdown.Item>
                  <Dropdown.Item className="encuesta-item" onClick={handleOpenEliminar}>
                    <span dangerouslySetInnerHTML={{ __html: trash }} />
                    Eliminar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton"
            onClick={handleOpenBancoPreguntas}

            >
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
      </div>
    );
  };
  

export default CrearEncuestas
