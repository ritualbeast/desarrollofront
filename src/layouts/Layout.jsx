import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { Container, Row, Col } from 'react-bootstrap'

const Layout = () => {
  return (
    <>
        <Header />
        <Container fluid>
          <Row>
            <Col xs={1} id="sidebar-wrapper">
              <Menu />
            </Col>
            <Col xs={11} id="page-content-wrapper">
              <Outlet />
            </Col>
          </Row>
        </Container>
        <Footer />
        
    </>
  )
}

export default Layout
