import React, { useRef, useEffect } from 'react';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

const SideBarMenuLeft = ({ lista_agentes, handleAbrirNovoChat }) => {
    const selectAgentes = useRef(null);
    const selectDpto = useRef(null);
    const buscarChats = useRef(null);

    useEffect(() => {
        // Inicializa o Select2 para o Departamento
        const $select_departamento = $(selectDpto.current).select2({
            placeholder: 'Selecione',
            allowClear: true,
        });
    
        // Inicializa o Select2 para os Agentes
        const $select_agentes = $(selectAgentes.current).select2({
            placeholder: 'Selecione',
            allowClear: true,
        });
    
        // Popula os departamentos no select de departamentos
        $select_departamento.empty();
        $select_departamento.append(new Option("Selecione", "", false, false));
    
        lista_agentes.forEach((item) => {
            Object.entries(item).forEach(([_, departamentoInfo]) => {
                Object.keys(departamentoInfo.agentes_habilitados).forEach((departamento) => {
                    const newOption = new Option(departamento, departamento, false, false);
                    $select_departamento.append(newOption);
                });
            });
        });
    
        // Evento para carregar agentes ao selecionar um departamento
        $select_departamento.on("select2:select", function (e) {
            const departamentoSelecionado = e.params.data.id;
    
            // Limpa o select de agentes antes de adicionar novos
            $select_agentes.empty();
            $select_agentes.append(new Option("Selecione", "", false, false));
    
            // Adiciona os agentes habilitados ao select de agentes
            lista_agentes.forEach((item) => {
                Object.entries(item).forEach(([_, departamentoInfo]) => {
                    const agentes_habilitados = departamentoInfo.agentes_habilitados[departamentoSelecionado];
                    if (agentes_habilitados) {
                        Object.entries(agentes_habilitados).forEach(([nomeAgente, idAgente]) => {
                            const newOption = new Option(nomeAgente, idAgente, false, false);
                            $select_agentes.append(newOption);
                        });
                    }
                });
            });
    
            // Atualiza o Select2 com os novos agentes
            $select_agentes.trigger('change');
        });
    
        // Limpeza na desmontagem do componente
        return () => {
            $select_departamento.select2('destroy');
            $select_agentes.select2('destroy');
        };
    }, [lista_agentes]);


    const handleToggleBuscarChats = () => {
        if (buscarChats.current) {
            buscarChats.current.classList.toggle('show');
        }
    };


    const handleButtonClick = () => {
        const selectedAgentId = $(selectAgentes.current).val();
        handleAbrirNovoChat(selectedAgentId); // Chama a função do pai com o valor
    };

    const retornaListaAgentesSelecionados = () => {
        const selectedAgentId = $(selectDpto.current).val();
        console.log(selectedAgentId)       
    }


    return (
        <>
            {/* Sidebar */}
            <div className="col app-chat-sidebar-left app-sidebar overflow-hidden sidebar" ref={buscarChats} id="app-chat-sidebar-left">
                <div className="chat-sidebar-left-user sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                    <i
                        className="bx bx-x bx-lg cursor-pointer close-sidebar"
                        data-bs-toggle="sidebar"
                        data-overlay
                        data-target="#app-chat-sidebar-left"
                        onClick={handleToggleBuscarChats}></i>
                </div>
                <div className="sidebar-body px-6 pb-6">
                    {/* 

                    <div className="flex-grow-1 input-group input-group-merge rounded-pill">
                        <span className="input-group-text" id="basic-addon-search31"
                        ><i className="bx bx-search bx-sm"></i
                        ></span>
                        <input
                            type="text"
                            className="form-control chat-search-input"
                            placeholder="Pesquisar..."
                            aria-label="Pesquisar..."
                            aria-describedby="basic-addon-search31" />
                    </div>
                    */}

                    <div className="my-6">
                        <div className="mb-6">
                            <label className="form-label" htmlFor="formValidadeDepartamento">Departamento</label>
                            <select
                                id="formValidadeDepartamento"
                                name="formValidadeDepartamento"
                                className="form-select select2"
                                data-allow-clear="true"
                                onClick={retornaListaAgentesSelecionados}
                                ref={selectDpto}>
                            </select>
                        </div>


                        <div className="col-md-12">
                            <label className="form-label" htmlFor="formValidationSelect2">Agente</label>                            
                            <select
                                id="formValidationSelect2"
                                name="formValidationSelect2"
                                className="form-select select2"
                                data-allow-clear="true"
                                ref={selectAgentes}>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex mt-6">
                        <button
                            onClick={(e) => { handleButtonClick(); handleToggleBuscarChats() }}
                            className="btn btn-primary w-100"
                            data-bs-toggle="sidebar"
                            data-overlay
                            data-target="#app-chat-sidebar-left">
                            <i className="bx bx-log-out bx-sm me-2"></i>Iniciar
                        </button>
                    </div>
                </div>
            </div>

            {/*  Botao */}
            <div
                className="flex-shrink-0 avatar me-4 ml-3"
                data-bs-toggle="sidebar"
                data-overlay="app-overlay-ex"
                onClick={handleToggleBuscarChats}
                style={{ marginTop: 10, marginLeft: 10, color: '#696cff' }}>
                <i className="menu-icon tf-icons bx bxs-plus-circle" style={{ fontSize: '32px', marginRight: '0px' }}></i>
            </div>
        </>
    )
}

export default SideBarMenuLeft