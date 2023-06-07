const validate = (credenciales) => {
    let resp = true
    if (!credenciales.username && !credenciales.password) {
      global.FIELD = '.every-label'
      global.INPUT_FIELD = '.every-input'
      global.LABEL_INPUT_ERROR = global.LABEL_EMPTY_ERROR
      global.ERROR = 1
      resp = false
    } else if (!credenciales.username) {
      global.FIELD = '.user-input'
      global.INPUT_FIELD = '#user'
      global.LABEL_INPUT_ERROR = 'Ingrese usuario por favor'
      global.ERROR = 1
      resp = false
    } else if (!credenciales.password) {
      global.FIELD = '.pass-input'
      global.INPUT_FIELD = '#pass'
      global.LABEL_INPUT_ERROR = 'Ingrese contraseña por favor'
      global.ERROR = 1
      resp = false
    }
    return resp
  }
  
  export default {
    validate
  }
  