import React, { useState, useEffect } from 'react';
import apiInstance from '../utils/api-instance';
import gerarIdMaster from '../utils/gera-id-master';
import SideBarMenuLeft from '../components/chat/SideBarMenuLeft';
import { ListaAgentesChat } from '../components/chat/ListaAgentesChat';
import { HeaderAgente } from '../components/chat/HeaderAgente';
import { ChatComponent } from '../components/chat/ChatComponent';

import '../styles/chat.css';


export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [listaAgentes, setListaAgentes] = useState([]);
  const [listaChat, setListaChat] = useState([]);
  const [listaAtualizada, setListaAtualizada] = useState(false);
  const [activeBoxChats, setActiveBoxChats] = useState(null)
  const [headerAgente, setHeaderAgente] = useState(null)
  const [historicoChat, setHistoricoChat] = useState([])
  const [mostrarLoadginPergunta, setMostrarLoadginPergunta] = useState(false)
  const [mostrarAvaliacaoResposta, setMostrarAvaliacaoResposta] = useState(false)
  const [arquivo, setArquivo] = useState([])
  const [feitoUpload, setfeitoUpload] = useState(false);

  // Agentes
  useEffect(() => {
    const fetchAgentes = async () => {
      const agentes = await listarAgentes("");
      setListaAgentes(agentes);
    };

    fetchAgentes();

  }, []);

  // Chats
  useEffect(() => {
    const fetchChats = async () => {
      const chat = await listarChats("");
      setListaChat(chat);
    };

    fetchChats();

  }, []);


  useEffect(() => {
    if (listaChat.length > 0) {
      selecionaUltimoAgenteNaListaDeConversa(listaChat);
    }
  }, [listaChat]);


  const selecionaUltimoAgenteNaListaDeConversa = (lista_chat) => {
    if (lista_chat.length > 0) {
      setActiveBoxChats(lista_chat[0].idmaster)

      // Gera Header
      const objSelecionado = lista_chat.find(item => item.idmaster === lista_chat[0].idmaster)
      setHeaderAgente(objSelecionado);

      // Recarrega chat historico
      listaHistoricoChat(objSelecionado);

    }
  }


  const handleArquivo = (e) => {
    let tipo_arquivo_upload = e.target.files[0].type

    let tipo_arquivos_permitidos = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]

    if (!tipo_arquivos_permitidos.includes(tipo_arquivo_upload)){
      alert("Permitido somente Word e Txt no momento.");
      return;
    }

    const arquivos_selecionados = Array.from(e.target.files);
    setfeitoUpload(true);
    setArquivo(arquivos_selecionados);
  }


  const listarAgentes = async (id_agente) => {
    const agente = await apiInstance.get(`v1/agente/agentesPermissoes/permissoes_formatadas/`);
    return Array.isArray(agente.data) ? agente.data : [agente.data]
  };


  const listarChats = async (id_chat) => {
    const chat = await apiInstance.get(`v1/chat/listaChats/`);

    return Array.isArray(chat.data) ? chat.data : [chat.data]
  };


  const listarHistoricoChat = async (id_chat) => {
    const historicoChat = await apiInstance.get(`v1/chat/?idmaster=${id_chat}`);

    return Array.isArray(historicoChat.data) ? historicoChat.data : [historicoChat.data]
  };


  const handlExcluirChat = async (index) => {
    try {

      await apiInstance.delete(`v1/chat/deletar/?idmaster=${index}`);

      setListaChat(await listarChats(""));
      // Limpa Header
      setHeaderAgente("");

    } catch (error) {

      if (error.status === 403) {
        console.log("Erro")
      }
    }
  };


  const handleSubmitChat = async () => {
  
    if (!message && arquivo.length === 0) {
      return;
    }

    // Usado para preencher de forma prévia o que o usuario perguntou, evitando que so seja carregado no chat junto com a resposta.
    const obj_usuario_pergunta = {
      "autor": "2",
      "mensagem": message
    }

    const form_obj_agente = new FormData();
    form_obj_agente.append('idmaster', activeBoxChats);
    form_obj_agente.append('id_agente', headerAgente?.id_agente || "");
    form_obj_agente.append('autor', "2");
    form_obj_agente.append('mensagem', message);

    
    if(!headerAgente?.id_agente){
      handleAbrirChatLivre()
      return
    }
    
    if (arquivo) {
      arquivo.forEach((file, index) => {
        form_obj_agente.append(`arquivo_upload_${index}`, file);
      });

      setMessage("Arquivo")
    }

    setHistoricoChat(prevHistorico => [...historicoChat, obj_usuario_pergunta]);

    setMostrarLoadginPergunta(true)

    setMessage("");

    try {
      const agente = await apiInstance.post(`v1/chat/enviarPergunta/`, form_obj_agente)
      const flg_avaliar_pergunta = agente.data[0].avalia

      // Mudando nome do objeto em tempo real, no refresh ja vira o correto
      if (agente.data[0].titulo){
        const objSelecionado = listaChat.find(item => item.idmaster === activeBoxChats)
        objSelecionado.titulo = agente.data[0].titulo
        headerAgente.titulo = agente.data[0].titulo
      }

      setMostrarLoadginPergunta(false)
      listaHistoricoChat(headerAgente);
      
      if(!flg_avaliar_pergunta){
        return
      }
      
      setMostrarAvaliacaoResposta(true)

    } catch {
      console.log("erro")
    }
  };


  const handleAbrirNovoChat = async (index) => {

    const obj_chat = {
      "idmaster": gerarIdMaster(),
      "id_agente": index,
      "autor": "1",
      "mensagem": "Como posso ajudar hoje?"
    }

    try {

      await apiInstance.post('v1/chat/', obj_chat)

      setListaChat(await listarChats(""));

    } catch (erro) {
      console.log(erro)
    }
  };


  const handleAbrirChatLivre = async () => {

    const obj_chat = {
        "idmaster": gerarIdMaster(),
        "autor": "1",
        "mensagem": "Como posso ajudar hoje?"
      }
  
      try {
  
        await apiInstance.post('v1/chat/', obj_chat)
  
        const novaLista = await listarChats("");

        setListaChat(novaLista);

        setListaAtualizada(true);
  
      } catch (erro) {
        console.log(erro)
      }

  }


  const listaHistoricoChat = async (objSelecionado) => {
    const historicoChat = await listarHistoricoChat(objSelecionado.idmaster);
    setHistoricoChat(historicoChat);
  };


  const handleToogleBoxCharts = (index) => {

    if (index !== activeBoxChats) {
      // Ativa box azul
      setActiveBoxChats(index)

      // Gera Header
      const objSelecionado = listaChat.find(item => item.idmaster === index)
      setHeaderAgente(objSelecionado);

      // Recarrega chat historico
      listaHistoricoChat(objSelecionado);

      // Nao mostrar avaliacao
      setMostrarAvaliacaoResposta(false)

    }
  };


  const handleFiltrarAgente = (index) => {
    if (index) {
      const listaFiltrada = listaChat.filter((item) => {
        return item.agente.nome.toLowerCase().includes(index.toLowerCase())
      })

      setListaChat(listaFiltrada)

      return true
    }

    if (!index) {
      const fetchChats = async () => {
        const chat = await listarChats("");
        setListaChat(chat);
      };

      fetchChats();
      return true
    }
  }

  return (
    <>

      <div className="app-chat card overflow-hidden">
        <div className="row g-0">
          <div
            className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
            id="app-chat-contacts">
            <div className="sidebar-header px-12 border-bottom d-flex align-items-center">
              <div className="d-flex align-items-center me-6 me-lg-0">

                <div className="flex-grow-1 input-group input-group-merge rounded-pill">
                  <span className="input-group-text" id="basic-addon-search31"
                  ><i className="bx bx-search bx-sm"></i
                  ></span>
                  <input
                    type="text"
                    className="form-control chat-search-input"
                    placeholder="Pesquisar..."
                    aria-label="Pesquisar..."
                    aria-describedby="basic-addon-search31"
                    onChange={(e) => handleFiltrarAgente(e.target.value)}
                  />
                </div>

              </div>
              <i
                className="bx bx-x bx-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                data-overlay
                data-bs-toggle="sidebar"
                data-target="#app-chat-contacts"></i>
            </div>

            <SideBarMenuLeft lista_agentes={listaAgentes} handleAbrirNovoChat={handleAbrirNovoChat} handleAbrirChatLivre={handleAbrirChatLivre} />

            <ListaAgentesChat lista_chat={listaChat} handlExcluirChat={handlExcluirChat} handleToogleBoxCharts={handleToogleBoxCharts} activeBoxChats={activeBoxChats} />

          </div>
          <div className="col app-chat-history">
            <div className="chat-history-wrapper">

              <HeaderAgente headerAgente={headerAgente} />

              <ChatComponent
                historicoChat={historicoChat}
                mostrarLoadginPergunta={mostrarLoadginPergunta}
                resposta_avaliada_pelo_usuario={mostrarAvaliacaoResposta}
                setMostrarAvaliacaoResposta={setMostrarAvaliacaoResposta}
              />

              <div className="chat-history-footer shadow-xs">

                <form className="form-send-message d-flex justify-content-between align-items-center">
                  <input
                    id="input-message-chat"
                    className="form-control message-input border-0 me-4 shadow-none"
                    value={message}
                    placeholder={mostrarAvaliacaoResposta ? "Avalie para perguntar novamente" : "Como posso te ajudar?"}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={mostrarAvaliacaoResposta} />

                  <div className="message-actions d-flex align-items-center">

                    {/*
                        <i
                          className="speech-to-text bx bx-microphone bx-md btn btn-icon cursor-pointer text-heading"></i>
                    */}
                      {
                        feitoUpload ? (
                          <label htmlFor="attach-doc" className="form-label mb-0">
                            <i className="bx bx-check-circle bx-md text-success bx-md cursor-pointer btn btn-icon mx-1"></i>
                            <input type="file" name="arquivo_upload" onChange={(e) => handleArquivo(e)} id="attach-doc" hidden />
                          </label>
                        ) : (
                          <label htmlFor="attach-doc" className="form-label mb-0">
                            <i className="bx bx-paperclip bx-md cursor-pointer btn btn-icon mx-1 text-heading"></i>
                            <input type="file" name="arquivo_upload" onChange={(e) => handleArquivo(e)} id="attach-doc" hidden />
                          </label>
                        )
                      }                   
                    <button onClick={(e) => { e.preventDefault(); handleSubmitChat(); }} disabled={mostrarAvaliacaoResposta} className="btn btn-primary d-flex send-msg-btn">
                      <span className="align-middle d-md-inline-block d-none">Enviar</span>
                      <i className="bx bx-paper-plane bx-sm ms-md-2 ms-0"></i>
                    </button>
                  </div>
                </form>


              </div>
            </div>
          </div>

          <div className="col app-chat-sidebar-right app-sidebar overflow-hidden" id="app-chat-sidebar-right">
            <div
              className="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
              <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                <img src="../../assets/img/avatars/4.png" alt="Avatar" className="rounded-circle" />
              </div>
              <h5 className="mt-4 mb-0">Contas a pagar</h5>
              <i
                className="bx bx-x bx-lg cursor-pointer close-sidebar d-block"
                data-bs-toggle="sidebar"
                data-overlay
                data-target="#app-chat-sidebar-right"></i>
            </div>
            <div className="sidebar-body p-6 pt-0">
              <div className="my-6">
                <p className="text-uppercase mb-1 text-muted">About</p>
                <p className="mb-0">
                  It is a long established fact that a reader will be distracted by the readable content .
                </p>
              </div>
              <div className="my-6">
                <p className="text-uppercase mb-1 text-muted">Personal Information</p>
                <ul className="list-unstyled d-grid gap-4 mb-0 ms-2 py-2 text-heading">
                  <li className="d-flex align-items-center">
                    <i className="bx bx-envelope"></i>
                    <span className="align-middle ms-2">josephGreen@email.com</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bx bx-phone-call"></i>
                    <span className="align-middle ms-2">+1(123) 456 - 7890</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bx bx-time-five"></i>
                    <span className="align-middle ms-2">Mon - Fri 10AM - 8PM</span>
                  </li>
                </ul>
              </div>
              <div className="my-6">
                <p className="text-uppercase text-muted mb-1">Options</p>
                <ul className="list-unstyled d-grid gap-4 ms-2 py-2 text-heading">
                  <li className="cursor-pointer d-flex align-items-center">
                    <i className="bx bx-bookmark"></i>
                    <span className="align-middle ms-2">Add Tag</span>
                  </li>
                  <li className="cursor-pointer d-flex align-items-center">
                    <i className="bx bx-star"></i>
                    <span className="align-middle ms-2">Important Contact</span>
                  </li>
                  <li className="cursor-pointer d-flex align-items-center">
                    <i className="bx bx-image-alt"></i>
                    <span className="align-middle ms-2">Shared Media</span>
                  </li>
                  <li className="cursor-pointer d-flex align-items-center">
                    <i className="bx bx-trash"></i>
                    <span className="align-middle ms-2">Delete Contact</span>
                  </li>
                  <li className="cursor-pointer d-flex align-items-center">
                    <i className="bx bx-block"></i>
                    <span className="align-middle ms-2">Block Contact</span>
                  </li>
                </ul>
              </div>
              <div className="d-flex mt-6">
                <button
                  className="btn btn-danger w-100"
                  data-bs-toggle="sidebar"
                  data-overlay
                  data-target="#app-chat-sidebar-right">
                  Delete Contact<i className="bx bx-trash bx-sm ms-2"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="app-overlay"></div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </>
  )
}
