import React, { useState } from 'react'
import '../../styles/editarTituloSeccion.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Titulo = styled(FormControl)`
    width: 92.6% !important;
    border: 1px solid #ccc !important;
    outline: none;
    margin-left: 1.9% !important;
    padding: 1.5% !important;
    border-radius: 4px !important;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Subtitulo = styled.textarea`
    width: 94.8%;
    border: 1px solid #ccc;
    border-radius:4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const EditarTituloSeccion = ({indiceSec, contentSec, handleEditarCancelar, handleEditarAceptar, handleEditarGuardar}) => {
    const [mostrarEditar, setMostrarEditar] = useState(true);
    const [isActiveEditar, setIsActiveEditar] = useState(false);
    const [titulo, setTitulo] = useState(contentSec.titulo);
    const [comentario, setComentario] = useState(contentSec.comentario);
    const [tituloTemp, setTituloTemp] = useState(contentSec.titulo);
    const [comentarioTemp, setComentarioTemp] = useState(contentSec.comentario);
    const [isInputFilled, setIsInputFilled] = useState(false);
    const [isInputFilled2, setIsInputFilled2] = useState(false);
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

        // Eliminar el número de índice del título
        
        const nuevoTitulo = titulo.replace(new RegExp(` ${indiceSec + 1}$`), '');
        
        setTituloTemp(nuevoTitulo)
        setTitulo('');
        setComentario('');
        setIsInputFilled(false);
        setComentarioTemp(comentario)
        handleEditarAceptar(indiceSec, nuevoTitulo, comentario);
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
                        <Titulo 
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
                        <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>
                            Descripción (Opcional)
                        </p>
                        <Subtitulo
                            className="textoAgradecimiento"
                            value={comentario}
                            onChange={(e) => {
                                const inputValue = e.target.value.trim();
                                setComentario(e.target.value)
                                setIsInputFilled2(e.target.value.trim() !== '');
                                setHasChanges(inputValue !== contentSec.comentario);
                            }}
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
                    className={isInputFilled && isInputFilled2
                         ? 'guardartituloSeccion filled' : 'guardartituloSeccion'} 
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
