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

export {
    ListarTipoPregunta,
  }
  