/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable eol-last */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
import base64 from 'react-native-base64'
import validationLogin from '../validation/login'

const login = async credenciales => {
  const resps = validationLogin.validate(credenciales)
  const token = 'Basic ' + base64.encode(credenciales.username + ':' + credenciales.password)
  const headers = { 'Content-Type': 'application/json' }
  headers.Authorization = token
  headers.Canal = global.CANAL
  const requestOptions = {
    method: 'POST',
    headers
  }
  if (resps === true) {
    const resp = await fetch(global.LOGIN_METHOD, requestOptions)
    const items = await resp.json()
    console.log(items)
    if (items.code === 200) {
      console.log('entra 200')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(items.data)
      )
      localStorage.setItem('token', items.data.token);
      localStorage.setItem('data', items.data.idUsuario);
      localStorage.setItem('url', items.data.urlRedireccionamiento);
      global.HEADER = global.MODAL_HEAD_SUCCESS

      global.ERROR = 0
      if (global.HAVECAMPAIGN === 0) {
        global.ROUTE_URL_NEW = items.data.urlRedireccionamiento
        global.REDIRECT_URL = global.ROUTE_URL_NEW
      } else {
        // global.REDIRECT_URL = items.data.url;
        global.REDIRECT_URL = global.ROUTE_DASHBOARD
      }
    } else if (items.code === 500) {
      global.HEADER = global.MODAL_HEAD_ERROR
      global.BODY = global.ERROR_SERVICE_OFF
      global.ERROR = items.code
      global.REDIRECT_URL = ''
    } else if (items.code === 404) {
      global.HEADER = global.MODAL_HEAD_ERROR
      global.BODY = items.message
      global.ERROR = items.code
      global.REDIRECT_URL = ''
    } else if (items.code === 423) {
      global.HEADER = global.MODAL_HEAD_ERROR
      global.BODY = items.message
      global.ERROR = items.code
      global.REDIRECT_URL = global.ROUTE_RECUPERAR
    } else if (items.code === 400) {
      global.HEADER = global.MODAL_HEAD_ERROR
      global.BODY = global.USUARIO_INACTIVO
      global.ERROR = items.code
      global.REDIRECT_URL = ''
    } else if (items.code === 401) {
      global.HEADER = global.MODAL_HEAD_ERROR
      global.BODY = items.message
      global.ERROR = items.code
      global.REDIRECT_URL = ''
    }
  } else {
    global.ERROR = 1
  }

  const response = {
    header: global.HEADER,
    body: global.BODY,
    url: global.REDIRECT_URL,
    error: global.ERROR
  }
  return response
}

const validarLogin = async () => {
  const idUsuario = localStorage.getItem('data');
  const tokenUsuario = localStorage.getItem('token');
  console.log(localStorage.getItem('token'))
  const token = `Bearer ${tokenUsuario}`;
  const headers = { 'Content-Type': 'application/json' }
  headers.Authorization = token
  headers.Canal = global.CANAL
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      idUsuario
    })
  };
  const dataResp = await fetch(global.VALIDATE_LOGIN, requestOptions) // se mapeta el API
  const resp = await dataResp.json() // Se mapea la respuesta
  localStorage.setItem('tokenValidado', resp.data.token);
  if (resp.code === 200) {
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(resp.data)
    )
    const usuario = resp.data.apellidos
    window.localStorage.setItem(
      'name', usuario
    )
    window.localStorage.setItem(
      'empresa', resp.data.nombreEmpresa
    )
    window.localStorage.setItem(
      'rol', resp.data.canal.nombre
    )
    localStorage.setItem('token', resp.data.token);
    localStorage.setItem('data', resp.data.idUsuario);
    global.HEADER = global.MODAL_HEAD_SUCCESS
    global.BODY = global.MODAL_BODY_SUCCES + usuario
    global.ERROR = 0
    if (global.HAVECAMPAIGN === 0) {
      if (global.ROUTE_URL_NEW) {
        // Redirigir a la URL almacenada en global.ROUTE_URL_NEW
        window.location.href = 'http://localhost:3000/dashboard';
      } else {
        // Redirigir a la URL de localhost si no hay URL almacenada
        window.location.href = global.ROUTE_URL_NEW;
      }
    } else {
      global.REDIRECT_URL = global.ROUTE_DASHBOARD;
    }
  } else if (resp.code === 500) {
    global.HEADER = global.MODAL_HEAD_ERROR
    global.BODY = global.ERROR_SERVICE_OFF
    global.ERROR = resp.code
    global.REDIRECT_URL = ''
  } else if (resp.code === 404) {
    global.HEADER = global.MODAL_HEAD_ERROR
    global.BODY = resp.message
    global.ERROR = resp.code
    global.REDIRECT_URL = ''
  } else if (resp.code === 423) {
    global.HEADER = global.MODAL_HEAD_ERROR
    global.BODY = resp.message
    global.ERROR = resp.code
    global.REDIRECT_URL = global.ROUTE_RECUPERAR
  } else if (resp.code === 400) {
    global.HEADER = global.MODAL_HEAD_ERROR
    global.BODY = global.USUARIO_INACTIVO
    global.ERROR = resp.code
    global.REDIRECT_URL = ''
  } else if (resp.code === 401) {
    global.HEADER = global.MODAL_HEAD_ERROR
    global.BODY = resp.message
    global.ERROR = resp.code
    global.REDIRECT_URL = ''
  } else {
    global.ERROR = 1
  }

  const response = {
    header: global.HEADER,
    body: global.BODY,
    url: global.REDIRECT_URL,
    error: global.ERROR
  }
  return response
}

export default {
  login,
  validarLogin
}
