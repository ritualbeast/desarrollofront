import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/master/Header';
import Footer from '../components/master/Footer';
import Sidebar from '../components/master/Sidebar';
import '../styles/global.css';
import { Row, Col } from 'react-bootstrap';

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <Row>
        {isSidebarVisible && (
          <Col xs={2} style={{ width: '15.9%' }}>
            <Sidebar onClose={closeSidebar} />
          </Col>
        )}
        <Col xs={10} style={{ width: '100%' }}>
          <main className="main-content md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
            <div className="p-10">
              <Outlet />
            </div>
          </main>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Layout;
