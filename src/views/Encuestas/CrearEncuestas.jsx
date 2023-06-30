import React, {useState, useRef,useEffect} from 'react'
import '../../styles/encuestas.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Select, Pagination, Box, Modal, MenuItem} from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ModalEliminarEncuestas from './ModalEliminarEncuestas';
import ModalBancoPreguntas from './ModalBancoPreguntas';


const CopySVG = svgManager.getSVG('copy');
const VerticalSVG = svgManager.getSVG('vertical');
const EyeSVG = svgManager.getSVG('eye');
const ShareSVG = svgManager.getSVG('share');
const DatabaseSVG = svgManager.getSVG('database');
const SendSVG = svgManager.getSVG('send');
const TrashSVG = svgManager.getSVG('trash');

const CrearEncuestas = () => {
  const [openEliminar, setOpenEliminar] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const [openBancoPreguntas, setOpenBancoPreguntas] = useState(false);

  const handleOpenBancoPreguntas = () => {
      setOpenBancoPreguntas(true);
  };

  const handleCloseBancoPreguntas = () => {
      setOpenBancoPreguntas(false);
  };

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  const handleOpenEliminar = () => {
    setOpenEliminar(true);
  };

  const handleCloseEliminar = () => {
    setOpenEliminar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <ModalEliminarEncuestas open={openEliminar} onClose={handleCloseEliminar} />
      <Row className="encuestas-cuerpo">
        <Col xs={4} className="encuestas-cuerpo__col">
          <div className="encuestas-titulo">
            <h4 className="encuestas-titulo__h4">Encuesta 1</h4>

            <div className="encuestas-icon" ref={selectRef}>
              <div className={`select ${open ? 'open' : ''}`} onClick={handleOpenMenu}>
                <span
                  dangerouslySetInnerHTML={{ __html: VerticalSVG }}
                  className="icon"
                  style={{ marginLeft: 'auto', marginRight: '4px' }}
                />
                {open && (
                  <ul className="options">
                    <li className="encuesta-item">
                      <span dangerouslySetInnerHTML={{ __html: CopySVG }} />
                      Duplicar
                    </li>
                    <li className="encuesta-item">
                      <span dangerouslySetInnerHTML={{ __html: EyeSVG }} />
                      Visualizar
                    </li>
                    <li className="encuesta-item">
                      <span dangerouslySetInnerHTML={{ __html: ShareSVG }} />
                      Compartir
                    </li>
                    <li className="encuesta-item">
                      <span dangerouslySetInnerHTML={{ __html: DatabaseSVG }} />
                      Ver datos
                    </li>
                    <li className="encuesta-item">
                      <span dangerouslySetInnerHTML={{ __html: SendSVG }} />
                      Publicar
                    </li>
                    <li className="encuesta-item" onClick={handleOpenEliminar}>
                      <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                      Eliminar
                    </li>
                  </ul>
                )}
              </div>
            </div>
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
