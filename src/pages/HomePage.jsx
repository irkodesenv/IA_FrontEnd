import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { handleAbrirNovoChat } from '../components/utils/AbrirNovoChat'
import apiInstance from '../utils/api-instance';
import NotificacaoSuperior from '../components/utils/NotificacaoSuperior';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [listaAgentes, setListaAgentes] = useState([])
    const [statusNotificacao, setStatusNotificacao] = useState(false);
    const [tipoNotificacao, setTipoNotificacao] = useState("");
    const [textoNotificacao, setTextoNotificacao] = useState("");
    const [filtro, setFiltro] = useState("");
    const [listaFiltrada, setListaFiltrada] = useState(listaAgentes);
    const navigate = useNavigate();

    useEffect(() => {
        listarAgentesPorDepartamento();
    }, [])

    const listarAgentesPorDepartamento = async () => {
        try {
            const response = await apiInstance.get(`v1/agente/listar_agentes_dpto/`);
            if (response.status === 200) {
                setListaAgentes(response.data);
                setListaFiltrada(response.data)
                setStatusNotificacao(false);
            } else {
                setStatusNotificacao(true);
                setTipoNotificacao("danger");
                setTextoNotificacao("Retorno inesperado, verifique os dados retornados.");
            }
        } catch (error) {
            setStatusNotificacao(true);
            setTipoNotificacao("danger");
            setTextoNotificacao("Erro ao buscar agentes, tente novamente mais tarde.");
        }
    };

    const handleFiltrarAgente = (palavra_digitada) => {
        setFiltro(palavra_digitada);

        if (palavra_digitada) {
            const resultadoFiltrado = Object.entries(listaAgentes).reduce((acc, [tipo, data]) => {
                const agentesFiltrados = data.agentes.filter((agente) =>
                    agente.nome.toLowerCase().includes(palavra_digitada.toLowerCase())
                );
                if (agentesFiltrados.length > 0) {
                    acc[tipo] = { ...data, agentes: agentesFiltrados };
                }
                return acc;
            }, {});

            setListaFiltrada(resultadoFiltrado);
        } else {
            setListaFiltrada(listaAgentes);
        }
    };

    const handleClickAgente = (id_Agente) => {
        handleAbrirNovoChat(id_Agente);
        navigate(`${process.env.REACT_APP_BASE_PATH}/Chat`);
    };

    return (
        <>
            <div className="card mb-2" style={{ height: 50 }}>
                <div className="flex-grow-1 input-group input-group-merge">
                    <span className="input-group-text" id="basic-addon-search31"
                    ><i className="bx bx-search bx-sm"></i
                    ></span>
                    <input
                        type="text"
                        className="form-control chat-search-input"
                        placeholder="Buscar GPTs criados pela IRKO"
                        aria-label="Buscar GPTs criados pela IRKO"
                        aria-describedby="basic-addon-search31"
                        onChange={(e) => handleFiltrarAgente(e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-12 order-3 order-lg-4 mb-6 mb-lg-0">
                <div className="card text-center h-100">
                    <div className="card-header nav-align-top">
                        <ul className="nav nav-pills" role="tablist">
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="nav-link active"
                                    role="tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#navs-pills-todos"
                                    aria-controls="navs-pills-todos"
                                    aria-selected="true">
                                    Todos
                                </button>
                            </li>

                            {Object.entries(listaAgentes).map(([tipo, data]) => (
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="nav-link"
                                        role="tab"
                                        data-bs-toggle="tab"
                                        data-bs-target={`#navs-pills-${tipo}`}
                                        aria-controls={`navs-pills-${tipo}`}
                                        aria-selected="false">
                                        {tipo}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr className='mt-0' />

                    <div className="tab-content pt-0 pb-4">
                        {/* TODOS */}
                        <div className="tab-pane fade show active" id="navs-pills-todos" role="tabpanel">
                            <div className="row">
                                {Object.values(listaFiltrada).every((data) => !data.agentes || data.agentes.length === 0) ? (
                                    <p className="text-center">Nenhum agente criado até o momento.</p>
                                ) : (
                                    Object.entries(listaFiltrada).map(([tipo, data]) =>
                                        data.agentes && data.agentes.length > 0 ? (
                                            data.agentes.map((agente) => (
                                                <div
                                                    key={agente.id}
                                                    className="d-flex mb-7 col-md-3 col-lg-3 col-sm-12 box-amostragem-gpt clickable"
                                                    onClick={() => handleClickAgente(agente.id)}
                                                >
                                                    <div className="avatar flex-shrink-0 me-3 mt-1 mb-1">
                                                        <img
                                                            src="http://localhost:3000/IA/static/assets/img/avatars/gpt1.jpg"
                                                            alt="Agente GPT"
                                                            className="rounded"
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-wrap justify-content-between gap-2 text-start mt-1 mb-1">
                                                        <div className="me-2">
                                                            <h6 className="mb-0">{agente.nome}</h6>
                                                            <small className="d-block">{agente.descricao}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : null
                                    )
                                )}
                            </div>
                        </div>

                        {Object.entries(listaFiltrada).map(([tipo, data]) => (
                            <div key={tipo} className="tab-pane fade" id={`navs-pills-${tipo}`} role="tabpanel">
                                <div className="row">
                                    {data.agentes && data.agentes.length > 0 ? (
                                        data.agentes.map((agente) => (
                                            <div
                                                key={agente.id}
                                                className="d-flex mb-7 col-md-3 col-lg-3 col-sm-12 box-amostragem-gpt clickable"
                                                onClick={() => handleClickAgente(agente.id)}
                                            >
                                                <div className="avatar flex-shrink-0 me-3 mt-1 mb-1">
                                                    <img
                                                        src="http://localhost:3000/IA/static/assets/img/avatars/gpt1.jpg"
                                                        alt="Avatar"
                                                        className="rounded"
                                                    />
                                                </div>
                                                <div className="d-flex flex-wrap justify-content-between gap-2 text-start mt-1 mb-1">
                                                    <div className="me-2">
                                                        <h6 className="mb-0">{agente.nome}</h6>
                                                        <small className="d-block">Agente para tirar dúvidas</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">Nenhum agente disponível para {tipo}.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <NotificacaoSuperior
                show={statusNotificacao}
                tipo={tipoNotificacao}
                titulo={"Agente"}
                texto={textoNotificacao}
                setStatusNotificacao={setStatusNotificacao}
            />
        </>
    )
}
