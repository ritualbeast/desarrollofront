const ListarTipoPregunta = async () => {
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
    const response = await fetch(`http://desa.goitsa.me:3001/goit-notisurvey-api/v2/pregunta/listarTipoPregunta`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const BancoPreguntas = async (idCategoria= '', tipoPregunta='', pagina= 1, size= 100) => {
  try {
    const canales = '808cd0b9-141f-4132-81e9-c3822436191b';
    const headers = {
      'Content-Type': 'application/json',
      Canal: canales
    };
    const body = {
      "usuarioCreacion": 'BenjaminC',
    };
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(`http://desa.goitsa.me:3001/goit-notisurvey-api/v2/pregunta/banco-preguntas?idCategoria=${idCategoria}&nombrePregunta=&tipoPregunta=${tipoPregunta}&usuarioCreacion=&pagina=${pagina}&size=${size}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
    ListarTipoPregunta,
    BancoPreguntas,
  }
  