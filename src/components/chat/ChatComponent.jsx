import React, { useEffect, useRef } from 'react';

export const ChatComponent = ({ historicoChat, mostrarLoadginPergunta }) => {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [historicoChat]);

    const formatarMensagem = (mensagem) => {
        const linhas = mensagem.split('\n');
    
        return (
            <div>
                {linhas.map((linha, index) => {
                    // Verifica se a linha é um título no formato ###
                    if (linha.startsWith('### ')) {
                        return <h4 key={index}>{linha.replace(/^###\s*/, '').replace(/\*\*/g, '')}</h4>;
                    }
    
                    // Verifica se a linha é um título no formato ####
                    if (linha.startsWith('#### ')) {
                        return <h5 key={index}>{linha.replace(/^####\s*/, '').replace(/\*\*/g, '')}</h5>;
                    }
    
                    // Verifica se a linha é uma lista numerada
                    if (/^\d+\.\s/.test(linha)) {
                        return (
                            <ul key={index}>
                                <li>
                                    {linha.replace(/^\d+\.\s*/, '').split('**').map((item, i) =>
                                        i % 2 === 1 ? <strong key={i}>{item.replace('**', '')}</strong> : item.replace('**', '')
                                    )}
                                </li>
                            </ul>
                        );
                    }
    
                    // Caso a linha não seja um título nem uma lista numerada
                    return (
                        <p key={index}>
                            {linha.split('**').map((fragment, i) =>                                 
                                i % 2 === 1 ? <strong key={i}>{fragment}</strong> : fragment
                            )}
                        </p>
                    );
                })}
            </div>
        );
    };
    
    

    return (
        <div className="chat-history-body">
            <ul className="list-unstyled chat-history">
                {historicoChat.map((item, index) => (
                    <li key={index} style={{marginBottom: 15, marginTop: 15}} className={`chat-message ${item.autor === "2" ? "chat-message-right" : ""}`}>
                        <div className="d-flex overflow-hidden">
                            {item.autor === "1" && (
                                <div className="user-avatar flex-shrink-0 me-4">
                                    <div className="avatar avatar-sm">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/${item.autor === "2" ? "5.png" : "gpt1.jpg"}`}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="chat-message-wrapper flex-grow-1">
                                <div className="chat-message-text">
                                    {formatarMensagem(item.mensagem)}
                                </div>
                            </div>
                            {item.autor === "2" && (
                                <div className="user-avatar flex-shrink-0">
                                    <div className="avatar avatar-sm">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/5.png`}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                ))}

                {mostrarLoadginPergunta && (
                    <div className="d-flex align-items-center">
                        <div className="user-avatar flex-shrink-0 me-4">
                            <div className="avatar avatar-sm">
                                <img
                                    src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`}
                                    alt="Avatar"
                                    className="rounded-circle"
                                />
                            </div>
                        </div>

                        <div className="chat-message-wrapper flex-grow-1">
                            <div className="chat-message-text">
                                <div className="sk-wave sk-primary">
                                    <div className="sk-wave-rect"></div>
                                    <div className="sk-wave-rect"></div>
                                    <div className="sk-wave-rect"></div>
                                    <div className="sk-wave-rect"></div>
                                    <div className="sk-wave-rect"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Este elemento ajuda a rolar para o final */}
                <div ref={endOfMessagesRef} />
            </ul>
        </div>
    );
};
