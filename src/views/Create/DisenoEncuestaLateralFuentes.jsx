import React, { useEffect, useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaFuente.css'
import { ListarEnumeradosService } from '../../services/EstilosServices';
import Select from 'react-select';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');

const Tipografía = {
    container: (provided, state) => ({
      ...provided,
      width: '98%',
      marginBottom: '2%',
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
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const Grosor = {
    container: (provided, state) => ({
      ...provided,
      width: '48%',
      marginRight: '3%',
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
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const Tamaño = {
    container: (provided, state) => ({
      ...provided,
      width: '48%'
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
      paddingTop:'unset',
      paddingBottom:'unset',
      color: state.isFocused ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(255, 206, 72, 1)' : '#FFFFFF',
    })
};

const DisenoEncuestaLateralFuentes = ({
    openMenuPrincipal, 
    closeMenuFuentes,
    paso, sendTamano, 
    sendGrosor,
    sendTipografia,
    sendTamanoPaso2, 
    sendGrosorPaso2,
    sendTipografiaPaso2,
    updateEstilos,
 }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [pasos, setPasos] = useState(paso);
    const [estilos, setEstilos] = useState({});
    console.log(estilos)
    
    const actualizarEstilo = (titulo, tipo, valor) => {
        const nuevosEstilos = {
            ...estilos,
            [titulo]: {
                ...estilos[titulo],
                [tipo]: valor
            }
        };
        setEstilos(nuevosEstilos);
        // Llama a la función de devolución de llamada del padre para actualizar el estado en el componente padre
        updateEstilos(nuevosEstilos);
    };    

    useEffect(() => {
        ListarFuenteGrosorEncuesta();
        ListarFuenteTamanoEncuesta();
        ListarFuenteTipografiaEncuesta();
    }, []);

    const handleChangeTamano = (selectedOption, titulo) => {
        const value = selectedOption.value;
        if (pasos === 2) {
            sendTamanoPaso2(value, titulo);
        } else {
            sendTamano(value, titulo);
        }
        actualizarEstilo(titulo, 'tamano', value);
        
    };

    const handleChangeGrosor = (selectedOption, titulo) => {
        const value = selectedOption.value; // Accede directamente a la propiedad value
        if (pasos === 2) {
            sendGrosorPaso2(value, titulo);
        } else {
            sendGrosor(value, titulo);
        }
        actualizarEstilo(titulo, 'grosor', value);
    };    

    const handleChangeTipografia = (selectedOption, titulo) => {
        const value = selectedOption.value;
        if (pasos === 2) {
            sendTipografiaPaso2(value, titulo);
        } else {
            sendTipografia(value, titulo);
        }
        actualizarEstilo(titulo, 'tipografia', value);
    };
  
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

    // lista de titulos de fuentes
    const titulos = [
        "Nombre de encuesta",
        "Descripción de encuesta",
        "Leyenda",
        "Texto de botones",
        "Título de sección",
        "Descripción de sección",
        "Preguntas",
        "Opciones de respuesta",
        "Texto de cierre de encuestas",
    ];

    const volverMenuPrincipal = () => {
        openMenuPrincipal(true);
        closeMenuFuentes(false);
    }

    //consumo de grosor de fuentes
    const [GrosorApi, setGrosorApi] = useState([]);
    const ListarFuenteGrosorEncuesta = async () => {
        try {
          const response = await  ListarEnumeradosService('GROSOR_LETRA')
            setGrosorApi(response.data.listaEnumerados);
        } catch (error) {
          console.error(error);
        }
      };

    // consumo de tamano de fuentes
    const [TamanoApi, setTamanoApi] = useState([]);
    const ListarFuenteTamanoEncuesta = async () => {
        try {
            const response = await  ListarEnumeradosService('TAMANIO_LETRA')
            setTamanoApi(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };

    // consumo de tipografia de fuentes
    const [TipografiaApi, setTipografiaApi] = useState([]);
    const ListarFuenteTipografiaEncuesta = async () => {
        try {
            const response = await  ListarEnumeradosService('TIPOGRAFIA')
            setTipografiaApi(response.data.listaEnumerados);
        } catch (error) {
            console.error(error);
        }
    };
    
  return (
    <>
        <Col className="encuesta-Segundocuerpo2">
            <Col>
                <div className="encuesta-subtitulo2">
                    <h2 className="encuesta-subtitulo-2">Estilo</h2>

                    <OverlayTrigger
                        trigger="click"
                        show={showTooltip}
                        target={targetRef.current}
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        onHide={() => setShowTooltip(false)}
                    >
                        <div className="help-icon" onClick={() => setShowTooltip(!showTooltip)}>
                            <span
                                ref={targetRef}
                                style={{ marginLeft: '150px' }}
                                dangerouslySetInnerHTML={{ __html: helpCircleSVG }}
                            />
                        </div>
                    </OverlayTrigger>
                </div>
            </Col>

            <Col>
                <div className="desplegado-container">
                    <div className="listaBancoPreguntas-2" style={{paddingBottom:'5%'}}>
                        <div className="fondo-lista">
                            <div className="contenedorCabeceraLogotipo" style={{cursor:'pointer'}} onClick={volverMenuPrincipal}>
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }}/>  
                                <span className='cabeceraTitle'>Fuentes</span>
                            </div>

                            <div>
                                {titulos.map((titulo, index) => (
                                    pasos === 2 && (titulo === "Nombre de encuesta" || titulo === "Descripción de encuesta" ||
                                    titulo === "Leyenda" || titulo === "Texto de botones") ||
                                    pasos === 1 && (titulo === "Título de sección" || titulo === "Descripción de sección" || 
                                    titulo === "Preguntas" || titulo === "Opciones de respuesta" || titulo === "Texto de cierre de encuestas")
                                    ? null : (
                                        <div className="contenedorFuenteTitulo" key={index}>
                                            <div className="subcontenedorFuenteTitulo">
                                                <span className="fuenteTitulo">{titulo}</span>
                                            </div>

                                            <div className="subcontenedorFuenteTituloselect">
                                                <Select
                                                    styles={Tipografía}
                                                    options={TipografiaApi.map((item) => ({
                                                        value: item.etiqueta,
                                                        label: item.descripcion,
                                                    }))}
                                                    onChange={(selectedOption) => handleChangeTipografia(selectedOption, titulo)}
                                                    placeholder="Seleccionar tipografía"
                                                />
                                            </div>

                                            <div className="subcontenedorFuenteTituloselect2">
                                                <Select
                                                    styles={Grosor}
                                                    options={GrosorApi.map((item) => ({
                                                        value: item.etiqueta,
                                                        label: item.descripcion,
                                                    }))}
                                                    onChange={(selectedOption) => handleChangeGrosor(selectedOption, titulo)}
                                                    placeholder="Grosor"
                                                />

                                                <Select
                                                    styles={Tamaño}
                                                    options={TamanoApi.map((item) => ({
                                                        value: item.etiqueta,
                                                        label: item.etiqueta,
                                                    }))}
                                                    onChange={(event) => handleChangeTamano(event, titulo)}
                                                    placeholder="Tamaño"
                                                />
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Col>                       
    </>
  )
}

export default DisenoEncuestaLateralFuentes
