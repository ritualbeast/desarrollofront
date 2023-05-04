import React from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/consultarReporte.css'
const ConsultarReporte = () => {
  return (
    <div>

      <div className='consulta'>
        <label htmlFor="reporte">Consultar Reporte</label>
        <input className='input-reporte' type="text" id='reporte' name='reporte' placeholder='Consultar Reporte' />
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

export default ConsultarReporte
