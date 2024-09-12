function gerarIdMaster() {
    // Função para gerar um número aleatório entre 100 e 999
    const getRandomNumber = () => Math.floor(Math.random() * 900) + 100;
  
    // Obter a data atual
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa do zero em JS
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2); // Pegando os últimos dois dígitos do ano
  
    // Construir o idmaster de acordo com o formato desejado
    let idmaster = `${getRandomNumber()}${month}${getRandomNumber()}${day}${getRandomNumber()}${year}`;
  
    return idmaster;
  }
  
  export default gerarIdMaster;