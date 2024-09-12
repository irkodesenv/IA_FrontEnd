import React, { useRef, useEffect } from 'react';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

const SideBarMenuLeft = ({ lista_agentes, handleAbrirNovoChat }) => {
    const selectRef = useRef(null);
    const buscarChats = useRef(null);

    useEffect(() => {
        const $select = $(selectRef.current).select2({
            placeholder: 'Selecione',
            allowClear: true,
        });

        $select.empty();
        $select.append(new Option("Selecione", "", false, false));

        if (lista_agentes.length > 0) {
            lista_agentes.forEach((item) => {
                const newOption = new Option(item.nome, item.idmaster, false, false);
                $select.append(newOption).trigger('change');
            });
        }

        // Limpeza na desmontagem do componente
        return () => {
            $select.select2('destroy');
        };
    }, [lista_agentes]);


    const handleToggleBuscarChats = () => {
        if (buscarChats.current) {
            buscarChats.current.classList.toggle('show');
        }
    };


    const handleButtonClick = () => {
        const selectedAgentId = $(selectRef.current).val();
        handleAbrirNovoChat(selectedAgentId); // Chama a função do pai com o valor
    };


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
                            <label className="form-label" htmlFor="basic-default-country">Departamento</label>
                            <select className="form-select" id="basic-default-country" required="">
                                <option value="">Selecione</option>
                                <option value="usa">Financeiro</option>
                                <option value="uk">Fiscal</option>
                                <option value="france">DCTF</option>
                                <option value="australia">Contábil</option>
                            </select>
                        </div>


                        <div className="col-md-12">
                            <label className="form-label" htmlFor="formValidationSelect2">Agente</label>
                            <select
                                id="formValidationSelect2"
                                name="formValidationSelect2"
                                className="form-select select2"
                                data-allow-clear="true"
                                ref={selectRef}>


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
                style={{ marginTop: 17, marginLeft: 10 }}>
                <i className="menu-icon tf-icons bx bxs-plus-circle"></i>
            </div>
        </>
    )
}

export default SideBarMenuLeft