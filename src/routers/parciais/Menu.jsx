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
                 <Link to="/" className="app-brand-link">
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
                    <Link to="/Chat" onClick={() => {setActiveSubItem(0); toggleItem(0)}} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-chat"></i>
                        <div className="text-truncate" data-i18n="Chat">Chat</div>
                    </Link>
                </li>

                {/*
                <li className={`menu-item ${openIndex === 0 ? 'open' : ''} ${activeIndex === 0 ? 'active' : ''}`}>
                    
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleItem(0); }} className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bx-chat"></i>
                        <div className="text-truncate" data-i18n="Chat">Chat</div>
                    </a>                 

                    <ul className={`menu-sub ${openIndex === 0 ? 'show' : ''}`}>

                        <li className={`menu-item ${openSubIndex === 0 ? 'open' : ''} ${activeSubIndex === 0 ? 'active' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubItem(0); }} className="menu-link menu-toggle">
                                <div className="text-truncate" data-i18n="Financeiro">Financeiro</div>
                            </a>

                            <ul className={`menu-sub ${openSubIndex === 0 ? 'show' : ''}`}>
                                <li className={`menu-item ${activeSubIndex === 0 ? 'active' : ''}`}>
                                    <Link to="/Chat" onClick={() => setActiveSubItem(0)} className="menu-link">
                                        <div className="text-truncate" data-i18n="Extrato">Extrato</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className={`menu-item ${openSubIndex === 1 ? 'open' : ''} ${activeSubIndex === 1 ? 'active' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubItem(1); }} className="menu-link menu-toggle">
                                <div className="text-truncate" data-i18n="Fiscal">Fiscal</div>
                            </a>

                            <ul className={`menu-sub ${openSubIndex === 1 ? 'show' : ''}`}>
                                <li className={`menu-item ${activeSubIndex === 1 ? 'active' : ''}`}>
                                    <Link to="/Chat" onClick={() => setActiveSubItem(1)} className="menu-link">
                                        <div className="text-truncate" data-i18n="Escriturar">Escriturar</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        
                        <li className={`menu-item ${openSubIndex === 2 ? 'open' : ''} ${activeSubIndex === 2 ? 'active' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubItem(2); }} className="menu-link menu-toggle">
                                <div className="text-truncate" data-i18n="Contabil">Contabil</div>
                            </a>

                            <ul className={`menu-sub ${openSubIndex === 2 ? 'show' : ''}`}>
                                <li className={`menu-item ${activeSubIndex === 2 ? 'active' : ''}`}>
                                    <Link to="/Chat" onClick={() => setActiveSubItem(2)} className="menu-link">
                                        <div className="text-truncate" data-i18n="Balanço">Balanço</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        
                        <li className={`menu-item ${openSubIndex === 3 ? 'open' : ''} ${activeSubIndex === 3 ? 'active' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubItem(3); }} className="menu-link menu-toggle">
                                <div className="text-truncate" data-i18n="DCTF">DCTF</div>
                            </a>

                            <ul className={`menu-sub ${openSubIndex === 3 ? 'show' : ''}`}>
                                <li className={`menu-item ${activeSubIndex === 3 ? 'active' : ''}`}>
                                    <Link to="/Chat" onClick={() => setActiveSubItem(3)} className="menu-link">
                                        <div className="text-truncate" data-i18n="Apurar">Apurar</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                */}

                <li className={`menu-item ${openIndex === 1 ? 'open' : ''} ${activeIndex === 1 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleItem(1); }} className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bx-brightness"></i>
                        <div className="text-truncate" data-i18n="Configurações">Configurações </div>
                    </a>
                    <ul className={`menu-sub ${openIndex === 1 ? 'show' : ''}`}>
                        <li className={`menu-item ${activeSubIndex === 5 ? 'active' : ''}`}>
                            <Link to="/agentes" onClick={() => setActiveSubItem(5)} className="menu-link">
                                <div className="text-truncate" data-i18n="Agentes">Agentes</div>
                            </Link>
                        </li>
                        <li className={`menu-item ${activeSubIndex === 6 ? 'active' : ''}`}>
                            <Link to="/" onClick={() => setActiveSubItem(6)} className="menu-link">
                                <div className="text-truncate" data-i18n="Usuários">Usuários</div>
                            </Link>
                        </li>                   
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
