import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../../styles/consultarRespuesta.css'

const ConsultarRespuesta = () => {
  const [fechaValidez, setFechaValidez] = useState('');
  
  return (
    <div>
      <div className='input-fecha'>
          <h5>
            REPORTE
          </h5>
        <div className='div-fecha'>
            <label className='label'>
              Inicio
              <input type="date" onChange={ (event) => setFechaValidez(event.target.value) }/>
            </label>

            <label className='label'>
              Fin
              <input type="date" onChange={ (event) => setFechaValidez(event.target.value) }/>
            </label>
        </div>
      </div>

      <div className="mb-2">
        <Button variant="primary" size="md">
          Cargar Datos
        </Button>{' '}
        <Button variant="secondary" size="md">
          Exportar Excel
        </Button>
      </div>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Codigo Encuestado</th>
          <th>Codigo Pregunta</th>
          <th>Codigo Respuesta</th>
          <th>Calificacion</th>
          <th>Respuesta</th>
          <th>Fecha Respuesta</th>
          <th>Dato Único 1</th>
          <th>Dato Único 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10209310</td>
          <td>299</td>
          <td>El doctor le explicó al respecto del cuidado que debía recibir el paciente en casa?</td>
          <td>11988701</td>
          <td>n/a</td>
          <td>22-01-02</td>
          <td>1237872939</td>
          <td>0</td>
        </tr>
        <tr>
          <td>10209310</td>
          <td>299</td>
          <td>El doctor le explicó al respecto del cuidado que debía recibir el paciente en casa?</td>
          <td>11988701</td>
          <td>n/a</td>
          <td>22-01-02</td>
          <td>1237872939</td>
          <td>0</td>
        </tr>
        <tr>
          <td>10209310</td>
          <td>299</td>
          <td>El doctor le explicó al respecto del cuidado que debía recibir el paciente en casa?</td>
          <td>11988701</td>
          <td>n/a</td>
          <td>22-01-02</td>
          <td>1237872939</td>
          <td>0</td>
        </tr>
        <tr>
          <td>10209310</td>
          <td>299</td>
          <td>El doctor le explicó al respecto del cuidado que debía recibir el paciente en casa?</td>
          <td>11988701</td>
          <td>n/a</td>
          <td>22-01-02</td>
          <td>1237872939</td>
          <td>0</td>
        </tr>
        <tr>
          <td>10209310</td>
          <td>299</td>
          <td>El doctor le explicó al respecto del cuidado que debía recibir el paciente en casa?</td>
          <td>11988701</td>
          <td>n/a</td>
          <td>22-01-02</td>
          <td>1237872939</td>
          <td>0</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}

export default ConsultarRespuesta
