import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { lista } from '../../prisma/data/lista.ts';
import '../../styles/global.css';
import { Icon } from '@iconify/react';

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    const matchedOption = lista.find((item) => item.nombre.toLowerCase() === currentPath);
    if (matchedOption) {
      setActiveIcon(matchedOption.nombre);
    }
  }, [location.pathname]);

  const handleClick = (nombre) => {
    setActiveIcon(nombre);
  };

  return (
      <div className="sidebar-2">
      <div className="fondo-icon1">
        {lista.map((item) => (
          <Link
            to={`/${item.nombre.toLowerCase()}`} key={item.nombre} className="no-underline">
            <div
              className={`icon-container ${activeIcon === item.nombre ? 'active' : ''}`}
              onClick={() => handleClick(item.nombre)}
            >
              <div className="juntar-icon-nombre">
                <div className={`fondo-icon2 ${ activeIcon === item.nombre ? 'active-background' : '' }`}>
                  <Icon icon={item.icono} width="25" height="20" color={activeIcon === item.nombre ? '#ffd230' : 'black'}/>
                </div>
              </div>
              {activeIcon === item.nombre && (
                <div className="opcion-nombre">{item.nombre}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

