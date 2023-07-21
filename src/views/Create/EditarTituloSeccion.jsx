import React, { useState } from 'react'
import '../../styles/cuadroComentarios.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';

const EditarTituloSeccion = ({indice, indiceSec, contentPreg, handleEditarCancelar, handleEditarAceptar, handleEditarGuardar}) => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [titulo, setTitulo] = useState(contentPreg.titulo);
    const [comentario, setComentario] = useState(contentPreg.comentario);
    const [tituloTemp, setTituloTemp] = useState(contentPreg.titulo);
    const [comentarioTemp, setComentarioTemp] = useState(contentPreg.titulo);
    
    const handleEditar = () => {
        setMostrarEditar(true);
        setIsActiveEditar(false)
    };

    const handleCancelarEditar = () => {
        setTitulo(tituloTemp)
        setComentario(comentarioTemp)
        handleEditarCancelar(indice, indiceSec);   
    }

    const handleGuardarEditar = () => {
        const nuevaPregunta = {
            tipo:'E',
            save:false,
            titulo:titulo,
            comentario:comentario,
        };
        setTituloTemp(titulo)
        setComentarioTemp(comentario)
        handleEditarAceptar(indice, indiceSec, titulo, comentario);
    }; 

    return (
    <>
        <Container className='container-cuadroComentarios'>
            <Col className='seccion1-cuadroComentarios'>
                <Col className={`editar-cuadroComentarios ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                    Editar
                </Col>
            </Col>
            
            {mostrarEditar && (
                <Container className='cuadroComentarios-container-editar'>
                    <Col>
                        <p style={{ marginLeft: '2%', marginBottom: '1%', marginTop:'unset', cursor: 'default' }}>Nombre descripción</p>
                        <FormControl 
                        style={{ 
                            width: '92.6%', 
                            border: '1px solid #ccc', 
                            marginLeft: '1.9%', 
                            padding:'1.5%',
                            borderRadius:'4px'
                        }} 
                        id='titulo-editar'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder='Descripción'
                        />
                    </Col>

                    <Col>
                        <p 
                            style={{ 
                                marginLeft: '2%', 
                                marginBottom: '1%', 
                                cursor: 'default' 
                            }}
                        >
                            Descripción (Opcional)
                        </p>
                        <textarea
                            style={{ width: '94.8%', border: '1px solid #ccc' }}
                            className="textoAgradecimiento"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            rows={5} // Ajusta el número de filas según tus necesidades
                        />
                    </Col>
                </Container>
            )}

            <Col className='seccion6-cuadroComentarios'>
                <Button className='cancelarCuadroComentarios' onClick={handleCancelarEditar}>
                    Cancelar
                </Button>
                    
                <Button className='guardarCuadroComentarios' onClick={handleGuardarEditar}>
                    Guardar
                </Button>
            </Col>
        </Container>
    </>
  )
}

export default EditarTituloSeccion
