import React, { useState } from 'react'
import { Col, Button } from 'react-bootstrap';
import '../styles/createFin.css'
import LogoFinalizar from '../assets/img/Logo-finalizar.png'
import ModalObtenerUrl from '../util/ModalObtenerUrl';
const CreateFin = () => {
  const [openFondo, setOpenFondo] = useState(false);

  const handleCloseFondo = () => {
    setOpenFondo(false);
  }

  const handleOpenFondo = () => {
    setOpenFondo(true);
  }
  return (
    <>
      <Col className='contenedor-createFin'>
        <img 
          src={LogoFinalizar} 
          alt="Logo Finalizar" 
          style={{width:'70%', display:'flex', marginLeft: 'auto', marginRight: 'auto'}}
        />

        <h2 
          style={{color:'rgba(255, 65, 151, 1)', 
          textAlign:'center', 
          marginTop:'6%'}}
        >
          ¡En hora buena!
        </h2>

        <p
          style={{textAlign:'center', marginLeft:'2%', marginRight:'2%'}}
        >
          Haz completado todos los pasos para la programación de tu encuesta, puedes obtener la URL y compartirla a quien desees
        </p>
        
        <Col style={{display:'flex', justifyContent: 'center'}}>
          <Button className='button-obtenerURL-createFin' onClick={handleOpenFondo}>
            Obtener URL
          </Button>
          <Button className='button-irEncuestas-createFin'>
            Ir a encuestas
          </Button>
        </Col>
        
      </Col>

      <ModalObtenerUrl 
        open={openFondo}
        onClose={handleCloseFondo}
      />
      
    </>
  )
}

export default CreateFin
