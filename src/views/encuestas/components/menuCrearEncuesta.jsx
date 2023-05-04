import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import '../styles/global.css'
import {lista2} from '../helpers/lista.ts'
const menuCrearEncuesta = () => {
  return (
    <Row>
    <Col xs={2} id="sidebar-wrapper">
    {lista2.map((item) => (
      <Link to={`/${item.nombre.toLowerCase()}`} key={item.nombre}>
        <div>
          <img src= {item.icono} width="50" height="50"/>
        </div>
      </Link>
    ))}
    </Col>
  </Row>
  )
}
export default menuCrearEncuesta
