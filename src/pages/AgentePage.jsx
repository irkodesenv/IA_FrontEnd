import { React, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../styles/agente.css'
import axios from 'axios';

export const AgentePage = () => {    const { register, handleSubmit, formState: { errors } } = useForm();

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
    // Inicializa o selectpicker
    if (window.$) {
        window.$('.selectpicker').selectpicker();
    }

    // Atualiza as opções ao montar o componente
    updateSelectpickerOptions();

}, []);


const fetchCsrfToken = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/get-csrf-token/");
    return response.data.csrfToken;
};


const handleSubmitAgente = async (data) => {

    const csrfToken = await fetchCsrfToken();

    const obj_agente = {
        "nome": data.nome_agente,
        "descritivo": data.descricao_agente,
        "max_token": data.tokens_maximos_agente,
        "instrucoes": [
            {
                "instrucao": data.instrucao_agente,
            }
        ]
    }

    axios.post("http://127.0.0.1:8000/api/v1/agente/", obj_agente, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
    .finally();
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
                                            <button type='submit' onClick={() => handleSubmit(handleSubmitAgente)()} className='btn btn-primary' name="btn_cadastrar_agente"> Cadastrar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
