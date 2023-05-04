import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu'
import {Row, Col, Container} from 'react-bootstrap'
import FiltroDashboard from './components/FiltroDashboard'
import GraficosDashboard from './components/GraficosDashboard'
import IndicadorDashboard from './components/indicadorDashboard'
const Dashboard = () => {
  return (
    <div>
        <h1>
            <FiltroDashboard />
            <IndicadorDashboard />
            <GraficosDashboard />
        </h1>
    </div>
      
  )
}

export default Dashboard
