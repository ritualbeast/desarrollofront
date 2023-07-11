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

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const usuarioInactivacion = "CBENJAC";
const EliminarEncuesta = async (idEncuesta) => {
  console.log(idEncuesta);
  console.log(usuarioInactivacion);
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

const ListarEncuestas = async (tipo, valor) => {
  console.log(tipo, valor);
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
    const response = await fetch(`http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/listarEncuestas?nombre=&categoriaEncuestas=${valor}&fechaInicio&fechaFin&formatoPresentacion=&esPublica=&tipoVigencia&tipoEncuesta&estadoEncuesta=${tipo}&pagina=&size=`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export { ListarCategoriasService, EliminarEncuesta, ListarEncuestas };