import React from 'react'
import Menu from './parciais/Menu'
import Head from './parciais/Head'

import { Outlet } from 'react-router-dom';

const Base = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Menu />

        <div className="layout-page">
          <Head />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Base