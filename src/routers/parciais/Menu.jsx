import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [openSubIndex, setOpenSubIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detecta se o dispositivo é móvel
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Checa o tamanho inicial

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
        setActiveIndex(index);
    };

    const toggleSubItem = (index) => {
        setOpenSubIndex(openSubIndex === index ? null : index);
    };


    const setActiveSubItem = (index) => {
        setActiveSubIndex(index);
    };


    const toggleLayout = () => {
        const htmlElement = document.documentElement;

        if (isMobile) {
            setCollapsed(false);
            htmlElement.classList.remove('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-100vh', 'layout-menu-fixed', 'layout-menu-expanded');
        } else {
            if (collapsed) {
                htmlElement.classList.remove('layout-menu-collapsed');
                htmlElement.classList.add('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-fixed');
                htmlElement.classList.remove('d-block');
            } else {
                htmlElement.classList.remove('light-style', 'layout-navbar-fixed', 'layout-compact', 'layout-menu-fixed');
                htmlElement.classList.add('layout-menu-collapsed');
                htmlElement.classList.add('d-block');
            }
            setCollapsed(!collapsed);
        }
    };


    const handleMouseEnter = () => {
        const htmlElement = document.documentElement;

        if (!htmlElement.classList[3]) {
            htmlElement.classList.add('layout-menu-hover');
        }
    };


    const handleMouseLeave = () => {
        const htmlElement = document.documentElement;
        htmlElement.classList.remove('layout-menu-hover');
    };


    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <div className="app-brand demo" style={{ paddingLeft: '20px' }}>
                <Link to={`${process.env.REACT_APP_BASE_PATH}/`} className="app-brand-link">
                    <img src={`${process.env.PUBLIC_URL}/static/assets/img/logos/156.png`} width='45px' style={{ marginRight: '10px' }} />
                    <span className="app-brand-text demo menu-text fw-bold ms-2">IRKO</span>
                </Link>

                <a href="#" onClick={(e) => { e.preventDefault(); toggleLayout(); }} className={`layout-menu-toggle menu-link text-large ms-auto ${collapsed ? 'd-block' : ''}`}>
                    <i className={`bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center menu-toggle-icon ${collapsed ? 'rotated' : ''}`}></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">

                <li className={`menu-item ${activeSubIndex === 0 ? 'active' : ''}`}>
                    <Link to={`${process.env.REACT_APP_BASE_PATH}/`} onClick={() => { setActiveSubItem(0); toggleItem(0) }} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-group"></i>
                        <div className="text-truncate" data-i18n="GPTs">GPTs</div>
                    </Link>
                </li>

                <li className={`menu-item ${activeSubIndex === 1 ? 'active' : ''}`}>
                    <Link to={`${process.env.REACT_APP_BASE_PATH}/Chat`} onClick={() => { setActiveSubItem(1); toggleItem(1) }} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-chat"></i>
                        <div className="text-truncate" data-i18n="Chat">Chat</div>
                    </Link>
                </li>

                <li className={`menu-item ${openIndex === 2 ? 'open' : ''} ${activeIndex === 2 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleItem(2); }} className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bx-brightness"></i>
                        <div className="text-truncate" data-i18n="Configurações">Configurações </div>
                    </a>
                    <ul className={`menu-sub ${openIndex === 2 ? 'show' : ''}`}>
                        <li className={`menu-item ${activeSubIndex === 5 ? 'active' : ''}`}>
                            <Link to={`${process.env.REACT_APP_BASE_PATH}/agentes`} onClick={() => setActiveSubItem(5)} className="menu-link">
                                <div className="text-truncate" data-i18n="Agentes">Agentes</div>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
