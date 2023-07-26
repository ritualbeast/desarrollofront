import React, { useState, Fragment, useEffect, useRef } from 'react'
import '../../styles/nuevaEncuesta.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, Modal} from '@mui/material';
import svgManager from '../../assets/svg';
import ModalAñadirLogo from '../Create/ModalAñadirLogo';
import ModalDuplicarSeccion from './ModalDuplicarSeccion';
import ModalSeccionCierre from './ModalSeccionCierre';
import OpcionMultiple from './OpcionMultiple';
import VariacionEstrellas from './VariacionEstrellas';
import $ from 'jquery'
import CargaDatos from './CargaDatos';
import CuadroComentarios from './CuadroComentarios';
import ModalEliminarSeccion from './ModalEliminarSeccion';
import ModalVistaPrevia from './ModalVistaPrevia';
import EditarTituloSeccion from './EditarTituloSeccion';
import { ListarTipoPregunta } from '../../services/PreguntaServices';

const chevronDownSVG = svgManager.getSVG('chevron-down');
const uploadSVG = svgManager.getSVG('upload');
const chevronDownBSVG = svgManager.getSVG('chevron-down-black');
const chevronUpSVG = svgManager.getSVG('chevron-up');
const chevronDownBlackSVG = svgManager.getSVG('chevron-down-black');
const closeSVG = svgManager.getSVG('close');
const copyRosaSVG = svgManager.getSVG('copy-rosa');
const trashSVG = svgManager.getSVG('trash');
const listPlushSVG = svgManager.getSVG('list-plush');
const arrowDownSVG = svgManager.getSVG('arrow-down');
const editSVG = svgManager.getSVG('edit');
const starSVG = svgManager.getSVG('star');
const tableSVG = svgManager.getSVG('table');
const clipBoardSVG = svgManager.getSVG('clip-board');
const warningLightSVG = svgManager.getSVG('warning-light');

