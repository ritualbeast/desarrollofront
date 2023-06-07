import React, { useState } from 'react'
import '../../styles/login.css'
import usuario from '../../assets/img/usuario.png'
import contraseña from '../../assets/img/contraseña.png'
import $ from 'jquery'
import loginServices from '../../services/login'
import ModalSpiner from '../../util/ModalSpiner'
import ModalNewMessages from '../../util/ModalGeneral'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [spiner, setSpiner] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [header, setHeader] = useState('')
    const [body, setBody] = useState('')
    const [coloHeader, setColorHeader] = useState('')
    const [modalButton, setModalButton] = useState('')
    const [handle, setHandle] = useState()
    const [closes, setCloses] = useState()
    const [hclose, setHclose] = useState()

    const something = (event) => {
        if (event.keyCode === 13) {
          $('#btnLogin').click()
        }
    }
    
    const handleClose = (op) => () => {
        setIsOpen(false)
    }
    
    const handleRef = (op) => () => {
        window.location.href = global.ROUTE_RECUPERAR
    }
    
    const loginHandler = async (event) => {
        event.preventDefault()
        $(global.FIELD).html(' ')
        $(global.INPUT_FIELD).removeClass('error')
        setSpiner(true)
        try {
          const userData = await loginServices.login({
            username,
            password
          })
          console.log('userDatas', userData)
          console.log(localStorage.getItem('url'))
          if (userData.error === 1) {
            setSpiner(false)
            $(global.FIELD).html(global.LABEL_INPUT_ERROR)
            $(global.INPUT_FIELD).addClass('error')
          } else if (userData.error === 401) {
            setSpiner(false)
            setIsOpen(true)
            setColorHeader('text-center')
            setBody(global.BODY)
            setModalButton('Aceptar')
            setHandle(handleClose)
            setHclose(handleClose)
            setCloses('X')
            $('.MuiDialogContentText-root').addClass('text-center')
          } else if (userData.error === 423) {
            setSpiner(false)
            setIsOpen(true)
            setColorHeader('text-center')
            setBody(global.BODY)
            setModalButton('Desbloquear cuenta')
            setHandle(handleRef)
            setHclose(handleClose)
            setCloses('X')
            $('.MuiDialogContentText-root').addClass('text-center')
          } else if (userData.error === 404) {
            setSpiner(false)
            setIsOpen(true)
            setColorHeader('text-center')
            setBody(global.BODY)
            setModalButton('Aceptar')
            setHandle(handleClose)
            setHclose(handleClose)
            setCloses('X')
            $('.MuiDialogContentText-root').addClass('text-center')
          } else if (userData.error === 400) {
            setSpiner(false)
            setIsOpen(true)
            setColorHeader('text-center')
            setBody(global.BODY)
            setModalButton('Aceptar')
            setHandle(handleClose)
            setHclose(handleClose)
            setCloses('X')
            $('.MuiDialogContentText-root').addClass('text-center')
          } else {
            const userData = await loginServices.validarLogin({
              username,
              password
            })
            setTimeout(function () {
              setSpiner(false)
              window.location.href = userData.url
            }, 2000)
          }
        } catch (e) {
          console.log('error')
          setSpiner(false)
          setIsOpen(true)
          setHeader(global.MODAL_HEAD_ERROR)
          setBody(global.ERROR_TRYCATCH)
          setModalButton('Aceptar')
          setTimeout(function () {
            setIsOpen(false)
          }, 3000)
        }
    }

    return (
        <div className='login'>
            <ModalNewMessages isOpen={isOpen} header={header} body={body} color={coloHeader} button={modalButton} handle={handle} close={closes} hclose={hclose}/>
            <ModalSpiner opt={spiner} />
            <div className='login-pt1'>
                <h1>Bienvenido</h1>
                <p>Por favor ingrese su usuario y contraseña</p>
            </div>

            <div className='login-pt2'>
                <div className='login-pt2-1'>
                    <img className='img-1' src={usuario} alt='usuario' width={20} height={20}/>
                    <label htmlFor="usuario"></label>
                    <input onKeyDown={(e) => something(e) } onChange={({ target }) => setUsername(target.value)} type="text" id='usuario' placeholder='Usuario o Correo' required/>
                </div>
                
                <div className='login-pt2-2'>
                    <img src={contraseña} alt='contraseña' width={20} height={20}/>
                    <label htmlFor='password'></label>
                    <input onKeyDown={(e) => something(e) } onChange={({ target }) => setPassword(target.value)} type='password' id='password'placeholder='Contraseña' required/>
                </div>
                <button onClick={loginHandler}>
                    <a>Ingresar</a>
                </button>
            </div>

            <div className='login-pt3'>
                <a className='olvide' href="/notySurvey/recuperar">Olvidé mi Contraseña</a>
            </div>
            
            <div className='login-pt4'>
                <div>
                    <p>¿No tienes cuenta?</p>
                </div>

                <a className='registro' href="/registro">Registrate</a>
            </div>
        </div>
    )
}

export default Login
