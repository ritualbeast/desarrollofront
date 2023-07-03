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

  const handleCloseMenu = () => {
    setOpen(false);
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
      <ModalBancoPreguntas open={openBancoPreguntas} onClose={handleCloseBancoPreguntas} />
      <Row className="encuestas-cuerpo">
        <Col xs={4} className="encuestas-cuerpo__col">
          <div className="encuestas-titulo">
            <h4 className="encuestas-titulo__h4">Encuesta 1</h4>

            <Select
                className="encuestas-icon"
                open={open}
                onClose={handleCloseMenu}
                onOpen={handleOpenMenu}
                IconComponent={({ className }) => (
                  <span
                    dangerouslySetInnerHTML={{ __html: VerticalSVG }}
                    className={className}
                    style={{ marginLeft: 'auto', marginRight: '4px' }}
                  />
                )}
              >
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: CopySVG }} />
                  Duplicar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: EyeSVG }} />
                  Visualizar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: ShareSVG }} />
                  Compartir
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: DatabaseSVG }} />
                  Ver datos
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: SendSVG }} />
                  Publicar
                </MenuItem>
                <MenuItem className="encuesta-item" onClick={handleOpenEliminar}>
                  <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                  Eliminar
                </MenuItem>
              </Select>
          </div>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton"
            onClick={handleOpenBancoPreguntas}

            >
              Editar encuesta
            </Button>
          </Col>
          <Col xs={4} className="encuestas-cuerpo__col">
          <div className="encuestas-titulo">
            <h4 className="encuestas-titulo__h4">Encuesta 1</h4>

            <Select
                className="encuestas-icon"
                open={open}
                onClose={handleCloseMenu}
                onOpen={handleOpenMenu}
                IconComponent={({ className }) => (
                  <span
                    dangerouslySetInnerHTML={{ __html: VerticalSVG }}
                    className={className}
                    style={{ marginLeft: 'auto', marginRight: '4px' }}
                  />
                )}
              >
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: CopySVG }} />
                  Duplicar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: EyeSVG }} />
                  Visualizar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: ShareSVG }} />
                  Compartir
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: DatabaseSVG }} />
                  Ver datos
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: SendSVG }} />
                  Publicar
                </MenuItem>
                <MenuItem className="encuesta-item" onClick={handleOpenEliminar}>
                  <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                  Eliminar
                </MenuItem>
              </Select>
          </div>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton"
            onClick={handleOpenBancoPreguntas}

            >
              Editar encuesta
            </Button>
          </Col>
          <Col xs={4} className="encuestas-cuerpo__col">
          <div className="encuestas-titulo">
            <h4 className="encuestas-titulo__h4">Encuesta 1</h4>

            <Select
                className="encuestas-icon"
                open={open}
                onClose={handleCloseMenu}
                onOpen={handleOpenMenu}
                IconComponent={({ className }) => (
                  <span
                    dangerouslySetInnerHTML={{ __html: VerticalSVG }}
                    className={className}
                    style={{ marginLeft: 'auto', marginRight: '4px' }}
                  />
                )}
              >
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: CopySVG }} />
                  Duplicar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: EyeSVG }} />
                  Visualizar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: ShareSVG }} />
                  Compartir
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: DatabaseSVG }} />
                  Ver datos
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: SendSVG }} />
                  Publicar
                </MenuItem>
                <MenuItem className="encuesta-item" onClick={handleOpenEliminar}>
                  <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                  Eliminar
                </MenuItem>
              </Select>
          </div>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton"
            onClick={handleOpenBancoPreguntas}

            >
              Editar encuesta
            </Button>
          </Col>
          <Col xs={4} className="encuestas-cuerpo__col">
          <div className="encuestas-titulo">
            <h4 className="encuestas-titulo__h4">Encuesta 1</h4>

            <Select
                className="encuestas-icon"
                open={open}
                onClose={handleCloseMenu}
                onOpen={handleOpenMenu}
                IconComponent={({ className }) => (
                  <span
                    dangerouslySetInnerHTML={{ __html: VerticalSVG }}
                    className={className}
                    style={{ marginLeft: 'auto', marginRight: '4px' }}
                  />
                )}
              >
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: CopySVG }} />
                  Duplicar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: EyeSVG }} />
                  Visualizar
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: ShareSVG }} />
                  Compartir
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: DatabaseSVG }} />
                  Ver datos
                </MenuItem>
                <MenuItem className="encuesta-item">
                  <span dangerouslySetInnerHTML={{ __html: SendSVG }} />
                  Publicar
                </MenuItem>
                <MenuItem className="encuesta-item" onClick={handleOpenEliminar}>
                  <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                  Eliminar
                </MenuItem>
              </Select>
          </div>
            <p>Creación: 01/01/2021</p>
            <Button variant="primary" className="encuestas-editarbutton"
            onClick={handleOpenBancoPreguntas}

            >
              Editar encuesta
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  

export default CrearEncuestas
