import React, {useState, useRef,useEffect} from 'react'
import '../../styles/encuestas.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Select, MenuItem, TablePagination} from '@mui/material';
import svgManager from '../../assets/svg';
import ModalEliminarEncuestaIPN from './ModalEliminarEncuestaIPN';
import ModalBancoPreguntasIPN from './ModalBancoPreguntasIPN';
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

const CrearEncuestaIPN = ({tipofiltro, valorfiltro, nombrefiltro, orden, idEncuesta}) => {
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
    const [tipoEncuesta, setTipoEncuesta] = useState(idEncuesta);
    const [pagina, setPagina] = useState(1);
    const [size, setSize] = useState(9);
    const [dataEncuestas, setDataEncuestas] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
  
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
  
    const ListarEncuestass = async (newPagina = 1, newSize = 10, publica) => {
        try {
            const response = await  ListarEncuestas(tipoFiltro, valorFiltro, filtronombre, ordenamiento, newPagina, newSize, publica, tipoEncuesta);
            setDataEncuestas(response.data.items);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handlePageChange = (event, page) => {
        setCurrentPage(page - 1);
    };
  
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const filteredEncuestas = dataEncuestas.slice(startIndex, endIndex);

    const handleChangePage = (event, newPage) => {
        const newPagina = newPage + 1;
        const newSize = newPagina * size;
        if (newPagina * size > totalItems) {
            setSize(Math.ceil(totalItems / newPagina));
        } else {
            setSize(size);
        };
        setPagina(newPagina);
        ListarEncuestass(newPagina, 9);
    }
  
    const handleChangeRowsPerPage = (event) => {

    };
  
    return (
        <div>
            <ModalEliminarEncuestaIPN open={openEliminar} onClose={handleCloseEliminar} eliminarid = {openEliminarId} eliminarEncuesta={ListarEncuestass} />
            
            <ModalBancoPreguntasIPN open={openBancoPreguntas} onClose={handleCloseBancoPreguntas} />
            
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

                        <Button 
                            variant="primary" 
                            className="encuestas-editarbutton"
                            onClick={handleOpenBancoPreguntas}
                        >
                            Editar encuesta
                        </Button>
                    </Col>
                ))}
            </Row>

            <Row className="encuestas-paginacion">
                <Col xs={12} className="encuestas-paginacion__col">
                    <TablePagination
                        rowsPerPageOptions={[9]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={size}
                        page={pagina - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default CrearEncuestaIPN
