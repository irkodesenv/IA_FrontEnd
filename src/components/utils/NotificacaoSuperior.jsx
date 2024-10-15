import React, { useEffect } from 'react';

const NotificacaoSuperior = ({ show, tipo, titulo, texto, setStatusNotificacao }) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setStatusNotificacao(false);
            }, 3000);

            // Limpa o timer se o componente for desmontado ou se `show` mudar
            return () => clearTimeout(timer);
        }
    }, [show]);
    
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className={`bs-toast toast toast-ex animate__animated my-2 fade bg-${tipo} animate__fade hide ${show ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
                <div className="toast-header">
                    <i className="bx bx-bell me-2"></i>
                    <div className="me-auto fw-medium">{titulo}</div>

                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">{texto}</div>
            </div>
        </div>
    )
}

export default NotificacaoSuperior
