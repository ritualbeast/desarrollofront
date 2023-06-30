import React, { useEffect } from 'react'

const Dashboard = () => {  
  useEffect(() => {
    verificarLocalStorage()
  }, [])

  const verificarLocalStorage = () => {
    const isAdmin = localStorage.getItem('data')
    if (isAdmin === null) {
      window.location.href = global.ROUTE_LOGIN
    }
  }
  return (
    <div>
      <h1 className='titulo-d' style={{ color: 'darkblue' }}>
        Dashboard
      </h1>
    </div>
  )
}

export default Dashboard
