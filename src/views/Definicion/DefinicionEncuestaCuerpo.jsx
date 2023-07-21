import React, {useState, useEffect} from 'react'


import svgManager from '../../assets/svg'
import '../../styles/definicionEncuestaCuerpo.css'
import DisenoEncuestaLateralPiePagina from '../Create/DisenoEncuestaLateralPiePagina';


const chevronupSVG = svgManager.getSVG('chevron-up');
const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const edit2SVG = svgManager.getSVG('edit2');
const trashSVG = svgManager.getSVG('trash');

const DefinicionEncuestaCuerpo = ({estado,posicion,preview2, sendEstado3, sendPosicion3, sendTamano3, sendGrosor3, sendTipografia3}) => {


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFileFooter, setSelectedFileFooter] = useState(null);
  const [previewFooter, setPreviewFooter] = useState(null);

  const [preview, setPreview] = useState(null);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);
  const [leerEstado, setLeerEstado] = useState(estado);
  const [leerEstadoPiePagina, setLeerEstadoPiePagina] = useState(sendEstado3);
  const [leerPosicion, setLeerPosicion] = useState(sendPosicion3);
  const [leerTamano, setLeerTamano] = useState(sendTamano3);
  const [leerGrosor, setLeerGrosor] = useState(sendGrosor3);
  const [leerTipografia, setLeerTipografia] = useState(sendTipografia3);
  const enviarPreview = (previe) => {
    preview2(previe)
  }
  useEffect(() => {
    // Aquí enviarías el valor de preview a ComponenteB inmediatamente cuando cambie
    enviarPreview(preview);
    
    // Actualizar el valor de leerPosicion basado en sendPosicion3
    setLeerPosicion(sendPosicion3);
    setLeerTamano(sendTamano3);
    setLeerGrosor(sendGrosor3);
    setLeerTipografia(sendTipografia3);
  
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    if (!selectedFileFooter) {
      setPreviewFooter(null);
      return;
    }


  
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    const objectUrlFooter = URL.createObjectURL(selectedFileFooter);
    setPreviewFooter(objectUrlFooter);
  
  }, [preview, sendPosicion3, selectedFile, leerEstado, sendTamano3, sendGrosor3, sendTipografia3, selectedFile2, selectedFileFooter]);
  

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }

    
  };

  const onSelectFile2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileFooter(file);
    } else {
      setSelectedFileFooter(null);
    }
  };

  



  return (
    <>
      <div className="tituloDefinicionEncuesta">
         <span 
         > Crear  de Encuesta </span>
        </div>
      <div className="cuerpoDefinicionEncuesta">
          <div className="cabeceraDefinicionEncuesta">
              <span>Cabecera</span>
          </div>
          
          `{selectedFile ? (
              <div className="agregarImagenDefinicionEncuesta2">
                <div className="imagenContainer">
                  <img src={preview} alt="preview" style={{ height: '130px', width: '100%' }} className='imagenLogotipoEncuesta' />
                </div>
                <div className='subcontenedorLogotipo'>
                  <div className='buttonLogotipoeditar'>
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html:  edit2SVG }} 
                    onClick={() => document.getElementById('file-input2').click()}
                    
                    />
                    
                    <input type='file' id='file-input2' style={{ display: 'none' }} onChange={onSelectFile} /> 
                  </div>
                  <div className='buttonLogotipoeliminar'>
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html:  trashSVG }}
                    onClick={() => setSelectedFile(null)}
                    />
                  </div>
                </div>
              </div>
              
            ) : (
                <div className="agregarImagenDefinicionEncuesta">
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input').click()} />
                  <span>Agregue imagen o logotipo a la encuesta</span>
                  <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile} />
                </div>
            )}`
          <div className="subtituloDefinicionEncuesta">
            <span >Nombre de la encuesta</span>
          </div>
          <div className="inputDefinicionEncuesta">
              <input type="text" placeholder=" Ej: Encuesta a personal" 
              style={{ fontSize: `${leerTamano}px` 
              , fontWeight: `${leerGrosor}`
              , fontFamily: `${leerTipografia}`

              }}/>
          </div>
          <div className="subtituloDefinicionEncuesta2">
              <span>Descripción &#40;opcional&#41;</span>
          </div>
          <div className="inputDefinicionEncuesta">
              <textarea type="text" placeholder="Ingrese una descripción" />
          </div>
      </div>

      <br />

      <div className="cuerpoDefinicionEncuesta">
          <div className="cabeceraDefinicionEncuesta">
              <span>Pie de página</span>
          </div>
         
          <div className="subtituloDefinicionEncuesta">
              <span>Leyenda</span>
          </div>
          <br />
          <div> </div>
          
          <div className="inputDefinicionEncuesta">
              <textarea type="text" placeholder="Ingrese una leyenda" />
          </div>
          
          `{selectedFileFooter ? (
              <div className="agregarImagenDefinicionEncuesta2">
                <div className="imagenContainer">
                  <img src={previewFooter} alt="preview" style={{ height: '130px', width: '100%' }} className='imagenLogotipoEncuesta' />
                </div>
                <div className='subcontenedorLogotipo'>
                  <div className='buttonLogotipoeditar'>
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html:  edit2SVG }} 
                    onClick={() => document.getElementById('file-input2').click()}
                    
                    />
                    
                    <input type='file' id='file-input2' style={{ display: 'none' }} onChange={onSelectFile2} /> 
                  </div>
                  <div className='buttonLogotipoeliminar'>
                    <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html:  trashSVG }}
                    onClick={() => setSelectedFileFooter(null)}
                    />
                  </div>
                </div>
              </div>
              
            ) : (
                <div className="agregarImagenDefinicionEncuesta">
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input').click()} />
                  <span>Agregue imagen o logotipo a la encuesta</span>
                  <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile2} />
                </div>
            )}`
          
          
            
          </div>
          {sendEstado3 === '' ? null : (
            <div className={`contenedorbuttonPieDePagina ${leerPosicion == 1 ? 'contenedorbuttonPieDePagina2' : leerPosicion == 2 ? 'contenedorbuttonPieDePagina3' : leerPosicion == 3 ? 'contenedorbuttonPieDePagina4' : null}`}>
              <button className='buttonPieDePagina'>
                {sendEstado3}
              </button>
            </div>
          )}

          
      <br />
      <br />
      <div></div>

    </>
  )
}

export default DefinicionEncuestaCuerpo
