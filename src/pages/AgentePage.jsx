import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt, FaFileAlt, FaCloudUploadAlt } from 'react-icons/fa';
import '../styles/agente.css'
import apiInstance from '../utils/api-instance';
import NotificacaoSuperior from '../components/utils/NotificacaoSuperior';


export const AgentePage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [statusNotificacao, setStatusNotificacao] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const handleFileChange = (acceptedFiles) => {
        setValue('base_conhecimento', acceptedFiles);
        setAcceptedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    };

    const handleRemoveFile = (fileName) => {
        setAcceptedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileChange,
    });

    const options_empresas = [
        { value: '1', label: 'IRKO - SP' },
        { value: '2', label: 'IRKO - RJ' },
        { value: '3', label: 'IRKO - BPS' },
    ];

    const options_departamentos = [
        { value: '1', label: 'Financeiro' },
        { value: '2', label: 'DCTF' },
        { value: '3', label: 'Contábil' },
    ];

    // Função para atualizar as opções no selectpicker
    const updateSelectpickerOptions = () => {
        if (window.$) {
            const $select_empresas = window.$('#picker_empresas');
            const $options_departamentos = window.$('#picker_departamentos');

            $select_empresas.empty();
            $options_departamentos.empty();

            options_empresas.forEach(option => {
                $select_empresas.append(new Option(option.label, option.value));
            });

            options_departamentos.forEach(option => {
                $options_departamentos.append(new Option(option.label, option.value));
            });

            $options_departamentos.selectpicker('refresh');
            $select_empresas.selectpicker('refresh');
        }
    };

    useEffect(() => {
        if (window.$) {
            window.$('.selectpicker').selectpicker();
        }
        updateSelectpickerOptions();
    }, []);


    const handleSubmitAgente = async (data) => {

        try {
            const form_obj_agente = new FormData();
            form_obj_agente.append('nome', data.nome_agente);
            form_obj_agente.append('descritivo', data.descricao_agente);
            form_obj_agente.append('max_token', data.tokens_maximos_agente);

            if (data.logo_agente && data.logo_agente.length > 0) {
                form_obj_agente.append('logo_agente', data.logo_agente[0]);
            }

            if (data.base_conhecimento && data.base_conhecimento.length > 0) {
                form_obj_agente.append('base_conhecimento_data', data.base_conhecimento[0]);
            }

            form_obj_agente.append('instrucoes_data', JSON.stringify([{ "instrucao": data.instrucao_agente }]));

            await apiInstance.post(`v1/agente/`, form_obj_agente)

            setStatusNotificacao(true)

        } catch (error) {

            if (error.response) {
                // O servidor respondeu com um status diferente de 2xx
                console.error('Erro do Servidor:', error.response.data);
            } else if (error.request) {
                // Nenhuma resposta foi recebida
                console.error('Nenhuma resposta recebida:', error.request);
            } else {
                // Outros erros
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
                            <h2 className="accordion-header" id="headingDeliveryAddress">
                                <button
                                    className="accordion-button"
                                    type="button">

                                </button>
                            </h2>
                            <div
                                id="collapseDeliveryAddress"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingDeliveryAddress"
                                data-bs-parent="#collapsibleSection">
                                <div className="accordion-body">

                                    <form onSubmit={(e) => { e.preventDefault() }}>

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

                                            <div className="col-md-3">
                                                <label htmlFor="tokens_maximos_agente" className="form-label">Token Maximo</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors?.tokens_maximos_agente?.type === 'required' ? 'input-error' : ''}`}
                                                    id="tokens_maximos_agente"
                                                    name="tokens_maximos_agente"
                                                    placeholder="Tokens para contexto"
                                                    {...register("tokens_maximos_agente", { required: true })}
                                                    aria-describedby="defaultFormControlHelp" />
                                                {errors?.tokens_maximos_agente?.type === 'required' && <p className='input-error-message'> Preencher tokens. </p>}
                                            </div>
                                        </div>

                                        <div className="row card-padding-30 mt-3">
                                            <div className="col-md-6">
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

                                            <div className="col-6 mt-6">
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
                                                        style={{ position: 'relative', textAlign: 'center' }}
                                                    >
                                                        <input
                                                            name="base_conhecimento"
                                                            {...register('base_conhecimento')}
                                                            {...getInputProps()}
                                                        />

                                                        {/* Se nenhum arquivo estiver selecionado, exibe o ícone e o texto */}
                                                        {acceptedFiles.length === 0 && (
                                                            <div className="dz-message needsclick">
                                                                <FaCloudUploadAlt size={50} style={{ marginBottom: '10px' }} />
                                                                <p>Arraste ou clique para upload</p>
                                                            </div>
                                                        )}

                                                        {/* Se houver arquivos, exibe-os dentro do dropzone */}
                                                        {acceptedFiles.length > 0 && (
                                                            <div className="file-preview-container">
                                                                {acceptedFiles.map(file => (
                                                                    <div key={file.name} className="file-preview">
                                                                        {file.type.startsWith('image/') ? (
                                                                            <img
                                                                                src={URL.createObjectURL(file)}
                                                                                alt={file.name}
                                                                                className="file-thumbnail"
                                                                            />
                                                                        ) : (
                                                                            <FaFileAlt size={40} />
                                                                        )}
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
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors?.base_conhecimento && (
                                                        <p className="input-error-message">
                                                            Selecione pelo menos um arquivo.
                                                        </p>
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
                                                            return value.length > 0
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
                                                    className={`selectpicker w-100 form-control ${errors?.picker_empresas ? 'input-error' : ''}`}
                                                    data-style="btn-default"
                                                    {...register("picker_departamentos", {
                                                        validate: (value) => {
                                                            return value.length > 0
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
                                                <button type='submit' id="showToastAnimation" onClick={() => handleSubmit(handleSubmitAgente)()} className='btn btn-primary' name="btn_cadastrar_agente"> Cadastrar</button>
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
                        <h5 className="card-header">Filtro</h5>
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
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`} className="rounded-circle" height="20" class="me-3" />
                                                <span class="text-heading">Cobit</span>
                                            </div>
                                        </td>

                                        <td>Analista de Cobit</td>

                                        <td><span className="badge bg-label-primary me-1">Active</span></td>

                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-edit-alt me-1"></i> Editar</a
                                                    >
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-trash me-1"></i> Deletar</a
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img src={`${process.env.PUBLIC_URL}/static/assets/img/avatars/gpt1.jpg`} className="rounded-circle" height="20" class="me-3" />
                                                <span class="text-heading">Contas a pagar</span>
                                            </div>
                                        </td>

                                        <td>
                                            Agente criado para auxilio no contas a pagar
                                        </td>

                                        <td><span className="badge bg-label-success me-1">Completed</span></td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-edit-alt me-2"></i> Editar</a
                                                    >
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-trash me-2"></i> Deletar</a
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className='demo-inline-spacing' style={{ marginTop: '2%' }}>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination pagination-sm justify-content-center">
                                        <li class="page-item prev">
                                            <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left bx-xs"></i></a>
                                        </li>
                                        <li class="page-item active">
                                            <a class="page-link" href="javascript:void(0);">1</a>
                                        </li>

                                        <li class="page-item">
                                            <a class="page-link" href="javascript:void(0);">2</a>
                                        </li>

                                        <li class="page-item next">
                                            <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right bx-xs"></i></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NotificacaoSuperior
                show={statusNotificacao}
                tipo={"success"}
                titulo={"Agente"}
                texto={"Agente criado com sucesso!"}
                setStatusNotificacao={setStatusNotificacao}
            />
        </>
    )
}
