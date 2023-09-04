import React, { useEffect, useState } from 'react'
import '../../styles/revision.css'
import { FormControl, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import svgManager from '../../assets/svg';
import { ListarEnumeradosService } from '../../services/EnumeradosServices';
import styled from 'styled-components';
import Select from 'react-select';

const fileSVG = svgManager.getSVG('file');
const listRosaSVG = svgManager.getSVG('list-rosa');
const editRosaSVG = svgManager.getSVG('edit-rosa');

const IngreseTexto = styled(FormControl)`
    width: 99.8% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const NumeroPreguntas = styled(FormControl)`
    width: 99.8% !important;
    border: 1px solid #ccc !important;
    outline: none;
    background: rgba(245, 245, 245, 1); 
    color: rgba(158, 158, 158, 1);
    border-color: rgba(224, 224, 224, 1);
    cursor: default;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const NumeroRespuestas = styled(FormControl)`
    width: 99.5% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Categoria = {
    container: (provided, state) => ({
      ...provided,
      width: '97.3%',
      marginTop: '0.5%'
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

const Vigencia = {
    container: (provided, state) => ({
      ...provided,
      width: '97.3%',
      marginTop: '0.5%'
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

const options = [
    { value: 'desempeño del empleado', label: 'Desempeño del empleado' },
    { value: 'opción 2', label: 'Opción 2' },
    { value: 'opción 3', label: 'Opción 3' },
]

const Revision = ({regresar, handleTotalPreguntas}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateInicio, setSelectedDateInicio] = useState('');
    const [selectedDateFin, setSelectedDateFin] = useState('');
    const [contenedorSeleccionado, setContenedorSeleccionado] = useState(null);
    const location = useLocation();
    const [totalConteo, setTotalConteo] = useState()
    const [Opcion1, setOpcion1] = useState(false);
    const [Opcion2, setOpcion2] = useState(false);
    const [Opcion3, setOpcion3] = useState(false);
    const [tipoVigencia, setTipoVigencia] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [selectedEnumerados, setSelectedEnumerados] = useState({
        value: '',
        label: 'Seleccionar tipo de vigencia',
    });

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleDateIF = (event) => {
        const selectedDate = event.target.value;
        
        if (selectedDateInicio && !selectedDateFin) {
          // Si ya se seleccionó una fecha de inicio y aún no se ha seleccionado la fecha final, establecer la fecha final.
          setSelectedDateFin(selectedDate);
        } else {
          // En cualquier otro caso, establecer la fecha de inicio.
          setSelectedDateInicio(selectedDate);
          setSelectedDateFin(''); // Reiniciar la fecha final cuando se selecciona una nueva fecha de inicio.
        }
    };

    const handleOptionChange = (selectedOption) => {
        setSelectedEnumerados(selectedOption);
        const selectedId = parseInt(selectedOption.value);
        setOpcion1(selectedId === 3);
        setOpcion2(selectedId === 4);
        setOpcion3(selectedId === 5);
    };
      
    const total = () => {
        let totalContenedoresC = 0;
        let totalDatosContentPreg = 0;

        handleTotalPreguntas.forEach((item) => {
        if (item.tipo === 'C') {
            totalContenedoresC++;
            totalDatosContentPreg += item.contentPreg.length;
        }
        });
        setTotalConteo(totalDatosContentPreg)
    }

    useEffect(() => {
        total();
        listarEnumeradosVigencia();
    }, [])

    const listarEnumeradosVigencia = async () => {
        try {
            const response = await ListarEnumeradosService('TIPO_VIGENCIA');
            setTipoVigencia(response.data.listaEnumerados);
            const defaultTipo = response.data.listaEnumerados.find((item) => item.id === '');
            if (defaultTipo) {
                const data={
                    value: defaultTipo.id,
                    label:defaultTipo.etiqueta
                }
                setSelectedEnumerados(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoriaChange = (selectedOption) => {
        setCategoriaSeleccionada(selectedOption.value);
    };
    
    return (
        <div>
            <Col>
                <p className='titulo-revision'>
                    Revisar que todo sea correcto para finalizar, puede editar la información de la encuesta
                </p>
            </Col>

            <Col className='revision-seccion2'>
                <Col className='revision-seccion2-1'>
                    <p style={{marginBottom:'unset'}}>Nombre de la encuesta</p>
                    <IngreseTexto type="text" placeholder="Ingrese su texto" />
                </Col>

                <Col className='revision-seccion2-2'>
                    <p style={{marginBottom:'unset'}}>Categoría:</p>
                    <Select
                        styles={Categoria}
                        options={options}
                        value={options.find((option) => option.value === categoriaSeleccionada)}
                        onChange={handleCategoriaChange}
                    />
                </Col>
            </Col>
                
            <Col className='revision-seccion3'>
                <Col className='select-vigencia'>
                    <p style={{marginBottom:'unset'}}>Vigencia</p>
                    <Select
                        styles={Vigencia}
                        onChange={handleOptionChange}
                        options={tipoVigencia.map((item) => ({
                            value: item.id,
                            label: item.etiqueta,
                        }))}
                        value={selectedEnumerados}
                    />
                </Col>

                <Col className='revision-seccion3-2'>
                    <p style={{marginBottom:'unset', color:'rgba(158, 158, 158, 1)'}}>Número de preguntas</p>
                    <NumeroPreguntas 
                        type="text" 
                        readOnly 
                        value={totalConteo} 
                    />
                </Col>
            </Col>

            <Col>
                {Opcion2 && (
                    <Col className='revision-seccion3-1'>
                        <p style={{marginBottom:'unset'}}>{tipoVigencia && tipoVigencia.find(item => item.id === 4)?.etiqueta}</p>
                        <NumeroRespuestas  
                            type="text" 
                        />
                    </Col>
                )}
                {Opcion1 && (
                    <Col className='revision-seccion3-2'>
                        <p style={{marginBottom:'unset'}}>{tipoVigencia && tipoVigencia.find(item => item.id === 3)?.etiqueta}</p>
                        <p style={{marginBottom:'unset', marginTop:'0.5%'}}>Inicio</p>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Col>
                )}
                {Opcion3 && (
                    <Col className='revision-seccion3-3'>
                        <p style={{marginBottom:'unset'}}>{tipoVigencia && tipoVigencia.find(item => item.id === 5)?.etiqueta}</p>
                        <div style={{display:'flex', width: '102.6%'}}>
                            <div style={{width:'112%'}}>
                                <p style={{width:'85%', marginBottom:'unset', marginTop:'1%'}}>Inicio</p>
                                <input
                                    type="date"
                                    value={selectedDateInicio}
                                    onChange={handleDateIF}
                                    style={{width:'85%', marginRight:'2%'}}
                                />
                            </div>
                            <div style={{width:'100%'}}>
                                <p style={{width:'85%', marginBottom:'unset', marginTop:'1%'}}>Fin</p>
                                <input
                                    type="date"
                                    value={selectedDateFin}
                                    onChange={handleDateIF}
                                    style={{width:'95%'}}
                                />
                            </div>
                        </div>
                        
                    </Col>
                )}
            </Col>

            <Col className='revision-seccion4'>
                <Col className='revision-seccion4-1'>
                    <p style={{marginBottom:'1.5%'}}>Formato de la encuesta</p>
                </Col>
                <Col className='revision-seccion4-2'>
                    <Col
                        className={`revision-seccion4-2-1 ${contenedorSeleccionado === 'contenedor1' ? 'seleccionado' : ''}`}
                        onClick={() => setContenedorSeleccionado('contenedor1')}
                    >
                        <Col style={{display:'flex'}}>
                            <span dangerouslySetInnerHTML={{ __html: fileSVG }} style={{display:'flex', alignItems:'center', padding:'4%'}}/>
                            <div className='texto-revision-1'>
                                <h4 style={{marginBottom:'unset', marginTop:'3.5%'}}>Clásico</h4>
                                <p style={{marginTop:'unset', marginBottom:'3.5%'}}>Muestra todas las preguntas en una página al mismo tiempo</p>
                            </div>
                        </Col>
                    </Col>

                    <Col
                        className={`revision-seccion4-2-2 ${contenedorSeleccionado === 'contenedor2' ? 'seleccionado' : ''}`}
                        onClick={() => setContenedorSeleccionado('contenedor2')}
                    >
                        <Col style={{display:'flex'}}>
                            <span dangerouslySetInnerHTML={{ __html: listRosaSVG }} style={{display:'flex', alignItems:'center', padding:'4%'}}/>
                            <div className='texto-revision-2'>
                                <h4 style={{marginBottom:'unset', marginTop:'3.5%'}}>Una pregunta a la vez</h4>
                                <p style={{marginTop:'unset', marginBottom:'3.5%'}}>Pasa de forma automática a la siguiente pregunta</p>
                            </div>
                        </Col>
                    </Col>

                    <Col
                        className={`revision-seccion4-2-3 ${contenedorSeleccionado === 'contenedor3' ? 'seleccionado' : ''}`}
                        onClick={() => setContenedorSeleccionado('contenedor3')}
                    >
                        <Col style={{display:'flex'}}>
                            <span dangerouslySetInnerHTML={{ __html: editRosaSVG }} style={{display:'flex', alignItems:'center', padding:'4%'}}/>
                            <div className='texto-revision-3'>
                                <h4 style={{marginBottom:'unset', marginTop:'3.5%'}}>Una pregunta a la vez editable</h4>
                                <p style={{marginTop:'unset', marginBottom:'3.5%'}}>Pasa de forma automática a la siguiente pregunta</p>
                            </div>
                        </Col>
                    </Col>
                </Col>
                
            </Col>

            <Col className='revision-seccion5'>
                <Button 
                    className='revision-Regresar'
                    onClick={regresar}
                    
                >
                    Regresar
                </Button>
                <Link 
                    to="/create/finalizar"
                    className={`revision-Finalizar ${location.pathname === '/create/finalizar' ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
                >
                    Finalizar
                </Link>
            </Col>
        </div>
    )
}

export default Revision
