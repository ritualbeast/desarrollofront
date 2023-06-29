import React from 'react'

const ListarCategoriasService = async () => {
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
    const response = await fetch('http://desa.goitsa.me:3001/goit-notisurvey-api/v2/categoria/listarCategorias', requestOptions);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { ListarCategoriasService };