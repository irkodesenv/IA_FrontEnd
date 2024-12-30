import gerarIdMaster from '../../utils/gera-id-master';
import apiInstance from '../../utils/api-instance';

export const handleAbrirNovoChat = async (index) => {
    const obj_chat = {
        idmaster: gerarIdMaster(),
        id_agente: index,
        autor: "1",
        mensagem: "Como posso ajudar hoje?",
    };

    try {
        await apiInstance.post("v1/chat/", obj_chat);        
    } catch (erro) {
        console.log(erro);
    }
};
