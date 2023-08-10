import React, { useEffect, useRef, useState , useImperativeHandle, forwardRef} from 'react'
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
    closeMenuConfiguracion, sendDatosConfiguracionEncuesta} , ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(null);
    const [fechaFinSeleccionada, setFechaFinSeleccionada] = useState(null);
    const targetRef = useRef(null);

    useEffect(() => {  
        ListarVigencia();
        ListarCategoriaEncuesta();
    }, []); 

    const handleIconClick = () => {
        setShowTooltip(false);
    };

    const handleEnviarDatosConfiguracion = () => {
        // Crear un objeto con los datos
        const datosEncuestaConf = {
            categoria: selectedCategoriaEncuesta.value,
            vigencia: selectedVigencia.value,
            enum_tipo_encuesta: 1,
            enum_tipoVigencia: 1,
            fechaInicio : fechaInicioSeleccionada,
            fechaFin : fechaFinSeleccionada,

        };
    
        // Enviar los datos a la función prop
        sendDatosConfiguracionEncuesta(datosEncuestaConf);
      };

      useImperativeHandle(ref, () => ({
        handleEnviarDatosConfiguracion,
      }));

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
            if (defaultTipo) {
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
        value: '',
        label: 'Categoria de encuesta',
      });
    const ListarCategoriaEncuesta = async () => {
        try {
            const response = await  ListarCategoriasService();
            
            setListarCategoriaEncuestas(response.data.row);
            const defaultTipo = response.data.row.find((item) => item.idCategoriaEncuesta === '');
            if (defaultTipo) {
                const data={
                    value: defaultTipo.idCategoriaEncuesta,
                    label:defaultTipo.nombre
                }
            setSelectedCategoriaEncuesta(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // seleccion de categoria
        const handleChangeCategoria = (selectedOption) => {
        
        setSelectedCategoriaEncuesta(selectedOption);
    };

    // seleccion de vigencia
    const handleChangeVigencia = (selectedOption) => {
        setSelectedVigencia(selectedOption);
    };
    
    // seleccion de fecha inicio
    
    const handleChangeFechaInicio = (event) => {
        setFechaInicioSeleccionada(event.target.value + ' 00:00:00');
    };

    // seleccion de fecha fin
    
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
                                    value={selectedCategoriaEncuesta}
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
)

export default DefinicionEncuestaConfiguracion
