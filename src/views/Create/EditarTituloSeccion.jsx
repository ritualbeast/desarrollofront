import React, { useState } from 'react'
import '../../styles/editarTituloSeccion.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';

const EditarTituloSeccion = ({indiceSec, contentSec, handleEditarCancelar, handleEditarAceptar, handleEditarGuardar}) => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [titulo, setTitulo] = useState(contentSec.titulo);
    const [comentario, setComentario] = useState(contentSec.comentario);
    const [tituloTemp, setTituloTemp] = useState(contentSec.titulo);
    const [comentarioTemp, setComentarioTemp] = useState(contentSec.comentario);
    const [isInputFilled, setIsInputFilled] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    
    const handleEditar = () => {
        setMostrarEditar(true);
        setIsActiveEditar(false)
    };

    const handleCancelarEditar = () => {
        setTitulo(tituloTemp)
        setComentario(comentarioTemp)
        handleEditarCancelar(indiceSec);   
    }

    const handleGuardarEditar = () => {
        if (!hasChanges) {
            // No guardar si no hay cambios en el FormControl
            return;
          }
        setTituloTemp(titulo)
        setTitulo('');
        setIsInputFilled(false);
        setComentarioTemp(comentario)
        handleEditarAceptar(indiceSec, titulo, comentario);
    };    

    return (
    <>
        <Container className='container-tituloSeccion'>
            <Col className='seccion1-tituloSeccion'>
                <Col className={`editar-tituloSeccion ${isActiveEditar ? 'active' : 'inactive'}`} onClick={handleEditar}>
                    Editar
                </Col>
            </Col>
            
            {mostrarEditar && (
                <Container className='tituloSeccion-container-editar'>
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
                        onChange={(e) => {
                            const inputValue = e.target.value.trim();
                            setTitulo(e.target.value);
                            setIsInputFilled(e.target.value.trim() !== '');
                            setHasChanges(inputValue !== contentSec.titulo);
                          }}
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

            <Col className='seccion6-tituloSeccion'>
                <Button className='cancelartituloSeccion' onClick={handleCancelarEditar}>
                    Cancelar
                </Button>
                    
                <Button 
                    className={isInputFilled ? 'guardartituloSeccion filled' : 'guardartituloSeccion'} 
                    onClick={handleGuardarEditar}
                >
                    Guardar
                </Button>
            </Col>
        </Container>
    </>
  )
}

export default EditarTituloSeccion
