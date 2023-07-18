import React, {useState, useEffect} from 'react'


import svgManager from '../../assets/svg'
import { useEstadoContext } from '../../context/EstadoContext'
import '../../styles/definicionEncuestaCuerpo.css'


const chevronupSVG = svgManager.getSVG('chevron-up');
const uploadCloudSVG = svgManager.getSVG('upload-cloud');

const DefinicionEncuestaCuerpo = () => {

  const { estado, posicionSeleccionada } = useEstadoContext(); // Obtén los estados del contexto

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);



  useEffect(() => {
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

  const probar = () => {
    console.log(estado, posicionSeleccionada);
  }


  return (
    <>
      <button onClick={probar}>Probar

      </button>
      <div className="tituloDefinicionEncuesta">
         <span 
         > Crear  de Encuesta </span>
        </div>
      <div className="cuerpoDefinicionEncuesta">
          <div className="cabeceraDefinicionEncuesta">
              <span>Cabecera</span>
          </div>
          
          `{selectedFile ? (
               <div className="agregarImagenDefinicionEncuesta">
                <img src={preview} alt="preview" style={{ height: '92px', width: '100%' }} className='imagenLogotipoEncuesta' />
                
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
               <div className="agregarImagenDefinicionEncuesta">
                <img src={preview} alt="preview" style={{ height: '92px', width: '180px' }} className='imagenLogotipoEncuesta' />
                
              </div>
            ) : (
                <div className="agregarImagenDefinicionEncuesta">
                  <span style={{ marginTop: '7px' }} dangerouslySetInnerHTML={{ __html: uploadCloudSVG }} onClick={() => document.getElementById('file-input').click()} />
                  <span>Agregue imagen o logotipo a la encuesta</span>
                  <input type='file' id='file-input' style={{ display: 'none' }} onChange={onSelectFile} />
                </div>
            )}`
          
            
          </div>
          <div className="contenedorbuttonPieDePagina">
            <button className='buttonPieDePagina'>Agregar</button>
          </div>
      <br />
      <br />
      <div></div>

    </>
  )
}

export default DefinicionEncuestaCuerpo
