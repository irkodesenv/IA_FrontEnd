import Botao from '../utils/Botao'
export const ListaAgentesChat = ({ lista_chat, handlExcluirChat, handleToogleBoxCharts, activeBoxChats }) => {

    return (
        <>
            <div className="sidebar-body">

                <ul className="list-unstyled chat-contact-list py-2 mb-0" id="chat-list">
                    <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                        <h5 className="text-primary mb-0"> </h5>
                    </li>               

                    {
                        lista_chat.length > 0 ? (
                            lista_chat.map((item, key) => (
                                <>                                    
                                    <li key={item.idmaster} onClick={(e) => handleToogleBoxCharts(item.idmaster)} className={`chat-contact-list-item mb-1 ${activeBoxChats === item.idmaster ? 'active' : ''} `}>
                                        <a className="d-flex align-items-center">
                                            <div className="flex-shrink-0 avatar avatar-online">

                                                {item.agente.logo_agente ? (<img src={`http://127.0.0.1:8000/${item.agente.logo_agente}`} alt="Avatar" className="rounded-circle" />) : (<img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`} alt="Avatar" className="rounded-circle" />)}

                                            </div>
                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                <div className="d-flex justify-content-between align-items-center"> 
                                                {
                                                    item.agente.conversa_livre === 0 ? (
                                                    <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                        {item.agente.nome}
                                                    </h6>
                                                    ) : (
                                                    <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                        {item.titulo}
                                                    </h6>
                                                    )
                                                }                                             
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-icon text-secondary dropdown-toggle hide-arrow"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="true"
                                                            id="chat-header-actions">
                                                            <i className="bx bx-dots-vertical-rounded bx-md"></i>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                                                            <a className="dropdown-item" onClick={(e) => { e.preventDefault(); handlExcluirChat(item.idmaster) }}>Excluir</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </>
                            ))
                        ) : (
                            {/* Botao*/}, 
                            <li className="chat-contact-list-item" style={{marginLeft: 40, marginRight: 40}}>Nenhum chat encontrado</li>                                     
                        )
                    }

                </ul>

                {/*

                <ul className="list-unstyled chat-contact-list mb-0 py-2" id="contact-list">
                    <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                        <h5 className="text-primary mb-0">Fiscal</h5>
                    </li>

                    <li onClick={(e) => handleToogleBoxCharts(89)} className={`chat-contact-list-item mb-1 ${activeBoxChats === 89 ? 'active' : ''} `}>
                        <a className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar avatar-offline">
                                <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`} alt="Avatar" className="rounded-circle" />
                            </div>
                            <div className="chat-contact-info flex-grow-1 ms-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="chat-contact-name text-truncate fw-normal m-0">Imposto</h6>
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
                                </div>
                            </div>
                        </a>
                    </li>

                </ul>

                */}
            </div>

        </>
    )
}
