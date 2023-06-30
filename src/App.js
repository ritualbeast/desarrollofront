import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import Dashboard from './views/Dashboard';
import Encuestas from './views/Encuestas';
import IPN from './views/IPN';
import Reporte from './views/Reporte';
import CrearEncuestas from './views/IPN/CrearEncuestas';
import Create from './views/Create';
import Login from './components/master/Login';
import globalServices from './services/global'

function App() {
  const [user, setUser] = useState(localStorage.getItem('loggedUser'))
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
    verificaToken()
  }, [])

  const verificaToken = async () => {
    await globalServices.verificaToken()
    setTimeout(() => {
      verificaToken()
    }, 600000)
    setLoad(true)
    console.log('cargar')
  }
  
  setTimeout(function () {
    refreshTokenVerifyInactivity()
  }, 1000 * 60 * 60)

  const refreshTokenVerifyInactivity = async (event) => {
    const resp = await globalServices.refreshTokenInactivity({})
    if (resp.expire_date) {
      await globalServices.logOut({})
    }
  }
  return (
    <div>
      {
        user === null
      ? <Router>
          <Routes>
            <Route path="/*" caseSensitive={false} element={<Login />} />
          </Routes>
        </Router>
      : load &&
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Layouts />} >
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/encuesta/*" element={<Layouts />} >
            <Route index element={<Encuestas />} />
          </Route>

          <Route path="/ipn/*"element={<Layouts />} >
            <Route index element={<IPN />} />
          </Route>

          <Route path="/reportes/*" element={<Layouts />} >
            <Route index element={<Reporte />} />
          </Route>

          <Route path="ipn/crearEncuesta" element={<Layouts />} >
            <Route index element={<CrearEncuestas />} />
          </Route>

          <Route path="/create" element={<Layouts />} >
            <Route index element={<Create />} />
          </Route>
        </Routes>
      </Router>
      }
    </div>
  );
}

export default App;
