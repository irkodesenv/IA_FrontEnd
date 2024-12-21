import React from 'react'

export const HeaderAgente = ({ headerAgente }) => {
  return (
    <>
      <div className="chat-history-header border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex overflow-hidden align-items-center">
            <i
              className="bx bx-menu bx-lg cursor-pointer d-lg-none d-block me-4"
              data-bs-toggle="sidebar"
              data-overlay
              data-target="#app-chat-contacts"></i>
            <div className="flex-shrink-0 avatar avatar-online">

              <img
                src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`}
                alt="Avatar"
                className="rounded-circle"
                data-bs-toggle="sidebar"
                data-overlay
                data-target="#app-chat-sidebar-right" />
            </div>
            <div className="chat-contact-info flex-grow-1 ms-4">
              {
                headerAgente ?
                  (
                    <>
                    {
                      headerAgente.agente.conversa_livre === 1 ? 
                        (<h6 className="m-0 fw-normal">{headerAgente.titulo}</h6>)
                        : 
                        (<h6 className="m-0 fw-normal">{headerAgente.agente.nome}</h6>)
                    }
                      
                      <small>{headerAgente.agente.descritivo}</small>
                    </>
                  ) : (
                    <>
                      <h6 className="m-0 fw-normal">Selecione </h6>
                      <small>um agente</small>
                    </>
                  )
              }
            </div>
          </div>
          <div className="d-flex align-items-center">

            {/* 
                        <i
                          className="bx bx-phone bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i>
                        <i
                          className="bx bx-video bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i>
                        <i
                          className="bx bx-search bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i>
                          
                        <div className="dropdown">
                        
                          <button
                            className="btn btn-icon text-secondary dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="true"
                            id="chat-header-actions">
                            <i className="bx bx-dots-vertical-rounded bx-md"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                            <a className="dropdown-item" onClick={(e) => e.preventDefault()}>Excluir</a>
                          </div>
                        </div>
                        */}
          </div>
        </div>
      </div>
    </>
  )
}