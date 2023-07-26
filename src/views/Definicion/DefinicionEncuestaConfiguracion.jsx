import React, { useEffect, useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaFondo.css'
import '../../styles/definicionEncuestaConfiguracion.css'
import Logo from '../../assets/img/LOGO_VERIS.jpg'
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { ListarEnumeradosService } from '../../services/EstilosServices';
import { ListarCategoriasService } from '../../services/EncuestasServices';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');
const uploadSVG = svgManager.getSVG('upload');

const DefinicionEncuestaConfiguracion = ({closeMenuConfiguracion}) => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [openFondo, setOpenFondo] = useState(false);

    useEffect(() => {  
        ListarVigencia();
        ListarCategoriaEncuesta();
    }, []);


    const handleCloseFondo = () => {
        setOpenFondo(false);
    }
    const handleOpenFondo = () => {
        setOpenFondo(true);
    }

    const ContenedorTamanoLogotipo = () => {
        const [tamanoSeleccionado, setTamanoSeleccionado] = useState('1');
    }
    const handleChangeTamano = (event) => {
          setTamanoSeleccionado(event.target.value);
    };
    

    const RadioButton = ({ id, value, checked, onChange, label }) => (
        <label className="radioButton">
            <input
            type="radio"
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            />
            <span className="checkmark"></span>
            {label}
        </label>
        );
  
    const targetRef = useRef(null);
    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <Col>
                <span dangerouslySetInnerHTML={{ __html: infoSVG }}/>
                <span
                    className='btnX'
                    ref={targetRef} 
                    onClick={handleIconClick} 
                    style={{float: 'right'}} 
                    dangerouslySetInnerHTML={{ __html: xSVG }}
                />
            </Col>
            <Col>
                Usa nuestra biblioteca de preguntas certificadas por nuestros expertos en metodología para reducir sesgos y obtener respuestas más precisas.
            </Col>
            <Col style={{color: 'rgba(255, 65, 151, 1)', marginLeft: '10px', marginTop: '10px'}}>
                Información
            </Col>
        </Tooltip>
    );

    

    // lista tamano

    const tamano = [
        { id: 1, nombre: 'Tamaño actual' },
        { id: 2, nombre: 'Pequeño' },
        { id: 3, nombre: 'Mediano' },
        { id: 4, nombre: 'Grande' } 
    ];

    
    const volverMenuPrincipal = () => {
        closeMenuConfiguracion('Definicion');
    }

    // consumo de vigencia

    const [Vigencia, setVigencia] = useState([]);
    const ListarVigencia = async () => {
        try {
            const response = await  ListarEnumeradosService('TIPO_VIGENCIA')
            setVigencia(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };

    // consumo de categorias 

    const [ListarCategoriaEncuestas, setListarCategoriaEncuestas] = useState([]);
    const ListarCategoriaEncuesta = async () => {
        try {
          const response = await  ListarCategoriasService();
          setListarCategoriaEncuestas(response.data.row);
        } catch (error) {
          console.error(error);
        }
      };  

    // seleccion de categoria
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const handleChangeCategoria = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };

    // seleccion de vigencia

    const [vigenciaSeleccionada, setVigenciaSeleccionada] = useState(null);
    const handleChangeVigencia = (event) => {
        setVigenciaSeleccionada(event.target.value);
    };
    
    // seleccion de fecha inicio

    const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(null);
    const handleChangeFechaInicio = (event) => {
        setFechaInicioSeleccionada(event.target.value + ' 00:00:00');
    };

    // seleccion de fecha fin

    const [fechaFinSeleccionada, setFechaFinSeleccionada] = useState(null);
    const handleChangeFechaFin = (event) => {
        setFechaFinSeleccionada(event.target.value + ' 23:59:59');
    };
    
  return (
    <>
        <Col className="encuesta-Segundocuerpo2">
            <Col>
            <div className="encuesta-subtitulo2">
                <h2 className="encuesta-subtitulo-2">Configuracion</h2>
                <OverlayTrigger
                trigger="click"
                show={showTooltip}
                target={targetRef.current}
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                onHide={() => setShowTooltip(false)}
                >
                <div
                    className="help-icon"
                    onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                >
                    <span
                    ref={targetRef}
                    style={{ marginLeft: '100px' }}
                    dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                    />
                </div>
                </OverlayTrigger>
            </div>
            </Col>
            <Col>
            
                <div className="desplegado-container">
                <div className="listaBancoPreguntas-2">
                    <div className="fondo-lista">
                        <div className="contenedorCabeceraLogotipo">
                        </div>
                        
                        <div className="subcontenedorFuenteTitulo">
                            <span className="fuenteTitulo">Categoria</span>
                        </div>
                        <div className="subcontenedorFuenteTituloselect">
                            <select className="fuenteTituloSelect" onChange={handleChangeCategoria}>
                            <option value="">Categoria de encuesta </option>
                            {ListarCategoriaEncuestas.map((item, index) => (
                               <option key={index} value={item.idCategoriaEncuesta}>{item.nombre}</option>
                            ))}
                            </select>
                        </div>
                        <div className="subcontenedorFuenteTitulo">
                            <span className="fuenteTitulo">Vigencia</span>
                            
                        </div>
                        

                        <div className="subcontenedorFuenteTituloselect">
                            <select className="fuenteTituloSelect" onChange={handleChangeVigencia}>
                                <option value="">Seleccionar tipo de vigencia</option>
                                {Vigencia.map((item, index) => (
                                    <option key={index} value={item.id}>{item.etiqueta}</option>
                                ))}
                            </select>
                        </div>

                        <div className="subcontenedorFuenteTitulo">
                            <span className="fuenteTitulo">Fecha inicio</span>
                            
                        </div>
                        <div className="subcontenedorFuenteTitulo">
                            <input type="date" className="inputFechaInicio" onChange={handleChangeFechaInicio}/>
                        </div>

                        <div className="subcontenedorFuenteTitulo">
                            <span className="fuenteTitulo">Fecha Fin</span>
                            
                        </div>

                        <div className="subcontenedorFuenteTitulo">
                            <input type="date" className="inputFechaFin" onChange={handleChangeFechaFin}/>
                        </div>
                        
                        


                        
                        
                   
                    
                    
                    </div>
                </div>
                </div>
            
            </Col>
        </Col>
       
                                
                                
    </>
  )
}

export default DefinicionEncuestaConfiguracion
