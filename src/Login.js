import { useState } from "react";
import "./App.css";

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [flagSenhaInvalida, setFlagSenhaInvalida] = useState(false);
  const [notificacao, setNotificacao] = useState("")
  const [requisicaoEnviada, setRequisicaoEnviada] = useState(false)

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setRequisicaoEnviada(true)
    let path_get_token = process.env.REACT_APP_BASE_PATH_API + "/v1/token/";
    
    fetch(path_get_token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password: senha,
        empresa: empresa,
      }),
    })
      .then((response) => {
        const statusCode = response.status;

        return response.json().then((data) => ({
          statusCode: statusCode,
          data: data,
        }));
      })
      .then((result) => {
        const { statusCode, data } = result;

        if (statusCode === 200) {
          setFlagSenhaInvalida(false);
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          window.location.href = `${process.env.REACT_APP_BASE_PATH}/Chat`;
        } else {
          
          //localStorage.removeItem("access_token");
          //localStorage.removeItem("refresh_token");
          setFlagSenhaInvalida(true);
          setRequisicaoEnviada(false)
        }
      })
      .catch((error) => console.error("Erro no login:", error));
  };

  return (
    <div className="authentication-wrapper authentication-cover">
     
      <div className="authentication-inner row m-0">
        {/* Imagem à esquerda */}
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
          <div className="w-100 d-flex justify-content-center">
            <img
              src="./static/assets/img/illustrations/IA.png"
              className="img-fluid"
              alt="Login image"
              width="700"
            />
          </div>
        </div>

        {/* Formulário de Login */}

        <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-12 p-6" 
        style={{
          backgroundColor: 'white',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center', }}>
            
            <div className="w-px-400 mx-auto mt-12 pt-5">
               {/* Logo */}
                <a className="app-brand auth-cover-brand gap-2">
                  <span className="app-brand-logo demo">
                    <img
                      src="./static/assets/img/logo_irko/irko.png"
                      alt="Logo"
                      className="w-px-50 h-auto mt-2"
                    />
                  </span>
                  <span className="app-brand-text demo text-heading fw-bold mt-2">
                    IRKO
                  </span>
                </a>
              <h4 className="mb-1" style={{ marginTop: 20 }}>Bem vindo ao Portal IA IRKO! 👋</h4>
              <p className="mb-6"> <h6> Para acessar, basta inserir o login e senha da sua máquina. </h6></p>

              <form id="formAuthentication" className="mb-6" onSubmit={handleSubmitLogin}>
                <div className="mb-6">

                  <label className="form-label" htmlFor="username" style={{ fontSize: 16 }}>
                    <strong>
                      <h5 style={{ marginBottom: 2 }}>Usuário</h5>
                    </strong>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    autoFocus />
                </div>
                <div className="mb-6 form-password-toggle">

                  <label className="form-label" htmlFor="password" style={{ fontSize: 16 }}>
                    <strong>
                      <h5 style={{ marginBottom: 2 }}>Senha</h5>
                    </strong>
                  </label>

                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      aria-describedby="password" />
                  </div>
                </div>  

                <div className="mb-6">
                  <label className="form-label" htmlFor="empresa" style={{ fontSize: 16 }}>
                    <strong>
                      <h5 style={{ marginBottom: 2 }}>Empresa</h5>
                    </strong>
                  </label>

                  <select
                    id="empresa"
                    name="empresa"
                    className="form-select select2"
                    data-style="btn-default"
                    data-live-search="true"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="1">Irko Matriz</option>
                    <option value="2">Irko RJ</option>
                    <option value="3">Irko Campinas</option>
                    <option value="4">Irkompacta</option>
                    <option value="5">Irko BPS</option>
                    <option value="6">Irkompacta</option>
                  </select>
                </div>           
                {
                  flagSenhaInvalida ? (
                      <div className="alert alert-danger alert-dismissible" role="alert">
                      Login e/ou senha inválido!
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> 
                  ):("")
                }

                {
                  requisicaoEnviada ? (
                    <button
                    type="button"
                    className="btn btn-primary d-grid w-100"
                    style={{                   
                      height: '60px'
                    }}>
                      <div class="sk-fold" style={{color: '#f68549'}}>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                      </div>                    
                  </button>
                  ):(
                    <button
                    type="submit"
                    className="btn btn-primary d-grid w-100"
                    style={{                   
                      height: '60px'
                    }}>
                      <h3 style={{color: '#FFF'}}> Entrar</h3>
                    </button>
                  )            
                }
              </form>      

            </div>
          </div>
        </div> 
      </div>
  );
}

export default Login;
