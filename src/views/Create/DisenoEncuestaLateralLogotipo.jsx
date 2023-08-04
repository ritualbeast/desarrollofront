import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import svgManager from '../../assets/svg';
import '../../styles/disenoEncuestaLogo.css'
import Logo from '../../assets/img/LOGO_VERIS.jpg'
import Select from 'react-select';

const helpCircleSVG = svgManager.getSVG('help-circle');
const xSVG = svgManager.getSVG('x');
const infoSVG = svgManager.getSVG('info');
const chevronleftSVG = svgManager.getSVG('chevronleft');

const Categoria = {
    container: (provided, state) => ({
      ...provided,
      width: '109%',
      marginTop: '0.5%',
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

const DisenoEncuestaLaterallogotipo = () => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tamanoSeleccionado, setTamanoSeleccionado] = useState('a');
    const [posicion, setPosicion] = useState('');

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

    const positions = [
        { value: '1', label: 'Izquierda' },
        { value: '2', label: 'Derecha' },
        { value: '3', label: 'Centro' },
        { value: '4', label: 'Arriba' },
        { value: '5', label: 'Abajo' },
    ]

    const handlePosition = (selectedOption) => {
        setPosicion(selectedOption.value);
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
                    <div className="listaBancoPreguntas-2" style={{paddingBottom:'25%'}}>
                        <div className="fondo-lista">
                            <div className="contenedorCabeceraLogotipo">
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html:  chevronleftSVG }}/>
                                <span className='cabeceraTitle'>Cabezera</span>
                            </div>

                            <div className="contenedorLogotipo">
                                <img src={Logo} width={160} height={72} alt="Logo" />
                            </div>

                            <div className="contenedorContenedorTamano">
                                <span className='contenedortamanoLogotipoTamano'>Tamaño</span>

                                <div className="contenedortamanoLogotipo">
                                    <div className='radioLogotipo'>
                                    {tamano.map((opcion) => (
                                        <div key={opcion.id} className="radioOption">
                                        <RadioButton
                                            id={opcion.id.toString()}
                                            value={opcion.id.toString()}
                                            checked={tamanoSeleccionado === opcion.id.toString()}
                                            onChange={handleChangeTamano}
                                            label={opcion.nombre}
                                        />
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>

                            <div className="contenedorContenedorPosicion">
                                <span className='contenedorPosicionLabel'>Posición</span>
                                
                                <div className="contenedorPosicion">
                                    <Select
                                        styles={Categoria}
                                        options={positions}
                                        value={positions.find((option) => option.value === posicion)}
                                        onChange={handlePosition}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Col>                       
    </>
  )
}

export default DisenoEncuestaLaterallogotipo
