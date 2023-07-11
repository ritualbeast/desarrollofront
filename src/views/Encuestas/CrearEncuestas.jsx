import React, {useState, useRef,useEffect} from 'react'
import '../../styles/encuestas.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Select, Pagination, Box, Modal, MenuItem} from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import ModalEliminarEncuestas from './ModalEliminarEncuestas';
import ModalBancoPreguntas from './ModalBancoPreguntas';
import {ListarEncuestas} from '../../services/EncuestasServices';
import { makeStyles } from "@material-ui/core";


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

const paginationStyle = {
  '& .Mui-selected': {
    color: '#0a0800',
    backgroundColor: '#f3cd4f !important',
  },
};


const CopySVG = svgManager.getSVG('copy');
const VerticalSVG = svgManager.getSVG('vertical');
const EyeSVG = svgManager.getSVG('eye');
const ShareSVG = svgManager.getSVG('share');
const DatabaseSVG = svgManager.getSVG('database');
const SendSVG = svgManager.getSVG('send');
const TrashSVG = svgManager.getSVG('trash');

const CrearEncuestas = ({tipofiltro, valorfiltro}) => {
  const paginationClass = pagination();
  const [openEliminar, setOpenEliminar] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const [openBancoPreguntas, setOpenBancoPreguntas] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(tipofiltro);
  const [valorFiltro, setValorFiltro] = useState(valorfiltro);
  const [menuStates, setMenuStates] = useState({});
  const [openEliminarId, setOpenEliminarId] = useState('');

  const handleOpenBancoPreguntas = () => {
      setOpenBancoPreguntas(true);
  };

  const handleCloseBancoPreguntas = () => {
      setOpenBancoPreguntas(false);
  };

  const handleOpenMenu = (encuestaId) => {
    setMenuStates((prevMenuStates) => ({
      ...prevMenuStates,
      [encuestaId]: true
    }));
  };

  const handleCloseMenu = (encuestaId) => {
    setMenuStates((prevMenuStates) => ({
      ...prevMenuStates,
      [encuestaId]: false
    }));
  };
  const isMenuOpen = (encuestaId) => menuStates[encuestaId];

  const handleOpenEliminar = (idEncuesta) => {
    console.log(idEncuesta);
    setOpenEliminarId(idEncuesta);
    setOpenEliminar(true);
  };

  const handleCloseEliminar = () => {
    setOpenEliminar(false);
  };

  useEffect(() => {
    
    ListarEncuestass();
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

   // crear consumo listar encuestas
   const [dataEncuestas, setDataEncuestas] = useState([]);
 
   const ListarEncuestass = async () => {
    try {
      console.log (tipoFiltro);
    console.log (valorFiltro);
      const response = await  ListarEncuestas(tipoFiltro, valorFiltro);
      console.log(response);
      console.log(response.data.items);
      setDataEncuestas(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  // Función para manejar el cambio de página
  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  // Filtrar y paginar las encuestas
  const filteredEncuestas = dataEncuestas
    .filter((encuesta) => encuesta.estado === 'A')
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);



  return (
    <div>
      
      <ModalEliminarEncuestas open={openEliminar} onClose={handleCloseEliminar} eliminarid = {openEliminarId} eliminarEncuesta={ListarEncuestass} />
      <ModalBancoPreguntas open={openBancoPreguntas} onClose={handleCloseBancoPreguntas} />
      <Row className="encuestas-cuerpo">
        {filteredEncuestas.map((encuesta) => (
          encuesta.estado === 'A' && (
            <Col xs={4} className="encuestas-cuerpo__col">
            <div className="encuestas-titulo">
              <h4 className="encuestas-titulo__h4">{encuesta.titulo}</h4>
  
              <Select
                  className="encuestas-icon"
                  open={isMenuOpen(encuesta.idEncuesta)}
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
                  <MenuItem className="encuesta-item" onClick={() => handleOpenEliminar(encuesta.idEncuesta)}> 
                    <span dangerouslySetInnerHTML={{ __html: TrashSVG }} />
                    Eliminar
                  </MenuItem>
                </Select>
            </div>
            <p>Creación: {encuesta.fechaInicio.split(' ')[0]}</p>
              <Button variant="primary" className="encuestas-editarbutton"
              onClick={handleOpenBancoPreguntas}
  
              >
                Editar encuesta
              </Button>
            </Col>
          )
        ))
        }
        
        </Row>
        <Row className="encuestas-paginacion">
          <Col xs={12} className="encuestas-paginacion__col">
            <div className={paginationClass.root}>
            <Pagination
              count={Math.ceil(dataEncuestas.filter((encuesta) => encuesta.estado === 'A').length / itemsPerPage)}
              variant="outlined"
              shape="rounded"
              page={currentPage + 1}
              onChange={handlePageChange}
            />
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  

export default CrearEncuestas
