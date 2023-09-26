import React, { useEffect, useState } from 'react'
import '../../styles/seccionCierre.css';
import { Container, Col, Button, FormControl } from 'react-bootstrap';
import svgManager from '../../assets/svg';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const uploadSVG = svgManager.getSVG('upload');
const chevronUpSVG = svgManager.getSVG('chevron-up');
const copyRosaSVG = svgManager.getSVG('copy-rosa');
const trashSVG = svgManager.getSVG('trash');
const editSVG = svgManager.getSVG('edit');
const edit2SVG = svgManager.getSVG('edit2');

const Agradecimiento = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const URL = styled(FormControl)`
    width: 94.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const ModalSeccionCierre = ({
        contentCont, 
        onClose,
        sendContent,
        tituloStyle,
        sendTamanoPaso2,
        sendGrosorPaso2,
        sendTipografiaPaso2

    }) => {
    const [duplicarSeccionVisible, setDuplicarSeccionVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [contentCon, setContentCon] = useState(contentCont);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [preview1, setPreview1] = useState(null);
    const [textoAgradecimiento, setTextoAgradecimiento] = useState('');
    const [urlRedireccion, setUrlRedireccion] = useState('');
    const [leerPosicionLogotipoPiePagina, setLeerPosicionLogotipoPiePagina] = useState(''); 
    const [leerTamanoLogotipoPiePagina, setLeerTamanoLogotipoPiePagina] = useState('');
    const [isMouseOver, setIsMouseOver] = useState(false); 
    const [hasChanges, setHasChanges] = useState(false);
    const [titulo, setTitulo] = useState('Sección de cierre');
    const [comentario, setComentario] = useState('#');
    const [textobotonCierre, setTextobotonCierre] = useState('Finalizar');
    const [textoCierre, setTextoCierre] = useState({});
    const tamano = sendTamanoPaso2?.tamano ;
    const titulotamano = sendTamanoPaso2?.titulo;
    const grosor = sendGrosorPaso2?.grosor;
    const tituloGrosor = sendGrosorPaso2?.titulo;
    const tipografia = sendTipografiaPaso2?.tipografia;
    const tituloTipografia = sendTipografiaPaso2?.titulo;
    useEffect(() => {
        let newStyle = {};
    if (titulotamano === 'Texto de cierre de encuestas') {
      newStyle.fontSize = `${tamano}px`;
      
    
    }
    if (tituloGrosor === 'Texto de cierre de encuestas') {
      newStyle.fontWeight = grosor;
    }
    if (tituloTipografia === 'Texto de cierre de encuestas') {
      newStyle.fontFamily = tipografia;
    }
    if (Object.keys(newStyle).length > 0) {
    
    setTextoCierre(newStyle);
    }
    }, [tamano, titulotamano, grosor, tituloGrosor, tipografia, tituloTipografia]);
    
    const handleDuplicarSeccion = () => {
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleMouseEnterDuplicar = () => {
        setDuplicarSeccionVisible(true);
        setIsMouseOver(true); 
        
      };
  
      const handleMouseLeaveDuplicar = () => {
        setDuplicarSeccionVisible(false);
        setIsMouseOver(false);
      };  

      const onSelectFile1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Comprobar si el archivo es una imagen
            if (file.type.startsWith('image/')) {
                setSelectedFile1(file);
    
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    let base64String = reader.result;
                    base64String = base64String.replace("data:image/png;base64,", "");
                    // Utiliza la cadena modificada
                    setPreview1(reader.result);
                };
    
                reader.onerror = (error) => {
                    console.error(error);
                };
    
                reader.readAsDataURL(file); // Lee el archivo como base64
            } else {
                toast.error('Por favor, selecciona un archivo de imagen válido.');
                setSelectedFile1(null);
                setPreview1(null);
            }
        } else {
            setSelectedFile1(null);
            setPreview1(null);
        }
      };
      const handleTextoAgradecimiento = (e, posicion) => {
        setTextoAgradecimiento(e.target.value)
      };
      
    const handleUrlRedireccion = (e) => {
        
        setUrlRedireccion(e.target.value)
    }
    
    
    

        const closeSeccionCierre = () => {
            onClose();
            // clear the preview
            setPreview1(undefined)
            setSelectedFile1(undefined)
            setContentCon({
                ...contentCon,
                textoAgradecimiento: '',
                urlRedireccion: '',
                imagenCierre : ''
            })

        }
        const [hasChangeEncabezado, setHasChangeEncabezado] = useState(true)
        const handleEditarSeccion = () => {
            setHasChanges(false)
            setHasChangeEncabezado(false)
        }

        const handleEliminarSeccion = () => {
            onClose();
            // clear the preview
            setPreview1(undefined)
            setSelectedFile1(undefined)
            setContentCon({
                ...contentCon,
                textoAgradecimiento: '',
                urlRedireccion: '',
                imagenCierre : ''
            })
        }

        const handleGuardarEncabezado = () => {
            if (!validacionSeccionCierre()) return
            setHasChangeEncabezado(true)
            setHasChanges(true)
            sendContent(textoAgradecimiento, urlRedireccion , preview1, titulo, comentario, textobotonCierre)
        }

        const validacionSeccionCierre = () => {
            if (textoAgradecimiento === '' || urlRedireccion === '' || preview1 === null || titulo === '' || comentario === '' || textobotonCierre === ''
            ) {
                alert('Por favor, completa todos los campos de cierre.');
                return false
            }
            return true
        }

    

  return (
    <>
        <ToastContainer />
        <br />
        <Container className='encuesta-SeccionCierre'>
            {hasChangeEncabezado ? (
                <Col className="">
                    {isMouseOver && (
                    <Col
                        className={"contenedor-editar-seccionC"}
                    onMouseEnter={handleMouseEnterDuplicar}
                    onMouseLeave={handleMouseLeaveDuplicar}
                    onClick={handleEditarSeccion}
                    >
                    <p className="titulo-editarEncuesta">Editar</p>
                    
                    <span onClick={handleEliminarSeccion} 
                    style={{ marginLeft: "5%"}} dangerouslySetInnerHTML={{ __html: trashSVG }} />
                    </Col>
                    )}

                    <Col
                    className={"contenedor-tituloNuevaEncuestaC"}
                    onMouseEnter={handleMouseEnterDuplicar}
                    onMouseLeave={handleMouseLeaveDuplicar}
                    >
                    <p className="titulo-nuevaEncuesta" style={tituloStyle}
                    >{titulo}</p>
                    <span
                        style={{ display: "flex", alignItems: "center" }}
                        dangerouslySetInnerHTML={{ __html: chevronUpSVG }}
                    />
                    </Col>
                </Col>
            ) : (
                <Container className='tituloSeccion-container-editar'>
                    <Col>
                        <p style={{ marginLeft: '2%', marginBottom: '1%', marginTop:'unset', cursor: 'default' }}>Nombre descripción</p>
                        <input 
                            className="textoAgradecimiento"
                            id='titulo-editar'
                            value={titulo}
                            onChange={(e) => {
                                setTitulo(e.target.value);
                            }}
                            placeholder='Descripción'
                            style={tituloStyle}

                        />
                    </Col>

                    <Col>
                        <p style={{ marginLeft: '2%', marginBottom: '1%', cursor: 'default' }}>
                            Descripción (Opcional)
                        </p>
                        <textarea 
                            className="textoAgradecimiento"
                            value={comentario}
                            onChange={(e) => {
                                setComentario(e.target.value)
                            }}
                            rows={5} // Ajusta el número de filas según tus necesidades
                        />
                    </Col>
                    
                </Container>
            )}

                {selectedFile1 ? (
                              <div className="agregarImagenDefinicionEncuesta2">
                                <div className={`${leerPosicionLogotipoPiePagina == '' ? 'imagenContainer' : leerPosicionLogotipoPiePagina == 38 ? 'posicionLogotipoEncuesta': leerPosicionLogotipoPiePagina == 39 ? 'posicionLogotipoEncuesta2' : null}`}>
             
                                  <img src={preview1} alt="preview" 
                                  className={`${(leerTamanoLogotipoPiePagina== '' ? 'imagenLogotipoEncuesta': leerTamanoLogotipoPiePagina == 1 ? 'imagenLogotipoEncuesta': leerTamanoLogotipoPiePagina == 2 ? 'imagenLogotipoTamanoPequeno' : leerTamanoLogotipoPiePagina == 3 ? 'imagenLogotipoTamanoMediano' : leerTamanoLogotipoPiePagina == 4 ? 'imagenLogotipoTamanoGrande' : null)}`}
                                  />
                                </div>
                                <div className="subcontenedorLogotipo">
                                  <div className="buttonLogotipoeditar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById(`files-input`).click()} />
                                    <input type="file" id={`files-input`} style={{ display: 'none' }} onChange={(e) => onSelectFile1(e)} />
                                  </div>
                                  <div className="buttonLogotipoeliminar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => { setSelectedFile1(null); setPreview1(null); }} />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Col className='seccion3-nuevaEcuesta'>
                                <Button className='boton-logotipo' onClick={() => document.getElementById(`file-inputt`).click()}>
                                  <p className='textoLogotipo'>Imagen de Cierre</p>
                                  <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                                  <input type="file" id={`file-inputt`} style={{ display: 'none' }} onChange={(e) => onSelectFile1(e)} />
                                </Button>
                              </Col>
                            )}
                            
            
                
                {!hasChanges ? (
                    <>
                    <Col className="seccion3-SeccionCierre">
                        <p style={{ marginLeft: '2%' }}>Texto de agradecimiento</p>
                        <Agradecimiento className= 'textoAgradecimiento' type="text" placeholder="Escribe aquí..."  value={textoAgradecimiento}
                        onChange={handleTextoAgradecimiento}
                        />
                    </Col>
                
                    <Col className="seccion4-SeccionCierre">
                        <p style={{ marginLeft: '2%' }}>Url de redirección</p>
                        <URL className= 'urlRedireccion' type="text" placeholder="Escribe aquí..." value={urlRedireccion}
                        onChange={handleUrlRedireccion}
                        />
                    </Col>
                    <Col>
                        <p style={{ marginLeft: '2%' }}>Texto de Botón de cierre </p>
                                            
                        <Button>
                            <input
                                type="text"
                                value={textobotonCierre}
                                onChange={(e) => {
                                    setTextobotonCierre(e.target.value);
                                }}
                                style={{
                                    width: '100%',
                                    color: '#060606',
                                }}
                            />
                        </Button>
                    </Col>
                    
                <Col className='seccion6-SeccionCierre'>
                        <Button className='cancelarSeccion'
                        onClick={closeSeccionCierre }
                        >
                            Cancelar
                        </Button>
                        <Button className='guardarSeccion' 
                        onClick={handleGuardarEncabezado}
                        >
                        
                            Guardar 
                        </Button>
                </Col>


                    </>
                ) : (
                    <>
                        <p style={textoCierre} className='margen'>{textoAgradecimiento}</p>
                        <a
                            className='finalizarSeccion'
                            href={urlRedireccion}
                            style={{
                            color: 'rgba(255, 255, 255, 1)',
                            textDecoration: 'none', // Para quitar el subrayado del enlace
                           
                            }}
                        >
                            {textobotonCierre}
                        </a>
                       
                    </>
                )
                
                }
                
                
               
                
                

                <br />
        </Container>
    </>
    
  )
}

export default ModalSeccionCierre
