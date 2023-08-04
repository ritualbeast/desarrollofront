import React, {useState, useEffect, useRef} from 'react'
import svgManager from '../../assets/svg'
import '../../styles/definicionEncuestaCuerpo.css'
import styled from 'styled-components';

const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const edit2SVG = svgManager.getSVG('edit2');
const trashSVG = svgManager.getSVG('trash');

const NombreEncuesta = styled.input`
    width: 97.3% !important;
    height: 2.2% !important;
    border: 1px solid #ccc !important;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1) !important;
    }
`;

const Descripcion = styled.textarea`
    width: 94.8%; 
    border: 1px solid #ccc;
    border-radius:4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const Leyenda = styled.textarea`
    width: 94.8%; 
    border: 1px solid #ccc;
    border-radius:4px;
    outline: none;

    &:focus {
        border: 2px solid rgba(255, 206, 72, 1);
    }
`;

const DefinicionEncuestaCuerpo = ({ sendEstado3, sendPosicion3, 
  sendTamano3, sendGrosor3, sendTipografia3, sendPreview, sendPreview2, sendDatosDefinicionEncuesta,
  sendPosicionLogotipo, sendTamanoLogotipo
}) => {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [leerPosicion, setLeerPosicion] = useState(sendPosicion3);
  const [datosDefinicionEncuesta, setDatosDefinicionEncuesta] = useState({nombre: '', descripcion: '', leyenda: ''});
  const [leerPosicionLogotipo, setLeerPosicionLogotipo] = useState(sendPosicionLogotipo);
  const [leerTamanoLogotipo, setLeerTamanoLogotipo] = useState(sendTamanoLogotipo);
  // capturar tamaño de letra para enviar a create
  const [tamanoNombreDefinicion, setTamanoNombreDefinicion] = useState(0);
  const [tamanoDescripcionDefinicion, setTamanoDescripcionDefinicion] = useState(0);
  const [tamanoLeyendaDefinicion, setTamanoLeyendaDefinicion] = useState(0);
  const [tamanoBotonDefinicion, setTamanoBotonDefinicion] = useState(0);
  // capturar grosor de letra para enviarl a create
  const [grosorNombreDefinicion, setGrosorNombreDefinicion] = useState('');
  const [grosorDescripcionDefinicion, setGrosorDescripcionDefinicion] = useState('');
  const [grosorLeyendaDefinicion, setGrosorLeyendaDefinicion] = useState('');
  const [grosorBotonDefinicion, setGrosorBotonDefinicion] = useState('');
  // capturar tipografia de letra para enviar a create
  const [tipografiaNombreDefinicion, setTipografiaNombreDefinicion] = useState('');
  const [tipografiaDescripcionDefinicion, setTipografiaDescripcionDefinicion] = useState('');
  const [tipografiaLeyendaDefinicion, setTipografiaLeyendaDefinicion] = useState('');
  const [tipografiaBotonDefinicion, setTipografiaBotonDefinicion] = useState('');

  const tamano = sendTamano3?.tamano ;
  const titulotamano = sendTamano3?.titulo;
  const grosor = sendGrosor3?.grosor;
  const tituloGrosor = sendGrosor3?.titulo;
  const tipografia = sendTipografia3?.tipografia;
  const tituloTipografia = sendTipografia3?.titulo;
  const inputNombreRef = useRef(null);
  const inputDescripcionRef = useRef(null);
  const inputLeyendaRef = useRef(null);
  const inputBotonRef = useRef(null);

  useEffect(() => {
    // Envía el valor de preview1 a la función prop previewSend inmediatamente cuando cambie
    const inputNombreElement = inputNombreRef.current;
    const inputDescripcionElement = inputDescripcionRef.current;
    const inputLeyendaElement = inputLeyendaRef.current;
    const inputBotonElement = inputBotonRef.current;

      if (titulotamano === 'Nombre de encuesta') {
        inputNombreElement.style.fontSize = `${tamano}px`;
        setTamanoNombreDefinicion(tamano);
      }   
      if ( tituloGrosor === 'Nombre de encuesta' ) {
        inputNombreElement.style.fontWeight = grosor;
        setGrosorNombreDefinicion(grosor);
      }   
      if ( tituloTipografia === 'Nombre de encuesta') {
        inputNombreElement.style.fontFamily = tipografia;
        setTipografiaNombreDefinicion(tipografia);
      } 
       if (titulotamano === 'Descripción de encuesta') {
        inputDescripcionElement.style.fontSize = `${tamano}px`;
        setTamanoDescripcionDefinicion(tamano);
      } 
       if ( tituloGrosor === 'Descripción de encuesta' ) {
        inputDescripcionElement.style.fontWeight = grosor;
        setGrosorDescripcionDefinicion(grosor);
      }  
      if (tituloTipografia === 'Descripción de encuesta') {
        inputDescripcionElement.style.fontFamily = tipografia;
        setTipografiaDescripcionDefinicion(tipografia);
      }
      if (titulotamano === 'Leyenda') {
        inputLeyendaElement.style.fontSize = `${tamano}px`;
        setTamanoLeyendaDefinicion(tamano);
      }
      if ( tituloGrosor === 'Leyenda' ) {
        inputLeyendaElement.style.fontWeight = grosor;
        setGrosorLeyendaDefinicion(grosor);
      }
      if (tituloTipografia === 'Leyenda') {
        inputLeyendaElement.style.fontFamily = tipografia;
        setTipografiaLeyendaDefinicion(tipografia);
      }
      if (titulotamano === 'Texto de botones') {
        inputBotonElement.style.fontSize = `${tamano}px`;
        setTamanoBotonDefinicion(tamano);
      }
      if ( tituloGrosor === 'Texto de botones' ) {
        inputBotonElement.style.fontWeight = grosor;
        setGrosorBotonDefinicion(grosor);
      }
      if (tituloTipografia === 'Texto de botones') {
        inputBotonElement.style.fontFamily = tipografia;
        setTipografiaBotonDefinicion(tipografia);
      }

   enviarPreview(preview2);
    enviarPreview2(preview1);
    sendDatosDefinicionEncuesta(datosDefinicionEncuesta);
    setLeerPosicion(sendPosicion3);
    setLeerPosicionLogotipo(sendPosicionLogotipo);
    setLeerTamanoLogotipo(sendTamanoLogotipo);

  }, [preview1, sendPosicion3, sendTamano3, sendGrosor3, sendTipografia3,
    tamano, tituloGrosor, grosor, tituloTipografia, tipografia, titulotamano, datosDefinicionEncuesta,
    sendPosicionLogotipo, sendTamanoLogotipo
  ]);

  const enviarPreview = (previe) => {
    // Verifica que el valor de preview1 sea diferente del valor previo antes de enviarlo
    console.log('previe1', previe);
    sendPreview(previe);
  };

  const enviarPreview2 = (previe) => { 
    console.log('previe2', previe);
    sendPreview2(previe);
  };
    
  const onSelectFile1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile1(file);
      const objectUrl1 = URL.createObjectURL(file);
      setPreview1(objectUrl1);
    } else {
      setSelectedFile1(null);
      setPreview1(null);
    }
  };

  const onSelectFile2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile2(file);
      const objectUrl2 = URL.createObjectURL(file);
      setPreview2(objectUrl2);
    } else {
      setSelectedFile2(null);
      setPreview2(null);
    }
  };

  const handleEnviarNombre = (e) => {
    setDatosDefinicionEncuesta({ ...datosDefinicionEncuesta, nombre: e.target.value });
  }

  const handleEnviarDescripcion = (e) => {
    setDatosDefinicionEncuesta({ ...datosDefinicionEncuesta, descripcion: e.target.value });
  }

  const handleEnviarLeyenda = (e) => {
    setDatosDefinicionEncuesta({ ...datosDefinicionEncuesta, leyenda: e.target.value });
  }

  return (
    <>
      <div className="tituloDefinicionEncuesta">
         <span> Crear  de Encuesta </span>
      </div>

      <div className="cuerpoDefinicionEncuesta">
          <div className="cabeceraDefinicionEncuesta">
              <span>Cabecera</span>
          </div>
          
          {selectedFile1 ? (
            <div className="agregarImagenDefinicionEncuesta2">
              <div className={`${leerPosicionLogotipo == '' ? 'imagenContainer' : leerPosicionLogotipo == 'Izquierda' ? 'posicionLogotipoEncuesta': leerPosicionLogotipo == 'Derecha' ? 'posicionLogotipoEncuesta2' : null}`}>
                <img src={preview1} alt="preview" 
                className={`${(leerTamanoLogotipo== '' ? 'imagenLogotipoEncuesta': leerTamanoLogotipo == 1 ? 'imagenLogotipoEncuesta': leerTamanoLogotipo == 2 ? 'imagenLogotipoTamanoPequeno' : leerTamanoLogotipo == 3 ? 'imagenLogotipoTamanoMediano' : leerTamanoLogotipo == 4 ? 'imagenLogotipoTamanoGrande' : null)}`}
                />
              </div>
              <div className="subcontenedorLogotipo">
                <div className="buttonLogotipoeditar">
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById('file-input1').click()} />
                  <input type="file" id="file-input1" style={{ display: 'none' }} onChange={onSelectFile1} />
                </div>
                <div className="buttonLogotipoeliminar">
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => setSelectedFile1(null)} />
                </div>
              </div>
            </div>
          ) : (
            <div className="agregarImagenDefinicionEncuesta">
              <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input1').click()} />
              <span style={{ color:'rgba(130, 130, 130, 1)', marginTop:'1%', marginBottom:'1%' }}>Agregue imagen o logotipo a la encuesta</span>
              <input type="file" id="file-input1" style={{ display: 'none' }} onChange={onSelectFile1} />
            </div>
          )}

          <div className="subtituloDefinicionEncuesta">
            <span >Nombre de la encuesta</span>
          </div>

          <div className="inputDefinicionEncuesta">
              <NombreEncuesta 
                type="text" 
                placeholder=" Ej: Encuesta a personal" 
                id="nombre"
                ref={inputNombreRef}
                onChange={handleEnviarNombre}
              />
          </div>

          <div className="subtituloDefinicionEncuesta2">
              <span>Descripción &#40;opcional&#41;</span>
          </div>

          <div className="inputDefinicionEncuesta">
              <Descripcion 
                type="text" 
                placeholder="Ingrese una descripción"
                id='descripcion'
                ref={inputDescripcionRef}
                onChange={handleEnviarDescripcion}
              />
          </div>
      </div>

      <br />

      <div className="cuerpoDefinicionEncuesta">
          <div className="cabeceraDefinicionEncuesta">
              <span>Pie de página</span>
          </div>
         
          <div className="subtituloDefinicionEncuesta_Leyenda">
              <span>Leyenda</span>
          </div>
          
          <div className="inputDefinicionEncuesta">
              <Leyenda 
                type="text" 
                placeholder="Ingrese una leyenda" 
                id='leyenda'
                ref={inputLeyendaRef}
                onChange={handleEnviarLeyenda}
              />
          </div>
          
          {selectedFile2 ? (
              <div className="agregarImagenDefinicionEncuesta2">
                <div className="imagenContainer">
                  <img src={preview2} alt="preview" style={{ height: '130px', width: '100%' }} className="imagenLogotipoEncuesta" />
                </div>
                <div className="subcontenedorLogotipo">
                  <div className="buttonLogotipoeditar">
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById('file-input2').click()} />
                    <input type="file" id="file-input2" style={{ display: 'none' }} onChange={onSelectFile2} />
                  </div>
                  <div className="buttonLogotipoeliminar">
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => setSelectedFile2(null)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="agregarImagenDefinicionEncuesta">
                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input2').click()} />
                <span style={{ color:'rgba(130, 130, 130, 1)', marginTop:'1%', marginBottom:'1%' }}>Agregue imagen o logotipo a la encuesta</span>
                <input type="file" id="file-input2" style={{ display: 'none' }} onChange={onSelectFile2} />
              </div>
            )
          }
      </div>

      {sendEstado3 === '' ? null : (
        <div className={`contenedorbuttonPieDePagina ${leerPosicion == 1 ? 'contenedorbuttonPieDePagina2' : leerPosicion == 2 ? 'contenedorbuttonPieDePagina3' : leerPosicion == 3 ? 'contenedorbuttonPieDePagina4' : null}`}>
          <button className='buttonPieDePagina'
          id='buttonPieDePagina'
          ref={inputBotonRef}
          >
            {sendEstado3}
          </button>
        </div>
      )}

      <br />
      <br />
    </>
  )
}

export default DefinicionEncuestaCuerpo
