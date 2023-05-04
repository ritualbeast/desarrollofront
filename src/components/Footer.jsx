import React from 'react'
import '../styles/global.css'
import '../global.js'

const Footer = () => {
  return (
    <div>
        <div className="footer">{global.FOOTER}{(new Date().getFullYear())}</div>   
    </div>
  )
}

export default Footer