const NuevaEncuesta = ({openVistaPrevia, handleCloseVistaPrevia, handleTotalPreguntas, contentInit}) => {
    const [nuevaSeccionVisible, setNuevaSeccionVisible] = useState(false)
    const [nuevaPreguntaVisible, setNuevaPreguntaVisible] = useState(false)
    const [openAñadirLogo, setOpenAñadirLogo] = useState(false);
    const [openDuplicarSeccion, setOpenDuplicarSeccion] = useState(false);
    const [openEliminarSeccion, setOpenEliminarSeccion] = useState(false);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [contentCont, setContentCont] = useState(contentInit);
    const [contentOpt, setContentOpt] = useState([]);
    const [contentVari, setContentVari] = useState([]);
    const [contentCarg, setContentCarg] = useState([]);
    const [contentCuadro, setContentCuadro] = useState([]);
    const [contentEdit, setContentEdit] = useState([]);
    const [indexEliminar, setIndexEliminar] = useState(null);
    const [isUp, setIsUp] = useState(true);
    const [seccionVisible, setSeccionVisible] = useState(Array(contentCont.length).fill(true));
    const [editarTituloVisible, setEditarTituloVisible] = useState(false);
    const [tipoPregunta, setTipoPregunta] = useState([]);
    const [titulo, setTitulo] = useState("Seccion ");
    const [comentario, setComentario] = useState("");
    const [mostrarContenedorC, setMostrarContenedorC] = useState(new Array(contentCont.length).fill(false));

    const handleOpenAñadirLogo = () => {
        setOpenAñadirLogo(true);
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleDuplicarSeccion = () => {
        setOpenDuplicarSeccion(true);
        setBlurBackground(false);
        setIsModalVisible(false);
    }

    const handleEliminarSeccion = (index) => {
      setOpenEliminarSeccion(true)
      setBlurBackground(false);
      setIsModalVisible(false);
      setIndexEliminar(index);
    }

    const handleNewContenedor = () => {
      let obj={
        tipo:'C',
        titulo:titulo,
        comentario:'',
        contentPreg:[]
      }
      setContentCont((prevCont) => [...prevCont, obj]);
      setNuevaSeccionVisible(false);
      setSeccionVisible((prevVisibility) => [...prevVisibility, true]);

      console.log(contentCont)
    };

    const handleSeccionCierre = () => {
      setShowModal(true);
      setNuevaSeccionVisible(false);
    };    

    const handleOptionMultiple = (index) => {
      let obj={
        tipo:'OM',
        save:false,
        pregunta:'',
        cancelar:'',
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;

      console.log('nuevoEstado', nuevoEstado)
      setContentOpt(nuevoEstado);

      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };

    const handleValoracionEstrellas = (index) => {
      let obj={
        tipo:'VE',
        save:false,
        pregunta:'',
        cancelar:'',
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;
      
      setContentVari((prevVari) => [...prevVari, obj]);
      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };

    const handleMatrizValoracion = () => {
      setNuevaPreguntaVisible(false);
    };

    const handleCargaArchivo = (index) => {
      let obj={
        tipo:'CA',
        save:false,
        pregunta: 'Adjunte su CV',
        pregunta2: 'Suba archivos PDF, PNG',
        cancelar:''
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;
      console.log('Nuevo Carga Archivo',nuevoEstado);
      setContentCont(nuevoEstado);
      setContentCarg((prevVari) => [...prevVari, obj]);
      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };
    
    const handleCuadroComentarios = (index) => {
      let obj={
        tipo:'CC',
        save:false,
        pregunta: 'Añada un comentario sobre la charla',
        cancelar:'',
      }

      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[index].contentPreg];
      contenidoActual.push(obj);

      nuevoEstado[index].contentPreg = contenidoActual;

      setContentCuadro((prevVari) => [...prevVari, obj]);
      $(`#NuevaPreg${index +1}`).removeClass("active");
      $(`#NuevaPreg${index +1}`).addClass("inactive");
      $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
      $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
    };

    const handleEditarTitulo = (index) => {
      setMostrarContenedorC((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    
      const seccionActual = contentCont[index];
      const previoTitulo = seccionActual.titulo;
      const previoComentario = seccionActual.comentario;
    
      setTitulo(previoTitulo);
      setComentario(previoComentario);
    
      let obj = {
        tipo: 'C',
        titulo: previoTitulo,
        comentario: previoComentario,
        contentPreg: []
      };
    
      const nuevoEstado = [...contentCont];
      nuevoEstado[index] = obj;
      setContentCont(nuevoEstado);
      $(`#editTitulo${index + 1}`).addClass("ocultar");
    };
    
    const handleCancelarEditarTitulo = (indiceSec) => {
      // Obtiene la sección actual del estado "contentCont" en el índice "indiceSec"
      const seccionActual = contentCont[indiceSec];
    
      // Obtiene los datos previos de "titulo" y "comentario" desde la sección actual
      const previoTitulo = seccionActual.titulo;
      const previoComentario = seccionActual.comentario;
    
      // Actualiza los estados del formulario o componente con los datos previos
      setTitulo(previoTitulo);
      setComentario(previoComentario);
    
      setMostrarContenedorC((prevState) => {
        const newState = [...prevState];
        newState[indiceSec] = !newState[indiceSec];
        return newState;
      });
    
      setEditarTituloVisible(!editarTituloVisible)
    };
    
    const handleAceptarEditarTitulo = (indiceSec, titulo, comentario) => {
      const nuevoEstado = [...contentCont];
      nuevoEstado[indiceSec] = {
        ...nuevoEstado[indiceSec],
        titulo: titulo,
        comentario: comentario
      };
      setContentCont(nuevoEstado);
        
      setMostrarContenedorC(false, indiceSec)
      setEditarTituloVisible(!editarTituloVisible)
    };

    const handleCloseEliminar = () => {
        setOpenAñadirLogo(false);
        setOpenDuplicarSeccion(false);
        setOpenEliminarSeccion(false);
        setBlurBackground(false);
        setIsModalVisible(false);
    };

    const handleMouseEnterEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("oculto");
      $(`#editSec${index +1}`).addClass("visible");
      $(`#Sec${index +1}`).addClass("editar-visible");
    };

    const handleMouseLeaveEditar = (index) => {
      $(`#editSec${index +1}`).removeClass("visible");
      $(`#editSec${index +1}`).addClass("oculto");
      $(`#Sec${index +1}`).removeClass("editar-visible");
    };

    const handleButtonClick = () => {
      setNuevaSeccionVisible(!nuevaSeccionVisible);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target) &&
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setIsActive(false);
          setNuevaPreguntaVisible(false);
          setNuevaSeccionVisible(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [nuevaPreguntaVisible, nuevaSeccionVisible]);

    const handleButtonNuevaPregunta = (index) => {
      // Verificar el estado actual de las acciones
      
      if($(`#NuevaPreg${index +1}`).hasClass('active')){
        $(`#NuevaPreg${index +1}`).removeClass("active");
        $(`#NuevaPreg${index +1}`).addClass("inactive");
        $(`#NuevaPreg${index +1}`).removeClass("editar-visible");
        $(`#NuevaPregVisi${index +1}`).addClass("ocultar");
      }else{
        $(`#NuevaPregVisi${index +1}`).removeClass("ocultar");
        $(`#NuevaPreg${index +1}`).addClass("active");
        $(`#NuevaPreg${index +1}`).removeClass("inactive");
        $(`#NuevaPreg${index +1}`).addClass("editar-visible");
      }
    };

    const handleCancelarOpcionMultiple = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleEliminarOpcionMultiple = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleAceptarOpcionMultiple = (indicePreg, indiceSec, pregunta, opcionesRespuesta, cancelar) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].opcionesRespuesta = opcionesRespuesta
      contenidoActual[indicePreg].save = true
      contenidoActual[indicePreg].cancelar = cancelar
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      console.log(nuevoEstado);
      setContentCont(nuevoEstado);
    };

    const handleGuardarOpcionMultiple = (indiceSeccion, indicePreg, nuevaPregunta) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg] = nuevaPregunta; 
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    };

    const handleEditarOpcionMultiple = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCancelarValoracionEstrellas = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleEliminarValoracionEstrellas = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleAceptarValoracionEstrellas = (indicePreg, indiceSec, pregunta, opcionesRespuesta, selectedColor, selectedIcon, cancelar) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].opcionesRespuesta = opcionesRespuesta
      contenidoActual[indicePreg].selectedColor = selectedColor
      contenidoActual[indicePreg].selectedIcon = selectedIcon
      contenidoActual[indicePreg].cancelar = cancelar
      contenidoActual[indicePreg].save = true
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      console.log(nuevoEstado);
      setContentCont(nuevoEstado);
    };

    const handleGuardarValoracionEstrellas = (indiceSeccion, indicePreg, nuevaPregunta) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg] = nuevaPregunta; 
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    };

    const handleEditarValoracionEstrellas = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCancelarCargaArchivos = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleEliminarCargaArchivos = (indicePreg, indiceSec) => {
      setContentCont((prevContent) => {
        const nuevoEstado = [...prevContent];
        const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
        contenidoActual.splice(indicePreg, 1);
        nuevoEstado[indiceSec].contentPreg = contenidoActual;
        return nuevoEstado;
      });
    };

    const handleAceptarCargaArchivos = (indicePreg, indiceSec, pregunta, pregunta2, cancelar) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].pregunta2 = pregunta2
      contenidoActual[indicePreg].cancelar = cancelar
      contenidoActual[indicePreg].save = true
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      console.log('Aceptar Carga Archivo', nuevoEstado);
      setContentCont(nuevoEstado);
    };

    const handleGuardarCargaDatos = (indiceSeccion, indicePreg, nuevaPregunta) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg] = nuevaPregunta; 
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
      console.log('Guardar Carga Archivo', nuevaPregunta)
    };

    const handleEditarCargaDatos = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
      console.log('Editar Carga Archivo', tempCont)
    }

    const handleCancelarCuadroComentarios = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleEliminarCuadroComentarios = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      setContentCont(nuevoEstado);
      console.log('cancelar - nuevoEstado', nuevoEstado)
    };

    const handleAceptarCuadroComentarios = (indicePreg, indiceSec, pregunta, cancelar) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].save = true
      contenidoActual[indicePreg].cancelar = cancelar
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      console.log(nuevoEstado);
      setContentCont(nuevoEstado);
    };

    const handleGuardarCuadroComentarios = (indiceSeccion, indicePreg, nuevaPregunta) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg] = nuevaPregunta; 
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    };

    const handleEditarCuadroComentarios = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].contentPreg];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].contentPreg = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCambiarPregunta = (indicePreg, indiceSec, value) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].contentPreg];
      contenidoActual[indicePreg].tipo = value
      
      if (value === 'OM') contenidoActual[indicePreg].pregunta = '';
      if (value === 'VE') contenidoActual[indicePreg].pregunta = '';
      if (value === 'MV') contenidoActual[indicePreg].pregunta = '';
      if (value === 'CA') contenidoActual[indicePreg].pregunta = 'Adjunte su CV';
      if (value === 'CA') contenidoActual[indicePreg].pregunta2 = 'Suba archivos PDF, PNG';
      if (value === 'CC') contenidoActual[indicePreg].pregunta = 'Añada un comentario sobre la charla';
      
      nuevoEstado[indiceSec].contentPreg = contenidoActual;
      console.log(nuevoEstado);
      setContentCont(nuevoEstado);
    }

    const handleEliminar = (index) => {
      const nuevoEstado = [...contentCont];
      const contenedorEliminado = nuevoEstado.splice(index, 1)[0];
      setContentCont(nuevoEstado);
      setOpenEliminarSeccion(false)
      console.log(contenedorEliminado)
      console.log(contentCont)
    }

    const cambioIcono = (index) => {
      setIsUp(!isUp);
    };

    const currentIcon = (index) => (seccionVisible[index] ? chevronUpSVG : chevronDownBlackSVG);

    const visibleSeccion = (index) => {
      setSeccionVisible((prevVisibility) => {
        const newVisibility = [...prevVisibility];
        newVisibility[index] = !newVisibility[index];
        return newVisibility;
      });
    };

    handleTotalPreguntas(contentCont);

    const listarTipoPregunta = async () => {
      try {
          const response = await ListarTipoPregunta();
          console.log(response.data.listTipoPreguntas)
          setTipoPregunta(response.data.listTipoPreguntas)
      } catch (error) {
          console.error(error);
      }
    };
  
    useEffect(() => {
        listarTipoPregunta();
    }, [])

  return (
    <>
        <Container className='encuesta-Tercerocuerpo2-1'>
            <Col className='contendor-de-EncuestaVeris'>
              <Col>
                  <p className='titulo-encuesta-tercero'>Encuesta Veris</p>
              </Col>

              {contentCont.map((seccion, index) => {
                  return (
                    <Col>
                      <Col key={index} className='contendor-nuevaEncuesta principal'>
                        <Col 
                          id={`editTitulo${index+1}`}
                          className={editarTituloVisible ? 'titulo-editar' : 'titulo-editar oculto'}
                        >
                            <Col 
                                id={`editSec${index +1}`}
                                className={`contenedor-editar-seccion`}
                            >
                                <p className='titulo-editarEncuesta' onClick={()=> {handleEditarTitulo(index)}}>Editar</p>
                                <div style={{width: '81.6%'}}></div>
                                <span style={{ marginRight: '2.7%', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: copyRosaSVG }} onClick={handleDuplicarSeccion}/>
                                <span style={{cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => handleEliminarSeccion(index)}/>
                            </Col>
                            <Col 
                                id={`Sec${index +1}`}
                                className={`contenedor-tituloNuevaEncuesta `} 
                                onMouseEnter={() => handleMouseEnterEditar(index)}
                                onMouseLeave={() => handleMouseLeaveEditar(index)}
                            >
                                <div style={{width:'96%'}}>
                                  <p className='titulo-nuevaEncuesta'> {seccion.titulo + (index +1)}</p>
                                  <p style={{marginTop:'unset', marginBottom:'unset', marginLeft:'1.5%'}}>{seccion.comentario}</p>
                                </div>
                                <span 
                                  style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} 
                                  onClick={() => {cambioIcono(index); visibleSeccion(index);}}
                                  dangerouslySetInnerHTML={{ __html: currentIcon(index) }} 
                                />

                            </Col>
                        </Col>

                        {seccionVisible[index] && (
                          <div>
                            <Col className='seccion3-nuevaEcuesta'>
                              <Button 
                                  className='boton-logotipo'
                                  onClick={handleOpenAñadirLogo}
                              >
                                  <p className='textoLogotipo'>Logotipo</p>
                                  <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                              </Button>
                            </Col>

                            <div>
                              {mostrarContenedorC[index] && seccion.tipo === 'C' && (
                                <EditarTituloSeccion
                                  indiceSec={index}
                                  contentSec={seccion}
                                  handleEditarCancelar={handleCancelarEditarTitulo}
                                  handleEditarAceptar={handleAceptarEditarTitulo}
                                />
                              )}
                            </div>
                            
                            
                            {seccion.contentPreg.map((preg, indexp) => { 
                              if (preg.tipo == 'OM') {
                                return <OpcionMultiple 
                                  indice={indexp} 
                                  indiceSec = {index} 
                                  save={preg.save}
                                  contentPreg = {preg}
                                  closeopmul={handleCancelarOpcionMultiple} 
                                  onAceptar={handleAceptarOpcionMultiple} 
                                  handleCargaPreg={handleGuardarOpcionMultiple}
                                  handleEditarPregunta={handleEditarOpcionMultiple}
                                  handleEliminarPregunta={handleEliminarOpcionMultiple}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                />
                              }  
                              if (preg.tipo == 'VE') {
                                return <VariacionEstrellas 
                                  indice={indexp} 
                                  indiceSec = {index} 
                                  save={preg.save}
                                  contentPreg = {preg}
                                  closeVariacionEstrellas={handleCancelarValoracionEstrellas}
                                  onAceptarValoracionEstrellas={handleAceptarValoracionEstrellas}
                                  handleCargaPreg={handleGuardarValoracionEstrellas}
                                  handleEditarPregunta={handleEditarValoracionEstrellas}
                                  handleEliminarPregunta={handleEliminarValoracionEstrellas}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                />
                              }
                              if (preg.tipo == 'CA') {
                                return <CargaDatos 
                                  indice={indexp} 
                                  indiceSec = {index}
                                  save={preg.save}
                                  contentPreg = {preg}
                                  closeCargaArchivos={handleCancelarCargaArchivos}
                                  handleCargaArchivos={handleAceptarCargaArchivos}
                                  handleCargaPreg={handleGuardarCargaDatos}
                                  handleEditarPregunta={handleEditarCargaDatos}
                                  handleEliminarPregunta={handleEliminarCargaArchivos}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                />
                              }
                              if (preg.tipo == 'CC') {
                                return <CuadroComentarios
                                  indice={indexp}
                                  indiceSec = {index}
                                  save={preg.save}
                                  contentPreg = {preg}
                                  closeCuadroComentarios={handleCancelarCuadroComentarios}
                                  handleCuadroComentarios={handleAceptarCuadroComentarios}
                                  handleCargaPreg={handleGuardarCuadroComentarios}
                                  handleEditarPregunta={handleEditarCuadroComentarios}
                                  handleEliminarPregunta={handleEliminarCuadroComentarios}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                />
                              }
                              return '';
                            })}
                            
                            <Col className='seccion4-nuevaEcuesta'>
                                <Button
                                  id={`NuevaPreg${index + 1}`}
                                  ref={buttonRef}
                                  className={`boton-NuevaPregunta ${nuevaPreguntaVisible ? 'editar-visible' : ''} ${isActive ? 'active' : 'inactive'}`}
                                  onClick={() => handleButtonNuevaPregunta(index)}
                                >
                                    <p className='textoNuevaPregunta'>Nueva Pregunta</p> 
                                    <hr className='hr'/>
                                    <span style={{marginTop: '3px'}} dangerouslySetInnerHTML={{ __html: chevronDownBSVG }}/>
                                </Button>
                            </Col>
                            
                            <div
                              ref={containerRef}
                              id={`NuevaPregVisi${index + 1}`}
                              className="container-newContendorPregunta ocultar"
                              
                            >
                              <Row style={{width: '25%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', zIndex: '2', background: 'white', marginTop: '9%' }}>
                                <Col className='container-newContendorPregunta-pt1' onClick={()=> { handleOptionMultiple(index) }}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: editSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>{tipoPregunta.find(item => item.tipo === 'OM')?.descripcion}</p>
                                </Col>
                                    
                                <Col className='container-newContendorPregunta-pt2' onClick={() => handleValoracionEstrellas(index)}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: starSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>{tipoPregunta.find(item => item.tipo === 'VE')?.descripcion}</p>
                                </Col>
            
                                <Col className='container-newContendorPregunta-pt3' onClick={handleMatrizValoracion}>
                                  <span style={{ marginTop: '2%', marginLeft:'5.5%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: tableSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>{tipoPregunta.find(item => item.tipo === 'MV')?.descripcion}</p>
                                </Col>
                                      
                                <Col className='container-newContendorPregunta-pt4' onClick={() => handleCargaArchivo(index)}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>{tipoPregunta.find(item => item.tipo === 'CA')?.descripcion}</p>
                                </Col>
            
                                <Col className='container-newContendorPregunta-pt5' onClick={() => handleCuadroComentarios(index)}>
                                  <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: clipBoardSVG }}/>
                                  <p style={{ marginTop: '2%', marginBottom: '2%' }}>{tipoPregunta.find(item => item.tipo === 'CC')?.descripcion}</p>
                                </Col>
                              </Row>
                            </div>
            
                            <Col className='seccion3-nuevaEcuesta'>
                                <Button className='boton-Imgpie'>
                                    <p className='textoLogotipo'>Imagen de pie</p>
                                    <span dangerouslySetInnerHTML={{ __html: uploadSVG }}/>
                                </Button>
                            </Col>
                          </div>
                        )}
                        
                      </Col>
                      <br />
                    </Col>
                  )
              })}

              {showModal && <ModalSeccionCierre />}

              {nuevaSeccionVisible && (
                <Container 
                  ref={containerRef}
                  className={`container-newContendor ${nuevaSeccionVisible ? 'visible' : 'oculto'}`}
                >
                  <Row style={{width: '25%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', zIndex: '2', background: 'white', marginBottom: '2%' }}>
                    <Col className='container-newContendor-pt1' onClick={handleNewContenedor}>
                      <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: listPlushSVG }}/>
                      <p style={{ marginTop: '2%', marginBottom: '2%' }}>Sección con preguntas</p>
                    </Col>
                    
                    <Col className='container-newContendor-pt2' onClick={handleSeccionCierre}>
                      <span style={{ marginTop: '2%', marginLeft:'6%', marginRight: '3%' }} dangerouslySetInnerHTML={{ __html: arrowDownSVG }}/>
                      <p style={{ marginTop: '2%', marginBottom: '2%' }}>Sección de cierre</p>
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
            
            <Button
              ref={buttonRef}
              className={`boton-encuestaT ${nuevaSeccionVisible ? 'editar-visible' : ''}`}
              onClick={handleButtonClick}
            >
              <p className='boton-encuesta-tercero'>Nueva sección</p>
              <span style={{marginTop: '11px', marginLeft: '5px'}} dangerouslySetInnerHTML={{ __html: chevronDownSVG }}/>
            </Button>
        </Container>
        
        <Modal
            open={openAñadirLogo}
            onClose={() => setOpenAñadirLogo(false)}
            sx={{
            width: '60%',
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            marginTop: '5%',
            }}
            BackdropProps={{
            onClick: () => {
                setOpenAñadirLogo(false);
                setBlurBackground(false);
                setIsModalVisible(false);
            },
            }}
        >
            <Box className="encuesta_modalAñadirLogotipo" sx={{ marginTop: '12%', width: '83%', height: '88%' }}>
                <div className="encuesta_modalAñadir_closeicon">
                    <p className="encuesta_modalAñadir__title">Añadir Logotipo</p>
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={() => handleCloseEliminar(false)}
                        className="encuesta_modalAñadir__close"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                    
                <ModalAñadirLogo/>

                <div className='encuesta_modal_cerrarLogo'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                        <Col className="d-flex justify-content-center">
                            <Button className='buttoncancelarlogo' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                <span className='cancelar-logo'>Cancelar</span>
                            </Button>
                            <Button className='buttondeletelogo' variant="contained" color="primary"
                                // onClick={handleEliminar}
                            >
                                <span className='agregarLogotipo'>Agregar logotipo</span>
                            </Button>
                        </Col>
                    </Box>
                </div>
            </Box>
        </Modal>

        <Modal
            open={openDuplicarSeccion}
            onClose={() => setOpenDuplicarSeccion(false)}
            sx={{
            width: '60%',
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            marginTop: '5%',
            }}
            BackdropProps={{
            onClick: () => {
                setOpenDuplicarSeccion(false);
                setBlurBackground(false);
                setIsModalVisible(false);
            },
            }}
        >
            <Box className="encuesta_modalDuplicarSeccion" sx={{ marginTop: '12%', width: '55%', height: '53%' }}>
                <div className="encuesta_modalDuplciar_closeicon">
                    <p className="encuesta_modalDuplicar__title">Duplicar Sección</p>
                    <span
                        dangerouslySetInnerHTML={{ __html: closeSVG }}
                        onClick={() => handleCloseEliminar(false)}
                        className="encuesta_modalDuplicar__close"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                    
                <ModalDuplicarSeccion/>

                <div className='encuesta_modal_cerrarDuplicar'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                        <Col className="d-flex justify-content-center">
                            <Button className='buttoncancelarduplicar' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                <span className='cancelar-duplicar'>Cancelar</span>
                            </Button>
                            <Button className='buttondeleteduplicar' variant="contained" color="primary"
                                // onClick={handleDuplicar}
                            >
                                <span className='duplicar'>Duplicar</span>
                            </Button>
                        </Col>
                    </Box>
                </div>
            </Box>
        </Modal>

        <Modal
            open={openEliminarSeccion}
            onClose={() => setOpenEliminarSeccion(false)}
            sx={{
            width: '60%',
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            marginTop: '5%',
            }}
            BackdropProps={{
            onClick: () => {
                setOpenEliminarSeccion(false);
                setBlurBackground(false);
                setIsModalVisible(false);
              },
            }}
        >
            <Box className="encuesta_modalEliminarSeccion" sx={{ marginTop: '12%', width: '50%', height: '43%' }}>
                <div className="encuesta_modalDuplciar_closeicon">
                    <span style={{marginTop: '5.8%'}} dangerouslySetInnerHTML={{ __html: warningLightSVG }}/>
                    <p className="encuesta_modalElimninar__title">Eliminar Sección</p>
                </div>
                    
                <ModalEliminarSeccion/>

                <div className='encuesta_modal_cerrarEliminar'>
                    <Box sx={{ width: '50%', display: 'contents'}}>
                        <Col className="d-flex justify-content-center">
                            <Button className='buttonCancelarEliminar' variant="contained" color="primary" onClick={handleCloseEliminar}>
                                <span className='cancelar-eliminar'>Cancelar</span>
                            </Button>
                            <Button className='buttonDeleteEliminar' variant="contained" color="primary"
                                onClick={() => handleEliminar(indexEliminar)}
                            >
                                <span className='eliminar'>Eliminar</span>
                            </Button>
                        </Col>
                    </Box>
                </div>
            </Box>
        </Modal>

        <ModalVistaPrevia
            open={openVistaPrevia}
            onClose={handleCloseVistaPrevia}
            contentCont={contentCont}
            showModal={showModal}
        />
    </>
  )
}

export default NuevaEncuesta
