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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ListarEncuestas = async (tipo, valor, nombre= '', orden, pagina, size) => {
  console.log('tipo', tipo, 'valor', valor, 'nombre', nombre, 'orden', orden, 'pagina', pagina, 'size', size);
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
    const response = await fetch(`http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/listarEncuestas?nombre=${nombre}&categoriaEncuestas=${valor}&fechaInicio&fechaFin&formatoPresentacion=&esPublica=&tipoVigencia&tipoEncuesta=&estadoEncuesta=${tipo}&orden=${orden}&pagina=${pagina}&size=${size}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const crearEncuesta = async () => {
  const opcionCrearEncuesta = localStorage.getItem('opcionCrearEncuesta');
  const canal = '808cd0b9-141f-4132-81e9-c3822436191b'; 

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Canal': canal,
  };

  const url = 'http://desa.goitsa.me:3001/goit-notisurvey-api/v2/encuesta/crearEncuesta';

  const body = {
    "enumTipoEncuesta": "1",
    "idCategoriaEncuesta": 1,
    "titulo": "XD",
    "descripcion": "Comparte tu currículum para consideración de empleo",
    "fechaInicio": "2023-07-11 10:00:00",
    "fechaFin": "2023-07-12 10:00:00",
    "formatoPresentacion": opcionCrearEncuesta,
    "enumTipoVigencia": "3",
    "esPublica": "S",
    "cantidadRespuesta": 3,
    "imagenCabecera": "iVBORw0KGgoAAAANSUhEUgAAAyAAAAMgCAYAAADbcAZoAAAyJklEQVR4Ae3XQQ0AIRAEweO88MS/JVxAgoh+1RqYpLKfHnvN8zkCBAgQIECAAAECBAgEAn+wYYIAAQIECBAgQIAAAQJPQIB4BAIECBAgQIAAAQIEMgEBklEbIkCAAAECBAgQIEBAgPgBAgQIECBAgAABAgQyAQGSURsiQIAAAQIECBAgQECA",
    "imagenPie": "iVBORw0KGgoAAAANSUhEUgAAAyAAAAMgCAYAAADbcAZoAAAyJklEQVR4Ae3XQQ0AIRAEweO88MS/JVxAgoh+1RqYpLKfHnvN8zkCBAgQIECAAAECBAgEAn+wYYIAAQIECBAgQIAAAQJPQIB4BAIECBAgQIAAAQIEMgEBklEbIkCAAAECBAgQIEBAgPgBAgQIECBAgAABAgQyAQGSURsiQIAAAQIECBAgQECA",
    "usuarioCreacion": "AndresPradoV",
    "secciones": [
      {
        "titulo": "Evaluación de Experiencia Laboral y Educación",
        "descripcion": "Comparte tu experiencia laboral y antecedentes educativos en esta sección de la encuesta.",
        "orden": "1",
        "imagenCabecera": "iVBORw0KGgoAAAANSUhEUgAAA5AAAAOQCAIAAADALglzAAAACXBIWXMAAAsTAAALEwEAmpwYAAARe0lEQVR4nO3WMQEAIAzAMED5pOOAlx6Jgp7dM7MAAKDq/A4AAIAXwwoAQJphBQAgzbACAJBmWAEASDOs",
        "imagenPie": "",
        "estado": "activo",
        "tipoSeccion": "P",
        "textoAgradecimiento": "¡Gracias por participar en nuestra encuesta!",
        "urlRedireccion": "https://www.ejemplo.com",
        "imagenCierre": "iVBORw0KGgoAAAANSUhEUgAAA5AAAAOQCAIAAADALglzAAAACXBIWXMAAAsTAAALEwEAmpwYAAARe0lEQVR4nO3WMQEAIAzAMED5pOOAlx6Jgp7dM7MAAKDq/A4AAIAXwwoAQJphBQAgzbACAJBmWAEASDOs",
        "textoBotonCierre": "Finalizar",
        "preguntas": [
          {
            "pregunta": "Adjunta tu documento de experiencia laboral",
            "nemonico": "1S_1P",
            "idTipoPregunta": 4,
            "orden": 1,
            "requerida": "S",
            "placeHolder": "",
            "mensajeErrorRequerido": "Este campo es obligatorio",
            "mensajeError": "Suba solo archivo PDF",
            "tipoArchivo": "PDF",
            "pesoArchivo": "5",
            "multipleRespuesta": "N",
            "ponderacion": "S",
            "configuracionPregunta": {
              "esObligatoria": "S",
              "mensajeEsObligatoria": "Este documento es obligatorio",
              "ningunaAnteriores": "N",
              "otraRespuesta": "N",
              "etiquetaOtraRespuesta": "",
              "enumTipoTexto": 6,
              "enumCantidadCaracteres": 8,
              "enumValidacion": 11,
              "informacionPregunta": "S",
              "etiquetaInformacionPregunta": "Es un documento que contiene los años y los lugares que ha laborado",
              "bancoPregunta": "S",
              "etiquetaBancoPregunta": "Experiencia Laboral"
            },
            "opcionesRespuesta": [],
            "preguntasComplementarias": [
              {
                "pregunta": "Indiquenos una breve explicacion sobre el documento",
                "idTipoPregunta": 5,
                "orden": 1,
                "requerida": "S",
                "configuracionPregunta": {
                  "esObligatoria": "N",
                  "mensajeEsObligatoria": "",
                  "informacionPregunta": "N",
                  "etiquetaInformacionPregunta": "",
                  "bancoPregunta": "N",
                  "etiquetaBancoPregunta": ""
                },
                "opcionesRespuesta": [
                  {
                    "respuesta": "Ingeniero de Software recien graduado con experiencial laboral de 1 año"
                  }
                ]
              }
            ]
          },
        ]
      },
    ],
    "encuestaEstilos": {
      "logotipo": {
        "tamanio": "10",
        "enumPosicion": "38"
      },
      "pieDePagina": {
        "tamanio": "10",
        "enumPosicion": ""
      },
      "fuente": {
        "tituloEncuesta": {
          "enumTipografia": "15",
          "enumGrosor": "34",
          "enumTamanio": ""
        },
        "descripcionEncuesta": {
          "enumTipografia": "",
          "enumGrosor": "35",
          "enumTamanio": "19"
        },
        "tituloSeccion": {
          "enumTipografia": "17",
          "enumGrosor": "",
          "enumTamanio": "20"
        },
        "descripcionSeccion": {
          "enumTipografia": "15",
          "enumGrosor": "34",
          "enumTamanio": "18"
        },
        "preguntas": {
          "enumTipografia": "16",
          "enumGrosor": "35",
          "enumTamanio": "19"
        },
        "opcionesRespuestas": {
          "enumTipografia": "17",
          "enumGrosor": "36",
          "enumTamanio": "20"
        },
        "textoCierreEncuesta": {
          "enumTipografia": "15",
          "enumGrosor": "34",
          "enumTamanio": "18"
        },
        "textoBotones": {
          "enumTipografia": "16",
          "enumGrosor": "",
          "enumTamanio": ""
        }
      },
      "fondo": {
        "colorFondo": "#FF5733",
        "imagenFondo": "imagenEnBase64"
      }
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    // Aquí puedes manejar la respuesta de la API
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Manejar errores de la solicitud
    console.error('Error al crear la encuesta:', error);
  }
};



export { ListarCategoriasService, EliminarEncuesta, ListarEncuestas , crearEncuesta};