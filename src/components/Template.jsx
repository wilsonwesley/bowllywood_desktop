import './../sass/styles.scss';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

const items = [
    <SidebarItem>
        <Link to="/" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-house text-black flex-center"></i>
            <p className='text-black'>Accueil</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/profile" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-user text-black flex-center"></i>
            <p className='text-black'>Profile</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/reservations" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-money-bill text-black flex-center"></i>
            <p className='text-black'>Réservation</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/menus" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-utensils text-black flex-center"></i>
            <p>Menu</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/mark" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-star text-black flex-center"></i>
            <p>Évaluation</p>
        </Link>
    </SidebarItem>,
    <SidebarItem> 
        <Link to="/franchise-request" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-people-roof text-black flex-center"></i>
            <p>Devenir franchisé</p>
        </Link>
    </SidebarItem>,
    <SidebarItem className="text-center">
        <Link to="/my-franchise-requests" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-people-roof text-black flex-center"></i>
            <p>Mes demandes de franchise</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/register" className="text-black text-decoration-none flex-center">Inscription</Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/login" className="text-black text-decoration-none flex-center">Connexion</Link>
    </SidebarItem>
  ];

const Template = () => {
    return (
        <Sidebar content={items} background="#91D5A3" width={200} >
            <div className='main-content'>
                <Outlet />
                <div className='col-12 footer'></div>
            </div>
        </Sidebar>
    );
};

export default Template;
