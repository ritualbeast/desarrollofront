import React, { useEffect, useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaFuente.css'
import { ListarEnumeradosService } from '../../services/EstilosServices';


const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');

const DisenoEncuestaLateralFuentes = ({openMenuPrincipal, closeMenuFuentes,paso, sendTamano, sendGrosor,sendTipografia 
    ,sendTamanoPaso2, sendGrosorPaso2,sendTipografiaPaso2
 }) => {

    const [showBancoPreguntas, setShowBancoPreguntas] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [pasos, setPasos] = useState(paso);

    useEffect(() => {
        ListarFuenteGrosorEncuesta();
        ListarFuenteTamanoEncuesta();
        ListarFuenteTipografiaEncuesta();
    }, []);


    const ContenedorTamanoLogotipo = () => {
        const [tamanoSeleccionado, setTamanoSeleccionado] = useState('1');
    }
    const handleChangeTamano = (event, titulo) => {
        if (pasos === 2) {
            sendTamanoPaso2(event.target.value, titulo);
        } else {

            sendTamano(event.target.value, titulo);
        }
    };

    const handleChangeGrosor = (event, titulo) => {
        if (pasos === 2) {
            console.log(event.target.value, titulo);
            sendGrosorPaso2(event.target.value, titulo);
        } else {
        sendGrosor(event.target.value, titulo);
        }
    };

    const handleChangeTipografia = (event, titulo) => {
        if (pasos === 2) {
            sendTipografiaPaso2(event.target.value, titulo);
        } else {
        sendTipografia(event.target.value, titulo);
        }
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
                <div
                    className="help-icon"
                    onClick={() => setShowTooltip(!showTooltip)} // Alternar el estado de showTooltip al hacer clic en el ícono de ayuda
                >
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
                <div className="listaBancoPreguntas-2">
                    <div className="fondo-lista">
                        <div className="contenedorCabeceraLogotipo">
                            <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }} onClick={volverMenuPrincipal}/>  
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
                                        <select className="fuenteTituloSelect" onChange={ (event) => handleChangeTipografia(event, titulo)}>
                                        <option value="">Seleccionar tipografía</option>
                                        {TipografiaApi.map((item) => (
                                            <option key={item.id} value={item.etiqueta}>{item.descripcion}</option>
                                        ))}

                                        </select>
                                    </div>

                                    <div className="subcontenedorFuenteTituloselect2">
                                        <select className="fuenteTituloSelect2" onChange={(event) =>handleChangeGrosor(event, titulo)}>
                                        <option value="">Grosor</option>
                                        {GrosorApi.map((item) => (
                                            <option key={item.id} value={item.etiqueta}>{item.descripcion}</option>
                                        ))}

                                        </select>
                                        <select className="fuenteTituloSelect3" onChange={(event) => handleChangeTamano(event, titulo)}>
                                        <option value="">Tamaño</option>
                                        {TamanoApi.map((item) => (
                                            <option key={item.id} value={item.etiqueta}>{item.etiqueta}</option>
                                        ))}

                                        </select>
                                    </div>
                                    </div>
                                )

                            ))}
                        </div>

                    
                    </div>
                    <br />
                    <br />
                </div>
                </div>
            
            </Col>
        </Col>
       
                                
                                
    </>
  )
}

export default DisenoEncuestaLateralFuentes
