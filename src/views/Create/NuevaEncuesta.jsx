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
import ModalLogotipo from './ModalLogotipo';
import ModalPiePagina from './ModalPiePagina';

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
const edit2SVG = svgManager.getSVG('edit2');

const NuevaEncuesta = ({openVistaPrevia, handleCloseVistaPrevia, handleTotalPreguntas, contentInit,
    sendTamanoPaso2, sendGrosorPaso2,sendTipografiaPaso2, sendImagenFondo , sendFooterImagen

}) => {
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
    const [mostrarContenedorC, setMostrarContenedorC] = useState(new Array(contentCont.length).fill(true));
    const [preguntaVisible, setPreguntaVisible] = useState(Array(contentCont.length).fill(true));
    const tamano = sendTamanoPaso2?.tamano ;
    const titulotamano = sendTamanoPaso2?.titulo;
    const grosor = sendGrosorPaso2?.grosor;
    const tituloGrosor = sendGrosorPaso2?.titulo;
    const tipografia = sendTipografiaPaso2?.tipografia;
    const tituloTipografia = sendTipografiaPaso2?.titulo;
    const [openFondo, setOpenFondo] = useState(false);
    const [openPiePagina, setOpenPiePagina] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [footerFiles, setFooterFiles] = useState([]);
    const [footerPreviews, setFooterPreviews] = useState([]);
    const [tituloStyle, setTituloStyle] = useState({});
    const [descripcionStyle, setDescripcionStyle] = useState({});
    const [imagenFondo, setImagenFondo] = useState(null);


  useEffect(() => {
    setImagenFondo(sendImagenFondo);
    let newStyle = {};
    if (titulotamano === 'Título de sección') {
      newStyle.fontSize = `${tamano}px`;
    }
    if (tituloGrosor === 'Título de sección') {
      newStyle.fontWeight = grosor;
    }
    if (tituloTipografia === 'Título de sección') {
      newStyle.fontFamily = tipografia;
    }

    setTituloStyle(newStyle);
    let newStyle2 = {};
    if (titulotamano === 'Descripción de sección') {
      newStyle2.fontSize = `${tamano}px`;
    }
    if (tituloGrosor === 'Descripción de sección') {
      newStyle2.fontWeight = grosor;
    }
    if (tituloTipografia === 'Descripción de sección') {
      newStyle2.fontFamily = tipografia;
    }
    setDescripcionStyle(newStyle2);

  }, [tamano, grosor, tipografia, imagenFondo]);
    
  

    const handleCloseFondo = () => {
      setOpenFondo(false);
    }
    const handleOpenFondo = () => {
        setOpenFondo(true);
    }

    const handleClosePiePagina = () => {
      setOpenPiePagina(false);
    }

    const handleOpenPiePagina = () => {
        setOpenPiePagina(true);
    }
    

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
        titulo: titulo,
        descripcion: '', 
        orden: contentCont.length + 1,
        imagenCabecera: '',
        imagenPie : '',
        tipoSeccion: 'C',  
        textoAgradecimiento: 'ok',
        urlRedireccion: '',
        imagenCierre: '',   
        textoBotonCierre: '',
        preguntas:[]
      }
      setContentCont((prevCont) => [...prevCont, obj]);
      setNuevaSeccionVisible(false);
      setSeccionVisible((prevVisibility) => [...prevVisibility, true]);

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
      const contenidoActual = [...nuevoEstado[index].preguntas];
      contenidoActual.push(obj);

      nuevoEstado[index].preguntas = contenidoActual;

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
      const contenidoActual = [...nuevoEstado[index].preguntas];
      contenidoActual.push(obj);

      nuevoEstado[index].preguntas = contenidoActual;
      
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
      const contenidoActual = [...nuevoEstado[index].preguntas];
      contenidoActual.push(obj);

      nuevoEstado[index].preguntas = contenidoActual;
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
      const contenidoActual = [...nuevoEstado[index].preguntas];
      contenidoActual.push(obj);

      nuevoEstado[index].preguntas = contenidoActual;

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
        descripcion: previoComentario,
        preguntas: []
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
    
      setEditarTituloVisible((prevVisibility) => prevVisibility.map((visible, i) => (i === indiceSec ? true : false)));
    };
    
    const handleAceptarEditarTitulo = (indiceSec, nuevoTitulo, comentario) => {
      console.log(nuevoTitulo)
      const nuevoEstado = [...contentCont];
      nuevoEstado[indiceSec] = {
        ...nuevoEstado[indiceSec],
        indice: indiceSec,
        titulo: nuevoTitulo,
        comentario: comentario,
        regresar: false,
      };
      if (!nuevoEstado[indiceSec].regresar) {
        setMostrarContenedorC((prevMostrar) => {
          const newMostrar = prevMostrar.map((mostrar, i) => (i === indiceSec ? false : mostrar));
          
          // Llamar a regresarRevision pasando el valor false
          // regresarRevision(newMostrar[indiceSec]);
          
          return newMostrar;
        });
      }
      setContentCont(nuevoEstado);
      console.log(indiceSec)
      $(`#editTitulo${indiceSec + 1}`).removeClass("oculto");
      $(`#editTitulo${indiceSec + 1}`).removeClass("ocultar");
      $(`#editTitulo${indiceSec + 1}`).addClass("visible");
      setMostrarContenedorC((prevVisibility) => prevVisibility.map((visible, i) => (i === indiceSec ? false : visible)));
      setEditarTituloVisible((prevVisibility) => prevVisibility.map((visible, i) => (i === indiceSec ? true : false)));
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
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleEliminarOpcionMultiple = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleAceptarOpcionMultiple = (indicePreg, indiceSec, pregunta, opcionesRespuesta, cancelar, configuraciongeneral,multipleRespuesta,ponderacion) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      contenidoActual[indicePreg].pregunta = pregunta;
      contenidoActual[indicePreg].nemonico = '1S_1P';
      contenidoActual[indicePreg].idTipoPregunta = 1;
      contenidoActual[indicePreg].orden = indiceSec;
      contenidoActual[indicePreg].requerida = '';
      contenidoActual[indicePreg].placeHolder = 'seleccione';
      contenidoActual[indicePreg].mensajeErrorRequerido = '';
      contenidoActual[indicePreg].mensajeError = '';
      contenidoActual[indicePreg].tipoArchivo = '';
      contenidoActual[indicePreg].pesoArchivo = '';
      contenidoActual[indicePreg].multipleRespuesta =  multipleRespuesta;
      contenidoActual[indicePreg].ponderacion = ponderacion;
      contenidoActual[indicePreg].configuracionPregunta = configuraciongeneral;
      contenidoActual[indicePreg].opcionesRespuesta = opcionesRespuesta;
      contenidoActual[indicePreg].preguntasComplementarias = [] ;
      contenidoActual[indicePreg].save = true;
      contenidoActual[indicePreg].cancelar = cancelar;
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
      setPreguntaVisible((prevVisibility) => [...prevVisibility, true]);
    };
    

    const handleEditarOpcionMultiple = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].preguntas];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].preguntas = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCancelarValoracionEstrellas = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleEliminarValoracionEstrellas = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleAceptarValoracionEstrellas = (indicePreg, indiceSec, pregunta, opcionesRespuesta, selectedColor, selectedIcon, cancelar, configuraciongeneral,ponderacion) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      contenidoActual[indicePreg].pregunta = pregunta;
      contenidoActual[indicePreg].nemonico = '1S_1P';
      contenidoActual[indicePreg].idTipoPregunta = 2;
      contenidoActual[indicePreg].orden = indiceSec;
      contenidoActual[indicePreg].requerida = '';
      contenidoActual[indicePreg].placeHolder = 'seleccione';
      contenidoActual[indicePreg].mensajeErrorRequerido = '';
      contenidoActual[indicePreg].mensajeError = '';
      contenidoActual[indicePreg].tipoArchivo = '';
      contenidoActual[indicePreg].pesoArchivo = '';
      contenidoActual[indicePreg].ponderacion = ponderacion;
      contenidoActual[indicePreg].configuracionPregunta = configuraciongeneral;
      contenidoActual[indicePreg].opcionesRespuesta = opcionesRespuesta;
      contenidoActual[indicePreg].preguntasComplementarias = [] ;
      contenidoActual[indicePreg].save = true;
      contenidoActual[indicePreg].cancelar = cancelar;
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      nuevoEstado[indiceSec].tipoSeccion = 'P';
      setContentCont(nuevoEstado);
      setPreguntaVisible((prevVisibility) => [...prevVisibility, true]);
    };

    const handleEditarValoracionEstrellas = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].preguntas];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].preguntas = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCancelarCargaArchivos = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleEliminarCargaArchivos = (indicePreg, indiceSec) => {
      setContentCont((prevContent) => {
        const nuevoEstado = [...prevContent];
        const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
        contenidoActual.splice(indicePreg, 1);
        nuevoEstado[indiceSec].preguntas = contenidoActual;
        return nuevoEstado;
      });
    };

    const handleAceptarCargaArchivos = (indicePreg, indiceSec, pregunta, pregunta2, cancelar,configuraciongeneral, selectedFormats, mensajeError, pesoArchivo) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].nemonico = '1S_1P';
      contenidoActual[indicePreg].idTipoPregunta = 4;
      contenidoActual[indicePreg].orden = indiceSec;
      contenidoActual[indicePreg].requerida = '';
      contenidoActual[indicePreg].placeHolder = 'seleccione';
      contenidoActual[indicePreg].mensajeErrorRequerido = '';
      contenidoActual[indicePreg].mensajeError = mensajeError;
      contenidoActual[indicePreg].tipoArchivo = selectedFormats;
      contenidoActual[indicePreg].pesoArchivo = pesoArchivo;
      contenidoActual[indicePreg].ponderacion = '';
      contenidoActual[indicePreg].configuracionPregunta = configuraciongeneral;
      contenidoActual[indicePreg].opcionesRespuesta = [];
      contenidoActual[indicePreg].save = true;
      contenidoActual[indicePreg].cancelar = cancelar;
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      nuevoEstado[indiceSec].tipoSeccion = 'P';
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
      setPreguntaVisible((prevVisibility) => [...prevVisibility, true]);
    };

    const handleEditarCargaDatos = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].preguntas];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].preguntas = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCancelarCuadroComentarios = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === '') {
        contenidoActual.splice(indicePreg, 1);
      } else if (cancelarValor === 'true') {
        contenidoActual[indicePreg].save = true;
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleEliminarCuadroComentarios = (indicePreg, indiceSec) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      const cancelarValor = contenidoActual[indicePreg].cancelar;
    
      if (cancelarValor === 'true') {
        contenidoActual.splice(indicePreg, 1);
      }
    
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    };

    const handleAceptarCuadroComentarios = (indicePreg, indiceSec, pregunta, cancelar,configuraciongeneral,opcionesRespuesta) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      contenidoActual[indicePreg].pregunta = pregunta
      contenidoActual[indicePreg].nemonico = '1S_1P';
      contenidoActual[indicePreg].idTipoPregunta = 5;
      contenidoActual[indicePreg].orden = indiceSec;
      contenidoActual[indicePreg].requerida = '';
      contenidoActual[indicePreg].placeHolder = 'seleccione';
      contenidoActual[indicePreg].mensajeErrorRequerido = '';
      contenidoActual[indicePreg].mensajeError = '';
      contenidoActual[indicePreg].tipoArchivo = '';
      contenidoActual[indicePreg].pesoArchivo = '';
      contenidoActual[indicePreg].ponderacion = '';
      contenidoActual[indicePreg].configuracionPregunta = configuraciongeneral;
      contenidoActual[indicePreg].opcionesRespuesta = opcionesRespuesta;
      contenidoActual[indicePreg].save = true;
      contenidoActual[indicePreg].cancelar = cancelar;
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      nuevoEstado[indiceSec].tipoSeccion = 'P';
      setContentCont(nuevoEstado);
      setPreguntaVisible((prevVisibility) => [...prevVisibility, true]);
    };

    const handleEditarCuadroComentarios = (indiceSeccion, indicePreg) => {
      const tempCont = [...contentCont];
      const contPregTemp = [...tempCont[indiceSeccion].preguntas];
      contPregTemp[indicePreg].save=false
      tempCont[indiceSeccion].preguntas = contPregTemp;
      setContentCont(tempCont);
    }

    const handleCambiarPregunta = (indicePreg, indiceSec, value) => {
      const nuevoEstado = [...contentCont];
      const contenidoActual = [...nuevoEstado[indiceSec].preguntas];
      contenidoActual[indicePreg].tipo = value
      
      if (value === 'OM') contenidoActual[indicePreg].pregunta = '';
      if (value === 'VE') contenidoActual[indicePreg].pregunta = '';
      if (value === 'MV') contenidoActual[indicePreg].pregunta = '';
      if (value === 'CA') contenidoActual[indicePreg].pregunta = 'Adjunte su CV';
      if (value === 'CA') contenidoActual[indicePreg].pregunta2 = 'Suba archivos PDF, PNG';
      if (value === 'CC') contenidoActual[indicePreg].pregunta = 'Añada un comentario sobre la charla';
      
      nuevoEstado[indiceSec].preguntas = contenidoActual;
      setContentCont(nuevoEstado);
    }

    const handleEliminar = (index) => {
      const nuevoEstado = [...contentCont];
      const contenedorEliminado = nuevoEstado.splice(index, 1)[0];
      setContentCont(nuevoEstado);
      setOpenEliminarSeccion(false)
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
          setTipoPregunta(response.data.listTipoPreguntas)
      } catch (error) {
          console.error(error);
      }
    };
  
    useEffect(() => {
        listarTipoPregunta();
    }, [])

    // capturar imagenes de la seccion
    const onSelectFile = (index, e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFiles(prevFiles => {
          const newFiles = [...prevFiles];
          newFiles[index] = file;
          return newFiles;
        });
    
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setPreviews(prevPreviews => {
            const newPreviews = [...prevPreviews];
            newPreviews[index] = reader.result;
            return newPreviews;
          });
          const nuevoEstado = [...contentCont];
          nuevoEstado[index] = {
            ...nuevoEstado[index],
            imagenCabecera: reader.result,
          };
          setContentCont(nuevoEstado);

        };
    
        reader.readAsDataURL(file); // Lee el archivo como base64
      }
    };

    const onSelectFooterFile = (index, e) => {
      const file = e.target.files[0];
      if (file) {
        setFooterFiles(prevFiles => {
          const newFiles = [...prevFiles];
          newFiles[index] = file;
          return newFiles;
        });
    
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setFooterPreviews(prevPreviews => {
            const newPreviews = [...prevPreviews];
            newPreviews[index] = reader.result;
            return newPreviews;
          });
          const nuevoEstado = [...contentCont];
          nuevoEstado[index] = {
            ...nuevoEstado[index], 
            imagenPie: reader.result,
          };
          setContentCont(nuevoEstado);
        };
    
        reader.readAsDataURL(file); // Lee el archivo como base64
      }
    };


  return (
    <>
      
        <Container className='encuesta-Tercerocuerpo2-1'>
            <Col className='contendor-de-EncuestaVeris'
            style={
              (sendImagenFondo == null || typeof sendImagenFondo === 'undefined') 
              ? null
              : {
                  backgroundImage: `url(${URL.createObjectURL(sendImagenFondo)})`,
                  backgroundSize: '100% 100%',           // Ajusta la imagen para cubrir el contenedor
                  backgroundPosition: 'center',      // Centra la imagen en el contenedor
                  backgroundRepeat: 'no-repeat'      // Evita que la imagen se repita
                }
            }
            >
              <Col>
                  <p className='titulo-encuesta-tercero'
                  
                  >Encuesta Veris1</p>
              </Col>

              {contentCont.map((seccion, index) => {
                  
                  return (
                    <Col key={index}>
                      <Col  className='contendor-nuevaEncuesta principal'>
                        <Col 
                          id={`editTitulo${index+1}`}
                          className={editarTituloVisible ? 'titulo-editar' : 'titulo-editar'}
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
                                  <p className='titulo-nuevaEncuesta' style={tituloStyle}
                                  > {seccion.titulo + (index +1) }</p>
                                  <p 
                                    style={{ descripcionStyle, marginTop:'unset', marginBottom:'unset', marginLeft:'1.5%'}}>{seccion.comentario}</p>
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
                            {selectedFiles[index] ? (
                              <div className="agregarImagenDefinicionEncuesta2">
                                <div className="imageContainer">
                                  <img src={previews[index]} alt="preview" className="imagenLogotipoEncuesta" />
                                </div>
                                <div className="subcontenedorLogotipo">
                                  <div className="buttonLogotipoeditar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById(`file-input${index}`).click()} />
                                    <input type="file" id={`file-input${index}`} style={{ display: 'none' }} onChange={(e) => onSelectFile(index, e)} />
                                  </div>
                                  <div className="buttonLogotipoeliminar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => setSelectedFiles(prevFiles => {
                                      const newFiles = [...prevFiles];
                                      newFiles[index] = null;
                                      return newFiles;
                                    })} />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Col className='seccion3-nuevaEcuesta'>
                                <Button className='boton-logotipo' onClick={() => document.getElementById(`file-input${index}`).click()}>
                                  <p className='textoLogotipo'>Logotipo</p>
                                  <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                                  <input type="file" id={`file-input${index}`} style={{ display: 'none' }} onChange={(e) => onSelectFile(index, e)} />
                                </Button>
                              </Col>
                            )}


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
                            
                            
                            {seccion.preguntas.map((preg, indexp) => { 
                              
                              if (preg.tipo == 'OM') {
                                return <OpcionMultiple 
                                  key={indexp}
                                  indice={indexp} 
                                  indiceSec = {index} 
                                  save={preg.save}
                                  contentPreg = {preg}
                                  closeopmul={handleCancelarOpcionMultiple} 
                                  onAceptar={handleAceptarOpcionMultiple} 
                                  handleEditarPregunta={handleEditarOpcionMultiple}
                                  handleEliminarPregunta={handleEliminarOpcionMultiple}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                  preguntaVisibleOpen={preguntaVisible}
                                  sendTamanoPaso2={sendTamanoPaso2}
                                  sendGrosorPaso2={sendGrosorPaso2}
                                  sendTipografiaPaso2={sendTipografiaPaso2}
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
                                  handleEditarPregunta={handleEditarValoracionEstrellas}
                                  handleEliminarPregunta={handleEliminarValoracionEstrellas}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                  preguntaVisibleOpen={preguntaVisible}
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
                                  handleEditarPregunta={handleEditarCargaDatos}
                                  handleEliminarPregunta={handleEliminarCargaArchivos}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                  preguntaVisibleOpen={preguntaVisible}
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
                                  handleEditarPregunta={handleEditarCuadroComentarios}
                                  handleEliminarPregunta={handleEliminarCuadroComentarios}
                                  handleCambiarPregunta={handleCambiarPregunta}
                                  contentCont={contentCont}
                                  preguntaVisibleOpen={preguntaVisible}
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
            
                            {footerFiles[index] ? (
                              <div className="agregarImagenDefinicionEncuesta2">
                                <div className="imageContainer">
                                  <img src={footerPreviews[index]} alt="preview" className="imagenLogotipoEncuesta" />
                                </div>
                                <div className="subcontenedorLogotipo">
                                  <div className="buttonLogotipoeditar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById(`files-input${index}`).click()} />
                                    <input type="file" id={`files-input${index}`} style={{ display: 'none' }} onChange={(e) => onSelectFooterFile(index, e)} />
                                  </div>
                                  <div className="buttonLogotipoeliminar">
                                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => setFooterFiles(prevFiles => {
                                      const newFiles = [...prevFiles];
                                      newFiles[index] = null;
                                      return newFiles;
                                    })} />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Col className='seccion3-nuevaEcuesta'>
                                <Button className='boton-logotipo' onClick={() => document.getElementById(`file-inputt${index}`).click()}>
                                  <p className='textoLogotipo'>Imagen de Pie</p>
                                  <span dangerouslySetInnerHTML={{ __html: uploadSVG }} />
                                  <input type="file" id={`file-inputt${index}`} style={{ display: 'none' }} onChange={(e) => onSelectFooterFile(index, e)} />
                                </Button>
                              </Col>
                            )}
                            
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
        
        <ModalLogotipo open={openFondo}
         onClose={handleCloseFondo}
           />

        <ModalPiePagina open={openPiePagina}
          onClose={handleClosePiePagina}
        />
        
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
