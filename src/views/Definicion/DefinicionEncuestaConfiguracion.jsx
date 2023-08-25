import React, { useEffect, useRef, useState , forwardRef} from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaFondo.css'
import '../../styles/definicionEncuestaConfiguracion.css'
import { ListarEnumeradosService } from '../../services/EstilosServices';
import { ListarCategoriasService } from '../../services/EncuestasServices';
import Select from 'react-select';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');

const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '98%'
    }),
    control: (provided, state) => ({
      ...provided,
      width:'102.5%',
      backgroundColor: 'white',
      color: 'black',
      borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 206, 72, 0.2)' : 'none',
      "&:hover": {
        borderColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#ccc',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const DefinicionEncuestaConfiguracion =  forwardRef(({
    closeMenuConfiguracion, sendDatosConfiguracionEncuesta,contentInit} , ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(null);
    const [datosConfiguracion, setDatosConfiguracion] = useState(contentInit);
    const targetRef = useRef(null);

    console.log("datosConfiguracion",datosConfiguracion);
    useEffect(() => {  
        
        ListarVigencia();
        ListarCategoriaEncuesta();
    }, []); 

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    sendDatosConfiguracionEncuesta(datosConfiguracion);
    
    // sendDatosConfiguracionEncuesta

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

    const [Vigencia, setVigencia] = useState([]);
    const [selectedVigencia, setSelectedVigencia] = useState({
        value: '',
        label: 'Seleccionar tipo de vigencia',
    });

    
    
    const ListarVigencia = async () => {
        try {
            const response = await  ListarEnumeradosService('TIPO_VIGENCIA')
            setVigencia(response.data.listaEnumerados);
            const defaultTipo = response.data.listaEnumerados.find((item) => item.id === '');
            if (datosConfiguracion.enumTipoVigencia !== '') {
                setSelectedVigencia({
                    value: datosConfiguracion.enumTipoVigencia,
                    label: datosConfiguracion.vigencia,
                });

            }
            else if (defaultTipo) {
                const data={
                    value: defaultTipo.id,
                    label:defaultTipo.etiqueta
                }
                setSelectedVigencia(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // consumo de categorias 
    const [ListarCategoriaEncuestas, setListarCategoriaEncuestas] = useState([]);
    const [selectedCategoriaEncuesta, setSelectedCategoriaEncuesta] = useState({
        value: datosConfiguracion.idCategoriaEncuesta,
        label: 'Categoria de encuesta',
      });
    const ListarCategoriaEncuesta = async () => {
        try {
            const response = await  ListarCategoriasService();
            
            setListarCategoriaEncuestas(response.data.row);
            const defaultTipo = response.data.row.find((item) => item.idCategoriaEncuesta === '');
            if (datosConfiguracion.idCategoriaEncuesta !== '') {
                setSelectedCategoriaEncuesta({
                    value: datosConfiguracion.idCategoriaEncuesta,
                    label: datosConfiguracion.nombreCategoria,
                });

            }


            else if (defaultTipo) {
            
            setDatosConfiguracion({...datosConfiguracion, 
                idCategoriaEncuesta: defaultTipo.idCategoriaEncuesta,
                nombreCategoria: defaultTipo.nombre
            });
            } 
            
        } catch (error) {
            console.error(error);
        }
    };

    // seleccion de categoria
    const handleChangeCategoria = (selectedOption) => {
        setDatosConfiguracion({
          ...datosConfiguracion,
          idCategoriaEncuesta: selectedOption.value,
            nombreCategoria: selectedOption.label,
          
        });
        setSelectedCategoriaEncuesta(selectedOption);
      };

    // seleccion de vigencia
    const handleChangeVigencia = (selectedOption) => {
        setDatosConfiguracion({
            ...datosConfiguracion,
            enumTipoVigencia: selectedOption.value,
            vigencia: selectedOption.label,
            
        });
        setSelectedVigencia(selectedOption);
    };
    
    // seleccion de fecha inicio
    const fechaActual = new Date();
    const handleChangeFechaInicio = (event) => {
        const fechaInicio = new Date(event.target.value);
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        

        if (fechaInicio >= fechaActual) {
            setDatosConfiguracion({
                ...datosConfiguracion,
                fechaInicio: event.target.value + ' 00:00:00',
            });
            setFechaInicioSeleccionada(event.target.value + ' 00:00:00');
        } else {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        }
    };

    const handleChangeFechaFin = (event) => {
        const fechaFin = new Date(event.target.value);
        const fechaInicio = new Date(fechaInicioSeleccionada);

        if (fechaFin >= fechaInicio) {
            setDatosConfiguracion({
                ...datosConfiguracion,
                fechaFin: event.target.value + ' 23:59:59',
            });
            
        } else {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        }
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
                            <div className="subcontenedorFuenteTitulo">
                                <span className="fuenteTitulo">Categoria</span>
                            </div>

                            <div className="subcontenedorFuenteTituloselect">
                                <Select 
                                    onChange={handleChangeCategoria} 
                                    styles={customStyles}
                                    options={ListarCategoriaEncuestas.map((item) => ({
                                    label: item.nombre,
                                    value: item.idCategoriaEncuesta,
                                    }))}
                                    value={selectedCategoriaEncuesta} // Utilizar selectedCategoriaEncuesta en lugar de datosConfiguracion.categoria
                                />
                                </div>

                            <div className="subcontenedorFuenteTitulo">
                                <span className="fuenteTitulo">Vigencia</span>
                            </div>
                            
                            <div className="subcontenedorFuenteTituloselect">
                                <Select 
                                    onChange={handleChangeVigencia} 
                                    styles={customStyles}
                                    options={Vigencia.map((item) => ({
                                        label: item.etiqueta,
                                        value: item.id,
                                    }))}
                                    value={selectedVigencia}
                                />
                            </div>

                            <div className="subcontenedorFuenteTitulo">
                                <span className="fuenteTitulo">Fecha inicio</span>
                            </div>

                            <div className="subcontenedorFuenteTitulo">
                                <input type="date" className="inputFechaInicio"
                                value={datosConfiguracion.fechaInicio.split(' ')[0]} 
                                onChange={handleChangeFechaInicio} min={fechaActual.toISOString().split('T')[0]} />
                            </div>

                            <div className="subcontenedorFuenteTitulo">
                                <span className="fuenteTitulo">Fecha Fin</span>
                            </div>

                            <div className="subcontenedorFuenteTitulo">
                                <input type="date" className="inputFechaFin" 
                                value={datosConfiguracion.fechaFin.split(' ')[0]}
                                onChange={handleChangeFechaFin} disabled={!fechaInicioSeleccionada} min={fechaInicioSeleccionada ? fechaInicioSeleccionada.split(' ')[0] : ''} />
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Col>                        
    </>
  )
}
)

export default DefinicionEncuestaConfiguracion
