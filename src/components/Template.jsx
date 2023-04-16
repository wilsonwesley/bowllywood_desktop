import './../sass/styles.scss';

import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import GoBackButton from './GoBackButton'
import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";


const Template = () => {
  const checkStorage = () => {
    const currentTokens = localStorage.getItem("userTokens");
    if (currentTokens) {
      return currentTokens;
    } else {
      return false;
    }
  };

  const authContext = useContext(AuthContext);
  const tokens = checkStorage();
  const decodedToken = jwt_decode(JSON.parse(tokens).token);
  const role = decodedToken.roleID
    const handleLogout = () => {
        // Supprimer les données utilisateur du localStorage
        localStorage.removeItem('userTokens');
        // Mettre à jour l'état pour afficher le lien de connexion
        authContext.setAuth(null);
    };

    const items = [
        <SidebarItem>
            <GoBackButton />
        </SidebarItem>,
        <SidebarItem>
            <Link to="/login" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-drivers-license text-black flex-center"></i>
                <p>Connexion</p>
            </Link>
        </SidebarItem>
    ];

  const [itemsLogged, setItemsLogged] = useState([]);
  useEffect(() => {
    let data;
    if ( role === "ROLE_ADMIN" 
      || role === "ROLE_SUPERADMIN" 
      || role === "ROLE_CEO")  {
      data = [
        <SidebarItem>
            <GoBackButton />
        </SidebarItem>,
        <SidebarItem>
          <Link to="/home" className="text-decoration-none text-black text-center">
            <i className="fa-solid fa-house text-black flex-center"></i>
            <p className="text-black">Accueil</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/profile"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-user text-black flex-center"></i>
            <p className="text-black">Profile</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/restaurants"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-shop text-black flex-center"></i>
            <p>Restaurants</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/menus/admin-list"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-bowl-food text-black flex-center"></i>
            <p>Bowls</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/stocks"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-box-open text-black flex-center"></i>
            <p className="text-black">Inventaire</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/kitchenCalendar"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-calendar-days text-black flex-center"></i>
            <p>Agenda</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/franchiseRequestsList"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-user-plus text-black flex-center"></i>
            <p>Adhésion</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/supplierList"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-warehouse text-black flex-center"></i>
            <p>Fournisseurs</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/register"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-drivers-license text-black flex-center"></i>
            <p>Inscription</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
        <Link
          to="/userList"
          className="text-decoration-none text-black text-center"
        >
          <i className="fa-solid fa-users text-black flex-center"></i>
          <p>Utilisateurs</p>
        </Link>
      </SidebarItem>,
      <SidebarItem>
      <Link
        to="/"
        className="text-decoration-none text-black text-center"
        onClick={handleLogout}
      >
        <i className="fa-solid fa-user-times text-black flex-center"></i>
        <p>Déconnexion</p>
      </Link>
    </SidebarItem>,
      ];

      setItemsLogged(data);
    } else if (role === "ROLE_MANAGER" ) {
      data = [
        <SidebarItem>
            <GoBackButton />
        </SidebarItem>,
        <SidebarItem>
          <Link to="/home" className="text-decoration-none text-black text-center">
            <i className="fa-solid fa-house text-black flex-center"></i>
            <p className="text-black">Accueil</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/profile" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-user text-black flex-center"></i>
                <p className='text-black'>Profile</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/restaurants" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-shop text-black flex-center"></i>
                <p>Restaurants</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/stocks" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-box-open text-black flex-center"></i>
                <p className='text-black'>Inventaire</p>
            </Link>
        </SidebarItem>,
        <SidebarItem> 
            <Link to="/kitchenCalendar" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-calendar-days text-black flex-center"></i>
                <p>Agenda</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>

          <Link
            to="/supplierList"
            className="text-decoration-none text-black text-center"
          >
            <i className="fa-solid fa-warehouse text-black flex-center"></i>
            <p>Fournisseurs</p>
          </Link>
        </SidebarItem>,
        <SidebarItem>
          <Link
            to="/"
            className="text-decoration-none text-black text-center"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-user-times text-black flex-center"></i>
            <p>Déconnexion</p>
          </Link>
        </SidebarItem>,
      ];
      setItemsLogged(data);
    } else if (role === "ROLE_WAITER"
      || role === "ROLE_COOK" ) {
        data = [
        <SidebarItem>
            <GoBackButton />
        </SidebarItem>,
          <SidebarItem>
            <Link to="/home" className="text-decoration-none text-black text-center">
              <i className="fa-solid fa-house text-black flex-center"></i>
              <p className="text-black">Accueil</p>
            </Link>
          </SidebarItem>,
          <SidebarItem>
            <Link
              to="/profile"
              className="text-decoration-none text-black text-center"
            >
              <i className="fa-solid fa-user text-black flex-center"></i>
              <p className="text-black">Profile</p>
            </Link>
          </SidebarItem>,
          <SidebarItem>
            <Link
              to="/restaurants"
              className="text-decoration-none text-black text-center"
            >
              <i className="fa-solid fa-shop text-black flex-center"></i>
              <p>Restaurants</p>
            </Link>
          </SidebarItem>,
          <SidebarItem>
            <Link
              to="/stocks"
              className="text-decoration-none text-black text-center"
            >
              <i className="fa-solid fa-box-open text-black flex-center"></i>
              <p className="text-black">Inventaire</p>
            </Link>
          </SidebarItem>,
          <SidebarItem>
            <Link
              to="/kitchenCalendar"
              className="text-decoration-none text-black text-center"
            >
              <i className="fa-solid fa-calendar-days text-black flex-center"></i>
              <p>Agenda</p>
            </Link>
          </SidebarItem>,
          <SidebarItem>
            <Link
              to="/"
              className="text-decoration-none text-black text-center"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-user-times text-black flex-center"></i>
              <p>Déconnexion</p>
            </Link>
          </SidebarItem>,
        ];
        setItemsLogged(data);
    }
    return () => {
      setItemsLogged([]);
    };
  }, [authContext]);

    return (
        <Sidebar content={authContext.auth ? itemsLogged : items} background="#91D5A3" width={200}>
            <div className="main-content">
                <Outlet />
                <div className="col-12 footer"></div>
            </div>
        </Sidebar>
    );
};

export default Template;
