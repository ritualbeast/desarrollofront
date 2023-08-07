const ListarEnumeradosService = async (idTipoEnumerado) => {
  try {
    const canal = '808cd0b9-141f-4132-81e9-c3822436191b';
    const headers = {
      'Content-Type': 'application/json',
      Canal: canal
    };
    const url = `http://desa.goitsa.me:3001/goit-notisurvey-api/v2/enumerados/listarEnumerados?nemonicoTipoEnumerado=${idTipoEnumerado}&idTipoEnumerado=`;
    const requestOptions = {
      method: 'GET',
      headers,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  ListarEnumeradosService
};