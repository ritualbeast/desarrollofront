import React, { useState } from 'react'
import '../../styles/revision.css'
import { FormControl, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import svgManager from '../../assets/svg';

const fileSVG = svgManager.getSVG('file');
const listRosaSVG = svgManager.getSVG('list-rosa');

const Revision = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [contenedorSeleccionado, setContenedorSeleccionado] = useState(null);
    const location = useLocation();

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

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
                    <FormControl type="text" placeholder="Ingrese su texto" />
                </Col>
                <Col className='revision-seccion2-2'>
                    <p style={{marginBottom:'unset'}}>Categoría:</p>
                    <select value="option1">
                        <option value="option1">Desempeño del empleado</option>
                        <option value="option2">Opción 2</option>
                        <option value="option3">Opción 3</option>
                    </select>
                </Col>
            </Col>
                
            <Col className='revision-seccion3'>
                <Col className='revision-seccion3-1'>
                    <p style={{marginBottom:'unset'}}>Fecha inicio/fin</p>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Col>
                <Col className='revision-seccion3-2'>
                    <p style={{marginBottom:'unset'}}>Numero de preguntas</p>
                    <FormControl type="text" placeholder="Ingrese su texto" />
                </Col>
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
                            <span dangerouslySetInnerHTML={{ __html: fileSVG }} style={{display:'flex', alignItems:'center', padding:'2%'}}/>
                            <div className='texto-revision-1'>
                                <p style={{marginBottom:'unset', marginTop:'3.5%'}}>Clásico</p>
                                <p style={{marginTop:'unset', marginBottom:'3.5%'}}>Muestra todas las preguntas en una página al mismo tiempo</p>
                            </div>
                        </Col>
                    </Col>
                    <Col
                        className={`revision-seccion4-2-2 ${contenedorSeleccionado === 'contenedor2' ? 'seleccionado' : ''}`}
                        onClick={() => setContenedorSeleccionado('contenedor2')}
                    >
                        <Col style={{display:'flex'}}>
                            <span dangerouslySetInnerHTML={{ __html: listRosaSVG }} style={{display:'flex', alignItems:'center', padding:'2%'}}/>
                            <div className='texto-revision-2'>
                                <p style={{marginBottom:'unset', marginTop:'3.5%'}}>Una pregunta a la vez</p>
                                <p style={{marginTop:'unset', marginBottom:'3.5%'}}>Pasa de forma automática a la siguiente pregunta</p>
                            </div>
                        </Col>
                    </Col>
                </Col>
                
            </Col>

            <Col className='revision-seccion5'>
                <Button className='revision-Regresar'>
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
