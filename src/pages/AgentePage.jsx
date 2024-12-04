import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt, FaFileAlt, FaCloudUploadAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/agente.css';
import apiInstance from '../utils/api-instance';
import NotificacaoSuperior from '../components/utils/NotificacaoSuperior';

export const AgentePage = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const { register: registerEdit, handleSubmit: handleSubmitEdit, setValue: setValueEdit, formState: { errors: errorsEdit }, reset: resetEdit } = useForm();

    const [statusNotificacao, setStatusNotificacao] = useState(false);
    const [tipoNotificacao, setTipoNotificacao] = useState("");
    const [textoNotificacao, setTextoNotificacao] = useState("");
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [acceptedFilesEdit, setAcceptedFilesEdit] = useState([]);
    const [options_departamentos, setOptionsDepartamento] = useState([]);
    const [options_empresas, setOptionsEmpresas] = useState([]);
    const [select_tipo_agente, setSelectTipoAgente] = useState([]);
    const [listaAgentes, setListaAgentes] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAgente, setSelectedAgente] = useState(null);

    // Agentes
    useEffect(() => {
        const fetchAgentes = async () => {
            const agentes = await listarAgentes("");
            setListaAgentes(agentes);
        };

        fetchAgentes();

    }, []);

    const listarAgentes = async (id_agente) => {
        const agente = await apiInstance.get(`v1/agente/`);
        return Array.isArray(agente.data) ? agente.data : [agente.data];
    };

    const handleFileChange = (acceptedFiles) => {
        setValue('base_conhecimento', acceptedFiles);
        setAcceptedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    };

    const handleFileChangeEdit = (acceptedFiles) => {
        setValueEdit('base_conhecimento_edit', acceptedFiles);
        setAcceptedFilesEdit(prevFiles => [...prevFiles, ...acceptedFiles]);
    };

    const handleRemoveFile = (fileName) => {
        setAcceptedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const handleRemoveFileEdit = (fileName) => {
        setAcceptedFilesEdit(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileChange,
    });

    const { getRootProps: getRootPropsEdit, getInputProps: getInputPropsEdit } = useDropzone({
        onDrop: handleFileChangeEdit,
    });

    const handleEmpresaChange = async () => {
        const selectedOptions = Array.from(
            document.getElementById('picker_empresas').selectedOptions,
            option => parseInt(option.value, 10)
        );

        if (selectedOptions.length < 1) {
            return;
        }

        const options_departamentos = await apiInstance.get(`v1/empresa/departamentos/?id_empresa=${JSON.stringify(selectedOptions)}`);
        const departamentos = Array.isArray(options_departamentos.data) ? options_departamentos.data : [options_departamentos.data];

        setOptionsDepartamento(departamentos);
    };

    // Função para atualizar as opções no selectpicker
    const updateSelectpickerOptions = () => {
        if (window.$) {
            const $select_empresas = window.$('#picker_empresas');
            const $select_tipo_agente = window.$('#select_tipo_agente');

            $select_empresas.selectpicker('destroy');

            $select_empresas.empty();

            options_empresas.forEach(option => {
                $select_empresas.append(new Option(option.razao_social, option.id));
            });

            select_tipo_agente.forEach(option => {
                $select_tipo_agente.append(new Option(option.nome, option.id));
            });

            $select_empresas.selectpicker('render');

            // Se houver clique de seleção, vai atualizar os departamentos de cada empresa
            $select_empresas.on('changed.bs.select', handleEmpresaChange);
        }
    };

    const updateSelectDepartamentos = () => {
        if (window.$) {
            const $options_departamentos = window.$('#picker_departamentos');
            $options_departamentos.selectpicker('destroy');
            $options_departamentos.empty();

            options_departamentos.forEach(option => {
                $options_departamentos.append(new Option(option.sigla_empresa + " - " + option.nome, option.id));
            });

            $options_departamentos.selectpicker('render');
        }
    };

    useEffect(() => {
        const fetchEmpresas = async () => {
            const empresas = await listarEmpresas("");
            setOptionsEmpresas(empresas);
        };
        fetchEmpresas();

        const fetchTipoAgente = async () => {
            const tipo_agente = await listarTipoAgentes("");
            setSelectTipoAgente(tipo_agente);
        };

        fetchTipoAgente();

        if (window.$) {
            window.$('.selectpicker').selectpicker();
        }
    }, []);

    // Picker Departamento e empresa
    useEffect(() => {
        updateSelectpickerOptions();
    }, [options_empresas, select_tipo_agente]);

    useEffect(() => {
        updateSelectDepartamentos();
    }, [options_departamentos]);

    const listarEmpresas = async (id_empresa) => {
        const empresa = await apiInstance.get(`v1/empresa/empresa/${id_empresa ? id_empresa + "/" : ""}`);
        return Array.isArray(empresa.data) ? empresa.data : [empresa.data];
    };

    const listarTipoAgentes = async (id_tipo_agente) => {
        const tipo_agente = await apiInstance.get(`v1/agente/tipoAgente/${id_tipo_agente ? id_tipo_agente + "/" : ""}`);
        return Array.isArray(tipo_agente.data) ? tipo_agente.data : [tipo_agente.data];
    };

    const handleSubmitAgente = async (data) => {
        try {
            const form_obj_agente = new FormData();
            form_obj_agente.append('nome', data.nome_agente);
            form_obj_agente.append('descritivo', data.descricao_agente);
            form_obj_agente.append('max_token', data.tokens_maximos_agente);
            form_obj_agente.append('tipo', data.select_tipo_agente);

            // Adiciona cada ID de departamento individualmente
            if (data.picker_departamentos && Array.isArray(data.picker_departamentos)) {
                data.picker_departamentos.forEach((id) => {
                    form_obj_agente.append('picker_departamentos', id);
                });
            }

            if (data.logo_agente && data.logo_agente.length > 0) {
                form_obj_agente.append('logo_agente', data.logo_agente[0]);
            }

            if (data.base_conhecimento && data.base_conhecimento.length > 0) {
                form_obj_agente.append('base_conhecimento_data', data.base_conhecimento[0]);
            }

            form_obj_agente.append('instrucoes_data', JSON.stringify([{ "instrucao": data.instrucao_agente }]));

            await apiInstance.post(`v1/agente/`, form_obj_agente);

            setStatusNotificacao(true);
            setTipoNotificacao("success");
            setTextoNotificacao("Agente cadastrado com sucesso!");

            reset();
            setAcceptedFiles([]);
        } catch (error) {
            if (error.response) {
                console.error('Erro do Servidor:', error.response.data);
            } else if (error.request) {
                console.error('Nenhuma resposta recebida:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    };

    const handleAbrirModalEditarAgente = async (data) => {
        let idmaster_agente = data.target.id;
        const agente = listaAgentes.find((a) => a.idmaster === idmaster_agente);

        if (!agente) {
            console.error(`Agente com idmaster ${idmaster_agente} não encontrado.`);
            return;
        }
        setSelectedAgente(agente);
        setShowEditModal(true);

        var instrucao_tratado = (Array.isArray(agente.instrucoes) && agente.instrucoes.length > 0 && agente.instrucoes[0]['instrucao']) 
        ? agente.instrucoes[0]['instrucao'] 
        : "";
  
        // Preencher o formulário de edição com os dados do agente selecionado
        resetEdit({
            edit_nome_agente: agente.nome || "1",
            edit_descricao_agente: agente.descritivo || "",
            edit_tokens_maximos_agente: agente.max_token || "",
            edit_select_tipo_agente: agente.tipo || "",
            edit_instrucao_agente:  instrucao_tratado
        });

        // Se necessário, carregar os arquivos associados ao agente      
        //setAcceptedFilesEdit(agente.base_conhecimento);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedAgente(null);
        resetEdit();
        setAcceptedFilesEdit([]);
    };

    const handleSubmitEditAgente = async (data) => {
        try {
            const form_obj_agente = new FormData();
            form_obj_agente.append('nome', data.edit_nome_agente);
            form_obj_agente.append('descritivo', data.edit_descricao_agente);
            form_obj_agente.append('max_token', data.edit_tokens_maximos_agente);
            form_obj_agente.append('tipo', data.edit_select_tipo_agente);

            // Adiciona cada ID de departamento individualmente
            if (data.edit_picker_departamentos && Array.isArray(data.edit_picker_departamentos)) {
                data.edit_picker_departamentos.forEach((id) => {
                    form_obj_agente.append('picker_departamentos', id);
                });
            }

            if (data.edit_logo_agente && data.edit_logo_agente.length > 0) {
                form_obj_agente.append('logo_agente', data.edit_logo_agente[0]);
            }

            if (data.base_conhecimento_edit && data.base_conhecimento_edit.length > 0) {
                form_obj_agente.append('base_conhecimento_data', data.base_conhecimento_edit[0]);
            }
            
            form_obj_agente.append('instrucoes_data', JSON.stringify([{ "instrucao": data.edit_instrucao_agente }]));

            for (let [key, value] of form_obj_agente.entries()) {
                console.log(`${key}: ${value}`);
            }

            await apiInstance.put(`v1/agente/${selectedAgente.idmaster}/`, form_obj_agente);

            setStatusNotificacao(true);
            setTipoNotificacao("success");
            setTextoNotificacao("Agente atualizado com sucesso!");

            // Atualizar a lista de agentes
            const agentesAtualizados = await listarAgentes("");
            setListaAgentes(agentesAtualizados);

            handleCloseModal();
        } catch (error) {
            if (error.response) {
                console.error('Erro do Servidor:', error.response.data);
            } else if (error.request) {
                console.error('Nenhuma resposta recebida:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    };

    return (
        <>
            <div className="row my-6">
                <div className="col">
                    <div className="accordion" id="collapsibleSection">

                        <div className="card accordion-item">
                          
                            <div
                                id="collapseDeliveryAddress"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingDeliveryAddress"
                                data-bs-parent="#collapsibleSection">
                                <div className="accordion-body">

                                    <form onSubmit={handleSubmit(handleSubmitAgente)}>

                                        <div className="row card-padding-30">
                                            <h5>Dados do Agente </h5>

                                            <div className="col-md-4">
                                                <label htmlFor="nome_agente" className="form-label">Nome</label>
                                                <input
                                                    type="text"
                                                    className={`form-control bootstrap-maxlength-example ${errors?.nome_agente?.type === 'required' ? 'input-error' : ''}`}
                                                    id="nome_agente"
                                                    name="nome_agente"
                                                    placeholder="Nome do agente"
                                                    aria-describedby="defaultFormControlHelp"
                                                    {...register("nome_agente", { required: true })}
                                                    maxLength="25" />
                                                {errors?.nome_agente?.type === 'required' && <p className='input-error-message'> Nome obrigatório </p>}
                                            </div>

                                            <div className="col-md-5">
                                                <label htmlFor="descricao_agente" className="form-label">Descrição</label>
                                                <input
                                                    type="text"
                                                    className={`form-control bootstrap-maxlength-example ${errors?.descricao_agente?.type === 'required' ? 'input-error' : ''}`}
                                                    id="descricao_agente"
                                                    name="descricao_agente"
                                                    placeholder="Breve Descrição..."
                                                    aria-describedby="defaultFormControlHelp"
                                                    {...register("descricao_agente", { required: true })}
                                                    maxLength="250" />
                                                {errors?.descricao_agente?.type === 'required' && <p className='input-error-message'> Descrição obrigatória. </p>}
                                            </div>

                                            <div className="col-md-2">
                                                <label htmlFor="select_tipo_agente" className="form-label">Tipo agente</label>
                                                <select
                                                    id="select_tipo_agente"
                                                    name="select_tipo_agente"
                                                    className={`select2 form-select ${errors?.select_tipo_agente ? 'input-error' : ''}`}
                                                    data-allow-clear="true"
                                                    {...register("select_tipo_agente", {
                                                        validate: (value) => {
                                                            return value.length > 0;
                                                        }
                                                    })}
                                                >
                                                    <option value="">Selecione</option>
                                                </select>
                                                {errors?.select_tipo_agente && <p className='input-error-message'> Selecione o tipo de agente. </p>}
                                            </div>

                                            <div className="col-md-1">
                                                <label htmlFor="tokens_maximos_agente" className="form-label">Token Máximo</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors?.tokens_maximos_agente?.type === 'required' ? 'input-error' : ''}`}
                                                    id="tokens_maximos_agente"
                                                    name="tokens_maximos_agente"
                                                    placeholder="Tokens para contexto"
                                                    {...register("tokens_maximos_agente", { required: true })}
                                                    aria-describedby="defaultFormControlHelp"
                                                    defaultValue="500"
                                                />
                                                {errors?.tokens_maximos_agente?.type === 'required' && <p className='input-error-message'> Preencher tokens. </p>}
                                            </div>
                                        </div>

                                        <div className="row card-padding-30 mt-3">
                                            <div className="col-md-8">
                                                <label className="col-sm-3 col-form-label" htmlFor="instrucao_agente" >Instrução</label>
                                                <textarea
                                                    name="instrucao_agente"
                                                    className={`form-control ${errors?.instrucao_agente?.type === 'required' ? 'input-error' : ''}`}
                                                    id="instrucao_agente"
                                                    rows="5"
                                                    {...register("instrucao_agente", { required: true })}
                                                    placeholder="Cole sua instrução aqui">
                                                </textarea>
                                                {errors?.instrucao_agente?.type === 'required' && <p className='input-error-message'> Instrução obrigatória. </p>}
                                            </div>

                                            <div className="col-4 mt-6">
                                                <h5 className="card-header">Logo do agente</h5>
                                                <div className="card-body">
                                                    <div className="fallback">
                                                        <input name="logo_agente" {...register("logo_agente")} type="file" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 mt-4">
                                                <hr></hr>
                                            </div>

                                            <div className="col-12">
                                                <h5>Base de conhecimento</h5>
                                                <div>
                                                    <div
                                                        {...getRootProps()}
                                                        className="dropzone needsclick"
                                                        id="dropzone-multi"
                                                        style={{ position: 'relative', textAlign: 'center', minHeight: '200px' }}
                                                    >
                                                        <input
                                                            name="base_conhecimento"
                                                            {...register('base_conhecimento', { required: true })}
                                                            {...getInputProps({
                                                                accept: ".txt,.doc,.docx",
                                                            })}
                                                        />

                                                        {acceptedFiles.length === 0 && (
                                                            <div className="dz-message needsclick">
                                                                <FaCloudUploadAlt size={50} style={{ marginBottom: '10px' }} />
                                                                <p>Arraste ou clique para upload</p>
                                                            </div>
                                                        )}

                                                        {acceptedFiles.length > 0 && (
                                                            <div className="file-preview-container">
                                                                {acceptedFiles.map((file) => {
                                                                    const isValidFile =
                                                                        file.type === 'text/plain' ||
                                                                        file.type ===
                                                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                                                                        file.type === 'application/msword';                                                                                                                                            
                                                                    return (
                                                                        <div key={file.name} className="file-preview">
                                                                            {isValidFile ? (
                                                                                <>
                                                                                    <FaFileAlt size={40} />
                                                                                    <p className="file-name">{file.name}</p>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="remove-file-button"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            handleRemoveFile(file.name);
                                                                                        }}
                                                                                    >
                                                                                        <FaTrashAlt />
                                                                                    </button>
                                                                                </>
                                                                            ) : (
                                                                                handleRemoveFile(file.name),
                                                                                setStatusNotificacao(true),
                                                                                setTipoNotificacao("danger"),
                                                                                setTextoNotificacao("Permitido apenas TXT ou Word")
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {errors?.base_conhecimento && (
                                                        <p className="input-error-message">Selecione pelo menos um arquivo.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row card-padding-30 mt-8">
                                            <div>
                                                <hr></hr>
                                            </div>

                                            <h5>Permissões </h5>
                                            <div className="col-md-6">
                                                <label htmlFor="picker_empresas" className="form-label">Empresas</label>
                                                <select
                                                    id="picker_empresas"
                                                    name="picker_empresas"
                                                    className={`selectpicker w-100 form-control ${errors?.picker_empresas ? 'input-error' : ''}`}
                                                    data-style="btn-default"
                                                    {...register("picker_empresas", {
                                                        validate: (value) => {
                                                            return value.length > 0;
                                                        }
                                                    })}
                                                    multiple
                                                    data-actions-box="true">
                                                </select>
                                                {errors?.picker_empresas && <p className='input-error-message'> Selecione pelo menos 1 empresa. </p>}
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="picker_departamentos" className="form-label">Departamentos</label>
                                                <select
                                                    id="picker_departamentos"
                                                    name="picker_departamentos"
                                                    className={`selectpicker w-100 form-control ${errors?.picker_departamentos ? 'input-error' : ''}`}
                                                    data-style="btn-default"
                                                    {...register("picker_departamentos", {
                                                        validate: (value) => {
                                                            return value.length > 0;
                                                        }
                                                    })}
                                                    multiple
                                                    data-actions-box="true">
                                                </select>
                                                {errors?.picker_departamentos && <p className='input-error-message'> Selecione pelo menos 1 departamento. </p>}
                                            </div>
                                        </div>

                                        <div className="row card-padding-30 mt-8">
                                            <div className="col-3">
                                                <button type='submit' id="showToastAnimation" className='btn btn-primary' name="btn_cadastrar_agente"> Cadastrar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-12'>

                    <div className="card" style={{ paddingLeft: '3%', paddingRight: '4%' }}>
                        <h5 className="card-header">Lista de Agentes</h5>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Agente</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {
                                        listaAgentes.map((agente) => {
                                            return (
                                                <tr key={agente.idmaster}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`} className="rounded-circle me-3" height="20" />
                                                            <span className="text-heading">{agente.nome}</span>
                                                        </div>
                                                    </td>

                                                    <td>{agente.descritivo}</td>

                                                    <td><span className="badge bg-label-primary me-1">Ativo</span></td>

                                                    <td>
                                                        <div className="dropdown">
                                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                <i className="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item" id={agente.idmaster} onClick={handleAbrirModalEditarAgente}>
                                                                    <i className="bx bx-edit-alt me-1"></i> Editar</a>
                                                                <a className="dropdown-item">
                                                                    <i className="bx bx-trash me-1"></i> Deletar</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })

                                    }
                                </tbody>
                            </table>

                            <div className='demo-inline-spacing' style={{ marginTop: '2%' }}>
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-sm justify-content-center">
                                        <li className="page-item prev">
                                            <a className="page-link"><i className="tf-icon bx bx-chevrons-left bx-xs"></i></a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link">1</a>
                                        </li>

                                        <li className="page-item">
                                            <a className="page-link">2</a>
                                        </li>

                                        <li className="page-item next">
                                            <a className="page-link"><i className="tf-icon bx bx-chevrons-right bx-xs"></i></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Edição */}
            <Modal show={showEditModal} onHide={handleCloseModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Agente</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{paddingLeft: 35, paddingRight: 35}}>
                    <form onSubmit={handleSubmitEdit(handleSubmitEditAgente)}>
                        <div className="row">                    
                            <div className="col-md-4">
                                <label htmlFor="edit_nome_agente" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className={`form-control ${errorsEdit?.edit_nome_agente?.type === 'required' ? 'input-error' : ''}`}
                                    id="edit_nome_agente"
                                    name="edit_nome_agente"
                                    placeholder="Nome do agente"
                                    {...registerEdit("edit_nome_agente", { required: true })}
                                />
                                {errorsEdit?.edit_nome_agente?.type === 'required' && <p className='input-error-message'> Nome obrigatório </p>}
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="edit_descricao_agente" className="form-label">Descrição</label>
                                <input
                                    type="text"
                                    className={`form-control ${errorsEdit?.edit_descricao_agente?.type === 'required' ? 'input-error' : ''}`}
                                    id="edit_descricao_agente"
                                    name="edit_descricao_agente"
                                    placeholder="Breve Descrição..."
                                    {...registerEdit("edit_descricao_agente", { required: true })}
                                />
                                {errorsEdit?.edit_descricao_agente?.type === 'required' && <p className='input-error-message'> Descrição obrigatória. </p>}
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="edit_select_tipo_agente" className="form-label">Tipo agente</label>
                                <select
                                    id="edit_select_tipo_agente"
                                    name="edit_select_tipo_agente"
                                    className={`select2 form-select ${errorsEdit?.edit_select_tipo_agente ? 'input-error' : ''}`}
                                    data-allow-clear="true"
                                    {...registerEdit("edit_select_tipo_agente", {
                                        validate: (value) => {
                                            return value.length > 0;
                                        }
                                    })}
                                >
                                    <option value="">Selecione</option>
                                    {select_tipo_agente.map(option => (
                                        <option key={option.id} value={option.id}>{option.nome}</option>
                                    ))}
                                </select>
                                {errorsEdit?.edit_select_tipo_agente && <p className='input-error-message'> Selecione o tipo de agente. </p>}
                            </div>

                            <div className="col-md-1">
                                <label htmlFor="edit_tokens_maximos_agente" className="form-label">Token Máximo</label>
                                <input
                                    type="text"
                                    className={`form-control ${errorsEdit?.edit_tokens_maximos_agente?.type === 'required' ? 'input-error' : ''}`}
                                    id="edit_tokens_maximos_agente"
                                    name="edit_tokens_maximos_agente"
                                    placeholder="Tokens para contexto"
                                    {...registerEdit("edit_tokens_maximos_agente", { required: true })}
                                />
                                {errorsEdit?.edit_tokens_maximos_agente?.type === 'required' && <p className='input-error-message'> Preencher tokens. </p>}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-8">
                                <label className="col-sm-3 col-form-label" htmlFor="edit_instrucao_agente" >Instrução</label>
                                <textarea
                                    name="edit_instrucao_agente"
                                    className={`form-control ${errorsEdit?.edit_instrucao_agente?.type === 'required' ? 'input-error' : ''}`}
                                    id="edit_instrucao_agente"
                                    rows="5"
                                    {...registerEdit("edit_instrucao_agente", { required: true })}
                                    placeholder="Cole sua instrução aqui">
                                </textarea>
                                {errorsEdit?.edit_instrucao_agente?.type === 'required' && <p className='input-error-message'> Instrução obrigatória. </p>}
                            </div>

                            <div className="col-4 mt-6">
                                <h5 className="card-header">Logo do agente</h5>
                                <div className="card-body">
                                    <div className="fallback">
                                        <input name="edit_logo_agente" {...registerEdit("edit_logo_agente")} type="file" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <hr></hr>
                            </div>

                            <div className="col-12">
                                <h5>Base de conhecimento</h5>
                                <div>
                                    <div
                                        {...getRootPropsEdit()}
                                        className="dropzone needsclick"
                                        id="dropzone-multi"
                                        style={{ position: 'relative', textAlign: 'center', minHeight: '200px' }}
                                    >
                                        <input
                                            name="base_conhecimento_edit"
                                            {...registerEdit('base_conhecimento_edit')}
                                            {...getInputPropsEdit({
                                                accept: ".txt,.doc,.docx",
                                            })}
                                        />

                                        {acceptedFilesEdit.length === 0 && (
                                            <div className="dz-message needsclick">
                                                <FaCloudUploadAlt size={50} style={{ marginBottom: '10px' }} />
                                                <p>Arraste ou clique para upload</p>
                                            </div>
                                        )}

                                        {acceptedFilesEdit.length > 0 && (
                                            <div className="file-preview-container">
                                                {acceptedFilesEdit.map((file) => {
                                                    const isValidFile =
                                                        file.type === 'text/plain' ||
                                                        file.type ===
                                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                                                        file.type === 'application/msword';
                                                    return (
                                                        <div key={file.name} className="file-preview">
                                                            {isValidFile ? (
                                                                <>
                                                                    <FaFileAlt size={40} />
                                                                    <p className="file-name">{file.name}</p>
                                                                    <button
                                                                        type="button"
                                                                        className="remove-file-button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleRemoveFileEdit(file.name);
                                                                        }}
                                                                    >
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                handleRemoveFileEdit(file.name),
                                                                setStatusNotificacao(true),
                                                                setTipoNotificacao("danger"),
                                                                setTextoNotificacao("Permitido apenas TXT ou Word")
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {errorsEdit?.base_conhecimento_edit && (
                                        <p className="input-error-message">Selecione pelo menos um arquivo.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Fechar
                                </Button>
                                <Button variant="primary" type="submit" style={{ marginLeft: '10px' }}>
                                    Salvar Alterações
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <NotificacaoSuperior
                show={statusNotificacao}
                tipo={tipoNotificacao}
                titulo={"Agente"}
                texto={textoNotificacao}
                setStatusNotificacao={setStatusNotificacao}
            />
        </>
    );
};
