import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
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

const DefinicionEncuestaCuerpo =  forwardRef(({
  sendEstado3, 
  sendPosicion3, 
  sendTamano3, 
  sendGrosor3, 
  sendTipografia3, 
  sendPreview, 
  sendPreview2, 
  sendPosicionLogotipo, 
  sendTamanoLogotipo, 
  sendPosicionLogotipoPiePagina, 
  sendTamanoLogotipoPiePagina,
  sendDatosDefinicionEncuesta, 
  contentInit, 
  contenEstilos, 
  sendEstilosDefinicionEncuesta,
  sendColors,
}, ref) => {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview64, setPreview64] = useState(null);
  const [preview64_2, setPreview64_2] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [leerPosicion, setLeerPosicion] = useState(sendPosicion3);
  const [datosDefinicionEncuesta, setDatosDefinicionEncuesta] = useState(contentInit);
  const [datosDefinicionEstilo, setDatosDefinicionEstilo] = useState(contenEstilos);
  const [leerPosicionLogotipo, setLeerPosicionLogotipo] = useState(sendPosicionLogotipo);
  const [leerTamanoLogotipo, setLeerTamanoLogotipo] = useState(sendTamanoLogotipo);
  const [leerPosicionLogotipoPiePagina, setLeerPosicionLogotipoPiePagina] = useState(sendPosicionLogotipoPiePagina);
  const [leerTamanoLogotipoPiePagina, setLeerTamanoLogotipoPiePagina] = useState(sendTamanoLogotipoPiePagina);
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

  // capturar el valor de todos los datos
  sendDatosDefinicionEncuesta(datosDefinicionEncuesta);
  sendEstilosDefinicionEncuesta(datosDefinicionEstilo);
  const tituloref = useRef();
  const descripcionref = useRef();
  const leyendaref = useRef();
  const botonref = useRef();
  const fondoRef = useRef();
  const fondoPiePaginaRef = useRef();
  const [fondo, setFondo] = useState('');
  const [colors, setColors] = useState(sendColors);
  const inputNombreRef = useRef(null);
  const inputDescripcionRef = useRef(null);
  const inputLeyendaRef = useRef(null);

  useEffect(() => {
    if (tituloTipografia === 'Nombre de encuesta') {
      if (tituloref.current) {
        tituloref.current.style.fontFamily = tipografia;
      }
    } if (tituloGrosor === 'Nombre de encuesta') {
      if (tituloref.current) {
        tituloref.current.style.fontWeight = grosor;
      }
    } if (titulotamano === 'Nombre de encuesta') {
      if (tituloref.current) {
        tituloref.current.style.fontSize = `${tamano}px`;
      }
    }
    
    if ( tituloTipografia === 'Descripción de encuesta') {
      if (descripcionref.current) {
        descripcionref.current.style.fontFamily = tipografia;
      }
    } if ( tituloGrosor === 'Descripción de encuesta' ) {
      if (descripcionref.current) {
        descripcionref.current.style.fontWeight = grosor;
      }
    } if (titulotamano === 'Descripción de encuesta') {
      if (descripcionref.current) {
        descripcionref.current.style.fontSize = `${tamano}px`;
      }
      
    } if (titulotamano === 'Leyenda') {
      if (leyendaref.current) {
        leyendaref.current.style.fontSize = `${tamano}px`;
      }
    } if ( tituloGrosor === 'Leyenda' ) {
      if (leyendaref.current) {
        leyendaref.current.style.fontWeight = grosor;
      }
    } if ( tituloTipografia === 'Leyenda') {
      if (leyendaref.current) {
        leyendaref.current.style.fontFamily = tipografia;
      }
    }
    
    if (titulotamano === 'Texto de botones') {
      if (botonref.current) {
        botonref.current.style.fontSize = `${tamano}px`;
      }
    } if ( tituloGrosor === 'Texto de botones' ) {
      if (botonref.current) {
        botonref.current.style.fontWeight = grosor;
      }
    } if ( tituloTipografia === 'Texto de botones') {
      if (botonref.current) {
        botonref.current.style.fontFamily = tipografia;
      }
    } if (datosDefinicionEstilo.fuente.tituloEncuesta.color !== '') {
      if (tituloref.current) {
        tituloref.current.style.color = datosDefinicionEstilo.fuente.tituloEncuesta.color;
      }
    } if (datosDefinicionEstilo.fuente.descripcionEncuesta.color !== '') {
      if (descripcionref.current) {
        descripcionref.current.style.color = datosDefinicionEstilo.fuente.descripcionEncuesta.color;
      }
    } if (datosDefinicionEstilo.fuente.leyenda.color !== '') {
      if (leyendaref.current) {
        leyendaref.current.style.color = datosDefinicionEstilo.fuente.leyenda.color;
      }
    } if (datosDefinicionEstilo.fondo.colorFondo !== '') {
      if (fondoRef.current) {
        fondoRef.current.style.backgroundColor = datosDefinicionEstilo.fondo.colorFondo;
      }
    } if (datosDefinicionEstilo.fondo.colorFondo !== '') {
      if (fondoPiePaginaRef.current) {
        fondoPiePaginaRef.current.style.backgroundColor = datosDefinicionEstilo.fondo.colorFondo;
        setFondo(datosDefinicionEstilo.fondo.colorFondo);
      }
    } if (datosDefinicionEstilo.fuente.textoBotones.color !== '') {
      if (botonref.current) {
        botonref.current.style.color = datosDefinicionEstilo.fuente.textoBotones.color;
      }
    } if (datosDefinicionEstilo.fuente.botones.color !== '') {
      if (botonref.current) {
        botonref.current.style.backgroundColor = datosDefinicionEstilo.fuente.botones.color;
      }
    }
     
    enviarPreview(preview2);
    enviarPreview2(preview1);
    setLeerPosicion(sendPosicion3);
    setLeerPosicionLogotipo(sendPosicionLogotipo);
    setLeerTamanoLogotipo(sendTamanoLogotipo);
    setLeerPosicionLogotipoPiePagina(sendPosicionLogotipoPiePagina);
    setLeerTamanoLogotipoPiePagina(sendTamanoLogotipoPiePagina);
    setDatosDefinicionEstilo(contenEstilos);

  }, [preview1, 
    preview2, 
    sendPosicion3, 
    sendTamano3, 
    sendGrosor3, 
    sendTipografia3,
    tamano, 
    tituloGrosor, 
    grosor, 
    tituloTipografia, 
    tipografia, 
    titulotamano, 
    datosDefinicionEncuesta,
    sendPosicionLogotipo, 
    sendTamanoLogotipo, 
    sendPosicionLogotipoPiePagina, 
    sendTamanoLogotipoPiePagina, 
    datosDefinicionEstilo, 
    sendColors
  ]);

  // capturar el valor de todos los datos
  const handleEnviarDatos = async () => {
    // Crear un objeto con los datos
    const datosEncuesta = {
      imagenCabecera: preview64,
      imagenPie: preview64_2,
      // nombre: inputNombreRef.current.value,
      // descripcion: inputDescripcionRef.current.value,
      // leyenda: inputLeyendaRef.current.value
    };

    // Enviar los datos a la función prop
    sendDatosDefinicionEncuesta(datosEncuesta);
  };

  useImperativeHandle(ref, () => ({
    handleEnviarDatos,
  }));

  const enviarPreview = (previe) => {
    sendPreview(previe);
  };

  const enviarPreview2 = (previe) => { 
    sendPreview2(previe);
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
            alert('Por favor, selecciona un archivo de imagen válido.');
            setSelectedFile1(null);
            setPreview1(null);
        }
    } else {
        setSelectedFile1(null);
        setPreview1(null);
    }
  };
  
  const onSelectFile2 = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Comprobar si el archivo es una imagen
        if (file.type.startsWith('image/')) {
            setSelectedFile2(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                let base64String = reader.result;
                base64String = base64String.replace("data:image/png;base64,", "");
                // Utiliza la cadena modificada
                setPreview2(reader.result);
            };

            reader.onerror = (error) => {
                console.error(error);
            };

            reader.readAsDataURL(file); // Lee el archivo como base64
        } else {
            alert('Por favor, selecciona un archivo de imagen válido.');
            setSelectedFile2(null);
            setPreview2(null);
        }
    } else {
        setSelectedFile2(null);
        setPreview2(null);
    }
  };

  const handleEnviarNombre = (e) => {
    const nuevoEstado = { ...datosDefinicionEncuesta};
    nuevoEstado.titulo = e.target.value;
    setDatosDefinicionEncuesta(nuevoEstado);
  }

  const handleEnviarDescripcion = (e) => {
    const nuevoEstado = { ...datosDefinicionEncuesta};
    nuevoEstado.descripcion = e.target.value;
    setDatosDefinicionEncuesta(nuevoEstado);
  }

  const handleEnviarLeyenda = (e) => {
    const nuevoEstado = { ...datosDefinicionEncuesta};
    nuevoEstado.leyenda = e.target.value;
    setDatosDefinicionEncuesta(nuevoEstado);
  }

  const eliminarImagenLogotipo = () => {
    setSelectedFile1(null);
    setPreview1(null);
  }

  const eliminarImagenPiePagina = () => {
    setSelectedFile2(null);
    setPreview2(null);
  }

  return (
    <>
      <div className="tituloDefinicionEncuesta">
         <span> Crear  de Encuesta </span>
      </div>

      <div className="cuerpoDefinicionEncuesta" style={{ backgroundColor: fondo }}>
          <div className="cabeceraDefinicionEncuesta">
              <span>Cabecera</span>
          </div>
          
          {selectedFile1 ? (
            <div className="agregarImagenDefinicionEncuesta2">
              <div className={`${leerPosicionLogotipo == '' ? 'imagenContainer' : leerPosicionLogotipo == 38 ? 'posicionLogotipoEncuesta': leerPosicionLogotipo == 39 ? 'posicionLogotipoEncuesta2' : null}`}>
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
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => eliminarImagenLogotipo()} />
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
                ref={tituloref}
                onChange={handleEnviarNombre}
                maxLength={2000}
                required
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
                ref={descripcionref}
                onChange={handleEnviarDescripcion}
                maxLength={4000}
                required
              />
          </div>
      </div>

      <br />

      <div className="cuerpoDefinicionEncuesta" ref={fondoPiePaginaRef}>
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
                ref={leyendaref}
                onChange={handleEnviarLeyenda}
              />
          </div>
          
          {selectedFile2 ? (
              <div className="agregarImagenDefinicionEncuesta2">

                
                <div className={`${leerPosicionLogotipoPiePagina == '' ? 'imagenContainer' : leerPosicionLogotipoPiePagina == 38 ? 'posicionLogotipoEncuesta': leerPosicionLogotipoPiePagina == 39 ? 'posicionLogotipoEncuesta2' : null}`}>
                  <img src={preview2} alt="preview" 
                  className={`${(datosDefinicionEstilo.pieDePagina.tamanio== '' ? 'imagenLogotipoEncuesta': datosDefinicionEstilo.pieDePagina.tamanio == 1 ? 'imagenLogotipoEncuesta': datosDefinicionEstilo.pieDePagina.tamanio == 2 ? 'imagenLogotipoTamanoPequeno' : datosDefinicionEstilo.pieDePagina.tamanio == 3 ? 'imagenLogotipoTamanoMediano' : datosDefinicionEstilo.pieDePagina.tamanio == 4 ? 'imagenLogotipoTamanoGrande' : null)}`}
                  />
                </div>

                <div className="subcontenedorLogotipo">
                  <div className="buttonLogotipoeditar">
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: edit2SVG }} onClick={() => document.getElementById('file-input2').click()} />
                    <input type="file" id="file-input2" style={{ display: 'none' }} onChange={onSelectFile2} />
                  </div>
                  <div className="buttonLogotipoeliminar">
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: trashSVG }} onClick={() => eliminarImagenPiePagina()} />
                  </div>
                </div>
              </div>

          ) : (
              <div className="agregarImagenDefinicionEncuesta">
                <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input2').click()} />
                <span style={{ color:'rgba(130, 130, 130, 1)', marginTop:'1%', marginBottom:'1%' }}>Agregue imagen o logotipo a la encuesta</span>
                <input type="file" id="file-input2" style={{ display: 'none' }} onChange={onSelectFile2} />
              </div>
          )}
      </div>

      {sendEstado3 === '' ? null : (
        <div className={`contenedorbuttonPieDePagina ${leerPosicion == 1 ? 'contenedorbuttonPieDePagina2' : leerPosicion == 2 ? 'contenedorbuttonPieDePagina3' : leerPosicion == 39 ? 'contenedorbuttonPieDePagina4' : null}`}>
          <button className='buttonPieDePagina'
          id='buttonPieDePagina'
          ref={botonref}
          >
            {sendEstado3}
          </button>
        </div>
      )}

      <br />
      <br />
    </>
  )
})

export default DefinicionEncuestaCuerpo 
