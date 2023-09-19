
const ListarCategoriasService = async (tipoEncuesta) => {
  try {
    const canal = '808cd0b9-141f-4132-81e9-c3822436191b';
    const headers = {
      'Content-Type': 'application/json',
      Canal: canal
    };
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch('http://desa.goitsa.me:3001/goit-notisurvey-api/v2/categoria/listarCategorias?tipoEncuesta='+tipoEncuesta, requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const usuarioInactivacion = "CBENJAC";
const EliminarEncuesta = async (idEncuesta) => {
  try {
    // const tokenUsuario = localStorage.getItem('token');
    const canales = '808cd0b9-141f-4132-81e9-c3822436191b';
    // const token = `Bearer ${tokenUsuario}`;
    const headers = {
      'Content-Type': 'application/json',
      // Authorization: token,
      Canal: canales
    };
    const body = {
      "idEncuesta": idEncuesta,
      "usuarioInactivacion": usuarioInactivacion
    };
    const requestOptions = {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    };
    const response = await fetch('http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/eliminarEncuesta', requestOptions);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ListarEncuestas = async (tipo, valor, nombre= '', orden='', pagina, size, publica='', tipoEncuesta='') => {
  try {
    const canales = '808cd0b9-141f-4132-81e9-c3822436191b';
    const headers = {
      'Content-Type': 'application/json',
      Canal: canales
    };
    const requestOptions = {
      method: 'GET',
      headers
    };
    const response = await fetch(`http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/listarEncuestas?nombre=${nombre}&categoriaEncuestas=${valor}&fechaInicio&fechaFin&formatoPresentacion=&esPublica=${publica}&tipoVigencia&tipoEncuesta=${tipoEncuesta}&estadoEncuesta=${tipo}&orden=${orden}&pagina=${pagina}&size=${size}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const crearEncuesta = async (handleTotalPreguntas,handleDatosPaso1,handleDatosConfiguracion, contenedorSeleccionado, totalConteo, encuestaEstilos) => {
  const startime = performance.now();
  console.log('handleTotalPreguntas', handleTotalPreguntas);
  console.log('handleDatosPaso1', handleDatosPaso1);
  console.log('handleDatosConfiguracion', handleDatosConfiguracion);
  console.log(handleDatosConfiguracion.enum_tipo_encuesta);
  console.log('contenedorSeleccionado', contenedorSeleccionado);
  console.log('totalConteo', totalConteo);
  console.log('handleEstilos', encuestaEstilos);
  
  const opcionCrearEncuesta = localStorage.getItem('opcionCrearEncuesta');
  const canal = '808cd0b9-141f-4132-81e9-c3822436191b'; 

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Canal': canal,
  };

  const url = 'http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/crearEncuesta';

  const body = {
    "enumTipoEncuesta": localStorage.getItem('enumTipoEncuesta'),
    "idCategoriaEncuesta": handleDatosConfiguracion.idCategoriaEncuesta,
    "titulo": handleDatosPaso1.titulo,
    "descripcion": handleDatosPaso1.descripcion,
    "fechaInicio": handleDatosConfiguracion.fechaInicio,
    "fechaFin": handleDatosConfiguracion.fechaFin,
    "formatoPresentacion": opcionCrearEncuesta,
    "enumTipoVigencia": handleDatosConfiguracion.enumTipoVigencia,
    "esPublica": "S",
    "cantidadRespuesta": totalConteo,
    "imagenCabecera": handleDatosPaso1.imagenCabecera,
    "imagenPie":  handleDatosPaso1.imagenPie,
    "usuarioCreacion": "AndresPradoV",
    "secciones": handleTotalPreguntas,
    'encuestaEstilos': encuestaEstilos,
  };
  console.log(body);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const endtime = performance.now();
    console.log('Tiempo de ejecución: ', endtime - startime);

    // Aquí puedes manejar la respuesta de la API
    const data = await response.json();
    console.log(data)
    return data;
    
  } catch (error) {
    // Manejar errores de la solicitud
    console.error('Error al crear la encuesta:', error);
  }
};

export {
  ListarCategoriasService, 
  EliminarEncuesta, 
  ListarEncuestas, 
  crearEncuesta,
};