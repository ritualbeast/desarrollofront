import React, {useState, useRef,useEffect} from 'react'
import '../../styles/encuestas.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Select, MenuItem, TablePagination} from '@mui/material';
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

const CrearEncuestas = ({tipofiltro, valorfiltro, nombrefiltro, orden}) => {
  const paginationClass = pagination();
  const [openEliminar, setOpenEliminar] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const [openBancoPreguntas, setOpenBancoPreguntas] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(tipofiltro);
  const [valorFiltro, setValorFiltro] = useState(valorfiltro);
  const [menuStates, setMenuStates] = useState({});
  const [openEliminarId, setOpenEliminarId] = useState('');
  const [filtronombre, setFiltroNombre] = useState(nombrefiltro);
  const [ordenamiento, setOrdenamiento] = useState(orden);
  const [pagina, setPagina] = useState(1);
  const [size, setSize] = useState(9);

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
    setOpenEliminarId(idEncuesta);
    setOpenEliminar(true);
  };

  const handleCloseEliminar = () => {
    setOpenEliminar(false);
  };

  useEffect(() => {
    ListarEncuestass(pagina, 9);
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
   const [totalItems, setTotalItems] = useState(0);

 
   const ListarEncuestass = async (newPagina = 1, newSize = 10) => {
    try {
      const response = await  ListarEncuestas(tipoFiltro, valorFiltro, filtronombre, ordenamiento, newPagina, newSize);
      
      setDataEncuestas(response.data.items);
      setTotalItems(response.data.totalItems);
    
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
  // const filteredEncuestas = dataEncuestas
  //   .filter((encuesta) => encuesta.estado === 'A')
  //   .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const filteredEncuestas = dataEncuestas.slice(startIndex, endIndex);

// funcion para paginacion

    const handleChangePage = (event, newPage) => {
    const newPagina = newPage + 1;
    const newSize = newPagina * size;
    if (newPagina * size > totalItems) {
        setSize(Math.ceil(totalItems / newPagina)); // Ajusta el tamaño máximo posible para la última página
       
    } else {
        setSize(size); // Mantiene el tamaño de página
    };
    setPagina(newPagina); // Actualiza la página actual
        ListarEncuestass(newPagina, 9); // Llama a fetchData con los nuevos valores de página y tamaño
    
    }

    const handleChangeRowsPerPage = (event) => {
    // Llama a fetchData con la primera página y el nuevo tamaño
    };

  return (
    <div>
      
      <ModalEliminarEncuestas open={openEliminar} onClose={handleCloseEliminar} eliminarid = {openEliminarId} eliminarEncuesta={ListarEncuestass} />
      <ModalBancoPreguntas open={openBancoPreguntas} onClose={handleCloseBancoPreguntas} />
      <Row className="encuestas-cuerpo">
        {filteredEncuestas.map((encuesta) => (
        
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
                        style={{marginRight: '4px', marginRight: '4%', top: '16%' }}
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
          
        ))
        }
        
        </Row>
        <Row className="encuestas-paginacion">
          <Col xs={12} className="encuestas-paginacion__col">
          <TablePagination
            rowsPerPageOptions={[9]} // Agrega las opciones de tamaño de página que necesites
            component="div"
            count={totalItems}
            rowsPerPage={size}
            page={pagina - 1} // Resta 1 para que coincida con Material-UI
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          </Col>
        </Row>
      </div>
    );
  };
  

export default CrearEncuestas
