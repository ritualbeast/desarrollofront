import React, {useState, useEffect} from 'react'


import svgManager from '../../assets/svg'
import '../../styles/definicionEncuestaCuerpo.css'
import DisenoEncuestaLateralPiePagina from '../Create/DisenoEncuestaLateralPiePagina';


const chevronupSVG = svgManager.getSVG('chevron-up');
const uploadCloudSVG = svgManager.getSVG('upload-cloud');
const edit2SVG = svgManager.getSVG('edit2');
const trashSVG = svgManager.getSVG('trash');

const DefinicionEncuestaCuerpo = ({estado,posicion,preview2, sendEstado3, sendPosicion3}) => {


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);
  const [leerEstado, setLeerEstado] = useState(estado);
  const [leerEstadoPiePagina, setLeerEstadoPiePagina] = useState(sendEstado3);
  const enviarPreview = (previe) => {
    preview2(previe)
  }
  useEffect(() => {
    // Aquí enviarías el valor de preview a ComponenteB inmediatamente cuando cambie
    enviarPreview(preview);
  }, [preview]);

  useEffect(() => {
    console.log('estado',leerEstado)
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    


    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Liberar memoria cuando se desmonte el componente
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);


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
      setSelectedFile2(file);
    } else {
      setSelectedFile2(null);
    }

    
  };

  const leerEstado2 = () => {
    console.log(leerEstadoPiePagina)
    
  }



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
              <span>Nombre de la encuesta</span>
          </div>
          <div className="inputDefinicionEncuesta">
              <input type="text" placeholder=" Ej: Encuesta a personal" />
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
                    
                    <input type='file' id='file-input2' style={{ display: 'none' }} onChange={onSelectFile2} /> 
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
                  <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile2} />
                </div>
            )}`
          
          
            
          </div>
          {sendEstado3 === '' ? null : (
            
            <div className="contenedorbuttonPieDePagina">
              <button className='buttonPieDePagina'>{sendEstado3}</button>
            </div>

          ) }
          
      <br />
      <br />
      <div></div>

    </>
  )
}

export default DefinicionEncuestaCuerpo
