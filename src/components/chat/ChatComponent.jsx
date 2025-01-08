import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

export const ChatComponent = ({ historicoChat, mostrarLoadginPergunta, resposta_avaliada_pelo_usuario, setMostrarAvaliacaoResposta }) => {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [historicoChat]);

    const handleAvaliarResposta = () => {
        setMostrarAvaliacaoResposta(false);
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [historicoChat]);

    const formatarMensagem = (mensagem) => {
        const linhas = mensagem.split('\n');
        const blocos = [];
        let blocoAtual = null;

        linhas.forEach((linha) => {
            const inicioCodigo = linha.match(/^\s*```(\w+)?/);
            
            if (inicioCodigo) {
                if (!blocoAtual) {
                    blocoAtual = { tipo: 'codigo', linguagem: inicioCodigo[1] || 'plaintext', conteudo: [] };
                } else {
                    blocos.push(blocoAtual);
                    blocoAtual = null;
                }
            } else if (blocoAtual && blocoAtual.tipo === 'codigo') {
                blocoAtual.conteudo.push(linha);
            } else {
                blocos.push({ tipo: 'texto', conteudo: linha });
            }
        });

        if (blocoAtual) {
            blocos.push(blocoAtual);
        }

        return (
            <div>
                {blocos.map((bloco, index) => {
                    if (bloco.tipo === 'codigo') {
                        const codigo = bloco.conteudo.join('\n');
                        return (
                            <div key={index} style={{ marginBottom: '1em' }}>
                                <div
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '5px 10px',
                                        maxWidth: '100%',
                                        fontSize: '0.9em',
                                        fontFamily: 'monospace',
                                        borderBottom: '1px solid #ddd',
                                    }}
                                >
                                    {bloco.linguagem}
                                </div>
                                <pre
                                    style={{
                                        margin: 0,
                                        maxWidth: '100%',
                                        overflowX: 'auto',
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    <code
                                        className={`language-${bloco.linguagem}`}
                                        dangerouslySetInnerHTML={{
                                            __html: Prism.highlight(
                                                codigo,
                                                Prism.languages[bloco.linguagem] || Prism.languages.plaintext,
                                                bloco.linguagem
                                            ),
                                        }}
                                    ></code>
                                </pre>
                            </div>
                        );
                    } else {
                        const linha = bloco.conteudo;
                        if (linha.startsWith('### ')) {
                            return <h4 key={index}>{linha.replace(/^###\s*/, '').replace(/\*\*/g, '')}</h4>;
                        }

                        if (linha.startsWith('#### ')) {
                            return <h5 key={index}>{linha.replace(/^####\s*/, '').replace(/\*\*/g, '')}</h5>;
                        }

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

                        return (
                            <p key={index}>
                                {linha.split('**').map((fragment, i) =>
                                    i % 2 === 1 ? <strong key={i}>{fragment}</strong> : fragment
                                )}
                            </p>
                        );
                    }
                })}
            </div>
        );
    };

    return (
        <div className="chat-history-body">
            <ul className="list-unstyled chat-history" style={{ marginBottom: 0 }}>
                {historicoChat.map((item, index) => (
                    <li
                        key={index}
                        style={{ marginBottom: 15, marginTop: 15 }}
                        className={`chat-message ${item.autor === '2' ? 'chat-message-right' : ''}`}
                    >
                        <div className="d-flex overflow-hidden">
                            {item.autor === '1' && (
                                <div className="user-avatar flex-shrink-0 me-4">
                                    <div className="avatar avatar-sm">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/${
                                                item.autor === '2' ? '5.png' : 'gpt1.jpg'
                                            }`}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="chat-message-wrapper flex-grow-1">
                                <div className="chat-message-text">{formatarMensagem(item.mensagem)}</div>
                            </div>
                            {item.autor === '2' && (
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

                {resposta_avaliada_pelo_usuario && (
                    <div
                        className="demo-inline-spacing"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '48px' }}
                    >
                        <span style={{ marginRight: '10px' }}>Esta resposta, foi útil?</span>

                        <button
                            onClick={handleAvaliarResposta}
                            type="button"
                            className="btn btn-icon rounded-pill btn-label-like-chat"
                            style={{ marginRight: '10px' }}
                        >
                            <i className="tf-icons bx bx-like bx-22px"></i>
                        </button>

                        <button
                            onClick={handleAvaliarResposta}
                            type="button"
                            className="btn btn-icon rounded-pill btn-label-pinterest"
                        >
                            <i className="tf-icons bx bx-dislike bx-22px"></i>
                        </button>
                    </div>
                )}

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

                <div ref={endOfMessagesRef} />
            </ul>
        </div>
    );
};