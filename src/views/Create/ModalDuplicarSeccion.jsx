import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import '../../styles/duplicarSeccion.css';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');


const ModalDuplicarSeccion = () => {
  return (
    <>
        <div className='contendedor-duplicarSeccion'>
            Al duplicar esta sección se pegará una nueva abajo de la sección origen. Puede moverla de posición haciendo click en la sección y desplazándola donde desee.
        </div>
    </>
  )
}

export default ModalDuplicarSeccion
