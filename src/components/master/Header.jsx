import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/notysurveyLogo.jpeg';
import Image from 'react-bootstrap/Image';
import userImg from '../../assets/img/generic-user-icon.jpg';
import '../../styles/global.css';
import '../../styles/header.css';
import Iconify from '../iconify/Iconify';

const Header = ({ onToggleSidebar }) => {
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [activeOption, setActiveOption] = useState('');
  const [isNotificacionVisible, setIsNotificacionVisible] = useState(false);
  const [activeNotificacion, setActiveNotificaicon] = useState('');
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
    localStorage.clear();
    window.location.href = '/';
  };

  const ontoggleNotificacion = () => {
    setHasNewMessage(false);
    setIsNotificacionVisible(!isNotificacionVisible);
  }

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownVisible(false);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const closeNotificacion = () => {
    setIsNotificacionVisible(false);
  };

  const handleNotificacionClick = (option) => {
    setActiveNotificaicon(option);
  };

  return (
    <div className="header-content">
      <div className="header d-flex align-items-center" role="button">
        <Link className="nav-link" to="/dashboard">
          <Image src={Logo} alt="Logo" width="210" height="40" className="menu-logo" />
        </Link>
        <Iconify icon={'eva:menu-fill'} color="#ffd230" className="menu-icon-1" onClick={onToggleSidebar} />

        <form className="form-inline my-2 my-lg-0 ">
          <div className="d-flex align-items-center header_form">
            <div className="mr-3" role="button" onClick={ontoggleNotificacion}>
              <Iconify icon={isNotificacionVisible ? 'eva:bell-outline' : 'eva:bell-outline'} color="black" className="menu-icon-2" />
              {hasNewMessage && <div className="mensaje-senal"></div>}
              {isNotificacionVisible && (
                <div className="dropdown-menu-n" aria-labelledby="userDropdown" onClick={closeNotificacion}>
                  <Link
                    className={`dropdown-item no-underline ${activeNotificacion === 'dashboard' ? 'active' : ''}`}
                    to="/dashboard"
                    onClick={() => handleNotificacionClick('dashboard')}
                  >
                    Notificaicon 1
                  </Link>
                  <Link
                    className={`dropdown-item no-underline ${activeNotificacion === 'logout' ? 'active' : ''}`}
                    to="/"
                    onClick={() => handleNotificacionClick('logout')}
                  >
                    Notificacion 2
                  </Link>
                </div>
              )}
            </div>

            <div className="dropdown" role="button" onClick={toggleUserDropdown}>
              <img src={userImg} id="img-user" alt="ml" className="mr-2" />
              <h6 className="mb-0" style={{ marginTop: '10px', marginBottom: '0', marginLeft: '10px' }}>Anna Gabriela Montesdoca</h6>
              <Iconify icon={isUserDropdownVisible ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} color="black" className="menu-icon-3 ml-2" style={{ marginTop: '15px', marginBottom: '0' }}/>
              {isUserDropdownVisible && (
                <div className="dropdown-menu" aria-labelledby="userDropdown" onClick={closeUserDropdown}>
                  <Link
                    className={`dropdown-item no-underline ${activeOption === 'dashboard' ? 'active' : ''}`}
                    to="/dashboard"
                    onClick={() => handleOptionClick('dashboard')}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className={`dropdown-item no-underline ${activeOption === 'logout' ? 'active' : ''}`}
                    to="/login"
                    onClick={() => handleClose('logout')}
                  >
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </form>

      </div>
    </div>

  );
};

export default Header;
